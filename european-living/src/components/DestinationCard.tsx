// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";
import type { Destination } from "../data/destinations";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg bg-white h-full flex flex-col">
      <Link to={`/destinations/${destination.id}`} className="flex-1">
        <img src={destination.image} alt={destination.name} className="w-full h-40 object-cover" />
        <div className="p-3">
          <h3 className="text-md font-semibold text-brand-blue">{destination.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{destination.description}</p>
        </div>
      </Link>

      <div className="p-2 border-t border-gray-100 flex gap-2">
        <a className="flex-1 text-center px-2 py-1 rounded text-sm bg-gray-50 hover:bg-gray-100" href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination.name)}`} target="_blank" rel="noreferrer">Hotels</a>
        <a className="flex-1 text-center px-2 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700" href={`https://www.omio.com/search?departure=&arrival=${encodeURIComponent(destination.name)}`} target="_blank" rel="noreferrer">Transport</a>
      </div>
    </article>
  );
}
