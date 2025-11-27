// src/screens/DayTripsListScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DayTripCard from '../components/DayTripCard';
import {
  fetchDayTrips,
  searchDayTrips,
  fetchDayTripsByTag,
  DayTripListItem,
} from '../services/dayTripsService';

interface Props {
  navigation: any;
  route: {
    params?: {
      baseId?: string; // Changed from baseLocationId to baseId
    };
  };
}

const FILTER_TAGS = [
  'All',
  'Family-Friendly',
  'Historical',
  'Nature',
  'Beach',
  'Mountains',
  'City',
  'Cultural',
  'Adventure',
  'Food & Wine',
  'Photography',
];

export default function DayTripsListScreen({ navigation, route }: Props) {
  const baseId = route.params?.baseId; // Changed from baseLocationId
  
  const [dayTrips, setDayTrips] = useState<DayTripListItem[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<DayTripListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    loadDayTrips();
  }, [baseId]);

  useEffect(() => {
    filterTrips();
  }, [searchQuery, selectedTag, dayTrips]);

  const loadDayTrips = async () => {
    try {
      const trips = await fetchDayTrips(baseId);
      setDayTrips(trips);
      setFilteredTrips(trips);
    } catch (error) {
      console.error('Error loading day trips:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterTrips = async () => {
    let filtered = [...dayTrips];

    // Apply tag filter
    if (selectedTag !== 'All') {
      try {
        filtered = await fetchDayTripsByTag(selectedTag, baseId);
      } catch (error) {
        console.error('Error filtering by tag:', error);
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      try {
        filtered = await searchDayTrips(searchQuery, baseId);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }

    setFilteredTrips(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchQuery('');
    setSelectedTag('All');
    loadDayTrips();
  };

  const handleTripPress = (tripId: string) => {
    navigation.navigate('DayTripDetail', {
      tripId,
      baseId, // Changed from baseLocationId
    });
  };

  const handleTagPress = (tag: string) => {
    setSelectedTag(tag);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Title */}
      <Text style={styles.title}>Day Trips</Text>
      <Text style={styles.subtitle}>
        Discover amazing destinations near you
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tag Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tagsScrollView}
        contentContainerStyle={styles.tagsContent}
      >
        {FILTER_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              selectedTag === tag && styles.tagButtonActive,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text
              style={[
                styles.tagButtonText,
                selectedTag === tag && styles.tagButtonTextActive,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredTrips.length} {filteredTrips.length === 1 ? 'destination' : 'destinations'} found
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="map-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No day trips found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery || selectedTag !== 'All'
          ? 'Try adjusting your filters'
          : 'Check back soon for new destinations'}
      </Text>
      {(searchQuery || selectedTag !== 'All') && (
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => {
            setSearchQuery('');
            setSelectedTag('All');
          }}
        >
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading day trips...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DayTripCard dayTrip={item} onPress={handleTripPress} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          filteredTrips.length === 0 && styles.listContentEmpty,
        ]}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  tagsScrollView: {
    marginBottom: 16,
  },
  tagsContent: {
    paddingRight: 16,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 8,
  },
  tagButtonActive: {
    backgroundColor: '#007AFF',
  },
  tagButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tagButtonTextActive: {
    color: '#fff',
  },
  resultsCount: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  clearFiltersButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});