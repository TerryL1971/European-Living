// src/hooks/useAsync.ts

import { useState, useEffect, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for handling async operations with loading/error states
 * 
 * @example
 * const { data, loading, error, execute } = useAsync(
 *   () => getBusinesses(),
 *   true // auto-execute on mount
 * );
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  // Execute the async function
  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      setState({ data: null, loading: false, error: errorMessage });
      console.error('useAsync error:', error);
    }
  }, [asyncFunction]);

  // Reset state
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  // Execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

/**
 * Hook for async operations with dependencies
 * Re-executes when dependencies change
 * 
 * @example
 * const { data, loading, error } = useAsyncWithDeps(
 *   () => getBusinessesByCategory(category),
 *   [category]
 * );
 */
export function useAsyncWithDeps<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      setState({ data: null, loading: false, error: errorMessage });
      console.error('useAsyncWithDeps error:', error);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, execute, reset };
}