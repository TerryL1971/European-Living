export interface PhraseCategory {
  _id: string
  _type: 'phraseCategory'
  title: string
  slug: { current: string }
  sortOrder?: number
}

export interface Phrase {
  _id: string
  _type: 'phrase'
  english: string
  category: PhraseCategory
  translations: Record<string, string>
  icon?: string
  sortOrder?: number
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  slug: { current: string }
  body?: unknown
  publishedAt?: string
  mainImage?: unknown
}

export interface Destination {
  _id: string
  _type: 'destination'
  name: string
  slug: { current: string }
  country?: string
  featured?: boolean
  description?: string
  mainImage?: unknown
}
