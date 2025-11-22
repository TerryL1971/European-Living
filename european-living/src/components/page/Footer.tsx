import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const Footer: React.FC = () => {
  const handleOpenCookieSettings = () => {
    // Clear consent to force the banner to show again
    localStorage.removeItem('cookieConsent');
    // Dispatch custom event that CookieConsentModal listens for
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
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
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
                  Used Car Guys
                </a>
              </li>
              <li>
                <a 
                  href="https://framedwithwonder.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Framed With Wonder
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} European Living. All rights reserved. Serving the American military community in Germany.
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ for U.S. military families in Europe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;