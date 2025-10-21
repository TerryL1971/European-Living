import * as path from 'path';
import * as dotenv from 'dotenv';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { sanityWriteClient as sanityClient } from '../services/sanityClient';
import type { PhraseCategory, Phrase, Article, Destination, SanityImage } from '../services/sanityClient';

// -------------------- Load .env.local --------------------
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// -------------------- Debug env --------------------
console.log('projectId:', process.env.VITE_SANITY_PROJECT_ID);
console.log('dataset:', process.env.VITE_SANITY_DATASET);
console.log('write token:', process.env.VITE_SANITY_WRITE_TOKEN?.slice(0, 8) + '...');

// -------------------- Supabase --------------------
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// -------------------- Migrate Phrase Categories --------------------
async function migratePhraseCategories() {
  console.log('📦 Migrating phrase categories...');
  const { data: categories, error } = await supabase
    .from('phrase_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!categories?.length) return console.log('No categories found');

  for (const category of categories) {
    const doc: PhraseCategory & { _type: string } = {
      _type: 'phraseCategory',
      _id: `phraseCategory-${category.id}`,
      name: category.name,
      slug: { current: category.id.toString() },
      icon: category.icon ?? undefined,
      sortOrder: category.sort_order ?? 0,
      description: category.description ?? undefined,
    };

    await sanityClient.createOrReplace(doc);
    console.log(`✅ ${category.name}`);
  }

  console.log('✨ Phrase categories done!\n');
}

// -------------------- Migrate Phrases --------------------
async function migratePhrases() {
  console.log('💬 Migrating phrases...');
  const { data: phrases, error } = await supabase.from('phrases').select('*');
  if (error || !phrases?.length) return console.log('No phrases found');

  const phraseMap = new Map<string, Omit<Phrase, '_type'>>();
  phrases.forEach((p) => {
    const key = `${p.category_id}-${p.english}`;
    if (!phraseMap.has(key)) {
      phraseMap.set(key, {
        _id: `phrase-${key.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}`,
        english: p.english,
        category: { _id: `phraseCategory-${p.category_id}`, name: '', slug: { current: p.category_id.toString() }, sortOrder: 0 },
        translations: [],
        icon: p.icon ?? undefined,
        sortOrder: p.sort_order ?? undefined,
      });
    }

    phraseMap.get(key)?.translations.push({
      language: p.language_code,
      translation: p.translation,
      pronunciation: p.pronunciation,
    });
  });

  let count = 0;
  for (const [, data] of phraseMap) {
    const doc: Phrase & { _type: string } = { ...data, _type: 'phrase' };
    await sanityClient.createOrReplace(doc);
    count++;
    if (count % 50 === 0) console.log(`  ✅ ${count} phrases...`);
  }

  console.log(`✨ Migrated ${count} phrases\n`);
}

// -------------------- Migrate Articles --------------------
async function migrateArticles() {
  console.log('📰 Migrating articles...');
  const { data: articles, error } = await supabase.from('articles').select('*');
  if (error || !articles?.length) return console.log('No articles found');

  for (const a of articles) {
    const doc: Article & { _type: string } = {
      _type: 'article',
      _id: `article-${a.id}`,
      title: a.title,
      slug: { current: a.slug },
      excerpt: a.excerpt,
      mainImage: a.mainImage as SanityImage | undefined,
      content: a.content ?? [],
      category: a.category ?? undefined,
      publishedAt: a.published_at,
      author: a.author ?? undefined,
    };

    await sanityClient.createOrReplace(doc);
    console.log(`✅ ${a.title}`);
  }

  console.log('✨ Articles done!\n');
}

// -------------------- Migrate Destinations --------------------
async function migrateDestinations() {
  console.log('🗺️ Migrating destinations...');
  const { data: destinations, error } = await supabase.from('destinations').select('*');
  if (error || !destinations?.length) return console.log('No destinations found');

  for (const d of destinations) {
    const doc: Destination & { _type: string } = {
      _type: 'destination',
      _id: `destination-${d.id}`,
      name: d.name,
      slug: { current: d.slug },
      tagline: d.tagline,
      description: d.description,
      heroImage: d.heroImage as SanityImage | undefined,
      gallery: d.gallery as SanityImage[] | undefined,
      content: d.content ?? [],
      highlights: d.highlights ?? undefined,
      bestTimeToVisit: d.best_time_to_visit ?? undefined,
      gettingThere: d.getting_there ?? undefined,
      location: d.location ?? undefined,
      country: d.country,
      featured: d.featured,
    };

    await sanityClient.createOrReplace(doc);
    console.log(`✅ ${d.name}`);
  }

  console.log('✨ Destinations done!\n');
}

// -------------------- Run Migration --------------------
async function run() {
  console.log('🚀 Starting migration...\n');
  try {
    await migratePhraseCategories();
    await migratePhrases();
    await migrateArticles();
    await migrateDestinations();
    console.log('🎉 Migration complete!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

run();
