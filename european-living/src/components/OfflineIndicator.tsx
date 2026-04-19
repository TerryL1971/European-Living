// src/components/OfflineIndicator.tsx
// Shows an offline banner only after being offline for 3 continuous seconds.
// Prevents false flashes on slow/throttled military base connections.

import { useState, useEffect, useRef } from 'react';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleOffline() {
      // Only show the banner after 3 seconds of confirmed offline status
      debounceRef.current = setTimeout(() => {
        setIsOffline(true);
      }, 3000);
    }

    function handleOnline() {
      // Cancel pending offline timer if we reconnected quickly
      clearTimeout(debounceRef.current);
      setIsOffline(false);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      clearTimeout(debounceRef.current);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-white
                 text-sm text-center py-2 px-4 shadow-lg"
    >
      <span className="mr-2">⚠️</span>
      You appear to be offline. Some content may not be available.
    </div>
  );
}