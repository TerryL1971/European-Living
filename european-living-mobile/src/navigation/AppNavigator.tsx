// src/navigation/AppNavigator.tsx
// UPDATED: Added ServiceDetailScreen and SavedArticlesScreen

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen'; // ✅ NEW
import DayTripsScreen from '../screens/DayTripsScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import SavedArticlesScreen from '../screens/SavedArticlesScreen'; // ✅ NEW

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Day Trips') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Articles') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B9D7C',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#8B9D7C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'European Living' }}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen}
        options={{ title: 'Services' }}
      />
      <Tab.Screen 
        name="Day Trips" 
        component={DayTripsScreen}
        options={{ title: 'Day Trips' }}
      />
      <Tab.Screen 
        name="Articles" 
        component={ArticlesScreen}
        options={{ title: 'Articles' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        
        {/* Article Detail Screen */}
        <Stack.Screen 
          name="ArticleDetail" 
          component={ArticleDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        
        {/* ✅ NEW: Service Detail Screen */}
        <Stack.Screen 
          name="ServiceDetail" 
          component={ServiceDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        
        {/* ✅ NEW: Saved Articles Screen */}
        <Stack.Screen 
          name="SavedArticles" 
          component={SavedArticlesScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}