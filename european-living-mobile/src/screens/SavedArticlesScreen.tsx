// src/screens/SavedArticlesScreen.tsx
// Shows only articles that user has saved/favorited

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabaseClient';

const SAVED_ARTICLES_KEY = '@saved_articles';

interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  destination_name: string | null;
  reading_time_minutes: number | null;
  category: string | null;
}

export default function SavedArticlesScreen({ navigation }: any) {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Reload saved articles when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedArticles();
    }, [])
  );

  const loadSavedArticles = async () => {
    try {
      // Get saved article IDs from AsyncStorage
      const savedArticlesJson = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
      
      if (!savedArticlesJson) {
        setSavedArticles([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const savedIds: string[] = JSON.parse(savedArticlesJson);

      if (savedIds.length === 0) {
        setSavedArticles([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      // Fetch articles from Supabase
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, excerpt, featured_image_url, destination_name, reading_time_minutes, category')
        .in('id', savedIds)
        .eq('published', true);

      if (error) throw error;

      // Sort to match the order in savedIds
      const sortedData = savedIds
        .map(id => data?.find(article => article.id === id))
        .filter((article): article is Article => article !== undefined);

      setSavedArticles(sortedData);
    } catch (error) {
      console.error('Error loading saved articles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadSavedArticles();
  };

  const renderArticleCard = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArticleDetail', { articleId: item.id })}
      activeOpacity={0.7}
    >
      {item.featured_image_url ? (
        <Image
          source={{ uri: item.featured_image_url }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.cardImage, styles.placeholderImage]}>
          <Ionicons name="image-outline" size={48} color="#ccc" />
        </View>
      )}

      <View style={styles.cardContent}>
        {item.category && (
          <Text style={styles.category}>{item.category}</Text>
        )}
        
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {item.excerpt && (
          <Text style={styles.excerpt} numberOfLines={3}>
            {item.excerpt}
          </Text>
        )}

        <View style={styles.meta}>
          {item.destination_name && (
            <View style={styles.metaItem}>
              <Ionicons name="location" size={14} color="#8B9D7C" />
              <Text style={styles.metaText}>{item.destination_name}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#8B9D7C" />
            <Text style={styles.metaText}>{item.reading_time_minutes || 5} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="heart" size={14} color="#FF6B6B" />
            <Text style={styles.metaText}>Saved</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Articles</Text>
          <View style={styles.headerButton} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B9D7C" />
          <Text style={styles.loadingText}>Loading saved articles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Articles</Text>
        <View style={styles.headerButton} />
      </View>

      {/* Results Count */}
      {savedArticles.length > 0 && (
        <View style={styles.resultsBar}>
          <Ionicons name="heart" size={20} color="#FF6B6B" />
          <Text style={styles.resultsText}>
            {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Articles List */}
      <FlatList
        data={savedArticles}
        renderItem={renderArticleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#8B9D7C']} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No Saved Articles</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart icon on any article to save it for later reading
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('Main', { screen: 'Articles' })}
            >
              <Text style={styles.browseButtonText}>Browse Articles</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    gap: 8,
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B9D7C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: '#8B9D7C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});