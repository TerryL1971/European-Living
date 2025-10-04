// src/data/destinations.ts
export interface Destination {
  id: string;
  name: string;
  shortName?: string; // e.g. "Berlin"
  country?: string;
  description: string;
  image: string; // direct image URL or /destinations/xxx.jpg
  bestTime?: string;
  travelTips?: string[];
}

export const destinations: Destination[] = [
  {
    id: "berlin",
    name: "Berlin, Germany",
    shortName: "Berlin",
    country: "Germany",
    description: "A dynamic capital of history, art, and nightlife — very English friendly with great trains.",
    image: "https://images.unsplash.com/photo-1543349686-45b5b7fdb0c6?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–September",
    travelTips: ["Use regional trains (Deutsche Bahn) and Berlin ABC tickets for zones."]
  },
  {
    id: "munich",
    name: "Munich, Germany",
    shortName: "Munich",
    country: "Germany",
    description: "Bavarian charm, great beer halls, easy rail access to castles and Alps.",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–October",
    travelTips: ["Buy Bayern tickets for cheap regional day travel."]
  },
  {
    id: "paris",
    name: "Paris, France",
    shortName: "Paris",
    country: "France",
    description: "Iconic museums, food, and romantic streets — more crowded but manageable by metro.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    bestTime: "April–June & Sep–Oct",
    travelTips: ["Reserve major museum times in advance (Louvre)."]
  },
  {
    id: "amsterdam",
    name: "Amsterdam, Netherlands",
    shortName: "Amsterdam",
    country: "Netherlands",
    description: "Canals, biking culture, compact and very English-friendly.",
    image: "https://images.unsplash.com/photo-1505765057195-8f6d511c9ecb?auto=format&fit=crop&w=1600&q=80",
    bestTime: "April–September",
    travelTips: ["Avoid city-center car travel — use trains and trams."]
  },
  {
    id: "rome",
    name: "Rome, Italy",
    shortName: "Rome",
    country: "Italy",
    description: "Millennia of history and perfect gelato — move between sites on foot or metro.",
    image: "https://images.unsplash.com/photo-1549893079-2f44942ed9cc?auto=format&fit=crop&w=1600&q=80",
    bestTime: "April–June & Sep–Oct",
    travelTips: ["Book Colosseum and Vatican early morning slots to avoid heat."]
  },
  {
    id: "barcelona",
    name: "Barcelona, Spain",
    shortName: "Barcelona",
    country: "Spain",
    description: "Gaudí, beaches, and lively tapas culture — mostly walkable with good metro.",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–June & Sep–Oct",
    travelTips: ["Watch your belongings in busy tourist zones."]
  },
  {
    id: "vienna",
    name: "Vienna, Austria",
    shortName: "Vienna",
    country: "Austria",
    description: "Imperial architecture, classical music and very reliable public transport.",
    image: "https://images.unsplash.com/photo-1505765057195-8f6d511c9ecb?auto=format&fit=crop&w=1600&q=80",
    bestTime: "Apr–Jun & Sep–Oct",
    travelTips: ["Trams and U-Bahn are frequent; get a day pass for heavy touring."]
  },
  {
    id: "prague",
    name: "Prague, Czech Republic",
    shortName: "Prague",
    country: "Czech Republic",
    description: "Fairytale streets, bridges, and castles — very walkable and affordable.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1600&q=80",
    bestTime: "Apr–Jun & Sep–Oct",
    travelTips: ["Stick to official taxis or rideshares after late nights."]
  },
  {
    id: "lisbon",
    name: "Lisbon, Portugal",
    shortName: "Lisbon",
    country: "Portugal",
    description: "Hilly streets, great coastal day trips, and charming neighborhoods.",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80",
    bestTime: "Mar–Jun & Sep–Oct",
    travelTips: ["Bring good walking shoes for hills — trams help but get crowded."]
  },
  {
    id: "budapest",
    name: "Budapest, Hungary",
    shortName: "Budapest",
    country: "Hungary",
    description: "Thermal baths, river views and grand architecture — relaxed vibe and lower cost.",
    image: "https://images.unsplash.com/photo-1505765057195-8f6d511c9ecb?auto=format&fit=crop&w=1600&q=80",
    bestTime: "Apr–Jun & Sep–Oct",
    travelTips: ["Try a thermal bath visit during less-crowded hours."]
  },
  {
    id: "london",
    name: "London, United Kingdom",
    shortName: "London",
    country: "United Kingdom",
    description: "Huge and diverse — plan neighborhoods (Westminster, South Bank, Soho) individually.",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–Sep",
    travelTips: ["Get an Oyster/Contactless card for easy transport."]
  },
  {
    id: "zagreb",
    name: "Zagreb, Croatia",
    shortName: "Zagreb",
    country: "Croatia",
    description: "A calm, underrated European capital — useful as a base for nearby parks and coastlines.",
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–Sep",
    travelTips: ["Great value and fewer crowds than more famous capitals."]
  }
];
