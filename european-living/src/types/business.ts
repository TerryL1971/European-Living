// src/types/business.ts

import { Database } from './supabase';

/**
 * Unified Business Type System
 * Matches Supabase schema with camelCase frontend naming
 * NO 'any' types - fully type-safe
 */

// ==================== SUPABASE ROW TYPES ====================

type SupabaseBusinessRow = Database['public']['Tables']['businesses']['Row'];
type SupabaseReviewRow = Database['public']['Tables']['reviews']['Row'];

// ==================== CORE TYPES ====================

export type ServiceCategory = 
  | 'restaurants'
  | 'shopping'
  | 'home-services'
  | 'real-estate'
  | 'legal'
  | 'education'
  | 'business';

export type EnglishFluency = 'fluent' | 'conversational' | 'basic';
export type FeaturedTier = 'free' | 'verified' | 'featured' | 'sponsored';
export type BusinessStatus = 'active' | 'pending' | 'inactive';
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

// ==================== BUSINESS INTERFACE ====================

export interface Business {
  // Core Info
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  description?: string | null;

  // Location
  location: string;
  address?: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  basesServed?: string[] | null;
  baseDistance?: string | null;
  googleMapsUrl?: string | null;

  // Contact
  phone?: string | null;
  email?: string | null;
  website?: string | null;

  // Features
  englishFluency?: EnglishFluency | null;
  sofaFamiliar?: boolean | null;
  militaryDiscount?: boolean | null;
  discountPercent?: number | null;

  // Metadata
  verified?: boolean | null;
  featured?: boolean | null;
  featuredTier?: FeaturedTier | null;
  status?: BusinessStatus | null;
  priceRange?: string | null;
  rating?: number | null;
  reviewCount?: number | null;

  // Media
  imageUrl?: string | null;
  images?: string[] | null;

  // Administrative
  notes?: string | null;
  tags?: string[] | null;
  isOnBase?: boolean | null;
  
  // Timestamps
  createdAt?: string | null;
  updatedAt?: string | null;
}

// ==================== REVIEW INTERFACE ====================

export interface Review {
  id: string;
  businessId: string | null;
  authorName: string;
  rating: number | null;
  comment?: string | null;
  createdAt: string | null;
}

// ==================== MAPPER FUNCTIONS ====================

/**
 * Maps Supabase snake_case to frontend camelCase
 * Fully type-safe - uses Database types from supabase.ts
 */
export function mapSupabaseToBusiness(row: SupabaseBusinessRow): Business {
  return {
    // Core
    id: row.id,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,

    // Location
    location: row.location,
    address: row.address,
    city: row.city,
    latitude: row.latitude,
    longitude: row.longitude,
    basesServed: row.bases_served,
    baseDistance: row.base_distance,
    googleMapsUrl: row.google_maps_url,

    // Contact
    phone: row.phone,
    email: row.email,
    website: row.website,

    // Features
    englishFluency: row.english_fluency,
    sofaFamiliar: row.sofa_familiar,
    militaryDiscount: row.military_discount,
    discountPercent: row.discount_percent,

    // Metadata
    verified: row.verified,
    featured: row.featured,
    featuredTier: row.featured_tier,
    status: row.status,
    priceRange: row.price_range,
    rating: row.rating,
    reviewCount: row.review_count,

    // Media
    imageUrl: row.image_url,
    images: row.images,

    // Administrative
    notes: row.notes,
    tags: row.tags,
    isOnBase: row.is_on_base,

    // Timestamps
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps frontend camelCase to Supabase snake_case
 * Returns type-safe Supabase Insert type
 */
export function mapBusinessToSupabase(
  business: Partial<Business>
): Database['public']['Tables']['businesses']['Insert'] {
  return {
    name: business.name ?? '',
    category: business.category ?? '',
    location: business.location ?? '',
    subcategory: business.subcategory ?? null,
    description: business.description ?? null,
    address: business.address ?? null,
    city: business.city ?? null,
    phone: business.phone ?? null,
    email: business.email ?? null,
    website: business.website ?? null,
    english_fluency: business.englishFluency ?? null,
    verified: business.verified ?? null,
    featured: business.featured ?? null,
    featured_tier: business.featuredTier ?? null,
    base_distance: business.baseDistance ?? null,
    notes: business.notes ?? null,
    image_url: business.imageUrl ?? null,
    status: business.status ?? null,
    bases_served: business.basesServed ?? null,
    latitude: business.latitude ?? null,
    longitude: business.longitude ?? null,
    google_maps_url: business.googleMapsUrl ?? null,
    sofa_familiar: business.sofaFamiliar ?? null,
    military_discount: business.militaryDiscount ?? null,
    discount_percent: business.discountPercent ?? null,
    price_range: business.priceRange ?? null,
    rating: business.rating ?? null,
    review_count: business.reviewCount ?? null,
    images: business.images ?? null,
    tags: business.tags ?? null,
    is_on_base: business.isOnBase ?? null,
  };
}

/**
 * Maps Supabase review to frontend format
 * Fully type-safe
 */
export function mapSupabaseToReview(row: SupabaseReviewRow): Review {
  return {
    id: row.id,
    businessId: row.business_id,
    authorName: row.author_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

// ==================== SUBCATEGORIES ====================

export const SERVICE_SUBCATEGORIES: Record<ServiceCategory, string[]> = {
  restaurants: [
    'American',
    'Italian',
    'Asian',
    'German/Traditional',
    'Fast Food',
    'Pizza',
    'Breakfast/Brunch',
    'Vegetarian/Vegan',
    'Steakhouse',
    'Seafood',
    'Mexican',
    'Mediterranean',
    'Bakery/Café'
  ],
  shopping: [
    'Grocery Stores',
    'American Food Stores',
    'Clothing',
    'Electronics',
    'Home Goods',
    'Furniture',
    'Toys',
    'Sports Equipment',
    'Pet Supplies',
    'Pharmacies',
    'Beauty/Cosmetics'
  ],
  'home-services': [
    'Plumbing',
    'Electrical',
    'HVAC',
    'General Handyman',
    'Painting',
    'Cleaning Services',
    'Landscaping',
    'Moving Services',
    'Appliance Repair',
    'Pest Control',
    'Internet/TV Installation'
  ],
  'real-estate': [
    'Rental Agents',
    'Home Purchase Agents',
    'Property Management',
    'Relocation Services',
    'Furniture Rental',
    'Storage'
  ],
  legal: [
    'Immigration Law',
    'SOFA Status',
    'Family Law',
    'Contract Review',
    'Estate Planning',
    'Notary Services',
    'Traffic Violations',
    'Tax Law'
  ],
  education: [
    'International Schools',
    'DoDEA Schools',
    'Preschools/Kindergartens',
    'English Tutoring',
    'German Language Schools',
    'Music Lessons',
    'Sports Programs',
    'After-School Care',
    'University Programs'
  ],
  business: [
    'Tax Advisors',
    'Accountants',
    'US Tax Preparation',
    'Business Formation',
    'Translation Services',
    'Insurance Agents',
    'Financial Planning',
    'Consulting'
  ]
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get display name for category
 */
export function getCategoryDisplayName(category: ServiceCategory): string {
  const names: Record<ServiceCategory, string> = {
    'restaurants': 'Restaurants & Dining',
    'shopping': 'Shopping',
    'home-services': 'Home Services',
    'real-estate': 'Real Estate',
    'legal': 'Legal Services',
    'education': 'Education',
    'business': 'Business Services'
  };
  return names[category] || category;
}

/**
 * Check if business serves a specific base
 */
export function servesBase(business: Business, baseId: string): boolean {
  if (!business.basesServed || business.basesServed.length === 0) {
    return true; // If no bases specified, show to everyone
  }
  return business.basesServed.includes(baseId);
}

/**
 * Format price range display
 */
export function formatPriceRange(priceRange?: string | null): string {
  if (!priceRange) return 'N/A';
  return priceRange;
}

/**
 * Format rating display
 */
export function formatRating(rating?: number | null): string {
  if (!rating) return 'No rating';
  return `${rating.toFixed(1)} ⭐`;
}

/**
 * Get category icon emoji (for UI display)
 */
export function getCategoryIcon(category: ServiceCategory): string {
  const icons: Record<ServiceCategory, string> = {
    'restaurants': '🍽️',
    'shopping': '🛍️',
    'home-services': '🔧',
    'real-estate': '🏠',
    'legal': '⚖️',
    'education': '🎓',
    'business': '💼'
  };
  return icons[category] || '📍';
}