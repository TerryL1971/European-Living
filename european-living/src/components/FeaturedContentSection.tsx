// src/components/page/FeaturedContentSection.tsx
import { useState, useEffect } from 'react';
import { useBase } from '../contexts/BaseContext';
import { getFeaturedContent } from '../services/featuredContentService';
import { FeaturedContent } from '../types/featuredContent';
import { ExternalLink, Calendar } from 'lucide-react';

export default function FeaturedContentSection() {
  const { selectedBase } = useBase();
  const [featuredItems, setFeaturedItems] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeaturedContent = async () => {
    setLoading(true);
    const items = await getFeaturedContent(selectedBase);
    console.log('Loaded featured items:', items); // Debug log
    setFeaturedItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadFeaturedContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBase]);

  // Don't render section if no featured content
  if (!loading && featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[var(--brand-bg)] to-[var(--brand-bg-alt)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
            ✨ Featured This Week
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Don't miss these timely recommendations and special content curated for you
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Featured Content Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <a
                key={item.id}
                href={item.link_url || '#'}
                target={item.link_url?.startsWith('http') ? '_blank' : '_self'}
                rel={item.link_url?.startsWith('http') ? 'noopener noreferrer' : ''}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[var(--border)] hover:border-[var(--brand-primary)] transform hover:-translate-y-1"
              >
                {/* Image */}
                {item.image_url ? (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
                    <ExternalLink className="w-16 h-16 text-[var(--brand-light)] opacity-50" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)] mb-4">
                    {/* Date Range */}
                    {(item.start_date || item.end_date) && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[var(--brand-primary)]" />
                        <span>
                          {item.start_date && new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {item.start_date && item.end_date && ' - '}
                          {item.end_date && new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}

                    {/* Content Type */}
                    {item.type && (
                      <div className="px-2 py-1 bg-[var(--muted)] rounded text-xs capitalize">
                        {item.type}
                      </div>
                    )}

                    {/* Sponsored Badge */}
                    {item.is_sponsored && item.sponsor_name && (
                      <div className="text-xs text-[var(--muted-foreground)]">
                        Sponsored by {item.sponsor_name}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--brand-primary)] font-semibold text-sm group-hover:text-[var(--brand-dark)] transition-colors">
                      {item.cta_text || 'Learn More'}
                    </span>
                    <ExternalLink size={16} className="text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}