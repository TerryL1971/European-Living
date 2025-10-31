// src/services/articleService.ts
import { supabase } from './supabaseClient';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  content: string;
  excerpt?: string;
  author?: string;
  featured_image_url?: string;
  destination_name?: string;
  tags?: string[];
  published: boolean;
  view_count: number;
  reading_time_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface ArticleFilters {
  category?: string;
  destination?: string;
  tag?: string;
  published?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Fetch all articles with optional filters
 */
export async function getArticles(filters?: ArticleFilters): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.destination) {
    query = query.eq('destination_name', filters.destination);
  }
  
  if (filters?.tag) {
    query = query.contains('tags', [filters.tag]);
  }
  
  if (filters?.published !== undefined) {
    query = query.eq('published', filters.published);
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
  
  return data as Article[];
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching article:', error);
    throw error;
  }
  
  // Increment view count (fire and forget)
  incrementViewCount(data.id);
  
  return data as Article;
}

/**
 * Increment article view count
 */
async function incrementViewCount(articleId: string): Promise<void> {
  try {
    await supabase.rpc('increment_article_views', { article_id: articleId });
  } catch (error: unknown) {
    const err = error as Error;
    console.warn('RPC increment_article_views failed, using fallback:', err.message);

    // Fallback if RPC function doesn't exist
    const { data } = await supabase
      .from('articles')
      .select('view_count')
      .eq('id', articleId)
      .single();

    if (data) {
      await supabase
        .from('articles')
        .update({ view_count: data.view_count + 1 })
        .eq('id', articleId);
    }
  }
}


/**
 * Search articles by keyword
 */
export async function searchArticles(searchTerm: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .eq('published', true)
    .order('view_count', { ascending: false })
    .limit(20);
  
  if (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
  
  return data as Article[];
}

/**
 * Get featured/popular articles
 */
export async function getFeaturedArticles(limit: number = 5): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('view_count', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching featured articles:', error);
    throw error;
  }
  
  return data as Article[];
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return getArticles({ category, published: true });
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .eq('published', true)
    .not('category', 'is', null);
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  const categories = [...new Set(data.map(item => item.category).filter(Boolean))] as string[];
  return categories;
}

/**
 * Get related articles based on category and tags
 */
export async function getRelatedArticles(
  currentArticleId: string,
  category?: string,
  tags?: string[],
  limit: number = 3
): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .neq('id', currentArticleId)
    .limit(limit);
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching related articles:', error);
    throw error;
  }
  
  return data as Article[];
}