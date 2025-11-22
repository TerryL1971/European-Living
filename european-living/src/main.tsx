// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from "@sentry/react";
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { BaseProvider } from './contexts/BaseContext';
import { setupRoutePreloading, preloadCriticalRoutes } from './utils/routePreloader';
import { initGA } from './utils/analytics';
import { initWebVitals } from './utils/webVitals';
import './index.css';

// Initialize Sentry FIRST (before anything else)
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