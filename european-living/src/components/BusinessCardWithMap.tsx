// src/components/BusinessCardWithMap.tsx
import { Phone, Globe, Navigation, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Business } from "../services/businessServices";
import { supabase } from "../services/supabaseClient";
import MapView from "./MapView";

export interface BusinessCardWithMapProps {
  business: Business;
  featured?: boolean;
}

export default function BusinessCardWithMap({ business, featured = false }: BusinessCardWithMapProps) {
  const [reviewStats, setReviewStats] = useState<{ avgRating: number; count: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewBreakdown, setShowReviewBreakdown] = useState(false);

  // Fetch review stats for this business
  useEffect(() => {
    async function fetchReviewStats() {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("rating")
          .eq("business_id", business.id);

        if (error) {
          console.error("Error fetching reviews:", error);
          setReviewStats(null);
        } else if (data && data.length > 0) {
          const avgRating = data.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / data.length;
          setReviewStats({ avgRating, count: data.length });
        } else {
          setReviewStats({ avgRating: 0, count: 0 });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewStats(null);
      } finally {
        setLoading(false);
      }
    }

    fetchReviewStats();
  }, [business.id]);

  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    if (business.latitude && business.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`;
    } else if (business.address) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`;
    }
    return null;
  };

  const directionsUrl = getDirectionsUrl();
  const hasLocation = business.latitude && business.longitude;

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow ${featured ? 'border-2 border-[var(--brand-gold)]' : 'border border-gray-200'}`}>
      {/* Image Section */}
      {business.imageUrl && (
        <div className="relative">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Featured Badge - Top Right Corner */}
          {featured && (
            <div className="absolute top-3 right-3 bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ FEATURED
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {!business.imageUrl && featured && (
            <span className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-xs font-bold">
              ⭐ FEATURED
            </span>
          )}
          {business.verified && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ✓ VERIFIED
            </span>
          )}
          {business.englishFluency && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase">
              {business.englishFluency} English
            </span>
          )}
        </div>

        {/* Business Name */}
        <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-2">
          {business.name}
        </h3>

        {/* Review Stars */}
        {!loading && reviewStats && (
          <div className="flex items-center gap-2 mb-3">
            {/* Stars with hover dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowReviewBreakdown(true)}
              onMouseLeave={() => setShowReviewBreakdown(false)}
            >
              <Link 
                to={`/businesses/${business.id}`}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                title={`${reviewStats.avgRating.toFixed(1)} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(reviewStats.avgRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </Link>

              {/* Dropdown showing star breakdown */}
              {showReviewBreakdown && reviewStats.count > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-64">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {reviewStats.avgRating.toFixed(1)} out of 5 stars
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {reviewStats.count} {reviewStats.count === 1 ? 'rating' : 'ratings'}
                  </div>
                  {/* Star breakdown bars would go here - need to fetch this data */}
                  <Link 
                    to={`/businesses/${business.id}#reviews`}
                    className="text-[var(--brand-primary)] hover:underline text-sm font-medium"
                  >
                    See all reviews →
                  </Link>
                </div>
              )}
            </div>
            
            {/* Rating number and review count link */}
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-700 font-medium">
                {reviewStats.count > 0 ? reviewStats.avgRating.toFixed(1) : '0.0'}
              </span>
              {reviewStats.count > 0 ? (
                <Link 
                  to={`/businesses/${business.id}#reviews`}
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  ({reviewStats.count} {reviewStats.count === 1 ? 'review' : 'reviews'})
                </Link>
              ) : (
                <Link 
                  to={`/businesses/${business.id}#reviews`}
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  (Be the first to review!)
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{business.location}</p>
            {business.baseDistance && (
              <p className="text-[var(--brand-primary)] text-xs">{business.baseDistance}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {business.description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm">
          {business.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
              
              <a href={`tel:${business.phone}`}
                className="text-[var(--brand-primary)] hover:underline"
              >
                {business.phone}
              </a>
            </div>
          )}
          {business.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
              
              <a  href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] hover:underline truncate"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        {/* Map Preview (if location available) */}
        {hasLocation && (
          <div className="rounded-lg overflow-hidden mb-4">
            <MapView
              center={[business.latitude!, business.longitude!]}
              zoom={14}
              height="h-40"
              markers={[
                {
                  position: [business.latitude!, business.longitude!],
                  title: business.name,
                },
              ]}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/businesses/${business.id}`}
            className="flex-1 text-center bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold text-sm"
          >
            View Details
          </Link>
          {directionsUrl && (
            
            <a  href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--brand-gold)] text-[var(--brand-dark)] p-2 rounded-lg hover:bg-yellow-400 transition"
              title="Get Directions"
            >
              <Navigation className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}