// src/components/FeaturedContentSection.tsx

import { useState, useEffect } from 'react';
import { useBase } from '../contexts/BaseContext';
import { getFeaturedContent } from '../services/featuredContentService';
import { FeaturedContent } from '../types/featuredContent';
import { ExternalLink, Play, Tag, Newspaper, Gift } from 'lucide-react';

export default function FeaturedContentSection() {
  const { selectedBase } = useBase();
  const [content, setContent] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      const data = await getFeaturedContent(selectedBase);
      setContent(data);
      setLoading(false);
    }

    loadContent();
  }, [selectedBase]);

  // Don't show section if no content
  if (!loading && content.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'offer':
        return <Gift className="w-5 h-5" />;
      case 'advertisement':
        return <Tag className="w-5 h-5" />;
      default:
        return <Newspaper className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'offer':
        return 'Special Offer';
      case 'advertisement':
        return 'Featured';
      default:
        return 'Article';
    }
  };

  return (
    <section className="bg-gradient-to-b from-[var(--brand-bg-alt)] to-[var(--brand-bg)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-3">
            Featured Content
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Curated resources, guides, and special offers for the military community
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-[var(--border)] animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Content Cards */}
        {!loading && content.length > 0 && (
          <div className={`grid grid-cols-1 gap-6 ${
            content.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' :
            content.length === 2 ? 'md:grid-cols-2' :
            'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {content.map((item) => (
              <a
                key={item.id}
                href={item.link_url || '#'}
                target={item.link_url ? '_blank' : '_self'}
                rel={item.link_url ? 'noopener noreferrer' : undefined}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-[var(--border)] flex flex-col"
              >
                {/* Image */}
                {item.image_url ? (
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
                    <div className="text-[var(--brand-light)] opacity-50">
                      {getIcon(item.type)}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      item.type === 'video' ? 'bg-red-100 text-red-800' :
                      item.type === 'offer' ? 'bg-green-100 text-green-800' :
                      item.type === 'advertisement' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getTypeLabel(item.type)}
                    </span>
                    
                    {item.is_sponsored && (
                      <span className="text-xs px-3 py-1 rounded-full bg-[var(--brand-gold)] bg-opacity-20 text-[var(--brand-dark)] font-semibold">
                        Sponsored
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-2 group-hover:text-[var(--brand-primary)] transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-3 flex-1">
                      {item.description}
                    </p>
                  )}

                  {/* Sponsor Name */}
                  {item.is_sponsored && item.sponsor_name && (
                    <p className="text-xs text-[var(--muted-foreground)] mb-4">
                      By {item.sponsor_name}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                    <span className="text-[var(--brand-primary)] font-semibold group-hover:text-[var(--brand-dark)] transition">
                      {item.cta_text}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[var(--brand-primary)] group-hover:text-[var(--brand-dark)] transition" />
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