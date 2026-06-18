// src/pages/HomePage.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBase } from "../contexts/BaseContext";
import SEO, { OrganizationSchema } from '../components/SEO';
import FamilyAdventuresSection from '../components/page/FamilyAdventuresSection';
import HeroSection from "../components/page/HeroSection";
import FeaturedContentSection from '../components/FeaturedContentSection';
import DestinationsCarousel from '../components/DestinationsCarousel';
import TravelTipsCarousel from '../components/TravelTipsCarousel';
import GermanPhrasesSection from "../components/page/TravelPhrasesSection";
import ServicesCategoriesSection from "../components/page/ServicesCategoriesSection";
import ContactSection from "../components/page/ContactSection";
import { EmailSignupHomepage } from "../components/EmailSignup";

// ── FAQ data — drives Google "People Also Ask" rich results ────────────────
// Keep answers concise (40–60 words). Google truncates longer answers.
const HOME_FAQ_ITEMS = [
  {
    question: 'What is SOFA status in Germany?',
    answer:
      'SOFA (Status of Forces Agreement) is a treaty that defines the legal status of US military personnel and their dependents living in Germany. It covers rights such as tax exemptions, vehicle registration, and access to on-base facilities. Most US military families in Germany live under SOFA status.',
  },
  {
    question: 'Can I use AAFES off base in Germany?',
    answer:
      'AAFES (Army & Air Force Exchange Service) facilities are located on US military installations and are restricted to authorized personnel — active duty, retirees, and their dependents. Shopping at the PX or BX off-base is not possible, but your AAFES privileges follow you onto any authorized US installation in Europe.',
  },
  {
    question: 'Which US military bases does European Living cover?',
    answer:
      'European Living covers resources for Americans near major US installations in Germany, including Ramstein Air Base, Stuttgart (Patch Barracks / Kelley Barracks), Kaiserslautern, Grafenwöhr, Wiesbaden, and Baumholder, as well as other US bases across Europe.',
  },
  {
    question: 'How are businesses verified on European Living?',
    answer:
      'Businesses listed on European Living are reviewed for English-language capability and experience serving US military families and American expats. Listings marked with the shield icon have confirmed SOFA familiarity and English-speaking staff.',
  },
];

// ── Scroll helper ──────────────────────────────────────────────────────────
const performScroll = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 64;
    const offset = element.offsetTop - headerHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};

// ── Component ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const { selectedBase } = useBase();
  const location = useLocation();

  useEffect(() => {
    const hasScrollInstruction = location.state?.scrollTo || location.hash;

    if (!hasScrollInstruction) {
      window.scrollTo(0, 0);
      return;
    }

    let sectionId = null;
    let isNavigatingFromAnotherPage = false;

    if (location.state?.scrollTo) {
      sectionId = location.state.scrollTo;
      isNavigatingFromAnotherPage = true;
      window.history.replaceState({}, document.title);
    } else if (location.hash) {
      sectionId = location.hash.substring(1);
    }

    if (sectionId) {
      if (isNavigatingFromAnotherPage) {
        const timeoutId = setTimeout(() => {
          performScroll(sectionId);
        }, 300);
        return () => clearTimeout(timeoutId);
      } else {
        performScroll(sectionId);
      }
    }
  }, [location.state, location.hash]);

  return (
    <main className="pt-16">
      {/* Site-wide Organization schema — injected once on the homepage */}
      <OrganizationSchema />

      {/* Homepage SEO with FAQ schema for "People Also Ask" rich results */}
      <SEO
        title="Resources for Americans in Europe"
        description="Find English-speaking services, housing, and community resources for US military families and Americans living in Europe. Verified businesses near major US bases in Germany."
        keywords="US military Europe, American expats Germany, English services Germany, military housing Europe, PCS Germany, SOFA status, US bases Germany, Ramstein, Kaiserslautern, Stuttgart, Grafenwöhr"
        faqItems={HOME_FAQ_ITEMS}
      />

      <div id="home">
        <HeroSection />
      </div>

      <div id="destinations">
        <DestinationsCarousel />
      </div>

      <div id="featured-content">
        <FeaturedContentSection />
      </div>

      <div id="email-signup">
        <EmailSignupHomepage />
      </div>

      <div id="family-adventures">
        <FamilyAdventuresSection />
      </div>

      <div id="travel-tips">
        <TravelTipsCarousel />
      </div>

      <div id="german-phrases">
        <GermanPhrasesSection />
      </div>

      <div id="english-services">
        <ServicesCategoriesSection selectedBase={selectedBase} />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}