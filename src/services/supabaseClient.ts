import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials in .env.local");
}

/**
 * Public Supabase client for client-side reads/writes that are
 * allowed by Row-Level Security (RLS).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
