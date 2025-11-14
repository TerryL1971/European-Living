// src/pages/DayTripsPage.tsx
import { useState, useMemo } from 'react';
import { useBase } from '../contexts/BaseContext';
import { DAY_TRIPS, DayTrip } from '../data/baseDayTrips';
import SEO from '../components/SEO';
import { MapPin, Car, Train, X } from 'lucide-react';

export default function DayTripsPage() {
  const { selectedBase } = useBase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCost, setSelectedCost] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get trips for selected base
  const baseTrips = useMemo(() => {
    if (selectedBase === 'all') {
      return DAY_TRIPS;
    }
    return DAY_TRIPS.filter(b => b.baseId === selectedBase);
  }, [selectedBase]);

  // Get all unique categories from all trips
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    DAY_TRIPS.forEach(base => {
      base.trips.forEach(trip => {
        trip.bestFor.forEach(cat => categories.add(cat));
      });
    });
    return Array.from(categories).sort();
  }, []);

  // Filter trips
  const filteredTrips = useMemo(() => {
    const results: Array<{ baseName: string; trip: DayTrip }> = [];

    baseTrips.forEach(base => {
      base.trips.forEach(trip => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
          trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Difficulty filter
        const matchesDifficulty = selectedDifficulty === 'all' || trip.difficulty === selectedDifficulty;

        // Cost filter
        const matchesCost = selectedCost === 'all' || trip.cost === selectedCost;

        // Category filter
        const matchesCategory = selectedCategory === 'all' || trip.bestFor.includes(selectedCategory);

        if (matchesSearch && matchesDifficulty && matchesCost && matchesCategory) {
          results.push({ baseName: base.baseName, trip });
        }
      });
    });

    return results;
  }, [baseTrips, searchTerm, selectedDifficulty, selectedCost, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedCost('all');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchTerm !== '' || selectedDifficulty !== 'all' || selectedCost !== 'all' || selectedCategory !== 'all';

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
              {selectedBase !== 'all' && ` from ${baseTrips[0]?.baseName}`}
            </p>
          </div>

          {/* Trip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(({ baseName, trip }) => (
              <div
                key={trip.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-[var(--border)]"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-[var(--brand-light)] opacity-50" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Base */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-1">
                      {trip.name}
                    </h3>
                    {selectedBase === 'all' && (
                      <p className="text-sm text-[var(--muted-foreground)]">From {baseName}</p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-3">
                    {trip.description}
                  </p>

                  {/* Travel Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                      <Car size={16} className="text-[var(--brand-primary)]" />
                      <span>{trip.driveTime} drive ({trip.distance})</span>
                    </div>
                    {trip.trainTime && (
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <Train size={16} className="text-[var(--brand-button)]" />
                        <span>{trip.trainTime} by train</span>
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
                  <div className="flex flex-wrap gap-1">
                    {trip.bestFor.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {trip.bestFor.length > 3 && (
                      <span className="text-xs px-2 py-1 text-[var(--muted-foreground)]">
                        +{trip.bestFor.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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