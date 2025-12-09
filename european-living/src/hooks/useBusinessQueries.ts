// src/hooks/useBusinessQueries.ts

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';
import { Business, mapSupabaseToBusiness } from '../types/business';

export function useBusinesses() {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async (): Promise<Business[]> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      // Map snake_case to camelCase
      return (data || []).map(mapSupabaseToBusiness);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBusinessesByCategory(category: string) {
  return useQuery({
    queryKey: ['businesses', 'category', category],
    queryFn: async (): Promise<Business[]> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'active')
        .eq('category', category)
        .order('featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) {
        console.error(`Error fetching businesses for category ${category}:`, error);
        throw error;
      }

      // Map snake_case to camelCase
      return (data || []).map(mapSupabaseToBusiness);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useBusinessesByBase(base: string) {
  return useQuery({
    queryKey: ['businesses', 'base', base],
    queryFn: async (): Promise<Business[]> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'active')
        .contains('bases_served', [base])
        .order('featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) {
        console.error(`Error fetching businesses for base ${base}:`, error);
        throw error;
      }

      // Map snake_case to camelCase
      return (data || []).map(mapSupabaseToBusiness);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useBusiness(id: string) {
  return useQuery({
    queryKey: ['business', id],
    queryFn: async (): Promise<Business | null> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error fetching business ${id}:`, error);
        throw error;
      }

      // Map snake_case to camelCase
      return data ? mapSupabaseToBusiness(data) : null;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}