// src/App.tsx - Complete and Fixed Router

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { trackPageView } from './utils/analytics';

// ✅ Eagerly load components needed immediately
import Header from "./components/page/Header";
import Footer from "./components/page/Footer";
import CookieConsentModal from './components/CookieConsentModal';
import BaseSelectionModal from './components/page/BaseSelectionModal';
import LoadingSpinner from './components/LoadingSpinner';

// ✅ Import the new HomePage component
import HomePage from "./pages/HomePage"; 

// ✅ Lazy load components that aren't needed immediately
const ArticlePage = lazy(() => import('./pages/articles/ArticlePage'));
const DestinationPage = lazy(() => import('./pages/destinations/DestinationPage'));
const BusinessDetailPage = lazy(() => import('./pages/businesses/BusinessDetailPage'));
const ServiceCategoryPage = lazy(() => import('./pages/businesses/ServiceCategoryPage'));
const ServicesDirectory = lazy(() => import('./components/ServicesDirectory'));
const BusinessSubmissionForm = lazy(() => import('./components/BusinessSubmissionForm'));
const BusinessDataEntry = lazy(() => import('./pages/admin/BusinessDataEntry'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const DayTripsPage = lazy(() => import('./pages/DayTripsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FeaturedContentAdmin = lazy(() => import('./pages/admin/FeaturedContentAdmin'));
const DayTripDetailPage = lazy(() => import('./pages/DayTripDetailPage'));

// Reading Progress Bar Component (No Change)
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

// Loading fallback for lazy routes (No Change)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
    <LoadingSpinner size="lg" message="Loading page..." />
  </div>
);

export default function App() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  // IMPORTANT: This useEffect ONLY handles scrolling to the top for non-home pages.
  // The home page scroll-to-section logic is now safely inside HomePage.tsx.
  useEffect(() => {
    // If we navigate away from the home page, scroll to the top of the new page.
    if (location.pathname !== '/') {
        window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  
  return (
    <>
      <CookieConsentModal />
      <BaseSelectionModal />
      <ReadingProgress />
      <Header />

      {/* ✅ Wrap lazy routes in Suspense */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home Page: The scrolling is handled internally by HomePage.tsx */}
          <Route path="/" element={<HomePage />} />

          {/* Day Trips Routes */}
          <Route 
            path="/day-trips" 
            element={
              <div className="pt-16">
                <DayTripsPage />
              </div>
            } 
          />

          <Route 
            path="/day-trips/:id" 
            element={
              <div className="pt-16">
                <DayTripDetailPage />
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

          <Route 
            path="/admin/featured-content" 
            element={
              <div className="pt-16">
                <FeaturedContentAdmin />
              </div>
            } 
          />

          {/* Services Routes */}
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

          {/* Other Routes */}
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
          <Route path="/about" element={<div className="pt-16"><AboutPage /></div>} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}