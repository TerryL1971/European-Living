// src/components/DestinationsSection.tsx
import DestinationCard from "./DestinationCard";
import { destinations } from "../data/destinations";

export default function DestinationsSection() {
  return (
    <section id="destinations" className="bg-brand-light py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">
          Explore Top Destinations
        </h2>

        {/* Horizontal Scroll */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
