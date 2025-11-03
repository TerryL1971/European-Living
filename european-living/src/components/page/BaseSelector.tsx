// src/components/page/BaseSelector.tsx
import { MapPin } from "lucide-react";
import { BASES } from "../../data/bases";

interface BaseSelectorProps {
  selectedBase: string;
  onBaseChange: (baseId: string) => void;
}

export default function BaseSelector({ selectedBase, onBaseChange }: BaseSelectorProps) {
  const currentBase = BASES.find((b) => b.id === selectedBase);

  const handleBaseChange = (newBase: string) => {
    // Update parent component
    onBaseChange(newBase);
    
    // ✅ Save to localStorage
    localStorage.setItem('selectedBase', newBase);
    
    // ✅ Dispatch event so modal and other components know
    window.dispatchEvent(new CustomEvent('baseChanged', { 
      detail: { baseId: newBase } 
    }));
  };

  return (
    <div className="bg-[var(--brand-primary)] text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="text-xs opacity-80">Your Base</p>
              <p className="font-semibold">{currentBase?.name || "Select a base"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="base-select" className="text-sm opacity-80 hidden sm:block">
              Change Base:
            </label>
            <select
              id="base-select"
              value={selectedBase}
              onChange={(e) => handleBaseChange(e.target.value)} // ✅ Use new handler
              className="bg-white text-[var(--brand-dark)] px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
            >
              {BASES.map((base) => (
                <option key={base.id} value={base.id}>
                  {base.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile-friendly base info */}
        <div className="mt-2 text-xs opacity-80 hidden sm:block">
          {currentBase?.location} • Serving {currentBase?.nearbyTowns.join(", ")}
        </div>
      </div>
    </div>
  );
}