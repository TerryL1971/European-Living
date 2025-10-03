// src/pages/DestinationDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { destinations } from "../../data/destinations";

const DestinationDetails: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const destination = destinations.find((d) => d.id === city);

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{destination.name}</h1>
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full max-h-96 object-cover rounded-lg shadow mb-6"
      />
      <p className="text-lg mb-6">{destination.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
          <p>🔍 Coming soon: Search for hotels in {destination.name}</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Transport</h2>
          <p>🚆 Coming soon: Book trains, buses, and flights</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Restaurants</h2>
          <p>🍴 Coming soon: Find the best places to eat</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
