// src/screens/ServiceDetailScreen.tsx
// Business detail page with directions, call, email, website

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  verified: boolean;
  featured: boolean;
  english_fluency?: string;
  status?: string;
  bases_served?: string[];
  latitude?: number;
  longitude?: number;
  hours?: string;
  address?: string;
}

export default function ServiceDetailScreen({ route, navigation }: any) {
  const { businessId } = route.params;
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusiness();
  }, [businessId]);

  const fetchBusiness = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (error) throw error;
      setBusiness(data);
    } catch (error) {
      console.error('Error fetching business:', error);
      Alert.alert('Error', 'Failed to load business details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const openDirections = () => {
    if (!business) return;

    // If we have lat/lng, use those
    if (business.latitude && business.longitude) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${business.latitude},${business.longitude}`;
      const label = business.name;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      
      Linking.openURL(url || '');
    } else {
      // Fallback to address search
      const address = business.address || business.location;
      const url = Platform.select({
        ios: `maps:0,0?q=${encodeURIComponent(address)}`,
        android: `geo:0,0?q=${encodeURIComponent(address)}`,
      });
      Linking.openURL(url || '');
    }
  };

  const openPhone = () => {
    if (business?.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  const openEmail = () => {
    if (business?.email) {
      Linking.openURL(`mailto:${business.email}`);
    }
  };

  const openWebsite = () => {
    if (business?.website) {
      Linking.openURL(business.website);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B9D7C" />
        <Text style={styles.loadingText}>Loading business...</Text>
      </View>
    );
  }

  if (!business) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
        <Text style={styles.errorText}>Business not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Details</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image */}
        {business.image_url ? (
          <Image source={{ uri: business.image_url }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Ionicons name="business" size={80} color="#ccc" />
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          {/* Badges */}
          <View style={styles.badges}>
            {business.featured && (
              <View style={styles.featuredBadge}>
                <Ionicons name="star" size={16} color="#D4AF37" />
                <Text style={styles.badgeText}>Featured</Text>
              </View>
            )}
            {business.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
                <Text style={styles.badgeTextWhite}>Verified</Text>
              </View>
            )}
          </View>

          {/* Name */}
          <Text style={styles.name}>{business.name}</Text>

          {/* Category */}
          <Text style={styles.category}>{business.category}</Text>

          {/* Description */}
          {business.description && (
            <Text style={styles.description}>{business.description}</Text>
          )}

          {/* English Fluency */}
          {business.english_fluency && (
            <View style={styles.englishBadge}>
              <Text style={styles.englishText}>
                🗣️ {business.english_fluency === 'fluent' ? 'Fluent English' : 'English Spoken'}
              </Text>
            </View>
          )}

          {/* Info Section */}
          <View style={styles.infoSection}>
            {/* Location */}
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#8B9D7C" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoText}>{business.location}</Text>
                {business.address && business.address !== business.location && (
                  <Text style={styles.infoSubtext}>{business.address}</Text>
                )}
              </View>
            </View>

            {/* Phone */}
            {business.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={20} color="#8B9D7C" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoText}>{business.phone}</Text>
                </View>
              </View>
            )}

            {/* Email */}
            {business.email && (
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={20} color="#8B9D7C" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoText}>{business.email}</Text>
                </View>
              </View>
            )}

            {/* Website */}
            {business.website && (
              <View style={styles.infoRow}>
                <Ionicons name="globe" size={20} color="#8B9D7C" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Website</Text>
                  <Text style={styles.infoText} numberOfLines={1}>
                    {business.website}
                  </Text>
                </View>
              </View>
            )}

            {/* Hours */}
            {business.hours && (
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color="#8B9D7C" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Hours</Text>
                  <Text style={styles.infoText}>{business.hours}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={openDirections}>
              <Ionicons name="navigate" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>

            {business.phone && (
              <TouchableOpacity style={styles.actionButton} onPress={openPhone}>
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
            )}

            {business.email && (
              <TouchableOpacity style={styles.actionButton} onPress={openEmail}>
                <Ionicons name="mail" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Email</Text>
              </TouchableOpacity>
            )}

            {business.website && (
              <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
                <Ionicons name="globe" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Website</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3EF',
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
    backgroundColor: '#F5F3EF',
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B9D7C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
    marginLeft: 4,
  },
  badgeTextWhite: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B9D7C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  englishBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  englishText: {
    fontSize: 14,
    color: '#2C3E28',
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  infoSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#8B9D7C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});