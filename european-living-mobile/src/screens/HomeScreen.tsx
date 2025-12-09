// src/screens/HomeScreen.tsx - Fixed version with styles inside component

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
import { useThemeColors } from '../contexts/ThemeContext';
import { spacing, borderRadius, typography, shadows } from '../theme/colors';

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
  
  // Get colors based on system theme (light/dark)
  const colors = useThemeColors();
  
  // Debug: Log what we're getting
  useEffect(() => {
    console.log('🎨 Current theme colors:', {
      background: colors.background.default,
      text: colors.text.primary,
      primary: colors.brand.primary,
    });
  }, [colors]);

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

  // Create styles object AFTER colors hook has run
  const styles = React.useMemo(() => ({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    scrollView: {
      flex: 1,
    },
    hero: {
      minHeight: 400,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    heroContent: {
      position: 'relative' as const,
      zIndex: 1,
      padding: spacing.lg,
      paddingTop: 40,
      paddingBottom: 50,
      alignItems: 'center' as const,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: spacing.md,
    },
    heroTitle: {
      fontSize: typography.fontSizes['4xl'],
      fontWeight: typography.fontWeights.extrabold as any,
      color: colors.text.light,
      marginBottom: spacing.md,
      textAlign: 'center' as const,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 8,
    },
    heroTitleGold: {
      color: colors.brand.gold,
    },
    heroSubtitle: {
      fontSize: typography.fontSizes.base,
      color: colors.text.light,
      marginBottom: spacing.sm,
      textAlign: 'center' as const,
      lineHeight: typography.fontSizes.base * typography.lineHeights.relaxed,
      paddingHorizontal: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    heroSubtitle2: {
      fontSize: typography.fontSizes.sm,
      color: colors.text.light,
      opacity: 0.95,
      textAlign: 'center' as const,
      lineHeight: typography.fontSizes.sm * typography.lineHeights.normal,
      paddingHorizontal: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    section: {
      padding: spacing.md,
    },
    sectionTitle: {
      fontSize: typography.fontSizes['2xl'],
      fontWeight: typography.fontWeights.bold as any,
      color: colors.brand.primaryDark,
      marginBottom: spacing.md,
    },
    loader: {
      marginTop: spacing.lg,
    },
    emptyText: {
      textAlign: 'center' as const,
      color: colors.text.muted,
      fontSize: typography.fontSizes.base,
      marginTop: spacing.lg,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.xl,
      marginBottom: spacing.md,
      overflow: 'hidden' as const,
      borderWidth: 1,
      borderColor: colors.ui.borderLight,
      ...shadows.medium,
    },
    cardImage: {
      width: '100%' as const,
      height: 180,
      backgroundColor: colors.background.alt,
    },
    cardImagePlaceholder: {
      width: '100%' as const,
      height: 180,
      backgroundColor: colors.background.alt,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    cardContent: {
      padding: spacing.md,
    },
    cardTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.bold as any,
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
    cardDescription: {
      fontSize: typography.fontSizes.sm,
      color: colors.text.secondary,
      lineHeight: typography.fontSizes.sm * typography.lineHeights.normal,
      marginBottom: spacing.sm,
    },
    sponsored: {
      fontSize: typography.fontSizes.xs,
      color: colors.brand.gold,
      marginBottom: spacing.sm,
      fontWeight: typography.fontWeights.medium as any,
    },
    cardFooter: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    ctaText: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.semibold as any,
      color: colors.brand.primary,
    },
    quickActions: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between' as const,
    },
    actionButton: {
      width: '48%' as const,
      backgroundColor: colors.background.card,
      padding: spacing.lg,
      borderRadius: borderRadius.xl,
      alignItems: 'center' as const,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.ui.borderLight,
      ...shadows.small,
    },
    actionIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.brand.primary,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: spacing.sm,
    },
    actionText: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.semibold as any,
      color: colors.text.primary,
      textAlign: 'center' as const,
    },
    statsContainer: {
      flexDirection: 'row' as const,
      justifyContent: 'space-around' as const,
      padding: spacing.md,
      backgroundColor: colors.background.card,
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.ui.borderLight,
      ...shadows.medium,
    },
    stat: {
      alignItems: 'center' as const,
    },
    statNumber: {
      fontSize: typography.fontSizes['3xl'],
      fontWeight: typography.fontWeights.extrabold as any,
      color: colors.brand.gold,
      marginBottom: spacing.xs,
    },
    statLabel: {
      fontSize: typography.fontSizes.xs,
      color: colors.text.muted,
      textAlign: 'center' as const,
    },
  }), [colors]); // Recreate styles when colors change (light/dark mode switch)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[colors.brand.primary]} 
            tintColor={colors.brand.primary}
          />
        }
      >
        {/* Hero Section with Logo and Background Image */}
        <ImageBackground
          source={{ uri: 'https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/hero-bg.jpg' }}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay} />
          
          <View style={styles.heroContent}>
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
            <ActivityIndicator size="large" color={colors.brand.primary} style={styles.loader} />
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
                    <Ionicons name="image-outline" size={48} color={colors.ui.border} />
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
                    <Ionicons name="arrow-forward" size={20} color={colors.brand.primary} />
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
                <Ionicons name="business" size={28} color={colors.text.light} />
              </View>
              <Text style={styles.actionText}>Find Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Day Trips')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="map" size={28} color={colors.text.light} />
              </View>
              <Text style={styles.actionText}>Day Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Articles')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="newspaper" size={28} color={colors.text.light} />
              </View>
              <Text style={styles.actionText}>Read Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="person" size={28} color={colors.text.light} />
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

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}