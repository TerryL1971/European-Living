import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/page/Header";
import HeroSection from "./components/page/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/GermanPhrasesSection";
import EnglishSpeakingServices from "./components/page/EnglishSpeakingServices";
import ContactSection from "./components/page/ContactSection";
import Footer from "./components/page/Footer";
import ArticlePage from "./pages/articles/ArticlePage";
import DestinationPage from "./pages/destinations/DestinationPage";
import BusinessDetailPage from "./pages/businesses/BusinessDetailPage";

// ✅ Reading Progress Bar Component
const ReadingProgress = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (position / height) * 100;
    setScroll(progress);
  };

  useEffect(() => {
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

function App() {
  return (
    <>
      {/* 🔵 Global Reading Progress Bar */}
      <ReadingProgress />
      
      {/* ✅ GLOBAL HEADER - Shows on all pages */}
      <Header />

      <Routes>
        {/* ✅ Homepage */}
        <Route
          path="/"
          element={
            <>
              <div id="home">
                <HeroSection />
              </div>
              <div id="destinations">
                <DestinationsSection />
              </div>
              <div id="tips">
                <FeaturesSection />
              </div>
              <div id="phrases">
                <GermanPhrasesSection />
              </div>
              <div id="services">
                <EnglishSpeakingServices />
              </div>
              <div id="contact">
                <ContactSection />
              </div>
              <Footer />
            </>
          }
        />

        {/* ✅ Dynamic Article Route */}
        <Route path="/articles/:slug" element={<ArticlePage />} />

        {/* ✅ Dynamic Destination Route */}
        <Route path="/destinations/:id" element={<DestinationPage />} />

        {/* ✅ Dynamic Businesses Route */}
        <Route path="/businesses/:id" element={<BusinessDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;