// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../services/supabaseClient';
import { Ionicons } from '@expo/vector-icons';

interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  cta_text: string;
  type: string;
  is_sponsored: boolean;
  sponsor_name: string | null;
}

export default function HomeScreen({ navigation }: any) {
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_content')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true })
        .limit(3);

      if (error) {
        console.error('Error loading featured content:', error);
      } else {
        setFeaturedContent(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadFeaturedContent();
  };

  const openLink = (url: string | null) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#8B9D7C']} />
        }
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome to European Living</Text>
          <Text style={styles.heroSubtitle}>
            Your guide to living and exploring Europe as a military family
          </Text>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Featured This Week</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#8B9D7C" style={styles.loader} />
          ) : featuredContent.length > 0 ? (
            featuredContent.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card}
                onPress={() => openLink(item.link_url)}
                activeOpacity={0.7}
              >
                {item.image_url ? (
                  <Image 
                    source={{ uri: item.image_url }} 
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.cardImagePlaceholder}>
                    <Ionicons name="image-outline" size={48} color="#ccc" />
                  </View>
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={3}>
                    {item.description}
                  </Text>
                  {item.is_sponsored && item.sponsor_name && (
                    <Text style={styles.sponsored}>
                      Sponsored by {item.sponsor_name}
                    </Text>
                  )}
                  <View style={styles.cardFooter}>
                    <Text style={styles.ctaText}>{item.cta_text}</Text>
                    <Ionicons name="arrow-forward" size={20} color="#8B9D7C" />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No featured content available</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Services')}
            >
              <Text style={styles.actionIcon}>🏢</Text>
              <Text style={styles.actionText}>Find Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Day Trips')}
            >
              <Text style={styles.actionIcon}>🗺️</Text>
              <Text style={styles.actionText}>Day Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Articles')}
            >
              <Text style={styles.actionIcon}>📰</Text>
              <Text style={styles.actionText}>Read Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.actionIcon}>👤</Text>
              <Text style={styles.actionText}>My Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Verified Businesses</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Military Bases</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Years Serving</Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#8B9D7C',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#F5F3EF',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
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
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  sponsored: {
    fontSize: 12,
    color: '#8B9D7C',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B9D7C',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E28',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});