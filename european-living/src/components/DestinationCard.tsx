// components/DestinationCard.tsx
import React from "react";
import Link from "next/link";

interface DestinationCardProps {
  city: string;
  imageUrl: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, imageUrl }) => {
  return (
    <Link href={`/destinations/${city.toLowerCase()}`}>
      <div className="rounded-2xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
        <img
          src={imageUrl}
          alt={city}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">{city}</h3>
          <p className="text-sm text-gray-600">Click to explore →</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
