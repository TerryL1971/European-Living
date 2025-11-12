// src/contexts/BaseContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BaseContextType {
  selectedBase: string;
  setSelectedBase: (baseId: string) => void;
  isLoaded: boolean;
}

const BaseContext = createContext<BaseContextType | null>(null);

interface BaseProviderProps {
  children: ReactNode;
}

export function BaseProvider({ children }: BaseProviderProps) {
  const [selectedBase, setSelectedBaseState] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedBase = localStorage.getItem('selectedBase');
      if (storedBase) {
        setSelectedBaseState(storedBase);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever it changes
  const setSelectedBase = (baseId: string) => {
    setSelectedBaseState(baseId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedBase', baseId);
    }
  };

  return (
    <BaseContext.Provider value={{ selectedBase, setSelectedBase, isLoaded }}>
      {children}
    </BaseContext.Provider>
  );
}

/**
 * Hook to access base selection context
 * @throws Error if used outside BaseProvider
 */
export function useBase() {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBase must be used within BaseProvider');
  }
  return context;
}

// Suppress fast-refresh warning for context hook
// eslint-disable-next-line react-refresh/only-export-components