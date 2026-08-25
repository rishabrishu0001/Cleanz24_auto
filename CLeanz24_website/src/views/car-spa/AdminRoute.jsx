'use client';

import React, { useState, useEffect } from 'react';

import { API_URL } from '../../config';

/**
 * AdminRoute — Verifies JWT token with backend before rendering children.
 * Redirects to /car-spa/admin if token is missing or invalid.
 */
export default function AdminRoute({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'ok' | 'fail'

  useEffect(() => {
    const token = localStorage.getItem('cleanz24_admin_token');
    if (!token) { setStatus('fail'); return; }

    fetch(`${API_URL}/api/admin/verify-token`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setStatus(data.valid ? 'ok' : 'fail'))
      .catch(() => setStatus('fail'));
  }, []);

  if (status === 'checking') {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-success" role="status" />
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '16px', fontSize: '0.9rem' }}>Verifying session…</p>
        </div>
      </div>
    );
  }

  if (status === 'fail') {
    if (typeof window !== 'undefined') {
      window.location.href = '/car-spa/admin';
    }
    return null;
  }
  return children;
}
