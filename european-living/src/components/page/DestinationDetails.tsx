// src/components/page/DestinationDetails.tsx
import { useParams, Link } from "react-router-dom";
import { destinations } from "../../data/destinations";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function DestinationDetails() {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
        <Link to="/" className="text-brand-blue underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
        />

        <h1 className="text-4xl font-bold text-brand-blue mb-4">{destination.name}</h1>
        <p className="text-lg text-gray-700 mb-8">{destination.description}</p>

        {/* Things to Do */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-4">Things to Do</h2>
          <ul className="list-disc list-inside text-gray-700">
            {destination.thingsToDo.map((thing, i) => (
              <li key={i}>{thing}</li>
            ))}
          </ul>
        </div>

        {/* Hotels */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-4">Hotels & Stays</h2>
          <p className="text-gray-600 mb-2">
            Search hotels in <strong>{destination.name}</strong>:
          </p>
          <input
            type="text"
            placeholder="Enter dates or preferences..."
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button className="mt-3 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-gold transition">
            Search Hotels
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-4">Route Planner</h2>
          <p className="text-gray-600 mb-2">
            Find your way around {destination.name} (demo map):
          </p>
          <MapContainer center={[52.52, 13.405]} zoom={12} className="h-80 w-full rounded-xl">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[52.52, 13.405]}>
              <Popup>{destination.name} center</Popup>
            </Marker>
          </MapContainer>
        </div>

        <Link
          to="/"
          className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-gold transition"
        >
          ← Back to Destinations
        </Link>
      </div>
    </section>
  );
}
