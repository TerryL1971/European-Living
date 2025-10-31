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
}

interface ImageMapping {
  [oldPath: string]: string; // old path -> new Supabase URL
}

const imageMapping: ImageMapping = {};

// Helper: Generate slug from filename
function generateSlug(filename: string): string {
  return filename
    .replace('.md', '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper: Parse markdown frontmatter (if exists)
function parseFrontmatter(content: string): { metadata: Partial<ArticleMetadata>, body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, body: content };
  }
  
  const [, frontmatter, body] = match;
  const metadata: Partial<ArticleMetadata> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    if (key && value) {
      if (key === 'tags') {
        metadata.tags = value.split(',').map(t => t.trim());
      } else {
        (metadata as any)[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });
  
  return { metadata, body };
}

// Helper: Extract title from content
function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1];
  
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/i);
  if (titleMatch) return titleMatch[1];
  
  return 'Untitled Article';
}

// Helper: Generate excerpt
function generateExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/^#+ .+$/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
    .replace(/[*_~`]/g, '') // Remove formatting
    .trim();
  
  const firstParagraph = plainText.split('\n\n')[0];
  return firstParagraph.length > maxLength 
    ? firstParagraph.substring(0, maxLength) + '...'
    : firstParagraph;
}

// Helper: Calculate reading time
function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200); // 200 words per minute
}

// Helper: Determine category from filename/content
function determineCategory(filename: string, content: string): string {
  const lower = filename.toLowerCase();
  
  // Destinations
  if (['aachen', 'amsterdam', 'barcelona', 'berlin', 'budapest', 'cologne', 
       'frankfurt', 'lisbon', 'london', 'munich', 'paris', 'prague', 
       'rome', 'stuttgart', 'vienna'].some(city => lower.includes(city))) {
    return 'Destinations';
  }
  
  // Practical Guides
  if (lower.includes('banking') || lower.includes('budgeting') || 
      lower.includes('registering') || lower.includes('staying-connected') ||
      lower.includes('driving') || lower.includes('transportation')) {
    return 'Practical Guides';
  }
  
  // Cultural
  if (lower.includes('etiquette') || lower.includes('cultural') || 
      lower.includes('phrases')) {
    return 'Cultural Tips';
  }
  
  // Travel
  if (lower.includes('accommodations') || lower.includes('hidden-gems') || 
      lower.includes('day-trips')) {
    return 'Travel Tips';
  }
  
  return 'General';
}

// Step 1: Upload all images to Supabase Storage
async function uploadImages() {
  console.log('📤 Step 1: Uploading images to Supabase Storage...\n');
  
  const imageFiles = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  console.log(`Found ${imageFiles.length} images to upload\n`);
  
  for (const filename of imageFiles) {
    try {
      const filePath = path.join(IMAGES_DIR, filename);
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(filename);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      const newFilename = `${hash}${ext}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(`articles/${newFilename}`, fileBuffer, {
          contentType: `image/${ext.replace('.', '')}`,
          upsert: true
        });
      
      if (error && error.message !== 'The resource already exists') {
        throw error;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(`articles/${newFilename}`);
      
      // Map old path to new URL
      imageMapping[`/images/${filename}`] = urlData.publicUrl;
      imageMapping[`./images/${filename}`] = urlData.publicUrl;
      imageMapping[`../public/images/${filename}`] = urlData.publicUrl;
      
      console.log(`✓ ${filename} → ${newFilename}`);
    } catch (error: any) {
      console.error(`✗ Failed to upload ${filename}:`, error.message);
    }
  }
  
  console.log(`\n✓ Uploaded ${Object.keys(imageMapping).length / 3} unique images\n`);
  
  // Save mapping for reference
  fs.writeFileSync('./image-mapping.json', JSON.stringify(imageMapping, null, 2));
  console.log('✓ Saved image mapping to image-mapping.json\n');
}

// Step 2: Process and insert articles
async function migrateArticles() {
  console.log('📝 Step 2: Processing and inserting articles...\n');
  
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} markdown files\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const filename of files) {
    try {
      const filePath = path.join(CONTENT_DIR, filename);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      
      // Parse frontmatter if exists
      const { metadata, body } = parseFrontmatter(rawContent);
      
      // Generate slug
      const slug = metadata.slug || generateSlug(filename);
      
      // Extract or generate title
      const title = metadata.title || extractTitle(body);
      
      // Determine category
      const category = metadata.category || determineCategory(filename, body);
      
      // Replace image paths with Supabase URLs
      let processedContent = body;
      Object.entries(imageMapping).forEach(([oldPath, newUrl]) => {
        processedContent = processedContent.replace(new RegExp(oldPath, 'g'), newUrl);
      });
      
      // Generate excerpt
      const excerpt = generateExcerpt(processedContent);
      
      // Calculate reading time
      const readingTime = calculateReadingTime(processedContent);
      
      // Determine destination name for city guides
      const destinationName = category === 'Destinations' 
        ? title.replace(' Guide', '').replace('Guide to ', '').trim()
        : null;
      
      // Prepare article data
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
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select();
      
      if (error) throw error;
      
      console.log(`✓ ${title} (${slug})`);
      successCount++;
      
    } catch (error: any) {
      console.error(`✗ Failed: ${filename} - ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✓ Success: ${successCount}`);
  console.log(`   ✗ Failed: ${failCount}`);
  console.log(`   📄 Total: ${files.length}\n`);
}

// Main execution
async function main() {
  console.log('🚀 Starting Article Migration to Supabase\n');
  console.log('=' .repeat(50) + '\n');
  
  try {
    // Step 1: Upload images
    await uploadImages();
    
    // Step 2: Migrate articles
    await migrateArticles();
    
    console.log('=' .repeat(50));
    console.log('✅ Migration Complete!\n');
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
main();