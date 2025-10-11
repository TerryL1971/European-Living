import { useState } from "react";
import DestinationCard from "./DestinationCard";
import { destinations } from "../data/destinations";

export default function DestinationsSection() {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="destinations" className="min-h-screen bg-[#f7f7ec] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-[#131312]">
            Explore Destinations
          </h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations..."
            className="border border-[#9da586]/50 rounded-lg px-4 py-2 w-full sm:w-64 bg-white focus:outline-none focus:ring-2 focus:ring-[#9da586]"
          />
        </div>

        {/* Scrollable Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[80vh] pr-2">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No destinations found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
