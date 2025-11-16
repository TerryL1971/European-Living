// src/components/ServicesDirectory.tsx

import { useState, useMemo } from 'react';
import { Search, Star, MapPin, Phone, Globe, Filter, Shield } from 'lucide-react';
import BaseSelector from './page/BaseSelector'; 
import { Business, ServiceCategory, filterServices, sortServices, SortOption } from '../types/services';
import { useBase } from '../contexts/BaseContext';
import { useBusinesses } from '../hooks/useBusinessQueries';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import BusinessImage from './BusinessImage';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'restaurants', name: 'Restaurants' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'home-services', name: 'Home Services' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'legal', name: 'Legal Services' },
  { id: 'education', name: 'Education' },
  { id: 'business', name: 'Business Services' }
];

const cities = ['All Cities', 'Stuttgart', 'Kaiserslautern', 'Wiesbaden', 'Ramstein'];

export default function ServicesDirectory() {
  const { selectedBase } = useBase();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showFilters, setShowFilters] = useState(false);
  const [militaryDiscountOnly, setMilitaryDiscountOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // ✅ Use React Query hook - automatically cached!
  const { data: services = [], isLoading, error, refetch } = useBusinesses({
    baseId: selectedBase === 'all' ? undefined : selectedBase,
  });

  const filteredServices = useMemo(() => {
    const filtered = filterServices(services, {
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      city: selectedCity === 'All Cities' ? undefined : selectedCity,
      searchQuery: searchQuery || undefined,
      militaryDiscount: militaryDiscountOnly || undefined,
      minRating: minRating || undefined,
    });

    return sortServices(filtered, sortBy);
  }, [services, selectedCategory, selectedCity, searchQuery, militaryDiscountOnly, minRating, sortBy]);

  const currentBaseDisplay = selectedBase && selectedBase !== 'all' ? (
    <div className="text-sm text-gray-600 mb-4">
      Showing results near: <span className="font-semibold text-blue-700">{selectedBase}</span>
    </div>
  ) : (
    <div className="text-sm text-gray-600 mb-4">
      Showing results for: <span className="font-semibold text-blue-700">All Bases</span>
    </div>
  );

  const ServiceCard = ({ service }: { service: Business }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Business Image */}
      <BusinessImage
        imageUrl={service?.imageUrl}
        category={service?.category}
        businessName={service?.name ?? 'Business'}
        className="w-full h-48"
      />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{service?.name ?? 'Unnamed Service'}</h3>
              <Shield className="w-5 h-5 text-[var(--brand-primary)]" />
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                <span className="font-semibold">{service?.rating ?? 0}</span>
                <span>({service?.reviewCount ?? 0})</span>
              </div>
              <span className="text-gray-400">•</span>
              <span>{service?.priceRange ?? 'N/A'}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{service?.description ?? 'No description available.'}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {service?.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-[var(--brand-primary)] bg-opacity-10 text-[var(--brand-dark)] text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {(service?.militaryDiscount || service?.sofaFamiliar) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service?.militaryDiscount && (
              <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium">
                🎖️ {service?.discountPercent ?? 0}% Military Discount
              </span>
            )}
            {service?.sofaFamiliar && (
              <span className="px-3 py-1 bg-[var(--brand-primary)] bg-opacity-20 text-[var(--brand-dark)] text-sm rounded-full font-medium">
                ✓ SOFA Familiar
              </span>
            )}
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>{service?.city ?? 'Unknown City'}</span>
            {service?.basesServed?.length ? (
              <span className="text-gray-400">• Near {service.basesServed[0]}</span>
            ) : null}
          </div>
          {service?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
              <a href={`tel:${service.phone}`} className="text-[var(--brand-primary)] hover:underline">
                {service.phone}
              </a>
            </div>
          )}
          {service?.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
              <a href={service.website} target="_blank" rel="noopener noreferrer" 
                 className="text-[var(--brand-primary)] hover:underline">
                Visit Website
              </a>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <span className="inline-flex items-center px-3 py-1 bg-[var(--brand-primary)] bg-opacity-10 text-[var(--brand-light)] text-sm rounded-full font-medium">
            🗣️ {service?.englishFluency === 'fluent' ? 'Fluent English' : 'English Spoken'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6">
           <BaseSelector />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--brand-dark)] mb-2">Services Directory</h1>
          <p className="text-lg text-[var(--brand-dark)] opacity-80">English-friendly businesses serving Americans in Germany</p>
          {currentBaseDisplay}
        </div>
        
        {error && (
          <ErrorMessage
            title="Failed to load businesses"
            message={error.message}
            onRetry={() => refetch()}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses, services, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as 'all' | ServiceCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-[var(--brand-primary)] hover:bg-opacity-10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] font-medium"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  <option value="featured">Featured</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={militaryDiscountOnly}
                    onChange={(e) => setMilitaryDiscountOnly(e.target.checked)}
                    className="w-5 h-5 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)]"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Military Discount Only
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner size="lg" message="Loading services..." />
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found <span className="font-semibold">{filteredServices.length}</span> services
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ServiceCard key={service?.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No services found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}

        <div className="mt-12 bg-[var(--brand-primary)] bg-opacity-10 border-2 border-[var(--brand-primary)] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-2">Own a Business?</h3>
          <p className="text-[var(--brand-dark)] opacity-80 mb-4">
            Get your English-friendly business listed to reach American military families
          </p>
          <button 
            onClick={() => window.location.href = '/submit-business'}
            className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-lg font-medium hover:bg-[var(--brand-dark)] transition-colors"
          >
            Add Your Business
          </button>
        </div>
      </div>
    </div>
  );
}