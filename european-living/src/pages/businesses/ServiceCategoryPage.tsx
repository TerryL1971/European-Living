// src/pages/businesses/ServiceCategoryPage.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useBase } from "../../contexts/BaseContext";
import { useBusinesses } from "../../hooks/useBusinessQueries";
import { getBaseById } from "../../data/bases";
import BusinessCardWithMap from "../../components/BusinessCardWithMap";
import BaseSelector from "../../components/page/BaseSelector";
import { formatSubcategoryName } from "../../lib/utils";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

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

const subcategoryOrder: Record<string, string[]> = {
  automotive: ["car-dealerships", "mechanics", "inspection-stations", "auto-parts"], 
  healthcare: ["general-practitioners", "dentists", "specialists", "pharmacies", "veterinary-services"],
  restaurants: ["american-food", "international", "cafes"],
};

export default function ServiceCategoryPage() {
  const { selectedBase } = useBase();
  const { category: categoryId } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // ✅ Use React Query - data is cached!
  const { data: allBusinesses = [], isLoading, error, refetch } = useBusinesses();

  // Filter businesses by category and base
  const categoryBusinesses = useMemo(() => {
    if (!categoryId || !allBusinesses.length) return [];
    
    const baseIdToUse = selectedBase || "all";
    
    return allBusinesses.filter(b => 
      b.category === categoryId && 
      (baseIdToUse === 'all' || b.basesServed?.includes(baseIdToUse))
    );
  }, [allBusinesses, categoryId, selectedBase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <LoadingSpinner size="lg" message="Loading businesses..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <ErrorMessage
          title="Failed to load businesses"
          message={error.message}
          onRetry={() => refetch()}
          fullScreen
        />
      </div>
    );
  }

  const categoryTitle = categoryId ? categoryTitles[categoryId] || "Services" : "Services";
  const currentBase = getBaseById(selectedBase);

  // Group businesses by subcategory
  const groupedBySubcategory: Record<string, typeof categoryBusinesses> = {};
  
  categoryBusinesses.forEach((business) => {
    const subcat = business.subcategory || "other";
    if (!groupedBySubcategory[subcat]) {
      groupedBySubcategory[subcat] = [];
    }
    groupedBySubcategory[subcat].push(business);
  });

  // Sort businesses: featured first, then alphabetically
  Object.keys(groupedBySubcategory).forEach((subcat) => {
    groupedBySubcategory[subcat].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });
  });

  // Get ordered subcategories
  const orderedSubcats = categoryId && subcategoryOrder[categoryId] 
    ? [
        ...subcategoryOrder[categoryId],
        ...Object.keys(groupedBySubcategory).filter(
          subcat => !subcategoryOrder[categoryId].includes(subcat)
        ).sort()
      ]
    : Object.keys(groupedBySubcategory).sort();

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]"> 
      {/* Base Selector */}
      <div className="bg-[var(--brand-primary)] py-4 sticky top-16 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BaseSelector />
        </div>
      </div>
      
      {/* Content */}
      <div className="py-12 px-4"> 
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/", { state: { scrollTo: "services" } })}
            className="flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-8 font-medium mt-8"
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

          {/* Sticky Subcategory Navigation */}
          {orderedSubcats.filter(id => groupedBySubcategory[id]?.length > 0).length > 1 && (
            <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-y border-gray-200 -mx-4 px-4 py-4 mb-8 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <span className="text-sm font-semibold text-[var(--brand-dark)] whitespace-nowrap mr-2">
                  Jump to:
                </span>
                {orderedSubcats.map((subcatId) => {
                  const businesses = groupedBySubcategory[subcatId];
                  if (!businesses || businesses.length === 0) return null;
                  
                  return (
                    <button
                      key={subcatId}
                      onClick={() => {
                        const element = document.getElementById(`subcategory-${subcatId}`);
                        if (element) {
                          const offset = 150; 
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - offset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }}
                      className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--brand-dark)] transition whitespace-nowrap flex-shrink-0"
                    >
                      {formatSubcategoryName(subcatId)}
                      <span className="ml-1.5 opacity-75">({businesses.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Businesses Grouped by Subcategory */}
          {orderedSubcats.length > 0 ? (
            <div className="space-y-12">
              {orderedSubcats.map((subcatId) => {
                const businesses = groupedBySubcategory[subcatId];
                if (!businesses || businesses.length === 0) return null;

                return (
                  <div key={subcatId} id={`subcategory-${subcatId}`}>
                    {(subcatId !== "other" || orderedSubcats.length > 1) && (
                      <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6 border-b-2 border-[var(--brand-primary)] pb-2">
                        {formatSubcategoryName(subcatId)}
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {businesses.map((business) => (
                        <BusinessCardWithMap 
                          key={business.id} 
                          business={business} 
                          featured={business.featured || false}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
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