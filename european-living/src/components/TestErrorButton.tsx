// src/components/TestErrorButton.tsx
import { useState } from 'react';

export default function TestErrorButton() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error - Error Boundary is working! ✅');
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
    >
      Test Error Boundary
    </button>
  );
}