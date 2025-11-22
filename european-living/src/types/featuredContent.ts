// src/types/featuredContent.ts

export type FeaturedContentType = 'article' | 'video' | 'offer' | 'advertisement';

export interface FeaturedContent {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  cta_text: string;
  type: FeaturedContentType;
  bases_served: string[];
  is_sponsored: boolean;
  sponsor_name: string | null;
  active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeaturedContentCreate {
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  cta_text?: string;
  type: FeaturedContentType;
  bases_served?: string[];
  is_sponsored?: boolean;
  sponsor_name?: string;
  active?: boolean;
  display_order?: number;
  start_date?: string;
  end_date?: string;
}