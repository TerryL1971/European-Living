import { features } from "../../data/features";
import { Link } from "react-router-dom";

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-brand-blue">
          Travel Tips & Essentials
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Helpful guides, how-tos and quick reads to travel smarter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.slug}
                to={`/articles/${feature.slug}`}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-left"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-xl mb-6 mx-auto">
                  <Icon className="text-red-600 w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
