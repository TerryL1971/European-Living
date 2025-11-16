// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome to European Living</Text>
          <Text style={styles.heroSubtitle}>
            Your guide to living and exploring Europe as a military family
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Featured This Week</Text>
          <Text style={styles.text}>Loading featured content...</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EF',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#8B9D7C',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#F5F3EF',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E28',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});