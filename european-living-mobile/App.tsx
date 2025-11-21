// App.tsx

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { BaseProvider } from './src/contexts/BaseContext'; // ⬅️ NEW IMPORT

export default function App() {
  return (
    // The BaseProvider must wrap everything that needs access to the selectedBase state
    <BaseProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </BaseProvider>
  );
}