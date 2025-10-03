// src/components/DestinationCard.tsx
import { Link } from "react-router-dom";

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-brand-blue mb-2">
          {destination.name}
        </h2>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <Link
          to={`/destinations/${destination.id}`}
          className="inline-block bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-gold transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
