// src/screens/ProfileScreen.tsx

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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ⬇️ NEW IMPORT: Import the custom hook
import { useBase } from '../contexts/BaseContext'; 

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function ProfileScreen({ navigation }: any) {
  // 1. Use the global base state and setter
  const { selectedBase, setSelectedBase, bases } = useBase(); 

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  // ❌ REMOVED: const [selectedBase, setSelectedBase] = useState('Stuttgart');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // ❌ REMOVED: const bases = [...] (now comes from useBase)

  // Load saved settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // 2. Removed 'selectedBase' from the list of items to load
      const [notifications, darkMode, language, profile, background] = await Promise.all([
        AsyncStorage.getItem('notifications'),
        AsyncStorage.getItem('darkMode'),
        AsyncStorage.getItem('language'),
        AsyncStorage.getItem('profileImage'),
        AsyncStorage.getItem('backgroundImage'),
      ]);

      if (notifications !== null) setNotificationsEnabled(notifications === 'true');
      if (darkMode !== null) setDarkModeEnabled(darkMode === 'true');
      // ❌ REMOVED: if (base) setSelectedBase(base);
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
    setDarkModeEnabled(value);
    saveSettings('darkMode', value.toString());
    // 3. Updated Dark Mode Alert to remove restart requirement
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
        // 4. Use the context setter, which handles persistence and global state update
        setSelectedBase(base);
        // ❌ REMOVED: saveSettings('selectedBase', base); 
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
  
  // ... (rest of the functions: requestPermission, pickProfileImage, etc.) ...
  
  // No changes needed for the rest of the functions or JSX as they correctly 
  // reference the `selectedBase` variable, which is now sourced from context.

// ... (rest of the functions: requestPermission, pickProfileImage, etc. go here)

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

  const handleShare = () => {
    Alert.alert(
      'Share European Living',
      'Tell your friends about this app!',
      [
        {
          text: 'Share',
          onPress: () => {
            Alert.alert('Share functionality coming soon!');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getCurrentLanguageName = () => {
    const lang = LANGUAGES.find(l => l.code === selectedLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'English';
  };

  return (
    <ScrollView style={styles.container}>
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
        {/* Background Overlay */}
        <View style={styles.headerOverlay} />

        {/* Edit Background Button */}
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

        {/* Profile Picture */}
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Your Base</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleBaseSelection}>
          <View style={styles.settingLeft}>
            <Ionicons name="location" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Base Location</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>{selectedBase}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: '#e0e0e0', true: '#8B9D7C' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#e0e0e0', true: '#8B9D7C' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleLanguageSelection}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>{getCurrentLanguageName()}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Quick Actions</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Articles')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="bookmark" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Saved Articles</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleShare}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="share-social" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Share App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleFeedback}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="chatbubble" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Send Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleLinkPress('https://european-living.live')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="globe" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Visit Website</Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleLinkPress('https://european-living.live/privacy-policy')}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="shield-checkmark" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={24} color="#8B9D7C" />
            <Text style={styles.settingText}>App Version</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Ionicons name="heart" size={24} color="#D4AF37" />
        <Text style={styles.infoText}>
          Built by Americans who've lived in Germany for over 10 years, helping thousands of military families explore Europe.
        </Text>
      </View>

      {/* Social Links */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Connect With Us</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://facebook.com/europeanliving')}
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://instagram.com/europeanliving')}
          >
            <Ionicons name="logo-instagram" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://twitter.com/europeanliving')}
          >
            <Ionicons name="logo-twitter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
  },
  header: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  headerBackground: {
    backgroundColor: '#8B9D7C',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(139, 157, 124, 0.45)',
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
    backgroundColor: '#8B9D7C',
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
    backgroundColor: '#fff',
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E28',
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
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#999',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    color: '#666',
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
    color: '#2C3E28',
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
    backgroundColor: '#8B9D7C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});