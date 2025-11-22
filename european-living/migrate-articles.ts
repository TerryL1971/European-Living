// migrate-articles.ts
// Run with: npx tsx migrate-articles.ts
// Location: Save this in the european-living/ folder (same level as package.json)

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from 'dotenv';

// Load .env.local file
config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const CONTENT_DIR = './src/data/content';
const IMAGES_DIR = './public/images';
const STORAGE_BUCKET = 'images';

interface ArticleMetadata {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  destination_name?: string;
  tags?: string[];
  author?: string;
}

interface ImageMapping {
  [oldPath: string]: string;
}

const imageMapping: ImageMapping = {};

function generateSlug(filename: string): string {
  return filename
    .replace('.md', '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontmatter(content: string): { metadata: Partial<ArticleMetadata>; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, body: content };
  }

  const [, frontmatter, body] = match;
  const metadata: Partial<ArticleMetadata> = {};

  frontmatter.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    if (key && value) {
      if (key === 'tags') {
        metadata.tags = value.split(',').map((t) => t.trim());
      } else {
        (metadata as Record<string, string>)[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return { metadata, body };
}

function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1];

  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/i);
  if (titleMatch) return titleMatch[1];

  return 'Untitled Article';
}

function generateExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/^#+ .+$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .trim();

  const firstParagraph = plainText.split('\n\n')[0];
  return firstParagraph.length > maxLength
    ? `${firstParagraph.substring(0, maxLength)}...`
    : firstParagraph;
}

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

function determineCategory(filename: string): string {
  const lower = filename.toLowerCase();

  if (
    [
      'aachen',
      'amsterdam',
      'barcelona',
      'berlin',
      'budapest',
      'cologne',
      'frankfurt',
      'lisbon',
      'london',
      'munich',
      'paris',
      'prague',
      'rome',
      'stuttgart',
      'vienna',
    ].some((city) => lower.includes(city))
  ) {
    return 'Destinations';
  }

  if (
    lower.includes('banking') ||
    lower.includes('budgeting') ||
    lower.includes('registering') ||
    lower.includes('staying-connected') ||
    lower.includes('driving') ||
    lower.includes('transportation')
  ) {
    return 'Practical Guides';
  }

  if (lower.includes('etiquette') || lower.includes('cultural') || lower.includes('phrases')) {
    return 'Cultural Tips';
  }

  if (
    lower.includes('accommodations') ||
    lower.includes('hidden-gems') ||
    lower.includes('day-trips')
  ) {
    return 'Travel Tips';
  }

  return 'General';
}

async function uploadImages(): Promise<void> {
  console.log('📤 Step 1: Uploading images to Supabase Storage...\n');

  const imageFiles = fs
    .readdirSync(IMAGES_DIR)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to upload\n`);

  for (const filename of imageFiles) {
    try {
      const filePath = path.join(IMAGES_DIR, filename);
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(filename);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      const newFilename = `${hash}${ext}`;

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(`articles/${newFilename}`, fileBuffer, {
          contentType: `image/${ext.replace('.', '')}`,
          upsert: true,
        });

      if (error && error.message !== 'The resource already exists') {
        throw new Error(error.message);
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(`articles/${newFilename}`);

      imageMapping[`/images/${filename}`] = urlData.publicUrl;
      imageMapping[`./images/${filename}`] = urlData.publicUrl;
      imageMapping[`../public/images/${filename}`] = urlData.publicUrl;

      console.log(`✓ ${filename} → ${newFilename}`);
    } catch (err) {
      const error = err as Error;
      console.error(`✗ Failed to upload ${filename}: ${error.message}`);
    }
  }

  console.log(`\n✓ Uploaded ${Object.keys(imageMapping).length / 3} unique images\n`);
  fs.writeFileSync('./image-mapping.json', JSON.stringify(imageMapping, null, 2));
  console.log('✓ Saved image mapping to image-mapping.json\n');
}

async function migrateArticles(): Promise<void> {
  console.log('📝 Step 2: Processing and inserting articles...\n');

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.md'));

  console.log(`Found ${files.length} markdown files\n`);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const filename of files) {
    try {
      const filePath = path.join(CONTENT_DIR, filename);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      const { metadata, body } = parseFrontmatter(rawContent);

      const slug = metadata.slug || generateSlug(filename);
      
      // Check if article already exists
      const { data: existing } = await supabase
        .from('articles')
        .select('id, slug')
        .eq('slug', slug)
        .single();

      if (existing) {
        console.log(`⊘ Skipped: ${slug} (already exists)`);
        skippedCount++;
        continue;
      }

      const title = metadata.title || extractTitle(body);
      const category = metadata.category || determineCategory(filename);

      let processedContent = body;
      for (const [oldPath, newUrl] of Object.entries(imageMapping)) {
        processedContent = processedContent.replaceAll(oldPath, newUrl);
      }

      const excerpt = generateExcerpt(processedContent);
      const readingTime = calculateReadingTime(processedContent);

      const destinationName =
        category === 'Destinations'
          ? title.replace(' Guide', '').replace('Guide to ', '').trim()
          : null;

      const articleData = {
        slug,
        title,
        subtitle: metadata.subtitle || null,
        category,
        content: processedContent,
        excerpt,
        author: metadata.author || 'European Living',
        destination_name: destinationName,
        tags: metadata.tags || [category],
        published: true,
        reading_time_minutes: readingTime,
      };

      const { error } = await supabase.from('articles').insert(articleData).select();

      if (error) throw new Error(error.message);

      console.log(`✓ ${title} (${slug})`);
      successCount++;
    } catch (err) {
      const error = err as Error;
      console.error(`✗ Failed: ${filename} - ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✓ Success: ${successCount}`);
  console.log(`   ⊘ Skipped: ${skippedCount}`);
  console.log(`   ✗ Failed: ${failCount}`);
  console.log(`   📄 Total: ${files.length}\n`);
}

async function cleanupDuplicates(): Promise<void> {
  console.log('🧹 Step 0: Checking for and removing duplicates...\n');

  try {
    // Find duplicates
    const { data: duplicates, error: queryError } = await supabase.rpc('find_duplicate_slugs');

    if (queryError) {
      console.log('⚠️  Could not check for duplicates (this is OK on first run)');
      return;
    }

    if (!duplicates || duplicates.length === 0) {
      console.log('✓ No duplicates found\n');
      return;
    }

    console.log(`Found ${duplicates.length} duplicate slugs. Removing older entries...\n`);

    for (const dup of duplicates) {
      // Keep the most recent, delete the rest
      const { error: deleteError } = await supabase
        .from('articles')
        .delete()
        .eq('slug', dup.slug)
        .not('id', 'eq', dup.latest_id);

      if (deleteError) {
        console.error(`✗ Failed to remove duplicates for ${dup.slug}`);
      } else {
        console.log(`✓ Removed duplicates for ${dup.slug}`);
      }
    }

    console.log('\n✓ Cleanup complete\n');
  } catch {
    console.log('⚠️  Could not clean duplicates (this is OK on first run)\n');
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Article Migration to Supabase\n');
  console.log('='.repeat(50) + '\n');

  try {
    await cleanupDuplicates();
    await uploadImages();
    await migrateArticles();
    console.log('='.repeat(50));
    console.log('✅ Migration Complete!\n');
    console.log('💡 You can now safely remove local /public/images and /src/data/content folders\n');
  } catch (err) {
    const error = err as Error;
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

main();