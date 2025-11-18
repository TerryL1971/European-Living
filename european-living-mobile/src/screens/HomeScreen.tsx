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
  RefreshControl,
  ImageBackground
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
        {/* Hero Section with Logo and Background Image */}
        <ImageBackground
          source={{ uri: 'https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/hero-bg.jpg' }}
          style={styles.hero}
          resizeMode="cover"
        >
          {/* Dark overlay for readability */}
          <View style={styles.heroOverlay} />
          
          <View style={styles.heroContent}>
            {/* Logo */}
            <Image 
              source={{ uri: 'https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/european-living-logo.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
            
            <Text style={styles.heroTitle}>Discover Europe{'\n'}
              <Text style={styles.heroTitleGold}>Beyond</Text> the Base
            </Text>
            <Text style={styles.heroSubtitle}>
              Your complete guide to traveling across Europe. Find destinations, transportation, accommodations, and English-speaking services — all in one place.
            </Text>
            <Text style={styles.heroSubtitle2}>
              Built by Americans who've lived in Germany for over 10 years and worked with thousands of military families.
            </Text>
          </View>
        </ImageBackground>

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
              <View style={styles.actionIconContainer}>
                <Ionicons name="business" size={28} color="#8B9D7C" />
              </View>
              <Text style={styles.actionText}>Find Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Day Trips')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="map" size={28} color="#8B9D7C" />
              </View>
              <Text style={styles.actionText}>Day Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Articles')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="newspaper" size={28} color="#8B9D7C" />
              </View>
              <Text style={styles.actionText}>Read Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="person" size={28} color="#8B9D7C" />
              </View>
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
    minHeight: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroTitleGold: {
    color: '#D4AF37',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle2: {
    fontSize: 14,
    color: '#F5F3EF',
    opacity: 0.95,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F3EF',
    justifyContent: 'center',
    alignItems: 'center',
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