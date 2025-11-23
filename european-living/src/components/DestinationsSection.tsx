// src/components/DestinationsSection.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../services/articleService";
import type { Article } from "../services/articleService";
import { Card, CardContent } from "./ui/card";
import { MapPin, Eye, Clock } from "lucide-react";

export default function DestinationsSection() {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        
        // Fetch all published City Guides from Supabase
        const articles = await getArticles({ 
          category: 'City Guides',
          published: true 
        });

        // Fixed order: Stuttgart, London, Berlin (by slug)
        const fixedOrder = ['stuttgart', 'london', 'berlin'];
        
        // Separate fixed destinations and the rest
        const fixedDestinations = fixedOrder
          .map(slug => articles.find(a => a.slug === slug))
          .filter((a): a is Article => a !== undefined);

        // Sort remaining by view_count (highest first)
        const remainingDestinations = articles
          .filter(a => !fixedOrder.includes(a.slug))
          .sort((a, b) => (b.view_count || 0) - (a.view_count || 0));

        // Combine: fixed first, then sorted by popularity
        setDestinations([...fixedDestinations, ...remainingDestinations]);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.title?.toLowerCase().includes(search.toLowerCase()) ||
      dest.destination_name?.toLowerCase().includes(search.toLowerCase()) ||
      dest.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="destinations"
      className="min-h-screen bg-[var(--brand-bg)] py-10 px-4 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[var(--brand-dark)]">
              Explore Destinations
            </h2>
            <p className="text-sm text-[var(--brand-dark)]/70 mt-1">
              {destinations.length} cities • Updated from live content
            </p>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations..."
            className="border border-[var(--border)] rounded-lg px-4 py-2 w-full sm:w-64 bg-[var(--brand-light)] text-[var(--brand-dark)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-[var(--brand-dark)]/70">Loading destinations...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Destinations Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[80vh] pr-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination, index) => {
                const isFeatured = index < 3;
                
                return (
                  <Card 
                    key={destination.id} 
                    className={`overflow-hidden shadow-md bg-brand-bg rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative ${
                      isFeatured ? 'border-2 border-blue-500' : 'border border-[#9da586]/30'
                    }`}
                  >
                    {/* Featured Badge for Top 3 */}
                    {isFeatured && (
                      <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <span>#{index + 1}</span>
                        <span className="text-[10px] opacity-90">FEATURED</span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative">
                      <img
                        src={destination.featured_image_url || '/placeholder-city.jpg'}
                        alt={destination.destination_name}
                        className="h-48 w-full object-cover"
                      />
                      {/* View Count Badge */}
                      {destination.view_count !== undefined && destination.view_count > 0 && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {destination.view_count.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 flex flex-col h-full justify-between">
                      <div>
                        {/* Destination Name */}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-[#131312]">
                            {destination.destination_name || destination.title}
                          </h3>
                          {destination.tags && destination.tags[1] && (
                            <span className="text-xs text-[#131312]/60 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {destination.tags[1]}
                            </span>
                          )}
                        </div>

                        {/* Excerpt */}
                        <p className="text-sm text-[#131312]/70 mb-4 line-clamp-3">
                          {destination.excerpt || destination.subtitle}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-[#131312]/60 mb-4 pb-3 border-b border-[#9da586]/20">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{destination.reading_time_minutes || 0} min read</span>
                        </div>
                        {destination.view_count !== undefined && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{destination.view_count.toLocaleString()} views</span>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/destinations/${destination.slug}`}
                        className="inline-block rounded-lg bg-[var(--brand-button)] text-[#f7f7ec] font-medium py-2 px-4 text-center hover:bg-[#131312] transition-colors"
                      >
                        Explore {destination.destination_name || 'City'}
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-[var(--muted-foreground)] text-center col-span-full">
                No destinations found matching "{search}".
              </p>
            )}
          </div>
        )}

        
      </div>
    </section>
  );
}