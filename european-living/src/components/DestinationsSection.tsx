// src/components/DestinationsSection.tsx
import DestinationCard from "./DestinationCard";
import { destinations } from "../data/destinations";

export default function DestinationsSection() {
  return (
    <section className="bg-brand-light py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-brand-blue mb-10 text-center">
          Explore Top Destinations
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
