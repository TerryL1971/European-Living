// src/services/dayTripsService.ts

import { supabase } from './supabaseClient';

export interface DayTrip {
  id: string;
  base_id: string;
  base_name: string;
  name: string;
  slug?: string;
  distance: string;
  drive_time: string;
  train_time?: string;
  description: string;
  short_description?: string;
  full_description?: string;
  best_for: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  cost: '$' | '$$' | '$$$';
  image_url?: string;
  hero_image_url?: string;
  rating?: number;
  is_must_see?: boolean;
  recommended_duration?: string;
  food_info?: string;
  ticket_info?: string;
  official_website?: string;
  latitude?: number;
  longitude?: number;
  what_to_see?: string;
  local_tips?: string;
  best_time_to_visit?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
  tags?: Array<{ name: string }>;
  photos?: Array<{ image_url: string; caption?: string; display_order: number }>;
}

export interface DayTripListItem {
  id: string;
  base_id: string;
  base_name: string;
  name: string;
  slug?: string;
  distance: string;
  drive_time: string;
  train_time?: string;
  description: string;
  short_description?: string;
  best_for: string[];
  difficulty: string;
  cost: string;
  image_url?: string;
  hero_image_url?: string;
  rating?: number;
  is_must_see?: boolean;
  recommended_duration?: string;
  featured?: boolean;
  latitude?: number;
  longitude?: number;
  tags?: Array<{ name: string }>;
}

/**
 * Fetch all day trips for a specific base (for list view)
 */
export async function fetchDayTrips(
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    let query = supabase
      .from('day_trips')
      .select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags(
          tag:tags(name)
        )
      `)
      .order('featured', { ascending: false })
      .order('rating', { ascending: false, nullsFirst: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    const { data: trips, error } = await query;

    if (error) throw error;

    const processedTrips = trips.map((trip: any) => ({
      ...trip,
      tags: trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error fetching day trips:', error);
    throw error;
  }
}

/**
 * Fetch a single day trip with full details
 */
export async function fetchDayTripById(
  tripId: string
): Promise<DayTrip> {
  try {
    const { data: trip, error } = await supabase
      .from('day_trips')
      .select(`
        *,
        tags:day_trip_tags(
          tag:tags(name)
        ),
        photos:day_trip_photos(image_url, caption, display_order)
      `)
      .eq('id', tripId)
      .single();

    if (error) throw error;

    trip.tags = trip.tags?.map((t: any) => ({ name: t.tag.name })) || [];

    if (trip.photos) {
      trip.photos.sort((a: any, b: any) => a.display_order - b.display_order);
    }

    return trip;
  } catch (error) {
    console.error('Error fetching day trip:', error);
    throw error;
  }
}

/**
 * Fetch day trips by difficulty level
 */
export async function fetchDayTripsByDifficulty(
  difficulty: 'Easy' | 'Moderate' | 'Challenging',
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    let query = supabase
      .from('day_trips')
      .select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags(
          tag:tags(name)
        )
      `)
      .eq('difficulty', difficulty)
      .order('rating', { ascending: false, nullsFirst: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    const { data: trips, error } = await query;

    if (error) throw error;

    const processedTrips = trips.map((trip: any) => ({
      ...trip,
      tags: trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error fetching day trips by difficulty:', error);
    throw error;
  }
}

/**
 * Fetch day trips by tag
 */
export async function fetchDayTripsByTag(
  tagName: string,
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    let query = supabase
      .from('day_trips')
      .select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags!inner(
          tag:tags!inner(name)
        )
      `)
      .eq('tags.tag.name', tagName)
      .order('rating', { ascending: false, nullsFirst: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    const { data: trips, error } = await query;

    if (error) throw error;

    const processedTrips = trips.map((trip: any) => ({
      ...trip,
      tags: trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error fetching day trips by tag:', error);
    throw error;
  }
}

/**
 * Search day trips by name or description
 */
export async function searchDayTrips(
  searchQuery: string,
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    let query = supabase
      .from('day_trips')
      .select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags(
          tag:tags(name)
        )
      `)
      .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      .order('rating', { ascending: false, nullsFirst: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    const { data: trips, error } = await query;

    if (error) throw error;

    const processedTrips = trips.map((trip: any) => ({
      ...trip,
      tags: trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error searching day trips:', error);
    throw error;
  }
}

/**
 * Fetch featured day trips
 */
export async function fetchFeaturedDayTrips(
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    let query = supabase
      .from('day_trips')
      .select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags(
          tag:tags(name)
        )
      `)
      .eq('featured', true)
      .order('rating', { ascending: false, nullsFirst: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    const { data: trips, error } = await query;

    if (error) throw error;

    const processedTrips = trips.map((trip: any) => ({
      ...trip,
      tags: trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error fetching featured day trips:', error);
    throw error;
  }
}

/**
 * Save/unsave a day trip for a user
 */
export async function toggleSavedDayTrip(
  userId: string,
  tripId: string
): Promise<boolean> {
  try {
    const { data: existing } = await supabase
      .from('user_saved_trips')
      .select('id')
      .eq('user_id', userId)
      .eq('day_trip_id', tripId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('user_saved_trips')
        .delete()
        .eq('user_id', userId)
        .eq('day_trip_id', tripId);

      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('user_saved_trips')
        .insert({ user_id: userId, day_trip_id: tripId });

      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Error toggling saved day trip:', error);
    throw error;
  }
}

/**
 * Check if a day trip is saved by the user
 */
export async function isDayTripSaved(
  userId: string,
  tripId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_saved_trips')
      .select('id')
      .eq('user_id', userId)
      .eq('day_trip_id', tripId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    return !!data;
  } catch (error) {
    console.error('Error checking if day trip is saved:', error);
    return false;
  }
}

/**
 * Get user's saved day trips
 */
export async function fetchSavedDayTrips(
  userId: string,
  baseId?: string
): Promise<DayTripListItem[]> {
  try {
    const { data: savedTrips, error } = await supabase
      .from('user_saved_trips')
      .select(`
        day_trip:day_trips(
          id,
          base_id,
          base_name,
          name,
          slug,
          distance,
          drive_time,
          train_time,
          description,
          short_description,
          best_for,
          difficulty,
          cost,
          image_url,
          hero_image_url,
          rating,
          is_must_see,
          recommended_duration,
          featured,
          latitude,
          longitude,
          tags:day_trip_tags(
            tag:tags(name)
          )
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    const trips = savedTrips.map((st: any) => ({
      ...st.day_trip,
      tags: st.day_trip.tags?.map((t: any) => ({ name: t.tag.name })) || [],
    }));

    if (baseId) {
      return trips.filter((trip: any) => trip.base_id === baseId);
    }

    return trips;
  } catch (error) {
    console.error('Error fetching saved day trips:', error);
    throw error;
  }
}

/**
 * Get all available bases (unique base_ids from day_trips)
 */
export async function fetchAvailableBases(): Promise<Array<{id: string, name: string}>> {
  try {
    const { data, error } = await supabase
      .from('day_trips')
      .select('base_id, base_name')
      .order('base_name');

    if (error) throw error;

    const uniqueBases = Array.from(
      new Map(data.map((item: any) => [item.base_id, item])).values()
    );

    return uniqueBases.map((b: any) => ({ id: b.base_id, name: b.base_name }));
  } catch (error) {
    console.error('Error fetching available bases:', error);
    throw error;
  }
}