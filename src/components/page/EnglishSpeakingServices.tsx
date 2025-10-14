// src/page/EnglishSpeakingServices.tsx
import {
  Stethoscope,
  Scale,
  Wrench,
  GraduationCap,
  Briefcase,
  Car,
  Utensils,
  ShoppingBag,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBusinesses, getFeaturedBusinesses, Business } from "../../services/businessServices";

const serviceCategories = [
  {
    id: "automotive",
    title: "Automotive Services",
    icon: Car,
    description: "Car dealers, mechanics, and auto services that work with Americans",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: Stethoscope,
    description: "English-speaking doctors, dentists, and specialists near USAG Stuttgart",
  },
  {
    id: "restaurants",
    title: "Restaurants & Dining",
    icon: Utensils,
    description: "English-friendly restaurants in Sindelfingen, Böblingen, and Vaihingen",
  },
  {
    id: "shopping",
    title: "Shopping",
    icon: ShoppingBag,
    description: "Stores and shops with English-speaking staff",
  },
  {
    id: "home-services",
    title: "Home Services",
    icon: Wrench,
    description: "Plumbers, electricians, and handymen who work with American families",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: Home,
    description: "Housing agents familiar with American military housing needs",
  },
  {
    id: "legal",
    title: "Legal Services",
    icon: Scale,
    description: "Lawyers who understand SOFA status and military regulations",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "International schools and tutors for military families",
  },
  {
    id: "business",
    title: "Business Services",
    icon: Briefcase,
    description: "Tax advisors and accountants familiar with US/German requirements",
  },
];

export default function EnglishSpeakingServices() {
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryBusinesses, setCategoryBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [businesses, featured] = await Promise.all([getBusinesses(), getFeaturedBusinesses()]);

        // ensure consistent placeholder and ordering
        const withPlaceholders = (list: Business[]) =>
          list.map((b) => ({
            ...b,
            imageUrl: b.imageUrl ?? "/images/placeholder.png",
          }));

        setAllBusinesses(withPlaceholders(businesses));
        setFeaturedBusinesses(withPlaceholders(featured));
      } catch (error) {
        console.error("Error loading businesses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = allBusinesses.filter((b) => b.category === selectedCategory);
      setCategoryBusinesses(filtered);
    } else {
      setCategoryBusinesses([]);
    }
  }, [selectedCategory, allBusinesses]);

  const getBusinessCount = (categoryId: string) =>
    allBusinesses.filter((b) => b.category === categoryId).length;

  if (loading) {
    return (
      <section id="services" className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--brand-dark)]">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative bg-white py-20">
      <div className="absolute inset-0 bg-[url('./images/services.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
            English-Speaking Services Near USAG Stuttgart
          </h2>
          <p className="text-lg text-[var(--brand-dark)] opacity-80 max-w-3xl mx-auto">
            Personally verified businesses in Sindelfingen, Böblingen, and Vaihingen that welcome
            American military families. All businesses are within 20 minutes of Panzer, Patch, or
            Kelly Barracks.
          </p>
        </div>

        {/* Featured */}
        {featuredBusinesses.length > 0 && (
          <div className="mb-12 bg-[var(--brand-primary)] bg-opacity-95 rounded-xl p-8 shadow-xl">
            {featuredBusinesses.map((business) => (
              <div key={business.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ FEATURED
                  </span>
                  {business.verified && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ✓ VERIFIED
                    </span>
                  )}
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {business.englishFluency ?? "English"} English
                  </span>
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
                        <a href={`tel:${business.phone}`} className="underline hover:text-[var(--brand-gold)]">
                          {business.phone}
                        </a>
                      </p>
                    )}
                    {business.email && (
                      <p>
                        <strong>✉️ Email:</strong>{" "}
                        <a href={`mailto:${business.email}`} className="underline hover:text-[var(--brand-gold)]">
                          {business.email}
                        </a>
                      </p>
                    )}
                    {business.website && (
                      <p>
                        <strong>🌐 Website:</strong>{" "}
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--brand-gold)]">
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
              </div>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const count = getBusinessCount(category.id);

            return (
              <div
                key={category.id}
                className="bg-[var(--brand-bg)] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => count > 0 && setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--brand-primary)] p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--brand-dark)]">{category.title}</h3>
                    <p className="text-sm text-[var(--brand-dark)] opacity-60">
                      {count} {count === 1 ? "business" : "businesses"}
                    </p>
                  </div>
                </div>

                <p className="text-[var(--brand-dark)] opacity-70 mb-4">{category.description}</p>

                {count > 0 ? (
                  <button className="w-full bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-medium">
                    View {count} {count === 1 ? "Business" : "Businesses"}
                  </button>
                ) : (
                  <button className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-lg cursor-not-allowed font-medium">
                    Coming Soon
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Modal */}
        {selectedCategory && categoryBusinesses.length > 0 && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[var(--brand-dark)]">
                  {serviceCategories.find((c) => c.id === selectedCategory)?.title}
                </h3>
                <button onClick={() => setSelectedCategory(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {categoryBusinesses.map((business) => (
                  <div key={business.id} className="bg-[var(--brand-bg)] rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-[var(--brand-dark)] mb-1">{business.name}</h4>
                        <p className="text-sm text-gray-600">{business.location}</p>
                      </div>
                      <div className="flex gap-2">{business.verified && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">✓ VERIFIED</span>}</div>
                    </div>

                    <p className="text-[var(--brand-dark)] opacity-80 mb-3">{business.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {business.phone && <p className="text-[var(--brand-dark)]"><strong>Phone:</strong> <a href={`tel:${business.phone}`} className="text-[var(--brand-primary)] hover:underline">{business.phone}</a></p>}
                      {business.website && <p className="text-[var(--brand-dark)]"><strong>Website:</strong> <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-primary)] hover:underline">Visit</a></p>}
                      {business.baseDistance && <p className="text-[var(--brand-dark)]"><strong>Distance:</strong> {business.baseDistance}</p>}
                      <p className="text-[var(--brand-dark)]"><strong>English:</strong> <span className="capitalize">{business.englishFluency}</span></p>
                    </div>

                    {business.notes && (
                      <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                        <p className="text-sm text-gray-700">
                          <strong>💡 Tip:</strong> {business.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="bg-[var(--brand-dark)] rounded-xl p-8 mb-8 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Do You Own a Business Near USAG Stuttgart?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">If your business serves American military families and you speak English, we'd love to feature you in our directory.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact" className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-gold)] hover:text-[var(--brand-dark)] transition font-semibold">List Your Business</Link>
              <a href="mailto:info@european-living.live?subject=Business Listing Inquiry" className="inline-block bg-white text-[var(--brand-dark)] px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">Email Us</a>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">Need More Help Finding Services?</h3>
          <p className="text-[var(--brand-dark)] opacity-80 mb-6 max-w-2xl mx-auto">Check out our comprehensive guide with tips for finding English-speaking professionals throughout Germany.</p>
          <Link to="/articles/services" className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold">Read Full Services Guide →</Link>
        </div>
      </div>
    </section>
  );
}
