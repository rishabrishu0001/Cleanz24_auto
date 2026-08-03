'use client';

import React, { useState } from 'react';
import { GOOGLE_SHEETS_HIRING_SCRIPT_URL } from '../config';

const POSITIONS = [
  'Car Wash Technician',
  'Senior Detailer',
  'Store Manager',
  'Customer Relationship Executive',
  'Quality Inspector',
  'Operations Supervisor',
  'Marketing Executive',
  'Receptionist / Front Desk',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  city: '',
  message: '',
};

export default function HiringWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!form.position) {
      setError('Please select a position you are applying for.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: 'Job Application',
        timestamp: new Date().toISOString().split('T')[0],
        name: form.name,
        email: form.email,
        mobile: form.phone,
        position: form.position,
        experience: form.experience,
        city: form.city,
        message: form.message,
        source: 'Car Spa - Hiring Widget',
      };

      await fetch(GOOGLE_SHEETS_HIRING_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Hiring form error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
    setForm(initialForm);
    setError('');
  };

  return (
    <>
      {/* ── Floating Hiring Button ── */}
      <button
        id="hiring-widget-btn"
        onClick={() => setOpen(true)}
        aria-label="We Are Hiring – Apply Now"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #00c96d 0%, #00a855 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px 0 0 12px',
          padding: '14px 10px',
          cursor: 'pointer',
          boxShadow: '-4px 0 20px rgba(0,201,109,0.45)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s ease',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          minHeight: '140px',
          minWidth: '40px',
          letterSpacing: '1.5px',
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          animation: 'hiringPulse 2.5s ease-in-out infinite',
        }}
      >
        <span style={{ fontSize: '1.2rem', writingMode: 'horizontal-tb' }}>💼</span>
        We Are Hiring
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 10000,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.25s ease',
          }}
        />
      )}

      {/* ── Slide-in Drawer ── */}
      <div
        id="hiring-form-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-480px',
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 10001,
          background: 'linear-gradient(160deg, #0a1a0f 0%, #0d2218 50%, #091510 100%)',
          borderLeft: '1px solid rgba(0,201,109,0.25)',
          boxShadow: '-12px 0 50px rgba(0,0,0,0.6)',
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '0',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #00c96d 0%, #00a855 100%)',
            padding: '24px 24px 20px',
            position: 'sticky',
            top: 0,
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.85, marginBottom: '4px', fontWeight: 600 }}>
                CLEANZ24 CAREERS
              </div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>
                Join Our Team 🚀
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', opacity: 0.9, color: '#fff' }}>
                Be part of India's fastest growing car spa network
              </p>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close hiring form"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {submitted ? (
            /* ── Success State ── */
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ color: '#00c96d', fontWeight: 800, marginBottom: '10px' }}>Application Received!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
                Thank you for your interest in joining Cleanz24. Our HR team will review your profile and get back to you within <strong style={{ color: '#fff' }}>3–5 business days</strong>.
              </p>
              <div
                style={{
                  background: 'rgba(0,201,109,0.08)',
                  border: '1px solid rgba(0,201,109,0.2)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '28px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', letterSpacing: '1px' }}>
                  APPLIED FOR
                </div>
                <div style={{ color: '#00c96d', fontWeight: 700 }}>{form.position}</div>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: 'linear-gradient(135deg, #00c96d, #00a855)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Application Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* Open Positions highlight */}
              <div
                style={{
                  background: 'rgba(0,201,109,0.07)',
                  border: '1px solid rgba(0,201,109,0.18)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>✨</span>
                <div>
                  <div style={{ color: '#00c96d', fontWeight: 700, fontSize: '0.85rem' }}>
                    {POSITIONS.length} Open Positions
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem' }}>
                    Multiple locations across India
                  </div>
                </div>
              </div>

              <FieldGroup>
                <Label>Full Name *</Label>
                <Input
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Mobile Number *</Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Email Address *</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Position Applying For *</Label>
                <Select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  required
                >
                  <option value="">— Select a position —</option>
                  {POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </Select>
              </FieldGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <FieldGroup>
                  <Label>Experience</Label>
                  <Select name="experience" value={form.experience} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Fresher (0 yr)">Fresher (0 yr)</option>
                    <option value="0–1 Year">0–1 Year</option>
                    <option value="1–3 Years">1–3 Years</option>
                    <option value="3–5 Years">3–5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <Label>Preferred City *</Label>
                  <Input
                    name="city"
                    placeholder="e.g. Mumbai"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </FieldGroup>
              </div>

              <FieldGroup>
                <Label>Why do you want to join? <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>(optional)</span></Label>
                <textarea
                  name="message"
                  placeholder="Tell us a bit about yourself..."
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(0,201,109,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </FieldGroup>

              {error && (
                <div
                  style={{
                    background: 'rgba(239,68,68,0.12)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fc8181',
                    fontSize: '0.8rem',
                    marginBottom: '16px',
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading
                    ? 'rgba(0,201,109,0.4)'
                    : 'linear-gradient(135deg, #00c96d 0%, #00a855 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  boxShadow: loading ? 'none' : '0 6px 20px rgba(0,201,109,0.35)',
                }}
              >
                {loading ? '⏳ Submitting...' : '🚀 Submit Application'}
              </button>

              <p
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                🔒 Your information is kept strictly confidential
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes hiringPulse {
          0%, 100% { box-shadow: -4px 0 20px rgba(0,201,109,0.45); }
          50%       { box-shadow: -4px 0 30px rgba(0,201,109,0.75); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        #hiring-widget-btn:hover {
          background: linear-gradient(135deg, #00e07a 0%, #00c96d 100%) !important;
          min-width: 48px !important;
          box-shadow: -6px 0 28px rgba(0,201,109,0.65) !important;
        }
      `}</style>
    </>
  );
}

/* ── Small helper sub-components for clean form markup ── */
function FieldGroup({ children }) {
  return <div style={{ marginBottom: '16px' }}>{children}</div>;
}

function Label({ children }) {
  return (
    <label
      style={{
        display: 'block',
        color: 'rgba(255,255,255,0.65)',
        fontSize: '0.75rem',
        fontWeight: 600,
        marginBottom: '6px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </label>
  );
}

function Input({ style = {}, ...props }) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#fff',
        fontSize: '0.85rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'rgba(0,201,109,0.5)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
        props.onBlur?.(e);
      }}
    />
  );
}

function Select({ children, style = {}, ...props }) {
  return (
    <select
      {...props}
      style={{
        width: '100%',
        background: '#0d2218',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#fff',
        fontSize: '0.85rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
        ...style,
      }}
      onFocus={(e) => (e.target.style.borderColor = 'rgba(0,201,109,0.5)')}
      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
    >
      {children}
    </select>
  );
}
