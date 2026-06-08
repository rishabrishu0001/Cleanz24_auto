import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/carSpa.css';
import { API_URL } from '../../config';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { formData, selectedPlan, planDetails, planPrice, billingCycle } = location.state || {};

  // If accessed directly without state, redirect to membership page
  useEffect(() => {
    if (!formData || !planDetails) {
      navigate('/car-spa/membership', { replace: true });
    }
  }, [formData, planDetails, navigate]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!formData || !planDetails) return null;

  const handleApplyCoupon = async () => {
    setCouponError('');
    setCouponSuccess('');
    if (!couponCode.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/coupons`);
      if (!res.ok) throw new Error('Failed to fetch coupons');
      const coupons = await res.json();
      
      const codeUpper = couponCode.trim().toUpperCase();
      const validCoupon = coupons.find(c => c.code.toUpperCase() === codeUpper && c.active);

      if (validCoupon) {
        // Apply discount
        const discount = Math.round((planPrice * validCoupon.discountPercent) / 100);
        setDiscountAmount(discount);
        setCouponSuccess(`Coupon applied! ${validCoupon.discountPercent}% off.`);
      } else {
        setDiscountAmount(0);
        setCouponError('Invalid or expired coupon code.');
      }
    } catch (err) {
      console.error(err);
      setDiscountAmount(0);
      setCouponError('Failed to validate coupon.');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
    setCouponError('');
    setCouponSuccess('');
  };

  const finalTotal = planPrice - discountAmount;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const orderRes = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal, receipt: formData.mobile })
      });
      const orderData = await orderRes.json();
      if (!orderData.id) throw new Error('Order creation failed');

      // 2. Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Loaded from frontend .env file
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cleanz24 Car Spa',
        description: `${planDetails.name} - ${billingCycle} Plan`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment Signature
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // 4. Save Member after successful payment
              const newMemberData = { 
                ...formData, 
                plan: selectedPlan, 
                vehicleNumber: formData.vehicleNumber.toUpperCase(), 
                status: 'Active' 
              };
              const saveRes = await fetch(`${API_URL}/api/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMemberData)
              });
              const savedMember = await saveRes.json();

              navigate('/car-spa/membership', { state: { paymentSuccess: true, newMember: savedMember }, replace: true });
            } else {
              alert("Payment verification failed!");
              setIsProcessing(false);
            }
          } catch (err) {
            console.error(err);
            alert("Error saving membership after payment.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile
        },
        theme: {
          color: '#21c55d'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      alert("Could not initialize payment. Please check your connection.");
      setIsProcessing(false);
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="payment-page-wrapper d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      
      {/* ── HEADER BANNER ──────────────────────────────────────────────────── */}
      <section className="position-relative text-center overflow-hidden pt-5 pb-4 border-bottom" style={{ background: 'var(--bg-body)', borderColor: 'var(--card-border)' }}>
        <div className="container pt-5 mt-4 pb-2">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="display-5 fw-black text-gradient mb-2">
            SECURE CHECKOUT
          </motion.h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '0.9rem' }}>
            Complete your purchase to activate your Cleanz24 exclusive membership benefits immediately.
          </p>
        </div>
      </section>

      <div className="container py-5 flex-grow-1">
        <div className="row g-5">
          
          {/* ── LEFT: PAYMENT DETAILS ────────────────────────────────────────────── */}
          <motion.div className="col-lg-7" initial="hidden" animate="visible" variants={fadeUpVariant}>
            <div className="premium-card p-4 p-md-5 mb-4" style={{ background: 'rgba(10,26,16,0.6)', backdropFilter: 'blur(12px)', border: '1px solid var(--card-border)', borderRadius: '16px' }}>
              <h4 className="fw-bold text-white mb-4 text-gradient">Payment Method</h4>

              {/* Razorpay Gateway Launch */}
              <div className="text-center py-5 rounded border border-secondary mb-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }} />
                <h5 className="text-white fw-bold mb-3">Pay Securely via Razorpay</h5>
                <p className="text-muted-custom small px-4 mb-0">You will be redirected to the Razorpay secure gateway where you can pay using UPI, Credit/Debit Cards, or Netbanking.</p>
              </div>

              <form onSubmit={handlePayment}>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="btn btn-primary btn-glow btn-lg w-100 py-3 fw-bold text-uppercase tracking-widest mt-2"
                  style={{ borderRadius: '8px' }}>
                  {isProcessing ? 'Processing Transaction...' : `Pay ₹${finalTotal.toLocaleString('en-IN')}`}
                </button>
                <div className="text-center mt-3 text-muted-custom small">
                  🔒 Secure 256-bit SSL Encrypted Payment
                </div>
              </form>
            </div>
          </motion.div>

          {/* ── RIGHT: ORDER SUMMARY ────────────────────────────────────────────── */}
          <motion.div className="col-lg-5" initial="hidden" animate="visible" variants={fadeUpVariant} custom={1}>
            <div className="premium-card p-4 mb-4 sticky-top" style={{ top: '100px', background: 'rgba(10,26,16,0.6)', backdropFilter: 'blur(12px)', border: '1px solid var(--card-border)', borderRadius: '16px' }}>
              <h4 className="fw-bold text-white mb-4 border-bottom border-secondary pb-3">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h5 className="fw-bold text-white mb-1">{planDetails.name}</h5>
                  <div className="small text-muted-custom text-uppercase tracking-wider">{billingCycle} Billing</div>
                </div>
                <div className="text-end">
                  <h5 className="fw-bold text-white mb-0">₹{planPrice.toLocaleString('en-IN')}</h5>
                </div>
              </div>

              <div className="bg-dark rounded p-3 mb-4" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="row g-2 small">
                  <div className="col-6 text-muted-custom">Member Name:</div>
                  <div className="col-6 text-white fw-semibold text-end">{formData.name}</div>
                  <div className="col-6 text-muted-custom">Vehicle:</div>
                  <div className="col-6 text-white fw-semibold text-end">{formData.vehicleNumber}</div>
                  <div className="col-6 text-muted-custom">Start Date:</div>
                  <div className="col-6 text-white fw-semibold text-end">{new Date(formData.startDate).toLocaleDateString('en-IN')}</div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-4">
                <label className="form-label small text-muted-custom fw-bold text-uppercase">Discount Coupon</label>
                {!discountAmount ? (
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control bg-dark text-white border-secondary" 
                      placeholder="Enter promo code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button className="btn btn-outline-success px-4 fw-bold" type="button" onClick={handleApplyCoupon}>Apply</button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center bg-dark p-2 px-3 rounded border border-success">
                    <div className="text-success fw-bold d-flex align-items-center gap-2">
                      <span>✓</span> {couponCode} Applied
                    </div>
                    <button className="btn btn-sm btn-link text-muted-custom text-decoration-none p-0" onClick={removeCoupon}>Remove</button>
                  </div>
                )}
                {couponError && <div className="text-danger small mt-2">{couponError}</div>}
                {couponSuccess && <div className="text-success small mt-2">{couponSuccess}</div>}
              </div>

              {/* Totals */}
              <div className="border-top border-secondary pt-3">
                <div className="d-flex justify-content-between mb-2 small text-muted-custom">
                  <span>Subtotal</span>
                  <span>₹{planPrice.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-success">
                    <span>Discount ({couponCode})</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mt-3 pt-3 border-top border-secondary align-items-center">
                  <span className="fw-bold text-white fs-5">Total Pay</span>
                  <span className="fw-black text-brand-primary fs-3">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
