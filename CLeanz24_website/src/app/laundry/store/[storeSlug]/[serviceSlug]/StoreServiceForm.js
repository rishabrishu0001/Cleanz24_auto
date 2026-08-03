'use client';

import React, { useState } from 'react';
import { GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL, GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from "../../../../../config";

export default function StoreServiceForm({ storeName, cityName, serviceName }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', query: 'Service Booking' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const isFranchiseQuery = form.query === 'Franchise Opportunity';

      const payload = isFranchiseQuery ? {
        date: dateStr, Date: dateStr, timestamp: dateStr, Timestamp: dateStr,
        name: form.name, Name: form.name,
        mobile: "'+91 " + form.phone, phone: "'+91 " + form.phone, Phone: "'+91 " + form.phone, Mobile: "'+91 " + form.phone,
        email: form.email, Email: form.email,
        city: cityName, City: cityName, Location: `${storeName}, ${cityName}`,
        modelType: `${serviceName} - Franchise inquiry`, Model: form.query, Investment: form.query,
        source: `Store Service Page - ${storeName} - ${serviceName}`, Source: `Store Service Page - ${storeName} - ${serviceName}`
      } : {
        timestamp: dateStr,
        name: form.name,
        mobile: `'${form.phone}`,
        email: form.email || 'N/A',
        service: `${serviceName} Booking (${storeName})`,
        date: 'Asap',
        time: 'Anytime',
        address: `${storeName}, ${cityName}`,
        type: 'Store Service Page Booking Request',
        source: `Store Service Page - ${storeName} - ${serviceName}`,
        sheetName: 'washing leads'
      };

      const targetUrl = isFranchiseQuery ? GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL : GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL;

      await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: "AW-16562330559/Ly9XCOC_iLQaEL-3xNk9" });
          window.gtag("event", "laundry_service_store_lead", { event_category: "ServiceBooking", event_label: `${storeName} - ${serviceName}` });
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting store-service form:", err);
      setSubmitted(true); // fall through to success state for seamless UX
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 10px', color: '#4ade80' }}>
        <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🎉</div>
        <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#4ade80' }}>Booking Received!</h4>
        <p className="city-service-sidebar-p" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
          Thank you! Our team at <strong>{storeName}</strong> will call you within 24 hours regarding your booking for <strong>{serviceName}</strong>.<br /><br />
          For instant support, WhatsApp us at <strong>+91 91380 04800</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <label className="city-service-label" style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '6px' }}>
          Full Name <span style={{ color: '#f87171' }}>*</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          className="city-service-input"
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '11px 14px',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label className="city-service-label" style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '6px' }}>
          Phone Number <span style={{ color: '#f87171' }}>*</span>
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          required
          className="city-service-input"
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '11px 14px',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label className="city-service-label" style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '6px' }}>
          Email Address
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="city-service-input"
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '11px 14px',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label className="city-service-label" style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '6px' }}>
          Inquiry Type
        </label>
        <select
          name="query"
          value={form.query}
          onChange={handleChange}
          className="city-service-input"
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '11px 14px',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        >
          <option value="Service Booking">Book {serviceName} pickup</option>
          <option value="Franchise Opportunity">Interested in Franchise Collaboration</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '14px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          marginTop: '10px',
          boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)',
          transition: 'all 0.2s'
        }}
      >
        {submitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}
