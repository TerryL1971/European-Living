// src/services/businessServices.ts

import { supabase } from './supabaseClient';
import { 
  Business, 
  Review, 
  ServiceCategory,
  mapSupabaseToBusiness,
  mapBusinessToSupabase,
  mapSupabaseToReview 
} from '../types/business';

// ==================== FETCH FUNCTIONS ====================

/**
 * Fetch all businesses (with optional filters)
 */
export async function fetchBusinesses(filters?: {
  category?: ServiceCategory;
  subcategory?: string;
  baseId?: string;
  status?: string;
}): Promise<Business[]> {
  try {
    let query = supabase.from('businesses').select('*');

    // Apply filters
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.subcategory) {
      query = query.eq('subcategory', filters.subcategory);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    } else {
      // Default: only show active businesses
      query = query.eq('status', 'active');
    }

    // Filter by base if specified
    if (filters?.baseId && filters.baseId !== 'all') {
      query = query.contains('bases_served', [filters.baseId]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching businesses:', error);
      throw error;
    }

    // ✅ Map Supabase data to frontend format
    return (data || []).map(mapSupabaseToBusiness);
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
    return [];
  }
}

/**
 * Fetch single business by ID
 */
export async function fetchBusinessById(id: string): Promise<Business | null> {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching business:', error);
      throw error;
    }

    // ✅ Map to frontend format
    return data ? mapSupabaseToBusiness(data) : null;
  } catch (error) {
    console.error('Failed to fetch business:', error);
    return null;
  }
}

/**
 * Fetch businesses by category
 */
export async function fetchBusinessesByCategory(
  category: ServiceCategory,
  baseId?: string
): Promise<Business[]> {
  return fetchBusinesses({ category, baseId });
}

/**
 * Search businesses by query
 */
export async function searchBusinesses(
  query: string,
  filters?: {
    category?: ServiceCategory;
    baseId?: string;
  }
): Promise<Business[]> {
  try {
    let supabaseQuery = supabase
      .from('businesses')
      .select('*')
      .eq('status', 'active');

    // Text search across multiple fields
    supabaseQuery = supabaseQuery.or(
      `name.ilike.%${query}%,description.ilike.%${query}%,city.ilike.%${query}%`
    );

    // Apply additional filters
    if (filters?.category) {
      supabaseQuery = supabaseQuery.eq('category', filters.category);
    }
    if (filters?.baseId && filters.baseId !== 'all') {
      supabaseQuery = supabaseQuery.contains('bases_served', [filters.baseId]);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error('Error searching businesses:', error);
      throw error;
    }

    // ✅ Map to frontend format
    return (data || []).map(mapSupabaseToBusiness);
  } catch (error) {
    console.error('Failed to search businesses:', error);
    return [];
  }
}

// ==================== MUTATION FUNCTIONS ====================

/**
 * Create new business
 */
export async function createBusiness(business: Partial<Business>): Promise<Business | null> {
  try {
    // ✅ Convert to Supabase format
    const supabaseData = mapBusinessToSupabase(business as Business);

    const { data, error } = await supabase
      .from('businesses')
      .insert([supabaseData])
      .select()
      .single();

    if (error) {
      console.error('Error creating business:', error);
      throw error;
    }

    // ✅ Map back to frontend format
    return data ? mapSupabaseToBusiness(data) : null;
  } catch (error) {
    console.error('Failed to create business:', error);
    return null;
  }
}

/**
 * Update existing business
 */
export async function updateBusiness(
  id: string,
  updates: Partial<Business>
): Promise<Business | null> {
  try {
    // ✅ Convert to Supabase format
    const supabaseData = mapBusinessToSupabase(updates as Business);

    const { data, error } = await supabase
      .from('businesses')
      .update(supabaseData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating business:', error);
      throw error;
    }

    // ✅ Map back to frontend format
    return data ? mapSupabaseToBusiness(data) : null;
  } catch (error) {
    console.error('Failed to update business:', error);
    return null;
  }
}

/**
 * Delete business
 */
export async function deleteBusiness(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting business:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete business:', error);
    return false;
  }
}

// ==================== REVIEW FUNCTIONS ====================

/**
 * Fetch reviews for a business
 */
export async function fetchReviews(businessId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    // ✅ Map to frontend format
    return (data || []).map(mapSupabaseToReview);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

/**
 * Create new review
 */
export async function createReview(review: {
  businessId: string;
  authorName: string;
  rating: number;
  comment?: string;
}): Promise<Review | null> {
  try {
    // ✅ Convert to Supabase format
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        business_id: review.businessId, // camelCase → snake_case
        author_name: review.authorName, // camelCase → snake_case
        rating: review.rating,
        comment: review.comment,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    // ✅ Map back to frontend format
    return data ? mapSupabaseToReview(data) : null;
  } catch (error) {
    console.error('Failed to create review:', error);
    return null;
  }
}

// ==================== AGGREGATION FUNCTIONS ====================

/**
 * Get business count by category
 */
export async function getBusinessCountByCategory(): Promise<Record<ServiceCategory, number>> {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('category')
      .eq('status', 'active');

    if (error) throw error;

    const counts: Record<string, number> = {};
    (data || []).forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts as Record<ServiceCategory, number>;
  } catch (error) {
    console.error('Failed to get category counts:', error);
    return {} as Record<ServiceCategory, number>;
  }
}

/**
 * Get featured businesses
 */
export async function getFeaturedBusinesses(limit: number = 6): Promise<Business[]> {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // ✅ Map to frontend format
    return (data || []).map(mapSupabaseToBusiness);
  } catch (error) {
    console.error('Failed to fetch featured businesses:', error);
    return [];
  }
}