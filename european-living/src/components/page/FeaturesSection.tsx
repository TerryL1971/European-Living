import { features } from "../../data/features";

export default function TravelTips() {
  return (
    <section id="tips" className="relative bg-brand-dark text-white py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50" /> {/* overlay */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-gold mb-12">
          Travel Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-brand-gold"
            >
              <feature.icon className="w-10 h-10 text-brand-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
