// src/data/destinations.ts
export interface Destination {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  description: string;
  image: string;       // path in public/images/...
  contentFile?: string; // markdown filename in src/data/content/, e.g. "berlin"
  lat?: number;
  lng?: number;
  travelTips?: string[];
};

export const destinations: Destination[] = [
  {
  id: "stuttgart",
  name: "Stuttgart",
  shortName: "Stuttgart",
  country: "Germany",
  description: "Mercedes-Benz and Porsche museums, vineyards, and Swabian culture in Baden-Württemberg.",
  image: "/images/stuttgart-schlossplatz.jpg",
  contentFile: "stuttgart",
  lat: 48.7758,
  lng: 9.1829,  
  },
  {
    id: "berlin",
    name: "Berlin",
    shortName: "Berlin",
    country: "Germany",
    description: "The vibrant capital of Germany, rich with history and culture.",
    image: "/images/berlin.jpg",
    contentFile: "berlin",
    lat: 52.52,
    lng: 13.405,
    travelTips: [
      "Buy a day pass for BVG to use buses, trams and U-Bahn.",
      "Try Döner kebab and currywurst — local favorites."
    ],
  },
  {
    id: "munich",
    name: "Munich",
    shortName: "Munich",
    country: "Germany",
    description: "Bavarian charm with easy train connections and English-friendly atmosphere.",
    image: "/images/munich.jpg",
    contentFile: "munich",
    lat: 48.1351,
    lng: 11.5820,
  },
  {
    id: "paris",
    name: "Paris",
    shortName: "Paris",
    country: "France",
    description: "City of Light — museums, cafés, and iconic architecture.",
    image: "/images/paris.jpg",
    contentFile: "paris",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    shortName: "Amsterdam",
    country: "Netherlands",
    description: "Picturesque canals and world-class museums with excellent English support.",
    image: "/images/amsterdam.jpg",
    contentFile: "amsterdam",
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    id: "prague",
    name: "Prague",
    shortName: "Prague",
    country: "Czech Republic",
    description: "Fairy-tale architecture, historic squares, and budget-friendly prices.",
    image: "/images/prague.jpg",
    contentFile: "prague",
    lat: 50.0755,
    lng: 14.4378,
  },
  {
    id: "vienna",
    name: "Vienna",
    shortName: "Vienna",
    country: "Austria",
    description: "Imperial elegance with music, coffee houses, and palaces.",
    image: "/images/vienna.jpg",
    contentFile: "vienna.md",
    lat: 48.2082,
    lng: 16.3738,
  },
  {
    id: "rome",
    name: "Rome",
    shortName: "Rome",
    country: "Italy",
    description: "Ancient ruins, vibrant piazzas, and unforgettable food.",
    image: "/images/rome.jpg",
    contentFile: "rome",
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: "barcelona",
    name: "Barcelona",
    shortName: "Barcelona",
    country: "Spain",
    description: "Gaudí architecture, beaches, and tapas culture.",
    image: "/images/barcelona.jpg",
    contentFile: "barcelona",
    lat: 41.3851,
    lng: 2.1734,
  },
  {
    id: "lisbon",
    name: "Lisbon",
    shortName: "Lisbon",
    country: "Portugal",
    description: "Hilly streets, trams, and seafood by the Tagus.",
    image: "/images/lisbon.jpg",
    contentFile: "lisbon.",
    lat: 38.7223,
    lng: -9.1393,
  },
  {
    id: "budapest",
    name: "Budapest",
    shortName: "Budapest",
    country: "Hungary",
    description: "Thermal baths, riverside views, and historic architecture.",
    image: "/images/budapest.jpg",
    contentFile: "budapest",
    lat: 47.4979,
    lng: 19.0402,
  },
];
