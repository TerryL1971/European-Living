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
  const routeKey = Object.keys(preloadableRoutes).find(key =>
    path.startsWith(key)
  );

  if (!routeKey || loadedRoutes.has(routeKey)) {
    return;
  }

  const loader = preloadableRoutes[routeKey as keyof typeof preloadableRoutes];
  loadedRoutes.add(routeKey);

  loader().catch((error) => {
    console.error(`Failed to preload route: ${routeKey}`, error);
    loadedRoutes.delete(routeKey);
  });
}

/**
 * Setup automatic preloading on link hover/focus
 */
export function setupRoutePreloading(): () => void {
  const handleMouseEnter = (e: MouseEvent) => {
    // ── FIX: guard against non-Element targets (text nodes, window, etc.)
    if (!(e.target instanceof Element)) return;

    const link = e.target.closest('a[href]') as HTMLAnchorElement | null;

    if (link?.href) {
      try {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          preloadRoute(url.pathname);
        }
      } catch {
        // Invalid URL — ignore
      }
    }
  };

  const handleFocus = (e: FocusEvent) => {
    // ── FIX: guard against non-Element targets
    if (!(e.target instanceof HTMLAnchorElement)) return;

    const link = e.target;
    if (link.href) {
      try {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          preloadRoute(url.pathname);
        }
      } catch {
        // Invalid URL — ignore
      }
    }
  };

  document.addEventListener('mouseover', handleMouseEnter, true);
  document.addEventListener('focusin', handleFocus, true);

  return () => {
    document.removeEventListener('mouseover', handleMouseEnter, true);
    document.removeEventListener('focusin', handleFocus, true);
  };
}

/**
 * Preload critical routes after initial page load
 */
export function preloadCriticalRoutes(): void {
  if (document.readyState === 'complete') {
    startPreloading();
  } else {
    window.addEventListener('load', startPreloading, { once: true });
  }
}

function startPreloading(): void {
  setTimeout(() => {
    preloadRoute('/services-directory');
    setTimeout(() => {
      preloadRoute('/services');
    }, 2000);
  }, 1000);
}