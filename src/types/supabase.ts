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
          description: string | null;
          location: string;
          address: string | null;
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
          status: 'active' | 'pending' | 'inactive' | null;
          created_at: string | null;
          updated_at: string | null;
          bases_served: string[] | null;
          latitude: number | null;
          longitude: number | null;
          google_maps_url: string | null;
          subcategory: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['businesses']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>;
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
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
    };
  };
}
