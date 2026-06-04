import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/carSpa.css';
import SEOMeta from '../../components/SEOMeta';

// ── Default Plan Definitions (prices overridden from localStorage) ─────────────
const DEFAULT_ANNUAL_PLANS = [
  {
    id: 'crystal-shield-annual', name: 'Crystal Shield', badge: 'Annual',
    defaultPrice: 9999, period: '/ year', color: '#00C96D',
    bgGradient: 'linear-gradient(135deg, rgba(0,201,109,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Paint Protection Gloss Coating (1 session)',
      '12 Eco Foam Exterior Washes (1 per month)',
      'Vacuuming & Interior Dusting (3 sessions)',
      'Glass Polish & Tire Dressing',
      '10% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'velvet-touch-annual', name: 'Velvet Touch', badge: 'Annual',
    defaultPrice: 18999, period: '/ year', color: '#D4AF37',
    bgGradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Paint Protection Gloss Coating (2 sessions)',
      '24 Eco Foam Exterior Washes (2 per month)',
      'Vacuuming & Deep Carpet Cleaning (6 sessions)',
      'Engine Bay Detailing (1 session)',
      'AC Vent Sanitization (2 sessions)',
      '15% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'pearl-radiance-annual', name: 'Pearl Radiance', badge: 'Annual',
    defaultPrice: 29999, period: '/ year', color: '#3498db',
    bgGradient: 'linear-gradient(135deg, rgba(52,152,219,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Graphene Shield Coating (1 session)',
      'Paint Protection Gloss Coating (2 sessions)',
      'Unlimited Eco Foam Exterior Washes',
      'Unlimited Interior Vacuuming',
      'Leather Care & Conditioning (4 sessions)',
      'Wheel & Underbody Coating (1 session)',
      '20% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'platinum-revival-annual', name: 'Platinum Revival', badge: 'Annual',
    defaultPrice: 49999, period: '/ year', color: '#e74c3c',
    bgGradient: 'linear-gradient(135deg, rgba(231,76,60,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Graphene Shield Premium Coating (2 sessions)',
      'Unlimited Eco Foam Exterior Washes',
      'Unlimited Complete Interior Detailing',
      'Unlimited Doorstep Wash Valet Pickup',
      'Alloy Rim Restoration & Coating',
      'Headlight Restoration & Trim Dressing',
      'Priority Detailing Slot Booking',
      '25% Discount on all Add-on detailing suites'
    ]
  }
];

const DEFAULT_MONTHLY_PLANS = [
  {
    id: 'crystal-shield-monthly', name: 'Crystal Shield', badge: 'Monthly',
    defaultPrice: 999, period: '/ month', color: '#00C96D',
    bgGradient: 'linear-gradient(135deg, rgba(0,201,109,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      '1 Eco Foam Exterior Wash',
      'Vacuuming & Interior Dusting (1 session)',
      'Glass Polish & Tire Dressing',
      '5% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'velvet-touch-monthly', name: 'Velvet Touch', badge: 'Monthly',
    defaultPrice: 1799, period: '/ month', color: '#D4AF37',
    bgGradient: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      '2 Eco Foam Exterior Washes',
      'Vacuuming & Deep Carpet Cleaning (1 session)',
      'AC Vent Sanitization (1 session)',
      '10% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'pearl-radiance-monthly', name: 'Pearl Radiance', badge: 'Monthly',
    defaultPrice: 2999, period: '/ month', color: '#3498db',
    bgGradient: 'linear-gradient(135deg, rgba(52,152,219,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Unlimited Eco Foam Exterior Washes',
      'Unlimited Interior Vacuuming',
      'Leather Care & Conditioning (1 session)',
      '15% Discount on Add-on detailing suites'
    ]
  },
  {
    id: 'platinum-revival-monthly', name: 'Platinum Revival', badge: 'Monthly',
    defaultPrice: 4799, period: '/ month', color: '#e74c3c',
    bgGradient: 'linear-gradient(135deg, rgba(231,76,60,0.15) 0%, rgba(0,0,0,0.4) 100%)',
    features: [
      'Unlimited Eco Foam Exterior Washes',
      'Unlimited Complete Interior Detailing',
      'Unlimited Doorstep Wash Valet Pickup',
      'Priority Detailing Slot Booking',
      '20% Discount on all Add-on detailing suites'
    ]
  }
];

const ALL_DEFAULT_PLANS = [...DEFAULT_ANNUAL_PLANS, ...DEFAULT_MONTHLY_PLANS];

// Helper: format number to ₹ string
const fmtPrice = (num) => '₹' + Number(num).toLocaleString('en-IN');

// ── Mock members (first run only) ─────────────────────────────────────────────
const MOCK_MEMBERS = [
  { id: 'm-1', name: 'Aarav Sharma',  mobile: '9876543210', email: 'aarav.sharma@example.com',  plan: 'crystal-shield-annual',    vehicleNumber: 'DL3CA1234',  vehicleModel: 'Honda City',    startDate: '2026-01-15', status: 'Active' },
  { id: 'm-2', name: 'Riya Patel',    mobile: '9123456789', email: 'riya.patel@example.com',    plan: 'pearl-radiance-annual',    vehicleNumber: 'GJ01AB9876', vehicleModel: 'Hyundai Creta', startDate: '2026-03-10', status: 'Active' },
  { id: 'm-3', name: 'Vikram Singh',  mobile: '9988776655', email: 'vikram.singh@example.com',  plan: 'platinum-revival-annual',  vehicleNumber: 'MH12CD5678', vehicleModel: 'BMW 3 Series',  startDate: '2026-05-02', status: 'Active' }
];

export default function Membership() {
  // ── Main tab & billing cycle ────────────────────────────────────────────────
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we came from a successful payment
  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setSignupSuccess(true);
      if (location.state?.newMember) {
        setLoggedInMember(location.state.newMember);
        localStorage.setItem('cleanz24_logged_in_member', JSON.stringify(location.state.newMember));
        window.dispatchEvent(new Event('auth-change'));
      }
      // clean up state to prevent re-trigger on refresh
      navigate('.', { replace: true, state: {} });
    }
  }, [location, navigate]);

  const [activeTab, setActiveTab]       = useState('buy');     // 'buy' | 'admin'
  const [adminSubTab, setAdminSubTab]   = useState('members'); // 'members' | 'pricing'
  const [billingCycle, setBillingCycle] = useState('annual');  // 'annual' | 'monthly'

  // ── Dynamic plan prices (loaded from / saved to localStorage) ───────────────
  const [planPrices, setPlanPrices] = useState(() => {
    const saved = localStorage.getItem('cleanz24_plan_prices');
    if (saved) return JSON.parse(saved);
    const defaults = {};
    ALL_DEFAULT_PLANS.forEach(p => { defaults[p.id] = p.defaultPrice; });
    return defaults;
  });

  // Merge price overrides into plan objects
  const ANNUAL_PLANS  = DEFAULT_ANNUAL_PLANS.map(p  => ({ ...p, priceNum: planPrices[p.id]  ?? p.defaultPrice, price: fmtPrice(planPrices[p.id]  ?? p.defaultPrice) }));
  const MONTHLY_PLANS = DEFAULT_MONTHLY_PLANS.map(p => ({ ...p, priceNum: planPrices[p.id] ?? p.defaultPrice, price: fmtPrice(planPrices[p.id] ?? p.defaultPrice) }));
  const ALL_PLANS     = [...ANNUAL_PLANS, ...MONTHLY_PLANS];
  const activePlans   = billingCycle === 'annual' ? ANNUAL_PLANS : MONTHLY_PLANS;

  // ── Members ─────────────────────────────────────────────────────────────────
  const [members, setMembers] = useState([]);
  
  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/members');
      if (res.ok) {
        const data = await res.json();
        // map MongoDB _id to id for existing frontend logic
        setMembers(data.map(m => ({...m, id: m._id})));
      }
    } catch (err) {
      console.error('Failed to fetch members:', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ── Signup form ─────────────────────────────────────────────────────────────
  const [clientMode, setClientMode]     = useState('signup'); // 'signup' | 'login'
  const [selectedPlan, setSelectedPlan] = useState('crystal-shield-annual');
  const [formData, setFormData]         = useState({ name: '', mobile: '', email: '', vehicleNumber: '', vehicleModel: '', startDate: new Date().toISOString().split('T')[0] });
  const [formErrors, setFormErrors]     = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  // ── Login form ──────────────────────────────────────────────────────────────
  const [loginMobile, setLoginMobile]   = useState('');
  const [loginError, setLoginError]     = useState('');
  const [loggedInMember, setLoggedInMember] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanz24_logged_in_member');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // ── Admin – member CRUD ──────────────────────────────────────────────────────
  const [searchQuery,    setSearchQuery]    = useState('');
  const [filterPlan,     setFilterPlan]     = useState('all');
  const [editingMember,  setEditingMember]  = useState(null);
  const [editFormData,   setEditFormData]   = useState({});
  const [adminAddOpen,   setAdminAddOpen]   = useState(false);
  const [adminAddData,   setAdminAddData]   = useState({ name: '', mobile: '', email: '', plan: 'crystal-shield-annual', vehicleNumber: '', vehicleModel: '', startDate: new Date().toISOString().split('T')[0], status: 'Active' });

  // ── Admin – Coupons ──────────────────────────────────────────────────────────
  const [coupons, setCoupons] = useState([]);
  const [couponFormData, setCouponFormData] = useState({ code: '', discountPercent: '', active: true });
  
  const fetchCoupons = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.map(c => ({...c, id: c._id})));
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponFormData.code.trim() || !couponFormData.discountPercent) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponFormData.code.toUpperCase(), discountPercent: Number(couponFormData.discountPercent), active: couponFormData.active })
      });
      if (res.ok) {
        fetchCoupons();
        setCouponFormData({ code: '', discountPercent: '', active: true });
      }
    } catch (err) {
      console.error('Failed to add coupon:', err);
    }
  };

  const deleteCoupon = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/coupons/${id}`, { method: 'DELETE' });
        if (res.ok) fetchCoupons();
      } catch (err) {
        console.error('Failed to delete coupon:', err);
      }
    }
  };

  const toggleCouponStatus = async (id) => {
    const coupon = coupons.find(c => c.id === id);
    if (!coupon) return;
    try {
      const res = await fetch(`http://localhost:5000/api/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !coupon.active })
      });
      if (res.ok) fetchCoupons();
    } catch (err) {
      console.error('Failed to toggle coupon:', err);
    }
  };

  // ── Admin – pricing editor ───────────────────────────────────────────────────
  const [editingPrices, setEditingPrices]   = useState({});   // { planId: string }
  const [priceDraft,    setPriceDraft]      = useState({});   // { planId: number }
  const [priceSaved,    setPriceSaved]      = useState(null); // planId of last saved (flash)

  const startPriceEdit = (plan) => {
    setEditingPrices(prev => ({ ...prev, [plan.id]: true }));
    setPriceDraft(prev  => ({ ...prev, [plan.id]: plan.priceNum }));
  };
  const cancelPriceEdit = (planId) => {
    setEditingPrices(prev => { const n = { ...prev }; delete n[planId]; return n; });
  };
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

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const validateForm = (data) => {
    const e = {};
    if (!data.name.trim())         e.name          = 'Full Name is required';
    if (!data.mobile.trim())       e.mobile        = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(data.mobile.replace(/\D/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number';
    if (!data.email.trim())        e.email         = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(data.email))   e.email = 'Enter a valid email address';
    if (!data.vehicleNumber.trim()) e.vehicleNumber = 'Vehicle Number is required';
    if (!data.vehicleModel.trim())  e.vehicleModel  = 'Vehicle Model is required';
    return e;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    
    const planDetails = activePlans.find(p => p.id === selectedPlan);
    const planPrice = planPrices[selectedPlan] || planDetails.defaultPrice;
    
    navigate('/car-spa/payment', { 
      state: { 
        formData, 
        selectedPlan, 
        planDetails, 
        planPrice, 
        billingCycle 
      } 
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginMobile.trim()) { setLoginError('Please enter your mobile number.'); return; }
    const found = members.find(m => m.mobile === loginMobile);
    if (found) {
      setLoggedInMember(found);
      localStorage.setItem('cleanz24_logged_in_member', JSON.stringify(found));
      window.dispatchEvent(new Event('auth-change'));
      setLoginError('');
    } else {
      setLoginError('No membership found with this mobile number.');
    }
  };

  const handleLogout = () => {
    setLoggedInMember(null);
    localStorage.removeItem('cleanz24_logged_in_member');
    window.dispatchEvent(new Event('auth-change'));
    setLoginMobile('');
  };

  const handleAdminAddSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(adminAddData);
    if (Object.keys(errors).length > 0) { alert('Please fill all fields correctly: ' + Object.values(errors).join(', ')); return; }
    
    try {
      const res = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...adminAddData, vehicleNumber: adminAddData.vehicleNumber.toUpperCase() })
      });
      if (res.ok) {
        fetchMembers();
        setAdminAddOpen(false);
        setAdminAddData({ name: '', mobile: '', email: '', plan: 'crystal-shield-annual', vehicleNumber: '', vehicleModel: '', startDate: new Date().toISOString().split('T')[0], status: 'Active' });
      }
    } catch (err) {
      console.error('Failed to add member:', err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(editFormData);
    if (Object.keys(errors).length > 0) { alert('Please correct details: ' + Object.values(errors).join(', ')); return; }
    
    try {
      const res = await fetch(`http://localhost:5000/api/members/${editingMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editFormData, vehicleNumber: editFormData.vehicleNumber.toUpperCase() })
      });
      if (res.ok) {
        fetchMembers();
        setEditingMember(null);
      }
    } catch (err) {
      console.error('Failed to update member:', err);
    }
  };

  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`Cancel membership for ${name}?`)) {
      try {
        const res = await fetch(`http://localhost:5000/api/members/${id}`, { method: 'DELETE' });
        if (res.ok) fetchMembers();
      } catch (err) {
        console.error('Failed to delete member:', err);
      }
    }
  };

  const getPlanName  = (id) => { const p = ALL_PLANS.find(x => x.id === id); return p ? `${p.name} (${p.badge})` : id; };
  const getPlanColor = (id) => { const p = ALL_PLANS.find(x => x.id === id); return p ? p.color : '#fff'; };

  const selectPlanAndScroll = (planId) => {
    setSelectedPlan(planId);
    document.getElementById('signup-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayedMembers = members.filter(m => {
    const q = searchQuery.toLowerCase();
    return (m.name.toLowerCase().includes(q) || m.mobile.includes(q) || m.vehicleNumber.toLowerCase().includes(q))
        && (filterPlan === 'all' || m.plan === filterPlan);
  });

  // Total revenue (sum of plan prices for each member)
  const totalRevenue = members.reduce((sum, m) => {
    const p = ALL_PLANS.find(x => x.id === m.plan);
    return sum + (p ? p.priceNum : 0);
  }, 0);

  // ── Shared plan card ─────────────────────────────────────────────────────────
  const PlanCard = ({ plan }) => (
    <div className="col-lg-3 col-md-6">
      <motion.div whileHover={{ y: -6 }} className="membership-plan-card h-100 d-flex flex-column"
        style={{ background: plan.bgGradient, border: `1px solid ${plan.color}30`, borderTop: `4px solid ${plan.color}`, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.32)', transition: 'box-shadow 0.3s ease' }}>
        <div className="d-flex flex-column h-100" style={{ padding: '24px 22px 22px' }}>
          <div className="d-flex align-items-start justify-content-between mb-2" style={{ gap: '8px' }}>
            <h3 className="h5 fw-bold text-white mb-0 plan-name" style={{ lineHeight: 1.2 }}>{plan.name}</h3>
            <span className="fw-bold flex-shrink-0" style={{ background: `${plan.color}22`, color: plan.color, border: `1px solid ${plan.color}55`, borderRadius: '20px', fontSize: '0.62rem', padding: '3px 9px', letterSpacing: '0.8px', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: '3px' }}>{plan.badge}</span>
          </div>
          <div className="d-flex align-items-baseline mb-4">
            <span className="fw-bold text-gradient" style={{ fontSize: '2rem' }}>{plan.price}</span>
            <span className="text-muted-custom ms-1" style={{ fontSize: '0.85rem' }}>{plan.period}</span>
          </div>
          <ul className="list-unstyled mb-4" style={{ fontSize: '0.875rem', flexGrow: 1 }}>
            {plan.features.map((f, i) => (
              <li key={i} className="mb-2 d-flex align-items-start gap-2 plan-feature-item" style={{ color: 'rgba(255,255,255,0.82)' }}>
                <span style={{ color: plan.color, flexShrink: 0, marginTop: '1px' }}>✔</span><span>{f}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => selectPlanAndScroll(plan.id)} className="btn w-100 fw-bold rounded-pill"
            style={{ backgroundColor: 'transparent', border: `2px solid ${plan.color}`, color: plan.color, transition: 'background-color 0.25s ease, color 0.25s ease', padding: '10px 0', fontSize: '0.9rem', letterSpacing: '0.5px', marginTop: 'auto' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = plan.color; e.currentTarget.style.color = plan.color === '#D4AF37' ? '#111' : '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = plan.color; }}>
            Select Plan
          </button>
        </div>
      </motion.div>
    </div>
  );

  // ── Pricing editor card ──────────────────────────────────────────────────────
  const PricingCard = ({ plan }) => {
    const isEditing = !!editingPrices[plan.id];
    const justSaved = priceSaved === plan.id;
    const inputRef  = useRef(null);
    useEffect(() => { if (isEditing) inputRef.current?.focus(); }, [isEditing]);

    return (
      <motion.div layout whileHover={!isEditing ? { y: -3 } : {}} className="col-md-6 col-lg-3">
        <div className="pricing-editor-card" style={{ background: plan.bgGradient, border: `1px solid ${isEditing ? plan.color : plan.color + '30'}`, borderTop: `4px solid ${plan.color}`, borderRadius: '14px', overflow: 'hidden', boxShadow: isEditing ? `0 0 24px ${plan.color}30` : '0 4px 20px rgba(0,0,0,0.28)', transition: 'all 0.3s ease' }}>
          <div style={{ padding: '20px 20px 18px' }}>

            {/* Plan header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span className="fw-bold" style={{ color: plan.color, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.2px' }}>{plan.badge}</span>
                <div className="fw-bold text-white" style={{ fontSize: '1rem', marginTop: '2px' }}>{plan.name}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${plan.color}18`, border: `1px solid ${plan.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                {plan.badge === 'Annual' ? '📅' : '📆'}
              </div>
            </div>

            {/* Period */}
            <div className="text-muted-custom" style={{ fontSize: '0.75rem', marginBottom: '10px' }}>{plan.period}</div>

            {/* Price display / edit */}
            {isEditing ? (
              <div className="mb-3">
                <label className="text-muted-custom" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>New Price (₹)</label>
                <div className="d-flex gap-2">
                  <div className="d-flex align-items-center flex-grow-1" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${plan.color}80`, borderRadius: '8px', padding: '0 12px' }}>
                    <span style={{ color: plan.color, fontWeight: 700, fontSize: '1rem', marginRight: '4px' }}>₹</span>
                    <input
                      ref={inputRef}
                      type="number"
                      min={1}
                      value={priceDraft[plan.id] ?? plan.priceNum}
                      onChange={e => setPriceDraft(prev => ({ ...prev, [plan.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') savePriceEdit(plan.id); if (e.key === 'Escape') cancelPriceEdit(plan.id); }}
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 700, width: '100%', padding: '10px 0' }}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button onClick={() => savePriceEdit(plan.id)} className="btn btn-sm fw-bold flex-grow-1"
                    style={{ background: plan.color, color: plan.color === '#D4AF37' ? '#111' : '#fff', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '0.8rem' }}>
                    ✓ Save
                  </button>
                  <button onClick={() => cancelPriceEdit(plan.id)} className="btn btn-sm"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem' }}>
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <div className="d-flex align-items-baseline gap-1 mb-1">
                  <span className="fw-bold text-gradient" style={{ fontSize: '1.8rem' }}>{plan.price}</span>
                </div>
                <AnimatePresence>
                  {justSaved && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ color: '#00C96D', fontSize: '0.75rem', fontWeight: 600 }}>
                      ✓ Price updated successfully
                    </motion.div>
                  )}
                </AnimatePresence>
                {plan.priceNum !== plan.defaultPrice && (
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textDecoration: 'line-through', marginTop: '2px' }}>
                    Default: {fmtPrice(plan.defaultPrice)}
                  </div>
                )}
              </div>
            )}

            {/* Edit button */}
            {!isEditing && (
              <button onClick={() => startPriceEdit(plan)} className="btn w-100 fw-bold"
                style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}50`, color: plan.color, borderRadius: '9px', padding: '9px 0', fontSize: '0.82rem', letterSpacing: '0.5px', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${plan.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${plan.color}18`; }}>
                ✏️ Edit Price
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className="membership-page-wrapper d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      <SEOMeta
        title="Car Club Membership Plans"
        description="Become a Cleanz24 Car Club member. Get paint protection coats, unlimited foam washes, interior vacuuming, and significant discounts all year round."
        canonical="https://cleanz24.com/car-spa/membership"
      />

      {/* ── HEADER BANNER ──────────────────────────────────────────────────── */}
      <section className="membership-header-section position-relative text-center overflow-hidden pt-5 pb-4"
        style={{ background: 'linear-gradient(180deg, rgba(0,20,10,0.6) 0%, rgba(0,0,0,0) 100%)' }}>
        <div className="container pt-5 mt-4 pb-2">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block" style={{ letterSpacing: '4px' }}>
            EXCLUSIVE CAR CLUB
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="display-3 fw-black text-gradient mb-3" style={{ fontWeight: 900 }}>
            BECOME A MEMBER
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lead text-white mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1.1rem', opacity: 0.9 }}>
            Join our elite club to enjoy premium ceramic paint protection, unlimited wash benefits, priority scheduling, and heavy savings all year round.
          </motion.p>

          {/* Tab Switch — only Plans & Login visible to public */}
          <div className="membership-tab-switch d-inline-flex bg-secondary-custom p-1 rounded-pill border" style={{ borderColor: 'var(--card-border)' }}>
            <button onClick={() => { setActiveTab('buy'); setSignupSuccess(false); }}
              className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'buy' ? 'btn-glow' : 'bg-transparent text-white'}`}
              style={{ border: 'none', transition: 'all 0.3s ease' }}>
              Plans &amp; Signup
            </button>
            <button onClick={() => setActiveTab('login')}
              className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'login' ? 'btn-glow' : 'bg-transparent text-white'}`}
              style={{ border: 'none', transition: 'all 0.3s ease' }}>
              Member Login
            </button>
          </div>
        </div>
      </section>

      {/* ── PLANS & SIGNUP TAB ──────────────────────────────────────────────── */}
      {activeTab === 'buy' && (
        <div className="container py-4">

          {/* Billing Toggle */}
          <div className="d-flex justify-content-center mb-5">
            <div className="membership-billing-toggle d-inline-flex align-items-center p-1 rounded-pill"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', gap: '4px' }}>
              <button onClick={() => { setBillingCycle('monthly'); setSelectedPlan('crystal-shield-monthly'); }}
                className={`btn billing-toggle-monthly-btn rounded-pill px-4 py-2 fw-semibold${billingCycle === 'monthly' ? ' active' : ''}`}
                style={{ background: billingCycle === 'monthly' ? '#00C96D' : 'transparent', color: billingCycle === 'monthly' ? '#000' : 'rgba(255,255,255,0.6)', border: 'none', transition: 'all 0.3s ease', fontSize: '0.95rem' }}>
                Monthly
              </button>
              <button onClick={() => { setBillingCycle('annual'); setSelectedPlan('crystal-shield-annual'); }}
                className={`btn billing-toggle-annual-btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2${billingCycle === 'annual' ? ' active' : ''}`}
                style={{ background: billingCycle === 'annual' ? '#00C96D' : 'transparent', color: billingCycle === 'annual' ? '#000' : 'rgba(255,255,255,0.6)', border: 'none', transition: 'all 0.3s ease', fontSize: '0.95rem' }}>
                Annual
                <span style={{ background: billingCycle === 'annual' ? 'rgba(0,0,0,0.15)' : 'rgba(0,201,109,0.15)', color: billingCycle === 'annual' ? '#000' : '#00C96D', border: `1px solid ${billingCycle === 'annual' ? 'rgba(0,0,0,0.2)' : 'rgba(0,201,109,0.4)'}`, borderRadius: '20px', fontSize: '0.7rem', padding: '2px 8px', fontWeight: 700, letterSpacing: '0.5px' }}>SAVE UP TO 17%</span>
              </button>
            </div>
          </div>

          {/* Plan Cards */}
          <AnimatePresence mode="wait">
            <motion.div key={billingCycle} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="row g-4 mb-5">
              {activePlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
            </motion.div>
          </AnimatePresence>

          {/* Form Section (Signup/Login) */}
          <div id="signup-form-section" className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card bg-secondary-custom shadow-lg overflow-hidden" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5">

                  {clientMode === 'signup' && !signupSuccess && (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="card-title fw-bold text-white mb-0 text-gradient">Become Our Member</h3>
                        <button onClick={() => setClientMode('login')} className="btn btn-link text-primary-custom p-0 text-decoration-none fw-semibold" style={{ color: '#00C96D' }}>
                          Already a member? Login
                        </button>
                      </div>
                      <p className="text-muted-custom small mb-4">Select your package, fill in your details, and lock in the ultimate care plan for your vehicle.</p>
                      <form onSubmit={handleSignupSubmit} noValidate>
                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="plan" className="form-label fw-bold small text-uppercase text-muted-custom">Select Plan *</label>
                            <select id="plan" value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)}
                              className="form-select py-3 rounded-0 bg-primary-custom text-white border-0" style={{ outline: 'none' }}>
                              <optgroup label="── Annual Plans ──">
                                {ANNUAL_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} ({p.price}/yr)</option>)}
                              </optgroup>
                              <optgroup label="── Monthly Plans ──">
                                {MONTHLY_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} ({p.price}/mo)</option>)}
                              </optgroup>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label fw-bold small text-uppercase text-muted-custom">Start Date *</label>
                            <input type="date" id="startDate" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                              className="form-control py-3 rounded-0 bg-primary-custom text-white border-0" style={{ colorScheme: 'dark' }} required />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Full Name *</label>
                          <input type="text" id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${formErrors.name ? 'is-invalid' : ''}`} required />
                          {formErrors.name && <div className="invalid-feedback text-start">{formErrors.name}</div>}
                        </div>
                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                            <input type="tel" id="mobile" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                              placeholder="Enter 10-digit mobile"
                              className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${formErrors.mobile ? 'is-invalid' : ''}`}
                              maxLength={10} required />
                            {formErrors.mobile && <div className="invalid-feedback text-start">{formErrors.mobile}</div>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-bold small text-uppercase text-muted-custom">Email Address *</label>
                            <input type="email" id="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                              placeholder="Enter email address"
                              className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${formErrors.email ? 'is-invalid' : ''}`} required />
                            {formErrors.email && <div className="invalid-feedback text-start">{formErrors.email}</div>}
                          </div>
                        </div>
                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <label htmlFor="vehicleNumber" className="form-label fw-bold small text-uppercase text-muted-custom">Vehicle Registration No. *</label>
                            <input type="text" id="vehicleNumber" value={formData.vehicleNumber} onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                              placeholder="e.g. DL3CA1234"
                              className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${formErrors.vehicleNumber ? 'is-invalid' : ''}`} required />
                            {formErrors.vehicleNumber && <div className="invalid-feedback text-start">{formErrors.vehicleNumber}</div>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="vehicleModel" className="form-label fw-bold small text-uppercase text-muted-custom">Vehicle Model *</label>
                            <input type="text" id="vehicleModel" value={formData.vehicleModel} onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })}
                              placeholder="e.g. Honda Civic"
                              className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${formErrors.vehicleModel ? 'is-invalid' : ''}`} required />
                            {formErrors.vehicleModel && <div className="invalid-feedback text-start">{formErrors.vehicleModel}</div>}
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3 w-100">
                          Purchase Membership
                        </button>
                      </form>
                    </>
                  )}

                  {clientMode === 'signup' && signupSuccess && (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="signup-success-inner text-center py-5">
                      <div className="display-1 text-success mb-3">🎉</div>
                      <h4 className="fw-bold text-white mb-2">Welcome to the Club!</h4>
                      <p className="text-muted-custom">Your membership has been registered. Our support team will issue your digital pass shortly.</p>
                      <button onClick={() => { setSignupSuccess(false); setClientMode('login'); }}
                        className="btn btn-glow rounded-pill px-5 py-3 fw-bold mt-3">
                        View Your Membership
                      </button>
                    </motion.div>
                  )}

                  {clientMode === 'login' && !loggedInMember && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="card-title fw-bold text-white mb-0 text-gradient">Member Login</h3>
                        <button onClick={() => setClientMode('signup')} className="btn btn-link text-primary-custom p-0 text-decoration-none fw-semibold" style={{ color: '#00C96D' }}>
                          New here? Sign up
                        </button>
                      </div>
                      <p className="text-muted-custom small mb-4">Enter your registered mobile number to check your active membership details.</p>
                      
                      <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                          <label htmlFor="loginMobile" className="form-label fw-bold small text-uppercase text-muted-custom">Registered Mobile Number</label>
                          <input type="tel" id="loginMobile" value={loginMobile} onChange={e => setLoginMobile(e.target.value)}
                            placeholder="Enter 10-digit mobile"
                            className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${loginError ? 'is-invalid' : ''}`}
                            maxLength={10} required />
                          {loginError && <div className="invalid-feedback text-start d-block">{loginError}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3 w-100">
                          Check Membership Status
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {clientMode === 'login' && loggedInMember && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <div className="mb-4 d-flex justify-content-center">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,201,109,0.1)', border: '2px solid #00C96D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#00C96D' }}>
                          👤
                        </div>
                      </div>
                      <h4 className="fw-bold text-white mb-1">Welcome back, {loggedInMember.name}!</h4>
                      <p className="text-muted-custom small mb-4">Here are your active membership details.</p>
                      
                      <div className="bg-primary-custom rounded text-start p-4 mb-4" style={{ border: '1px solid rgba(0,201,109,0.2)' }}>
                        <div className="mb-3">
                          <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Current Plan</div>
                          <div className="fw-bold fs-5" style={{ color: getPlanColor(loggedInMember.plan) }}>{getPlanName(loggedInMember.plan)}</div>
                        </div>
                        <div className="row g-3">
                          <div className="col-6">
                            <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Vehicle</div>
                            <div className="fw-semibold text-white">{loggedInMember.vehicleNumber}</div>
                            <div className="small text-muted-custom">{loggedInMember.vehicleModel}</div>
                          </div>
                          <div className="col-6">
                            <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Start Date</div>
                            <div className="fw-semibold text-white">{new Date(loggedInMember.startDate).toLocaleDateString('en-IN')}</div>
                            <div className="small text-success">Status: {loggedInMember.status}</div>
                          </div>
                        </div>
                      </div>

                      <button onClick={handleLogout} className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold">
                        Log out
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MEMBER LOGIN TAB ──────────────────────────────────────────────── */}
      {activeTab === 'login' && (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-secondary-custom shadow-lg overflow-hidden" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5">
                  {!loggedInMember ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="card-title fw-bold text-white mb-2 text-gradient">Member Login</h3>
                      <p className="text-muted-custom small mb-4">Enter your registered mobile number to check your active membership details.</p>
                      
                      <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                          <label htmlFor="loginMobile" className="form-label fw-bold small text-uppercase text-muted-custom">Registered Mobile Number</label>
                          <input type="tel" id="loginMobile" value={loginMobile} onChange={e => setLoginMobile(e.target.value)}
                            placeholder="Enter 10-digit mobile"
                            className={`form-control py-3 rounded-0 bg-primary-custom text-white border-0 ${loginError ? 'is-invalid' : ''}`}
                            maxLength={10} required />
                          {loginError && <div className="invalid-feedback text-start d-block">{loginError}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3 w-100">
                          Check Membership Status
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <div className="mb-4 d-flex justify-content-center">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,201,109,0.1)', border: '2px solid #00C96D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#00C96D' }}>
                          👤
                        </div>
                      </div>
                      <h4 className="fw-bold text-white mb-1">Welcome back, {loggedInMember.name}!</h4>
                      <p className="text-muted-custom small mb-4">Here are your active membership details.</p>
                      
                      <div className="bg-primary-custom rounded text-start p-4 mb-4" style={{ border: '1px solid rgba(0,201,109,0.2)' }}>
                        <div className="mb-3">
                          <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Current Plan</div>
                          <div className="fw-bold fs-5" style={{ color: getPlanColor(loggedInMember.plan) }}>{getPlanName(loggedInMember.plan)}</div>
                        </div>
                        <div className="row g-3">
                          <div className="col-6">
                            <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Vehicle</div>
                            <div className="fw-semibold text-white">{loggedInMember.vehicleNumber}</div>
                            <div className="small text-muted-custom">{loggedInMember.vehicleModel}</div>
                          </div>
                          <div className="col-6">
                            <div className="small text-muted-custom text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Start Date</div>
                            <div className="fw-semibold text-white">{new Date(loggedInMember.startDate).toLocaleDateString('en-IN')}</div>
                            <div className="small text-success">Status: {loggedInMember.status}</div>
                          </div>
                        </div>
                      </div>

                      <button onClick={handleLogout} className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold">
                        Log out
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
