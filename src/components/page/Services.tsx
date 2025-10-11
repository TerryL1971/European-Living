import { Building2, Stethoscope, Scale, Wrench, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const serviceCategories = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: Stethoscope,
    description: "English-speaking doctors, dentists, and specialists",
  },
  {
    id: "legal",
    title: "Legal Services",
    icon: Scale,
    description: "Immigration, housing, and employment lawyers",
  },
  {
    id: "home-services",
    title: "Home Services",
    icon: Wrench,
    description: "Plumbers, electricians, and handymen",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "International schools and language courses",
  },
  {
    id: "business",
    title: "Business Services",
    icon: Briefcase,
    description: "Accountants and tax advisors",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: Building2,
    description: "English-speaking realtors",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-white py-20">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/services.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-4">
            English-Speaking Services Directory
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Connect with trusted professionals across Germany who speak English. 
            From healthcare to legal services, we've got you covered.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white/50 backdrop-blur-lg border border-brand-gold rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-brand-gold" />
                  <h3 className="text-xl font-semibold text-brand-gold">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <button className="w-full bg-brand-gold text-brand-dark py-2 rounded-lg hover:bg-yellow-500 transition font-medium">
                  Browse {category.title}
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA for Full Guide */}
        <div className="text-center bg-white/50 backdrop-blur-lg border border-brand-gold rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need More Help Finding Services?
          </h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Check out our comprehensive guide with contact info, reviews, and tips for 
            finding English-speaking professionals throughout Germany.
          </p>
          <Link
            to="/articles/services"
            className="inline-block bg-brand-gold text-brand-dark px-8 py-3 rounded-lg hover:bg-yellow-500 transition font-semibold"
          >
            Read Full Services Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}