import {
  Bus,
  Hotel,
  Languages,
  PiggyBank,
  Plane,
  Handshake,
} from "lucide-react";

export const features = [
  {
    title: "Transportation Made Simple",
    description:
      "Step-by-step guides for trains, buses, flights, and car rentals across Europe.",
    icon: Bus,
    link: "/transportation",
  },
  {
    title: "Accommodation Assistance",
    description:
      "Find the best hotels, hostels, and apartments near must-see attractions.",
    icon: Hotel,
    link: "/accommodation",
  },
  {
    title: "English-Speaking Services",
    description:
      "Directory of English-speaking doctors, lawyers, and businesses in major cities.",
    icon: Handshake,
    link: "/services",
  },
  {
    title: "Essential German Phrases",
    description:
      "Learn key German phrases with pronunciation to make your travels smoother.",
    icon: Languages,
    link: "/phrases",
  },
  {
    title: "Budgeting & Payments",
    description:
      "Understand banking, currency conversion, and digital payments across Europe.",
    icon: PiggyBank,
    link: "/budgeting",
  },
  {
    title: "Cultural Etiquette",
    description:
      "Do’s and don’ts when traveling or living in Europe — blend in like a local.",
    icon: Plane,
    link: "/etiquette",
  },
];
