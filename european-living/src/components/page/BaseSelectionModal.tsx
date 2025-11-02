// src/components/page/BaseSelectionModal.tsx

import React, { useState, useEffect } from "react";
import { MapPin, X, Check } from "lucide-react";

// === Type for Base ===
interface Base {
  id: string;
  name: string;
  location: string;
  region: string;
  icon: string;
  description: string;
}

// === Base List ===
const BASES: Base[] = [
  { id: "ramstein", name: "Ramstein Air Base", location: "Ramstein-Miesenbach", region: "Rhineland-Palatinate", icon: "✈️", description: "Largest USAF base in Europe" },
  { id: "stuttgart", name: "USAG Stuttgart", location: "Stuttgart", region: "Baden-Württemberg", icon: "🏛️", description: "EUCOM Headquarters" },
  { id: "kaiserslautern", name: "Kaiserslautern Area", location: "Kaiserslautern", region: "Rhineland-Palatinate", icon: "🏰", description: "KMC - Military Community" },
  { id: "wiesbaden", name: "USAG Wiesbaden", location: "Wiesbaden", region: "Hesse", icon: "🏢", description: "Army base near Frankfurt" },
  { id: "grafenwoehr", name: "USAG Bavaria", location: "Grafenwöhr", region: "Bavaria", icon: "⚔️", description: "Training area & garrison" },
  { id: "spangdahlem", name: "Spangdahlem Air Base", location: "Spangdahlem", region: "Rhineland-Palatinate", icon: "🛩️", description: "USAF base near Bitburg" },
];

const BaseSelectionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [hasVisited, setHasVisited] = useState<boolean>(false);

  // NOTE: resetBaseSelection function has been removed.

  // === Check if user has already selected a base ===
  useEffect(() => {
    const storedBase = localStorage.getItem("selectedBase");
    const visited = localStorage.getItem("hasVisitedSite");

    if (storedBase) {
      setSelectedBase(storedBase);
      setHasVisited(true);
    } else if (!visited) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleBaseSelect = (baseId: string): void => {
    setSelectedBase(baseId);
  };

  const handleConfirm = (): void => {
    if (selectedBase) {
      localStorage.setItem("selectedBase", selectedBase);
      localStorage.setItem("hasVisitedSite", "true");
      setIsOpen(false);
      setHasVisited(true);
      window.dispatchEvent(
        new CustomEvent("baseChanged", { detail: { baseId: selectedBase } })
      );
    }
  };

  const handleSkip = (): void => {
    localStorage.setItem("hasVisitedSite", "true");
    localStorage.setItem("selectedBase", "all");
    setSelectedBase("all");
    setIsOpen(false);
    setHasVisited(true);
  };

  const handleChangeBase = (): void => {
    setIsOpen(true);
  };

  const getBaseName = (baseId: string): string => {
    if (baseId === "all") return "All Locations";
    const base = BASES.find((b) => b.id === baseId);
    return base ? base.name : "Select Base";
  };

  return (
    <>
      {/* === Header Base Indicator === */}
      {hasVisited && selectedBase && (
        <div className="fixed top-4 right-4 z-40 bg-[var(--brand-bg)] shadow-lg rounded-lg px-4 py-2 border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--brand-dark)]">
              {getBaseName(selectedBase)}
            </span>

            <button
              onClick={handleChangeBase}
              className="ml-2 text-xs text-[var(--primary)] hover:text-[var(--brand-dark)] underline"
            >
              Change
            </button>
            {/* The Reset Button was here and has been removed */}
          </div>
        </div>
      )}

      {/* === Modal Overlay === */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-[var(--brand-bg)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Header (Using deep slate blue: --primary) */}
            <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome to European Living! 🇺🇸
                  </h2>
                  <p className="text-[var(--primary-foreground)]/90">
                    Your guide to living near U.S. military bases in Germany
                  </p>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-[var(--primary-foreground)] hover:opacity-80 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[var(--brand-dark)] mb-2">
                Which base are you near?
              </h3>
              <p className="text-[var(--muted-foreground)] mb-4">
                We'll show you businesses and services most relevant to your
                location. You can change this anytime.
              </p>

              {/* Base List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {BASES.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => handleBaseSelect(base.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                      selectedBase === base.id
                        ? "border-[var(--primary)] bg-[var(--secondary)]/30 shadow-md"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{base.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[var(--brand-dark)]">
                            {base.name}
                          </h4>
                          {selectedBase === base.id && (
                            <Check className="w-5 h-5 text-[var(--primary)]" />
                          )}
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] mb-1">
                          {base.location}, {base.region}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]/80">
                          {base.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Show All Option */}
              <button
                onClick={() => handleBaseSelect("all")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                  selectedBase === "all"
                    ? "border-[var(--muted-foreground)] bg-[var(--muted)]/50 shadow-md"
                    : "border-[var(--border)] hover:border-[var(--muted-foreground)]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--brand-dark)]">
                      Show All Locations
                    </h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      View businesses from all bases
                    </p>
                  </div>
                  {selectedBase === "all" && (
                    <Check className="w-5 h-5 text-[var(--muted-foreground)]" />
                  )}
                </div>
              </button>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedBase}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    selectedBase
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-md hover:shadow-lg"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)]/50 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 rounded-lg font-semibold text-[var(--muted-foreground)] hover:text-[var(--brand-dark)] hover:bg-[var(--muted)] transition-all"
                >
                  Skip for now
                </button>
              </div>

              <p className="text-xs text-[var(--muted-foreground)]/80 text-center mt-4">
                Your selection is saved locally on your device. We don't collect
                or share your location data.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BaseSelectionModal;