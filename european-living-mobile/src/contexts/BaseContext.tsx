// src/contexts/BaseContext.tsx

import React, { 
  createContext, 
  useState, 
  useEffect, 
  useContext, 
  ReactNode 
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the context's value
interface BaseContextType {
  selectedBase: string;
  setSelectedBase: (base: string) => Promise<void>;
  bases: string[];
}

// Define the initial context values
const defaultBases = [
  'Stuttgart',
  'Ramstein',
  'Spangdahlem',
  'Wiesbaden',
  'Grafenwöhr',
  'Kaiserslautern',
];

const BaseContext = createContext<BaseContextType | undefined>(undefined);

// Define the Provider component
export const BaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBase, setStateSelectedBase] = useState<string>('Stuttgart');

  // Load the base from AsyncStorage on startup
  useEffect(() => {
    const loadBase = async () => {
      const savedBase = await AsyncStorage.getItem('selectedBase');
      if (savedBase) {
        setStateSelectedBase(savedBase);
      }
    };
    loadBase();
  }, []);

  // Function to update state and persistence
  const updateSelectedBase = async (base: string) => {
    await AsyncStorage.setItem('selectedBase', base);
    setStateSelectedBase(base);
  };

  const contextValue: BaseContextType = {
    selectedBase,
    setSelectedBase: updateSelectedBase,
    bases: defaultBases,
  };

  return (
    <BaseContext.Provider value={contextValue}>
      {children}
    </BaseContext.Provider>
  );
};

// Custom hook to use the base context
export const useBase = () => {
  const context = useContext(BaseContext);
  if (context === undefined) {
    throw new Error('useBase must be used within a BaseProvider');
  }
  return context;
};