import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const Footer: React.FC = () => {
  const handleOpenCookieSettings = () => {
    localStorage.removeItem('cookieConsent');
    window.dispatchEvent(new Event('openCookieSettings'));
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              European Living
            </h3>
            <p className="text-sm text-gray-400">
              Your guide to living, working, and exploring Germany and Europe
              as a U.S. military member or expat.
            </p>
            <a
              href="https://www.facebook.com/EuropeanLivingOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Follow on Facebook
            </a>
            <a
              href="https://www.instagram.com/european.living.live/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pcs-guide" className="hover:text-white transition-colors">
                  PCS Guide to Germany
                </Link>
              </li>
              <li>
                <Link to="/services-directory" className="hover:text-white transition-colors">
                  Services Directory
                </Link>
              </li>
              <li>
                <Link to="/day-trips" className="hover:text-white transition-colors">
                  Day Trips
                </Link>
              </li>
              <li>
                <Link to="/family-adventures" className="hover:text-white transition-colors">
                  Family Adventures
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/submit-business" className="hover:text-white transition-colors">
                  Submit Your Business
                </Link>
              </li>
              <li>
                <a
                  href="https://www.usedcarguys.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Used Car Guys GmbH
                </a>
              </li>
              <li>
                <a
                  href="https://www.americanautonation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  American Auto Nation Insurance
                </a>
              </li>
              <li>
                <a
                  href="https://expattax.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  German Tax Advice for English Speaking Expats
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={handleOpenCookieSettings}
                  className="hover:text-white transition-colors flex items-center gap-2 text-left"
                >
                  <Cookie className="w-4 h-4" />
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Stats strip */}
        <div className="border-t border-[var(--brand-primary)] border-opacity-30 pt-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <div className="text-[var(--brand-gold)] font-bold mb-2">📍 150+ Businesses</div>
              <div className="text-sm text-[var(--brand-bg-alt)]">
                Verified English-friendly services
              </div>
            </div>
            <div>
              <div className="text-[var(--brand-gold)] font-bold mb-2">🎖️ 10+ Years</div>
              <div className="text-sm text-[var(--brand-bg-alt)]">
                Serving the military community
              </div>
            </div>
            <div>
              <div className="text-[var(--brand-gold)] font-bold mb-2">🗺️ 6 Bases</div>
              <div className="text-sm text-[var(--brand-bg-alt)]">
                Major US installations covered
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} European Living. All rights reserved.
            Serving the American military community in Germany.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/impressum" className="hover:text-gray-300 transition-colors">
              Impressum
            </Link>
            <span>·</span>
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;