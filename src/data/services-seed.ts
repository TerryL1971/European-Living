// data/services-seed.ts
import { ServiceBusiness, ServiceCategory } from '../types/services';

export const seedServices: ServiceBusiness[] = [
  // RESTAURANTS
  {
    id: 'rest-001',
    name: "Bobby's American Diner",
    category: 'restaurants',
    description: 'Authentic American diner serving burgers, breakfast all day, and comfort food. English-speaking staff, American-owned.',
    location: {
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      address: 'Königstraße 45',
      postalCode: '70173',
      country: 'Germany',
      nearbyBases: ['Patch Barracks', 'Panzer Kaserne']
    },
    contact: {
      phone: '+49 711 555-1234',
      email: 'info@bobbysdinerstuttgart.de',
      website: 'https://bobbysdinerstuttgart.de',
      facebook: 'BobbysDinerStuttgart'
    },
    hours: {
      monday: '9:00 - 22:00',
      tuesday: '9:00 - 22:00',
      wednesday: '9:00 - 22:00',
      thursday: '9:00 - 22:00',
      friday: '9:00 - 23:00',
      saturday: '9:00 - 23:00',
      sunday: '10:00 - 21:00'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: true,
      discountPercent: 10,
      deliveryToBase: false
    },
    specialties: ['American', 'Breakfast/Brunch', 'Burgers'],
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 328,
    verified: true,
    featured: true,
    addedDate: '2024-01-15',
    lastUpdated: '2024-10-20',
    tags: ['american-food', 'family-friendly', 'breakfast', 'burgers', 'military-discount'],
    notes: 'American owner, understands US preferences. Military ID required for discount.'
  },
  {
    id: 'rest-002',
    name: 'Trattoria Bella Vista',
    category: 'restaurants',
    description: 'Italian restaurant with English-speaking staff. Popular with American families for authentic Italian cuisine.',
    location: {
      city: 'Kaiserslautern',
      state: 'Rheinland-Pfalz',
      address: 'Marktstraße 12',
      postalCode: '67655',
      country: 'Germany',
      nearbyBases: ['Ramstein Air Base', 'Vogelweh']
    },
    contact: {
      phone: '+49 631 555-2345',
      email: 'info@bellavista-kl.de',
      website: 'https://bellavista-kl.de'
    },
    hours: {
      monday: 'Closed',
      tuesday: '17:00 - 22:00',
      wednesday: '17:00 - 22:00',
      thursday: '17:00 - 22:00',
      friday: '17:00 - 23:00',
      saturday: '17:00 - 23:00',
      sunday: '12:00 - 21:00'
    },
    languages: {
      english: true,
      german: true,
      other: ['Italian'],
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: false,
      deliveryToBase: false
    },
    specialties: ['Italian', 'Pizza', 'Pasta'],
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 215,
    verified: true,
    addedDate: '2024-02-10',
    lastUpdated: '2024-10-15',
    tags: ['italian', 'pizza', 'pasta', 'family-friendly', 'date-night']
  },

  // SHOPPING
  {
    id: 'shop-001',
    name: 'American Grocery Store',
    category: 'shopping',
    description: 'Specialty store stocking American brands and products hard to find in Germany. Peanut butter, cereals, baking supplies, and more.',
    location: {
      city: 'Wiesbaden',
      state: 'Hessen',
      address: 'Bahnhofstraße 78',
      postalCode: '65185',
      country: 'Germany',
      nearbyBases: ['Clay Kaserne', 'Hainerberg']
    },
    contact: {
      phone: '+49 611 555-3456',
      email: 'contact@americangrocery-wiesbaden.de',
      website: 'https://americangrocery-wiesbaden.de',
      instagram: 'AmericanGroceryWiesbaden'
    },
    hours: {
      monday: '10:00 - 19:00',
      tuesday: '10:00 - 19:00',
      wednesday: '10:00 - 19:00',
      thursday: '10:00 - 19:00',
      friday: '10:00 - 20:00',
      saturday: '9:00 - 18:00',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: true,
      discountPercent: 5,
      deliveryToBase: true
    },
    specialties: ['American Food Stores', 'Grocery Stores'],
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 456,
    verified: true,
    featured: true,
    addedDate: '2023-11-01',
    lastUpdated: '2024-10-25',
    tags: ['american-products', 'grocery', 'specialty-foods', 'delivery', 'military-discount'],
    notes: 'Delivers to on-base housing. Orders over €50 get free delivery.'
  },
  {
    id: 'shop-002',
    name: 'TechWorld Electronics',
    category: 'shopping',
    description: 'Electronics store with English-speaking staff. Helps with voltage converters and US-compatible electronics.',
    location: {
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      address: 'Hauptstätter Straße 124',
      postalCode: '70178',
      country: 'Germany',
      nearbyBases: ['Patch Barracks', 'Robinson Barracks']
    },
    contact: {
      phone: '+49 711 555-4567',
      email: 'service@techworld-stuttgart.de',
      website: 'https://techworld-stuttgart.de'
    },
    hours: {
      monday: '10:00 - 20:00',
      tuesday: '10:00 - 20:00',
      wednesday: '10:00 - 20:00',
      thursday: '10:00 - 20:00',
      friday: '10:00 - 20:00',
      saturday: '9:00 - 18:00',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: false,
      usInsuranceAccepted: false
    },
    specialties: ['Electronics', 'Computers', 'Voltage Converters'],
    priceRange: '$$',
    rating: 4.3,
    reviewCount: 178,
    verified: true,
    addedDate: '2024-03-20',
    lastUpdated: '2024-10-10',
    tags: ['electronics', 'computers', 'voltage-converters', 'english-staff']
  },

  // HOME SERVICES
  {
    id: 'home-001',
    name: 'Schmidt Plumbing Services',
    category: 'home-services',
    description: 'English-speaking plumber experienced with American plumbing standards and military housing regulations.',
    location: {
      city: 'Kaiserslautern',
      state: 'Rheinland-Pfalz',
      address: 'Servicegebiet: KMC Area',
      country: 'Germany',
      nearbyBases: ['Ramstein Air Base', 'Vogelweh', 'Landstuhl']
    },
    contact: {
      phone: '+49 631 555-5678',
      email: 'service@schmidt-plumbing.de',
      whatsapp: '+49 631 555-5678'
    },
    hours: {
      monday: '8:00 - 18:00',
      tuesday: '8:00 - 18:00',
      wednesday: '8:00 - 18:00',
      thursday: '8:00 - 18:00',
      friday: '8:00 - 18:00',
      saturday: '9:00 - 14:00',
      sunday: 'Emergency only',
      notes: '24/7 emergency service available'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      onBaseAccess: true,
      militaryDiscount: false
    },
    specialties: ['Plumbing', 'Emergency Repairs', 'Installation'],
    priceRange: '$$',
    rating: 4.9,
    reviewCount: 267,
    verified: true,
    featured: true,
    addedDate: '2023-09-15',
    lastUpdated: '2024-10-22',
    tags: ['plumbing', 'emergency-service', 'military-housing', 'english-speaking', 'on-base-access'],
    notes: 'Has on-base access. Familiar with housing office requirements. Call or WhatsApp for emergencies.'
  },
  {
    id: 'home-002',
    name: 'Clean & Shine Housekeeping',
    category: 'home-services',
    description: 'Professional cleaning service popular with military families. English-speaking staff, flexible scheduling.',
    location: {
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      address: 'Service area: Stuttgart & surrounding',
      country: 'Germany',
      nearbyBases: ['Patch Barracks', 'Panzer Kaserne', 'Robinson Barracks']
    },
    contact: {
      phone: '+49 711 555-6789',
      email: 'booking@cleanandshine-stuttgart.de',
      website: 'https://cleanandshine-stuttgart.de',
      whatsapp: '+49 711 555-6789'
    },
    hours: {
      monday: '7:00 - 19:00',
      tuesday: '7:00 - 19:00',
      wednesday: '7:00 - 19:00',
      thursday: '7:00 - 19:00',
      friday: '7:00 - 19:00',
      saturday: '8:00 - 16:00',
      sunday: 'By appointment'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: true,
      discountPercent: 15,
      onBaseAccess: true
    },
    specialties: ['Cleaning Services', 'Move-out Cleaning', 'Regular Maintenance'],
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 412,
    verified: true,
    addedDate: '2024-01-08',
    lastUpdated: '2024-10-18',
    tags: ['cleaning', 'housekeeping', 'move-out', 'military-discount', 'pcs-cleaning'],
    notes: 'Specializes in final cleaning for PCS moves. Military ID required for discount.'
  },

  // REAL ESTATE
  {
    id: 'real-001',
    name: 'Military Housing Solutions',
    category: 'real-estate',
    description: 'Real estate agency specializing in helping American military families find housing. Understands LQA and SOFA requirements.',
    location: {
      city: 'Wiesbaden',
      state: 'Hessen',
      address: 'Wilhelmstraße 34',
      postalCode: '65183',
      country: 'Germany',
      nearbyBases: ['Clay Kaserne', 'Hainerberg', 'Mainz-Kastel']
    },
    contact: {
      phone: '+49 611 555-7890',
      email: 'info@militaryhousing-wiesbaden.de',
      website: 'https://militaryhousing-wiesbaden.de',
      whatsapp: '+49 611 555-7890'
    },
    hours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 17:00',
      saturday: 'By appointment',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      usInsuranceAccepted: false
    },
    specialties: ['Rental Agents', 'Relocation Services', 'LQA Housing'],
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 189,
    verified: true,
    featured: true,
    addedDate: '2023-08-20',
    lastUpdated: '2024-10-20',
    tags: ['real-estate', 'rental', 'lqa', 'sofa', 'military-housing', 'relocation'],
    notes: 'Experienced with LQA paperwork. Helps with housing office coordination. Most agents are former military spouses.'
  },

  // LEGAL SERVICES
  {
    id: 'legal-001',
    name: 'Anderson & Partners Law Firm',
    category: 'legal',
    description: 'Bilingual law firm specializing in SOFA status, family law, and contract review for American military personnel.',
    location: {
      city: 'Kaiserslautern',
      state: 'Rheinland-Pfalz',
      address: 'Fruchthallstraße 8',
      postalCode: '67655',
      country: 'Germany',
      nearbyBases: ['Ramstein Air Base', 'Vogelweh', 'Sembach']
    },
    contact: {
      phone: '+49 631 555-8901',
      email: 'contact@andersonlaw-kl.de',
      website: 'https://andersonlaw-kl.de'
    },
    hours: {
      monday: '9:00 - 17:00',
      tuesday: '9:00 - 17:00',
      wednesday: '9:00 - 17:00',
      thursday: '9:00 - 17:00',
      friday: '9:00 - 16:00',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: false
    },
    specialties: ['SOFA Status', 'Family Law', 'Contract Review', 'Traffic Violations'],
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 143,
    verified: true,
    featured: true,
    addedDate: '2023-10-12',
    lastUpdated: '2024-10-15',
    tags: ['legal', 'lawyer', 'sofa', 'family-law', 'contracts', 'military-law'],
    notes: 'Free initial consultation. American attorney on staff. Experienced with SOFA regulations.'
  },

  // EDUCATION
  {
    id: 'edu-001',
    name: 'International School of Stuttgart',
    category: 'education',
    description: 'English-language international school offering American-style curriculum. Popular with military families.',
    location: {
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      address: 'Sigmaringer Straße 257',
      postalCode: '70567',
      country: 'Germany',
      nearbyBases: ['Patch Barracks', 'Panzer Kaserne']
    },
    contact: {
      phone: '+49 711 555-9012',
      email: 'admissions@isstuttgart.de',
      website: 'https://isstuttgart.de'
    },
    hours: {
      monday: '8:00 - 16:00',
      tuesday: '8:00 - 16:00',
      wednesday: '8:00 - 16:00',
      thursday: '8:00 - 16:00',
      friday: '8:00 - 16:00',
      saturday: 'Closed',
      sunday: 'Closed',
      notes: 'School hours vary by age group'
    },
    languages: {
      english: true,
      german: true,
      other: ['French', 'Spanish'],
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: false
    },
    specialties: ['International Schools', 'American Curriculum', 'Grades PreK-12'],
    priceRange: '$$$$',
    rating: 4.6,
    reviewCount: 98,
    verified: true,
    addedDate: '2023-07-01',
    lastUpdated: '2024-10-01',
    tags: ['international-school', 'american-curriculum', 'english-education', 'ib-program'],
    notes: 'Offers IB and American diploma. Bus service available. Waiting lists common.'
  },
  {
    id: 'edu-002',
    name: 'English Tutoring Center',
    category: 'education',
    description: 'Private tutoring for students needing extra help in English, Math, and other subjects. Native English-speaking tutors.',
    location: {
      city: 'Wiesbaden',
      state: 'Hessen',
      address: 'Marktstraße 15',
      postalCode: '65183',
      country: 'Germany',
      nearbyBases: ['Clay Kaserne', 'Hainerberg']
    },
    contact: {
      phone: '+49 611 555-0123',
      email: 'info@englishtutoring-wiesbaden.de',
      website: 'https://englishtutoring-wiesbaden.de'
    },
    hours: {
      monday: '14:00 - 20:00',
      tuesday: '14:00 - 20:00',
      wednesday: '14:00 - 20:00',
      thursday: '14:00 - 20:00',
      friday: '14:00 - 19:00',
      saturday: '9:00 - 13:00',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: true,
      discountPercent: 10
    },
    specialties: ['English Tutoring', 'Math Tutoring', 'SAT/ACT Prep', 'Homework Help'],
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    addedDate: '2024-02-14',
    lastUpdated: '2024-10-12',
    tags: ['tutoring', 'english', 'math', 'sat-prep', 'homework-help', 'military-discount'],
    notes: 'Native English speakers. Online and in-person options. Military ID required for discount.'
  },

  // BUSINESS SERVICES
  {
    id: 'bus-001',
    name: 'American Tax Services Germany',
    category: 'business',
    description: 'Specialized in US tax preparation for Americans living in Germany. Understands military tax benefits and SOFA status.',
    location: {
      city: 'Kaiserslautern',
      state: 'Rheinland-Pfalz',
      address: 'Online services available nationwide',
      country: 'Germany',
      nearbyBases: ['Ramstein Air Base', 'All German bases']
    },
    contact: {
      phone: '+49 631 555-1357',
      email: 'info@americantaxgermany.de',
      website: 'https://americantaxgermany.de'
    },
    hours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 17:00',
      saturday: 'By appointment',
      sunday: 'Closed',
      notes: 'Extended hours during tax season (Jan-Apr)'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: true,
      discountPercent: 15
    },
    specialties: ['US Tax Preparation', 'Military Tax Benefits', 'FBAR Filing', 'Expat Taxes'],
    priceRange: '$$',
    rating: 5.0,
    reviewCount: 234,
    verified: true,
    featured: true,
    addedDate: '2023-06-10',
    lastUpdated: '2024-10-28',
    tags: ['tax-preparation', 'us-taxes', 'military-taxes', 'expat-taxes', 'cpa', 'military-discount'],
    notes: 'CPA certified in US and Germany. Virtual appointments available. Experienced with military tax situations.'
  },
  {
    id: 'bus-002',
    name: 'Expat Financial Planning',
    category: 'business',
    description: 'Financial advisors specializing in US military and expat financial planning. Investment, retirement, and insurance guidance.',
    location: {
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      address: 'Theodor-Heuss-Straße 2',
      postalCode: '70174',
      country: 'Germany',
      nearbyBases: ['Patch Barracks', 'Robinson Barracks']
    },
    contact: {
      phone: '+49 711 555-2468',
      email: 'contact@expatfinancial-stuttgart.de',
      website: 'https://expatfinancial-stuttgart.de'
    },
    hours: {
      monday: '9:00 - 17:00',
      tuesday: '9:00 - 17:00',
      wednesday: '9:00 - 17:00',
      thursday: '9:00 - 17:00',
      friday: '9:00 - 16:00',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    languages: {
      english: true,
      german: true,
      englishFluency: 'fluent'
    },
    militaryFeatures: {
      sofaFamiliar: true,
      militaryDiscount: false
    },
    specialties: ['Financial Planning', 'Retirement Planning', 'TSP Guidance', 'Insurance'],
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 87,
    verified: true,
    addedDate: '2024-04-05',
    lastUpdated: '2024-10-10',
    tags: ['financial-planning', 'retirement', 'investments', 'tsp', 'military-finance'],
    notes: 'Free initial consultation. Understands TSP, SBP, and military retirement benefits.'
  }
];

// Helper function to get services by category
export function getServicesByCategory(category: ServiceCategory): ServiceBusiness[] {
  return seedServices.filter(service => service.category === category);
}

// Helper function to get featured services
export function getFeaturedServices(): ServiceBusiness[] {
  return seedServices.filter(service => service.featured === true);
}

// Helper function to get services by location
export function getServicesByCity(city: string): ServiceBusiness[] {
  return seedServices.filter(service => 
    service.location.city.toLowerCase() === city.toLowerCase()
  );
}

// Helper function to get services near a base
export function getServicesNearBase(baseName: string): ServiceBusiness[] {
  return seedServices.filter(service => 
    service.location.nearbyBases?.some(base => 
      base.toLowerCase().includes(baseName.toLowerCase())
    )
  );
}