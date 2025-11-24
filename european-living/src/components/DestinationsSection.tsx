// src/components/DestinationsSection.tsx
import { useState, useEffect } from "react";
import { getArticles } from "../services/articleService";
import type { Article } from "../services/articleService";
import DestinationCard from "./DestinationCard";

export default function DestinationsSection() {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        
        const articles = await getArticles({ 
          category: 'City Guides',
          published: true 
        });

        const fixedOrder = ['stuttgart', 'london', 'berlin'];
        
        const fixedDestinations = fixedOrder
          .map(slug => articles.find(a => a.slug === slug))
          .filter((a): a is Article => a !== undefined);

        const remainingDestinations = articles
          .filter(a => !fixedOrder.includes(a.slug))
          .sort((a, b) => (b.view_count || 0) - (a.view_count || 0));

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

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-[var(--brand-dark)]/70">Loading destinations...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[80vh] pr-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination, index) => {
                const isFeatured = index < 3;
                
                return (
                  <DestinationCard
                    key={destination.id}
                    article={destination}
                    isFeatured={isFeatured}
                    featuredRank={isFeatured ? index + 1 : undefined}
                  />
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