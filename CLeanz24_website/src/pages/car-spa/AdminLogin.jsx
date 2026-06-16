import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo3.jpeg';
import '../../styles/carSpa.css';
import { API_URL } from '../../config';

// ─── Small helper ─────────────────────────────────────────────────────────────
const API = `${API_URL}/api/admin`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('otp'); // 'otp' | 'password'

  // OTP flow
  const [phone, setPhone]         = useState('');
  const [otp, setOtp]             = useState('');
  const [otpSent, setOtpSent]     = useState(false);
  const [otpTimer, setOtpTimer]   = useState(0);

  // Email/password flow
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);

  // Shared
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');

  // If already logged in, redirect
  useEffect(() => {
    const token = localStorage.getItem('cleanz24_admin_token');
    if (token) {
      // Quick verify
      fetch(`${API}/verify-token`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => { if (data.valid) navigate('/car-spa/admin/dashboard', { replace: true }); })
        .catch(() => {});
    }
  }, [navigate]);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, '') }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      setOtpSent(true);
      setOtpTimer(60);
      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 4000);
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp.trim() || otp.length !== 6) { setError('Please enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ''), otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      localStorage.setItem('cleanz24_admin_token', data.token);
      navigate('/car-spa/admin/dashboard', { replace: true });
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      localStorage.setItem('cleanz24_admin_token', data.token);
      navigate('/car-spa/admin/dashboard', { replace: true });
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-wrapper"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #0a2010 0%, #000 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background grid pattern */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,201,109,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,109,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="admin-login-card"
        style={{
          position: 'relative', zIndex: 1,
          background: 'rgba(10, 26, 16, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 201, 109, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,201,109,0.08), 0 0 60px rgba(0,201,109,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #00C96D, #00ff8a, #00C96D)', opacity: 0.8 }} />

        <div className="admin-login-padding" style={{ padding: '40px 36px 36px' }}>
          {/* Logo + title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={logoImg} alt="Cleanz24" className="admin-login-logo" style={{ height: '56px', borderRadius: '10px', marginBottom: '14px', boxShadow: '0 4px 20px rgba(0,201,109,0.2)' }} />
            <div style={{ color: 'rgba(0,201,109,0.8)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '4px' }}>Admin Portal</div>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Welcome Back</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '6px', marginBottom: 0 }}>
              Secure access to Cleanz24 Dashboard
            </p>
          </div>

          {/* Method Toggle */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
            padding: '4px', marginBottom: '28px', gap: '4px',
          }}>
            {[
              { key: 'otp',      label: '📱 Phone OTP' },
              { key: 'password', label: '🔐 Email & Password' },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => { setMethod(m.key); setError(''); setOtpSent(false); setOtp(''); }}
                className="admin-login-toggle-btn"
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                  fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: method === m.key ? 'rgba(0,201,109,0.15)' : 'transparent',
                  color: method === m.key ? '#00C96D' : 'rgba(255,255,255,0.4)',
                  boxShadow: method === m.key ? 'inset 0 0 0 1px rgba(0,201,109,0.3)' : 'none',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Error / Success */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="err"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(231,76,60,0.12)', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#ff6b6b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                ⚠️ {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(0,201,109,0.1)', border: '1px solid rgba(0,201,109,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#00C96D', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                ✅ {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── OTP METHOD ─── */}
          <AnimatePresence mode="wait">
            {method === 'otp' && (
              <motion.div key="otp-method" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }}>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp}>
                    <label style={labelStyle}>Mobile Number</label>
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', fontWeight: 600 }}>+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        style={{ ...inputStyle, paddingLeft: '52px' }}
                        required
                      />
                    </div>
                    <button type="submit" disabled={loading} style={primaryBtnStyle(loading)}>
                      {loading ? <><span className="spinner-border spinner-border-sm me-2" />Sending...</> : '📤 Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>OTP sent to</div>
                      <div style={{ color: '#00C96D', fontWeight: 700 }}>+91 {phone.slice(-10)}</div>
                    </div>
                    <label style={labelStyle}>Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="• • • • • •"
                      maxLength={6}
                      style={{ ...inputStyle, textAlign: 'center', fontSize: '1.6rem', letterSpacing: '12px', fontWeight: 700, marginBottom: '20px' }}
                      autoFocus
                      required
                    />
                    <button type="submit" disabled={loading || otp.length !== 6} style={primaryBtnStyle(loading || otp.length !== 6)}>
                      {loading ? <><span className="spinner-border spinner-border-sm me-2" />Verifying...</> : '🔓 Verify & Login'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                      {otpTimer > 0 ? (
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>Resend OTP in {otpTimer}s</span>
                      ) : (
                        <button type="button" onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: '#00C96D', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                          Resend OTP
                        </button>
                      )}
                      <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.2)' }}>|</span>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(''); setError(''); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.82rem' }}>
                        Change Number
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* ── PASSWORD METHOD ─── */}
            {method === 'password' && (
              <motion.div key="pass-method" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                <form onSubmit={handlePasswordLogin}>
                  <label style={labelStyle}>Admin Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    style={{ ...inputStyle, marginBottom: '16px' }}
                    required
                  />
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter password"
                      style={{ ...inputStyle, paddingRight: '48px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(p => !p)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                  <button type="submit" disabled={loading} style={primaryBtnStyle(loading)}>
                    {loading ? <><span className="spinner-border spinner-border-sm me-2" />Logging in...</> : '🔐 Login to Dashboard'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 36px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            🔒 Secured • Cleanz24 Admin Portal
          </span>
        </div>
      </motion.div>

      {/* Back link */}
      <motion.a
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        href="/car-spa"
        style={{ marginTop: '24px', color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', textDecoration: 'none', position: 'relative', zIndex: 1 }}
      >
        ← Back to Car Spa
      </motion.a>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────
const labelStyle = {
  display: 'block',
  color: 'rgba(255,255,255,0.5)',
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1.2px',
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '13px 16px',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
};

const primaryBtnStyle = (disabled) => ({
  width: '100%',
  padding: '14px',
  background: disabled ? 'rgba(0,201,109,0.3)' : 'linear-gradient(135deg, #00C96D, #00a855)',
  border: 'none',
  borderRadius: '10px',
  color: disabled ? 'rgba(255,255,255,0.5)' : '#fff',
  fontWeight: 700,
  fontSize: '0.95rem',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  boxShadow: disabled ? 'none' : '0 4px 20px rgba(0,201,109,0.3)',
  transition: 'all 0.25s ease',
});
