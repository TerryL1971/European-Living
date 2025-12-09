// src/screens/ArticlesScreen.tsx - WITH DARK MODE SUPPORT

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';
import { useThemeColors } from '../contexts/ThemeContext';

interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string | null;
  content: string;
  excerpt: string | null;
  author: string | null;
  featured_image_url: string | null;
  destination_name: string | null;
  tags: string[] | null;
  published: boolean | null;
  view_count: number | null;
  reading_time_minutes: number | null;
  created_at: string | null;
  updated_at: string | null;
}

interface Props {
  navigation: any;
}

const ArticlesScreen: React.FC<Props> = ({ navigation }) => {
  const colors = useThemeColors();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      Alert.alert('Error', 'Failed to load articles');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles();
  };

  const categories = useMemo(() => {
    const cats = articles
      .map(article => article.category)
      .filter((cat): cat is string => cat !== null && cat !== undefined);
    return ['All', ...Array.from(new Set(cats))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = 
        selectedCategory === 'All' || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { articleId: article.id });
  };

  const extractImageFromContent = (content: string): string | null => {
    const markdownImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (markdownImageMatch && markdownImageMatch[1]) {
      return markdownImageMatch[1];
    }

    const htmlImageMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (htmlImageMatch && htmlImageMatch[1]) {
      return htmlImageMatch[1];
    }

    const urlMatch = content.match(/https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|gif|webp)/i);
    if (urlMatch && urlMatch[0]) {
      return urlMatch[0];
    }

    return null;
  };

  const renderArticle = ({ item }: { item: Article }) => {
    const imageUrl = item.featured_image_url || extractImageFromContent(item.content);
    
    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.ui.borderLight }]}
        onPress={() => handleArticlePress(item)}
        activeOpacity={0.7}
      >
        {imageUrl && (
          <Image 
            source={{ uri: imageUrl }} 
            style={[styles.cardImage, { backgroundColor: colors.background.alt }]}
          />
        )}
        <View style={styles.cardContent}>
          {item.category && (
            <Text style={[styles.category, { color: colors.brand.primary }]}>{item.category}</Text>
          )}
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>{item.title}</Text>
          {item.excerpt && (
            <Text style={[styles.excerpt, { color: colors.text.secondary }]} numberOfLines={2}>
              {item.excerpt}
            </Text>
          )}
          
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 3).map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: colors.background.alt }]}>
                  <Text style={[styles.tagText, { color: colors.text.muted }]}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={[styles.cardFooter, { borderTopColor: colors.ui.borderLight }]}>
            <Text style={[styles.author, { color: colors.text.primary }]}>{item.author || 'Travel Stuttgart'}</Text>
            <View style={styles.metadata}>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>{formatDate(item.created_at)}</Text>
              <Text style={[styles.metaDot, { color: colors.text.muted }]}>•</Text>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>{item.reading_time_minutes || 5} min read</Text>
              <Text style={[styles.metaDot, { color: colors.text.muted }]}>•</Text>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>{item.view_count || 0} views</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background.default }]}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text style={[styles.loadingText, { color: colors.text.muted }]}>Loading articles...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background.alt }]}>
          <Ionicons name="search" size={20} color={colors.text.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.text.muted}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <View style={[styles.filtersContainer, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterBtn,
                { backgroundColor: colors.background.alt, borderColor: colors.ui.border },
                selectedCategory === category && { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: colors.text.muted },
                  selectedCategory === category && { color: '#fff' },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={[styles.resultsBar, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <Text style={[styles.resultsText, { color: colors.text.muted }]}>
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.brand.primary]}
            tintColor={colors.brand.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="newspaper-outline" size={64} color={colors.ui.border} />
            <Text style={[styles.emptyText, { color: colors.text.muted }]}>No articles found</Text>
            <Text style={[styles.emptySubtext, { color: colors.text.muted }]}>Try adjusting your filters or search</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultsBar: {
    padding: 12,
    borderBottomWidth: 1,
  },
  resultsText: {
    fontSize: 14,
  },
  list: {
    padding: 12,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
  },
  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
  },
  metaDot: {
    fontSize: 12,
    marginHorizontal: 6,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default ArticlesScreen;