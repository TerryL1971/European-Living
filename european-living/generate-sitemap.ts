// generate-sitemap.ts
// Run with: npx tsx generate-sitemap.ts
// Location: Save this in the european-living/ folder (same level as package.json,
// right next to migrate-articles.ts)
//
// Regenerates public/sitemap.xml: keeps the hand-maintained static pages as-is,
// then appends one <url> per day_trips row and one <url> per "City Guides"
// article (the things that render at /destinations/:id) pulled live from
// Supabase. Safe to re-run any time content changes — it always rebuilds the
// whole file from scratch rather than patching it.

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env.local file (same pattern as migrate-articles.ts)
config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SITE_URL = 'https://www.european-living.live';
const OUTPUT_PATH = path.join('public', 'sitemap.xml');
const PAGE_SIZE = 1000; // PostgREST's default max rows per request

// ── Static pages — unchanged from the hand-maintained sitemap ─────────────
// If you add/remove a static route, edit this list. Everything below this
// block is generated automatically from Supabase on every run.
interface StaticEntry {
  comment: string;
  loc: string;
  changefreq: string;
  priority: string;
}

const STATIC_ENTRIES: StaticEntry[] = [
  { comment: 'Home', loc: '/', changefreq: 'weekly', priority: '1.0' },
  { comment: 'PCS Guide', loc: '/pcs-guide', changefreq: 'monthly', priority: '0.9' },
  { comment: 'Services Directory', loc: '/services-directory', changefreq: 'weekly', priority: '0.9' },
  { comment: 'Day Trips', loc: '/day-trips', changefreq: 'weekly', priority: '0.8' },
  { comment: 'Family Adventures', loc: '/family-adventures', changefreq: 'monthly', priority: '0.8' },
  { comment: 'Articles', loc: '/articles/pcs-germany-checklist', changefreq: 'monthly', priority: '0.9' },
  { comment: '', loc: '/articles/first-72-hours-germany', changefreq: 'monthly', priority: '0.8' },
  { comment: '', loc: '/articles/sofa-status-germany', changefreq: 'monthly', priority: '0.8' },
  { comment: '', loc: '/articles/banking-in-germany', changefreq: 'monthly', priority: '0.8' },
  { comment: '', loc: '/articles/buying-car-germany-military', changefreq: 'monthly', priority: '0.8' },
  { comment: '', loc: '/articles/renting-off-post-germany', changefreq: 'monthly', priority: '0.8' },
  { comment: 'About', loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { comment: 'Submit a Business', loc: '/submit-business', changefreq: 'monthly', priority: '0.6' },
  { comment: 'Legal', loc: '/impressum', changefreq: 'yearly', priority: '0.3' },
  { comment: '', loc: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
  { comment: '', loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { comment: '', loc: '/contact', changefreq: 'yearly', priority: '0.3' },
];

interface DayTripRow {
  id: string;
  updated_at: string | null;
}

interface CityGuideRow {
  slug: string;
  updated_at: string | null;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toLastmod(updatedAt: string | null): string | null {
  if (!updatedAt) return null;
  const d = new Date(updatedAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

/** Paginates through a table in chunks of PAGE_SIZE so this keeps working past 1k rows. */
async function fetchAll<T>(
  table: string,
  select: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyFilters?: (query: any) => any
): Promise<T[]> {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    let query = supabase.from(table).select(select);
    if (applyFilters) query = applyFilters(query);
    query = query.range(from, from + PAGE_SIZE - 1);

    const { data, error } = await query;
    if (error) {
      console.error(`❌ Error fetching ${table}:`, error.message);
      throw error;
    }
    if (!data || data.length === 0) break;

    rows.push(...(data as T[]));
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

function buildUrlBlock(loc: string, changefreq: string, priority: string, lastmod?: string | null, comment?: string): string {
  const lines: string[] = [];
  if (comment) lines.push(`  <!-- ${comment} -->`);
  lines.push('  <url>');
  lines.push(`    <loc>${SITE_URL}${escapeXml(loc)}</loc>`);
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

async function main() {
  console.log('📡 Fetching day_trips from Supabase...');
  const dayTrips = await fetchAll<DayTripRow>('day_trips', 'id, updated_at');
  console.log(`   → ${dayTrips.length} day trip(s) found`);

  console.log('📡 Fetching "City Guides" articles (destinations) from Supabase...');
  const cityGuides = await fetchAll<CityGuideRow>('articles', 'slug, updated_at', (q) =>
    q.eq('category', 'City Guides').eq('published', true)
  );
  console.log(`   → ${cityGuides.length} destination(s) found`);

  const blocks: string[] = [];

  for (const entry of STATIC_ENTRIES) {
    blocks.push(buildUrlBlock(entry.loc, entry.changefreq, entry.priority, null, entry.comment || undefined));
  }

  if (dayTrips.length > 0) {
    blocks.push('\n  <!-- Day Trip Detail Pages (auto-generated from Supabase: day_trips) -->');
  }
  for (const trip of dayTrips) {
    blocks.push(buildUrlBlock(`/day-trips/${trip.id}`, 'monthly', '0.6', toLastmod(trip.updated_at)));
  }

  if (cityGuides.length > 0) {
    blocks.push('\n  <!-- Destination Pages (auto-generated from Supabase: articles where category = City Guides) -->');
  }
  for (const guide of cityGuides) {
    blocks.push(buildUrlBlock(`/destinations/${guide.slug}`, 'monthly', '0.6', toLastmod(guide.updated_at)));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${blocks.join('\n\n')}\n\n</urlset>\n`;

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  const total = STATIC_ENTRIES.length + dayTrips.length + cityGuides.length;
  console.log(`✅ Wrote ${OUTPUT_PATH} with ${total} URLs`);
  console.log(`   (${STATIC_ENTRIES.length} static + ${dayTrips.length} day trips + ${cityGuides.length} destinations)`);
  console.log('👉 Don\'t forget to resubmit the sitemap in Google Search Console after deploying.');
}

main().catch((err) => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});