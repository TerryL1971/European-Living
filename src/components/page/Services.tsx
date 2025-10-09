export default function Services() {
  return (
    <section id="services" className="relative bg-white py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-12">
          Our Services
        </h2>
        <p className="text-lg text-white max-w-3xl mx-auto mb-8">
          We provide guidance on accommodations, transportation, English-speaking services,
          and everything you need to make your European journey stress-free.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg border border-brand-gold rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">Accommodations</h3>
            <p className="text-gray-200">Find the best places to stay for comfort and convenience.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-brand-gold rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">Transport</h3>
            <p className="text-gray-200">Navigate trains, buses, and flights across Europe with ease.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-brand-gold rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-2">English Services</h3>
            <p className="text-gray-200">Access doctors, mechanics, and other services that speak English.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
