// src/types/supabase.ts

/**
 * Complete Supabase Database Type Definitions
 * Auto-generated types would go here, but we're defining manually for completeness
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          name: string;
          category: string;
          subcategory: string | null;
          description: string | null;
          location: string;
          address: string | null;
          city: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          english_fluency: 'fluent' | 'conversational' | 'basic' | null;
          verified: boolean | null;
          featured: boolean | null;
          featured_tier: 'free' | 'verified' | 'featured' | 'sponsored' | null;
          base_distance: string | null;
          notes: string | null;
          image_url: string | null;
          images: string[] | null;
          status: 'active' | 'pending' | 'inactive' | null;
          created_at: string | null;
          updated_at: string | null;
          bases_served: string[] | null;
          latitude: number | null;
          longitude: number | null;
          google_maps_url: string | null;
          // Military features
          sofa_familiar: boolean | null;
          military_discount: boolean | null;
          discount_percent: number | null;
          // Additional fields
          price_range: string | null;
          rating: number | null;
          review_count: number | null;
          tags: string[] | null;
          is_on_base: boolean | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          subcategory?: string | null;
          description?: string | null;
          location: string;
          address?: string | null;
          city?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          english_fluency?: 'fluent' | 'conversational' | 'basic' | null;
          verified?: boolean | null;
          featured?: boolean | null;
          featured_tier?: 'free' | 'verified' | 'featured' | 'sponsored' | null;
          base_distance?: string | null;
          notes?: string | null;
          image_url?: string | null;
          images?: string[] | null;
          status?: 'active' | 'pending' | 'inactive' | null;
          created_at?: string | null;
          updated_at?: string | null;
          bases_served?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          google_maps_url?: string | null;
          sofa_familiar?: boolean | null;
          military_discount?: boolean | null;
          discount_percent?: number | null;
          price_range?: string | null;
          rating?: number | null;
          review_count?: number | null;
          tags?: string[] | null;
          is_on_base?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          subcategory?: string | null;
          description?: string | null;
          location?: string;
          address?: string | null;
          city?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          english_fluency?: 'fluent' | 'conversational' | 'basic' | null;
          verified?: boolean | null;
          featured?: boolean | null;
          featured_tier?: 'free' | 'verified' | 'featured' | 'sponsored' | null;
          base_distance?: string | null;
          notes?: string | null;
          image_url?: string | null;
          images?: string[] | null;
          status?: 'active' | 'pending' | 'inactive' | null;
          created_at?: string | null;
          updated_at?: string | null;
          bases_served?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          google_maps_url?: string | null;
          sofa_familiar?: boolean | null;
          military_discount?: boolean | null;
          discount_percent?: number | null;
          price_range?: string | null;
          rating?: number | null;
          review_count?: number | null;
          tags?: string[] | null;
          is_on_base?: boolean | null;
        };
      };

      reviews: {
        Row: {
          id: string;
          business_id: string | null;
          author_name: string;
          rating: number | null;
          comment: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          business_id?: string | null;
          author_name: string;
          rating?: number | null;
          comment?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string | null;
          author_name?: string;
          rating?: number | null;
          comment?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}