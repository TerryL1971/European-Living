import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MenuItem {
  label: string;
  id: string;
  isRoute?: boolean; // New: indicates if it's a route vs hash link
}

export default function Header() {
  const resetBaseSelection = () => {
    localStorage.removeItem("selectedBase");
    localStorage.removeItem("hasVisitedSite");
    
    // Dispatch event to BaseSelectionModal to open itself
    window.dispatchEvent(new CustomEvent("openBaseSelectionModal"));
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => setIsMobileMenuOpen((s) => !s);

  const menuItems: MenuItem[] = [
    { label: "Home", id: "home" },
    { label: "Destinations", id: "destinations" },
    { label: "Day Trips", id: "day-trips", isRoute: true }, // NEW!
    { label: "Travel Tips", id: "tips" },
    { label: "Travel Phrases", id: "phrases" },
    { label: "English Services", id: "services" },
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      const hashId = location.hash.replace("#", "") || "home";
      setActiveItem(hashId);
    } else if (location.pathname === "/day-trips") {
      setActiveItem("day-trips");
    } else {
      setActiveItem("");
    }
  }, [location]);

  const handleNavClick = (item: MenuItem) => {
    const sectionId = item.id;

    // Handle route-based navigation (like Day Trips page)
    if (item.isRoute) {
      navigate(`/${sectionId}`);
      setActiveItem(sectionId);
      setIsMobileMenuOpen(false);
      return;
    }

    // Handle home
    if (sectionId === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      setActiveItem("home");
      setIsMobileMenuOpen(false);
      return;
    }

    // Handle contact
    if (sectionId === "contact") {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#contact");
      }
    } else {
      // Handle hash navigation
      if (location.pathname === "/") {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${sectionId}`);
      }
    }

    setActiveItem(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick({ label: "Home", id: "home" })}
          >
            <img
              src="/EL_Logo.png"
              alt="European Living Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-[var(--brand-dark)] font-semibold text-lg">
              European Living
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`font-medium px-3 py-2 rounded-md transition-colors cursor-pointer ${
                  activeItem === item.id
                    ? "text-[var(--brand-primary)]"
                    : "text-[var(--brand-dark)] hover:text-[var(--brand-primary)]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Contact Button */}
            <button
              onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeItem === "contact"
                  ? "bg-[var(--brand-primary)] text-[var(--brand-bg-alt)]"
                  : "bg-[var(--brand-dark)] text-[var(--brand-bg)] hover:bg-[var(--brand-primary)] hover:text-[var(--brand-bg-alt)]"
              }`}
            >
              Contact Us
            </button>

            {/* Reset Base Button */}
            <button
              onClick={resetBaseSelection}
              className="text-sm text-red-500 hover:text-red-700 underline ml-2"
            >
              Reset Base
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggle} className="md:hidden cursor-pointer">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2 text-left font-medium rounded-md transition-colors cursor-pointer ${
                    activeItem === item.id
                      ? "text-[var(--brand-primary)]"
                      : "text-[var(--brand-dark)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeItem === "contact"
                    ? "bg-[var(--brand-primary)] text-[var(--brand-bg-alt)]"
                    : "bg-[var(--brand-dark)] text-[var(--brand-bg)] hover:bg-[var(--brand-primary)] hover:text-[var(--brand-bg-alt)]"
                }`}
              >
                Contact Us
              </button>

              {/* Reset Base button */}
              <button
                onClick={() => {
                  resetBaseSelection();
                  setIsMobileMenuOpen(false); 
                }}
                className="text-sm text-red-500 hover:text-red-700 underline px-4 text-left"
              >
                Reset Base
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}