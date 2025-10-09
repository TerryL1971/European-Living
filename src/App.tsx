import { Routes, Route } from "react-router-dom";
import Header from "./components/page/Header";
import HeroSection from "./components/page/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/GermanPhrasesSection";
import Services from "./components/page/Services";
import ContactSection from "./components/page/ContactSection";
import Footer from "./components/page/Footer";
import ArticlePage from "./pages/articles/ArticlePage";
import DestinationPage from "./pages/destinations/DestinationPage";

function App() {
  return (
    <Routes>
      {/* ✅ Homepage */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <HeroSection />
            <DestinationsSection />
            <FeaturesSection />
            <GermanPhrasesSection />
            <Services />
            <ContactSection />
            <Footer />
          </>
        }
      />

      {/* ✅ Dynamic Article Route */}
      <Route path="/articles/:slug" element={<ArticlePage />} />

      {/* ✅ Dynamic Destination Route */}
      <Route path="/destinations/:id" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;
