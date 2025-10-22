// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Load environment variables for Vite.
 * VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in .env.local at project root
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Missing Supabase credentials in .env.local. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

/**
 * Public Supabase client
 * Used in frontend for reads/writes allowed by RLS
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Optional helper function for fetching data with error handling
 */
export async function fetchTable<T>(table: string): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*')
  if (error) {
    console.error(`❌ Error fetching ${table}:`, error.message)
    throw error
  }
  if (!data) return []
  return data as T[]
}