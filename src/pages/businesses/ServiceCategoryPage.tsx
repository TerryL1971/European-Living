// src/pages/businesses/ServiceCategoryPage.tsx
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessesByBase, getFeaturedBusinessesByBase, Business } from "../../services/businessServices";
import { ArrowLeft, MapPin } from "lucide-react";
import { getBaseById, BASES } from "../../data/bases";
import BusinessCardWithMap from "../../components/BusinessCardWithMap";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const baseId = searchParams.get("base") || "stuttgart";
  const navigate = useNavigate();
  const [categoryBusinesses, setCategoryBusinesses] = useState<Business[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle base change
  const handleBaseChange = (newBaseId: string) => {
    setSearchParams({ base: newBaseId });
  };

  useEffect(() => {
    async function loadData() {
      if (!categoryId) return;

      try {
        const [allBusinesses, featured] = await Promise.all([
          getBusinessesByBase(baseId),
          getFeaturedBusinessesByBase(baseId),
        ]);

        // Filter businesses by category
        const filtered = allBusinesses.filter((b: Business) => b.category === categoryId);
        setCategoryBusinesses(filtered);

        // Filter featured by category
        const featuredInCategory = featured.filter((b: Business) => b.category === categoryId);
        setFeaturedBusinesses(featuredInCategory);
      } catch (error) {
        console.error("Error loading businesses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categoryId, baseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <p className="text-[var(--brand-dark)]">Loading businesses...</p>
      </div>
    );
  }

  const categoryTitle = categoryId ? categoryTitles[categoryId] || "Services" : "Services";
  const currentBase = getBaseById(baseId);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      {/* Base Selector - Sticky at top */}
      <div className="bg-[var(--brand-primary)] text-white py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-80">Your Base</p>
                <p className="font-semibold">{currentBase?.name || "Select a base"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="base-select" className="text-sm opacity-80 hidden sm:block">
                Change Base:
              </label>
              <select
                id="base-select"
                value={baseId}
                onChange={(e) => handleBaseChange(e.target.value)}
                className="bg-white text-[var(--brand-dark)] px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              >
                {BASES.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile-friendly base info */}
          <div className="mt-2 text-xs opacity-80 hidden sm:block">
            {currentBase?.location} • Serving {currentBase?.nearbyTowns.join(", ")}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4">
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
              near {currentBase?.name || "your base"}
            </p>
          </div>

          {/* Featured Businesses */}
          {featuredBusinesses.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">Featured</h2>
              {featuredBusinesses.map((business) => (
                <BusinessCardWithMap key={business.id} business={business} featured={true} />
              ))}
            </div>
          )}

          {/* All Businesses in Category */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">All Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryBusinesses.map((business) => (
                <BusinessCardWithMap key={business.id} business={business} featured={false} />
              ))}
            </div>
          </div>

          {categoryBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--brand-dark)] opacity-60 mb-4">
                No businesses found in this category yet for {currentBase?.name}.
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
    </div>
  );
}