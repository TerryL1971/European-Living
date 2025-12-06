// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { BaseProvider } from './src/contexts/BaseContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BaseProvider>
        <AppNavigator />
      </BaseProvider>
    </ThemeProvider>
  );
}