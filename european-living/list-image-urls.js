import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// ⭐ CONFIGURATION: UPDATE THESE THREE VALUES ⭐
// ------------------------------------------------------------------
const supabaseUrl = 'https://pkacbcohrygpyapgtzpq.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWNiY29ocnlncHlhcGd0enBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzc5NzEsImV4cCI6MjA3NTg1Mzk3MX0.BJZulmGejOPa5mv4jLUKqDamBdLyjDEBP2RVTswga8c'; 
const bucketName = 'images'; 
// ------------------------------------------------------------------

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listAllPublicUrls() {
  console.log(`\n--- Fetching ALL URLs from bucket: '${bucketName}' ---\n`);
  
  const allFileNames = [];
  let currentPage = 0;
  const limit = 100; // Supabase limit per request
  let hasMore = true;
  let nextToken = undefined;

  while (hasMore) {
    console.log(`Fetching page ${currentPage + 1}...`);
    
    // The .list() function uses limit and offset/token for pagination
    const { data: fileList, error: listError } = await supabase.storage
      .from(bucketName)
      .list('', {
        limit: limit,
        offset: currentPage * limit,
        search: nextToken // Optional: Supabase often uses offset, but token is for next cursor
      });

    if (listError) {
      console.error('Error listing files:', listError.message);
      return;
    }

    // Filter and collect file names
    const currentFiles = fileList
      .filter(item => item.name !== '.emptyFolderPlaceholder' && item.name !== '');
    
    // Add the names to our main array
    allFileNames.push(...currentFiles.map(file => file.name));

    // Check if we reached the end
    if (currentFiles.length < limit) {
      hasMore = false;
    } else {
      currentPage++;
    }
  }

  // ------------------------------------------------
  // 2. Generate Public URLs from the Complete List
  // ------------------------------------------------
  
  if (allFileNames.length === 0) {
    console.log('Bucket is empty or returned no files.');
    return;
  }
  
  const publicUrls = allFileNames.map(fileName => {
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
      
    return urlData?.publicUrl || `Error generating URL for: ${fileName}`;
  });

  // Print the full list for easy copying
  console.log('--- Public URLs Found ---');
  publicUrls.forEach(url => console.log(url));
  
  console.log(`\n--- Total ${publicUrls.length} URLs generated. ---\n`);
}

listAllPublicUrls();