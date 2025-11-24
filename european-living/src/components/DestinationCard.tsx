// src/components/DestinationCard.tsx
// Fully dynamic - works with Article data from Supabase

import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import type { Article } from "../services/articleService";
import { Eye, Clock, MapPin } from "lucide-react";

interface DestinationCardProps {
  article: Article;
  isFeatured?: boolean;
  featuredRank?: number;
}

export default function DestinationCard({ article, isFeatured = false, featuredRank }: DestinationCardProps) {
  return (
    <Card 
      className={`overflow-hidden shadow-md bg-brand-bg rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative ${
        isFeatured ? 'border-2' : 'border'
      }`}
    >
      {/* Featured Badge for Top 3 */}
      {isFeatured && featuredRank && (
        <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r  px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
        </div>
      )}

      {/* Image */}
      <div className="relative">
        <img
          src={article.featured_image_url || '/placeholder-city.jpg'}
          alt={article.destination_name || article.title}
          className="h-48 w-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder-city.jpg';
          }}
        />
        {/* View Count Badge */}
        {article.view_count !== undefined && article.view_count > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {article.view_count.toLocaleString()}
          </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col h-full justify-between">
        <div>
          {/* Destination Name */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-[#131312]">
              {article.destination_name || article.title}
            </h3>
            {article.tags && article.tags[1] && (
              <span className="text-xs text-[#131312]/60 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {article.tags[1]}
              </span>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-sm text-[#131312]/70 mb-4 line-clamp-3">
            {article.excerpt || article.subtitle}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-[#131312]/60 mb-4 pb-3 border-b border-[#9da586]/20">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.reading_time_minutes || 0} min read</span>
          </div>
          {article.view_count !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{article.view_count.toLocaleString()} views</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/destinations/${article.slug}`}
          className="inline-block rounded-lg bg-[var(--brand-button)] text-[#f7f7ec] font-medium py-2 px-4 text-center hover:bg-[#131312] transition-colors"
        >
          Explore {article.destination_name || 'City'}
        </Link>
      </CardContent>
    </Card>
  );
}