// src/App.tsx

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBase } from "./contexts/BaseContext";
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
import CookieConsentModal from './components/CookieConsentModal';
import BaseSelectionModal from './components/page/BaseSelectionModal';
import BusinessDataEntry from './pages/admin/BusinessDataEntry';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Reading Progress Bar Component
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
  // ✅ Use context for selectedBase
  const { selectedBase } = useBase();
  const location = useLocation();

  // Handle hash navigation and location.state scrolling on homepage
  useEffect(() => {
    if (location.pathname === '/') {
      let sectionId = null;

      if (location.state?.scrollTo) {
        sectionId = location.state.scrollTo;
        window.history.replaceState({}, document.title);
      } 
      else if (location.hash) {
        sectionId = location.hash.substring(1);
      }

      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, [location]);
  
  return (
    <>
      <CookieConsentModal />
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

        {/* Admin Routes */}
        <Route 
          path="/admin/data-entry" 
          element={
            <div className="pt-16">
              <BusinessDataEntry />
            </div>
          } 
        />

        {/* SERVICES DIRECTORY - No props needed (uses context) */}
        <Route 
          path="/services-directory" 
          element={
            <div className="pt-16">
              <ServicesDirectory />
            </div>
          } 
        />
        
        {/* CATEGORY PAGES - No props needed (uses context) */}
        <Route 
          path="/services/:category" 
          element={<ServiceCategoryPage />} 
        />
        <Route 
          path="/services/:category/:subcategory" 
          element={<ServiceCategoryPage />} 
        />

        {/* Other Routes */}
        <Route path="/submit-business" element={<div className="pt-16"><BusinessSubmissionForm /></div>} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/destinations/:id" element={<DestinationPage />} />
        <Route path="/businesses/:id" element={<BusinessDetailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </>
  );
}