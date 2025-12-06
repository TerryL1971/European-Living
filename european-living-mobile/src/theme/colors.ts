// src/theme/colors.ts - Simplified version for debugging

import { useColorScheme } from 'react-native';

// Light mode colors
export const lightColors = {
  brand: {
    primary: '#0284C7',
    primaryLight: '#0EA5E9',
    primaryDark: '#0C4A6E',
    secondary: '#F59E0B',
    secondaryLight: '#FBBF24',
    gold: '#F59E0B',
    amber: '#D97706',
    button: '#F59E0B',
  },
  background: {
    default: '#FEFDFB',
    alt: '#F9F7F4',
    card: '#FFFFFF',
    soft: '#F9F7F4',
  },
  text: {
    primary: '#1F2937',
    secondary: '#475569',
    muted: '#475569',
    light: '#FFFFFF',
    dark: '#1F2937',
  },
  ui: {
    border: '#94A3B8',
    borderLight: '#E5E7EB',
  },
};

// Dark mode colors
export const darkColors = {
  brand: {
    primary: '#0EA5E9',
    primaryLight: '#38BDF8',
    primaryDark: '#0284C7',
    secondary: '#FBBF24',
    secondaryLight: '#FCD34D',
    gold: '#FBBF24',
    amber: '#F59E0B',
    button: '#FBBF24',
  },
  background: {
    default: '#0F172A',
    alt: '#1E293B',
    card: '#1E293B',
    soft: '#1E293B',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    light: '#FFFFFF',
    dark: '#F8FAFC',
  },
  ui: {
    border: '#334155',
    borderLight: '#475569',
  },
};

// Hook to get current theme colors
export function useThemeColors() {
  const colorScheme = useColorScheme();
  
  // Debug log
  console.log('🌓 Color scheme detected:', colorScheme);
  
  return colorScheme === 'dark' ? darkColors : lightColors;
}

// Default export for backward compatibility
export const colors = lightColors;

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border Radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};