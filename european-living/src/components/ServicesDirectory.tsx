// src/components/ServicesDirectory.tsx
import { useState, useMemo, useEffect } from 'react';
import { Search, Star, MapPin, Phone, Globe, Filter, Shield, Award } from 'lucide-react';
import { ServiceBusiness, ServiceCategory, filterServices, sortServices, SortOption } from '../types/services';
import { supabase } from '../services/supabaseClient'; // Make sure this import exists

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showFilters, setShowFilters] = useState(false);
  const [militaryDiscountOnly, setMilitaryDiscountOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [services, setServices] = useState<ServiceBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ NEW: track base selection from localStorage
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  useEffect(() => {
    // read saved base on mount
    const base = localStorage.getItem('selectedBase');
    if (base) setSelectedBase(base);
  }, []);

  useEffect(() => {
  async function loadServices() {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Get the selected base
      const base = localStorage.getItem('selectedBase') || 'all';
      
      // ✅ Fetch businesses filtered by base and excluding on-base
      let query = supabase
        .from('businesses')
        .select('*')
        .eq('status', 'active')
        .eq('is_on_base', false); // Exclude on-base businesses
      
      // ✅ Filter by base if not "all"
      if (base !== 'all') {
        query = query.contains('bases_served', [base]);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) {
        throw new Error(`Failed to fetch businesses: ${fetchError.message}`);
      }
      
      setServices(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load services';
      console.error('Failed to load services:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  loadServices();

  // ✅ Listen for base changes from modal
  const handleBaseChange = (event: Event) => {
    const customEvent = event as CustomEvent;
    const newBase = customEvent.detail.baseId;
    setSelectedBase(newBase);
    localStorage.setItem('selectedBase', newBase);
    loadServices(); // Reload services with new base
  };

  window.addEventListener('baseChanged', handleBaseChange);
  return () => {
    window.removeEventListener('baseChanged', handleBaseChange);
  };
}, [selectedBase]); // Re-run when selectedBase changes

  // ✅ UPDATED: include selectedBase in filtering logic
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

  // ✅ Show which base is currently active (for testing)
  const currentBaseDisplay = selectedBase ? (
    <div className="text-sm text-gray-600 mb-4">
      Showing results near: <span className="font-semibold text-blue-700">{selectedBase}</span>
    </div>
  ) : null;

  const ServiceCard = ({ service }: { service: ServiceBusiness }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{service?.name ?? 'Unnamed Service'}</h3>
            {service?.verified && <Shield className="w-5 h-5 text-blue-600" />}
            {service?.featured && <Award className="w-5 h-5 text-yellow-500" />}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{service?.rating ?? 0}</span>
              <span>({service?.reviewCount ?? 0})</span>
            </div>
            <span className="text-gray-400">•</span>
            <span>{service?.priceRange ?? 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4">{service?.description ?? 'No description available.'}</p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {service?.specialties?.map(specialty => (
          <span key={specialty} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
            {specialty}
          </span>
        ))}
      </div>

      {/* Military Features */}
      {(service?.militaryFeatures?.militaryDiscount || service?.militaryFeatures?.sofaFamiliar) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {service?.militaryFeatures?.militaryDiscount && (
            <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium">
              🎖️ {service?.militaryFeatures?.discountPercent ?? 0}% Military Discount
            </span>
          )}
          {service?.militaryFeatures?.sofaFamiliar && (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full font-medium">
              ✓ SOFA Familiar
            </span>
          )}
        </div>
      )}

      {/* Location & Contact */}
      <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{service?.location?.city ?? 'Unknown City'}</span>
          {service?.location?.nearbyBases?.length ? (
            <span className="text-gray-400">• Near {service.location.nearbyBases[0]}</span>
          ) : null}
        </div>
        {service?.contact?.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <a href={`tel:${service.contact.phone}`} className="text-blue-600 hover:underline">
              {service.contact.phone}
            </a>
          </div>
        )}
        {service?.contact?.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <a href={service.contact.website} target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline">
              Visit Website
            </a>
          </div>
        )}
      </div>

      {/* Language Badge */}
      <div className="mt-4 pt-4 border-t">
        <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium">
          🗣️ {service?.languages?.englishFluency === 'fluent' ? 'Fluent English' : 'English Spoken'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Services Directory</h1>
          <p className="text-lg text-gray-600">English-friendly businesses serving Americans in Germany</p>
          {currentBaseDisplay}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses, services, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as 'all' | ServiceCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Military Discount Only
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Found <span className="font-semibold">{filteredServices.length}</span> services
            </div>

            {/* Services Grid */}
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

        {/* Add Business CTA */}
        <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Own a Business?</h3>
          <p className="text-gray-600 mb-4">
            Get your English-friendly business listed to reach American military families
          </p>
          <button 
            onClick={() => window.location.href = '/submit-business'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Your Business
          </button>
        </div>
      </div>
    </div>
  );
}