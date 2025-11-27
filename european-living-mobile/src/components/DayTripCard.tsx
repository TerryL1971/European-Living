// src/components/DayTripCard.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DayTripListItem } from '../services/dayTripsService';

interface Props {
  dayTrip: DayTripListItem;
  onPress: (tripId: string) => void;
}

export default function DayTripCard({ dayTrip, onPress }: Props) {
  const displayImage = dayTrip.hero_image_url || dayTrip.image_url;
  const displayDescription = dayTrip.short_description || dayTrip.description;
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(dayTrip.id)}
      activeOpacity={0.7}
    >
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        {displayImage ? (
          <Image
            source={{ uri: displayImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, { backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="image-outline" size={48} color="#999" />
          </View>
        )}
        
        {/* Featured Badge */}
        {dayTrip.featured && (
          <View style={styles.mustSeeBadge}>
            <Ionicons name="star" size={14} color="#000" />
            <Text style={styles.mustSeeText}>Featured</Text>
          </View>
        )}

        {/* Must-See Badge */}
        {dayTrip.is_must_see && (
          <View style={[styles.mustSeeBadge, { top: dayTrip.featured ? 50 : 12 }]}>
            <Ionicons name="bookmark" size={14} color="#000" />
            <Text style={styles.mustSeeText}>Must-See</Text>
          </View>
        )}

        {/* Rating Badge */}
        {dayTrip.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{dayTrip.rating}</Text>
          </View>
        )}

        {/* Difficulty Badge */}
        {dayTrip.difficulty && (
          <View style={[styles.difficultyBadge, 
            dayTrip.difficulty === 'Easy' && { backgroundColor: '#4CAF50' },
            dayTrip.difficulty === 'Moderate' && { backgroundColor: '#FF9800' },
            dayTrip.difficulty === 'Challenging' && { backgroundColor: '#F44336' }
          ]}>
            <Text style={styles.difficultyText}>{dayTrip.difficulty}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {dayTrip.name}
        </Text>

        {/* Distance/Time */}
        <View style={styles.distanceContainer}>
          <Ionicons name="car-outline" size={16} color="#666" />
          <Text style={styles.distanceText}>
            {dayTrip.distance} • {dayTrip.drive_time}
          </Text>
          {dayTrip.train_time && (
            <>
              <Ionicons name="train-outline" size={16} color="#666" style={{ marginLeft: 12 }} />
              <Text style={styles.distanceText}>{dayTrip.train_time}</Text>
            </>
          )}
        </View>

        {/* Short Description */}
        <Text style={styles.description} numberOfLines={2}>
          {displayDescription}
        </Text>

        {/* Tags - Using existing best_for array OR new tags */}
        {((dayTrip.tags && dayTrip.tags.length > 0) || (dayTrip.best_for && dayTrip.best_for.length > 0)) && (
          <View style={styles.tagsContainer}>
            {dayTrip.tags && dayTrip.tags.length > 0 ? (
              <>
                {dayTrip.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag.name}</Text>
                  </View>
                ))}
                {dayTrip.tags.length > 3 && (
                  <Text style={styles.moreTagsText}>+{dayTrip.tags.length - 3}</Text>
                )}
              </>
            ) : (
              <>
                {dayTrip.best_for.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                {dayTrip.best_for.length > 3 && (
                  <Text style={styles.moreTagsText}>+{dayTrip.best_for.length - 3}</Text>
                )}
              </>
            )}
          </View>
        )}

        {/* Quick Info */}
        <View style={styles.quickInfoContainer}>
          {dayTrip.recommended_duration && (
            <View style={styles.quickInfo}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.quickInfoText}>{dayTrip.recommended_duration}</Text>
            </View>
          )}
          <View style={styles.quickInfo}>
            <Ionicons name="cash-outline" size={14} color="#666" />
            <Text style={styles.quickInfoText}>{dayTrip.cost}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mustSeeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mustSeeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
  moreTagsText: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'center',
    marginLeft: 4,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quickInfoText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
});