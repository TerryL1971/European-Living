// src/screens/ServicesScreen.tsx - Full with Dark Mode
import React, { useState, useEffect, useMemo } from 'react';
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
import { useBase } from '../contexts/BaseContext';
import { useThemeColors } from '../contexts/ThemeContext';

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

const baseIdMap: Record<string, string> = {
  'Stuttgart': 'stuttgart',
  'Ramstein': 'ramstein',
  'Spangdahlem': 'spangdahlem',
  'Wiesbaden': 'wiesbaden',
  'Grafenwöhr': 'grafenwoehr', 
  'Kaiserslautern': 'kaiserslautern',
};

export default function ServicesScreen({ navigation }: any) {
  const colors = useThemeColors();
  const { selectedBase: contextBaseName } = useBase();

  const selectedBaseId = useMemo(() => {
    return baseIdMap[contextBaseName] || 'all';
  }, [contextBaseName]);

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
  }, [searchQuery, selectedCategory, businesses, selectedBaseId]);

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

    if (selectedBaseId && selectedBaseId !== 'all') {
      filtered = filtered.filter(b => 
        b.bases_served && b.bases_served.includes(selectedBaseId)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

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

  const openPhone = (phone: string, e: any) => {
    e.stopPropagation();
    Linking.openURL(`tel:${phone}`);
  };

  const openWebsite = (url: string, e: any) => {
    e.stopPropagation();
    Linking.openURL(url);
  };

  const navigateToDetail = (business: Business) => {
    navigation.navigate('ServiceDetail', { businessId: business.id });
  };

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.ui.borderLight }]}
      onPress={() => navigateToDetail(item)}
      activeOpacity={0.7}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={[styles.cardImage, { backgroundColor: colors.background.alt }]} resizeMode="cover" />
      ) : (
        <View style={[styles.cardImage, styles.placeholderImage, { backgroundColor: colors.background.alt }]}>
          <Ionicons name="business" size={48} color={colors.ui.border} />
        </View>
      )}

      <View style={styles.badges}>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={12} color={colors.brand.gold} />
            <Text style={[styles.badgeText, { color: colors.brand.gold }]}>Featured</Text>
          </View>
        )}
        {item.verified && (
          <View style={[styles.verifiedBadge, { backgroundColor: colors.brand.primary }]}>
            <Ionicons name="checkmark-circle" size={12} color="#fff" />
            <Text style={styles.badgeTextWhite}>Verified</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.businessName, { color: colors.text.primary }]} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={14} color={colors.brand.primary} />
          <Text style={[styles.infoText, { color: colors.text.muted }]} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        {item.description && (
          <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={3}>
            {item.description}
          </Text>
        )}

        {item.english_fluency && (
          <View style={[styles.englishBadge, { backgroundColor: colors.background.alt }]}>
            <Text style={[styles.englishText, { color: colors.text.primary }]}>
              🗣️ {item.english_fluency === 'fluent' ? 'Fluent English' : 'English Spoken'}
            </Text>
          </View>
        )}

        <View style={[styles.actions, { borderTopColor: colors.ui.borderLight }]}>
          {item.phone && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.background.alt }]}
              onPress={(e) => openPhone(item.phone!, e)}
            >
              <Ionicons name="call" size={16} color={colors.brand.primary} />
            </TouchableOpacity>
          )}
          {item.website && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.background.alt }]}
              onPress={(e) => openWebsite(item.website!, e)}
            >
              <Ionicons name="globe" size={16} color={colors.brand.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background.alt }]}>
          <Ionicons name="search" size={20} color={colors.text.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Search businesses..."
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

      <View style={[styles.categoriesContainer, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryBtn,
                { backgroundColor: colors.background.alt, borderColor: colors.ui.border },
                selectedCategory === item.id && { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={selectedCategory === item.id ? '#fff' : colors.brand.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: colors.brand.primary },
                  selectedCategory === item.id && { color: '#fff' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={[styles.resultsBar, { backgroundColor: colors.background.card, borderBottomColor: colors.ui.borderLight }]}>
        <Text style={[styles.resultsText, { color: colors.text.muted }]}>
          {filteredBusinesses.length} service{filteredBusinesses.length !== 1 ? 's' : ''} found
          {selectedBaseId !== 'all' && ` near ${contextBaseName}`} 
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.brand.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
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
              <Ionicons name="business-outline" size={64} color={colors.ui.border} />
              <Text style={[styles.emptyText, { color: colors.text.muted }]}>No services found</Text>
              <Text style={[styles.emptySubtext, { color: colors.text.muted }]}>
                {selectedBaseId !== 'all' 
                  ? `No services available near ${contextBaseName}. Try adjusting your filters.`
                  : 'Try adjusting your search or filters'
                }
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 12, borderBottomWidth: 1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  categoriesContainer: { borderBottomWidth: 1, paddingVertical: 8 },
  categoriesList: { paddingHorizontal: 12 },
  categoryBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, borderWidth: 1 },
  categoryText: { marginLeft: 6, fontSize: 14, fontWeight: '600' },
  resultsBar: { padding: 12, borderBottomWidth: 1 },
  resultsText: { fontSize: 14 },
  loader: { marginTop: 40 },
  list: { padding: 8 },
  row: { justifyContent: 'space-between' },
  card: { width: '48%', borderRadius: 12, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, borderWidth: 1 },
  cardImage: { width: '100%', height: 120 },
  placeholderImage: { justifyContent: 'center', alignItems: 'center' },
  badges: { position: 'absolute', top: 8, right: 8, flexDirection: 'column', alignItems: 'flex-end' },
  featuredBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginBottom: 4 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 10, fontWeight: '600', marginLeft: 4 },
  badgeTextWhite: { fontSize: 10, fontWeight: '600', color: '#fff', marginLeft: 4 },
  cardContent: { padding: 12 },
  businessName: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 12, marginLeft: 4, flex: 1 },
  description: { fontSize: 12, lineHeight: 16, marginBottom: 8 },
  englishBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  englishText: { fontSize: 10, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 8, borderTopWidth: 1, paddingTop: 8 },
  actionBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 8 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  emptyText: { fontSize: 18, fontWeight: '600', marginTop: 16, textAlign: 'center' },
  emptySubtext: { fontSize: 14, marginTop: 8, textAlign: 'center' },
});