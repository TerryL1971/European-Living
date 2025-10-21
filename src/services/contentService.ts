import { sanityClient } from './sanityClient'
import { Phrase, PhraseCategory, Article, Destination } from '../types/sanity'

// Fetch all phrase categories
export async function getPhraseCategories(): Promise<PhraseCategory[]> {
  const query = `*[_type == "phraseCategory"] | order(sortOrder asc)`
  return await sanityClient.fetch(query)
}

// Fetch phrases by category
export async function getPhrasesByCategory(categorySlug: string): Promise<Phrase[]> {
  const query = `*[_type == "phrase" && category->slug.current == $slug] | order(sortOrder asc) {
    _id,
    english,
    category->,
    translations,
    icon,
    sortOrder
  }`
  return await sanityClient.fetch(query, { slug: categorySlug })
}

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "article"] | order(publishedAt desc)`
  return await sanityClient.fetch(query)
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article> {
  const query = `*[_type == "article" && slug.current == $slug][0]`
  return await sanityClient.fetch(query, { slug })
}

// Fetch all destinations
export async function getDestinations(): Promise<Destination[]> {
  const query = `*[_type == "destination"] | order(name asc)`
  return await sanityClient.fetch(query)
}

// Fetch featured destinations
export async function getFeaturedDestinations(): Promise<Destination[]> {
  const query = `*[_type == "destination" && featured == true] | order(name asc)`
  return await sanityClient.fetch(query)
}

// Fetch single destination by slug
export async function getDestinationBySlug(slug: string): Promise<Destination> {
  const query = `*[_type == "destination" && slug.current == $slug][0]`
  return await sanityClient.fetch(query, { slug })
}