// src/screens/ProfileScreen.tsx
// UPDATED: Connected to ThemeContext for working dark mode toggle

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
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
import { useTheme } from '../contexts/ThemeContext'; // NEW

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function ProfileScreen({ navigation }: any) {
  const { selectedBase, setSelectedBase, bases } = useBase();
  const { colors, isDarkMode, toggleDarkMode } = useTheme(); // NEW - Get theme

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [notifications, language, profile, background] = await Promise.all([
        AsyncStorage.getItem('notifications'),
        AsyncStorage.getItem('language'),
        AsyncStorage.getItem('profileImage'),
        AsyncStorage.getItem('backgroundImage'),
      ]);

      if (notifications !== null) setNotificationsEnabled(notifications === 'true');
      if (language) setSelectedLanguage(language);
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

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    saveSettings('notifications', value.toString());
  };

  const handleDarkModeToggle = (value: boolean) => {
    toggleDarkMode(value); // NOW CONNECTED TO THEME
    Alert.alert(
      'Theme Updated',
      value ? 'Dark mode is now enabled!' : 'Dark mode is now disabled.',
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

  const handleLanguageSelection = () => {
    const buttons = LANGUAGES.map(lang => ({
      text: `${lang.flag} ${lang.name}`,
      onPress: () => {
        setSelectedLanguage(lang.code);
        saveSettings('language', lang.code);
        Alert.alert(
          'Language Changed',
          `Language set to ${lang.name}. Full translation support coming soon!`,
          [{ text: 'OK' }]
        );
      },
    }));
    
    buttons.push({ 
      text: 'Cancel', 
      onPress: () => {},
    });

    Alert.alert(
      'Select Language',
      'Choose your preferred language',
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

  const getCurrentLanguageName = () => {
    const lang = LANGUAGES.find(l => l.code === selectedLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'English';
  };

  // Dynamic styles that use theme colors
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    section: {
      backgroundColor: colors.background.card,
      marginTop: 16,
      paddingVertical: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text.primary,
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
      borderBottomColor: colors.ui.borderLight,
    },
    settingText: {
      fontSize: 16,
      color: colors.text.primary,
      marginLeft: 12,
    },
    settingValue: {
      fontSize: 14,
      color: colors.text.muted,
    },
    infoBox: {
      flexDirection: 'row',
      backgroundColor: colors.background.card,
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
      color: colors.text.secondary,
      lineHeight: 20,
    },
    socialTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
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
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>📍 Your Base</Text>
        <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleBaseSelection}>
          <View style={styles.settingLeft}>
            <Ionicons name="location" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Base Location</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={dynamicStyles.settingValue}>{selectedBase}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>⚙️ Preferences</Text>
        
        <View style={dynamicStyles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: colors.ui.border, true: colors.brand.primary }}
            thumbColor="#fff"
          />
        </View>

        <View style={dynamicStyles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={24} color={colors.brand.gold} />
            <Text style={dynamicStyles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: colors.ui.border, true: colors.brand.gold }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={handleLanguageSelection}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={dynamicStyles.settingValue}>{getCurrentLanguageName()}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>🚀 Quick Actions</Text>
        
        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={() => navigation.navigate('SavedArticles')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="heart" size={24} color="#FF6B6B" />
            <Text style={dynamicStyles.settingText}>Saved Articles</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={handleShare}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="share-social" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Share App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={handleFeedback}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="chatbubble" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Send Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>ℹ️ About</Text>
        
        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={() => handleLinkPress('https://european-living.live')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="globe" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Visit Website</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={dynamicStyles.settingItem}
          onPress={() => handleLinkPress('https://european-living.live/privacy-policy')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="shield-checkmark" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>Privacy Policy</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.text.muted} />
        </TouchableOpacity>

        <View style={dynamicStyles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={24} color={colors.brand.primary} />
            <Text style={dynamicStyles.settingText}>App Version</Text>
          </View>
          <Text style={dynamicStyles.settingValue}>1.0.0</Text>
        </View>
      </View>

      {/* Info Box */}
      <View style={dynamicStyles.infoBox}>
        <Ionicons name="heart" size={24} color={colors.brand.gold} />
        <Text style={dynamicStyles.infoText}>
          Built by Americans who've lived in Germany for over 10 years, helping thousands of military families explore Europe.
        </Text>
      </View>

      {/* Social Links */}
      <View style={styles.socialContainer}>
        <Text style={dynamicStyles.socialTitle}>Connect With Us</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: colors.brand.primary }]}
            onPress={() => handleLinkPress('https://facebook.com/europeanliving')}
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: colors.brand.primary }]}
            onPress={() => handleLinkPress('https://instagram.com/europeanliving')}
          >
            <Ionicons name="logo-instagram" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: colors.brand.primary }]}
            onPress={() => handleLinkPress('https://twitter.com/europeanliving')}
          >
            <Ionicons name="logo-twitter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Static styles (don't change with theme)
const styles = StyleSheet.create({
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
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