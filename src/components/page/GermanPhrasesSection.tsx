import { useState } from "react";
import { categories, phrases } from "../../data/phrases";
import { motion } from "framer-motion";

export default function GermanPhrasesSection() {
  const [activeCategory, setActiveCategory] = useState("greetings");
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  // Toggle flip state for a card
  const handleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="phrases" className="bg-brand-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-blue mb-12">
          Essential German Phrases
        </h2>

        {/* ✅ Category Tabs */}
        <div className="flex justify-center gap-4 mb-10 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-brand-blue text-white"
                  : "bg-white text-brand-blue border border-brand-blue hover:bg-brand-light"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* ✅ Phrase Cards - Scrollable */}
        <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phrases[activeCategory]?.map((phrase, idx) => {
              const key = `${activeCategory}-${idx}`;
              const flipped = flippedCards[key] || false;

              return (
                <div
                  key={key}
                  className="relative w-full h-40 [perspective:1000px] cursor-pointer"
                  onClick={() => handleFlip(key)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                      flipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center [backface-visibility:hidden]">
                      <p className="text-lg font-semibold text-brand-blue">{phrase.german}</p>
                      <p className="text-gray-600 italic">{phrase.english}</p>

                      {/* Flip Indicator (↺) */}
                      <motion.span
                        className="absolute bottom-2 right-2 text-gray-400 text-sm select-none"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        ↺
                      </motion.span>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 bg-brand-light shadow-lg rounded-xl border border-gray-200 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <p className="text-lg font-bold text-brand-blue">{phrase.pronunciation}</p>
                    </div>
                  </div>
                </div>
              );
            }) || (
              <p className="col-span-full text-center text-gray-500">
                No phrases available for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
