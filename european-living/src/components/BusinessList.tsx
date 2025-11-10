// Example: src/components/BusinessList.tsx
// This shows how to use the new loading/error states

import { useAsyncWithDeps } from '../hooks/useAsync';
import { fetchBusinesses } from '../services/businessServices';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import { Business, ServiceCategory } from '../types/business';

interface BusinessListProps {
  category?: ServiceCategory;
  baseId?: string;
}

export default function BusinessList({ category, baseId }: BusinessListProps) {
  // ✅ Use the custom hook for automatic loading/error handling
  const { data: businesses, loading, error, execute } = useAsyncWithDeps(
    () => fetchBusinesses({ 
      category, // Now properly typed as ServiceCategory
      baseId 
    }),
    [category, baseId] // Re-fetch when these change
  );

  // ✅ Show loading state
  if (loading) {
    return <LoadingSpinner size="lg" message="Loading businesses..." />;
  }

  // ✅ Show error state with retry button
  if (error) {
    return (
      <ErrorMessage
        title="Failed to load businesses"
        message={error}
        onRetry={execute}
      />
    );
  }

  // ✅ Show empty state
  if (!businesses || businesses.length === 0) {
    return (
      <EmptyState
        title="No businesses found"
        message="We couldn't find any businesses matching your criteria. Try adjusting your filters or check back later."
        action={{
          label: 'Refresh',
          onClick: execute
        }}
        icon={
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />
    );
  }

  // ✅ Render business list
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business: Business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}

// Placeholder component - you already have something like this
function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{business.name}</h3>
      <p className="text-gray-600 text-sm">{business.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{business.city}</span>
        {business.rating && (
          <span className="text-sm">⭐ {business.rating.toFixed(1)}</span>
        )}
      </div>
    </div>
  );
}