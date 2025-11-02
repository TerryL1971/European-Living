// src/types/business.ts

export interface Business {
  id: string;
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  location?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  base?: string;
  englishFluency?: string;
  featuredTier?: string;
  status?: string;
  is_on_base?: boolean;  
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  business_id: string;   // snake_case from Supabase
  user_name: string;     // snake_case from Supabase
  comment: string;
  rating: number;
  created_at: string;    // snake_case from Supabase
}
