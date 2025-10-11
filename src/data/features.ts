import {
  Bus,
  Hotel,
  Handshake,
  Languages,
  PiggyBank,
  Plane,
} from "lucide-react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image?: string;
  articlePath: string;
  content?: string; // ✅ add this line
}

export const features: Feature[] = [
  {
    id: "transportation",
    title: "Transportation",
    description:
      "Navigate Europe's cities with ease — from buses and trains to local travel apps.",
    icon: Bus,
    articlePath: "/data/content/transportation.md",
    content: "Learn how to get around Europe easily using public transport.",
  },
  {
    id: "accommodations",
    title: "Accommodations",
    description:
      "Learn how to find the best short- and long-term stays across Europe.",
    icon: Hotel,
    articlePath: "/data/content/accommodations.md",
    content: "Find tips for booking affordable and safe accommodations.",
  },
  {
    id: "services",
    title: "Essential Services",
    description:
      "Settle in with utilities, internet, healthcare, and everyday essentials.",
    icon: Handshake,
    articlePath: "/data/content/services.md",
    content: "Get started with setting up your utilities and healthcare.",
  },
  {
    id: "phrases",
    title: "Useful Phrases",
    description:
      "Master must-know expressions to communicate confidently wherever you go.",
    icon: Languages,
    articlePath: "/data/content/phrases.md",
    content: "Learn essential German and French phrases for daily life.",
  },
  {
    id: "budgeting",
    title: "Budgeting & Costs",
    description:
      "Plan your finances and understand the real cost of living in Europe.",
    icon: PiggyBank,
    articlePath: "/data/content/budgeting.md",
    content: "Discover how to budget effectively for your move to Europe.",
  },
  {
    id: "etiquette",
    title: "Culture & Etiquette",
    description:
      "Get to know European customs, greetings, and social norms to blend in easily.",
    icon: Plane,
    articlePath: "/data/content/etiquette.md",
    content: "Understand cultural norms and social etiquette across Europe.",
  },
];
