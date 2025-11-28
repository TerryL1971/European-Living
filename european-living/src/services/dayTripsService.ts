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

interface TagResponse {
  tag: {
    name: string;
  };
}

/**
 * Fetch all day trips
 */
export async function fetchDayTrips(baseId?: string): Promise<DayTripListItem[]> {
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

    const processedTrips = trips.map((trip) => ({
      ...trip,
      tags: Array.isArray(trip.tags) 
        ? (trip.tags as unknown as TagResponse[]).map((t) => ({ name: t.tag.name }))
        : [],
    }));

    return processedTrips;
  } catch (error) {
    console.error('Error fetching day trips:', error);
    throw error;
  }
}

/**
 * Fetch a single day trip by ID with full details
 */
export async function fetchDayTripById(tripId: string): Promise<DayTrip> {
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

    trip.tags = Array.isArray(trip.tags) 
      ? (trip.tags as TagResponse[]).map((t) => ({ name: t.tag.name })) 
      : [];

    if (trip.photos && Array.isArray(trip.photos)) {
      trip.photos.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
    }

    return trip;
  } catch (error) {
    console.error('Error fetching day trip:', error);
    throw error;
  }
}

/**
 * Fetch day trip by slug (for SEO-friendly URLs)
 */
export async function fetchDayTripBySlug(slug: string): Promise<DayTrip> {
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
      .eq('slug', slug)
      .single();

    if (error) throw error;

    trip.tags = Array.isArray(trip.tags) 
      ? (trip.tags as TagResponse[]).map((t) => ({ name: t.tag.name })) 
      : [];

    if (trip.photos && Array.isArray(trip.photos)) {
      trip.photos.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
    }

    return trip;
  } catch (error) {
    console.error('Error fetching day trip by slug:', error);
    throw error;
  }
}