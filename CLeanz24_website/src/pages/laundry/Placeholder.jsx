import React from 'react';

export default function Placeholder({ title }) {
  return (
    <div className='section-padding text-center' style={{ padding: '100px 0', minHeight: '60vh' }}>
      <h1>{title}</h1>
      <p className="text-muted mt-3">This page is currently under construction.</p>
    </div>
  );
}
