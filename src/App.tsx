// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/page/Header";
import HeroSection from "./components/page/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/GermanPhrasesSection";
import ServicesCategoriesSection from "./components/page/ServicesCategoriesSection";
import ContactSection from "./components/page/ContactSection";
import Footer from "./components/page/Footer";
import ArticlePage from "./pages/articles/ArticlePage";
import DestinationPage from "./pages/destinations/DestinationPage";
import BusinessDetailPage from "./pages/businesses/BusinessDetailPage";
import ServiceCategoryPage from "./pages/businesses/ServiceCategoryPage";
import { DEFAULT_BASE } from "./data/bases";

// ✅ Reading Progress Bar Component
const ReadingProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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

  return (
    <>
      <ReadingProgress />
      <Header />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <DestinationsSection />
              <FeaturesSection />
              <GermanPhrasesSection />
              {/* Pass selectedBase - user can change it on category pages */}
              <ServicesCategoriesSection selectedBase={selectedBase} />
              <ContactSection />
            </>
          }
        />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/destinations/:id" element={<DestinationPage />} />
        {/* BaseSelector will be shown inside ServiceCategoryPage */}
        <Route path="/services/:categoryId" element={<ServiceCategoryPage />} />
        <Route path="/businesses/:id" element={<BusinessDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}