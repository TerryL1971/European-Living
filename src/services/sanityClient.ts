import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ---------- Read-only client (browser safe) ----------
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true',
})

// ---------- Write-enabled client (server-only) ----------
export const sanityWriteClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, // DO NOT expose to client
})

// ---------- Image URL builder ----------
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// ---------- TypeScript interfaces ----------
export interface PhraseCategory {
  _id: string;
  name: string;
  slug: { current: string };
  icon?: string;
  sortOrder: number;
  description?: string;
}

export interface Phrase {
  _id: string;
  english: string;
  category: PhraseCategory;
  translations: Array<{
    language: string;
    translation: string;
    pronunciation: string;
  }>;
  icon?: string;
  sortOrder?: number;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: SanityImage;
  content: Array<{ _type: string; [key: string]: unknown }>;
  category?: string;
  publishedAt: string;
  author?: string;
}

export interface Destination {
  _id: string;
  name: string;
  slug: { current: string };
  tagline: string;
  description: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  content: Array<{ _type: string; [key: string]: unknown }>;
  highlights?: string[];
  bestTimeToVisit?: string;
  gettingThere?: string;
  location?: { lat: number; lng: number };
  country: string;
  featured: boolean;
}
