import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  english_fluency: "fluent" | "conversational" | "basic";
  verified: boolean;
  featured: boolean;
  featured_tier?: "free" | "verified" | "featured" | "sponsored";
  base_distance?: string;
  notes?: string;
  image_url?: string;
  status: "active" | "pending" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  business_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

// ✅ Get all active businesses
export async function getBusinesses() {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("verified", { ascending: false });

  if (error) throw error;
  return data as Business[];
}

// ✅ Get businesses by category
export async function getBusinessesByCategory(category: string) {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .order("featured", { ascending: false });

  if (error) throw error;
  return data as Business[];
}

// ✅ Get featured businesses
export async function getFeaturedBusinesses() {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("featured", true)
    .eq("status", "active")
    .order("featured_tier", { ascending: true });

  if (error) throw error;
  return data as Business[];
}

// ✅ Get a single business by ID
export async function getBusinessById(id: string) {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Business;
}

// ✅ Get reviews for a business
export async function getReviewsByBusiness(businessId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Review[];
}

// ✅ Submit a new review
export async function submitReview(review: Omit<Review, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("reviews")
    .insert(review)
    .select()
    .single();

  if (error) throw error;
  return data as Review;
}
