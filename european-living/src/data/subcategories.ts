// src/data/subcategories.ts
//
// NOTE: This was rebuilt against a real export of the `businesses` table
// (203 live rows) rather than the original planning draft. Several
// subcategories below (car-service, car-rental, obgyn, dermatology,
// hair-salons, malls, sports, general, furniture, department-stores,
// markets, home-improvement, specialty, housing-agency, temporary-lodging,
// housing-referral, military-defense, on-base-legal, dodea-schools,
// private-schools) didn't exist in the original file at all, even though
// they account for the majority of live listings in their categories.
//
// A handful of legacy rows store the *same* subcategory under two
// different exact strings (e.g. "International School" vs.
// "international-school"). Since ServiceCategoryPage groups businesses by
// the raw subcategory string, those pairs currently render as duplicate
// section headers on the live site. See normalize-subcategories.sql for
// the one-time data fix — run that once, and this file's ids will match
// every row going forward.

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface CategoryStructure {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export const CATEGORY_STRUCTURE: CategoryStructure[] = [
  {
    id: "automotive",
    name: "Automotive Services",
    subcategories: [
      {
        id: "car-dealerships",
        name: "Car Dealerships",
        description: "New and used car dealers specializing in US-spec vehicles",
      },
      {
        id: "mechanics",
        name: "Mechanics & Repair Shops",
        description: "Auto repair, maintenance, and diagnostic services",
      },
      {
        id: "car-service",
        name: "Auto Detailing & Body Shops",
        description: "Detailing, paint and body work, and specialty auto services",
      },
      {
        id: "inspection-stations",
        name: "Inspection Stations (TÜV)",
        description: "Official vehicle inspection and TÜV services",
      },
      {
        id: "car-rental",
        name: "Car Rental",
        description: "On- and off-base vehicle rental services",
      },
      {
        id: "auto-parts",
        name: "Auto Parts Stores",
        description: "Parts, accessories, and automotive supplies",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subcategories: [
      {
        id: "general-practitioners",
        name: "General Practitioners",
        description: "Family doctors and primary care physicians",
      },
      {
        id: "dentists",
        name: "Dentists",
        description: "Dental care and oral health services",
      },
      {
        id: "specialists",
        name: "Medical Specialists",
        description: "Specialized medical care (cardiology, orthopedics, etc.)",
      },
      {
        id: "obgyn",
        name: "OB/GYN",
        description: "Obstetrics and gynecology care",
      },
      {
        id: "dermatology",
        name: "Dermatology",
        description: "Skin care and dermatology services",
      },
      {
        id: "pharmacies",
        name: "Pharmacies",
        description: "Prescription medications and health supplies",
      },
      {
        id: "veterinary-services",
        name: "Veterinary Services",
        description: "English-speaking veterinary care for pets and American families",
      },
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants & Dining",
    subcategories: [
      {
        id: "american-food",
        name: "American Cuisine",
        description: "Burgers, BBQ, and classic American fare",
      },
      {
        id: "international",
        name: "International Cuisine",
        description: "Italian, Asian, Mediterranean, and more",
      },
      {
        id: "cafes",
        name: "Cafés & Coffee Shops",
        description: "Coffee, pastries, and light meals",
      },
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    subcategories: [
      {
        id: "clothing",
        name: "Clothing & Fashion",
        description: "Apparel and fashion retailers",
      },
      {
        id: "electronics",
        name: "Electronics",
        description: "Tech stores and electronics retailers",
      },
      {
        id: "grocery",
        name: "Grocery Stores",
        description: "Supermarkets and food shopping",
      },
      {
        id: "malls",
        name: "Shopping Malls",
        description: "Indoor shopping centers and retail arcades",
      },
      {
        id: "department-stores",
        name: "Department Stores",
        description: "Multi-category discount and department stores",
      },
      {
        id: "furniture",
        name: "Furniture & Home Goods",
        description: "Furniture, home goods, and household supplies",
      },
      {
        id: "home-improvement",
        name: "Home Improvement",
        description: "Hardware and home improvement supplies",
      },
      {
        id: "sports",
        name: "Sporting Goods",
        description: "Sports equipment and outdoor apparel",
      },
      {
        id: "hair-salons",
        name: "Hair Salons",
        description: "English-speaking hair salons and stylists",
      },
      {
        id: "markets",
        name: "Markets",
        description: "Indoor and outdoor food markets",
      },
      {
        id: "general",
        name: "General Merchandise",
        description: "Discount and general merchandise stores",
      },
      {
        id: "specialty",
        name: "Specialty Retail",
        description: "Specialty and niche retailers",
      },
    ],
  },
  {
    id: "home-services",
    name: "Home Services",
    subcategories: [
      {
        id: "plumbers",
        name: "Plumbers",
        description: "Plumbing repairs and installations",
      },
      {
        id: "electricians",
        name: "Electricians",
        description: "Electrical work and repairs",
      },
      {
        id: "handymen",
        name: "Handymen",
        description: "General home repairs and maintenance",
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    subcategories: [
      {
        id: "housing-agency",
        name: "Housing & Relocation Agencies",
        description: "Off-base housing search and military relocation assistance",
      },
      {
        id: "property-management",
        name: "Property Management",
        description: "Property management services",
      },
      {
        id: "temporary-lodging",
        name: "Temporary Lodging",
        description: "Short-term furnished housing for PCS moves",
      },
      {
        id: "housing-referral",
        name: "Housing Referral Services",
        description: "Official base housing referral contractors",
      },
    ],
  },
  {
    id: "legal-business",
    name: "Legal Services",
    subcategories: [
      {
        id: "sofa-lawyers",
        name: "SOFA Status Lawyers",
        description: "Legal experts in SOFA regulations",
      },
      {
        id: "military-defense",
        name: "Military Defense Attorneys",
        description: "Court-martial and UCMJ defense counsel",
      },
      {
        id: "on-base-legal",
        name: "On-Base Legal Assistance",
        description: "Free legal services provided through the military legal assistance office",
      },
      {
        id: "immigration",
        name: "Immigration Lawyers",
        description: "Visa and immigration legal services",
      },
      {
        id: "tax-advisors",
        name: "Tax Advisors",
        description: "US and German tax preparation",
      },
      {
        id: "accountants",
        name: "Accountants",
        description: "Accounting and bookkeeping services",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    subcategories: [
      {
        id: "dodea-schools",
        name: "DoDEA Schools",
        description: "Department of Defense Education Activity schools for military dependents",
      },
      {
        id: "international-schools",
        name: "International Schools",
        description: "English-language schools and curricula",
      },
      {
        id: "private-schools",
        name: "Private Schools",
        description: "Private and parochial schools",
      },
      {
        id: "tutors",
        name: "Tutors",
        description: "Private tutoring services",
      },
    ],
  },
  {
    id: "hbb",
    name: "Home Based Businesses",
    subcategories: [
      {
        id: "baking-catering",
        name: "Baking & Catering",
        description: "Home-based bakers and catering services",
      },
      {
        id: "handmade-crafts",
        name: "Handmade Crafts",
        description: "Artisan crafts and handmade goods",
      },
      {
        id: "tutoring-lessons",
        name: "Tutoring & Lessons",
        description: "Private tutors and lesson providers",
      },
      {
        id: "pet-services",
        name: "Pet Services",
        description: "Pet care, grooming, and training services",
      },
      {
        id: "photography",
        name: "Photography",
        description: "Professional photography services",
      },
      {
        id: "event-planning",
        name: "Event Planning",
        description: "Event planning and coordination services",
      },
      {
        id: "fitness-wellness",
        name: "Fitness & Wellness",
        description: "Personal trainers, yoga instructors, and wellness coaches",
      },
      {
        id: "home-decor",
        name: "Home Decor",
        description: "Home decoration and interior design services",
      },
      {
        id: "jewelry-accessories",
        name: "Jewelry & Accessories",
        description: "Handmade jewelry and fashion accessories",
      },
      {
        id: "custom-clothing",
        name: "Custom Clothing",
        description: "Tailoring and custom clothing services",
      },
    ],
  },
];

export function getCategoryStructure(categoryId: string): CategoryStructure | undefined {
  return CATEGORY_STRUCTURE.find((cat) => cat.id === categoryId);
}

export function getSubcategory(categoryId: string, subcategoryId: string): Subcategory | undefined {
  const category = getCategoryStructure(categoryId);
  return category?.subcategories.find((sub) => sub.id === subcategoryId);
}