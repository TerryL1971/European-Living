// src/screens/DayTripsScreen.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBase } from '../contexts/BaseContext';
// ⬇️ Use the centralized API
import { fetchDayTrips, DayTrip, BaseDayTrips } from '../data/dayTripsApi'; 

export default function DayTripsScreen() {
  const { selectedBase } = useBase();
  
  const [allDayTrips, setAllDayTrips] = useState<BaseDayTrips[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch data from Supabase
  useEffect(() => {
    async function loadTrips() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await fetchDayTrips();
        setAllDayTrips(data);
      } catch (e) {
        setFetchError("Failed to load day trips. Check your network or data setup.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTrips();
  }, []);

  // Filter based on selected base
  const baseTrips = useMemo(() => {
    if (selectedBase === 'all') {
      // Flatten all trips for display when 'All' is selected
      return allDayTrips.flatMap(base => base.trips);
    }
    // Filter for the specific base and flatten the trips array
    return allDayTrips
      .filter(b => b.baseId === selectedBase.toLowerCase().replace(/[^a-z0-9]/g, ''))
      .flatMap(base => base.trips);
  }, [selectedBase, allDayTrips]);

  // Extract all categories for the filter bar
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    allDayTrips.forEach(base => {
      base.trips.forEach(trip => {
        // Use snake_case
        trip.best_for.forEach(cat => categories.add(cat)); 
      });
    });
    return Array.from(categories).sort();
  }, [allDayTrips]);
  
  // Final filtered list
  const filteredTrips = useMemo(() => {
    if (selectedCategory === 'all') {
      return baseTrips;
    }
    return baseTrips.filter(trip => 
        // Use snake_case
        trip.best_for.includes(selectedCategory)
    );
  }, [baseTrips, selectedCategory]);

  const renderTripCard = ({ item }: { item: DayTrip }) => (
    <View style={styles.card}>
      {/* ⬇️ Image rendering using image_url from Supabase ⬇️ */}
      {item.image_url ? (
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.cardImage} 
          resizeMode="cover" 
        />
      ) : (
        <View style={styles.cardPlaceholder}>
          <Ionicons name="map-pin-outline" size={48} color="#ccc" />
        </View>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.tripName} numberOfLines={2}>
          {item.name}
        </Text>
        
        {/* Base Name (only visible if 'All Bases' is selected) */}
        {selectedBase === 'all' && (
            <Text style={styles.baseNameText}>From {item.base_name}</Text>
        )}

        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        {/* Drive Time */}
        <View style={styles.infoRow}>
          <Ionicons name="car" size={14} color="#8B9D7C" />
          {/* Use snake_case */}
          <Text style={styles.infoText}>{item.drive_time} drive</Text>
        </View>
        
        {/* Train Time */}
        {item.train_time && (
          <View style={styles.infoRow}>
            <Ionicons name="train" size={14} color="#8B9D7C" />
            {/* Use snake_case */}
            <Text style={styles.infoText}>{item.train_time} by train</Text>
          </View>
        )}

        {/* Badges */}
        <View style={styles.badgeContainer}>
          <Text style={[
            styles.badge,
            item.difficulty === 'Easy' && styles.easyBadge,
            item.difficulty === 'Moderate' && styles.moderateBadge,
            item.difficulty === 'Challenging' && styles.challengingBadge,
          ]}>
            {item.difficulty}
          </Text>
          <Text style={styles.costBadge}>
            {item.cost}
          </Text>
        </View>
        
        {/* Categories */}
        <View style={styles.categoryTagContainer}>
            {/* Use snake_case */}
            {item.best_for.slice(0, 3).map((tag) => (
                <Text key={tag} style={styles.categoryTag}>{tag}</Text>
            ))}
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B9D7C" />
        <Text style={styles.loadingText}>Loading incredible destinations...</Text>
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.loadingText}>Data Error</Text>
        <Text style={styles.errorText}>{fetchError}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Category Filter Bar */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {/* All Button */}
          <TouchableOpacity
            style={[styles.categoryBtn, selectedCategory === 'all' && styles.categoryBtnActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'all' && styles.categoryTextActive]}>All</Text>
          </TouchableOpacity>
          {/* Dynamic Category Buttons */}
          {allCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.resultsText}>
        Found {filteredTrips.length} Trip{filteredTrips.length !== 1 ? 's' : ''}
        {selectedBase !== 'all' && filteredTrips.length > 0 && ` from ${selectedBase}`}
      </Text>

      {/* Trip List */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="map-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No trips match your filters.</Text>
          </View>
        }
      />
    </View>
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8B9D7C',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesList: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryBtnActive: {
    backgroundColor: '#8B9D7C',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
  },
  resultsText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#666',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  },
  cardPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 4,
  },
  baseNameText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 8,
  },
  badge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    fontWeight: '600',
  },
  easyBadge: {
    backgroundColor: '#E8F5E9', // Light Green
    color: '#388E3C', // Dark Green
  },
  moderateBadge: {
    backgroundColor: '#FFFDE7', // Light Yellow
    color: '#F9A825', // Dark Yellow/Gold
  },
  challengingBadge: {
    backgroundColor: '#FBE8E8', // Light Red
    color: '#D32F2F', // Dark Red
  },
  costBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E3F2FD', // Light Blue
    color: '#1E88E5', // Dark Blue
    fontWeight: '600',
  },
  categoryTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  categoryTag: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    color: '#666',
    marginRight: 4,
    marginBottom: 4,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});