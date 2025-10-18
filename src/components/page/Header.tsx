import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggle = () => setIsMobileMenuOpen((s) => !s);

  // Check if we're on homepage
  const isHomePage = location.pathname === "/";

  // Handle navigation - go to homepage first if not there
  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      // Already on homepage, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage with hash
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/EL_Logo.png"
              alt="European Living Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-gray-900 font-semibold text-lg">European Living</span>
          </div>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick("home")}
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("destinations")}
              className="text-gray-600 hover:text-gray-900"
            >
              Destinations
            </button>
            <button 
              onClick={() => handleNavClick("tips")}
              className="text-gray-600 hover:text-gray-900"
            >
              Travel Tips
            </button>
            <button 
              onClick={() => handleNavClick("phrases")}
              className="text-gray-600 hover:text-gray-900"
            >
              German Phrases
            </button>
            <button 
              onClick={() => handleNavClick("services")}
              className="text-gray-600 hover:text-gray-900"
            >
              Services
            </button>
          </div>

          {/* ✅ Contact Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => handleNavClick("contact")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <button onClick={toggle} className="md:hidden">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* ✅ Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => handleNavClick("home")}
                className="text-blue-600 font-medium px-4 py-2 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("destinations")}
                className="text-gray-600 px-4 py-2 text-left"
              >
                Destinations
              </button>
              <button 
                onClick={() => handleNavClick("tips")}
                className="text-gray-600 px-4 py-2 text-left"
              >
                Travel Tips
              </button>
              <button 
                onClick={() => handleNavClick("phrases")}
                className="text-gray-600 px-4 py-2 text-left"
              >
                German Phrases
              </button>
              <button 
                onClick={() => handleNavClick("services")}
                className="text-gray-600 px-4 py-2 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick("contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium mx-4"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}