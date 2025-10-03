import HeroSection from "./components/page/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import FeaturesSection from "./components/page/FeaturesSection";
import GermanPhrasesSection from "./components/page/GermanPhrasesSection";
import Services from "./components/page/Services";
import Footer from "./components/page/Footer";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <DestinationsSection />
      <FeaturesSection />
      <GermanPhrasesSection />
      <Services />
      <Footer /> 
    </div>
  );
}
