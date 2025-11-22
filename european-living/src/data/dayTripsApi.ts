// src/data/dayTripsApi.ts

// Assume this path correctly points to your client setup
import { supabase } from '../services/supabaseClient'; 

// Interface matching the Supabase table column names
export interface DayTrip {
  // We use string for ID to handle the UUID type
  id: string; 
  base_id: string;      
  base_name: string;    
  name: string;
  distance: string;
  drive_time: string; // Updated to match Supabase schema snake_case
  train_time?: string; // Updated to match Supabase schema snake_case
  description: string;
  best_for: string[]; // Updated to match Supabase schema snake_case
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  cost: '$' | '$$' | '$$$';
  image_url?: string; // ⬅️ Centralized Image URL
  featured: boolean;
}

// Interface for the grouped structure needed by the UI components
export interface BaseDayTrips {
  baseId: string;
  baseName: string;
  trips: DayTrip[];
}

/**
 * Fetches day trips from the Supabase 'day_trips' table and groups them by base.
 * @returns A promise that resolves to an array of BaseDayTrips.
 */
export async function fetchDayTrips(): Promise<BaseDayTrips[]> {
  const { data, error } = await supabase
    .from('day_trips')
    // Select all fields
    .select('*') 
    // Order by base name then trip name for consistent display
    .order('base_name', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching day trips:', error);
    // Throw an error to be handled by the calling component (Page/Screen)
    throw new Error('Failed to load day trip data from the database.'); 
  }

  // Logic to transform the flat Supabase array into the grouped structure (BaseDayTrips[])
  const groupedTrips = data.reduce((acc: BaseDayTrips[], trip) => {
    // Find an existing base entry
    let base = acc.find(b => b.baseId === trip.base_id);

    // If the base is not found, create a new one
    if (!base) {
      base = {
        baseId: trip.base_id,
        baseName: trip.base_name,
        trips: [],
      };
      acc.push(base);
    }

    // Add the current trip (cast back to our interface)
    base.trips.push(trip as DayTrip);

    return acc;
  }, []);

  return groupedTrips;
}