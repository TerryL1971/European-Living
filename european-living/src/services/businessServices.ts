// src/services/businessServices.ts
import { supabase } from "./supabaseClient";

// =======================
// Interfaces
// =======================

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
  city?: string;
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

// Database row type (snake_case)
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
  city?: string;
}

interface ReviewRow {
  id: string;
  business_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

// =======================
// Mappers
// =======================

function mapBusinessRow(row: BusinessRow): Business {
  let imageUrl = row.image_url ?? "";

  // ✅ Automatically resolve Supabase public URL if not absolute
  if (imageUrl && !imageUrl.startsWith("http")) {
    const { data: publicUrlData } = supabase.storage
      .from("images") // ⚠️ change if your bucket name is different
      .getPublicUrl(imageUrl);
    imageUrl = publicUrlData?.publicUrl || imageUrl;
  }

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
    imageUrl, // ✅ always usable full URL
    status: row.status as Business["status"],
    basesServed: row.bases_served,
    latitude: row.latitude,
    longitude: row.longitude,
    googleMapsUrl: row.google_maps_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    city: row.city ?? "",
  };
}

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

// =======================
// Queries
// =======================

/** Get all active businesses, optionally filtered by base */
export async function getBusinesses(baseId?: string): Promise<Business[]> {
  let query = supabase
    .from("businesses")
    .select("*")
    .eq("status", "active")
    .eq("is_on_base", false); // Exclude on-base businesses

  // If a base is selected, filter by it
  if (baseId && baseId !== "all") {
    query = query.contains("bases_served", [baseId]);
  }

  query = query.order("name", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching businesses:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/** Get all featured businesses */
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

/** Get a single business by ID */
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

/** Get all reviews for a specific business */
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

  return (data as ReviewRow[]).map(mapReviewRow);
}

/** Get businesses by category, optionally filtered by base */
export async function getBusinessesByCategory(
  category: string,
  baseId?: string
): Promise<Business[]> {
  let query = supabase
    .from("businesses")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .eq("is_on_base", false); // Exclude on-base businesses

  // If a base is selected, filter by it
  if (baseId && baseId !== "all") {
    query = query.contains("bases_served", [baseId]);
  }

  query = query.order("name", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching businesses by category:", error);
    throw error;
  }

  return (data as BusinessRow[]).map(mapBusinessRow);
}

/** Get businesses that serve a specific base */
export const getBusinessesByBase = async (baseId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'active')
    .eq('is_on_base', false)  // ← Exclude on-base
    .contains('bases_served', [baseId]);
    
  if (error) throw error;
  return data;
};

/** Get featured businesses that serve a specific base */
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