// src/pages/businesses/ServiceCategoryPage.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinesses, getFeaturedBusinesses, Business } from "../../services/businessServices";
import { ArrowLeft, MapPin, Phone, Globe } from "lucide-react";

const categoryTitles: Record<string, string> = {
  automotive: "Automotive Services",
  healthcare: "Healthcare",
  restaurants: "Restaurants & Dining",
  shopping: "Shopping",
  "home-services": "Home Services",
  "real-estate": "Real Estate",
  legal: "Legal Services",
  education: "Education",
  business: "Business Services",
};

export default function ServiceCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [categoryBusinesses, setCategoryBusinesses] = useState<Business[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!categoryId) return;

      try {
        const [allBusinesses, featured] = await Promise.all([
          getBusinesses(),
          getFeaturedBusinesses(),
        ]);

        // Filter businesses by category
        const filtered = allBusinesses.filter((b) => b.category === categoryId);
        setCategoryBusinesses(filtered);

        // Filter featured by category
        const featuredInCategory = featured.filter((b) => b.category === categoryId);
        setFeaturedBusinesses(featuredInCategory);
      } catch (error) {
        console.error("Error loading businesses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <p className="text-[var(--brand-dark)]">Loading businesses...</p>
      </div>
    );
  }

  const categoryTitle = categoryId ? categoryTitles[categoryId] || "Services" : "Services";

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Services
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
            {categoryTitle}
          </h1>
          <p className="text-lg text-[var(--brand-dark)] opacity-80">
            {categoryBusinesses.length} {categoryBusinesses.length === 1 ? "business" : "businesses"}{" "}
            near USAG Stuttgart
          </p>
        </div>

        {/* Featured Businesses */}
        {featuredBusinesses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">Featured</h2>
            {featuredBusinesses.map((business) => (
              <div
                key={business.id}
                className="mb-8 bg-[var(--brand-primary)] bg-opacity-95 rounded-xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ FEATURED
                  </span>
                  {business.verified && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ✓ VERIFIED
                    </span>
                  )}
                  {business.englishFluency && (
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {business.englishFluency} English
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{business.name}</h3>
                <p className="text-white opacity-90 mb-4">{business.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white mb-4">
                  <div>
                    <p>
                      <strong>📍 Location:</strong> {business.location}
                    </p>
                    {business.address && <p className="ml-5 opacity-80">{business.address}</p>}
                    {business.baseDistance && (
                      <p>
                        <strong>🚗 Distance:</strong> {business.baseDistance}
                      </p>
                    )}
                  </div>
                  <div>
                    {business.phone && (
                      <p>
                        <strong>📞 Phone:</strong>{" "}
                        <a
                          href={`tel:${business.phone}`}
                          className="underline hover:text-[var(--brand-gold)]"
                        >
                          {business.phone}
                        </a>
                      </p>
                    )}
                    {business.email && (
                      <p>
                        <strong>✉️ Email:</strong>{" "}
                        <a
                          href={`mailto:${business.email}`}
                          className="underline hover:text-[var(--brand-gold)]"
                        >
                          {business.email}
                        </a>
                      </p>
                    )}
                    {business.website && (
                      <p>
                        <strong>🌐 Website:</strong>{" "}
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[var(--brand-gold)]"
                        >
                          Visit Site
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {business.notes && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white text-sm">
                      <strong>💡 Insider Tip:</strong> {business.notes}
                    </p>
                  </div>
                )}

                <Link
                  to={`/businesses/${business.id}`}
                  className="mt-4 inline-block bg-white text-[var(--brand-primary)] px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
                >
                  View Full Details & Reviews
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* All Businesses in Category */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">All Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-[var(--brand-dark)] mb-1">
                      {business.name}
                    </h4>
                    <p className="text-sm text-gray-600">{business.location}</p>
                  </div>
                  {business.verified && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      ✓ VERIFIED
                    </span>
                  )}
                </div>

                <p className="text-[var(--brand-dark)] opacity-80 mb-4">{business.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  {business.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                      <a
                        href={`tel:${business.phone}`}
                        className="text-[var(--brand-primary)] hover:underline"
                      >
                        {business.phone}
                      </a>
                    </div>
                  )}
                  {business.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--brand-primary)] hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  {business.baseDistance && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                      <span className="text-[var(--brand-dark)]">{business.baseDistance}</span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/businesses/${business.id}`}
                  className="block w-full text-center bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-medium"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {categoryBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--brand-dark)] opacity-60 mb-4">
              No businesses found in this category yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}