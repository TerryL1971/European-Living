import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DayTripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Day Trips (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F3EF' },
  text: { fontSize: 18, color: '#2C3E28' },
});
