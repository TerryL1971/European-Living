import { Building2, Stethoscope, Scale, Wrench, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const serviceCategories = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: Stethoscope,
    description: "English-speaking doctors, dentists, and specialists",
    featured: ["Berlin Medical Center", "Munich International Clinic", "Frankfurt Health Partners"],
  },
  {
    id: "legal",
    title: "Legal Services",
    icon: Scale,
    description: "Lawyers specializing in immigration, housing, and employment",
    featured: ["Expat Legal Services", "International Law Group", "Berlin Immigration Lawyers"],
  },
  {
    id: "home-services",
    title: "Home Services",
    icon: Wrench,
    description: "Plumbers, electricians, and handymen who speak English",
    featured: ["Expat Handyman Berlin", "International Home Services", "English Speaking Repairs"],
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "International schools, tutors, and language courses",
    featured: ["Berlin International School", "Munich Language Academy", "Private English Tutors"],
  },
  {
    id: "business",
    title: "Business Services",
    icon: Briefcase,
    description: "Accountants, tax advisors, and business consultants",
    featured: ["Expat Tax Services", "International Accounting", "Startup Advisors Berlin"],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: Building2,
    description: "English-speaking realtors and property managers",
    featured: ["Expat Housing Berlin", "International Property Services", "Relocation Experts"],
  },
];

export default function EnglishSpeakingServices() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
            English-Speaking Services
          </h2>
          <p className="text-lg text-[var(--brand-dark)] opacity-70 max-w-3xl mx-auto">
            Connect with trusted professionals who speak English. From doctors to lawyers to home repairs,
            we've curated a directory of expat-friendly service providers across Germany.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-[var(--brand-bg)] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--brand-primary)] p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--brand-dark)]">
                    {category.title}
                  </h3>
                </div>

                <p className="text-[var(--brand-dark)] opacity-70 mb-4">
                  {category.description}
                </p>

                {/* Featured Services */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-[var(--brand-dark)]">Featured:</p>
                  <ul className="text-sm text-[var(--brand-dark)] opacity-80 space-y-1">
                    {category.featured.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[var(--brand-primary)]">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-[var(--brand-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-dark)] transition font-medium">
                  View All {category.title}
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA for Full Services Guide */}
        <div className="mt-12 text-center bg-[var(--brand-primary)] bg-opacity-10 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            Want the Complete Services Directory?
          </h3>
          <p className="text-[var(--brand-dark)] opacity-80 mb-6 max-w-2xl mx-auto">
            Access our comprehensive guide with contact information, reviews, and tips for finding
            English-speaking professionals in Germany.
          </p>
          <Link
            to="/articles/services"
            className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold"
          >
            Read Full Services Guide
          </Link>
        </div>
      </div>
    </section>
  );
}