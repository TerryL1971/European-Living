// src/pages/HomePage.tsx - UPDATED with Email Signup

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBase } from "../contexts/BaseContext";
import FamilyAdventuresSection from '../components/page/FamilyAdventuresSection';

import HeroSection from "../components/page/HeroSection";
import FeaturedContentSection from '../components/FeaturedContentSection';
import DestinationsCarousel from '../components/DestinationsCarousel';
import TravelTipsCarousel from '../components/TravelTipsCarousel';
import GermanPhrasesSection from "../components/page/TravelPhrasesSection";
import ServicesCategoriesSection from "../components/page/ServicesCategoriesSection";
import ContactSection from "../components/page/ContactSection";
import { EmailSignupHomepage } from "../components/EmailSignup";

const performScroll = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 64;
    const offset = element.offsetTop - headerHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};

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