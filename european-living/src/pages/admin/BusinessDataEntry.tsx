// src/pages/admin/BusinessDataEntry.tsx
import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader,
  MapPin
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import React from 'react';

// Placeholder for your base data (Replace with actual data source if needed)
const BASES = [
  { id: 'ramstein', name: 'Ramstein AB' },
  { id: 'stuttgart', name: 'USAG Stuttgart' },
  { id: 'kaiserslautern', name: 'KMC Area' },
  { id: 'wiesbaden', name: 'USAG Wiesbaden' },
  { id: 'grafenwoehr', name: 'USAG Bavaria' },
  { id: 'spangdahlem', name: 'Spangdahlem AB' },
];

// Match your existing Business interface structure
interface Business {
  id: string;
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  englishFluency?: "fluent" | "conversational" | "basic";
  verified?: boolean;
  featured?: boolean;
  featuredTier?: "free" | "verified" | "featured" | "sponsored";
  baseDistance?: string;
  notes?: string;
  imageUrl?: string;
  status?: "active" | "pending" | "inactive";
  basesServed?: string[]; // Array of base IDs
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  city?: string;
}

// Database row type (snake_case as stored in Supabase)
interface BusinessRow {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  location: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  english_fluency?: string;
  verified?: boolean;
  featured?: boolean;
  featured_tier?: string;
  base_distance?: string;
  notes?: string;
  image_url?: string;
  status?: string;
  bases_served?: string[];
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  created_at?: string;
  updated_at?: string;
  city?: string;
}

// Convert database row to Business object
function mapBusinessRow(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,
    location: row.location,
    address: row.address,
    phone: row.phone,
    email: row.email,
    website: row.website,
    englishFluency: row.english_fluency as Business["englishFluency"],
    verified: row.verified,
    featured: row.featured,
    featuredTier: row.featured_tier as Business["featuredTier"],
    baseDistance: row.base_distance,
    notes: row.notes,
    imageUrl: row.image_url,
    status: row.status as Business["status"],
    basesServed: row.bases_served,
    latitude: row.latitude,
    longitude: row.longitude,
    googleMapsUrl: row.google_maps_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    city: row.city,
  };
}

// ----------------------------------------------------------------------
// URL Helper Functions
// ----------------------------------------------------------------------

const generateGoogleMapsUrl = (lat: number, lon: number): string => {
  // Use the standard Google Maps query URL for coordinates
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
};

const isValidUrl = (url?: string): boolean => {
  if (!url) return true; // Treat empty strings as valid (not present)
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ----------------------------------------------------------------------

export default function BusinessDataEntry() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<Business | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('missing-data');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loading, setLoading] = useState(true);
  const [geocoding, setGeocoding] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    async function loadBusinesses() {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('name');

        if (error) throw error;

        const mapped = (data as BusinessRow[]).map(mapBusinessRow);
        setBusinesses(mapped);
        if (mapped.length > 0) {
          const initialFilteredIndex = mapped.findIndex(b => getMissingFields(b).length > 0);
          const startIndex = initialFilteredIndex !== -1 ? initialFilteredIndex : 0;

          setFormData(mapped[startIndex]);
          setCurrentIndex(startIndex);
        }
      } catch (error) {
        console.error('Error loading businesses:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, []);

  const getMissingFields = (business: Business) => {
    const missing: string[] = [];
    if (!business.address) missing.push('address');
    if (!business.phone) missing.push('phone');
    if (!business.email) missing.push('email');
    if (!business.website) missing.push('website');
    if (!business.latitude || !business.longitude) missing.push('coordinates');
    if (!business.googleMapsUrl) missing.push('googleMapsUrl');
    if (!business.description || business.description.length < 20) missing.push('description');
    return missing;
  };

  // Memoize filtered businesses to prevent redundant filtering on every render
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'all') return matchesSearch;
      if (filter === 'missing-data') return matchesSearch && getMissingFields(b).length > 0;
      if (filter === 'unverified') return matchesSearch && !b.verified;
      if (filter === 'no-coordinates') return matchesSearch && (!b.latitude || !b.longitude);
      if (filter === 'no-contact') return matchesSearch && (!b.phone && !b.email && !b.website);

      return matchesSearch;
    });
  }, [businesses, searchTerm, filter]);

  // Effect to sync formData with the current business index
  useEffect(() => {
    if (filteredBusinesses.length > 0) {
      const currentBusiness = filteredBusinesses[currentIndex];
      setFormData(currentBusiness);
      setValidationErrors([]); // Clear validation errors on navigation
    } else {
      setFormData(null);
    }
  }, [currentIndex, filteredBusinesses]);


  const handleInputChange = (field: keyof Business, value: unknown) => {
    if (!formData) return;
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  // 🌍 Handler for basesServed checkboxes
  const handleBasesServedChange = (baseId: string, isChecked: boolean) => {
    if (!formData) return;

    let updatedBases = formData.basesServed ? [...formData.basesServed] : [];

    if (isChecked) {
      if (!updatedBases.includes(baseId)) {
        updatedBases.push(baseId);
      }
    } else {
      updatedBases = updatedBases.filter(id => id !== baseId);
    }

    handleInputChange('basesServed', updatedBases);
  };

  // 🛡️ Validation Logic
  const validateForm = (data: Business): string[] => {
    const errors: string[] = [];

    if (data.website && !isValidUrl(data.website)) {
      errors.push('Website URL is invalid.');
    }
    if (data.googleMapsUrl && !isValidUrl(data.googleMapsUrl)) {
      errors.push('Google Maps URL is invalid.');
    }
    if (!data.latitude || !data.longitude) {
      errors.push('Coordinates (Latitude/Longitude) are required for map link generation.');
    }
    if (!data.name || !data.location || !data.category) {
      errors.push('Name, Location, and Category are required fields.');
    }

    return errors;
  };

  // ------------------------------
  // SAVE HANDLER WITH IMAGE URL FIX
  // ------------------------------
  const handleSave = async () => {
    if (!formData) return;

    const errors = validateForm(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
      return;
    }

    setSaveStatus('saving');
    setValidationErrors([]); // Clear errors before saving

    try {
      // Debug: confirm the id we're updating
      console.log('🆔 Attempting to update business id:', formData.id);
      console.log("🆔 Updating record:", formData.id, typeof formData.id);


      // Convert camelCase back to snake_case for database (match your table columns)
      const { data, error, status, statusText } = await supabase
        .from('businesses')
        .update({
          name: formData.name,
          category: formData.category,
          subcategory: formData.subcategory,
          location: formData.location,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
          description: formData.description,
          english_fluency: formData.englishFluency,
          verified: formData.verified,
          featured: formData.featured,
          featured_tier: formData.featuredTier,
          latitude: formData.latitude,
          longitude: formData.longitude,
          google_maps_url: formData.googleMapsUrl,
          notes: formData.notes,
          image_url: formData.imageUrl, // <-- FIX: Mapped imageUrl to image_url
          status: formData.status,
          bases_served: formData.basesServed,
          updated_at: new Date().toISOString()
        })
        .eq('id', formData.id)
        .select(); // Return updated rows for inspection

      // Log full response so you can inspect what happened
      console.log('🧠 Supabase update result:', { data, error, status, statusText });

      if (error) {
        // Common errors: RLS, column mismatch, or permissions
        console.error('Error saving to Supabase:', error);
        setValidationErrors(['A database error occurred. See console for details.']);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 5000);
        return;
      }

      if (!data || (Array.isArray(data) && data.length === 0)) {
        // No rows returned — probably wrong ID or RLS blocked the update
        console.warn('Update returned no rows. Possible causes: ID mismatch, RLS blocked the update, or no matching row.');
        setValidationErrors(['Update executed but no rows were returned. Check console for details.']);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 5000);
        return;
      }

      // Update local state with saved data (best-effort — we trust formData is authoritative)
      setBusinesses(prev => prev.map(b => b.id === formData.id ? formData : b));

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setValidationErrors(['A database error occurred. See console for details.']);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredBusinesses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSaveStatus('idle');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSaveStatus('idle');
    }
  };

  const handleGenerateGoogleMapsUrl = () => {
    if (formData && formData.latitude && formData.longitude) {
      const url = generateGoogleMapsUrl(formData.latitude, formData.longitude);
      handleInputChange('googleMapsUrl', url);
    }
  };

  const handleGeocodeAddress = async () => {
    if (!formData?.address) {
      alert('Please enter an address first');
      return;
    }

    setGeocoding(true);
    setValidationErrors([]);
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address + ', Germany')}`;

      const response = await fetch(nominatimUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        const url = generateGoogleMapsUrl(latitude, longitude);

        setFormData(prev => prev ? {
          ...prev,
          latitude,
          longitude,
          googleMapsUrl: url
        } : null);

        alert(`Coordinates added successfully! Latitude: ${latitude}, Longitude: ${longitude}. Google Maps URL generated.`);
      } else {
        alert('Could not find coordinates for this address. Try adding more detail.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error getting coordinates. Please try again.');
    } finally {
      setGeocoding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading businesses...</p>
        </div>
      </div>
    );
  }

  if (!formData || filteredBusinesses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No businesses found matching current filter/search.</p>
      </div>
    );
  }

  const missingFields = getMissingFields(formData);
  const completionPercentage = Math.round(((7 - missingFields.length) / 7) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Data Entry</h1>
          <p className="text-gray-600">Fill in missing information for businesses in the directory</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={({ target }) => {
                setFilter(target.value);
                setCurrentIndex(0); // Reset index on filter change
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Businesses ({businesses.length})</option>
              <option value="missing-data">Missing Data ({businesses.filter(b => getMissingFields(b).length > 0).length})</option>
              <option value="unverified">Unverified ({businesses.filter(b => !b.verified).length})</option>
              <option value="no-coordinates">No Coordinates ({businesses.filter(b => !b.latitude || !b.longitude).length})</option>
              <option value="no-contact">No Contact Info ({businesses.filter(b => !b.phone && !b.email && !b.website).length})</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-semibold text-gray-700">
                {currentIndex + 1} of {filteredBusinesses.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredBusinesses.length - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Completion:</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="font-semibold text-gray-700">{completionPercentage}%</span>
            </div>
          </div>

          {/* Display data completeness warnings */}
          {missingFields.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Missing Fields:</p>
                <p className="text-sm text-amber-700">{missingFields.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Display validation errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Validation Errors:</p>
                <ul className="text-sm text-red-700 list-disc ml-4">
                  {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{formData.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* -------------------------------------------------------- */}
            {/* TOP ROW: Name, Category, Subcategory, Location */}
            {/* -------------------------------------------------------- */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={({ target }) => handleInputChange('name', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={({ target }) => handleInputChange('category', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <input
                type="text"
                value={formData.subcategory || ''}
                onChange={({ target }) => handleInputChange('subcategory', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., car-dealerships"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={({ target }) => handleInputChange('location', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* -------------------------------------------------------- */}
            {/* ADDRESS & GEOCODING */}
            {/* -------------------------------------------------------- */}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address {!formData.address && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={({ target }) => handleInputChange('address', target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full street address"
                />
                <button
                  onClick={handleGeocodeAddress}
                  disabled={!formData.address || geocoding}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                >
                  {geocoding ? <Loader className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                  Get Coords
                </button>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* CONTACT INFO */}
            {/* -------------------------------------------------------- */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone {!formData.phone && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={({ target }) => handleInputChange('phone', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+49 123 456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email {!formData.email && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={({ target }) => handleInputChange('email', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@business.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website {!formData.website && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={({ target }) => handleInputChange('website', target.value)}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formData.website && !isValidUrl(formData.website) ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com"
                />
                {formData.website && isValidUrl(formData.website) && (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* DESCRIPTION */}
            {/* -------------------------------------------------------- */}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description {(!formData.description || formData.description.length < 20) && <span className="text-amber-600">⚠️ Too short</span>}
              </label>
              <textarea
                value={formData.description || ''}
                onChange={({ target }) => handleInputChange('description', target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the business..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description?.length || 0} characters</p>
            </div>

            {/* -------------------------------------------------------- */}
            {/* COORDINATES & MAP URL */}
            {/* -------------------------------------------------------- */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude {!formData.latitude && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <input
                type="number"
                step="0.000001"
                value={formData.latitude ?? ''}
                onChange={({ target }) => handleInputChange('latitude', target.value ? parseFloat(target.value) : undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="48.1234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude {!formData.longitude && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <input
                type="number"
                step="0.000001"
                value={formData.longitude ?? ''}
                onChange={({ target }) => handleInputChange('longitude', target.value ? parseFloat(target.value) : undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="9.5678"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps URL {!formData.googleMapsUrl && <span className="text-amber-600">⚠️ Missing</span>}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.googleMapsUrl || ''}
                  onChange={({ target }) => handleInputChange('googleMapsUrl', target.value)}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formData.googleMapsUrl && !isValidUrl(formData.googleMapsUrl) ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://www.google.com/maps/search/?api=1&query=lat,lon"
                />
                {formData.googleMapsUrl && isValidUrl(formData.googleMapsUrl) && (
                  <a
                    href={formData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={handleGenerateGoogleMapsUrl}
                  disabled={!formData.latitude || !formData.longitude}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* BASES SERVED */}
            {/* -------------------------------------------------------- */}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bases Served</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                {BASES.map((base) => (
                  <label key={base.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.basesServed?.includes(base.id) || false}
                      onChange={({ target }) => handleBasesServedChange(base.id, target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{base.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* MISC CONTROLS */}
            {/* -------------------------------------------------------- */}

            <div className="md:col-span-2 grid grid-cols-3 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">English Fluency</label>
                <select
                  value={formData.englishFluency || 'conversational'}
                  onChange={({ target }) => handleInputChange('englishFluency', target.value as 'fluent' | 'conversational' | 'basic')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fluent">Fluent</option>
                  <option value="conversational">Conversational</option>
                  <option value="basic">Basic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status || 'active'}
                  onChange={({ target }) => handleInputChange('status', target.value as 'active' | 'pending' | 'inactive')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Featured Tier Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Tier</label>
                <select
                  value={formData.featuredTier || 'free'}
                  onChange={({ target }) => handleInputChange('featuredTier', target.value as Business["featuredTier"])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="free">Free</option>
                  <option value="verified">Verified</option>
                  <option value="featured">Featured</option>
                  <option value="sponsored">Sponsored</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={({ target }) => handleInputChange('notes', target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Internal notes..."
              />
            </div>

            {/* -------------------------------------------------------- */}
            {/* IMAGE URL INPUT */}
            {/* -------------------------------------------------------- */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={({ target }) => handleInputChange('imageUrl', target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* -------------------------------------------------------- */}
            {/* CHECKBOXES */}
            {/* -------------------------------------------------------- */}

            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.verified || false}
                  onChange={({ target }) => handleInputChange('verified', target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Verified</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={({ target }) => handleInputChange('featured', target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              {saveStatus === 'saved' && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Changes saved successfully!</span>
                </div>
              )}
              {(saveStatus === 'error' && validationErrors.length === 0) && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Database Error saving changes</span>
                </div>
              )}
              {(saveStatus === 'error' && validationErrors.length > 0) && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Validation Failed. See error section above.</span>
                </div>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold transition"
            >
              {saveStatus === 'saving' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}