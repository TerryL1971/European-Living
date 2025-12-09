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
import { useMemo } from "react";
import { useBusinesses } from "../../hooks/useBusinessQueries";

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

interface ServicesCategoriesSectionProps {
  selectedBase: string;
}

// Define the placeholder value used before a base is selected
const PENDING_BASE_ID = 'default-app-id';

export default function ServicesCategoriesSection({ selectedBase }: ServicesCategoriesSectionProps) {
  // Determine if a valid base has been selected
  const isBaseSelected = selectedBase && selectedBase !== PENDING_BASE_ID;

  console.log('🔍 selectedBase value:', selectedBase);
  console.log('🔍 isBaseSelected:', isBaseSelected);
  console.log('🔍 PENDING_BASE_ID:', PENDING_BASE_ID);
  
  // The hook is called, but we assume it might use the selectedBase internally for filtering
  // If the hook assumes filtering happens via context/global state, calling it here is fine.
  const { data: allBusinesses = [], isLoading } = useBusinesses();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allBusinesses.forEach(business => {
      // Ensure the business has a category field and count it
      if (business.category) {
        counts[business.category] = (counts[business.category] || 0) + 1;
      }
    });
    return counts;
  }, [allBusinesses]);

  // --- Conditional Render Logic ---
  
  // 1. Loading State
  if (isLoading) {
    return (
      <section className="relative bg-[var(--brand-bg-card)] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--brand-text)]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand-gold)] mx-auto mb-4" />
            Loading trusted services and business counts...
          </p>
        </div>
      </section>
    );
  }

  // 2. Base Selection Pending State (The fix for the original issue)
  if (!isBaseSelected) {
    return (
      <section id="english-services" className="relative bg-[var(--brand-bg-card)] py-20">
        {/* Background Image/Overlay - Kept for consistency */}
        <div className="absolute inset-0 bg-[url('https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/services.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 rounded-xl bg-black/40 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services Awaiting Base Selection
          </h2>
          <p className="text-lg text-white/90 font-medium max-w-3xl mx-auto mb-8">
            Please select your primary military base to view locally verified, English-speaking businesses tailored to your area.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBaseSelectionModal"))}
            className="inline-block bg-[var(--brand-secondary)] text-[var(--brand-text)] px-8 py-3 rounded-lg hover:bg-[var(--brand-secondary-light)] transition font-semibold text-lg"
          >
            Select Your Base
          </button>
        </div>
      </section>
    );
  }

  // 3. Main Content Render (Base Selected)
  return (
    <section id="english-services" className="relative bg-[var(--brand-bg-card)] py-20">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/services.jpg')] bg-cover bg-center" />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
     
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted English-Speaking Services Helping Americans Feel at Home in Europe
          </h2>
          <p className="text-lg text-white/90 font-medium max-w-3xl mx-auto">
            Find personally verified, English-speaking businesses across Europe that understand U.S. military, civilian, and contractors, and their families — offering trusted local support and peace of mind wherever you're stationed.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const count = categoryCounts[category.id] || 0;

            return (
              <Link
                key={category.id}
                to={count > 0 ? `/services/${category.id}?base=${selectedBase}` : "#"}
                // Use a different style for 'Coming Soon' to show it's disabled
                className={`bg-[var(--brand-bg-card)] rounded-xl p-6 border border-[var(--brand-border)] transition-all ${
                  count > 0 
                    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" 
                    : "opacity-60 cursor-not-allowed pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${count > 0 ? 'bg-[var(--brand-primary)]' : 'bg-[var(--brand-gray)]/50'}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--brand-text)]">{category.title}</h3>
                    <p className="text-sm text-[var(--brand-text-muted)]">
                      {count} {count === 1 ? "business" : "businesses"}
                    </p>
                  </div>
                </div>

                <p className="text-[var(--brand-text-muted)] mb-4">{category.description}</p>

                {count > 0 ? (
                  <div className="w-full bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-primary-light)] transition font-medium text-center">
                    View {count} {count === 1 ? "Business" : "Businesses"}
                  </div>
                ) : (
                  <div className="w-full bg-[var(--brand-bg-alt)] text-[var(--brand-text-muted)] py-2 px-4 rounded-lg font-medium text-center border border-[var(--brand-border)]">
                    Coming Soon
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* CTA - List Your Business */}
        <div className="bg-[var(--brand-primary-dark)] rounded-xl p-8 mb-8 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Do You Own a Business Near a US Military Base?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              If your business serves American military families and you speak English, we'd love to
              feature you in our directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit-business"
                className="inline-block bg-[var(--brand-secondary)] text-[var(--brand-text)] px-8 py-3 rounded-lg hover:bg-[var(--brand-secondary-light)] transition font-semibold"
              >
                List Your Business
              </Link>
              <a
                href="mailto:european.living.live@gmail.com?subject=Business Listing Inquiry"
                className="inline-block bg-white text-[var(--brand-text)] px-8 py-3 rounded-lg hover:bg-[var(--brand-bg-alt)] transition font-semibold"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* CTA - Services Guide */}
        <div className="text-center bg-[var(--brand-bg-card)] rounded-xl p-8 shadow-lg border border-[var(--brand-border)]">
          <h3 className="text-2xl font-bold text-[var(--brand-text)] mb-4">
            Need More Help Finding Services?
          </h3>
          <p className="text-[var(--brand-text-muted)] mb-6 max-w-2xl mx-auto">
            Check out our comprehensive guide with tips for finding English-speaking professionals
            throughout Germany.
          </p>
          <Link
            to="/articles/services"
            className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-primary-light)] transition font-semibold"
          >
            Read Full Services Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}