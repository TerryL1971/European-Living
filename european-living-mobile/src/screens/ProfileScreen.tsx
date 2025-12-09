// src/screens/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  ImageBackground,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBase } from '../contexts/BaseContext';
import { useTheme } from '../contexts/ThemeContext';



export default function ProfileScreen({ navigation }: any) {
  const { selectedBase, setSelectedBase, bases } = useBase();
  const { colors, themeMode, setThemeMode } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [notifications, profile, background] = await Promise.all([
        AsyncStorage.getItem('notifications'),
        AsyncStorage.getItem('profileImage'),
        AsyncStorage.getItem('backgroundImage'),
      ]);

      if (notifications !== null) setNotificationsEnabled(notifications === 'true');
      if (profile) setProfileImage(profile);
      if (background) setBackgroundImage(background);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleNotificationsToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    await saveSettings('notifications', value.toString());
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode);
    const modeText = mode === 'auto' ? 'System Default' : mode === 'dark' ? 'Dark Mode' : 'Light Mode';
    Alert.alert(
      'Theme Updated',
      `Theme set to ${modeText}`,
      [{ text: 'OK' }]
    );
  };

  const handleBaseSelection = () => {
    const buttons = bases.map(base => ({
      text: base,
      onPress: () => {
        setSelectedBase(base);
      },
    }));
    
    buttons.push({ 
      text: 'Cancel', 
      onPress: () => {},
    });

    Alert.alert(
      'Select Your Base',
      'Choose your nearest military base',
      buttons
    );
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos to change your profile picture.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const pickProfileImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        saveSettings('profileImage', imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickBackgroundImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setBackgroundImage(imageUri);
        saveSettings('backgroundImage', imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeProfileImage = () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setProfileImage(null);
            AsyncStorage.removeItem('profileImage');
          },
        },
      ]
    );
  };

  const removeBackgroundImage = () => {
    Alert.alert(
      'Remove Background',
      'Are you sure you want to remove your custom background?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setBackgroundImage(null);
            AsyncStorage.removeItem('backgroundImage');
          },
        },
      ]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleFeedback = () => {
    Linking.openURL('mailto:contact@european-living.live?subject=App Feedback');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out European Living - Your guide to living and traveling in Europe!\n\nDownload: [App Store/Play Store Link Coming Soon]\nWebsite: https://european-living.live',
        title: 'European Living App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share app');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.default }]}>
      {/* Profile Header with Background */}
      <ImageBackground
        source={
          backgroundImage
            ? { uri: backgroundImage }
            : require('../../assets/icon.png')
        }
        style={styles.header}
        imageStyle={styles.headerBackground}
      >
        <View style={styles.headerOverlay} />

        <TouchableOpacity
          style={styles.editBackgroundButton}
          onPress={() => {
            Alert.alert(
              'Background Image',
              'Choose an action',
              [
                { text: 'Change Background', onPress: pickBackgroundImage },
                backgroundImage && {
                  text: 'Remove Background',
                  style: 'destructive',
                  onPress: removeBackgroundImage,
                },
                { text: 'Cancel', style: 'cancel' },
              ].filter(Boolean) as any
            );
          }}
        >
          <Ionicons name="image" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => {
            Alert.alert(
              'Profile Picture',
              'Choose an action',
              [
                { text: 'Change Photo', onPress: pickProfileImage },
                profileImage && {
                  text: 'Remove Photo',
                  style: 'destructive',
                  onPress: removeProfileImage,
                },
                { text: 'Cancel', style: 'cancel' },
              ].filter(Boolean) as any
            );
          }}
          activeOpacity={0.8}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={48} color="#fff" />
          )}
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </ImageBackground>

      {/* Base Location Section */}
      <View style={[styles.section, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>📍 Your Base</Text>
        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]} 
          onPress={handleBaseSelection}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="location" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Base Location</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={[styles.settingValue, { color: colors.text.muted }]}>{selectedBase}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={[styles.section, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>⚙️ Preferences</Text>
        
        <View style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Notifications</Text>
          </View>
          <View style={styles.notificationToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                { backgroundColor: notificationsEnabled ? colors.brand.primary : colors.ui.border }
              ]}
              onPress={() => handleNotificationsToggle(!notificationsEnabled)}
            >
              <View style={[
                styles.toggleThumb,
                notificationsEnabled && styles.toggleThumbActive
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={24} color={colors.brand.gold} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Theme</Text>
          </View>
          <View style={styles.themeSwitcher}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: themeMode === 'light' ? colors.brand.primary : colors.background.alt }
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Ionicons 
                name="sunny" 
                size={16} 
                color={themeMode === 'light' ? '#fff' : colors.text.muted} 
              />
              <Text style={[
                styles.themeButtonText,
                { color: themeMode === 'light' ? '#fff' : colors.text.muted }
              ]}>Light</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: themeMode === 'dark' ? colors.brand.primary : colors.background.alt }
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Ionicons 
                name="moon" 
                size={16} 
                color={themeMode === 'dark' ? '#fff' : colors.text.muted} 
              />
              <Text style={[
                styles.themeButtonText,
                { color: themeMode === 'dark' ? '#fff' : colors.text.muted }
              ]}>Dark</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: themeMode === 'auto' ? colors.brand.primary : colors.background.alt }
              ]}
              onPress={() => handleThemeChange('auto')}
            >
              <Ionicons 
                name="phone-portrait" 
                size={16} 
                color={themeMode === 'auto' ? '#fff' : colors.text.muted} 
              />
              <Text style={[
                styles.themeButtonText,
                { color: themeMode === 'auto' ? '#fff' : colors.text.muted }
              ]}>Auto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>🚀 Quick Actions</Text>
        
        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}
          onPress={() => navigation.navigate('SavedArticles')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="heart" size={24} color="#FF6B6B" />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Saved Articles</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}
          onPress={handleShare}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="share-social" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Share App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}
          onPress={handleFeedback}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="chatbubble" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Send Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>ℹ️ About</Text>
        
        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}
          onPress={() => handleLinkPress('https://european-living.live')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="globe" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Visit Website</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}
          onPress={() => handleLinkPress('https://european-living.live/privacy-policy')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="shield-checkmark" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>Privacy Policy</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <View style={[styles.settingItem, { borderBottomColor: colors.ui.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={24} color={colors.brand.primary} />
            <Text style={[styles.settingText, { color: colors.text.primary }]}>App Version</Text>
          </View>
          <Text style={[styles.settingValue, { color: colors.text.muted }]}>1.0.0</Text>
        </View>
      </View>

      {/* Info Box */}
      <View style={[styles.infoBox, { backgroundColor: colors.background.card }]}>
        <Ionicons name="heart" size={24} color={colors.brand.gold} />
        <Text style={[styles.infoText, { color: colors.text.secondary }]}>
          Built by Americans who've lived in Germany for over 10 years, helping thousands of military families explore Europe.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  headerBackground: {
    backgroundColor: '#0284C7',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 132, 199, 0.45)',
  },
  editBackgroundButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'relative',
    zIndex: 2,
  },
  avatarImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0284C7',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    zIndex: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#F5F3EF',
    opacity: 0.9,
    zIndex: 2,
  },
  section: {
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
  },
  notificationToggle: {
    marginLeft: 'auto',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  themeSwitcher: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  themeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});