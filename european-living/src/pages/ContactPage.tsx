// src/pages/ContactPage.tsx
//
// Standalone /contact page. Wraps the existing ContactSection (used on the
// homepage at #contact) with dedicated SEO metadata and static NAP
// (Name/Address/Phone) text for E-E-A-T trust signals. ContactSection.tsx
// itself is untouched — this page simply adds context around it.

import SEO, { BreadcrumbSchema } from '../components/SEO';
import ContactSection from '../components/page/ContactSection';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <SEO
        title="Contact Us"
        description="Get in touch with European Living — your resource for US military families and American expats living in Germany. Email, WhatsApp, or send us a message."
        keywords="contact European Living, European Living Germany, American expat resource contact, US military families Germany contact"
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />

      {/* Static NAP block — gives Google clear, crawlable business identity
          signals independent of the contact form/buttons below. */}
      <section className="bg-[var(--brand-bg)] pt-12 pb-4 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-primary-dark)] mb-6">
            Contact European Living
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-[#131312]/80 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Untere Burggasse 4, 71063 Sindelfingen, Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
              <a href="tel:+4915120583765" className="hover:text-[var(--brand-primary)] transition-colors">
                +49 (0)151 20583765
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
              <a href="mailto:info@european-living.live" className="hover:text-[var(--brand-primary)] transition-colors">
                info@european-living.live
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reuse the existing contact form/buttons component as-is */}
      <ContactSection />
    </div>
  );
}