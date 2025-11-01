// src/data/destinations.ts

// Supabase Storage base URL for images
const SUPABASE_STORAGE_URL = 'https://pkacbccohrygpyapgtzpq.supabase.co/storage/v1/object/public/images';

export interface Destination {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  description: string;
  image: string;
  contentFile?: string; // deprecated - now using Supabase articles
  lat?: number;
  lng?: number;
  travelTips?: string[];
}

export const destinations: Destination[] = [
  {
    id: "stuttgart",
    name: "Stuttgart",
    shortName: "Stuttgart",
    country: "Germany",
    description: "Mercedes-Benz and Porsche museums, vineyards, and Swabian culture in Baden-Württemberg.",
    image: `${SUPABASE_STORAGE_URL}/stuttgart-schlossplatz.jpg`,
    contentFile: "stuttgart",
    lat: 48.7758,
    lng: 9.1829,
    travelTips: [
      "Park under the LB/BW bank near Hauptbahnhof for easy access to everything.",
      "Don't miss Stuttgart's Spring Festival (Frühlingsfest) — it rivals Oktoberfest!"
    ],
  },
  {
    id: "berlin",
    name: "Berlin",
    shortName: "Berlin",
    country: "Germany",
    description: "The vibrant capital of Germany, rich with history and culture.",
    image: `${SUPABASE_STORAGE_URL}/berlin.jpg`,
    contentFile: "berlin",
    lat: 52.52,
    lng: 13.405,
    travelTips: [
      "Buy a day pass for BVG to use buses, trams and U-Bahn.",
      "Book museum tickets online weeks ahead — Pergamon and others sell out fast."
    ],
  },
  {
    id: "munich",
    name: "Munich",
    shortName: "Munich",
    country: "Germany",
    description: "Bavarian charm with easy train connections and English-friendly atmosphere.",
    image: `${SUPABASE_STORAGE_URL}/munich.jpg`,
    contentFile: "munich",
    lat: 48.1351,
    lng: 11.5820,
    travelTips: [
      "Visit beer halls and try Weißwurst before noon — it's tradition!",
      "Book Oktoberfest accommodation months in advance if visiting in fall."
    ],
  },
  {
    id: "paris",
    name: "Paris",
    shortName: "Paris",
    country: "France",
    description: "City of Light — museums, cafés, and iconic architecture.",
    image: `${SUPABASE_STORAGE_URL}/paris.jpg`,
    contentFile: "paris",
    lat: 48.8566,
    lng: 2.3522,
    travelTips: [
      "Book Louvre and Eiffel Tower tickets weeks in advance to skip massive lines.",
      "Always say 'Bonjour' when entering shops — it's considered rude not to."
    ],
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    shortName: "Amsterdam",
    country: "Netherlands",
    description: "Picturesque canals and world-class museums with excellent English support.",
    image: `${SUPABASE_STORAGE_URL}/amsterdam.jpg`,
    contentFile: "amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    travelTips: [
      "Book Anne Frank House tickets exactly 6 weeks in advance — they sell out in minutes.",
      "Never walk in bike lanes (red pavement) — bikes have absolute right of way!"
    ],
  },
  {
    id: "london",
    name: "London",
    shortName: "London",
    country: "United Kingdom",
    description: "Royal palaces, world-class museums, and 2,000 years of history.",
    image: `${SUPABASE_STORAGE_URL}/london-city.jpg`,
    contentFile: "london",
    lat: 51.5074,
    lng: -0.1278,
    travelTips: [
      "Get an Oyster card or use contactless — it's much cheaper than paper tickets.",
      "Major museums are FREE (British Museum, National Gallery, V&A) — huge money saver!"
    ],
  },
  {
    id: "prague",
    name: "Prague",
    shortName: "Prague",
    country: "Czech Republic",
    description: "Fairy-tale architecture, historic squares, and budget-friendly prices.",
    image: `${SUPABASE_STORAGE_URL}/prague.jpg`,
    contentFile: "prague",
    lat: 50.0755,
    lng: 14.4378,
    travelTips: [
      "Beer is cheaper than water — seriously! Enjoy Prague's incredible beer culture.",
      "Walk Charles Bridge at sunrise to avoid massive crowds."
    ],
  },
  {
    id: "vienna",
    name: "Vienna",
    shortName: "Vienna",
    country: "Austria",
    description: "Imperial elegance with music, coffee houses, and palaces.",
    image: `${SUPABASE_STORAGE_URL}/vienna.jpg`,
    contentFile: "vienna",
    lat: 48.2082,
    lng: 16.3738,
    travelTips: [
      "Book Schönbrunn Palace tickets online to skip long lines.",
      "Experience a traditional coffee house — sit as long as you want, it's part of the culture."
    ],
  },
  {
    id: "rome",
    name: "Rome",
    shortName: "Rome",
    country: "Italy",
    description: "Ancient ruins, vibrant piazzas, and unforgettable food.",
    image: `${SUPABASE_STORAGE_URL}/rome.jpg`,
    contentFile: "rome",
    lat: 41.9028,
    lng: 12.4964,
    travelTips: [
      "Book Colosseum and Vatican tickets weeks ahead — lines can be 3+ hours!",
      "Cover shoulders and knees for churches — dress code is strictly enforced."
    ],
  },
  {
    id: "barcelona",
    name: "Barcelona",
    shortName: "Barcelona",
    country: "Spain",
    description: "Gaudí architecture, beaches, and tapas culture.",
    image: `${SUPABASE_STORAGE_URL}/barcelona.jpg`,
    contentFile: "barcelona",
    lat: 41.3851,
    lng: 2.1734,
    travelTips: [
      "Book Sagrada Família tickets weeks in advance — it's Barcelona's #1 attraction.",
      "Watch for pickpockets on La Rambla and in the Metro — they target tourists."
    ],
  },
  {
    id: "lisbon",
    name: "Lisbon",
    shortName: "Lisbon",
    country: "Portugal",
    description: "Hilly streets, trams, and seafood by the Tagus.",
    image: `${SUPABASE_STORAGE_URL}/lisbon.jpg`,
    contentFile: "lisbon",
    lat: 38.7223,
    lng: -9.1393,
    travelTips: [
      "Ride Tram 28 early morning to avoid tourist crowds.",
      "Wear very comfortable shoes — Lisbon is built on seven hills with steep cobblestones!"
    ],
  },
  {
    id: "budapest",
    name: "Budapest",
    shortName: "Budapest",
    country: "Hungary",
    description: "Thermal baths, riverside views, and historic architecture.",
    image: `${SUPABASE_STORAGE_URL}/budapest.jpg`,
    contentFile: "budapest",
    lat: 47.4979,
    lng: 19.0402,
    travelTips: [
      "Visit Széchenyi thermal baths — it's an essential Budapest experience!",
      "Explore ruin bars in the Jewish Quarter — unique nightlife you won't find elsewhere."
    ],
  },
];