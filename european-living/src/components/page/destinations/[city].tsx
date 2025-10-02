// pages/destinations/[city].tsx
import { useRouter } from "next/router";

const CityPage: React.FC = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {city} – Travel Guide
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Things to Do */}
        <div className="p-6 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Things to Do</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Popular landmarks & museums</li>
            <li>Walking tours & activities</li>
            <li>Restaurants & nightlife</li>
          </ul>
        </div>

        {/* Hotels */}
        <div className="p-6 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Hotels</h2>
          <p className="text-gray-700">Search for hotels here (API integration later).</p>
        </div>

        {/* Route Planner */}
        <div className="p-6 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Route Planner</h2>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${city}`}
            width="100%"
            height="250"
            allowFullScreen
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
