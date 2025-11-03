import React, { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Base {
  id: string;
  name: string;
  location: string;
  region: string;
  icon: string;
  description: string;
}

const BASES: Base[] = [
  {
    id: "ramstein",
    name: "Ramstein Air Base",
    location: "Ramstein-Miesenbach",
    region: "Rhineland-Palatinate",
    icon: "✈️",
    description: "Largest USAF base in Europe",
  },
  {
    id: "stuttgart",
    name: "USAG Stuttgart",
    location: "Stuttgart",
    region: "Baden-Württemberg",
    icon: "🏛️",
    description: "Home to EUCOM and AFRICOM headquarters",
  },
  {
    id: "kaiserslautern",
    name: "Kaiserslautern Area",
    location: "Kaiserslautern",
    region: "Rhineland-Palatinate",
    icon: "🏰",
    description: "Heart of the KMC – Kaiserslautern Military Community",
  },
  {
    id: "wiesbaden",
    name: "USAG Wiesbaden",
    location: "Wiesbaden",
    region: "Hesse",
    icon: "🏢",
    description: "Near Frankfurt, Army base and community",
  },
  {
    id: "grafenwoehr",
    name: "USAG Bavaria",
    location: "Grafenwöhr",
    region: "Bavaria",
    icon: "⚔️",
    description: "Training area and large Army garrison",
  },
  {
    id: "spangdahlem",
    name: "Spangdahlem Air Base",
    location: "Spangdahlem",
    region: "Rhineland-Palatinate",
    icon: "🛩️",
    description: "USAF base near Bitburg",
  },
];

const BaseSelectionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [hasVisited, setHasVisited] = useState(false);

  // ✅ Show modal only once for new visitors
  useEffect(() => {
    const storedBase = localStorage.getItem("selectedBase");
    const visited = localStorage.getItem("hasVisitedSite");

    if (storedBase) {
      setSelectedBase(storedBase);
      setHasVisited(true);
    } else if (!visited) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleBaseSelect = (baseId: string) => setSelectedBase(baseId);

  const handleConfirm = () => {
    if (!selectedBase) return;
    localStorage.setItem("selectedBase", selectedBase);
    localStorage.setItem("hasVisitedSite", "true");
    setIsOpen(false);
    setHasVisited(true);
    window.dispatchEvent(
      new CustomEvent("baseChanged", { detail: { baseId: selectedBase } })
    );
  };

  const handleSkip = () => {
    localStorage.setItem("hasVisitedSite", "true");
    localStorage.setItem("selectedBase", "all");
    setSelectedBase("all");
    setIsOpen(false);
    setHasVisited(true);
  };

  const resetBase = () => {
    localStorage.removeItem("selectedBase");
    localStorage.removeItem("hasVisitedSite");
    window.location.reload();
  };

  const getBaseName = (id: string | null) => {
    if (id === "all") return "All Locations";
    const base = BASES.find((b) => b.id === id);
    return base ? base.name : "Select Base";
  };

  return (
    <>
      {/* ✅ Floating selected base indicator */}
      {hasVisited && selectedBase && (
        <div className="fixed top-4 right-4 z-40 bg-white shadow-lg rounded-lg px-4 py-2 border flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">
            {getBaseName(selectedBase)}
          </span>
          <button
            onClick={resetBase}
            className="ml-2 text-xs text-red-500 hover:text-red-700 underline"
          >
            Reset
          </button>
        </div>
      )}

      {/* ✅ Animated modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Welcome to European Living 🇺🇸
                </h2>
                <button
                  onClick={handleSkip}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Choose the U.S. military community closest to you to see
                  English-speaking services and local recommendations. You can
                  change this anytime later.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {BASES.map((base) => (
                    <button
                      key={base.id}
                      onClick={() => handleBaseSelect(base.id)}
                      className={`p-4 rounded-xl border-2 text-left transition ${
                        selectedBase === base.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{base.icon}</span>
                        <div>
                          <h4 className="font-semibold">{base.name}</h4>
                          <p className="text-sm text-gray-500">
                            {base.location}, {base.region}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {base.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Show all locations */}
                <button
                  onClick={() => handleBaseSelect("all")}
                  className={`w-full p-3 border-2 rounded-lg mb-4 ${
                    selectedBase === "all"
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  🌍 Show All Locations
                </button>

                {/* Confirm button */}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedBase}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    selectedBase
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>

                {/* Skip link */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  Not near a base?{" "}
                  <button
                    onClick={handleSkip}
                    className="text-blue-600 hover:underline"
                  >
                    Skip this step
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BaseSelectionModal;
