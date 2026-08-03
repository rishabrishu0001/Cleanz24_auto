import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7FAFC', padding: '20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#2B6CB0', marginBottom: '10px' }}>404</h1>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A365D', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ color: '#4A5568', marginBottom: '24px' }}>The page or studio resource you are looking for does not exist or has moved.</p>
        <Link
          href="/laundry"
          className="btn btn-primary px-4 py-2"
          style={{ backgroundColor: '#2B6CB0', border: 'none', borderRadius: '30px', fontWeight: 600 }}
        >
          Return to Cleanz24 Home
        </Link>
      </div>
    </div>
  );
}
