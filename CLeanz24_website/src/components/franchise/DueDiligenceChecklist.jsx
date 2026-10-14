'use client';

import React, { useState } from 'react';

const CHECKLIST_ITEMS = [
  {
    category: '1. Financial & Investment Verification',
    items: [
      { id: 'f1', text: 'Obtain an itemized CapEx breakdown separating franchise fee, machinery, civil work, electrical loads, and GST.' },
      { id: 'f2', text: 'Confirm whether the quoted initial investment includes at least 4 to 6 months of liquid working capital buffer.' },
      { id: 'f3', text: 'Verify whether the royalty fee is calculated on gross sales (revenue) or actual net collections/profits.' },
      { id: 'f4', text: 'Review mandatory supplier markups: Are you legally restricted to buying packaging, chemicals, or inventory solely through the franchisor?' },
      { id: 'f5', text: 'Examine audit clauses: Does the franchisor have arbitrary rights to inspect bank accounts or impose retrospective audit fines?' }
    ]
  },
  {
    category: '2. Territorial Exclusivity & Cannibalisation Protection',
    items: [
      { id: 't1', text: 'Confirm defined radial or pin-code exclusivity (minimum 1.5 to 3 km radius depending on city tier).' },
      { id: 't2', text: 'Verify the franchisor cannot open another franchisee outlet, company-owned store, or online dark-hub inside your assigned zone.' },
      { id: 't3', text: 'Ensure customer leads originating from your pincode through the franchisor mobile app are automatically assigned to your store.' }
    ]
  },
  {
    category: '3. Legal, Agreement & Renewal Terms',
    items: [
      { id: 'l1', text: 'Check the initial agreement duration (standard is 3 to 5 years) and confirm renewal terms/fees upfront.' },
      { id: 'l2', text: 'Examine early termination clauses: What are the financial penalties if the business does not reach operational break-even?' },
      { id: 'l3', text: 'Review non-compete clauses: Does the agreement prevent you from operating a similar business in the city after termination?' },
      { id: 'l4', text: 'Verify dispute resolution jurisdiction: Does arbitration require traveling to the franchisor corporate headquarters?' }
    ]
  },
  {
    category: '4. Machinery, Operations & Field Training',
    items: [
      { id: 'o1', text: 'Inspect machine warranties: Who pays for replacement parts, motor burnout, and technician travel costs?' },
      { id: 'o2', text: 'Confirm on-site master training duration (at least 7 to 14 days of practical hands-on training for operators and owners).' },
      { id: 'o3', text: 'Verify software and POS fees: Is there a recurring monthly IT license fee for billing and inventory software?' },
      { id: 'o4', text: 'Review staff recruitment support: Does the franchisor assist in sourcing and vetting skilled operators (washers, pressers)?' }
    ]
  },
  {
    category: '5. Real Franchisee Field Due Diligence',
    items: [
      { id: 'e1', text: 'Visit at least 3 active franchisee outlets independently without company representatives accompanying you.' },
      { id: 'e2', text: 'Cross-check actual monthly utility bills (commercial power and water) against corporate sales pitch projections.' },
      { id: 'e3', text: 'Ask existing operators about chemical consumption costs, machine breakdown frequency, and local marketing support.' },
      { id: 'e4', text: 'Check if any franchisees in the state have shut down in the last 24 months and investigate root causes.' }
    ]
  }
];

export default function DueDiligenceChecklist() {
  const [checked, setChecked] = useState({});

  const toggleCheck = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalItems = CHECKLIST_ITEMS.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = Object.values(checked).filter(Boolean).length;
  const progressPct = Math.round((completedItems / totalItems) * 100);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '28px',
      margin: '36px 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'inline-block', background: '#F0FDF4', color: '#166534', fontWeight: 700, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Investor Safety Toolkit
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>
            20-Point Franchise Agreement & Operational Due Diligence Audit
          </h3>
          <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
            Complete this independent checklist before signing any franchise contract, transferring token amounts, or leasing commercial property.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          style={{
            background: '#F1F5F9',
            color: '#334155',
            border: '1px solid #CBD5E1',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🖨️ Print / Save Checklist
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
          <span>Due Diligence Completion Score:</span>
          <span>{completedItems} of {totalItems} Checks Completed ({progressPct}%)</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: progressPct >= 80 ? '#10B981' : progressPct >= 40 ? '#2563EB' : '#F59E0B', transition: 'width 0.2s ease' }} />
        </div>
      </div>

      {/* Checklist Groups */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {CHECKLIST_ITEMS.map((group) => (
          <div key={group.category} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B', margin: '0 0 12px' }}>
              {group.category}
            </h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {group.items.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: checked[item.id] ? '#15803D' : '#334155',
                    textDecoration: checked[item.id] ? 'none' : 'none',
                    lineHeight: '1.5'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    style={{
                      marginTop: '3px',
                      width: '16px',
                      height: '16px',
                      accentColor: '#10B981',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontWeight: checked[item.id] ? 600 : 400 }}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
