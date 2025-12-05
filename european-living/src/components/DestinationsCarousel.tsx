// src/components/DestinationsCarousel.tsx - With new brand colors

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin, Clock } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface Article {
  id: string;
  title: string;
  name?: string;
  destination?: string;
  city?: string;
  location?: string;
  country?: string;
  category?: string;
  type?: string;
  rating?: number;
  distance?: string;
  distance_km?: number;
  duration?: string;
  image_url?: string;
  featured_image_url?: string;
  hero_image_url?: string;
  description?: string;
  excerpt?: string;
  slug: string;
}

export default function DestinationsCarousel() {
  const [destinations, setDestinations] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', 'City Guides')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Destinations Supabase error:', error);
        throw error;
      }

      console.log('✅ DESTINATIONS - City Guides from articles:', data);
      setDestinations(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (destinations.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev - 3;
      return newIndex < 0 ? Math.max(0, destinations.length - 3) : newIndex;
    });
  };

  const goToNext = () => {
    if (destinations.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev + 3;
      return newIndex >= destinations.length ? 0 : newIndex;
    });
  };

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 3);
  while (visibleDestinations.length < 3 && destinations.length > visibleDestinations.length) {
    visibleDestinations.push(destinations[visibleDestinations.length]);
  }

  const getTitle = (item: Article) => {
    return item.title || item.name || item.destination || item.city || 'Unnamed Destination';
  };

  const getLocation = (item: Article) => {
    if (item.location) return item.location;
    if (item.city && item.country) return `${item.city}, ${item.country}`;
    if (item.country) return item.country;
    return '';
  };

  const getDistance = (item: Article) => {
    if (item.distance) return item.distance;
    if (item.distance_km) return `${item.distance_km} km`;
    return '';
  };

  const getImage = (item: Article) => {
    return item.image_url || item.featured_image_url || item.hero_image_url;
  };

  const getCategory = (item: Article) => {
    return item.category || item.type;
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C5282]"></div>
            <p className="mt-4 text-[#1A202C]">Loading destinations...</p>
          </div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return (
      <section id="destinations" className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A202C] mb-4">
              Explore Destinations
            </h2>
            <p className="text-xl text-[#718096]">
              Discover amazing places within driving distance from your base
            </p>
          </div>
          <div className="text-center p-12 bg-white rounded-2xl">
            <p className="text-[#1A202C] mb-4">No destinations available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A202C] mb-4">
            Explore Destinations
          </h2>
          <p className="text-xl text-[#718096]">
            Discover amazing places within driving distance from your base
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {visibleDestinations.map((destination) => {
              const title = getTitle(destination);
              const location = getLocation(destination);
              const distance = getDistance(destination);
              const imageUrl = getImage(destination);
              const category = getCategory(destination);

              return (
                <div
                  key={destination.id}
                  onClick={() => navigate(`/articles/${destination.slug}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-[#E2E8F0]"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2C5282] to-[#4A90C5]">
                        <span className="text-white text-lg font-semibold px-4 text-center">{title}</span>
                      </div>
                    )}
                    
                    {category && (
                      <div></div>
                    )}

                    {destination.rating && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-[#E2E8F0]">
                        <Star className="w-4 h-4 fill-[#D69E2E] text-[#D69E2E]" />
                        <span className="text-xs font-semibold text-[#1A202C]">{destination.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1A202C] mb-2 group-hover:text-[#2C5282] transition-colors">
                      {title}
                    </h3>
                    {location && (
                      <p className="text-sm text-[#718096] mb-4">{location}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-[#718096]">
                      {distance && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{distance}</span>
                        </div>
                      )}
                      {destination.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{destination.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between text-[#2C5282] font-semibold group-hover:text-[#4A90C5]">
                        <span>View Details</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {destinations.length > 3 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#F5F5F5] transition-all z-10 hover:scale-110 border border-[#E2E8F0]"
                aria-label="Previous destinations"
              >
                <ChevronLeft className="w-6 h-6 text-[#1A202C]" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#F5F5F5] transition-all z-10 hover:scale-110 border border-[#E2E8F0]"
                aria-label="Next destinations"
              >
                <ChevronRight className="w-6 h-6 text-[#1A202C]" />
              </button>
            </>
          )}

          {destinations.length > 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(destinations.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * 3)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / 3) === idx
                      ? 'w-8 bg-[#2C5282]'
                      : 'w-2 bg-[#CBD5E0]'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 p-6 bg-[#2C5282] rounded-2xl text-center">
          <p className="text-white text-lg mb-4">
            Don't see your favorite destination? Let us know!
          </p>
          <button
            onClick={() => navigate('/about')}
            className="px-6 py-3 bg-white text-[#2C5282] font-semibold rounded-full hover:bg-[#F5F5F5] transition-colors"
          >
            Request a Destination
          </button>
        </div>
      </div>
    </section>
  );
}