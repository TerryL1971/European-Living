import {
  Bus,
  Hotel,
  Handshake,
  Languages,
  PiggyBank,
  Plane,
} from "lucide-react";

// Define the Feature type to keep TypeScript strict and ESLint happy
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image?: string;
  articlePath: string;
}

// Export all feature data
export const features: Feature[] = [
  {
    id: "transportation",
    title: "Transportation",
    description:
      "Navigate Europe's cities with ease — from buses and trains to local travel apps.",
    icon: Bus,
    articlePath: "/data/content/transportation.md",
  },
  {
    id: "accommodations",
    title: "Accommodations",
    description:
      "Learn how to find the best short- and long-term stays across Europe.",
    icon: Hotel,
    articlePath: "/data/content/accommodations.md",
  },
  {
    id: "services",
    title: "Essential Services",
    description:
      "Settle in with utilities, internet, healthcare, and everyday essentials.",
    icon: Handshake,
    articlePath: "/data/content/services.md",
  },
  {
    id: "phrases",
    title: "Useful Phrases",
    description:
      "Master must-know expressions to communicate confidently wherever you go.",
    icon: Languages,
    articlePath: "/data/content/phrases.md",
  },
  {
    id: "budgeting",
    title: "Budgeting & Costs",
    description:
      "Plan your finances and understand the real cost of living in Europe.",
    icon: PiggyBank,
    articlePath: "/data/content/budgeting.md",
  },
  {
    id: "etiquette",
    title: "Culture & Etiquette",
    description:
      "Get to know European customs, greetings, and social norms to blend in easily.",
    icon: Plane,
    articlePath: "/data/content/etiquette.md",
  },
];
