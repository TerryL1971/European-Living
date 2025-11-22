// src/hooks/useBusinessQueries.ts

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  fetchBusinesses, 
  fetchBusinessById, 
  fetchReviews,
  getFeaturedBusinesses 
} from '../services/businessServices';
import { Business, Review, ServiceCategory } from '../types/business';

/**
 * Hook to fetch all businesses with optional filters
 * Data is cached and automatically refetched in background
 */
export function useBusinesses(filters?: {
  category?: ServiceCategory;
  subcategory?: string;
  baseId?: string;
  status?: string;
}): UseQueryResult<Business[], Error> {
  return useQuery({
    queryKey: ['businesses', filters], // Cache key includes filters
    queryFn: () => fetchBusinesses(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch single business by ID
 */
export function useBusiness(id: string | undefined): UseQueryResult<Business | null, Error> {
  return useQuery({
    queryKey: ['business', id],
    queryFn: () => id ? fetchBusinessById(id) : Promise.resolve(null),
    enabled: !!id, // Only run query if ID exists
    staleTime: 10 * 60 * 1000, // 10 minutes (business details change less often)
  });
}

/**
 * Hook to fetch reviews for a business
 */
export function useReviews(businessId: string | undefined): UseQueryResult<Review[], Error> {
  return useQuery({
    queryKey: ['reviews', businessId],
    queryFn: () => businessId ? fetchReviews(businessId) : Promise.resolve([]),
    enabled: !!businessId,
    staleTime: 2 * 60 * 1000, // 2 minutes (reviews change more frequently)
  });
}

/**
 * Hook to fetch featured businesses
 */
export function useFeaturedBusinesses(limit: number = 6): UseQueryResult<Business[], Error> {
  return useQuery({
    queryKey: ['businesses', 'featured', limit],
    queryFn: () => getFeaturedBusinesses(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch businesses by category with base filter
 */
export function useBusinessesByCategory(
  category: ServiceCategory | undefined,
  baseId?: string
): UseQueryResult<Business[], Error> {
  return useQuery({
    queryKey: ['businesses', 'category', category, baseId],
    queryFn: () => category ? fetchBusinesses({ category, baseId }) : Promise.resolve([]),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}