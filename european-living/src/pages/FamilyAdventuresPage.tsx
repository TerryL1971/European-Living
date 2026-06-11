// src/pages/FamilyAdventuresPage.tsx
// Full Family Adventures page with base-specific resources
// and country-specific tourist highlights

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO, { BreadcrumbSchema } from '../components/SEO';

// ── Types ─────────────────────────────────────────────────────────────────
type AgeGroup = 'all' | 'toddler' | 'school' | 'teen';
type Country = 'uk' | 'italy' | 'spain';

// ── Data ──────────────────────────────────────────────────────────────────

const GERMANY_RESOURCES = [
  {
    base: 'USAG Stuttgart',
    emoji: '🏛️',
    items: [
      { name: 'LEGOLAND Deutschland', type: '🎢 Theme Park', ages: 'all', description: 'Günzburg, ~1.5hr from Stuttgart. A full day of LEGO fun for all ages.', link: 'https://www.legoland.de' },
      { name: 'Europa-Park', type: '🎢 Theme Park', ages: 'all', description: 'Germany\'s largest theme park in Rust. 2hr from Stuttgart. Incredible for families.', link: 'https://www.europapark.de' },
      { name: 'Wilhelma Zoo & Botanical Garden', type: '🦁 Zoo', ages: 'all', description: 'Stuttgart\'s world-class zoo. 11,000 animals, beautiful gardens. Kid favorite.', link: 'https://www.wilhelma.de' },
      { name: 'Schwaben Quelle', type: '🏊 Water Park', ages: 'school', description: 'Massive indoor/outdoor water park in Stuttgart. Great for all ages year-round.', link: 'https://www.schwaben-quellen.de' },
      { name: 'Hohenzollern Castle', type: '🏰 Castle', ages: 'school', description: 'Fairy-tale castle 1hr from Stuttgart. Kids love the knights\' armor and crown jewels.', link: 'https://www.burg-hohenzollern.com' },
      { name: 'Kinderbauernhof (Children\'s Farm)', type: '🌿 Nature', ages: 'toddler', description: 'Petting zoos and children\'s farms around Stuttgart. Great for toddlers.', link: null },
      { 
        name: 'The Used Car Guys', 
        type: '🚗 Car Dealership', 
        ages: 'all', 
        description: 'English-speaking used car dealership near Panzer gate. Specializes in helping military families find reliable vehicles quickly. Perfect for new PCS arrivals.', 
        link: 'https://www.usedcarguys.net' 
      },
    ],
  },
  {
    base: 'Ramstein / KMC',
    emoji: '✈️',
    items: [
      { name: 'Phantasialand', type: '🎢 Theme Park', ages: 'school', description: 'World-class theme park near Cologne. 1.5hr from Ramstein. Thrilling for older kids.', link: 'https://www.phantasialand.de' },
      { name: 'Heidelberg Castle & Old Town', type: '🏰 Castle', ages: 'all', description: '45min from Ramstein. Castle ruins, cable car, and charming old town kids love.', link: null },
      { name: 'Tropical Islands', type: '🏊 Water Park', ages: 'all', description: 'Indoor tropical paradise near Berlin. Worth the drive for a weekend trip.', link: 'https://www.tropical-islands.de' },
      { name: 'Kaiserslautern City Park', type: '🌿 Park', ages: 'toddler', description: 'Large park with playgrounds right in KMC. Perfect for young children.', link: null },
      { name: 'Ritterburg Lichtenberg', type: '🏰 Castle', ages: 'school', description: 'Medieval castle ruins 30min from Ramstein. Free entry, great for exploring.', link: null },
      { name: 'Nürburgring', type: '🏎️ Activity', ages: 'teen', description: 'Legendary race track with driving experiences for teens and car-obsessed kids.', link: 'https://www.nuerburgring.de' },
      { 
        name: 'The Used Car Guys — Stuttgart', 
        type: '🚗 Car Dealership', 
        ages: 'all', 
        description: 'English-speaking used car dealership near Panzer gate in Stuttgart. Worth the drive from any base — they specialize in helping military families find reliable vehicles fast.', 
        link: 'https://www.usedcarguys.net' 
      },
    ],
  },
  {
    base: 'USAG Grafenwöhr',
    emoji: '🏔️',
    items: [
      { name: 'LEGOLAND Deutschland', type: '🎢 Theme Park', ages: 'all', description: '1hr from Grafenwöhr. One of the best LEGOLAND parks in the world.', link: 'https://www.legoland.de' },
      { name: 'Neuschwanstein Castle', type: '🏰 Castle', ages: 'all', description: 'The real fairy-tale castle that inspired Disney. 2hr from Graf. Unmissable.', link: null },
      { name: 'Nuremberg Toy Museum', type: '🧸 Museum', ages: 'all', description: 'Nuremberg is the toy capital of the world. This museum is magical for kids.', link: 'https://www.spielzeugmuseum-nuernberg.de' },
      { name: 'Tierpark Nürnberg', type: '🦁 Zoo', ages: 'all', description: 'Nuremberg\'s excellent zoo. 45min from Graf. Full day activity.', link: 'https://www.tiergarten.nuernberg.de' },
      { name: 'Steinwald Nature Park', type: '🌿 Nature', ages: 'all', description: 'Beautiful hiking and nature exploration right near Grafenwöhr.', link: null },
      { name: 'Bayreuth Festspielhaus', type: '🎓 Culture', ages: 'teen', description: 'World-famous opera house. Great for teens interested in music and culture.', link: null },
    ],
  },
  {
    base: 'USAG Wiesbaden',
    emoji: '🏢',
    items: [
      { name: 'Frankfurt Zoo', type: '🦁 Zoo', ages: 'all', description: 'One of Germany\'s oldest and best zoos. 30min from Wiesbaden.', link: 'https://www.zoo-frankfurt.de' },
      { name: 'Opel Zoo', type: '🦁 Zoo', ages: 'all', description: 'Unique open-air zoo near Kronberg. Kids can get close to the animals.', link: 'https://www.opel-zoo.de' },
      { name: 'Neroberg Park & Cable Car', type: '🌿 Park', ages: 'all', description: 'Beautiful hilltop park with a historic cable car. Free in summer. Kids love it.', link: null },
      { name: 'Phantasialand', type: '🎢 Theme Park', ages: 'school', description: '1.5hr from Wiesbaden. One of Europe\'s best theme parks.', link: 'https://www.phantasialand.de' },
      { name: 'Rhine River Cruise', type: '🚢 Activity', ages: 'all', description: 'Day boat trips along the Rhine. Castles, vineyards, and villages from the water.', link: null },
      { name: 'Mainz Roman Museum', type: '🎓 Museum', ages: 'school', description: 'Kids love the Roman exhibits and interactive displays. Free for under 18.', link: null },
      { 
        name: 'The Used Car Guys — Stuttgart', 
        type: '🚗 Car Dealership', 
        ages: 'all', 
        description: 'English-speaking used car dealership near Panzer gate in Stuttgart. Worth the drive from any base — they specialize in helping military families find reliable vehicles fast.', 
        link: 'https://www.usedcarguys.net' 
      },
    ],
  },
  {
    base: 'Spangdahlem Air Base',
    emoji: '🛩️',
    items: [
      { name: 'Phantasialand', type: '🎢 Theme Park', ages: 'school', description: 'World-class theme park near Cologne. 1.5hr from Spangdahlem. Thrilling for older kids.', link: 'https://www.phantasialand.de' },
      { name: 'Cochem Castle', type: '🏰 Castle', ages: 'all', description: '45min from Spangdahlem on the Moselle River. Stunning medieval castle kids love exploring.', link: null },
      { name: 'Trier Roman Ruins', type: '🎓 Historic', ages: 'school', description: 'Germany\'s oldest city, 30min away. Roman amphitheater and Porta Nigra fascinate kids.', link: null },
      { name: 'Nürburgring', type: '🏎️ Activity', ages: 'teen', description: 'Legendary race track 1hr from Spangdahlem. Driving experiences for teens and car fans.', link: 'https://www.nuerburgring.de' },
      { name: 'Mosel River Bike Trail', type: '🌿 Nature', ages: 'school', description: 'Family cycling along the beautiful Moselle River. Flat, easy, and scenic for all ages.', link: null },
      { name: 'Bitburg City Park', type: '🌿 Park', ages: 'toddler', description: 'Playgrounds and green spaces right near base. Perfect for young children.', link: null },
      { 
        name: 'The Used Car Guys — Stuttgart', 
        type: '🚗 Car Dealership', 
        ages: 'all', 
        description: 'English-speaking used car dealership near Panzer gate in Stuttgart. Worth the drive from any base — they specialize in helping military families find reliable vehicles fast.', 
        link: 'https://www.usedcarguys.net' 
      },
    ],
  },
];

const COUNTRY_HIGHLIGHTS: Record<Country, {
  emoji: string;
  title: string;
  subtitle: string;
  highlights: { name: string; type: string; description: string; ages: string }[];
}> = {
  uk: {
    emoji: '🇬🇧',
    title: 'United Kingdom',
    subtitle: 'Family highlights when visiting',
    highlights: [
      { name: 'Tower of London', type: '🏰 Historic', description: 'Crown Jewels, Yeoman Warders, and 1,000 years of history. Kids are mesmerized.', ages: 'school' },
      { name: 'Natural History Museum', type: '🦕 Museum', description: 'Free! Dinosaur skeletons, the blue whale, and incredible exhibits. All ages.', ages: 'all' },
      { name: 'Warner Bros. Studio Tour (Harry Potter)', type: '🧙 Theme', description: 'Outside London. The real sets, costumes, and magic. Book months ahead.', ages: 'school' },
      { name: 'Edinburgh Castle', type: '🏰 Castle', description: 'Scotland\'s most iconic castle. Crown Jewels, cannons, and bagpipers.', ages: 'all' },
      { name: 'Brighton Beach & Pier', type: '🌊 Beach', description: 'Arcade games, rides, fish & chips. Easy day trip from London.', ages: 'all' },
      { name: 'Stonehenge', type: '🗿 Historic', description: 'Mysterious and awe-inspiring. Even young kids are fascinated by the scale.', ages: 'school' },
    ],
  },
  italy: {
    emoji: '🇮🇹',
    title: 'Italy',
    subtitle: 'Family highlights when visiting',
    highlights: [
      { name: 'Colosseum, Rome', type: '🏛️ Historic', description: 'Book skip-the-line tickets. Kids love the gladiator stories. Unforgettable.', ages: 'school' },
      { name: 'Gardaland', type: '🎢 Theme Park', description: 'Italy\'s largest theme park on Lake Garda. Great for all ages.', ages: 'all' },
      { name: 'Venice Gondola Ride', type: '🚢 Activity', description: 'Even young kids love the canals. Walk, get gelato, explore without cars.', ages: 'all' },
      { name: 'Pompeii', type: '🌋 Historic', description: 'The ancient city frozen in time. Older kids find this absolutely fascinating.', ages: 'teen' },
      { name: 'Cinque Terre Villages', type: '🌊 Scenic', description: 'Colorful villages, hiking trails, and beaches. Beautiful for family photos.', ages: 'school' },
      { name: 'Pizza Making Class', type: '🍕 Activity', description: 'Cooking classes for families in Rome, Florence, Naples. Kids love making real pizza.', ages: 'all' },
    ],
  },
  spain: {
    emoji: '🇪🇸',
    title: 'Spain',
    subtitle: 'Family highlights when visiting',
    highlights: [
      { name: 'PortAventura World', type: '🎢 Theme Park', description: 'One of Europe\'s best theme parks near Barcelona. Also has a water park.', ages: 'all' },
      { name: 'Sagrada Família', type: '🏛️ Architecture', description: 'Gaudí\'s masterpiece. The interior looks like a forest — kids are amazed.', ages: 'school' },
      { name: 'Park Güell', type: '🌿 Park', description: 'Colorful mosaics, winding paths, and great views. Kids love the dragon staircase.', ages: 'all' },
      { name: 'Beaches of Costa Brava', type: '🌊 Beach', description: 'Crystal clear water, snorkeling, and calm coves. Perfect for families.', ages: 'all' },
      { name: 'Flamenco Show for Families', type: '💃 Culture', description: 'Many venues in Seville and Madrid offer family-friendly early evening shows.', ages: 'school' },
      { name: 'Madrid\'s Retiro Park', type: '🌿 Park', description: 'Massive park with rowboats, puppet shows, and playgrounds. Free and beautiful.', ages: 'all' },
    ],
  },
};

const AGE_LABELS: Record<AgeGroup, string> = {
  all: 'All Ages',
  toddler: 'Toddlers (0-4)',
  school: 'School Age (5-12)',
  teen: 'Teens (13+)',
};

// ── Component ─────────────────────────────────────────────────────────────
export default function FamilyAdventuresPage() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('all');
  const [selectedCountry, setSelectedCountry] = useState<Country>('uk');

  const filterByAge = (ages: string) => {
    if (selectedAge === 'all') return true;
    return ages === 'all' || ages === selectedAge;
  };

  return (
    <>
      <SEO
        title="Family Adventures in Europe"
        description="Family-friendly destinations, activities, schools, and services near US military bases in Germany. Plus travel highlights for UK, Italy, and Spain."
        keywords="family activities Germany, kids near US bases, military family Europe, theme parks Germany, family day trips Stuttgart Ramstein Grafenwöhr"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Family Adventures', url: '/family-adventures' },
        ]}
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="text-5xl mb-4">🧭</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Family Adventures in Europe
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Europe is an incredible playground for kids of all ages. Find
              family-friendly activities near your base — and unforgettable
              highlights when you travel across Europe.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Age Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <p className="w-full text-center text-sm font-semibold text-[var(--muted-foreground)] mb-1">
              Filter by age group:
            </p>
            {(Object.keys(AGE_LABELS) as AgeGroup[]).map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                  selectedAge === age
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                }`}
              >
                {AGE_LABELS[age]}
              </button>
            ))}
          </div>

          {/* ── GERMANY SECTION ─────────────────────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🇩🇪</span>
              <div>
                <h2 className="text-2xl font-bold text-[var(--brand-dark)]">
                  Germany — Near Your Base
                </h2>
                <p className="text-[var(--muted-foreground)] text-sm">
                  Base-specific family resources and activities
                </p>
              </div>
            </div>

            {GERMANY_RESOURCES.map((baseData) => {
              const filtered = baseData.items.filter((item) => filterByAge(item.ages));
              if (filtered.length === 0) return null;

              return (
                <div key={baseData.base} className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{baseData.emoji}</span>
                    <h3 className="text-xl font-bold text-[var(--brand-dark)]">
                      {baseData.base}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item) => (
                      <div
                        key={item.name}
                        className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.type}
                          </span>
                          <span className="text-xs text-orange-600 font-medium">
                            {AGE_LABELS[item.ages as AgeGroup] ?? 'All Ages'}
                          </span>
                        </div>
                        <h4 className="font-bold text-[var(--brand-dark)] mb-2">
                          {item.name}
                        </h4>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-orange-500 hover:text-orange-700 font-semibold"
                          >
                            Visit Website →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── COUNTRY HIGHLIGHTS ──────────────────────────────────────── */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-2">
                🌍 Travel Highlights Across Europe
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Must-see family experiences when you venture beyond Germany
              </p>
            </div>

            {/* Country Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {(Object.keys(COUNTRY_HIGHLIGHTS) as Country[]).map((country) => {
                const data = COUNTRY_HIGHLIGHTS[country];
                return (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border-2 ${
                      selectedCountry === country
                        ? 'bg-[var(--brand-dark)] text-white border-[var(--brand-dark)]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {data.emoji} {data.title}
                  </button>
                );
              })}
            </div>

            {/* Country Content */}
            {(() => {
              const data = COUNTRY_HIGHLIGHTS[selectedCountry];
              const filtered = data.highlights.filter((h) => filterByAge(h.ages));
              return (
                <div>
                  <p className="text-center text-sm text-[var(--muted-foreground)] mb-6">
                    {data.subtitle} — top picks for {AGE_LABELS[selectedAge].toLowerCase()}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.length > 0 ? filtered.map((item) => (
                      <div
                        key={item.name}
                        className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.type}
                          </span>
                          <span className="text-xs text-orange-600 font-medium">
                            {AGE_LABELS[item.ages as AgeGroup] ?? 'All Ages'}
                          </span>
                        </div>
                        <h4 className="font-bold text-[var(--brand-dark)] mb-2">
                          {item.name}
                        </h4>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )) : (
                      <div className="col-span-3 text-center py-12 text-[var(--muted-foreground)]">
                        No highlights for this age group in {data.title} yet.
                        <br />
                        <button
                          onClick={() => setSelectedAge('all')}
                          className="mt-3 text-orange-500 hover:text-orange-700 font-semibold"
                        >
                          Show all ages →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Submit a Resource CTA */}
          <div className="mt-16 bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🙌</div>
            <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-2">
              Know a great family resource we missed?
            </h3>
            <p className="text-[var(--muted-foreground)] mb-5">
              We're always adding to this guide. Share your family's favorite spot near base
              and we'll add it to the list.
            </p>
            <button
              onClick={() => navigate('/submit-business')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
            >
              Submit a Family Resource
            </button>
          </div>

        </div>
      </div>
    </>
  );
}