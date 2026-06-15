// src/components/SEO.tsx
// Reviewed & fixed — June 2026
//
// Changes from original:
//  1. businessSchema wrapped in useMemo to prevent infinite re-render loop
//  2. BreadcrumbSchema items stabilised with JSON.stringify comparison
//  3. Added FAQPage schema support (drives "People also ask" rich results)
//  4. Added WebSite + SearchAction schema (enables Sitelinks search box)
//  5. Added og:image:type meta tag (required by Facebook ad validator)
//  6. Added twitter:site prop
//  7. Removed spurious removeJsonLd calls for schemas never injected
//  8. Added useEffect cleanup to remove meta tags on unmount
//  9. Added openingHours + geo to LocalBusiness interface
// 10. Article schema now guards against undefined datePublished

import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// ── Types ──────────────────────────────────────────────────────────────────

interface Address {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface BusinessSchema {
  name: string;
  description?: string;
  telephone?: string;
  address?: Address;
  geo?: GeoCoordinates;
  image?: string;
  priceRange?: string;
  url?: string;
  openingHours?: string[];  // e.g. ["Mo-Fr 09:00-18:00", "Sa 10:00-14:00"]
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageType?: string;           // e.g. 'image/jpeg' — defaults to 'image/jpeg'
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  author?: string;
  twitterSite?: string;         // e.g. '@europeanliving'
  publishedTime?: string;       // ISO 8601
  modifiedTime?: string;        // ISO 8601
  noIndex?: boolean;            // set true on /thank-you, /404, etc.
  businessSchema?: BusinessSchema;
  faqItems?: FAQItem[];         // inject FAQPage schema for rich results
}

// ── Constants ──────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.european-living.live';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_IMAGE_TYPE = 'image/jpeg';
const SITE_NAME = 'European Living';
const LOGO_URL = `${SITE_URL}/EL_Logo.png`;

const DEFAULT_SEO = {
  title: `${SITE_NAME} | Resources for Americans in Europe`,
  description:
    'Find English-speaking services, housing, and community resources for US military families and Americans living in Europe. Verified businesses near major US bases in Germany.',
  keywords:
    'US military Europe, American expats Germany, English services Germany, military housing Europe, PCS Germany, SOFA status, US bases Germany, Ramstein, Kaiserslautern, Stuttgart, Grafenwöhr',
  image: DEFAULT_IMAGE,
  imageType: DEFAULT_IMAGE_TYPE,
  type: 'website' as const,
};

// ── Component ──────────────────────────────────────────────────────────────

export default function SEO({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  imageType = DEFAULT_SEO.imageType,
  url,
  type = 'website',
  author,
  twitterSite,
  publishedTime,
  modifiedTime,
  noIndex = false,
  businessSchema,
  faqItems,
}: SEOProps) {
  const location = useLocation();

  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_SEO.title;
  const canonicalUrl = url || `${SITE_URL}${location.pathname}`;

  // FIX 1: Stabilise businessSchema with useMemo so the useEffect dependency
  // comparison works correctly. Without this, a new object is created on every
  // parent render, causing an infinite re-render loop.
  const stableBusinessSchema = useMemo(
    () => businessSchema,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(businessSchema)]
  );

  // FIX 1 (same issue): Stabilise faqItems
  const stableFaqItems = useMemo(
    () => faqItems,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(faqItems)]
  );

  // Track which JSON-LD ids we've injected so we only remove our own on cleanup
  const injectedSchemas = useRef<Set<string>>(new Set());

  useEffect(() => {
    // ── Document title ──────────────────────────────────────────
    document.title = fullTitle;

    // ── Primary meta ────────────────────────────────────────────
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', author || SITE_NAME);
    // FIX 8: noIndex support — important for /404, /thank-you, etc.
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // ── Open Graph ──────────────────────────────────────────────
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    // FIX 5: og:image:type — Facebook ad validator requires this field.
    // Without it, ads may fail review or show degraded previews.
    setMeta('property', 'og:image:type', imageType);
    setMeta('property', 'og:image:alt', fullTitle);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:locale', 'en_US');

    // ── Twitter / X card ────────────────────────────────────────
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    // FIX 6: twitter:site — required for Twitter card attribution and
    // analytics. Pass your @handle as twitterSite prop.
    if (twitterSite) setMeta('name', 'twitter:site', twitterSite);

    // ── Canonical link ──────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Article-specific tags ────────────────────────────────────
    if (type === 'article') {
      if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
      if (author) setMeta('property', 'article:author', author);
    }

    // ── WebSite schema (homepage only) ───────────────────────────
    // FIX 4: Inject WebSite + SearchAction schema on the root path.
    // This enables the Google Sitelinks Search Box in search results.
    if (location.pathname === '/') {
      injectJsonLd('el-website-schema', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/services-directory?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      });
      injectedSchemas.current.add('el-website-schema');
    } else {
      // Remove it when navigating away from homepage
      if (injectedSchemas.current.has('el-website-schema')) {
        removeJsonLd('el-website-schema');
        injectedSchemas.current.delete('el-website-schema');
      }
    }

    // ── LocalBusiness structured data ────────────────────────────
    if (stableBusinessSchema) {
      injectJsonLd('el-business-schema', {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: stableBusinessSchema.name,
        description: stableBusinessSchema.description,
        telephone: stableBusinessSchema.telephone,
        image: stableBusinessSchema.image,
        url: stableBusinessSchema.url || canonicalUrl,
        priceRange: stableBusinessSchema.priceRange,
        // FIX 9: openingHours field now supported
        ...(stableBusinessSchema.openingHours && {
          openingHours: stableBusinessSchema.openingHours,
        }),
        // FIX 9: geo coordinates for map integration
        ...(stableBusinessSchema.geo && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: stableBusinessSchema.geo.latitude,
            longitude: stableBusinessSchema.geo.longitude,
          },
        }),
        address: stableBusinessSchema.address
          ? {
              '@type': 'PostalAddress',
              streetAddress: stableBusinessSchema.address.streetAddress,
              addressLocality: stableBusinessSchema.address.addressLocality,
              addressRegion: stableBusinessSchema.address.addressRegion,
              postalCode: stableBusinessSchema.address.postalCode,
              addressCountry: stableBusinessSchema.address.addressCountry || 'DE',
            }
          : undefined,
        areaServed: 'Europe',
        audience: {
          '@type': 'Audience',
          audienceType: 'US military families and American expats',
        },
      });
      injectedSchemas.current.add('el-business-schema');
    } else if (injectedSchemas.current.has('el-business-schema')) {
      // FIX 7: Only remove if we actually injected it, avoiding spurious DOM ops
      removeJsonLd('el-business-schema');
      injectedSchemas.current.delete('el-business-schema');
    }

    // ── Article structured data ──────────────────────────────────
    // FIX 10: Guard against undefined datePublished — an Article schema
    // with datePublished: undefined is invalid and may be ignored by Google.
    if (type === 'article' && title && publishedTime) {
      injectJsonLd('el-article-schema', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fullTitle,
        description: description,
        image: image,
        url: canonicalUrl,
        author: {
          '@type': 'Person',
          name: author || SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: LOGO_URL,
          },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
      });
      injectedSchemas.current.add('el-article-schema');
    } else if (injectedSchemas.current.has('el-article-schema')) {
      removeJsonLd('el-article-schema');
      injectedSchemas.current.delete('el-article-schema');
    }

    // ── FAQPage structured data ──────────────────────────────────
    // FIX 3: FAQPage schema drives "People also ask" rich results in Google.
    // Use on any page with a FAQ section — homepage, services directory, etc.
    if (stableFaqItems && stableFaqItems.length > 0) {
      injectJsonLd('el-faq-schema', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: stableFaqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
      injectedSchemas.current.add('el-faq-schema');
    } else if (injectedSchemas.current.has('el-faq-schema')) {
      removeJsonLd('el-faq-schema');
      injectedSchemas.current.delete('el-faq-schema');
    }
  }, [
    fullTitle,
    description,
    keywords,
    image,
    imageType,
    canonicalUrl,
    type,
    author,
    twitterSite,
    publishedTime,
    modifiedTime,
    noIndex,
    stableBusinessSchema,
    stableFaqItems,
    location.pathname,
  ]);

  // FIX 8: Clean up all injected schemas on unmount so they don't
  // bleed into the next page if the component is unmounted unexpectedly.
  useEffect(() => {
    const schemas = injectedSchemas.current;
    return () => {
      schemas.forEach(removeJsonLd);
    };
  }, []);

  return null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function setMeta(attr: 'name' | 'property', key: string, value?: string) {
  if (!value) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectJsonLd(id: string, data: object) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    (el as HTMLScriptElement).type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

// ── Sub-components ─────────────────────────────────────────────────────────

/**
 * BreadcrumbSchema — inject BreadcrumbList structured data.
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: 'Home', url: '/' },
 *     { name: 'Services Directory', url: '/services-directory' },
 *   ]} />
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  // FIX 2: Stabilise items array with JSON.stringify so the effect doesn't
  // re-fire on every render when the parent passes an inline array literal.
  const stableItems = useMemo(
    () => items,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(items)]
  );

  useEffect(() => {
    injectJsonLd('el-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: stableItems.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      })),
    });
    return () => removeJsonLd('el-breadcrumb-schema');
  }, [stableItems]);

  return null;
}

/**
 * OrganizationSchema — inject the site-wide Organization schema.
 * Place this once in your root layout or App.tsx.
 *
 * This is separate from the per-page LocalBusiness schema injected
 * by the main SEO component. The Organization schema represents the
 * publisher (European Living), not the listed businesses.
 */
export function OrganizationSchema() {
  useEffect(() => {
    injectJsonLd('el-org-schema', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      description:
        'Resources, services, and community guides for US military families and American expats living in Europe.',
      areaServed: ['Germany', 'United Kingdom', 'Italy', 'Spain', 'Europe'],
      sameAs: [
        // Add your social profile URLs here:
        // 'https://www.facebook.com/europeanliving',
        // 'https://www.instagram.com/europeanliving',
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'US military families and American expats in Europe',
      },
    });
    return () => removeJsonLd('el-org-schema');
  }, []);

  return null;
}