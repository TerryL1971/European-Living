// src/components/BusinessSubmissionForm.tsx
import React, { useState } from 'react';
import { Building2, MapPin, Phone, Languages, Award, Clock, CheckCircle } from 'lucide-react';

interface FormData {
  businessName: string;
  category: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  nearbyBases: string[];
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  priceRange: string;
  englishFluency: string;
  otherLanguages: string;
  sofaFamiliar: boolean;
  militaryDiscount: boolean;
  discountPercent: string;
  onBaseAccess: boolean;
  deliveryToBase: boolean;
  hours: string;
  additionalNotes: string;
}

export default function BusinessSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    category: '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    nearbyBases: [],
    phone: '',
    email: '',
    website: '',
    specialties: [],
    priceRange: '',
    englishFluency: '',
    otherLanguages: '',
    sofaFamiliar: false,
    militaryDiscount: false,
    discountPercent: '',
    onBaseAccess: false,
    deliveryToBase: false,
    hours: '',
    additionalNotes: ''
  });

  const categories = [
    'Restaurants & Dining',
    'Shopping',
    'Home Services',
    'Real Estate',
    'Legal Services',
    'Education',
    'Business Services'
  ];

  const bases = [
    'Patch Barracks',
    'Panzer Kaserne',
    'Robinson Barracks',
    'Ramstein Air Base',
    'Vogelweh',
    'Landstuhl',
    'Clay Kaserne',
    'Hainerberg',
    'Sembach',
    'Other'
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (name: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const current = (prev[name] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((item: string) => item !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--brand-bg)] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--brand-light)] rounded-lg shadow-lg p-8 text-center border border-[var(--border)]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">Thank You!</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-6">
              Your business submission has been received. We'll review it and get back to you within 2-3 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-[var(--brand-button)] text-[var(--brand-dark)] rounded-lg font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition-colors duration-200"
            >
              Submit Another Business
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--brand-dark)] mb-2">Add Your Business</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Help American military families find your English-friendly business
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="Describe your business and what makes it great for American families..."
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Location</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="Stuttgart"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="70173"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-3">
                  Nearby Military Bases (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {bases.map(base => (
                    <label key={base} className="flex items-center cursor-pointer hover:bg-[var(--muted)] p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.nearbyBases.includes(base)}
                        onChange={() => handleMultiSelect('nearbyBases', base)}
                        className="w-4 h-4 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)]"
                      />
                      <span className="ml-2 text-sm text-[var(--brand-dark)]">{base}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="+49 711 555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="info@yourbusiness.de"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="https://yourbusiness.de"
                />
              </div>
            </div>
          </div>

          {/* Language Support */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Languages className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Language Support</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  English Fluency Level *
                </label>
                <select
                  value={formData.englishFluency}
                  onChange={(e) => handleChange('englishFluency', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select fluency level</option>
                  <option value="fluent">Fluent - Native or near-native speakers</option>
                  <option value="conversational">Conversational - Can handle most situations</option>
                  <option value="basic">Basic - Simple conversations only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Other Languages Spoken
                </label>
                <input
                  type="text"
                  value={formData.otherLanguages}
                  onChange={(e) => handleChange('otherLanguages', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="e.g., French, Spanish, Italian"
                />
              </div>
            </div>
          </div>

          {/* Military-Friendly Features */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Military-Friendly Features</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-start cursor-pointer p-3 hover:bg-[var(--muted)] rounded transition-colors">
                <input
                  type="checkbox"
                  checked={formData.sofaFamiliar}
                  onChange={(e) => handleChange('sofaFamiliar', e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)] mt-0.5"
                />
                <div className="ml-3">
                  <span className="font-medium text-[var(--brand-dark)]">SOFA Status Familiar</span>
                  <p className="text-sm text-[var(--muted-foreground)]">You understand SOFA status and military regulations</p>
                </div>
              </label>

              <label className="flex items-start cursor-pointer p-3 hover:bg-[var(--muted)] rounded transition-colors">
                <input
                  type="checkbox"
                  checked={formData.militaryDiscount}
                  onChange={(e) => handleChange('militaryDiscount', e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)] mt-0.5"
                />
                <div className="ml-3">
                  <span className="font-medium text-[var(--brand-dark)]">Military Discount Offered</span>
                  <p className="text-sm text-[var(--muted-foreground)]">You offer a discount to military personnel</p>
                </div>
              </label>

              {formData.militaryDiscount && (
                <div className="ml-8 p-4 bg-[var(--brand-bg-alt)] rounded border border-[var(--border)]">
                  <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                    Discount Percentage
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.discountPercent}
                      onChange={(e) => handleChange('discountPercent', e.target.value)}
                      min="0"
                      max="100"
                      className="w-32 px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                      placeholder="10"
                    />
                    <span className="text-[var(--brand-dark)] font-medium">%</span>
                  </div>
                </div>
              )}

              <label className="flex items-start cursor-pointer p-3 hover:bg-[var(--muted)] rounded transition-colors">
                <input
                  type="checkbox"
                  checked={formData.onBaseAccess}
                  onChange={(e) => handleChange('onBaseAccess', e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)] mt-0.5"
                />
                <div className="ml-3">
                  <span className="font-medium text-[var(--brand-dark)]">On-Base Access</span>
                  <p className="text-sm text-[var(--muted-foreground)]">You can provide services on military bases</p>
                </div>
              </label>

              <label className="flex items-start cursor-pointer p-3 hover:bg-[var(--muted)] rounded transition-colors">
                <input
                  type="checkbox"
                  checked={formData.deliveryToBase}
                  onChange={(e) => handleChange('deliveryToBase', e.target.checked)}
                  className="w-5 h-5 text-[var(--brand-primary)] rounded focus:ring-2 focus:ring-[var(--brand-primary)] mt-0.5"
                />
                <div className="ml-3">
                  <span className="font-medium text-[var(--brand-dark)]">Delivery to Base</span>
                  <p className="text-sm text-[var(--muted-foreground)]">You deliver to on-base housing</p>
                </div>
              </label>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-[var(--brand-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Business Hours</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                Operating Hours
              </label>
              <textarea
                value={formData.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200 font-mono text-sm"
                placeholder="Mon-Fri: 9:00-18:00&#10;Sat: 10:00-16:00&#10;Sun: Closed"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-[var(--brand-light)] rounded-lg shadow-md p-6 border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">Additional Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Price Range
                </label>
                <select
                  value={formData.priceRange}
                  onChange={(e) => handleChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select price range</option>
                  <option value="$">$ - Budget-friendly</option>
                  <option value="$$">$$ - Moderate</option>
                  <option value="$$$">$$$ - Upscale</option>
                  <option value="$$$$">$$$$ - Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--brand-dark)] mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleChange('additionalNotes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--brand-light)] text-[var(--brand-dark)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:outline-none transition-all duration-200"
                  placeholder="Any other information that would be helpful for American military families..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border-2 border-[var(--border)] rounded-lg text-[var(--brand-dark)] font-medium hover:bg-[var(--muted)] transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[var(--brand-button)] text-[var(--brand-dark)] rounded-lg font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition-colors duration-200 shadow-md"
            >
              Submit for Review
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-[var(--brand-bg-alt)] border-2 border-[var(--secondary)] rounded-lg p-6">
          <h3 className="font-bold text-[var(--brand-dark)] mb-3 text-lg">What happens next?</h3>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>We'll review your submission within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>We may contact you for additional information or verification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Once approved, your business will appear in the directory</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>You can update your information anytime by contacting us</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}