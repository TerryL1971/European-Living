import {
  Bus,
  Hotel,
  Handshake,
  Languages,
  PiggyBank,
  Plane,
} from "lucide-react";

export const features = [
  {
    id: "transportation",
    title: "Transportation Made Simple",
    description: "Step-by-step guides for trains, buses, flights, and car rentals across Europe.",
    icon: Bus,
  },
  {
    id: "accommodations", // Match your .md filename
    title: "Accommodation Assistance",
    description: "Find the best hotels, hostels, and apartments near must-see attractions.",
    icon: Hotel,
  },
  {
    id: "services",
    title: "English-Speaking Services",
    description: "Directory of English-speaking doctors, lawyers, and businesses in major cities.",
    icon: Handshake,
  },
  {
    id: "phrases", // This links to phrases.md
    title: "Essential German Phrases",
    description: "Learn key German phrases with pronunciation to make your travels smoother.",
    icon: Languages,
  },
  {
    id: "budgeting",
    title: "Budgeting & Payments",
    description: "Understand banking, currency conversion, and digital payments across Europe.",
    icon: PiggyBank,
  },
  {
    id: "etiquette",
    title: "Cultural Etiquette",
    description: "Do's and don'ts when traveling or living in Europe — blend in like a local.",
    icon: Plane,
  },
];