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

// NOTE: BASES array should ideally be imported from a separate file
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

  // 1️⃣ EFFECT: Check localStorage and show modal on first visit.
  useEffect(() => {
    const storedBase = localStorage.getItem("selectedBase");
    const visited = localStorage.getItem("hasVisitedSite");

    if (storedBase) {
      setSelectedBase(storedBase);
      setHasVisited(true);
    } else if (!visited) {
      // Delay opening for a better user experience on first load
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2️⃣ EFFECT: Listen for the "Reset Base" event from Header.tsx.
  useEffect(() => {
    const handleOpenModal = () => {
      // Base has been cleared by Header.tsx. We just force the open state.
      setSelectedBase(null); 
      setIsOpen(true);
    };

    window.addEventListener("openBaseSelectionModal", handleOpenModal);

    return () => {
      window.removeEventListener("openBaseSelectionModal", handleOpenModal);
    };
  }, []);

  const handleBaseSelect = (baseId: string) => setSelectedBase(baseId);

  const handleConfirm = () => {
    if (!selectedBase) return;
    localStorage.setItem("selectedBase", selectedBase);
    localStorage.setItem("hasVisitedSite", "true");
    setIsOpen(false); // Closes the modal
    setHasVisited(true);
    
    // Dispatch event to update global state (App.tsx)
    window.dispatchEvent(
      new CustomEvent("baseChanged", { detail: { baseId: selectedBase } })
    );
  };

  const handleSkip = () => {
    localStorage.setItem("hasVisitedSite", "true");
    localStorage.setItem("selectedBase", "all");
    setSelectedBase("all");
    setIsOpen(false); // Closes the modal
    setHasVisited(true);

    // Dispatch event to set "all" as the selected base globally
    window.dispatchEvent(
      new CustomEvent("baseChanged", { detail: { baseId: "all" } })
    );
  };

  // Handles the reset click from the floating indicator
  const handleResetFromIndicator = () => {
    // 1. Clear local storage for a fresh start
    localStorage.removeItem("selectedBase");
    localStorage.removeItem("hasVisitedSite");
    
    // 2. Clear component state and open the modal
    setSelectedBase(null);
    setHasVisited(false);
    setIsOpen(true); // Opens the modal for re-selection
    
    // 3. Dispatch an event to clear the base in App.tsx 
    window.dispatchEvent(
      new CustomEvent("baseChanged", { detail: { baseId: "all" } })
    );
  };

  const getBaseName = (id: string | null) => {
    if (id === "all") return "All Locations";
    const base = BASES.find((b) => b.id === id);
    return base ? base.name : "Select Base";
  };

  return (
    <>
      {/* Floating selected base indicator */}
      {hasVisited && selectedBase && (
        <div 
          className="fixed top-4 right-4 z-40 bg-white shadow-lg rounded-lg px-4 py-2 border flex items-center gap-2 max-w-[calc(100vw-3rem)] overflow-hidden"
        >
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span 
            className="text-sm font-medium truncate min-w-0"
          >
            {getBaseName(selectedBase)}
          </span>
          <button
            onClick={handleResetFromIndicator}
            className="ml-2 text-xs text-red-500 hover:text-red-700 underline flex-shrink-0"
          >
            Reset
          </button>
        </div>
      )}

      {/* Animated modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md md:max-w-4xl w-full mt-12 overflow-y-auto max-h-[90vh] scroll-fade-bottom" 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-blue-600 text-white p-6 flex justify-between items-center border-b border-gray-100">
                <h2 className="text-2xl font-extrabold">
                  Welcome to European Living 🇺🇸
                </h2>
                <button
                  onClick={handleSkip}
                  className="text-white/80 hover:text-white"
                  aria-label="Skip Base Selection"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 pb-8">
                <p className="text-gray-700 text-base mb-6">
                  Choose the U.S. military community closest to you to see
                  English-speaking services and local recommendations. You can
                  change this anytime later.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {BASES.map((base) => (
                    <button
                      key={base.id}
                      onClick={() => handleBaseSelect(base.id)}
                      className={`p-4 rounded-xl border-2 text-left transition duration-200 shadow-sm ${
                        selectedBase === base.id
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500 shadow-lg" // Selection style
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md" // Subtle hover
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl mt-0.5">{base.icon}</span>
                        <div>
                          <h4 className="font-extrabold text-gray-800">{base.name}</h4>
                          <p className="text-sm text-gray-600">
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
                  className={`w-full p-4 border-2 rounded-lg transition duration-200 ${
                    selectedBase === "all"
                      ? "border-gray-500 bg-gray-100 shadow-inner"
                      : "border-gray-300 hover:border-gray-400"
                  } mb-6`} 
                >
                  <span className="font-semibold text-gray-800">🌍 Show All Locations</span>
                </button>
                
                <button
                  onClick={handleConfirm}
                  disabled={!selectedBase}
                  className={`w-full py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg ${
                    selectedBase
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                  } mt-4`} 
                >
                  Continue
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Not near a base?{" "}
                  <button
                    onClick={handleSkip}
                    className="text-blue-600 font-medium hover:underline"
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