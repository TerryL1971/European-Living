// src/components/SEO.tsx

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const DEFAULT_SEO = {
  title: 'European Living | Resources for Americans in Europe',
  description: 'Find English-speaking services, housing, and community resources for US military families and Americans living in Europe. Verified businesses near major US bases in Germany.',
  keywords: 'US military Europe, American expats Germany, English services Germany, military housing Europe, PCS Germany, SOFA status, US bases Germany',
  image: 'https://european-living.live/og-image.jpg',
  url: 'https://european-living.live',
  type: 'website' as const,
};

/**
 * SEO component to manage meta tags dynamically
 * Use this on every page for better SEO
 */
export default function SEO({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  url,
  type = DEFAULT_SEO.type,
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullTitle = title ? `${title} | European Living` : DEFAULT_SEO.title;
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : DEFAULT_SEO.url);

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', author || 'European Living');

    // Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', fullUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'European Living');

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('property', 'article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('property', 'article:modified_time', modifiedTime);
      }
    }

    // Canonical URL
    updateLinkTag('canonical', fullUrl);
  }, [fullTitle, description, keywords, image, fullUrl, type, author, publishedTime, modifiedTime]);

  return null; // This component doesn't render anything
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(attribute: 'name' | 'property', key: string, value?: string) {
  if (!value) return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
}

/**
 * Helper function to update or create link tags
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

/**
 * Generate structured data (JSON-LD) for better SEO
 */
export function generateStructuredData(data: {
  type: 'LocalBusiness' | 'Organization' | 'Article';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  telephone?: string;
  priceRange?: string;
}) {
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': data.type,
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
  };

  if (data.type === 'LocalBusiness') {
    structuredData.address = {
      '@type': 'PostalAddress',
      ...data.address,
    };
    structuredData.telephone = data.telephone;
    structuredData.priceRange = data.priceRange;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}