// src/components/DestinationsSection.tsx
import DestinationCard from "./DestinationCard";
import { destinations } from "../data/destinations";

export default function DestinationsSection() {
  return (
    <section id="destinations" className="bg-brand-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-blue">Popular Destinations</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Click a destination to explore things to do, hotels, and transport options.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#destinations"
            className="inline-block bg-brand-blue text-white px-6 py-2 rounded-xl hover:bg-brand-gold transition"
          >
            View All Destinations
          </a>
        </div>
      </div>
    </section>
  );
}
