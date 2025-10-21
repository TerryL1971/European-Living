import { getCliClient } from 'sanity/cli'
import { createClient } from '@supabase/supabase-js'

// CLI client with full permissions
const client = getCliClient()

const supabase = createClient(
  'https://pkacbcohrygpyapgtzpq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWNiY29ocnlncHlhcGd0enBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzc5NzEsImV4cCI6MjA3NTg1Mzk3MX0.BJZulmGejOPa5mv4jLUKqDamBdLyjDEBP2RVTswga8c'
)

// -------------------- Migrate Phrase Categories --------------------
async function migratePhraseCategories() {
  console.log('📦 Migrating categories...')
  
  const { data: categories } = await supabase
    .from('phrase_categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (!categories?.length) return

  for (const cat of categories) {
    await client.createOrReplace({
      _type: 'phraseCategory',
      _id: `phraseCategory-${cat.id}`,
      name: cat.name,
      slug: { _type: 'slug', current: cat.id },
      icon: cat.icon,
      sortOrder: cat.sort_order
    })
    console.log(`✅ ${cat.icon} ${cat.name}`)
  }
}

// -------------------- Migrate Phrases --------------------
async function migratePhrases() {
  console.log('💬 Migrating phrases...')
  
  const { data: phrases } = await supabase.from('phrases').select('*')
  if (!phrases?.length) return

  const phraseMap = new Map()
  phrases.forEach(p => {
    const key = `${p.category_id}-${p.english}`
    if (!phraseMap.has(key)) {
      phraseMap.set(key, {
        english: p.english,
        categoryId: p.category_id,
        icon: p.icon,
        sortOrder: p.sort_order,
        translations: []
      })
    }
    phraseMap.get(key).translations.push({
      language: p.language_code,
      translation: p.translation,
      pronunciation: p.pronunciation
    })
  })

  let count = 0
  for (const [key, data] of phraseMap) {
    const cleanKey = key.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()
    await client.createOrReplace({
      _type: 'phrase',
      _id: `phrase-${cleanKey}`,
      english: data.english,
      category: { _type: 'reference', _ref: `phraseCategory-${data.categoryId}` },
      translations: data.translations,
      icon: data.icon,
      sortOrder: data.sortOrder
    })
    if (++count % 50 === 0) console.log(`  ✅ ${count} phrases...`)
  }
  console.log(`✨ Done! ${count} phrases`)
}

// -------------------- Migrate Articles --------------------
async function migrateArticles() {
  console.log('📰 Migrating articles...')

  const { data: articles } = await supabase.from('articles').select('*')
  if (!articles?.length) return

  for (const a of articles) {
    await client.createOrReplace({
      _type: 'article',
      _id: `article-${a.id}`,
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      excerpt: a.excerpt,
      mainImage: a.mainImage ?? undefined,
      content: a.content ?? [],
      category: a.category ?? undefined,
      publishedAt: a.published_at,
      author: a.author ?? undefined
    })
    console.log(`✅ ${a.title}`)
  }
}

// -------------------- Migrate Destinations --------------------
async function migrateDestinations() {
  console.log('🗺️ Migrating destinations...')

  const { data: destinations } = await supabase.from('destinations').select('*')
  if (!destinations?.length) return

  for (const d of destinations) {
    await client.createOrReplace({
      _type: 'destination',
      _id: `destination-${d.id}`,
      name: d.name,
      slug: { _type: 'slug', current: d.slug },
      tagline: d.tagline,
      description: d.description,
      heroImage: d.heroImage ?? undefined,
      gallery: d.gallery ?? undefined,
      content: d.content ?? [],
      highlights: d.highlights ?? undefined,
      bestTimeToVisit: d.best_time_to_visit ?? undefined,
      gettingThere: d.getting_there ?? undefined,
      location: d.location ?? undefined,
      country: d.country,
      featured: d.featured
    })
    console.log(`✅ ${d.name}`)
  }
}

// -------------------- Run Migration --------------------
async function run() {
  console.log('🚀 Starting migration...\n')
  await migratePhraseCategories()
  await migratePhrases()
  await migrateArticles()
  await migrateDestinations()
  console.log('\n🎉 Migration complete!')
}

run()
