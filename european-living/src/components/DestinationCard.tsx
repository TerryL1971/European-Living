// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";
import type { Destination } from "../data/destinations";

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  const short = destination.shortName ?? destination.name;
  const bookingQuery = encodeURIComponent(`${short} ${destination.country ?? ""}`);
  const omioQuery = encodeURIComponent(short);

  return (
    <article className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <Link to={`/destinations/${destination.id}`} aria-label={`Open ${destination.name}`}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-brand-blue">{destination.name}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {destination.description}
          </p>
        </div>
      </Link>

      {/* Footer actions */}
      <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
        <a
          className="flex-1 text-center px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
          href={`https://www.booking.com/searchresults.html?ss=${bookingQuery}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Search Hotels
        </a>

        <a
          className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
          href={`https://www.omio.com/search?departure=&arrival=${omioQuery}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Transport
        </a>
      </div>
    </article>
  );
}
