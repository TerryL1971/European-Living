// src/screens/ArticleDetailScreen.tsx
// FIXED: SafeAreaView warning, added save/favorite functionality

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ FIXED: Use proper SafeAreaView
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabaseClient';
import Markdown from 'react-native-markdown-display';

// Article type definition
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

const SAVED_ARTICLES_KEY = '@saved_articles';

function ArticleDetailScreen({ route, navigation }: any) {
  // Safety check for route params
  if (!route || !route.params || !route.params.articleId) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.errorText}>Invalid article</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack ? navigation.goBack() : null}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { articleId } = route.params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // ✅ NEW: Track if article is saved

  useEffect(() => {
    fetchArticle();
    checkIfSaved();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      // Fetch article
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      setArticle(data);

      // Increment view count
      await supabase
        .from('articles')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', articleId);
    } catch (error) {
      console.error('Error fetching article:', error);
      Alert.alert('Error', 'Failed to load article');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Check if article is saved
  const checkIfSaved = async () => {
    try {
      const savedArticlesJson = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
      if (savedArticlesJson) {
        const savedArticles: string[] = JSON.parse(savedArticlesJson);
        setIsSaved(savedArticles.includes(articleId));
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  // ✅ NEW: Toggle save/unsave
  const toggleSave = async () => {
    try {
      const savedArticlesJson = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
      let savedArticles: string[] = savedArticlesJson ? JSON.parse(savedArticlesJson) : [];

      if (isSaved) {
        // Remove from saved
        savedArticles = savedArticles.filter(id => id !== articleId);
        setIsSaved(false);
        Alert.alert('Removed', 'Article removed from saved articles');
      } else {
        // Add to saved
        savedArticles.push(articleId);
        setIsSaved(true);
        Alert.alert('Saved', 'Article saved for later reading');
      }

      await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
    } catch (error) {
      console.error('Error toggling save:', error);
      Alert.alert('Error', 'Failed to save article');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (!article) return;
    
    try {
      await Share.share({
        message: `${article.title}\n\nRead more on European Living app: https://european-living.live/${article.slug}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B9D7C" />
        <Text style={styles.loadingText}>Loading article...</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.errorText}>Article not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Article</Text>
        
        <View style={styles.headerRight}>
          {/* ✅ NEW: Save/Favorite Button */}
          <TouchableOpacity 
            onPress={toggleSave} 
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isSaved ? "heart" : "heart-outline"} 
              size={24} 
              color={isSaved ? "#FF6B6B" : "#333"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleShare} 
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Image */}
        {article.featured_image_url && (
          <Image
            source={{ uri: article.featured_image_url }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        )}

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Category */}
          {article.category && (
            <Text style={styles.category}>{article.category}</Text>
          )}

          {/* Title */}
          <Text style={styles.title}>{article.title}</Text>

          {/* Subtitle */}
          {article.subtitle && (
            <Text style={styles.subtitle}>{article.subtitle}</Text>
          )}

          {/* Metadata */}
          <View style={styles.metadata}>
            <View style={styles.metadataRow}>
              <Ionicons name="person-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{article.author || 'European Living'}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{formatDate(article.created_at)}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{article.reading_time_minutes || 5} min read</Text>
            </View>
            <View style={styles.metadataRow}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{article.view_count || 0} views</Text>
            </View>
          </View>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {article.tags.map((tag: string, index: number) => (
                <View key={`tag-${index}`} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Article Content - Render Markdown */}
          <Markdown
            style={{
              body: { fontSize: 16, color: '#333', lineHeight: 28 },
              heading1: { fontSize: 24, fontWeight: 'bold', color: '#2C3E28', marginTop: 20, marginBottom: 12 },
              heading2: { fontSize: 20, fontWeight: 'bold', color: '#2C3E28', marginTop: 16, marginBottom: 10 },
              heading3: { fontSize: 18, fontWeight: '600', color: '#2C3E28', marginTop: 14, marginBottom: 8 },
              paragraph: { marginBottom: 12, lineHeight: 24 },
              link: { color: '#8B9D7C' },
              strong: { fontWeight: 'bold' },
              em: { fontStyle: 'italic' },
              bullet_list: { marginBottom: 16 },
              ordered_list: { marginBottom: 16 },
              list_item: { marginBottom: 8 },
              blockquote: { 
                backgroundColor: '#F5F3EF', 
                borderLeftWidth: 4, 
                borderLeftColor: '#8B9D7C',
                paddingLeft: 16,
                paddingVertical: 8,
                marginVertical: 12
              },
              code_inline: { 
                backgroundColor: '#f0f0f0', 
                paddingHorizontal: 4, 
                borderRadius: 3,
                fontFamily: 'monospace'
              },
              fence: { 
                backgroundColor: '#f0f0f0', 
                padding: 12, 
                borderRadius: 8,
                marginVertical: 12
              },
            }}
          >
            {article.content}
          </Markdown>

          {/* Destination Info */}
          {article.destination_name && (
            <View style={styles.destinationBox}>
              <Ionicons name="location" size={20} color="#8B9D7C" />
              <Text style={styles.destinationText}>
                Destination: {article.destination_name}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#8B9D7C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    padding: 8,
    minWidth: 40,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  featuredImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B9D7C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E28',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    lineHeight: 26,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  destinationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3EF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
  },
  destinationText: {
    fontSize: 15,
    color: '#2C3E28',
    fontWeight: '600',
  },
});

export default ArticleDetailScreen;