// src/components/BusinessCardWithMap.tsx
import { MapPin, Phone, Globe, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { Business } from "../services/businessServices";

interface BusinessCardWithMapProps {
  business: Business;
  featured?: boolean;
}

export default function BusinessCardWithMap({ business, featured = false }: BusinessCardWithMapProps) {
  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    if (business.latitude && business.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`;
    } else if (business.address) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`;
    }
    return null;
  };

  // Generate static map image URL (Google Maps Static API)
  const getStaticMapUrl = () => {
    if (business.latitude && business.longitude) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${business.latitude},${business.longitude}&zoom=14&size=400x200&markers=color:red%7C${business.latitude},${business.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
    }
    return null;
  };

  const directionsUrl = getDirectionsUrl();
  const mapUrl = getStaticMapUrl();

  if (featured) {
    // Featured business card (larger, more prominent)
    return (
      <div className="mb-8 bg-[var(--brand-primary)] bg-opacity-95 rounded-xl p-8 shadow-xl">
        {/* Image and Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Business Image */}
          {business.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Map */}
          {business.latitude && business.longitude && (
            <div className="rounded-lg overflow-hidden bg-white relative">
              {mapUrl ? (
                <img src={mapUrl} alt="Location map" className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-[var(--brand-primary)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--brand-dark)] transition flex items-center gap-2 text-sm font-semibold"
                >
                  <Navigation className="w-4 h-4" />
                  Directions
                </a>
              )}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-sm font-bold">
            ⭐ FEATURED
          </span>
          {business.verified && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              ✓ VERIFIED
            </span>
          )}
          {business.englishFluency && (
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
              {business.englishFluency} English
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{business.name}</h3>
        <p className="text-white opacity-90 mb-4">{business.description}</p>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white mb-4">
          <div>
            <p>
              <strong>📍 Location:</strong> {business.location}
            </p>
            {business.address && <p className="ml-5 opacity-80">{business.address}</p>}
            {business.baseDistance && (
              <p>
                <strong>🚗 Distance:</strong> {business.baseDistance}
              </p>
            )}
          </div>
          <div>
            {business.phone && (
              <p>
                <strong>📞 Phone:</strong>{" "}
                <a
                  href={`tel:${business.phone}`}
                  className="underline hover:text-[var(--brand-gold)]"
                >
                  {business.phone}
                </a>
              </p>
            )}
            {business.website && (
              <p>
                <strong>🌐 Website:</strong>{" "}
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--brand-gold)]"
                >
                  Visit Site
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Insider Tip */}
        {business.notes && (
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <p className="text-white text-sm">
              <strong>💡 Insider Tip:</strong> {business.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Link
            to={`/businesses/${business.id}`}
            className="bg-white text-[var(--brand-primary)] px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            View Full Details & Reviews
          </Link>
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-6 py-2 rounded-lg hover:bg-yellow-400 transition font-semibold flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          )}
        </div>
      </div>
    );
  }

  // Regular business card (compact)
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition">
      {/* Image and Map */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {business.imageUrl && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={business.imageUrl}
              alt={business.name}
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.currentTarget.parentElement!.style.display = "none";
              }}
            />
          </div>
        )}
        {business.latitude && business.longitude && (
          <div className="rounded-lg overflow-hidden bg-gray-100 relative">
            {mapUrl ? (
              <img src={mapUrl} alt="Map" className="w-full h-32 object-cover" />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Business Info */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xl font-bold text-[var(--brand-dark)] mb-1">{business.name}</h4>
          <p className="text-sm text-gray-600">{business.location}</p>
        </div>
        {business.verified && (
          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            ✓ VERIFIED
          </span>
        )}
      </div>

      <p className="text-[var(--brand-dark)] opacity-80 mb-4 text-sm line-clamp-2">
        {business.description}
      </p>

      {/* Quick Contact */}
      <div className="space-y-2 text-sm mb-4">
        {business.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
            <a
              href={`tel:${business.phone}`}
              className="text-[var(--brand-primary)] hover:underline"
            >
              {business.phone}
            </a>
          </div>
        )}
        {business.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-primary)] hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link
          to={`/businesses/${business.id}`}
          className="flex-1 text-center bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-medium text-sm"
        >
          View Details
        </Link>
        {directionsUrl && (
          <a
            href={directionsUrl}
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
  );
}