// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";
import type { Destination } from "../data/destinations";

type Props = {
  destination: Destination;
};

export default function DestinationCard({ destination }: Props) {
  // fallback image if file missing
  const imgSrc = destination.image || "/images/placeholder.jpg";

  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="block w-full max-w-xs md:max-w-none"
      aria-label={`Open ${destination.name} details`}
    >
      <article
        className="h-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200
                   flex flex-col"
      >
        {/* Image */}
        <div className="h-40 w-full overflow-hidden flex-shrink-0">
          <img
            src={imgSrc}
            alt={destination.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-brand-blue">{destination.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {destination.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {destination.country ?? ""}
            </span>
            <span className="text-xs text-gray-400">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
