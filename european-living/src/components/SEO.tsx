// src/components/SEO.tsx
// Enhanced SEO component with full Open Graph, per-page structured data,
// and canonical URL management.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  // Structured data for LocalBusiness pages
  businessSchema?: {
    name: string;
    description?: string;
    telephone?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
    image?: string;
    priceRange?: string;
    url?: string;
  };
}

const SITE_URL = 'https://european-living.live';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_SEO = {
  title: 'European Living | Resources for Americans in Europe',
  description:
    'Find English-speaking services, housing, and community resources for US military families and Americans living in Europe. Verified businesses near major US bases in Germany.',
  keywords:
    'US military Europe, American expats Germany, English services Germany, military housing Europe, PCS Germany, SOFA status, US bases Germany, Ramstein, Kaiserslautern, Stuttgart, Grafenwöhr',
  image: DEFAULT_IMAGE,
  type: 'website' as const,
};

export default function SEO({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  businessSchema,
}: SEOProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} | European Living`
    : DEFAULT_SEO.title;

  // Always use the canonical site URL — never window.location which may
  // contain GitHub Pages redirect artifacts in the query string.
  const canonicalUrl = url || `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // ── Document title ──────────────────────────────────────────
    document.title = fullTitle;

    // ── Primary meta ────────────────────────────────────────────
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', author || 'European Living');
    setMeta('name', 'robots', 'index, follow');

    // ── Open Graph ──────────────────────────────────────────────
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'European Living');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', fullTitle);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:locale', 'en_US');

    // ── Twitter / X card ────────────────────────────────────────
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // ── Canonical link ──────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Article-specific tags ────────────────────────────────────
    if (type === 'article') {
      if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
      if (author) setMeta('property', 'article:author', author);
    }

    // ── LocalBusiness structured data ────────────────────────────
    if (businessSchema) {
      injectJsonLd('el-business-schema', {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: businessSchema.name,
        description: businessSchema.description,
        telephone: businessSchema.telephone,
        image: businessSchema.image,
        url: businessSchema.url || canonicalUrl,
        priceRange: businessSchema.priceRange,
        address: businessSchema.address
          ? {
              '@type': 'PostalAddress',
              streetAddress: businessSchema.address.streetAddress,
              addressLocality: businessSchema.address.addressLocality,
              addressRegion: businessSchema.address.addressRegion,
              postalCode: businessSchema.address.postalCode,
              addressCountry: businessSchema.address.addressCountry || 'DE',
            }
          : undefined,
        areaServed: 'Europe',
        audience: {
          '@type': 'Audience',
          audienceType: 'US military families and American expats',
        },
      });
    } else {
      // Remove business schema when navigating away from a business page
      removeJsonLd('el-business-schema');
    }

    // ── Article structured data ──────────────────────────────────
    if (type === 'article' && title) {
      injectJsonLd('el-article-schema', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fullTitle,
        description: description,
        image: image,
        url: canonicalUrl,
        author: {
          '@type': 'Person',
          name: author || 'European Living',
        },
        publisher: {
          '@type': 'Organization',
          name: 'European Living',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/EL_Logo.png`,
          },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
      });
    } else {
      removeJsonLd('el-article-schema');
    }
  }, [
    fullTitle,
    description,
    keywords,
    image,
    canonicalUrl,
    type,
    author,
    publishedTime,
    modifiedTime,
    businessSchema,
  ]);

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
  el.textContent = JSON.stringify(data, null, 0);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

// ── Convenience: BreadcrumbList schema ─────────────────────────────────────
// Use this on any page that has a clear hierarchy.
// Example: <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Day Trips',url:'/day-trips'}]} />
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  useEffect(() => {
    injectJsonLd('el-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      })),
    });
    return () => removeJsonLd('el-breadcrumb-schema');
  }, [items]);

  return null;
}