// src/components/page/ServicesCategoriesSection.tsx
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
import { getBusinesses, Business } from "../../services/businessServices";

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
    description: "English-speaking doctors, dentists, and specialists near European US Bases",
  },
  {
    id: "restaurants",
    title: "Restaurants & Dining",
    icon: Utensils,
    description: "English-friendly restaurants throughout Europe serving American living abroad",
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

export default function ServicesCategoriesSection({ selectedBase }: { selectedBase: string }) {
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadData() {
    try {
      const businesses = await getBusinesses(); // ← Changed from getBusinessesByBase
      setAllBusinesses(businesses);
    } catch (error) {
      console.error("❌ Error loading businesses:", error);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []); // ← Remove selectedBase dependency since we're loading ALL businesses

  const getBusinessCount = (categoryId: string) =>
    allBusinesses.filter((b) => b.category === categoryId).length;

  if (loading) {
    return (
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--brand-dark)]">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative bg-white py-20">
      <div className="absolute inset-0 bg-[url('https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/services.jpg')] bg-cover bg-center" />
      {/* Enhanced gradient overlay - darker and more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Additional subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
     
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-bg)] mb-4">
            Trusted English-Speaking Services Helping Americans Feel at Home in Europe
          </h2>
          <p className="text-lg text-[var(--brand-light)] font-bold opacity-80 max-w-3xl mx-auto">
            Find personally verified, English-speaking businesses across Europe that understand U.S. military, civilian, and contractors, and their families — offering trusted local support and peace of mind wherever you're stationed.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const count = getBusinessCount(category.id);

            return (
              <Link
                key={category.id}
                to={count > 0 ? `/services/${category.id}?base=${selectedBase}` : "#"}
                className={`bg-[var(--brand-bg)] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all ${
                  count > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-75"
                }`}
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
                  <div className="w-full bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-medium text-center">
                    View {count} {count === 1 ? "Business" : "Businesses"}
                  </div>
                ) : (
                  <div className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium text-center">
                    Coming Soon
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Sections */}
        <div className="bg-[var(--brand-dark)] rounded-xl p-8 mb-8 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Do You Own a Business Near a US Military Base?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              If your business serves American military families and you speak English, we'd love to
              feature you in our directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit-business"
                className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-gold)] hover:text-[var(--brand-dark)] transition font-semibold"
              >
                List Your Business
              </Link>
              <a
                href="mailto:european.living.live@gmail.com?subject=Business Listing Inquiry"
                className="inline-block bg-white text-[var(--brand-dark)] px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            Need More Help Finding Services?
          </h3>
          <p className="text-[var(--brand-dark)] opacity-80 mb-6 max-w-2xl mx-auto">
            Check out our comprehensive guide with tips for finding English-speaking professionals
            throughout Germany.
          </p>
          <Link
            to="/articles/services"
            className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold"
          >
            Read Full Services Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}