// src/services/phraseService.ts
import { supabase } from './supabaseClient';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

export interface PhraseTranslation {
  id: string;
  category_id: string;
  english: string;
  language_code: string;
  translation: string;
  pronunciation: string;
  icon: string | null;
  sort_order: number;
}

export interface GroupedPhrase {
  english: string;
  icon: string | null;
  sort_order: number;
  translations: {
    [languageCode: string]: {
      text: string;
      pronunciation: string;
    };
  };
}

export const languages: Language[] = [
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
];

class PhraseService {
  // Fetch all categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('phrase_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  }

  // Fetch phrases for a specific category
  async getPhrasesByCategory(categoryId: string): Promise<GroupedPhrase[]> {
    console.log('📥 Querying Supabase for category:', categoryId);
    
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    console.log('📊 Raw data from Supabase:', data);
    console.log('❌ Error (if any):', error);

    if (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }

    // Group phrases by English text
    const grouped = this.groupPhrases(data || []);
    console.log('📦 Grouped phrases:', grouped);
    return grouped;
  }

  // Fetch all phrases (for all categories)
  async getAllPhrases(): Promise<{ [categoryId: string]: GroupedPhrase[] }> {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .order('category_id', { ascending: true })
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching all phrases:', error);
      throw error;
    }

    // Group by category, then by English phrase
    const phrasesByCategory: { [categoryId: string]: GroupedPhrase[] } = {};
    
    const allPhrases = data || [];
    const categoriesSet = new Set(allPhrases.map(p => p.category_id));
    
    categoriesSet.forEach(categoryId => {
      const categoryPhrases = allPhrases.filter(p => p.category_id === categoryId);
      phrasesByCategory[categoryId] = this.groupPhrases(categoryPhrases);
    });

    return phrasesByCategory;
  }

  // Search phrases across all categories
  async searchPhrases(query: string, languageCode?: string): Promise<GroupedPhrase[]> {
    let dbQuery = supabase
      .from('phrases')
      .select('*');

    if (languageCode) {
      dbQuery = dbQuery.eq('language_code', languageCode);
    }

    // Search in English or translation
    dbQuery = dbQuery.or(`english.ilike.%${query}%,translation.ilike.%${query}%`);

    const { data, error } = await dbQuery;

    if (error) {
      console.error('Error searching phrases:', error);
      throw error;
    }

    return this.groupPhrases(data || []);
  }

  // Helper function to group phrases by English text
  private groupPhrases(phrases: PhraseTranslation[]): GroupedPhrase[] {
    const groupedMap = new Map<string, GroupedPhrase>();

    phrases.forEach(phrase => {
      if (!groupedMap.has(phrase.english)) {
        groupedMap.set(phrase.english, {
          english: phrase.english,
          icon: phrase.icon,
          sort_order: phrase.sort_order,
          translations: {}
        });
      }

      const grouped = groupedMap.get(phrase.english)!;
      grouped.translations[phrase.language_code] = {
        text: phrase.translation,
        pronunciation: phrase.pronunciation
      };
    });

    return Array.from(groupedMap.values()).sort((a, b) => a.sort_order - b.sort_order);
  }

  // Get a single phrase by English text
  async getPhraseByEnglish(englishText: string): Promise<GroupedPhrase | null> {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .eq('english', englishText);

    if (error) {
      console.error('Error fetching phrase:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const grouped = this.groupPhrases(data);
    return grouped[0] || null;
  }
}

export const phraseService = new PhraseService();