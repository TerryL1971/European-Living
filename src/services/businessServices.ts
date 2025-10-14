// src/services/businessService.ts
import { supabase } from "./supabaseClient";

export interface Business {
  id: string;
  name: string;
  category: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  businessId: string;
  authorName: string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

// ---------------- Queries ----------------

export async function getBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "active");
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("featured", true)
    .eq("status", "active");
  if (error) throw error;
  return data ?? [];
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getReviewsByBusiness(businessId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", businessId);
  if (error) throw error;
  return data ?? [];
}
