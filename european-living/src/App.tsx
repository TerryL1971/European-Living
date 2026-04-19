// src/App.tsx - Fixed Router with 404 handling, SEO per route,
// and TestErrorButton removed from production.

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { trackPageView } from './utils/analytics';
import SEO from './components/SEO';

// ── Eagerly loaded (needed on first paint) ──────────────────────────────────
import Header from "./components/page/Header";
import Footer from "./components/page/Footer";
import CookieConsentModal from './components/CookieConsentModal';
import BaseSelectionModal from './components/page/BaseSelectionModal';
import LoadingSpinner from './components/LoadingSpinner';
import HomePage from "./pages/HomePage";

// ── Lazy loaded ─────────────────────────────────────────────────────────────
const ArticlePage        = lazy(() => import('./pages/articles/ArticlePage'));
const DestinationPage    = lazy(() => import('./pages/destinations/DestinationPage'));
const BusinessDetailPage = lazy(() => import('./pages/businesses/BusinessDetailPage'));
const ServiceCategoryPage= lazy(() => import('./pages/businesses/ServiceCategoryPage'));
const ServicesDirectory  = lazy(() => import('./components/ServicesDirectory'));
const BusinessSubmissionForm = lazy(() => import('./components/BusinessSubmissionForm'));
const BusinessDataEntry  = lazy(() => import('./pages/admin/BusinessDataEntry'));
const PrivacyPolicy      = lazy(() => import('./pages/PrivacyPolicy'));
const DayTripsPage       = lazy(() => import('./pages/DayTripsPage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const FeaturedContentAdmin = lazy(() => import('./pages/admin/FeaturedContentAdmin'));
const DayTripDetailPage  = lazy(() => import('./pages/DayTripDetailPage'));

// ── Reading progress bar ────────────────────────────────────────────────────
const ReadingProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handle = () => {
      const pos = window.scrollY;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScroll(h > 0 ? (pos / h) * 100 : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
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

// ── Page loader (Suspense fallback) ─────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
    <LoadingSpinner size="lg" message="Loading page..." />
  </div>
);

// ── 404 page ─────────────────────────────────────────────────────────────────
const NotFoundPage = () => (
  <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
    <SEO
      title="Page Not Found"
      description="Sorry, this page doesn't exist. Find resources for Americans living in Europe on European Living."
    />
    <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
    <p className="text-gray-600 mb-8 max-w-md">
      Sorry, we couldn't find that page. It may have moved or been removed.
    </p>
    <a
      href="/"
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Back to Home
    </a>
  </div>
);

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  // Scroll to top on non-home navigation
  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Default site-wide SEO — each page overrides via its own <SEO /> */}
      <SEO />

      <CookieConsentModal />
      <BaseSelectionModal />
      <ReadingProgress />
      <Header />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Home ──────────────────────────────────────────── */}
          <Route path="/" element={<HomePage />} />

          {/* ── Day Trips ─────────────────────────────────────── */}
          <Route
            path="/day-trips"
            element={
              <div className="pt-16">
                <SEO
                  title="Day Trips from US Bases in Germany"
                  description="Discover the best day trips from US military bases in Germany. Weekend getaways from Ramstein, Stuttgart, Kaiserslautern and more."
                  keywords="day trips Germany, weekend trips Ramstein, Kaiserslautern day trips, Stuttgart day trips, US military families Europe travel"
                />
                <DayTripsPage />
              </div>
            }
          />

          <Route
            path="/day-trips/:id"
            element={
              <div className="pt-16">
                {/* DayTripDetailPage renders its own <SEO> with trip-specific data */}
                <DayTripDetailPage />
              </div>
            }
          />

          {/* ── Services ──────────────────────────────────────── */}
          <Route
            path="/services-directory"
            element={
              <div className="pt-16">
                <SEO
                  title="Services Directory — English-Speaking Businesses in Europe"
                  description="Find English-speaking businesses and services near US military bases in Germany and Europe. Doctors, mechanics, lawyers, housing and more."
                  keywords="English speaking services Germany, American businesses Europe, services near Ramstein, military family services Germany"
                />
                <ServicesDirectory />
              </div>
            }
          />

          <Route path="/services/:category" element={<ServiceCategoryPage />} />
          <Route path="/services/:category/:subcategory" element={<ServiceCategoryPage />} />

          {/* ── Businesses ────────────────────────────────────── */}
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />

          {/* ── Submit a Business ─────────────────────────────── */}
          <Route
            path="/submit-business"
            element={
              <div className="pt-16">
                <SEO
                  title="Submit Your Business"
                  description="List your English-speaking business to reach American military families and expats across Europe."
                />
                <BusinessSubmissionForm />
              </div>
            }
          />

          {/* ── Articles ──────────────────────────────────────── */}
          <Route path="/articles/:slug" element={<ArticlePage />} />

          {/* ── Destinations ──────────────────────────────────── */}
          <Route path="/destinations/:id" element={<DestinationPage />} />

          {/* ── About ─────────────────────────────────────────── */}
          <Route
            path="/about"
            element={
              <div className="pt-16">
                <SEO
                  title="About European Living"
                  description="European Living helps US military families and American expats navigate life in Europe. Find services, community, and travel guides."
                />
                <AboutPage />
              </div>
            }
          />

          {/* ── Privacy Policy ────────────────────────────────── */}
          <Route
            path="/privacy-policy"
            element={
              <div className="pt-16">
                <SEO title="Privacy Policy" />
                <PrivacyPolicy />
              </div>
            }
          />

          {/* ── Admin (no SEO indexing) ───────────────────────── */}
          <Route
            path="/admin/data-entry"
            element={
              <div className="pt-16">
                <SEO title="Admin — Data Entry" />
                <BusinessDataEntry />
              </div>
            }
          />
          <Route
            path="/admin/featured-content"
            element={
              <div className="pt-16">
                <SEO title="Admin — Featured Content" />
                <FeaturedContentAdmin />
              </div>
            }
          />

          {/* ── 404 catch-all ─────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}