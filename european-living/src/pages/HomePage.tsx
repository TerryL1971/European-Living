// src/pages/HomePage.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBase } from "../contexts/BaseContext"; 

// Import all Home page sections
import HeroSection from "../components/page/HeroSection";
import FeaturedContentSection from '../components/FeaturedContentSection';
import DestinationsCarousel from '../components/DestinationsCarousel';
import TravelTipsCarousel from '../components/TravelTipsCarousel';
import GermanPhrasesSection from "../components/page/TravelPhrasesSection";
import ServicesCategoriesSection from "../components/page/ServicesCategoriesSection";
import ContactSection from "../components/page/ContactSection";

// --- Helper function for clean scrolling ---
const performScroll = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 64; 
    const offset = element.offsetTop - headerHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    console.log(`[HOMEPAGE DEBUG] ✅ Scroll successful to ID: ${sectionId}. Element found.`);
  } else {
    console.error(`[HOMEPAGE DEBUG] ❌ Scroll failed! Target ID='${sectionId}' element was NOT found in the DOM.`);
  }
};

export default function HomePage() {
  const { selectedBase } = useBase();
  const location = useLocation();

  useEffect(() => {
    // Only scroll if there's an explicit instruction
    const hasScrollInstruction = location.state?.scrollTo || location.hash;
    
    if (!hasScrollInstruction) {
      // No scroll instruction - stay at top
      window.scrollTo(0, 0);
      return;
    }

    let sectionId = null;
    let isNavigatingFromAnotherPage = false;

    // Check for scroll instruction passed via navigation state
    if (location.state?.scrollTo) {
        sectionId = location.state.scrollTo;
        isNavigatingFromAnotherPage = true;
        console.log(`[HOMEPAGE DEBUG] 🚀 State received! Scroll target is: ${sectionId}`);
        
        // Clear the state immediately after reading
        window.history.replaceState({}, document.title);
    } 
    // Check for hash link (e.g., /#contact)
    else if (location.hash) {
        sectionId = location.hash.substring(1);
        console.log(`[HOMEPAGE DEBUG] 🚀 Hash received! Scroll target is: ${sectionId}`);
    }

    if (sectionId) {
        if (isNavigatingFromAnotherPage) {
          // Delay scroll when coming from another page (content needs to load)
          const timeoutId = setTimeout(() => {
            performScroll(sectionId);
          }, 300);
          return () => clearTimeout(timeoutId);
        } else {
          // Immediate scroll when already on homepage
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