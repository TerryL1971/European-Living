// src/components/DestinationsSection.tsx
import React from "react";
import { destinations } from "../data/destinations";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";

const DestinationsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="destinations">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/destinations/${destination.id}`}>
              <DestinationCard destination={destination} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
