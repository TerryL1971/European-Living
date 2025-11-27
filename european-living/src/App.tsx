// src/App.tsx

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useBase } from "./contexts/BaseContext";
import { trackPageView } from './utils/analytics';

// ✅ Eagerly load components needed immediately
import Header from "./components/page/Header";
import HeroSection from "./components/page/HeroSection";
import FeaturedContentSection from './components/FeaturedContentSection';
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/TravelPhrasesSection";
import ServicesCategoriesSection from "./components/page/ServicesCategoriesSection";
import ContactSection from "./components/page/ContactSection";
import Footer from "./components/page/Footer";
import CookieConsentModal from './components/CookieConsentModal';
import BaseSelectionModal from './components/page/BaseSelectionModal';
import LoadingSpinner from './components/LoadingSpinner';

// ✅ Lazy load components that aren't needed immediately
const ArticlePage = lazy(() => import('./pages/articles/ArticlePage'));
const DestinationPage = lazy(() => import('./pages/destinations/DestinationPage'));
const BusinessDetailPage = lazy(() => import('./pages/businesses/BusinessDetailPage'));
const ServiceCategoryPage = lazy(() => import('./pages/businesses/ServiceCategoryPage'));
const ServicesDirectory = lazy(() => import('./components/ServicesDirectory'));
const BusinessSubmissionForm = lazy(() => import('./components/BusinessSubmissionForm'));
const BusinessDataEntry = lazy(() => import('./pages/admin/BusinessDataEntry'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const DayTripsPage = lazy(() => import('./pages/DayTripsPage')); // NEW!
const AboutPage = lazy(() => import('./pages/AboutPage')); // NEW!
const FeaturedContentAdmin = lazy(() => import('./pages/admin/FeaturedContentAdmin'));
const DayTripDetailPage = lazy(() => import('./pages/DaytripDetailPage'));


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

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
    <LoadingSpinner size="lg" message="Loading page..." />
  </div>
);

export default function App() {
  const { selectedBase } = useBase();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

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

      {/* ✅ Wrap lazy routes in Suspense */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home Page - Not lazy loaded */}
          <Route
            path="/"
            element={
              <div className="pt-16">
                <HeroSection />
                <FeaturedContentSection />
                <DestinationsSection />
                <FeaturesSection />
                <GermanPhrasesSection />
                <ServicesCategoriesSection selectedBase={selectedBase} />
                <ContactSection />
              </div>
            }
          />

          {/* Day Trips Routes */}
          <Route 
            path="/day-trips" 
            element={
              <div className="pt-16">
                <DayTripsPage />
              </div>
            } 
          />

          {/* NEW: Day Trip Detail Route */}
          <Route 
            path="/day-trips/:id" 
            element={
              <div className="pt-16">
                <DayTripDetailPage />
              </div>
            } 
          />

          {/* Admin Routes - Lazy loaded */}
          <Route 
            path="/admin/data-entry" 
            element={
              <div className="pt-16">
                <BusinessDataEntry />
              </div>
            } 
          />

          <Route 
            path="/admin/featured-content" 
            element={
              <div className="pt-16">
                <FeaturedContentAdmin />
              </div>
            } 
          />

          {/* Services Routes - Lazy loaded */}
          <Route 
            path="/services-directory" 
            element={
              <div className="pt-16">
                <ServicesDirectory />
              </div>
            } 
          />
          
          <Route 
            path="/services/:category" 
            element={<ServiceCategoryPage />} 
          />
          <Route 
            path="/services/:category/:subcategory" 
            element={<ServiceCategoryPage />} 
          />

          {/* Other Routes - Lazy loaded */}
          <Route 
            path="/submit-business" 
            element={
              <div className="pt-16">
                <BusinessSubmissionForm />
              </div>
            } 
          />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={ <div className="pt-16"><AboutPage /></div>} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}