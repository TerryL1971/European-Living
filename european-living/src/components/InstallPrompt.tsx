// src/components/InstallPrompt.tsx

import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isInStandaloneMode);

    // Detect iOS
    const isIOSDevice = (): boolean => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    const ios = isIOSDevice();
    setIsIOS(ios);

    // Check if user already dismissed
    const dismissed = localStorage.getItem('installPromptDismissed');
    const dismissedDate = dismissed ? new Date(dismissed) : null;
    const daysSinceDismissed = dismissedDate 
      ? (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
      : 999;

    // Show prompt after 30 seconds if not dismissed recently (within 7 days)
    if (!isInStandaloneMode && daysSinceDismissed > 7) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt (Android)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android Chrome
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    } else if (isIOS) {
      // iOS - just show instructions, don't hide prompt
      // User will manually dismiss after reading
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', new Date().toISOString());
  };

  // Don't show if already installed
  if (isStandalone) return null;

  // Don't show if user dismissed recently
  if (!showPrompt && !deferredPrompt) return null;

  // Only show if conditions are met
  if (!showPrompt && !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0">
            <Smartphone className="text-green-600 dark:text-green-400" size={24} />
          </div>
          
          <div className="flex-1 pr-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Install European Living
            </h3>
            
            {isIOS ? (
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>Add to your home screen for quick access:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Tap the Share button <span className="inline-block">📤</span></li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add"</li>
                </ol>
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get quick access to directions and day trips. Works offline!
              </p>
            )}

            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={18} />
                Install App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}