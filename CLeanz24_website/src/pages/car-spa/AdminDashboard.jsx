import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo3.jpeg';
import '../../styles/carSpa.css';
import { API_URL } from '../../config';

const API = API_URL;

// ── Default Plans ─────────────────────────────────────────────────────────────
const DEFAULT_ANNUAL_PLANS = [
  { id: 'crystal-shield-annual',   name: 'Crystal Shield',   badge: 'Annual',  defaultPrice: 9999,  period: '/ year', color: '#00C96D', bgGradient: 'linear-gradient(135deg, rgba(0,201,109,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'velvet-touch-annual',     name: 'Velvet Touch',     badge: 'Annual',  defaultPrice: 18999, period: '/ year', color: '#D4AF37', bgGradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'pearl-radiance-annual',   name: 'Pearl Radiance',   badge: 'Annual',  defaultPrice: 29999, period: '/ year', color: '#3498db', bgGradient: 'linear-gradient(135deg, rgba(52,152,219,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'platinum-revival-annual', name: 'Platinum Revival', badge: 'Annual',  defaultPrice: 49999, period: '/ year', color: '#e74c3c', bgGradient: 'linear-gradient(135deg, rgba(231,76,60,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
];
const DEFAULT_MONTHLY_PLANS = [
  { id: 'crystal-shield-monthly',   name: 'Crystal Shield',   badge: 'Monthly', defaultPrice: 999,  period: '/ month', color: '#00C96D', bgGradient: 'linear-gradient(135deg, rgba(0,201,109,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'velvet-touch-monthly',     name: 'Velvet Touch',     badge: 'Monthly', defaultPrice: 1799, period: '/ month', color: '#D4AF37', bgGradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'pearl-radiance-monthly',   name: 'Pearl Radiance',   badge: 'Monthly', defaultPrice: 2999, period: '/ month', color: '#3498db', bgGradient: 'linear-gradient(135deg, rgba(52,152,219,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
  { id: 'platinum-revival-monthly', name: 'Platinum Revival', badge: 'Monthly', defaultPrice: 4799, period: '/ month', color: '#e74c3c', bgGradient: 'linear-gradient(135deg, rgba(231,76,60,0.15) 0%, rgba(0,0,0,0.4) 100%)' },
];
const ALL_DEFAULT_PLANS = [...DEFAULT_ANNUAL_PLANS, ...DEFAULT_MONTHLY_PLANS];
const fmtPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'pricing' | 'coupons'

  // ── Auth header helper ────────────────────────────────────────────────────
  const authHeader = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('cleanz24_admin_token')}`,
  });

  const handleLogout = () => {
    localStorage.removeItem('cleanz24_admin_token');
    navigate('/car-spa/admin', { replace: true });
  };

  // ── Plans / Pricing ───────────────────────────────────────────────────────
  const [planPrices, setPlanPrices] = useState(() => {
    const saved = localStorage.getItem('cleanz24_plan_prices');
    if (saved) return JSON.parse(saved);
    const defaults = {};
    ALL_DEFAULT_PLANS.forEach(p => { defaults[p.id] = p.defaultPrice; });
    return defaults;
  });

  const ANNUAL_PLANS  = DEFAULT_ANNUAL_PLANS.map(p  => ({ ...p, priceNum: planPrices[p.id]  ?? p.defaultPrice, price: fmtPrice(planPrices[p.id]  ?? p.defaultPrice) }));
  const MONTHLY_PLANS = DEFAULT_MONTHLY_PLANS.map(p => ({ ...p, priceNum: planPrices[p.id] ?? p.defaultPrice, price: fmtPrice(planPrices[p.id] ?? p.defaultPrice) }));
  const ALL_PLANS     = [...ANNUAL_PLANS, ...MONTHLY_PLANS];

  const [editingPrices, setEditingPrices] = useState({});
  const [priceDraft,    setPriceDraft]    = useState({});
  const [priceSaved,    setPriceSaved]    = useState(null);

  const startPriceEdit = (plan) => { setEditingPrices(p => ({ ...p, [plan.id]: true })); setPriceDraft(p => ({ ...p, [plan.id]: plan.priceNum })); };
  const cancelPriceEdit = (id)  => setEditingPrices(p => { const n = { ...p }; delete n[id]; return n; });
  const savePriceEdit = (planId) => {
    const val = parseInt(priceDraft[planId]);
    if (!val || val < 1) return;
    const updated = { ...planPrices, [planId]: val };
    setPlanPrices(updated);
    localStorage.setItem('cleanz24_plan_prices', JSON.stringify(updated));
    cancelPriceEdit(planId);
    setPriceSaved(planId);
    setTimeout(() => setPriceSaved(null), 2000);
  };
  const resetAllPrices = () => {
    if (!window.confirm('Reset all plan prices to factory defaults?')) return;
    const defaults = {};
    ALL_DEFAULT_PLANS.forEach(p => { defaults[p.id] = p.defaultPrice; });
    setPlanPrices(defaults);
    localStorage.setItem('cleanz24_plan_prices', JSON.stringify(defaults));
    setEditingPrices({});
  };

  // ── Members ───────────────────────────────────────────────────────────────
  const [members, setMembers]           = useState([]);
  const [searchQuery, setSearchQuery]   = useState('');
  const [filterPlan, setFilterPlan]     = useState('all');
  const [editingMember, setEditingMember] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [adminAddOpen, setAdminAddOpen] = useState(false);
  const [adminAddData, setAdminAddData] = useState({ name: '', mobile: '', email: '', plan: 'crystal-shield-annual', vehicleNumber: '', vehicleModel: '', startDate: new Date().toISOString().split('T')[0], status: 'Active' });

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/api/members`);
      if (res.ok) setMembers((await res.json()).map(m => ({ ...m, id: m._id })));
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchMembers(); }, []);

  const handleAdminAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/members`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ ...adminAddData, vehicleNumber: adminAddData.vehicleNumber.toUpperCase() }),
      });
      if (res.ok) { fetchMembers(); setAdminAddOpen(false); setAdminAddData({ name: '', mobile: '', email: '', plan: 'crystal-shield-annual', vehicleNumber: '', vehicleModel: '', startDate: new Date().toISOString().split('T')[0], status: 'Active' }); }
    } catch (err) { console.error(err); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/members/${editingMember.id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ ...editFormData, vehicleNumber: editFormData.vehicleNumber?.toUpperCase() }),
      });
      if (res.ok) { fetchMembers(); setEditingMember(null); }
    } catch (err) { console.error(err); }
  };

  const handleDeleteMember = async (id, name) => {
    if (!window.confirm(`Cancel membership for ${name}?`)) return;
    try {
      const res = await fetch(`${API}/api/members/${id}`, { method: 'DELETE', headers: authHeader() });
      if (res.ok) fetchMembers();
    } catch (err) { console.error(err); }
  };

  const getPlanName  = (id) => { const p = ALL_PLANS.find(x => x.id === id); return p ? `${p.name} (${p.badge})` : id; };
  const getPlanColor = (id) => { const p = ALL_PLANS.find(x => x.id === id); return p ? p.color : '#fff'; };
  const totalRevenue = members.reduce((s, m) => { const p = ALL_PLANS.find(x => x.id === m.plan); return s + (p ? p.priceNum : 0); }, 0);

  const displayedMembers = members.filter(m => {
    const q = searchQuery.toLowerCase();
    return (m.name?.toLowerCase().includes(q) || m.mobile?.includes(q) || m.vehicleNumber?.toLowerCase().includes(q))
        && (filterPlan === 'all' || m.plan === filterPlan);
  });

  // ── Coupons ───────────────────────────────────────────────────────────────
  const [coupons, setCoupons]         = useState([]);
  const [couponForm, setCouponForm]   = useState({ code: '', discountPercent: '', active: true });

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API}/api/coupons`);
      if (res.ok) setCoupons((await res.json()).map(c => ({ ...c, id: c._id })));
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchCoupons(); }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponForm.code.trim() || !couponForm.discountPercent) return;
    try {
      const res = await fetch(`${API}/api/coupons`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ code: couponForm.code.toUpperCase(), discountPercent: Number(couponForm.discountPercent), active: couponForm.active }),
      });
      if (res.ok) { fetchCoupons(); setCouponForm({ code: '', discountPercent: '', active: true }); }
    } catch (err) { console.error(err); }
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      const res = await fetch(`${API}/api/coupons/${id}`, { method: 'DELETE', headers: authHeader() });
      if (res.ok) fetchCoupons();
    } catch (err) { console.error(err); }
  };

  const toggleCoupon = async (id) => {
    const c = coupons.find(x => x.id === id); if (!c) return;
    try {
      const res = await fetch(`${API}/api/coupons/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ active: !c.active }),
      });
      if (res.ok) fetchCoupons();
    } catch (err) { console.error(err); }
  };

  // ── Pricing Card ──────────────────────────────────────────────────────────
  const PricingCard = ({ plan }) => {
    const isEditing = !!editingPrices[plan.id];
    const justSaved = priceSaved === plan.id;
    const inputRef  = useRef(null);
    useEffect(() => { if (isEditing) inputRef.current?.focus(); }, [isEditing]);
    return (
      <motion.div layout whileHover={!isEditing ? { y: -3 } : {}} className="col-md-6 col-lg-3">
        <div style={{ background: plan.bgGradient, border: `1px solid ${isEditing ? plan.color : plan.color + '30'}`, borderTop: `4px solid ${plan.color}`, borderRadius: '14px', overflow: 'hidden', boxShadow: isEditing ? `0 0 24px ${plan.color}30` : '0 4px 20px rgba(0,0,0,0.28)', transition: 'all 0.3s ease', padding: '20px' }}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <span style={{ color: plan.color, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700 }}>{plan.badge}</span>
              <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginTop: '2px' }}>{plan.name}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${plan.color}18`, border: `1px solid ${plan.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {plan.badge === 'Annual' ? '📅' : '📆'}
            </div>
          </div>
          <div className="text-muted-custom" style={{ fontSize: '0.75rem', marginBottom: '10px' }}>{plan.period}</div>
          {isEditing ? (
            <div className="mb-3">
              <div className="d-flex gap-2">
                <div className="d-flex align-items-center flex-grow-1" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${plan.color}80`, borderRadius: '8px', padding: '0 12px' }}>
                  <span style={{ color: plan.color, fontWeight: 700, marginRight: '4px' }}>₹</span>
                  <input ref={inputRef} type="number" min={1} value={priceDraft[plan.id] ?? plan.priceNum}
                    onChange={e => setPriceDraft(p => ({ ...p, [plan.id]: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') savePriceEdit(plan.id); if (e.key === 'Escape') cancelPriceEdit(plan.id); }}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 700, width: '100%', padding: '10px 0' }} />
                </div>
              </div>
              <div className="d-flex gap-2 mt-2">
                <button onClick={() => savePriceEdit(plan.id)} className="btn btn-sm fw-bold flex-grow-1" style={{ background: plan.color, color: '#fff', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '0.8rem' }}>✓ Save</button>
                <button onClick={() => cancelPriceEdit(plan.id)} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem' }}>✕</button>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <div className="d-flex align-items-baseline gap-1 mb-1">
                <span className="fw-bold text-gradient" style={{ fontSize: '1.8rem' }}>{plan.price}</span>
              </div>
              <AnimatePresence>
                {justSaved && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#00C96D', fontSize: '0.75rem', fontWeight: 600 }}>✓ Updated!</motion.div>
                )}
              </AnimatePresence>
              {plan.priceNum !== plan.defaultPrice && (
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textDecoration: 'line-through' }}>Default: {fmtPrice(plan.defaultPrice)}</div>
              )}
            </div>
          )}
          {!isEditing && (
            <button onClick={() => startPriceEdit(plan)} className="btn w-100 fw-bold"
              style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}50`, color: plan.color, borderRadius: '9px', padding: '9px 0', fontSize: '0.82rem', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${plan.color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${plan.color}18`; }}>
              ✏️ Edit Price
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'radial-gradient(ellipse at top, #051408 0%, #000 80%)', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAV ─────────────────────────────────────────────────────── */}
      <nav style={{ background: 'rgba(5,20,8,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,201,109,0.12)', padding: '14px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3 align-self-start align-self-sm-center">
            <img src={logoImg} alt="Cleanz24" style={{ height: '36px', borderRadius: '8px' }} />
            <div>
              <div style={{ color: '#00C96D', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>Admin Portal</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Dashboard</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between justify-content-sm-end w-100 w-sm-auto gap-3">
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>🟢 Signed in</span>
            <button onClick={handleLogout}
              style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#ff6b6b', borderRadius: '8px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4 flex-grow-1">

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Members',   value: members.length,                                         icon: '👥', color: '#00C96D' },
            { label: 'Annual Members',  value: members.filter(m => m.plan?.includes('annual')).length,  icon: '📅', color: '#D4AF37' },
            { label: 'Monthly Members', value: members.filter(m => m.plan?.includes('monthly')).length, icon: '📆', color: '#3498db' },
            { label: 'Total Revenue',   value: fmtPrice(totalRevenue),                                  icon: '💰', color: '#e74c3c' },
          ].map((s, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="admin-stat-card"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '18px 20px' }}>
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.73rem', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── SUB-TABS ────────────────────────────────────────────────────── */}
        <div className="d-flex gap-2 mb-4 admin-subtabs-nav" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0, overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {[
            { key: 'members', label: '👥 Members' },
            { key: 'pricing', label: '💲 Plan Pricing' },
            { key: 'coupons', label: '🎟️ Coupons' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                borderRadius: '10px 10px 0 0', border: 'none', padding: '10px 22px', cursor: 'pointer',
                background: activeTab === tab.key ? 'rgba(0,201,109,0.12)' : 'transparent',
                color: activeTab === tab.key ? '#00C96D' : 'rgba(255,255,255,0.45)',
                borderBottom: activeTab === tab.key ? '2px solid #00C96D' : '2px solid transparent',
                transition: 'all 0.2s ease', fontSize: '0.9rem', fontWeight: 600,
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── MEMBERS TAB ──────────────────────────────────────────────── */}
          {activeTab === 'members' && (
            <motion.div key="members" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="card bg-secondary-custom shadow-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5">

                  {/* Header */}
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                      <h3 className="h4 fw-bold text-white mb-1">Active Club Memberships</h3>
                      <p className="text-muted-custom small mb-0">Total: {displayedMembers.length} members shown</p>
                    </div>
                    <button onClick={() => setAdminAddOpen(!adminAddOpen)} className="btn btn-glow rounded-pill px-4 py-2 fw-semibold">
                      {adminAddOpen ? '✕ Close Form' : '➕ Add Member'}
                    </button>
                  </div>

                  {/* Add Member Form */}
                  <AnimatePresence>
                    {adminAddOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border border-success p-4 mb-4"
                        style={{ backgroundColor: 'rgba(0,201,109,0.05)', borderRadius: '10px' }}>
                        <h4 className="h5 fw-bold text-white mb-3 text-gradient">Create New Membership</h4>
                        <form onSubmit={handleAdminAddSubmit}>
                          <div className="row g-3 mb-3">
                            {[{ label: 'Full Name', type: 'text', key: 'name', ph: 'Full name' }, { label: 'Mobile', type: 'tel', key: 'mobile', ph: '10-digit mobile' }, { label: 'Email', type: 'email', key: 'email', ph: 'Email address' }].map(f => (
                              <div className="col-md-4" key={f.key}>
                                <label className="form-label small text-muted-custom">{f.label}</label>
                                <input type={f.type} value={adminAddData[f.key]} placeholder={f.ph} onChange={e => setAdminAddData({ ...adminAddData, [f.key]: e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" required />
                              </div>
                            ))}
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-md-3">
                              <label className="form-label small text-muted-custom">Select Plan</label>
                              <select value={adminAddData.plan} onChange={e => setAdminAddData({ ...adminAddData, plan: e.target.value })} className="form-select py-2 rounded-0 bg-primary-custom text-white border-0">
                                <optgroup label="Annual">{ANNUAL_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Annual</option>)}</optgroup>
                                <optgroup label="Monthly">{MONTHLY_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Monthly</option>)}</optgroup>
                              </select>
                            </div>
                            {[{ label: 'Vehicle Reg No.', key: 'vehicleNumber', ph: 'MH01AB1234' }, { label: 'Vehicle Model', key: 'vehicleModel', ph: 'Honda City' }].map(f => (
                              <div className="col-md-3" key={f.key}>
                                <label className="form-label small text-muted-custom">{f.label}</label>
                                <input type="text" value={adminAddData[f.key]} placeholder={f.ph} onChange={e => setAdminAddData({ ...adminAddData, [f.key]: f.key === 'vehicleNumber' ? e.target.value.toUpperCase() : e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" required />
                              </div>
                            ))}
                            <div className="col-md-3">
                              <label className="form-label small text-muted-custom">Start Date</label>
                              <input type="date" value={adminAddData.startDate} onChange={e => setAdminAddData({ ...adminAddData, startDate: e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" style={{ colorScheme: 'dark' }} required />
                            </div>
                          </div>
                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button type="button" onClick={() => setAdminAddOpen(false)} className="btn btn-outline-secondary rounded-pill px-4 py-2">Cancel</button>
                            <button type="submit" className="btn btn-glow rounded-pill px-4 py-2">Save Member</button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Edit Member Form */}
                  <AnimatePresence>
                    {editingMember && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border border-warning p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212,175,55,0.05)', borderRadius: '10px' }}>
                        <h4 className="h5 fw-bold text-white mb-3 text-gradient">Update Member: {editingMember.name}</h4>
                        <form onSubmit={handleEditSubmit}>
                          <div className="row g-3 mb-3">
                            {[{ label: 'Full Name', type: 'text', key: 'name' }, { label: 'Mobile', type: 'tel', key: 'mobile' }, { label: 'Email', type: 'email', key: 'email' }].map(f => (
                              <div className="col-md-4" key={f.key}>
                                <label className="form-label small text-muted-custom">{f.label}</label>
                                <input type={f.type} value={editFormData[f.key] || ''} onChange={e => setEditFormData({ ...editFormData, [f.key]: e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" required />
                              </div>
                            ))}
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-md-3">
                              <label className="form-label small text-muted-custom">Plan</label>
                              <select value={editFormData.plan || ''} onChange={e => setEditFormData({ ...editFormData, plan: e.target.value })} className="form-select py-2 rounded-0 bg-primary-custom text-white border-0">
                                <optgroup label="Annual">{ANNUAL_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Annual</option>)}</optgroup>
                                <optgroup label="Monthly">{MONTHLY_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Monthly</option>)}</optgroup>
                              </select>
                            </div>
                            {[{ label: 'Vehicle Reg No.', key: 'vehicleNumber' }, { label: 'Vehicle Model', key: 'vehicleModel' }].map(f => (
                              <div className="col-md-3" key={f.key}>
                                <label className="form-label small text-muted-custom">{f.label}</label>
                                <input type="text" value={editFormData[f.key] || ''} onChange={e => setEditFormData({ ...editFormData, [f.key]: f.key === 'vehicleNumber' ? e.target.value.toUpperCase() : e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" required />
                              </div>
                            ))}
                            <div className="col-md-3">
                              <label className="form-label small text-muted-custom">Start Date</label>
                              <input type="date" value={editFormData.startDate || ''} onChange={e => setEditFormData({ ...editFormData, startDate: e.target.value })} className="form-control py-2 rounded-0 bg-primary-custom text-white border-0" style={{ colorScheme: 'dark' }} required />
                            </div>
                          </div>
                          <div className="d-flex justify-content-end gap-2">
                            <button type="button" onClick={() => setEditingMember(null)} className="btn btn-outline-secondary rounded-pill px-4 py-2">Cancel</button>
                            <button type="submit" className="btn btn-glow rounded-pill px-4 py-2">Update Member</button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Search & Filter */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="position-relative">
                        <input type="text" placeholder="Search by name, phone, or vehicle..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="form-control py-3 bg-primary-custom text-white border-0" style={{ paddingLeft: '40px' }} />
                        <span className="position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)} className="form-select py-3 bg-primary-custom text-white border-0">
                        <option value="all">All Plans</option>
                        <optgroup label="Annual">{ANNUAL_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Annual</option>)}</optgroup>
                        <optgroup label="Monthly">{MONTHLY_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} – Monthly</option>)}</optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Table (Desktop) */}
                  <div className="table-responsive d-none d-md-block">
                    <table className="table table-dark table-striped align-middle border-0 text-start" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                          <th className="py-3 ps-3 text-muted-custom small text-uppercase">Member</th>
                          <th className="py-3 text-muted-custom small text-uppercase">Vehicle</th>
                          <th className="py-3 text-muted-custom small text-uppercase">Plan</th>
                          <th className="py-3 text-muted-custom small text-uppercase">Price</th>
                          <th className="py-3 text-muted-custom small text-uppercase">Reg Date</th>
                          <th className="py-3 text-muted-custom small text-uppercase text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedMembers.length > 0 ? displayedMembers.map(member => {
                          const planObj = ALL_PLANS.find(p => p.id === member.plan);
                          return (
                            <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td className="py-3 ps-3"><div className="fw-bold text-white">{member.name}</div><div className="small text-muted-custom">{member.mobile} | {member.email}</div></td>
                              <td className="py-3"><span className="badge bg-secondary-custom text-white border font-monospace px-2 py-1 me-2" style={{ borderColor: 'var(--card-border)', fontSize: '0.78rem' }}>{member.vehicleNumber}</span><span className="small text-white">{member.vehicleModel}</span></td>
                              <td className="py-3"><span className="fw-bold" style={{ color: getPlanColor(member.plan) }}>{getPlanName(member.plan)}</span></td>
                              <td className="py-3"><span className="fw-bold" style={{ color: getPlanColor(member.plan) }}>{planObj ? planObj.price : '—'}</span></td>
                              <td className="py-3 text-muted-custom small">{new Date(member.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                              <td className="py-3 text-center">
                                <div className="d-flex justify-content-center gap-2">
                                  <button onClick={() => { setEditingMember(member); setEditFormData({ ...member }); }} className="btn btn-outline-warning btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', border: '1px solid rgba(212,175,55,0.4)' }} title="Edit">✏️</button>
                                  <button onClick={() => handleDeleteMember(member.id, member.name)} className="btn btn-outline-danger btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', border: '1px solid rgba(231,76,60,0.4)' }} title="Delete">🗑️</button>
                                </div>
                              </td>
                            </tr>
                          );
                        }) : (
                          <tr><td colSpan="6" className="text-center py-5 text-muted-custom">No memberships found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List (< 768px) */}
                  <div className="d-block d-md-none mobile-card-list">
                    {displayedMembers.length > 0 ? (
                      displayedMembers.map(member => {
                        const planObj = ALL_PLANS.find(p => p.id === member.plan);
                        return (
                          <div key={member.id} className="mobile-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <h5 className="fw-bold text-white mb-0" style={{ fontSize: '1.05rem' }}>{member.name}</h5>
                                <span className="small text-muted-custom">{member.mobile}</span>
                              </div>
                              <span className="badge font-monospace px-2 py-1" style={{ border: `1px solid ${getPlanColor(member.plan)}`, color: getPlanColor(member.plan), backgroundColor: `${getPlanColor(member.plan)}12`, fontSize: '0.72rem' }}>
                                {planObj ? planObj.name : member.plan}
                              </span>
                            </div>

                            <div className="mobile-card-field">
                              <span className="mobile-card-label">Email</span>
                              <span className="mobile-card-value text-truncate" style={{ maxWidth: '200px', display: 'inline-block' }}>{member.email || '—'}</span>
                            </div>

                            <div className="mobile-card-field">
                              <span className="mobile-card-label">Vehicle</span>
                              <span className="mobile-card-value">
                                <span className="badge bg-secondary-custom text-white border font-monospace px-2 py-0.5 me-1" style={{ borderColor: 'var(--card-border)', fontSize: '0.75rem' }}>{member.vehicleNumber}</span>
                                <span className="small text-white">{member.vehicleModel}</span>
                              </span>
                            </div>

                            <div className="mobile-card-field">
                              <span className="mobile-card-label">Amount / Cycle</span>
                              <span className="mobile-card-value" style={{ color: getPlanColor(member.plan) }}>
                                {planObj ? `${planObj.price} ${planObj.period}` : '—'}
                              </span>
                            </div>

                            <div className="mobile-card-field">
                              <span className="mobile-card-label">Reg Date</span>
                              <span className="mobile-card-value text-muted-custom">
                                {new Date(member.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                              <button onClick={() => { setEditingMember(member); setEditFormData({ ...member }); }} className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 px-3 py-1.5" style={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                                ✏️ Edit
                              </button>
                              <button onClick={() => handleDeleteMember(member.id, member.name)} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-3 py-1.5" style={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-5 text-muted-custom">No memberships found.</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PRICING TAB ──────────────────────────────────────────────── */}
          {activeTab === 'pricing' && (
            <motion.div key="pricing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                  <h3 className="h4 fw-bold text-white mb-1">Plan Pricing Control</h3>
                  <p className="text-muted-custom small mb-0">Edit any plan's price. Changes are live immediately.</p>
                </div>
                <button onClick={resetAllPrices} style={{ background: 'rgba(231,76,60,0.1)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '10px', padding: '9px 20px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  ↩ Reset All to Defaults
                </button>
              </div>

              <div className="mb-2">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ fontSize: '0.7rem', color: '#00C96D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>📅 Annual Plans</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(0,201,109,0.15)' }} />
                </div>
                <div className="row g-3 mb-5">{ANNUAL_PLANS.map(plan => <PricingCard key={plan.id} plan={plan} />)}</div>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ fontSize: '0.7rem', color: '#3498db', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>📆 Monthly Plans</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(52,152,219,0.15)' }} />
                </div>
                <div className="row g-3 mb-4">{MONTHLY_PLANS.map(plan => <PricingCard key={plan.id} plan={plan} />)}</div>
              </div>

              <div style={{ background: 'rgba(0,201,109,0.06)', border: '1px solid rgba(0,201,109,0.15)', borderRadius: '10px', padding: '14px 18px' }}>
                <p className="mb-0 text-muted-custom" style={{ fontSize: '0.82rem' }}>
                  💡 <strong className="text-white">Tip:</strong> Press <kbd style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '1px 5px' }}>Enter</kbd> to quickly save. To change admin credentials, edit the <code>.env</code> file in the backend and restart the server.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── COUPONS TAB ──────────────────────────────────────────────── */}
          {activeTab === 'coupons' && (
            <motion.div key="coupons" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 className="h4 fw-bold text-white mb-1">Coupon Management</h3>
                  <p className="text-muted-custom small mb-0">Create and manage discount codes.</p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="bg-dark p-4 rounded border border-secondary">
                    <h5 className="fw-bold text-white mb-4">Create New Coupon</h5>
                    <form onSubmit={handleAddCoupon}>
                      <div className="mb-3">
                        <label className="form-label small text-muted-custom">Coupon Code</label>
                        <input type="text" className="form-control bg-primary-custom text-white border-secondary py-2 text-uppercase" placeholder="e.g. FESTIVAL20" value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })} required />
                      </div>
                      <div className="mb-4">
                        <label className="form-label small text-muted-custom">Discount Percentage (%)</label>
                        <input type="number" min="1" max="100" className="form-control bg-primary-custom text-white border-secondary py-2" placeholder="e.g. 20" value={couponForm.discountPercent} onChange={e => setCouponForm({ ...couponForm, discountPercent: e.target.value })} required />
                      </div>
                      <div className="form-check form-switch mb-4">
                        <input className="form-check-input" type="checkbox" role="switch" checked={couponForm.active} onChange={e => setCouponForm({ ...couponForm, active: e.target.checked })} />
                        <label className="form-check-label text-white small">Active (Can be used)</label>
                      </div>
                      <button type="submit" className="btn btn-success w-100 fw-bold">Add Coupon</button>
                    </form>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="table-responsive rounded border border-secondary d-none d-md-block">
                    <table className="table table-dark table-hover mb-0 align-middle">
                      <thead style={{ background: 'var(--bg-secondary-custom)' }}>
                        <tr>
                          <th className="text-muted-custom small fw-semibold text-uppercase py-3 ps-4">Code</th>
                          <th className="text-muted-custom small fw-semibold text-uppercase py-3">Discount</th>
                          <th className="text-muted-custom small fw-semibold text-uppercase py-3">Status</th>
                          <th className="text-muted-custom small fw-semibold text-uppercase py-3 text-end pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.length > 0 ? coupons.map(c => (
                          <tr key={c.id}>
                            <td className="ps-4 fw-bold text-brand-primary">{c.code}</td>
                            <td>{c.discountPercent}% OFF</td>
                            <td><span className={`badge ${c.active ? 'bg-success' : 'bg-secondary'}`}>{c.active ? 'Active' : 'Inactive'}</span></td>
                            <td className="text-end pe-4">
                              <button onClick={() => toggleCoupon(c.id)} className={`btn btn-sm ${c.active ? 'btn-outline-warning' : 'btn-outline-success'} me-2`} style={{ fontSize: '0.75rem' }}>{c.active ? 'Disable' : 'Enable'}</button>
                              <button onClick={() => deleteCoupon(c.id)} className="btn btn-sm btn-outline-danger" style={{ fontSize: '0.75rem' }}>Delete</button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="4" className="text-center py-5 text-muted-custom">No coupons created yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Coupons List (< 768px) */}
                  <div className="d-block d-md-none mobile-card-list">
                    {coupons.length > 0 ? coupons.map(c => (
                      <div key={c.id} className="mobile-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold text-brand-primary" style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>{c.code}</span>
                          <span className={`badge ${c.active ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '0.72rem' }}>
                            {c.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="mobile-card-field">
                          <span className="mobile-card-label">Discount</span>
                          <span className="mobile-card-value">{c.discountPercent}% OFF</span>
                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <button onClick={() => toggleCoupon(c.id)} className={`btn btn-sm ${c.active ? 'btn-outline-warning' : 'btn-outline-success'} px-3 py-1.5`} style={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                            {c.active ? 'Disable' : 'Enable'}
                          </button>
                          <button onClick={() => deleteCoupon(c.id)} className="btn btn-sm btn-outline-danger px-3 py-1.5" style={{ borderRadius: '8px', fontSize: '0.82rem' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-5 text-muted-custom">No coupons created yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
