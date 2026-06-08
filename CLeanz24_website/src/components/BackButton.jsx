import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * BackButton — Reusable "Back to Home" button
 * 
 * Usage:
 *   <BackButton />                        → goes to "/" (default)
 *   <BackButton to="/laundry" />          → goes to a specific route
 *   <BackButton label="Back to Laundry" to="/laundry" />
 * 
 * Uses useNavigate hook from react-router-dom.
 */
export default function BackButton({ to = '/', label = '← Back to Home', style = {} }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.25)',
        color: 'inherit',
        padding: '8px 18px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.transform = 'translateX(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {label}
    </button>
  );
}
