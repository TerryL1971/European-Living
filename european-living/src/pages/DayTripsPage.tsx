// src/pages/DayTripsPage.tsx

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBase } from '../contexts/BaseContext';
import { fetchDayTrips, DayTripListItem } from '../services/dayTripsService';
import SEO from '../components/SEO';
import { MapPin, Car, Train, X, Star, Bookmark } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DayTripsPage() {
  const { selectedBase } = useBase();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCost, setSelectedCost] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [allDayTrips, setAllDayTrips] = useState<DayTripListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrips() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await fetchDayTrips();
        setAllDayTrips(data);
      } catch (e) {
        console.error("Failed to load day trips:", e);
        setFetchError("Failed to load day trips. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTrips();
  }, []);

  // Filter by selected base
  const baseTrips = useMemo(() => {
    if (selectedBase === 'all') {
      return allDayTrips;
    }
    const baseIdFormatted = selectedBase.toLowerCase().replace(/[^a-z0-9]/g, '');
    return allDayTrips.filter(trip => trip.base_id === baseIdFormatted);
  }, [selectedBase, allDayTrips]);

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    allDayTrips.forEach(trip => {
      if (trip.tags && trip.tags.length > 0) {
        trip.tags.forEach(tag => categories.add(tag.name));
      } else if (trip.best_for) {
        trip.best_for.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  }, [allDayTrips]);

  // Filter trips
  const filteredTrips = useMemo(() => {
    return baseTrips.filter(trip => {
      const matchesSearch = searchTerm === '' || 
        trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDifficulty = selectedDifficulty === 'all' || trip.difficulty === selectedDifficulty;
      const matchesCost = selectedCost === 'all' || trip.cost === selectedCost;

      let matchesCategory = selectedCategory === 'all';
      if (!matchesCategory) {
        if (trip.tags && trip.tags.length > 0) {
          matchesCategory = trip.tags.some(tag => tag.name === selectedCategory);
        } else {
          matchesCategory = trip.best_for.includes(selectedCategory);
        }
      }

      return matchesSearch && matchesDifficulty && matchesCost && matchesCategory;
    });
  }, [baseTrips, searchTerm, selectedDifficulty, selectedCost, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedCost('all');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchTerm !== '' || selectedDifficulty !== 'all' || selectedCost !== 'all' || selectedCategory !== 'all';

  const handleTripClick = (tripId: string) => {
    navigate(`/day-trips/${tripId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)] pt-16">
        <LoadingSpinner size="lg" message="Loading day trips..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)] pt-16">
        <p className="text-xl text-red-600">Error: {fetchError}</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Day Trips from US Military Bases"
        description="Discover amazing day trips from US military bases in Germany. Find castles, cities, nature, and cultural experiences within easy reach."
        keywords="day trips Germany, military base travel, weekend trips Europe, castles Germany, things to do Germany"
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] text-[var(--brand-light)] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🗺️ Day Trips & Weekend Getaways
            </h1>
            <p className="text-xl text-[var(--brand-bg-alt)] max-w-3xl">
              Explore incredible destinations within a few hours of your base. From medieval castles 
              to vibrant cities, discover the best of Europe on a day trip.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-[var(--border)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-[var(--brand-dark)] mb-2">
                  Search Destinations
                </label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-dark)] mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-dark)] mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>

              {/* Cost Filter */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-dark)] mb-2">
                  Budget
                </label>
                <select
                  value={selectedCost}
                  onChange={(e) => setSelectedCost(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  <option value="all">All Budgets</option>
                  <option value="$">$ Budget-Friendly</option>
                  <option value="$$">$$ Moderate</option>
                  <option value="$$$">$$$ Premium</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-dark)] transition"
              >
                <X size={16} />
                Clear all filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[var(--muted-foreground)]">
              Found <strong className="text-[var(--brand-dark)]">{filteredTrips.length}</strong> day trip{filteredTrips.length !== 1 ? 's' : ''}
              {selectedBase !== 'all' && baseTrips.length > 0 && ` from ${selectedBase}`}
            </p>
          </div>

          {/* Trip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip: DayTripListItem) => {
              const displayImage = trip.hero_image_url || trip.image_url;
              const displayDescription = trip.short_description || trip.description;
              const categories = trip.tags && trip.tags.length > 0 
                ? trip.tags.map(t => t.name) 
                : trip.best_for;

              return (
                <div
                  key={trip.id}
                  onClick={() => handleTripClick(trip.id)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-[var(--border)] group"
                >
                  {/* Image */}
                  <div className="relative">
                    {displayImage ? (
                      <img 
                        src={displayImage} 
                        alt={`Image of ${trip.name}`} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
                        <MapPin className="w-16 h-16 text-[var(--brand-light)] opacity-50" />
                      </div>
                    )}

                    {/* Badges */}
                    {trip.featured && (
                      <div className="absolute top-3 left-3 bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        Featured
                      </div>
                    )}
                    {trip.is_must_see && !trip.featured && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Bookmark size={12} fill="currentColor" />
                        Must-See
                      </div>
                    )}
                    {trip.rating && (
                      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} fill="#FFD700" color="#FFD700" />
                        {trip.rating}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title and Base */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                        {trip.name}
                      </h3>
                      {selectedBase === 'all' && (
                        <p className="text-sm text-[var(--muted-foreground)]">From {trip.base_name}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-3">
                      {displayDescription}
                    </p>

                    {/* Travel Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <Car size={16} className="text-[var(--brand-primary)]" />
                        <span>{trip.drive_time} drive ({trip.distance})</span>
                      </div>
                      {trip.train_time && (
                        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                          <Train size={16} className="text-[var(--brand-button)]" />
                          <span>{trip.train_time} by train</span>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        trip.difficulty === 'Easy' ? 'bg-[var(--brand-button)] bg-opacity-20 text-[var(--brand-dark)]' :
                        trip.difficulty === 'Moderate' ? 'bg-[var(--brand-gold)] bg-opacity-30 text-[var(--brand-dark)]' :
                        'bg-[var(--brand-primary)] bg-opacity-20 text-[var(--brand-dark)]'
                      }`}>
                        {trip.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                        {trip.cost}
                      </span>
                    </div>

                    {/* Best For Tags */}
                    {categories && categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {categories.slice(0, 3).map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="text-xs px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {categories.length > 3 && (
                          <span className="text-xs px-2 py-1 text-[var(--muted-foreground)]">
                            +{categories.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredTrips.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-[var(--muted)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--brand-dark)] mb-2">
                No day trips found
              </h3>
              <p className="text-[var(--muted-foreground)] mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="text-[var(--brand-primary)] hover:text-[var(--brand-dark)] font-semibold transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}