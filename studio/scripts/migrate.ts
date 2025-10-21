import { getCliClient } from 'sanity/cli'
import { createClient } from '@supabase/supabase-js'

// This runs with CLI authentication (full permissions)
const client = getCliClient()

const supabase = createClient(
  'https://pkacbcohrygpyapgtzpq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWNiY29ocnlncHlhcGd0enBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzc5NzEsImV4cCI6MjA3NTg1Mzk3MX0.BJZulmGejOPa5mv4jLUKqDamBdLyjDEBP2RVTswga8c'
)

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

async function run() {
  console.log('🚀 Starting...\n')
  await migratePhraseCategories()
  await migratePhrases()
  console.log('\n🎉 Success!')
}

run()