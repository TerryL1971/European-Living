// src/services/featuredContentService.ts
import { supabase } from './supabaseClient';
import { FeaturedContent, FeaturedContentCreate } from '../types/featuredContent';

/**
 * Get active featured content filtered by base
 * @param baseId - The base to filter by ('all' shows content for all bases)
 * @returns Array of featured content items
 */
export async function getFeaturedContent(baseId: string = 'all'): Promise<FeaturedContent[]> {
  try {
    const query = supabase
      .from('featured_content')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching featured content:', error);
      return [];
    }

    if (!data) return [];

    // Filter by base on the client side (because Supabase has limited array query support)
    const filtered = data.filter((item: FeaturedContent) => {
      // Show if 'all' is in bases_served
      if (item.bases_served.includes('all')) return true;
      
      // Show if user's base is in bases_served
      if (baseId !== 'all' && item.bases_served.includes(baseId)) return true;
      
      // If user selected 'all', show items for any base
      if (baseId === 'all') return true;
      
      return false;
    });

    // Filter by date (only show current items)
    const now = new Date();
    const currentItems = filtered.filter((item: FeaturedContent) => {
      const startDate = item.start_date ? new Date(item.start_date) : null;
      const endDate = item.end_date ? new Date(item.end_date) : null;

      // Check start date
      if (startDate && startDate > now) return false;
      
      // Check end date
      if (endDate && endDate < now) return false;
      
      return true;
    });

    // Limit to 3 items
    return currentItems.slice(0, 3);
  } catch (error) {
    console.error('Unexpected error fetching featured content:', error);
    return [];
  }
}

/**
 * Get all featured content (for admin)
 */
export async function getAllFeaturedContent(): Promise<FeaturedContent[]> {
  try {
    const { data, error } = await supabase
      .from('featured_content')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching all featured content:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}

/**
 * Create new featured content
 */
export async function createFeaturedContent(content: FeaturedContentCreate): Promise<FeaturedContent | null> {
  try {
    const { data, error } = await supabase
      .from('featured_content')
      .insert([content])
      .select()
      .single();

    if (error) {
      console.error('Error creating featured content:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

/**
 * Update featured content
 */
export async function updateFeaturedContent(
  id: string, 
  updates: Partial<FeaturedContentCreate>
): Promise<FeaturedContent | null> {
  try {
    const { data, error } = await supabase
      .from('featured_content')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating featured content:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

/**
 * Delete featured content
 */
export async function deleteFeaturedContent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('featured_content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting featured content:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}