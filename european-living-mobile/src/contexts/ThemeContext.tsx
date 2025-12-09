// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../theme/colors';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  colors: typeof lightColors;
  themeMode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_MODE_KEY = 'themeMode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [isReady, setIsReady] = useState(false);
  
  // Load saved preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);
  
  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_MODE_KEY);
      if (saved) {
        setThemeModeState(saved as ThemeMode);
        console.log('📱 Loaded theme preference:', saved);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsReady(true);
    }
  };
  
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, mode);
      setThemeModeState(mode);
      console.log('🎨 Theme mode changed to:', mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  // Determine if we should show dark mode
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && systemColorScheme === 'dark');
  
  const colors = isDarkMode ? darkColors : lightColors;
  
  console.log('🌓 Theme state:', { 
    themeMode, 
    systemColorScheme, 
    isDarkMode,
    isReady 
  });
  
  // Don't render until theme is loaded
  if (!isReady) {
    return null;
  }
  
  return (
    <ThemeContext.Provider value={{ colors, themeMode, isDarkMode, setThemeMode }}>
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

// For backwards compatibility with existing code
export function useThemeColors() {
  const { colors } = useTheme();
  return colors;
}