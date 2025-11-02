// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/page/Header";
import HeroSection from "./components/page/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/TravelPhrasesSection";
import ServicesCategoriesSection from "./components/page/ServicesCategoriesSection";
import ContactSection from "./components/page/ContactSection";
import Footer from "./components/page/Footer";
import ArticlePage from "./pages/articles/ArticlePage";
import DestinationPage from "./pages/destinations/DestinationPage";
import BusinessDetailPage from "./pages/businesses/BusinessDetailPage";
import ServiceCategoryPage from "./pages/businesses/ServiceCategoryPage";
import ServicesDirectory from "./components/ServicesDirectory";
import BusinessSubmissionForm from "./components/BusinessSubmissionForm";
import { DEFAULT_BASE } from "./data/bases";
import BaseSelectionModal from './components/page/BaseSelectionModal';

// ✅ Reading Progress Bar Component
const ReadingProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (position / height) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-blue-600 z-[9999]"
      style={{ width: `${scroll}%` }}
      initial={{ width: 0 }}
      animate={{ width: scroll }}
      transition={{ ease: "easeOut", duration: 0.1 }}
    />
  );
};

export default function App() {
  const [selectedBase] = useState(DEFAULT_BASE);
  const location = useLocation();

  // Handle hash navigation and location.state scrolling on homepage
  useEffect(() => {
    if (location.pathname === '/') {
      let sectionId = null;

      // Check if coming from location.state (from back button)
      if (location.state?.scrollTo) {
        sectionId = location.state.scrollTo;
        // Clear the state so it doesn't scroll again on subsequent renders
        window.history.replaceState({}, document.title);
      } 
      // Otherwise check for hash in URL
      else if (location.hash) {
        sectionId = location.hash.substring(1); // Remove the #
      }

      // Scroll to the section if we found one
      if (sectionId) {
        // Add a longer delay to ensure section is rendered
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // Increased from 100 to 300ms
      }
    }
  }, [location]);
  
  return (
    <>
      <BaseSelectionModal />
      <ReadingProgress />
      <Header />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="pt-16">
              <HeroSection />
              <DestinationsSection />
              <FeaturesSection />
              <GermanPhrasesSection />
              <ServicesCategoriesSection selectedBase={selectedBase} />
              <ContactSection />
            </div>
          }
        />

        {/* Article & Destination Pages */}
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/destinations/:id" element={<DestinationPage />} />

        {/* ✅ NEW: Services Directory (all services browsable) */}
        <Route path="/services-directory" element={<div className="pt-16"><ServicesDirectory /></div>} />
        
        {/* ✅ NEW: Business Submission Form */}
        <Route path="/submit-business" element={<div className="pt-16"><BusinessSubmissionForm /></div>} />

        {/* ✅ Category Page (e.g. /services/automotive?base=ramstein) */}
        <Route path="/services/:category" element={<ServiceCategoryPage />} />
        <Route path="/services/:category/:subcategory" element={<ServiceCategoryPage />} />

        {/* ✅ Business Detail Page (e.g. /businesses/ucg-ramstein) */}
        <Route path="/businesses/:id" element={<BusinessDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}