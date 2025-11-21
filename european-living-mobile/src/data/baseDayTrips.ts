// src/data/baseDayTrips.ts

export interface DayTrip {
  id: string;
  name: string;
  distance: string;
  driveTime: string;
  trainTime?: string;
  description: string;
  bestFor: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  cost: '$' | '$$' | '$$$';
  imageUrl?: string;
}

export interface BaseDayTrips {
  baseId: string;
  baseName: string;
  trips: DayTrip[];
}

export const DAY_TRIPS: BaseDayTrips[] = [
  {
    baseId: 'ramstein',
    baseName: 'Ramstein Air Base',
    trips: [
      {
        id: 'heidelberg-ramstein',
        name: 'Heidelberg',
        distance: '115 km',
        driveTime: '1h 15min',
        trainTime: '1h 30min',
        description: 'Romantic university town with a stunning castle, charming old town, and the famous Philosopher\'s Walk',
        bestFor: ['History', 'Photography', 'Romantic', 'Family'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'trier-ramstein',
        name: 'Trier',
        distance: '85 km',
        driveTime: '1h',
        trainTime: '1h 15min',
        description: 'Germany\'s oldest city with Roman ruins, including Porta Nigra and ancient baths',
        bestFor: ['History', 'Architecture', 'Roman History'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'luxembourg-ramstein',
        name: 'Luxembourg City',
        distance: '150 km',
        driveTime: '1h 30min',
        trainTime: '2h',
        description: 'Stunning capital city built on dramatic cliffs with medieval fortifications and modern EU institutions',
        bestFor: ['Architecture', 'City Break', 'International', 'Photography'],
        difficulty: 'Moderate',
        cost: '$$$'
      },
      {
        id: 'strasbourg-ramstein',
        name: 'Strasbourg, France',
        distance: '140 km',
        driveTime: '1h 30min',
        trainTime: '2h',
        description: 'Beautiful French-German border city with stunning cathedral, La Petite France district, and excellent food',
        bestFor: ['Food', 'Architecture', 'Culture', 'International'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'rhine-valley-ramstein',
        name: 'Rhine Valley Wine Tour',
        distance: '80 km',
        driveTime: '1h',
        description: 'Scenic drive through Germany\'s wine country with medieval castles, vineyards, and wine tasting',
        bestFor: ['Wine', 'Scenic', 'Relaxation', 'Couples'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'black-forest-ramstein',
        name: 'Black Forest',
        distance: '180 km',
        driveTime: '2h',
        description: 'Dense forests, cuckoo clocks, and fairy-tale villages in Germany\'s famous forest region',
        bestFor: ['Nature', 'Hiking', 'Scenic', 'Family'],
        difficulty: 'Moderate',
        cost: '$$'
      },
      {
        id: 'cochem-ramstein',
        name: 'Cochem & Mosel Valley',
        distance: '100 km',
        driveTime: '1h 15min',
        trainTime: '1h 45min',
        description: 'Charming medieval town on the Mosel River with castle, vineyards, and river cruises',
        bestFor: ['Scenic', 'Wine', 'Small Town', 'Photography'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'saarbrucken-ramstein',
        name: 'Saarbrücken',
        distance: '70 km',
        driveTime: '50min',
        trainTime: '1h',
        description: 'French-influenced German city near the border with good shopping and cafés',
        bestFor: ['Shopping', 'City Break', 'Food'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'volklingen-ramstein',
        name: 'Völklingen Ironworks',
        distance: '75 km',
        driveTime: '55min',
        description: 'UNESCO World Heritage industrial complex - fascinating for history buffs',
        bestFor: ['History', 'Unique', 'Photography'],
        difficulty: 'Easy',
        cost: '$'
      },
      {
        id: 'europa-park-ramstein',
        name: 'Europa Park',
        distance: '180 km',
        driveTime: '2h',
        description: 'Germany\'s largest theme park with roller coasters and themed European areas',
        bestFor: ['Family', 'Thrills', 'Entertainment'],
        difficulty: 'Easy',
        cost: '$$$'
      }
    ]
  },
  {
    baseId: 'stuttgart',
    baseName: 'USAG Stuttgart',
    trips: [
      {
        id: 'heidelberg-stuttgart',
        name: 'Heidelberg',
        distance: '95 km',
        driveTime: '1h',
        trainTime: '45min',
        description: 'Romantic university town with stunning castle and charming old town',
        bestFor: ['History', 'Photography', 'Romantic', 'Family'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'black-forest-stuttgart',
        name: 'Black Forest',
        distance: '60 km',
        driveTime: '50min',
        description: 'Dense forests, cuckoo clocks, and fairy-tale villages',
        bestFor: ['Nature', 'Hiking', 'Scenic', 'Family'],
        difficulty: 'Moderate',
        cost: '$$'
      },
      {
        id: 'tubingen-stuttgart',
        name: 'Tübingen',
        distance: '50 km',
        driveTime: '45min',
        trainTime: '1h',
        description: 'Picturesque university town with colorful medieval buildings along the Neckar River',
        bestFor: ['Small Town', 'Architecture', 'Scenic', 'Day Trip'],
        difficulty: 'Easy',
        cost: '$'
      },
      {
        id: 'hohenzollern-stuttgart',
        name: 'Hohenzollern Castle',
        distance: '70 km',
        driveTime: '1h',
        description: 'Fairytale castle perched on a mountain top with panoramic views',
        bestFor: ['History', 'Photography', 'Scenic', 'Family'],
        difficulty: 'Moderate',
        cost: '$$'
      },
      {
        id: 'bodensee-stuttgart',
        name: 'Lake Constance (Bodensee)',
        distance: '160 km',
        driveTime: '1h 45min',
        trainTime: '2h 30min',
        description: 'Massive lake bordering Germany, Austria, and Switzerland with beaches and water activities',
        bestFor: ['Beach', 'Swimming', 'Scenic', 'Family', 'International'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'rothenburg-stuttgart',
        name: 'Rothenburg ob der Tauber',
        distance: '150 km',
        driveTime: '1h 45min',
        description: 'Perfectly preserved medieval town - looks like a fairy tale',
        bestFor: ['Medieval', 'Photography', 'Small Town', 'Family'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'strasbourg-stuttgart',
        name: 'Strasbourg, France',
        distance: '150 km',
        driveTime: '1h 40min',
        trainTime: '2h 15min',
        description: 'Beautiful French city with Gothic cathedral and La Petite France',
        bestFor: ['International', 'Food', 'Architecture', 'Culture'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'ulm-stuttgart',
        name: 'Ulm',
        distance: '90 km',
        driveTime: '1h',
        trainTime: '1h',
        description: 'City with the tallest church steeple in the world and Einstein\'s birthplace',
        bestFor: ['Architecture', 'History', 'City Break'],
        difficulty: 'Easy',
        cost: '$'
      },
      {
        id: 'ludwigsburg-stuttgart',
        name: 'Ludwigsburg Palace',
        distance: '15 km',
        driveTime: '20min',
        trainTime: '15min',
        description: 'Baroque palace with massive gardens - Germany\'s largest baroque palace',
        bestFor: ['History', 'Architecture', 'Gardens', 'Easy Day Trip'],
        difficulty: 'Easy',
        cost: '$'
      },
      {
        id: 'maulbronn-stuttgart',
        name: 'Maulbronn Monastery',
        distance: '50 km',
        driveTime: '45min',
        description: 'UNESCO World Heritage medieval monastery complex',
        bestFor: ['History', 'Architecture', 'Peaceful', 'Photography'],
        difficulty: 'Easy',
        cost: '$'
      }
    ]
  },
  {
    baseId: 'kaiserslautern',
    baseName: 'Kaiserslautern Military Community',
    trips: [
      // Similar to Ramstein since they're close
      {
        id: 'heidelberg-kl',
        name: 'Heidelberg',
        distance: '100 km',
        driveTime: '1h 10min',
        trainTime: '1h 30min',
        description: 'Romantic university town with stunning castle',
        bestFor: ['History', 'Photography', 'Romantic'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'trier-kl',
        name: 'Trier',
        distance: '90 km',
        driveTime: '1h 5min',
        trainTime: '1h 20min',
        description: 'Germany\'s oldest city with Roman ruins',
        bestFor: ['History', 'Architecture', 'Roman History'],
        difficulty: 'Easy',
        cost: '$$'
      },
      // Add 8 more similar to Ramstein list
    ]
  },
  {
    baseId: 'wiesbaden',
    baseName: 'USAG Wiesbaden',
    trips: [
      {
        id: 'heidelberg-wiesbaden',
        name: 'Heidelberg',
        distance: '85 km',
        driveTime: '1h',
        trainTime: '1h',
        description: 'Romantic castle town on the Neckar River',
        bestFor: ['History', 'Photography', 'Romantic'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'rhine-gorge-wiesbaden',
        name: 'Rhine Gorge (St. Goar)',
        distance: '70 km',
        driveTime: '1h',
        trainTime: '1h 15min',
        description: 'Dramatic Rhine Valley with Loreley Rock and medieval castles',
        bestFor: ['Scenic', 'Castles', 'River Cruise', 'Wine'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'rothenburg-wiesbaden',
        name: 'Rothenburg ob der Tauber',
        distance: '160 km',
        driveTime: '2h',
        description: 'Best-preserved medieval town in Germany',
        bestFor: ['Medieval', 'Photography', 'Small Town'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'cologne-wiesbaden',
        name: 'Cologne',
        distance: '180 km',
        driveTime: '2h',
        trainTime: '1h 30min',
        description: 'Gothic cathedral, Rhine River, and vibrant city life',
        bestFor: ['City Break', 'History', 'Cathedral', 'Nightlife'],
        difficulty: 'Easy',
        cost: '$$'
      },
      // Add 6 more
    ]
  },
  {
    baseId: 'grafenwoehr',
    baseName: 'USAG Bavaria (Grafenwöhr)',
    trips: [
      {
        id: 'nuremberg-graf',
        name: 'Nuremberg',
        distance: '80 km',
        driveTime: '1h',
        trainTime: '1h 15min',
        description: 'Medieval city with castle, WWII history, and famous Christmas market',
        bestFor: ['History', 'WWII', 'City Break', 'Family'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'regensburg-graf',
        name: 'Regensburg',
        distance: '100 km',
        driveTime: '1h 15min',
        trainTime: '1h 30min',
        description: 'UNESCO medieval city on the Danube with stone bridge and cathedral',
        bestFor: ['Medieval', 'Architecture', 'Small City', 'Danube'],
        difficulty: 'Easy',
        cost: '$$'
      },
      {
        id: 'prague-graf',
        name: 'Prague, Czech Republic',
        distance: '240 km',
        driveTime: '2h 30min',
        trainTime: '4h',
        description: 'Stunning capital with castle, Charles Bridge, and beautiful old town',
        bestFor: ['International', 'City Break', 'Architecture', 'Budget-Friendly'],
        difficulty: 'Moderate',
        cost: '$$'
      },
      {
        id: 'rothenburg-graf',
        name: 'Rothenburg ob der Tauber',
        distance: '140 km',
        driveTime: '1h 45min',
        description: 'Picture-perfect medieval walled town',
        bestFor: ['Medieval', 'Photography', 'Family'],
        difficulty: 'Easy',
        cost: '$$'
      },
      // Add 6 more
    ]
  },
  {
    baseId: 'spangdahlem',
    baseName: 'Spangdahlem Air Base',
    trips: [
      {
        id: 'trier-spang',
        name: 'Trier',
        distance: '40 km',
        driveTime: '35min',
        trainTime: '45min',
        description: 'Germany\'s oldest city with Roman Porta Nigra and amphitheater',
        bestFor: ['History', 'Roman', 'Architecture', 'Easy'],
        difficulty: 'Easy',
        cost: '$'
      },
      {
        id: 'luxembourg-spang',
        name: 'Luxembourg City',
        distance: '75 km',
        driveTime: '50min',
        trainTime: '1h 15min',
        description: 'Dramatic cliffside capital city with medieval fortifications',
        bestFor: ['International', 'Architecture', 'City Break'],
        difficulty: 'Easy',
        cost: '$$$'
      },
      {
        id: 'cochem-spang',
        name: 'Cochem',
        distance: '70 km',
        driveTime: '1h',
        trainTime: '1h',
        description: 'Fairytale town on the Mosel River with castle and vineyards',
        bestFor: ['Scenic', 'Small Town', 'Wine', 'Castle'],
        difficulty: 'Easy',
        cost: '$$'
      },
      // Add 7 more
    ]
  }
];

// Helper function to get trips for a specific base
export function getDayTripsForBase(baseId: string): DayTrip[] {
  const baseTrips = DAY_TRIPS.find(b => b.baseId === baseId);
  return baseTrips?.trips || [];
}

// Helper to get base name
export function getBaseName(baseId: string): string {
  const base = DAY_TRIPS.find(b => b.baseId === baseId);
  return base?.baseName || 'Unknown Base';
}