// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../theme/colors';

interface ThemeContextType {
  colors: typeof lightColors;
  isDarkMode: boolean;
  toggleDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DARK_MODE_KEY = 'darkMode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load saved preference on mount
  useEffect(() => {
    loadDarkModePreference();
  }, []);
  
  const loadDarkModePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (saved !== null) {
        setIsDarkMode(saved === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };
  
  const toggleDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(DARK_MODE_KEY, value.toString());
      setIsDarkMode(value);
      console.log('🌓 Dark mode toggled:', value);
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };
  
  const colors = isDarkMode ? darkColors : lightColors;
  
  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Keep this for backwards compatibility
export function useThemeColors() {
  const { colors } = useTheme();
  return colors;
}