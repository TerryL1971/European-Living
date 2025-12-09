// src/components/OfflineIndicator.tsx

import { WifiOff, Wifi } from 'lucide-react';
import { useOfflineIndicator } from '@/hooks/useMobileOptimizations';

export default function OfflineIndicator() {
  const { isOffline, showIndicator } = useOfflineIndicator();

  if (!showIndicator) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
          isOffline
            ? 'bg-red-500 text-white'
            : 'bg-green-500 text-white'
        }`}
      >
        {isOffline ? (
          <>
            <WifiOff size={18} />
            <span className="text-sm font-medium">You're offline</span>
          </>
        ) : (
          <>
            <Wifi size={18} />
            <span className="text-sm font-medium">Back online</span>
          </>
        )}
      </div>
    </div>
  );
}