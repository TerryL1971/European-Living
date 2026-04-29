// list-image-urls.js
// Utility script to list all public image URLs from Supabase storage.
// Run with: node list-image-urls.js
//
// Requires .env.local to have:
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

const supabaseUrl     = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const bucketName      = 'images';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listAllPublicUrls() {
  console.log(`\n--- Fetching ALL URLs from bucket: '${bucketName}' ---\n`);

  const allFileNames = [];
  let currentPage = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    console.log(`Fetching page ${currentPage + 1}...`);

    const { data: fileList, error: listError } = await supabase.storage
      .from(bucketName)
      .list('', {
        limit: limit,
        offset: currentPage * limit,
      });

    if (listError) {
      console.error('Error listing files:', listError.message);
      return;
    }

    const currentFiles = fileList.filter(
      (item) => item.name !== '.emptyFolderPlaceholder' && item.name !== ''
    );

    allFileNames.push(...currentFiles.map((file) => file.name));

    if (currentFiles.length < limit) {
      hasMore = false;
    } else {
      currentPage++;
    }
  }

  if (allFileNames.length === 0) {
    console.log('Bucket is empty or returned no files.');
    return;
  }

  const publicUrls = allFileNames.map((fileName) => {
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    return urlData?.publicUrl || `Error generating URL for: ${fileName}`;
  });

  console.log('--- Public URLs Found ---');
  publicUrls.forEach((url) => console.log(url));
  console.log(`\n--- Total ${publicUrls.length} URLs generated. ---\n`);
}

listAllPublicUrls();