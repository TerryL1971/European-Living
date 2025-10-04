// src/components/DestinationsSection.tsx
import DestinationCard from "./DestinationCard";
import { destinations } from "../data/destinations";

export default function DestinationsSection() {
  return (
    <section id="destinations" className="bg-brand-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-blue mb-8">
          Popular Destinations
        </h2>

        {/* Scrollable container — show two rows of cards and let user scroll */}
        <div className="overflow-y-auto max-h-[36rem] px-2">
          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              justify-items-center
            "
          >
            {destinations.map((dest) => (
              <div key={dest.id} className="w-full">
                <DestinationCard destination={dest} />
              </div>
            ))}
          </div>
        </div>

        {/* optional CTA */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-gold transition"
          >
            View All Destinations
          </a>
        </div>
      </div>
    </section>
  );
}
