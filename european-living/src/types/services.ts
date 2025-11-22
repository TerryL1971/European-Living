// src/types/services.ts

/**
 * @deprecated This file is deprecated. Use types/business.ts instead.
 * 
 * This file will be removed in a future version.
 * Migration guide:
 * - Import directly from types/business.ts
 */

// ✅ Simple re-exports (no renaming)
export type {
  Business,
  Review,
  ServiceCategory,
  EnglishFluency,
  FeaturedTier,
  BusinessStatus,
  PriceRange,
} from './business';

export {
  SERVICE_SUBCATEGORIES,
  getCategoryDisplayName,
  servesBase,
  formatPriceRange,
  formatRating,
  getCategoryIcon,
  mapSupabaseToBusiness,
  mapBusinessToSupabase,
  mapSupabaseToReview,
} from './business';

// Legacy alias for backward compatibility
import { Business } from './business';
export type ServiceBusiness = Business;

// Legacy filter and sort functions
export interface ServiceFilters {
  category?: string;
  subcategory?: string;
  city?: string;
  nearbyBase?: string;
  englishFluency?: 'fluent' | 'conversational' | 'basic';
  militaryDiscount?: boolean;
  sofaFamiliar?: boolean;
  priceRange?: Array<'$' | '$$' | '$$$' | '$$$$'>;
  minRating?: number;
  searchQuery?: string;
}

export function filterServices(
  services: Business[],
  filters: ServiceFilters
): Business[] {
  return services.filter(service => {
    if (filters.category && service.category !== filters.category) {
      return false;
    }

    if (filters.subcategory && service.subcategory !== filters.subcategory) {
      return false;
    }

    if (filters.city && service.city?.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    if (filters.nearbyBase && !service.basesServed?.includes(filters.nearbyBase)) {
      return false;
    }

    if (filters.englishFluency && service.englishFluency !== filters.englishFluency) {
      return false;
    }

    if (filters.militaryDiscount && !service.militaryDiscount) {
      return false;
    }

    if (filters.sofaFamiliar && !service.sofaFamiliar) {
      return false;
    }

    if (filters.priceRange?.length && service.priceRange) {
      const validPriceRanges: Array<'$' | '$$' | '$$$' | '$$$$'> = ['$', '$$', '$$$', '$$$$'];
      const priceRange = service.priceRange as '$' | '$$' | '$$$' | '$$$$';
      if (validPriceRanges.includes(priceRange) && !filters.priceRange.includes(priceRange)) {
        return false;
      }
    }

    if (filters.minRating && (!service.rating || service.rating < filters.minRating)) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        service.name,
        service.description,
        service.city,
        service.subcategory,
        ...(service.tags || [])
      ].filter(Boolean).join(' ').toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export type SortOption = 
  | 'rating-desc'
  | 'rating-asc'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'featured';

export function sortServices(
  services: Business[],
  sortBy: SortOption
): Business[] {
  const sorted = [...services];

  switch (sortBy) {
    case 'rating-desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    case 'rating-asc':
      return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    
    case 'price-asc': {
      const priceOrder: Record<string, number> = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
      return sorted.sort((a, b) => {
        if (!a.priceRange || !b.priceRange) return 0;
        return priceOrder[a.priceRange] - priceOrder[b.priceRange];
      });
    }
    
    case 'price-desc': {
      const priceOrderDesc: Record<string, number> = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
      return sorted.sort((a, b) => {
        if (!a.priceRange || !b.priceRange) return 0;
        return priceOrderDesc[b.priceRange] - priceOrderDesc[a.priceRange];
      });
    }
    
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
    
    default:
      return sorted;
  }
}