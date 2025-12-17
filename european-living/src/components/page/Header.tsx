// src/components/page/Header.tsx

import { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------------
     Helpers
  -------------------------- */

  const resetBaseSelection = () => {
    localStorage.removeItem('selectedBase');
    localStorage.removeItem('hasVisitedSite');
    window.dispatchEvent(new CustomEvent('openBaseSelectionModal'));
  };

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 64;
          const offset = element.offsetTop - headerHeight;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
          navigate('/', { state: { scrollTo: sectionId } });
        }
      } else {
        navigate('/', { state: { scrollTo: sectionId } });
      }

      setMobileMenuOpen(false);
    },
    [location.pathname, navigate]
  );

  const goToHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  /* -------------------------
     Render
  -------------------------- */

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg-card)]/95 backdrop-blur-md border-b border-[var(--brand-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={goToHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/EL_Logo.png"
              alt="European Living"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[var(--brand-primary-dark)] leading-tight">
                European Living
              </span>
              <span className="text-xs text-[var(--brand-text-muted)]">
                Your Guide to Europe
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={goToHome}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('destinations')}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg"
            >
              Destinations
            </button>

            <Link
              to="/day-trips"
              className="px-4 py-2 text-sm rounded-lg hover:bg-[var(--brand-bg-alt)]"
            >
              Day Trips
            </Link>

            <button
              onClick={() => scrollToSection('travel-tips')}
              className="px-4 py-2 text-sm rounded-lg hover:bg-[var(--brand-bg-alt)]"
            >
              Travel Tips
            </button>

            <button
              onClick={() => scrollToSection('german-phrases')}
              className="px-4 py-2 text-sm rounded-lg hover:bg-[var(--brand-bg-alt)]"
            >
              Travel Phrases
            </button>

            <button
              onClick={() => scrollToSection('english-services')}
              className="px-4 py-2 text-sm rounded-lg hover:bg-[var(--brand-bg-alt)]"
            >
              English Services
            </button>

            <Link
              to="/about"
              className="px-4 py-2 text-sm rounded-lg hover:bg-[var(--brand-bg-alt)]"
            >
              About
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-full hover:scale-105 transition"
            >
              Contact Us
            </button>

            <button
              onClick={resetBaseSelection}
              className="text-sm text-red-500 hover:text-red-700 underline"
            >
              Reset Base
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
