// src/data/subcategories.ts

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
        id: "inspection-stations",
        name: "Inspection Stations (TÜV)",
        description: "Official vehicle inspection and TÜV services",
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
        description: "Specialized medical care (cardiology, dermatology, etc.)",
      },
      {
        id: "pharmacies",
        name: "Pharmacies",
        description: "Prescription medications and health supplies",
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
        id: "grocery",
        name: "Grocery Stores",
        description: "Supermarkets and food shopping",
      },
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
        id: "rental-agents",
        name: "Rental Agents",
        description: "Off-base housing rental assistance",
      },
      {
        id: "property-management",
        name: "Property Management",
        description: "Property management services",
      },
    ],
  },
  {
    id: "legal",
    name: "Legal Services",
    subcategories: [
      {
        id: "sofa-lawyers",
        name: "SOFA Status Lawyers",
        description: "Legal experts in SOFA regulations",
      },
      {
        id: "immigration",
        name: "Immigration Lawyers",
        description: "Visa and immigration legal services",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    subcategories: [
      {
        id: "international-schools",
        name: "International Schools",
        description: "English-language schools and curricula",
      },
      {
        id: "tutors",
        name: "Tutors",
        description: "Private tutoring services",
      },
    ],
  },
  {
    id: "business",
    name: "Business Services",
    subcategories: [
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
];

export function getCategoryStructure(categoryId: string): CategoryStructure | undefined {
  return CATEGORY_STRUCTURE.find((cat) => cat.id === categoryId);
}

export function getSubcategory(categoryId: string, subcategoryId: string): Subcategory | undefined {
  const category = getCategoryStructure(categoryId);
  return category?.subcategories.find((sub) => sub.id === subcategoryId);
}