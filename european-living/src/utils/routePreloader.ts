// src/utils/routePreloader.ts

/**
 * Preload lazy-loaded route components on hover/focus
 * This makes navigation feel instant when users interact with links
 */

// Lazy imports (same as in App.tsx)
const preloadableRoutes = {
  '/articles': () => import('../pages/articles/ArticlePage'),
  '/destinations': () => import('../pages/destinations/DestinationPage'),
  '/businesses': () => import('../pages/businesses/BusinessDetailPage'),
  '/services': () => import('../pages/businesses/ServiceCategoryPage'),
  '/services-directory': () => import('../components/ServicesDirectory'),
  '/submit-business': () => import('../components/BusinessSubmissionForm'),
  '/privacy-policy': () => import('../pages/PrivacyPolicy'),
};

const loadedRoutes = new Set<string>();

/**
 * Preload a route's component
 */
export function preloadRoute(path: string): void {
  // Find matching route
  const routeKey = Object.keys(preloadableRoutes).find(key => path.startsWith(key));
  
  if (!routeKey || loadedRoutes.has(routeKey)) {
    return; // Already loaded or not preloadable
  }

  const loader = preloadableRoutes[routeKey as keyof typeof preloadableRoutes];
  
  // Mark as loading to prevent duplicate requests
  loadedRoutes.add(routeKey);
  
  // Start loading
  loader().catch((error) => {
    console.error(`Failed to preload route: ${routeKey}`, error);
    loadedRoutes.delete(routeKey); // Allow retry on error
  });
}

/**
 * Setup automatic preloading on link hover/focus
 * Call this once when app mounts
 */
export function setupRoutePreloading(): () => void {
  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.href) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        preloadRoute(url.pathname);
      }
    }
  };

  const handleFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const link = target as HTMLAnchorElement;
      if (link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          preloadRoute(url.pathname);
        }
      }
    }
  };

  // Add event listeners with capture phase for better coverage
  document.addEventListener('mouseover', handleMouseEnter, true);
  document.addEventListener('focusin', handleFocus, true);

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseover', handleMouseEnter, true);
    document.removeEventListener('focusin', handleFocus, true);
  };
}

/**
 * Preload critical routes that users are likely to visit
 * Call this after initial page load
 */
export function preloadCriticalRoutes(): void {
  // Wait for initial page load to complete
  if (document.readyState === 'complete') {
    startPreloading();
  } else {
    window.addEventListener('load', startPreloading, { once: true });
  }
}

function startPreloading(): void {
  // Preload after a short delay to not interfere with initial render
  setTimeout(() => {
    // Preload services directory (most commonly visited)
    preloadRoute('/services-directory');
    
    // Preload after another delay to spread out network requests
    setTimeout(() => {
      preloadRoute('/services');
    }, 2000);
  }, 1000);
}