// src/components/page/Header.tsx - Using CSS variables properly
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 64;
        const offset = element.offsetTop - headerHeight;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };

  const goToHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

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
              <span className="text-xs text-[var(--brand-text-muted)]">Your Guide to Europe</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={goToHome}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              Home
            </button>

            {/* Destinations Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setDestinationsOpen(true)}
              onMouseLeave={() => setDestinationsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors">
                Destinations
                <ChevronDown className={`w-4 h-4 transition-transform ${destinationsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {destinationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-[500px] bg-[var(--brand-bg-card)] rounded-2xl shadow-xl border border-[var(--brand-border)] p-6 z-[100]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-semibold text-[var(--brand-text-muted)] uppercase tracking-wider mb-3">
                        Quick Links
                      </h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            scrollToSection('destinations');
                            setDestinationsOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg transition-colors"
                        >
                          Browse All Destinations
                        </button>
                        <Link
                          to="/day-trips"
                          className="block px-3 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg transition-colors"
                          onClick={() => setDestinationsOpen(false)}
                        >
                          Day Trips from Base
                        </Link>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-[var(--brand-text-muted)] uppercase tracking-wider mb-3">
                        By Category
                      </h3>
                      <div className="space-y-2">
                        <button className="block w-full text-left px-3 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg transition-colors">
                          Historic Sites
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg transition-colors">
                          Scenic Nature
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg transition-colors">
                          City Breaks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/day-trips"
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              Day Trips
            </Link>

            <button
              onClick={() => scrollToSection('travel-tips')}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              Travel Tips
            </button>

            <button
              onClick={() => scrollToSection('german-phrases')}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              Travel Phrases
            </button>

            <button
              onClick={() => scrollToSection('english-services')}
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              English Services
            </button>

            <Link
              to="/about"
              className="px-4 py-2 text-sm font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--brand-primary-light)] transition-all hover:shadow-lg hover:scale-105"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--brand-bg-card)] border-t border-[var(--brand-border)]">
          <div className="px-4 py-6 space-y-1">
            <button
              onClick={() => {
                goToHome();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection('destinations');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
            >
              Destinations
            </button>
            <Link
              to="/day-trips"
              className="block px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Day Trips
            </Link>
            <button
              onClick={() => {
                scrollToSection('travel-tips');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
            >
              Travel Tips
            </button>
            <button
              onClick={() => {
                scrollToSection('german-phrases');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
            >
              Travel Phrases
            </button>
            <button
              onClick={() => {
                scrollToSection('english-services');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
            >
              English Services
            </button>
            <Link
              to="/about"
              className="block px-4 py-3 text-base font-medium text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)] hover:text-[var(--brand-primary)] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                scrollToSection('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-6 py-3 bg-[var(--brand-primary)] text-white text-base font-semibold rounded-full hover:bg-[var(--brand-primary-light)] transition-all hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}