import { useState } from "react";
import { Search } from "lucide-react";
import Header from "./Header";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", query);
  };

  return (
    <section
      id="home"
      className="relative bg-white text-gray-900"
    >
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2400&auto=format&fit=crop')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      {/* Content */}
      <Header />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Explore Europe with{" "}
            <span className="text-blue-400">Confidence</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Your complete guide to traveling across Europe. Find destinations, transportation,
            accommodations, English-speaking services, and essential German phrases — all in one place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, cities, or countries..."
                className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white shadow-md"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* Call to Action */}
          <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg border-2 border-gold-500">
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
}
