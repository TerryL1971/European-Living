// src/utils/webVitals.ts
// Core Web Vitals monitoring for SEO and performance tracking

import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

/**
 * Send metric to Google Analytics
 */
const sendToAnalytics = (metric: Metric) => {
  // Only send in production
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating);
    return;
  }

  // Check if gtag is available
  if (typeof window.gtag === 'undefined') {
    return;
  }

  // Send to Google Analytics as an event
  window.gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
    // Include rating (good/needs-improvement/poor)
    metric_rating: metric.rating,
  });
};

/**
 * Send metric to Sentry for performance monitoring
 */
const sendToSentry = (metric: Metric) => {
  // Only send in production
  if (import.meta.env.DEV) {
    return;
  }

  // Check if Sentry is available
  if (typeof window.Sentry === 'undefined') {
    return;
  }

  // Sentry performance measurement
  const measurement: Record<string, { value: number; unit: string }> = {};
  measurement[metric.name] = {
    value: metric.value,
    unit: metric.name === 'CLS' ? 'ratio' : 'millisecond',
  };

  // Record measurement in Sentry
  window.Sentry?.getCurrentScope().setMeasurement(
    metric.name,
    metric.value,
    metric.name === 'CLS' ? 'ratio' : 'millisecond'
  );
};

/**
 * Report all Web Vitals metrics
 */
const reportMetric = (metric: Metric) => {
  sendToAnalytics(metric);
  sendToSentry(metric);
};

/**
 * Initialize Web Vitals monitoring
 * Call this once in your main.tsx
 */
export const initWebVitals = () => {
  // Cumulative Layout Shift - measures visual stability
  // Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25
  onCLS(reportMetric);

  // Interaction to Next Paint - measures interactivity
  // Good: < 200ms, Needs Improvement: 200-500ms, Poor: > 500ms
  onINP(reportMetric);

  // First Contentful Paint - measures loading performance
  // Good: < 1.8s, Needs Improvement: 1.8-3s, Poor: > 3s
  onFCP(reportMetric);

  // Largest Contentful Paint - measures loading performance
  // Good: < 2.5s, Needs Improvement: 2.5-4s, Poor: > 4s
  onLCP(reportMetric);

  // Time to First Byte - measures server response time
  // Good: < 800ms, Needs Improvement: 800-1800ms, Poor: > 1800ms
  onTTFB(reportMetric);

  console.log('[Web Vitals] Performance monitoring initialized');
};

/**
 * Type definitions for window.Sentry (if needed)
 */
declare global {
  interface Window {
    Sentry?: {
      getCurrentScope: () => {
        setMeasurement: (name: string, value: number, unit: string) => void;
      };
    };
  }
}