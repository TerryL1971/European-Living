import { Link } from "react-router-dom";

export default function FeaturesSection() {
  const features = [
    {
      title: "Transportation Made Simple",
      description:
        "Step-by-step guides for trains, buses, flights, and car rentals across Europe.",
      link: "/articles/transportation",
    },
    {
      title: "Accommodation Assistance",
      description:
        "Find the best hotels, hostels, and apartments near must-see attractions.",
      link: "/articles/accommodation",
    },
    {
      title: "English-Speaking Services",
      description:
        "Directory of English-speaking doctors, lawyers, and businesses in major cities.",
      link: "/articles/services",
    },
    {
      title: "Essential German Phrases",
      description:
        "Learn key German phrases with pronunciation to make your travels smoother.",
      link: "/articles/german-phrases",
    },
    {
      title: "Budgeting & Payments",
      description:
        "Understand banking, currency conversion, and digital payments across Europe.",
      link: "/articles/budgeting",
    },
    {
      title: "Cultural Etiquette",
      description:
        "Do’s and don’ts when traveling or living in Europe — blend in like a local.",
      link: "/articles/etiquette",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-[#f4f5f0] text-[#131312]"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2 text-[#131312]">
          Travel Tips & Essentials
        </h2>
        <p className="text-[#9da586] text-lg mb-12">
          Helpful guides, how-tos and quick reads to travel smarter.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl shadow-md bg-[#f7f7ec] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#131312]">
                {feature.title}
              </h3>
              <p className="text-[#000000b0] mb-4">{feature.description}</p>
              <Link
                to={feature.link}
                className="inline-block text-[#9da586] font-medium hover:text-[#131312] transition"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/articles"
            className="inline-block bg-[#131312] text-[#f7f7ec] px-6 py-3 rounded-lg font-semibold hover:bg-[#9da586] hover:text-[#131312] transition-all duration-300"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
