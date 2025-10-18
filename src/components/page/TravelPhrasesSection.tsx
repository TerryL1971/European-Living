import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { categories, phrases, languages } from "../../data/phrases";

export default function GermanPhrasesSection() {
  const [activeCategory, setActiveCategory] = useState("greetings");
  const [selectedLanguage, setSelectedLanguage] = useState("de");

  // Handle speech synthesis
  const speakPhrase = (text: string, languageCode: string) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        de: "de-DE",
        fr: "fr-FR",
        it: "it-IT",
        es: "es-ES",
        nl: "nl-NL",
        cs: "cs-CZ",
      };

      utterance.lang = langMap[languageCode] || "de-DE";
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  // Reset scroll to top when language or category changes
  useEffect(() => {
    const container = document.getElementById("phrase-scroll");
    if (container) container.scrollTop = 0;
  }, [selectedLanguage, activeCategory]);

  return (
    <section id="phrases" className="bg-[var(--brand-bg)] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--brand-dark)] mb-4">
          Essential Travel Phrases
        </h2>
        <p className="text-center text-[var(--brand-dark)] opacity-70 mb-8">
          Quickly learn key phrases in {languages.length} European languages
        </p>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-dark)] font-semibold px-6 py-3 pr-10 rounded-lg cursor-pointer hover:bg-[var(--brand-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-lg"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap border-2 ${
                activeCategory === cat.id
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                  : "bg-white text-[var(--brand-dark)] border-gray-300 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-bg)]"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Phrases */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div
            id="phrase-scroll"
            className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400"
          >
            <div className="space-y-3">
              {phrases[activeCategory]?.map((phrase, idx) => {
                const translation = phrase.translations[selectedLanguage];

                return (
                  <div
                    key={`${activeCategory}-${idx}`}
                    className="flex items-center justify-between bg-[var(--brand-bg)] rounded-lg p-4 hover:shadow-md transition group"
                  >
                    {/* Icon */}
                    {phrase.icon && (
                      <span className="text-2xl mr-3 flex-shrink-0">{phrase.icon}</span>
                    )}

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <p className="text-[var(--brand-primary)] font-bold text-lg truncate">
                          {translation?.text || "—"}
                        </p>
                        {translation?.pronunciation && (
                          <p className="text-gray-600 text-sm italic">
                            ({translation.pronunciation})
                          </p>
                        )}
                      </div>
                      <p className="text-[var(--brand-dark)] text-sm mt-1">
                        {phrase.english}
                      </p>
                    </div>

                    {/* Speaker */}
                    <button
                      onClick={() =>
                        speakPhrase(translation?.text || "", selectedLanguage)
                      }
                      className="ml-4 flex-shrink-0 bg-[var(--brand-primary)] text-white p-3 rounded-full hover:bg-[var(--brand-dark)] transition shadow-md hover:shadow-lg group-hover:scale-110 transform"
                      title={`Listen to ${phrase.english} in ${currentLanguage?.name}`}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              }) ?? (
                <p className="text-center text-gray-500 py-8">
                  No phrases available for this category.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-[var(--brand-dark)] opacity-70">
          💡 Click the <Volume2 className="inline w-4 h-4" /> icon to hear pronunciation
        </div>
      </div>
    </section>
  );
}
