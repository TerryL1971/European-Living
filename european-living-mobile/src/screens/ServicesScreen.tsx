// src/screens/ServicesScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';
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
}

const categories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'restaurants', name: 'Restaurants', icon: 'restaurant' },
  { id: 'automotive', name: 'Auto', icon: 'car' },
  { id: 'shopping', name: 'Shopping', icon: 'cart' },
  { id: 'home-services', name: 'Home', icon: 'home' },
];

export default function ServicesScreen() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadBusinesses();
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [searchQuery, selectedCategory, businesses]);

  const loadBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) {
        console.error('Error loading businesses:', error);
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterBusinesses = () => {
    let filtered = businesses;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query) ||
        b.location?.toLowerCase().includes(query)
      );
    }

    setFilteredBusinesses(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBusinesses();
  };

  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <View style={styles.card}>
      {/* Image */}
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.cardImage} resizeMode="contain" />
      ) : (
        <View style={[styles.cardImage, styles.placeholderImage]}>
          <Ionicons name="business" size={48} color="#ccc" />
        </View>
      )}

      {/* Badges */}
      <View style={styles.badges}>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={12} color="#D4AF37" />
            <Text style={styles.badgeText}>Featured</Text>
          </View>
        )}
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#fff" />
            <Text style={styles.badgeTextWhite}>Verified</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.businessName} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Location */}
        <View style={styles.infoRow}>
          <Ionicons name="location" size={14} color="#8B9D7C" />
          <Text style={styles.infoText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        {/* English Fluency */}
        {item.english_fluency && (
          <View style={styles.englishBadge}>
            <Text style={styles.englishText}>
              🗣️ {item.english_fluency === 'fluent' ? 'Fluent English' : 'English Spoken'}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          {item.phone && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => openPhone(item.phone!)}
            >
              <Ionicons name="call" size={16} color="#8B9D7C" />
            </TouchableOpacity>
          )}
          {item.website && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => openWebsite(item.website!)}
            >
              <Ionicons name="globe" size={16} color="#8B9D7C" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryBtn,
                selectedCategory === item.id && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={selectedCategory === item.id ? '#fff' : '#8B9D7C'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          {filteredBusinesses.length} service{filteredBusinesses.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Business List */}
      {loading ? (
        <ActivityIndicator size="large" color="#8B9D7C" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#8B9D7C']} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="business-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No services found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryBtnActive: {
    backgroundColor: '#8B9D7C',
    borderColor: '#8B9D7C',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#8B9D7C',
  },
  categoryTextActive: {
    color: '#fff',
  },
  resultsBar: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    marginTop: 40,
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badges: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B9D7C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D4AF37',
    marginLeft: 4,
  },
  badgeTextWhite: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  cardContent: {
    padding: 12,
  },
  businessName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  englishBadge: {
    backgroundColor: '#8B9D7C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
    opacity: 0.1,
  },
  englishText: {
    fontSize: 10,
    color: '#2C3E28',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});