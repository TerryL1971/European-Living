// src/components/page/DestinationDetails.tsx
import { useParams, Link } from "react-router-dom";
import { destinations } from "../../data/destinations";

import React from "react";
export default function DestinationDetails(): React.ReactElement {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
        <Link to="/" className="text-brand-blue underline">Back to Home</Link>
      </div>
    );
  }

  const omioUrl = `https://www.omio.com/search?departure=&arrival=${encodeURIComponent(destination.shortName ?? destination.name)}`;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination.shortName ?? destination.name)}`;

  return (
    <main className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <img src={destination.image} alt={destination.name} className="w-full h-96 object-cover rounded-xl shadow-md mb-6" />
        <h1 className="text-3xl font-bold text-brand-blue mb-3">{destination.name}</h1>
        <p className="text-gray-700 mb-4">{destination.description}</p>

        {destination.bestTime && (
          <p className="mb-4">
            <strong>Best time to visit: </strong>{destination.bestTime}
          </p>
        )}

        {destination.travelTips && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Travel tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {destination.travelTips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <a className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-gold transition" href={omioUrl} target="_blank" rel="noopener noreferrer">
            Find transport (Omio)
          </a>
          <a className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Search hotels (Booking)
          </a>
          <Link to="/" className="text-gray-600 underline self-center">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
