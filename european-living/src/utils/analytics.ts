// src/utils/analytics.ts
// Google Analytics 4 helper functions

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-6RPDS8PFEB';

/**
 * Initialize Google Analytics
 * Only loads in production and respects user consent
 */
export const initGA = () => {
  // Only load in production
  if (import.meta.env.DEV) {
    console.log('[Analytics] Skipping GA in development mode');
    return;
  }

  // Check if user has consented (from your CookieConsentModal)
  const hasConsented = localStorage.getItem('cookieConsent');
  if (!hasConsented) {
    console.log('[Analytics] User has not consented to analytics');
    return;
  }

  // Parse consent to check if analytics is enabled
  try {
    const consent = JSON.parse(hasConsented);
    if (!consent.analytics) {
      console.log('[Analytics] Analytics not enabled in user preferences');
      return;
    }
  } catch {
    console.log('[Analytics] Invalid consent data');
    return;
  }

  // Prevent loading GA multiple times
  if (typeof window.gtag !== 'undefined') {
    console.log('[Analytics] GA already initialized');
    return;
  }

  // Load GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll manually track page views
    anonymize_ip: true, // Anonymize IP for GDPR compliance
  });

  console.log('[Analytics] Google Analytics initialized');
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string) => {
  if (import.meta.env.DEV || typeof window.gtag === 'undefined') {
    console.log('[Analytics] Page view:', path, title);
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (import.meta.env.DEV || typeof window.gtag === 'undefined') {
    console.log('[Analytics] Event:', eventName, params);
    return;
  }

  window.gtag('event', eventName, params);
};

/**
 * Track business view
 */
export const trackBusinessView = (businessName: string, category: string) => {
  trackEvent('view_business', {
    business_name: businessName,
    category: category,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  });
};

/**
 * Track base selection
 */
export const trackBaseSelection = (baseName: string) => {
  trackEvent('select_base', {
    base_name: baseName,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    value: url,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};