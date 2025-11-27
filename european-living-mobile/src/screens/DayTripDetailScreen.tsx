// src/screens/DayTripDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { Ionicons } from '@expo/vector-icons';
import { DayTrip } from '../services/dayTripsService';

export default function DayTripDetailScreen({ route, navigation }: any) {
  const { tripId } = route.params;
  const [dayTrip, setDayTrip] = useState<DayTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchDayTripDetails();
  }, [tripId]);

  const fetchDayTripDetails = async () => {
    try {
      const { data: tripData, error: tripError } = await supabase
        .from('day_trips')
        .select(`
          *,
          tags:day_trip_tags(
            tag:tags(name)
          ),
          photos:day_trip_photos(image_url, caption, display_order)
        `)
        .eq('id', tripId)
        .single();

      if (tripError) throw tripError;

      if (tripData.tags && tripData.tags.length > 0) {
        tripData.tags = tripData.tags.map((t: any) => ({ name: t.tag.name }));
      } else if (tripData.best_for && tripData.best_for.length > 0) {
        tripData.tags = tripData.best_for.map((bf: string) => ({ name: bf }));
      }

      if (tripData.photos) {
        tripData.photos.sort((a: any, b: any) => a.display_order - b.display_order);
      }
      
      setDayTrip(tripData);
    } catch (error) {
      console.error('Error fetching day trip:', error);
      Alert.alert('Error', 'Unable to load day trip details');
    } finally {
      setLoading(false);
    }
  };

  const openMaps = () => {
    if (!dayTrip?.latitude || !dayTrip?.longitude) {
      Alert.alert('Navigation unavailable', 'GPS coordinates not available for this destination');
      return;
    }

    const { latitude, longitude, name } = dayTrip;
    const label = encodeURIComponent(name);

    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });

    Linking.canOpenURL(url as string).then((supported) => {
      if (supported) {
        Linking.openURL(url as string);
      } else {
        Linking.openURL(
          `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
        );
      }
    });
  };

  const openWebsite = () => {
    if (dayTrip?.official_website) {
      Linking.openURL(dayTrip.official_website);
    }
  };

  const toggleSave = async () => {
    setIsSaved(!isSaved);
  };

  const shareTrip = async () => {
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!dayTrip) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Day trip not found</Text>
      </View>
    );
  }

  const displayImage = dayTrip.hero_image_url || dayTrip.image_url;
  const displayDescription = dayTrip.short_description || dayTrip.description;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Hero Image */}
      <View style={{ position: 'relative' }}>
        {displayImage ? (
          <Image
            source={{ uri: displayImage }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{ width: '100%', height: 300, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="image-outline" size={64} color="#999" />
          </View>
        )}
        {(dayTrip.is_must_see || dayTrip.featured) && (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: dayTrip.featured ? '#FFD700' : '#4CAF50',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name={dayTrip.featured ? 'star' : 'bookmark'} size={16} color="#000" />
            <Text style={{ marginLeft: 4, fontWeight: 'bold' }}>
              {dayTrip.featured ? 'Featured' : 'Must-See'}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>
        {/* Title and Rating */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
              {dayTrip.name}
            </Text>
            <Text style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>
              {dayTrip.distance} • {dayTrip.drive_time}
            </Text>
            {dayTrip.train_time && (
              <Text style={{ color: '#666', fontSize: 14 }}>
                Train: {dayTrip.train_time}
              </Text>
            )}
          </View>
          {dayTrip.rating && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 4 }}>
                {dayTrip.rating}
              </Text>
            </View>
          )}
        </View>

        {/* Tags */}
        {dayTrip.tags && dayTrip.tags.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {dayTrip.tags.map((tag, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#E8F5E9',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#2E7D32', fontSize: 12 }}>{tag.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Short Description */}
        <Text style={{ fontSize: 16, color: '#333', marginTop: 16, lineHeight: 24 }}>
          {displayDescription}
        </Text>

        {/* Action Buttons */}
        <View style={{ marginTop: 24 }}>
          {dayTrip.latitude && dayTrip.longitude && (
            <TouchableOpacity
              onPress={openMaps}
              style={{
                backgroundColor: '#007AFF',
                padding: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Ionicons name="navigate" size={24} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                Get Directions
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {dayTrip.official_website && (
              <TouchableOpacity
                onPress={openWebsite}
                style={{
                  flex: 1,
                  backgroundColor: '#F0F0F0',
                  padding: 14,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}
              >
                <Ionicons name="globe-outline" size={20} color="#333" />
                <Text style={{ marginLeft: 6, fontSize: 14, fontWeight: '600' }}>Website</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={toggleSave}
              style={{
                backgroundColor: '#F0F0F0',
                padding: 14,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                minWidth: 60,
              }}
            >
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={20}
                color={isSaved ? '#FF3B30' : '#333'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={shareTrip}
              style={{
                backgroundColor: '#F0F0F0',
                padding: 14,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 60,
              }}
            >
              <Ionicons name="share-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Facts */}
        <View style={{ marginTop: 24, backgroundColor: '#F9F9F9', padding: 16, borderRadius: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Quick Facts</Text>
          
          {dayTrip.recommended_duration && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#333' }}>
                Recommended time: {dayTrip.recommended_duration}
              </Text>
            </View>
          )}

          {dayTrip.cost && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="cash-outline" size={20} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#333' }}>
                Cost: {dayTrip.cost}
              </Text>
            </View>
          )}

          {dayTrip.difficulty && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="fitness-outline" size={20} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#333' }}>
                Difficulty: {dayTrip.difficulty}
              </Text>
            </View>
          )}

          {dayTrip.food_info && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="restaurant-outline" size={20} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#333' }}>
                Food: {dayTrip.food_info}
              </Text>
            </View>
          )}

          {dayTrip.ticket_info && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="ticket-outline" size={20} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: '#333' }}>
                Tickets: {dayTrip.ticket_info}
              </Text>
            </View>
          )}
        </View>

        {/* Photo Gallery */}
        {dayTrip.photos && dayTrip.photos.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dayTrip.photos.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo.image_url }}
                  style={{
                    width: 250,
                    height: 180,
                    borderRadius: 12,
                    marginRight: 12,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Learn More Section (Collapsible) */}
        {(dayTrip.full_description || dayTrip.description) && (
          <View style={{ marginTop: 24, marginBottom: 40 }}>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Learn More</Text>
              <Ionicons
                name={showFullDescription ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>

            {showFullDescription && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 15, color: '#333', lineHeight: 24, marginBottom: 16 }}>
                  {dayTrip.full_description || dayTrip.description}
                </Text>

                {dayTrip.what_to_see && (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                      What to See
                    </Text>
                    <Text style={{ fontSize: 15, color: '#333', lineHeight: 24 }}>
                      {dayTrip.what_to_see}
                    </Text>
                  </View>
                )}

                {dayTrip.local_tips && (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                      Local Tips
                    </Text>
                    <Text style={{ fontSize: 15, color: '#333', lineHeight: 24 }}>
                      {dayTrip.local_tips}
                    </Text>
                  </View>
                )}

                {dayTrip.best_time_to_visit && (
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                      Best Time to Visit
                    </Text>
                    <Text style={{ fontSize: 15, color: '#333', lineHeight: 24 }}>
                      {dayTrip.best_time_to_visit}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}