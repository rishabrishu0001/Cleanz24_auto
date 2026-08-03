'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7FAFC', padding: '20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A365D', marginBottom: '16px' }}>Oops! Something went wrong</h2>
        <p style={{ color: '#4A5568', marginBottom: '24px' }}>We encountered an unexpected issue while loading this page.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            className="btn btn-primary px-4 py-2"
            style={{ backgroundColor: '#2B6CB0', border: 'none', borderRadius: '30px' }}
          >
            Try Again
          </button>
          <Link
            href="/laundry"
            className="btn btn-outline-secondary px-4 py-2"
            style={{ borderRadius: '30px' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
