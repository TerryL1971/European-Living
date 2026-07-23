// src/pages/businesses/ServiceCategoryPage.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useBase } from "../../contexts/BaseContext";
import { useBusinesses } from "../../hooks/useBusinessQueries";
import { getBaseById } from "../../data/bases";
import BusinessCardWithMap from "../../components/BusinessCardWithMap";
import BaseSelector from "../../components/page/BaseSelector";
import SEO, { BreadcrumbSchema } from "../../components/SEO";
import { formatSubcategoryName } from "../../lib/utils";
import { getCategoryStructure, getSubcategory } from "../../data/subcategories";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

// ── SEO intro text per category ────────────────────────────────────────────
// Rendered below the h1 on each category page. Gives Google real, readable
// content to evaluate instead of a bare business-card list — the single
// most impactful SEO change possible on these pages without a database change.
const categoryIntros: Record<string, string> = {
  automotive:
    "Finding reliable, English-speaking automotive services in Germany is one of the first challenges American military families face after a PCS. Whether you need a US-spec vehicle, a German TÜV inspection, or a mechanic who understands USAREUR registration paperwork, the businesses listed here have experience working with American customers. Most are familiar with SOFA status, accept US military IDs, and can help you navigate the differences between German and American vehicle standards. If you're buying a car locally, look for dealers who specialize in US-spec or tax-free sales — and always confirm TÜV status before signing anything.",

  healthcare:
    "Access to English-speaking healthcare off-base is one of the most important things to sort out early in your tour. While the MTF (Military Treatment Facility) covers many needs, wait times and specialty availability vary by base — and having a trusted local doctor, dentist, or specialist can make a real difference. The providers listed here either speak English, have English-speaking staff, or have experience working with American military patients and TRICARE. Always confirm TRICARE acceptance before your appointment, and bring your military ID and SOFA documentation to your first visit.",

  restaurants:
    "Germany has far more to offer than currywurst and pretzels — and living near a US base means you're also surrounded by restaurants that understand American tastes and cater to international customers. From American-style diners and BBQ joints to Italian trattorias, Asian fusion, and German classics done right, the restaurants listed here are English-friendly, family-welcoming, and tried by the American community near your base. Many are within easy driving distance of the gates, making them go-to spots for birthdays, welcome dinners, and the nights you just don't want to cook.",

  shopping:
    "Shopping in Germany takes some adjustment — hours are shorter, Sundays are mostly closed, and the store layout is nothing like an American mall. But once you know where to go, you'll find everything you need and then some. The businesses listed here cover grocery stores stocking familiar American brands, clothing and electronics retailers, furniture shops for when your household goods are stuck at the port, and specialty stores that have become staples for the military community. Pro tip: stock up on groceries and big-ticket items on Saturdays — most stores close by early afternoon, and almost nothing is open Sunday.",

  "home-services":
    "Dealing with home repairs and maintenance in a German rental property comes with its own set of rules. Landlords expect properties to be returned in specific condition, leases often include unusual obligations (Schönheitsreparaturen — cosmetic repairs), and finding a reliable handyman or tradesperson who speaks English can take time. The service providers listed here have experience working with American military families and off-post renters. Whether you need a plumber for an emergency, an electrician for a quick fix, or someone to help you prep for move-out inspection, starting with someone who understands the military rental context saves time and stress.",

  "real-estate":
    "Finding off-post housing in Germany is one of the most stressful parts of a PCS — especially if you're trying to do it remotely before you arrive. OHA (Overseas Housing Allowance) rates vary by rank and location, lease terms are different from the US, and landlord expectations around move-out can catch families off guard. The agencies and services listed here specialize in helping American military families find, rent, and manage off-base housing near US installations. Many have relationships with English-speaking landlords and can help bridge the language and culture gap that makes the German rental market so different from what you're used to.",

  "legal-business":
    "Legal questions come up more often than most people expect during a Germany tour — from SOFA status questions with a German landlord, to a traffic incident involving German law, to end-of-tour paperwork. While JAG (the base legal assistance office) handles many routine matters for free, complex situations often require a civilian attorney who understands both SOFA regulations and German law. The legal professionals listed here have experience representing American military families and SOFA-status personnel. Always confirm whether your matter falls under JAG's scope before engaging a private attorney — many questions that feel complicated are actually covered at no cost through on-base legal assistance. Tax and financial obligations get significantly more complicated when you're a US service member or dependent living in Germany. You may have US tax filing requirements, German tax exposure depending on your employment status, questions about SOFA and its implications for your financial accounts, and retirement or investment accounts that behave differently overseas. The accountants and tax advisors listed here have experience with the specific situation of Americans living in Germany — including dual filing requirements, SOFA-status implications, and USAA/military pay structures. Don't assume your stateside tax preparer understands the overseas picture — the rules are genuinely different.",

  education:
    "One of the biggest decisions military families face when PCSing to Germany is where to enroll their kids. DoDEA schools are the most common choice — they're on or near base, follow US curriculum, and transition credits smoothly — but they're not the only option. International schools offer IB curricula and a mix of nationalities, while some families choose local German schools for the language immersion experience. The schools and education services listed here serve American families near US bases in Germany. If you're PCSing in, contact the School Liaison Officer (SLO) at your gaining installation before you arrive — they can help you understand waitlists, enrollment timelines, and what to expect.",

  hbb:
    "Home-based businesses and entrepreneurs serving American military families near US bases in Germany. Many of these businesses are run by military spouses or veterans who understand the unique needs of the community. From tutoring and lessons to handmade crafts, pet services, photography, event planning, fitness and wellness, home decor, jewelry and accessories, and custom clothing, these businesses offer a wide range of services that cater to the lifestyle and interests of military families. Supporting these local entrepreneurs helps strengthen the community and provides valuable services that might not be available through larger commercial providers.",
};

const categoryDescriptions: Record<string, string> = {
  automotive: "English-speaking car dealers, mechanics, and inspection stations serving American military families near US bases in Germany.",
  healthcare: "English-speaking doctors, dentists, specialists, and pharmacies near US military bases in Germany.",
  restaurants: "English-friendly restaurants and cafes serving Americans living near US military bases in Germany.",
  shopping: "English-friendly stores, malls, and personal services near US military bases in Germany.",
  "home-services": "English-speaking plumbers, electricians, and handymen serving American families near US bases in Germany.",
  "real-estate": "Housing agents familiar with American military housing needs near US bases in Germany.",
  legal: "Lawyers who understand SOFA status and military regulations, serving Americans in Germany.",
  education: "International schools and tutors for military families near US bases in Germany.",
  business: "Tax advisors and accountants familiar with US/German requirements, serving Americans in Germany.",
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

  const categoryStructure = categoryId ? getCategoryStructure(categoryId) : undefined;
  const categoryTitle = categoryStructure?.name || "Services";
  const categoryDescription = categoryId
    ? categoryDescriptions[categoryId] || "English-friendly businesses near US military bases in Germany."
    : "English-friendly businesses near US military bases in Germany.";
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

  // Get ordered subcategories — canonical order now comes from
  // CATEGORY_STRUCTURE (src/data/subcategories.ts), which covers all 9
  // categories instead of just 3. Any subcategory present in the data but
  // not in the canonical list (e.g. legacy/unexpected values) is appended
  // alphabetically at the end, same fallback behavior as before.
  const canonicalSubcatOrder = categoryStructure?.subcategories.map((s) => s.id) ?? [];
  const orderedSubcats = canonicalSubcatOrder.length > 0
    ? [
        ...canonicalSubcatOrder,
        ...Object.keys(groupedBySubcategory).filter(
          subcat => !canonicalSubcatOrder.includes(subcat)
        ).sort()
      ]
    : Object.keys(groupedBySubcategory).sort();

  // Prefer the canonical display name from CATEGORY_STRUCTURE (e.g.
  // "SOFA Status Lawyers" instead of the auto-formatted "Sofa Lawyers");
  // fall back to the generic formatter for anything not in the canonical list.
  const subcategoryLabel = (subcatId: string): string =>
    (categoryId && getSubcategory(categoryId, subcatId)?.name) || formatSubcategoryName(subcatId);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]"> 
      <SEO
        title={`${categoryTitle}${currentBase?.name ? ` near ${currentBase.name}` : ''}`}
        description={categoryDescription}
        keywords={`${categoryTitle.toLowerCase()} Germany, English speaking ${categoryTitle.toLowerCase()}, US military families ${categoryTitle.toLowerCase()}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services Directory', url: '/services-directory' },
          { name: categoryTitle, url: `/services/${categoryId}` },
        ]}
      />

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
            onClick={() => navigate("/", { state: { scrollTo: "english-services" } })}
            className="flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-8 font-medium mt-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </button>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
              {categoryTitle}
            </h1>
            <p className="text-lg text-[var(--brand-dark)] opacity-80 mb-6">
              {categoryBusinesses.length} {categoryBusinesses.length === 1 ? "business" : "businesses"}{" "}
              near {currentBase?.name || "your base"}
            </p>
            {categoryId && categoryIntros[categoryId] && (
              <p className="text-base text-[var(--brand-text-muted)] leading-relaxed max-w-3xl">
                {categoryIntros[categoryId]}
              </p>
            )}
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
                      {subcategoryLabel(subcatId)}
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
                        {subcategoryLabel(subcatId)}
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