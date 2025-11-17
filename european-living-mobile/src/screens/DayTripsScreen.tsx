// src/screens/DayTripsScreen.tsx

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data - replace with your actual day trips data
const DAY_TRIPS_DATA = [
  {
    id: '1',
    baseId: 'stuttgart',
    baseName: 'Stuttgart',
    trips: [
      {
        id: 'trip1',
        name: 'Heidelberg Castle',
        description: 'Stunning medieval castle overlooking the Neckar River with beautiful gardens and historic ruins.',
        driveTime: '1 hour',
        distance: '120 km',
        trainTime: '1h 15min',
        difficulty: 'Easy',
        cost: '$$',
        bestFor: ['History', 'Photography', 'Families', 'Romantic'],
      },
      {
        id: 'trip2',
        name: 'Black Forest',
        description: 'Dense forest region famous for cuckoo clocks, hiking trails, and traditional German cuisine.',
        driveTime: '1h 30min',
        distance: '100 km',
        difficulty: 'Moderate',
        cost: '$',
        bestFor: ['Nature', 'Hiking', 'Photography'],
      },
    ],
  },
];

interface DayTrip {
  id: string;
  name: string;
  description: string;
  driveTime: string;
  distance: string;
  trainTime?: string;
  difficulty: string;
  cost: string;
  bestFor: string[];
}

export default function DayTripsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedBase, setSelectedBase] = useState('all');

  // Flatten trips from all bases
  const allTrips = useMemo(() => {
    const trips: Array<{ baseName: string; trip: DayTrip }> = [];
    DAY_TRIPS_DATA.forEach(base => {
      base.trips.forEach(trip => {
        trips.push({ baseName: base.baseName, trip });
      });
    });
    return trips;
  }, []);

  // Filter trips
  const filteredTrips = useMemo(() => {
    return allTrips.filter(({ baseName, trip }) => {
      // Base filter
      if (selectedBase !== 'all' && !baseName.toLowerCase().includes(selectedBase.toLowerCase())) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && trip.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          trip.name.toLowerCase().includes(query) ||
          trip.description.toLowerCase().includes(query) ||
          trip.bestFor.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [allTrips, searchQuery, selectedDifficulty, selectedBase]);

  const renderTripCard = ({ item }: { item: { baseName: string; trip: DayTrip } }) => {
    const { baseName, trip } = item;
    
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Easy': return '#4CAF50';
        case 'Moderate': return '#FF9800';
        case 'Challenging': return '#F44336';
        default: return '#666';
      }
    };

    const getCostColor = (cost: string) => {
      switch (cost) {
        case '$': return '#4CAF50';
        case '$$': return '#FF9800';
        case '$$$': return '#F44336';
        default: return '#666';
      }
    };

    return (
      <View style={styles.card}>
        {/* Header with gradient */}
        <View style={styles.cardHeader}>
          <Ionicons name="map" size={40} color="#fff" style={styles.cardIcon} />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.tripName}>{trip.name}</Text>
          
          {selectedBase === 'all' && (
            <Text style={styles.baseTag}>📍 From {baseName}</Text>
          )}

          <Text style={styles.description} numberOfLines={3}>
            {trip.description}
          </Text>

          {/* Travel Info */}
          <View style={styles.travelInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="car" size={16} color="#8B9D7C" />
              <Text style={styles.infoText}>
                {trip.driveTime} ({trip.distance})
              </Text>
            </View>
            {trip.trainTime && (
              <View style={styles.infoRow}>
                <Ionicons name="train" size={16} color="#8B9D7C" />
                <Text style={styles.infoText}>{trip.trainTime}</Text>
              </View>
            )}
          </View>

          {/* Badges */}
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(trip.difficulty) }]}>
              <Text style={styles.badgeText}>{trip.difficulty}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getCostColor(trip.cost) }]}>
              <Text style={styles.badgeText}>{trip.cost}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tags}>
            {trip.bestFor.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {trip.bestFor.length > 3 && (
              <Text style={styles.moreText}>+{trip.bestFor.length - 3} more</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
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

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Difficulty Filter */}
          {['all', 'Easy', 'Moderate', 'Challenging'].map(diff => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.filterBtn,
                selectedDifficulty === diff && styles.filterBtnActive,
              ]}
              onPress={() => setSelectedDifficulty(diff)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedDifficulty === diff && styles.filterTextActive,
                ]}
              >
                {diff === 'all' ? 'All Levels' : diff}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          {filteredTrips.length} day trip{filteredTrips.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Trips List */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.trip.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="map-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No day trips found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
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
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterBtnActive: {
    backgroundColor: '#8B9D7C',
    borderColor: '#8B9D7C',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
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
  cardHeader: {
    height: 120,
    backgroundColor: '#8B9D7C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    opacity: 0.3,
  },
  cardContent: {
    padding: 16,
  },
  tripName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 8,
  },
  baseTag: {
    fontSize: 12,
    color: '#8B9D7C',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  travelInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
  },
  moreText: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'center',
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