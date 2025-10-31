// types/services.ts

export interface ServiceLocation {
  city: string;
  state?: string;
  address?: string;
  postalCode?: string;
  country: string;
  nearbyBases?: string[];
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
}

export interface LanguageSupport {
  english: boolean;
  german: boolean;
  other?: string[];
  englishFluency?: 'fluent' | 'conversational' | 'basic';
}

export interface MilitaryFeatures {
  sofaFamiliar: boolean;
  usInsuranceAccepted?: boolean;
  militaryDiscount?: boolean;
  discountPercent?: number;
  vaTricare?: boolean;
  onBaseAccess?: boolean;
  deliveryToBase?: boolean;
}

export interface ServiceBusiness {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  location: ServiceLocation;
  contact: ContactInfo;
  hours?: BusinessHours;
  languages: LanguageSupport;
  militaryFeatures: MilitaryFeatures;
  specialties?: string[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  featured?: boolean;
  addedDate: string;
  lastUpdated: string;
  tags?: string[];
  images?: string[];
  notes?: string;
}

export type ServiceCategory = 
  | 'restaurants'
  | 'shopping'
  | 'home-services'
  | 'real-estate'
  | 'legal'
  | 'education'
  | 'business';

export interface ServiceCategoryInfo {
  id: ServiceCategory;
  title: string;
  description: string;
  icon: string;
  subcategories?: string[];
}

export const SERVICE_SUBCATEGORIES: Record<ServiceCategory, string[]> = {
  restaurants: [
    'American',
    'Italian',
    'Asian',
    'German/Traditional',
    'Fast Food',
    'Pizza',
    'Breakfast/Brunch',
    'Vegetarian/Vegan',
    'Steakhouse',
    'Seafood',
    'Mexican',
    'Mediterranean',
    'Bakery/Café'
  ],
  shopping: [
    'Grocery Stores',
    'American Food Stores',
    'Clothing',
    'Electronics',
    'Home Goods',
    'Furniture',
    'Toys',
    'Sports Equipment',
    'Pet Supplies',
    'Pharmacies',
    'Beauty/Cosmetics'
  ],
  'home-services': [
    'Plumbing',
    'Electrical',
    'HVAC',
    'General Handyman',
    'Painting',
    'Cleaning Services',
    'Landscaping',
    'Moving Services',
    'Appliance Repair',
    'Pest Control',
    'Internet/TV Installation'
  ],
  'real-estate': [
    'Rental Agents',
    'Home Purchase Agents',
    'Property Management',
    'Relocation Services',
    'Furniture Rental',
    'Storage'
  ],
  legal: [
    'Immigration Law',
    'SOFA Status',
    'Family Law',
    'Contract Review',
    'Estate Planning',
    'Notary Services',
    'Traffic Violations',
    'Tax Law'
  ],
  education: [
    'International Schools',
    'DoDEA Schools',
    'Preschools/Kindergartens',
    'English Tutoring',
    'German Language Schools',
    'Music Lessons',
    'Sports Programs',
    'After-School Care',
    'University Programs'
  ],
  business: [
    'Tax Advisors',
    'Accountants',
    'US Tax Preparation',
    'Business Formation',
    'Translation Services',
    'Insurance Agents',
    'Financial Planning',
    'Consulting'
  ]
};

export interface ServiceFilters {
  category?: ServiceCategory;
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
  services: ServiceBusiness[],
  filters: ServiceFilters
): ServiceBusiness[] {
  return services.filter(service => {
    if (filters.category && service.category !== filters.category) {
      return false;
    }

    if (filters.subcategory && !service.specialties?.includes(filters.subcategory)) {
      return false;
    }

    if (filters.city && service.location.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    if (filters.nearbyBase && !service.location.nearbyBases?.includes(filters.nearbyBase)) {
      return false;
    }

    if (filters.englishFluency && service.languages.englishFluency !== filters.englishFluency) {
      return false;
    }

    if (filters.militaryDiscount && !service.militaryFeatures.militaryDiscount) {
      return false;
    }

    if (filters.sofaFamiliar && !service.militaryFeatures.sofaFamiliar) {
      return false;
    }

    if (filters.priceRange?.length && service.priceRange && !filters.priceRange.includes(service.priceRange)) {
      return false;
    }

    if (filters.minRating && (!service.rating || service.rating < filters.minRating)) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        service.name,
        service.description,
        service.location.city,
        ...(service.specialties || []),
        ...(service.tags || [])
      ].join(' ').toLowerCase();

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
  services: ServiceBusiness[],
  sortBy: SortOption
): ServiceBusiness[] {
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
      return sorted.sort((a, b) => 
        new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );
    
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