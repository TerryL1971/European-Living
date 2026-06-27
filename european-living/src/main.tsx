// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Sentry is initialized AFTER the initial render (see bottom of this file),
// not synchronously here. The SDK — especially replayIntegration — is one
// of the heavier monitoring bundles out there, and loading it before the
// app even paints directly delays time-to-interactive for every visitor,
// regardless of the 10% sample rate (sampling only limits what gets SENT
// to Sentry, not what gets downloaded/parsed by the browser first).
import * as Sentry from "@sentry/react";
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { BaseProvider } from './contexts/BaseContext';
import { setupRoutePreloading, preloadCriticalRoutes } from './utils/routePreloader';
import { initGA } from './utils/analytics';
import { initWebVitals } from './utils/webVitals';
import './index.css';

function initSentry() {
  Sentry.init({
    dsn: "https://30c87b24943cef5dc27e660cf0a960d9@o4510359033085952.ingest.de.sentry.io/4510359035117648",

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance monitoring sample rate (10% of transactions)
    tracesSampleRate: 0.1,

    // Session Replay sample rate
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Environment
    environment: import.meta.env.MODE, // 'development' or 'production'

    // Don't send PII (personal identifiable information)
    sendDefaultPii: false,

    // Only enable in production
    enabled: import.meta.env.PROD,

    // Ignore common non-critical errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'Network request failed',
    ],
  });
}

// Initialize Google Analytics (respects user consent)
initGA();

// Initialize Web Vitals monitoring (Core Web Vitals for SEO)
initWebVitals();

// Create a query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache for 10 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false,
    },
  },
});

// Setup preloading on mount
setupRoutePreloading();
preloadCriticalRoutes();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BaseProvider>
            <App />
          </BaseProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);

// Defer Sentry until after the browser is idle (or after a short timeout
// on devices/browsers without requestIdleCallback), so the very first
// paint and the app's own JS aren't competing with the monitoring SDK.
if (import.meta.env.PROD) {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(initSentry);
  } else {
    setTimeout(initSentry, 1000);
  }
}