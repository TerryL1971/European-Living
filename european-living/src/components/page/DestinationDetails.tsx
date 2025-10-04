import { useParams, Link } from "react-router-dom";
import { destinations } from "../../data/destinations";

export default function DestinationDetails() {
  const { id } = useParams();
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
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-brand-blue mb-4">
          {destination.name}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{destination.description}</p>

        {/* Placeholder sections */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-brand-blue mb-2">
              Things to Do
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Popular landmarks</li>
              <li>Local experiences</li>
              <li>Food & nightlife</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-blue mb-2">
              Hotels & Stays
            </h2>
            <p className="text-gray-600">
              (Later: integrate Booking.com or Airbnb API)
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-brand-blue mb-2">
            Route Planner
          </h2>
          <p className="text-gray-600 mb-4">
            (Later: integrate Google Maps directions)
          </p>
          <iframe
            title="map"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
              destination.name
            )}`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-gold transition"
          >
            ← Back to Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
