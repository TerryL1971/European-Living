// src/services/businessServices.ts
import { supabase } from "./supabaseClient";

// TypeScript interfaces (camelCase for frontend)
export interface Business {
  id: string;
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  englishFluency?: "fluent" | "conversational" | "basic";
  verified?: boolean;
  featured?: boolean;
  featuredTier?: "free" | "verified" | "featured" | "sponsored";
  baseDistance?: string;
  notes?: string;
  imageUrl?: string;
  status?: "active" | "pending" | "inactive";
  basesServed?: string[];
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  city?: string; // ✅ added to fix the "city" type errors
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

// Database row type (snake_case from Supabase)
interface BusinessRow {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  english_fluency?: string;
  verified?: boolean;
  featured?: boolean;
  featured_tier?: string;
  base_distance?: string;
  notes?: string;
  image_url?: string;
  status?: string;
  bases_served?: string[];
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  created_at?: string;
  updated_at?: string;
  city?: string; // ✅ match DB schema if you store it there
}

interface ReviewRow {
  id: string;
  business_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

// -------------------- Mappers --------------------

// Helper: Convert database row to Business object
function mapBusinessRow(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,
    location: row.location,
    address: row.address,
    phone: row.phone,
    email: row.email,
    website: row.website,
    englishFluency: row.english_fluency as Business["englishFluency"],
    verified: row.verified,
    featured: row.featured,
    featuredTier: row.featured_tier as Business["featuredTier"],
    baseDistance: row.base_distance,
    notes: row.notes,
    imageUrl: row.image_url,
    status: row.status as Business["status"],
    basesServed: row.bases_served,
    latitude: row.latitude,
    longitude: row.longitude,
    googleMapsUrl: row.google_maps_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    city: row.city ?? "", // ✅ fallback if missing
  };
}

// Helper: Convert database row to Review object
function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    businessId: row.business_id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

// -------------------- Queries --------------------

/**
 * Get all active businesses, ordered by name
 */
export async function getBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching businesses:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/**
 * Get featured businesses only
 */
export async function getFeaturedBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("featured", true)
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching featured businesses:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/**
 * Get a single business by ID (can be any status)
 */
export async function getBusinessById(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching business:", error);
    throw error;
  }

  return data ? mapBusinessRow(data as BusinessRow) : null;
}

/**
 * Get all reviews for a specific business
 */
export async function getReviewsByBusiness(businessId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }

  // ✅ Clean transformation to camelCase
  return (data as ReviewRow[]).map(mapReviewRow);
}

/**
 * Get businesses by category (active only)
 */
export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching businesses by category:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/**
 * Get businesses that serve a specific base
 */
export async function getBusinessesByBase(baseId: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .contains("bases_served", [baseId])
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching businesses by base:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/**
 * Get featured businesses for a specific base
 */
export async function getFeaturedBusinessesByBase(baseId: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .contains("bases_served", [baseId])
    .eq("featured", true)
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching featured businesses by base:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}
