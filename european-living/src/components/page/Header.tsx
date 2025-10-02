import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggle = () => setIsMobileMenuOpen((s) => !s);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">EL</span>
        </div>
        <span className="ml-3 text-gray-900 font-semibold text-lg">European Living</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#home" className="text-blue-600 font-medium">Home</a>
        <a href="#destinations" className="text-gray-600 hover:text-gray-900">Destinations</a>
        <a href="#tips" className="text-gray-600 hover:text-gray-900">Travel Tips</a>
        <a href="#phrases" className="text-gray-600 hover:text-gray-900">German Phrases</a>
        <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
      </div>

      {/* Desktop Contact Button */}
      <div className="hidden md:flex items-center">
        <a href="#services">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </a>
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
          <a href="#home" className="text-blue-600 font-medium px-4 py-2">Home</a>
          <a href="#destinations" className="text-gray-600 px-4 py-2">Destinations</a>
          <a href="#tips" className="text-gray-600 px-4 py-2">Travel Tips</a>
          <a href="#phrases" className="text-gray-600 px-4 py-2">German Phrases</a>
          <a href="#services" className="text-gray-600 px-4 py-2">Services</a>
          <a href="#services">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium mx-4">
              Contact Us
            </button>
          </a>
        </div>
      </div>
    )}
  </div>
</nav>
  );
}
