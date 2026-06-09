// src/components/page/FamilyAdventuresSection.tsx
// Homepage teaser section for Family Adventures
// Links to the full /family-adventures page

import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    emoji: '🎢',
    title: 'Theme Parks & Attractions',
    description: 'LEGOLAND, Europa-Park, Phantasialand and more — perfect for all ages.',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    textColor: 'text-orange-700',
  },
  {
    emoji: '🏰',
    title: 'Castles & History',
    description: 'Bring history to life at fairy-tale castles kids will never forget.',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    textColor: 'text-purple-700',
  },
  {
    emoji: '🌿',
    title: 'Parks & Playgrounds',
    description: 'Beautiful parks, nature trails, and playgrounds near every base.',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    textColor: 'text-green-700',
  },
  {
    emoji: '🎓',
    title: 'Schools & Education',
    description: 'International schools, homeschool resources, and tutoring near base.',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    textColor: 'text-blue-700',
  },
  {
    emoji: '⚽',
    title: 'Sports & Activities',
    description: 'Soccer, swimming, gymnastics, martial arts and more for every age.',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400',
    textColor: 'text-yellow-700',
  },
  {
    emoji: '🍕',
    title: 'Family-Friendly Dining',
    description: 'Kid-friendly restaurants that welcome families with English menus.',
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    textColor: 'text-red-700',
  },
];

export default function FamilyAdventuresSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🧒 For Families
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mb-4">
            Family Adventures in Europe
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Europe is an incredible playground for kids. Find family-friendly destinations,
            activities, schools, and services — all tailored for military families near US bases.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => navigate('/family-adventures')}
              className={`text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${cat.color}`}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className={`font-bold text-base mb-1 ${cat.textColor}`}>
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cat.description}
              </p>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/family-adventures')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            🧭 Explore All Family Resources
          </button>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            Base-specific guides for Germany · Travel highlights for UK, Italy & Spain
          </p>
        </div>

      </div>
    </section>
  );
}