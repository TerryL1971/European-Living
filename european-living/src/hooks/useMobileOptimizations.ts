// src/components/hooks/useMobileOptimizations.ts

import { useEffect, useState } from 'react';

interface MobileOptimizations {
  isMobile: boolean;
  isOnline: boolean;
  isSlowConnection: boolean;
  installPromptSupported: boolean;
}

export function useMobileOptimizations(): MobileOptimizations {
  const [isMobile, setIsMobile] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [installPromptSupported, setInstallPromptSupported] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Detect slow connection
    interface NavigatorConnection extends Navigator {
      connection?: {
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
      };
      mozConnection?: {
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
      };
      webkitConnection?: {
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
      };
    }

    const nav = navigator as NavigatorConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    if (connection) {
      const checkConnection = () => {
        const effectiveType = connection.effectiveType;
        setIsSlowConnection(effectiveType === 'slow-2g' || effectiveType === '2g');
      };

      checkConnection();
      if (connection.addEventListener) {
        connection.addEventListener('change', checkConnection);
      }
    }

    // Check install prompt support
    window.addEventListener('beforeinstallprompt', () => {
      setInstallPromptSupported(true);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isMobile,
    isOnline,
    isSlowConnection,
    installPromptSupported,
  };
}

// Hook for precaching important routes
export function usePrecacheRoutes(routes: string[]) {
  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Send message to service worker to cache these routes
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_URLS',
        urls: routes,
      });
    }
  }, [routes]);
}

// Hook for showing offline indicator
export function useOfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setShowIndicator(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      // Keep indicator visible for 2 seconds after coming back online
      setTimeout(() => setShowIndicator(false), 2000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return { isOffline, showIndicator };
}