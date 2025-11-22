import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { destinations } from "../../data/destinations";

export default function DestinationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return <p className="text-center py-20">Destination not found.</p>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <img
        src={destination.image}
        alt={destination.name}
        className="rounded-xl shadow-lg w-full h-80 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-[var(--brand-dark)]">
        {destination.name}
      </h1>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        {destination.description}
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-6 pt-16">
        <button className="btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <a
          href={`https://www.booking.com/searchresults.html?ss=${destination.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Find Hotels
        </a>
        <a
          href={`https://www.google.com/maps/search/${destination.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Open Map
        </a>
      </div>
    </article>
  );
}
