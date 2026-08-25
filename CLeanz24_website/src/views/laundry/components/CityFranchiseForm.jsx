'use client';

import React, { useState } from "react";

export default function CityFranchiseForm({ cityName }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "ALPHA MODEL" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name || !form.phone || !form.email) {
      setError("Please fill in all required fields (Name, Phone & Email).");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const dateStr = new Date().toISOString().split("T")[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr, Timestamp: dateStr,
        name: form.name, Name: form.name,
        mobile: "'+91 " + form.phone, phone: "'+91 " + form.phone, Phone: "'+91 " + form.phone, Mobile: "'+91 " + form.phone,
        email: form.email, Email: form.email,
        city: cityName, City: cityName, Location: cityName,
        modelType: form.model + " (Franchise City Page)", Model: form.model, Investment: form.model,
        source: "Franchise City Page - " + cityName, Source: "Franchise City Page - " + cityName
      };

      await fetch("https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: "AW-16562330559/Ly9XCOC_iLQaEL-3xNk9" });
          window.gtag("event", "laundry_franchise_lead", { event_category: "Franchise", event_label: "Franchise City Page Submission - " + cityName });
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting city franchise form:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="franchise-form" style={{ width: '100%', maxWidth: '560px' }}>
      <div className="fcp-form-wrap" id="franchise_form">
        {submitted ? (
          <div className="fcp-success">
            <div className="fcp-success-icon">🎉</div>
            <div className="fcp-success-title">Enquiry Received!</div>
            <div className="fcp-success-text">
              Thank you! Our franchise team will call you within 24 hours regarding your enquiry for <strong>{cityName}</strong>.<br /><br />
              You can also WhatsApp us directly at <strong>+91 91380 04800</strong>.
            </div>
          </div>
        ) : (
          <>
            <div className="fcp-form-title">Franchise Enquiry — {cityName}</div>
            <div className="fcp-form-sub">Fill the form to get your FREE franchise brochure & ROI report for {cityName}</div>
            <form className="fcp-form" onSubmit={handleSubmit}>
              <label>Full Name <span style={{ color: "#e53e3e" }}>*</span></label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

              <label>Phone Number <span style={{ color: "#e53e3e" }}>*</span></label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />

              <label>Email Address <span style={{ color: "#e53e3e" }}>*</span></label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />

              <label>Select Franchise Model</label>
              <select name="model" value={form.model} onChange={handleChange}>
                <option value="ALPHA MODEL">ALPHA MODEL — ₹13 Lacs+ (Starter)</option>
                <option value="BETA MODEL">BETA MODEL — ₹15 Lacs+ (Most Popular)</option>
                <option value="COMBO MODEL">COMBO MODEL — ₹22 Lacs+ (Commercial)</option>
                <option value="HYDRO-CARBON MODEL">HYDRO-CARBON MODEL — ₹35 Lacs+ (Premium)</option>
              </select>

              {error ? <p style={{ color: "#e53e3e", fontSize: "0.88rem", marginBottom: "12px" }}>{error}</p> : null}

              <button type="submit" className="fcp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>
                {submitting ? "⏳ Submitting..." : "🚀 Apply for " + cityName + " Franchise"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
