import * as path from 'path';
import * as dotenv from 'dotenv';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// -------------------- Load .env.local --------------------
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// -------------------- Validate required env vars --------------------
const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-01-01';
const useCdn = process.env.VITE_SANITY_USE_CDN === 'true';
const writeToken = process.env.VITE_SANITY_WRITE_TOKEN;

if (!projectId) throw new Error('❌ Missing VITE_SANITY_PROJECT_ID in .env.local');
if (!dataset) throw new Error('❌ Missing VITE_SANITY_DATASET in .env.local');
if (!writeToken) throw new Error('❌ Missing VITE_SANITY_WRITE_TOKEN in .env.local');

// -------------------- Sanity Clients --------------------

// Read-only client (optional)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

// Write-enabled client (used in migration)
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

// -------------------- Image URL builder --------------------
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// -------------------- TypeScript interfaces --------------------
export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
  caption?: string;
}

export interface PhraseCategory {
  _id: string;
  _type?: string;
  name: string;
  slug: { current: string };
  icon?: string;
  sortOrder: number;
  description?: string;
}

export interface Phrase {
  _id: string;
  _type?: string;
  english: string;
  category: PhraseCategory;
  translations: Array<{ language: string; translation: string; pronunciation: string }>;
  icon?: string;
  sortOrder?: number;
}

export interface Article {
  _id: string;
  _type?: string;
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
  _type?: string;
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
