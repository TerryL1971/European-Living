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
    <Link
      to={`/destinations/${destination.id}`}
      className="flex-none w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-brand-blue">{destination.name}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{destination.description}</p>
      </div>
    </Link>
  );
}
