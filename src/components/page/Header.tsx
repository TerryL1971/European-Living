import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => setIsMobileMenuOpen((s) => !s);

  // Update active section based on URL or hash
  useEffect(() => {
    if (location.pathname === "/") {
      // Use hash if on homepage
      const hash = location.hash.replace("#", "");
      setActiveSection(hash || "home");
    } else {
      // Highlight "Services" or other pages
      if (location.pathname.startsWith("/services")) setActiveSection("services");
      else setActiveSection("");
    }
  }, [location]);

  const isHomePage = location.pathname === "/";

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "tips", label: "Travel Tips" },
    { id: "phrases", label: "Travel Phrases" },
    { id: "services", label: "Services" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/EL_Logo.png" alt="European Living Logo" className="w-10 h-10 object-contain" />
            <span className="text-gray-900 font-semibold text-lg">European Living</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium hover:text-blue-800 ${
                  activeSection === item.id ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick("contact")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === "contact"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggle} className="md:hidden">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2 font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium mx-4 ${
                  activeSection === "contact" ? "bg-blue-700" : ""
                }`}
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
