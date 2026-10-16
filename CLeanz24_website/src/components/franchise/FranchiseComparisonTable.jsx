'use client';

import React, { useState } from 'react';

const FRANCHISE_MATRIX = [
  {
    rank: 1,
    name: 'Cleanz24',
    sector: 'Laundry & Dry Cleaning',
    investmentRange: '₹13L – ₹35L+',
    investmentCategory: 'under_20L',
    franchiseFee: 'Included in setup',
    spaceSqFt: '250 – 500 Sq.Ft',
    royaltyModel: 'Structured operational (0% early burden)',
    paybackMonths: '18 – 20 Months',
    repeatCycle: 'Every 5–7 Days',
    spoilageRisk: 'Zero (Non-perishable)',
    operatorWorkload: 'Low-to-Medium (Semi-automated)',
    score: '94.5 / 100',
    badge: 'Best Overall Pick 2026'
  },
  {
    rank: 2,
    name: 'Amul Preferred Outlet',
    sector: 'Dairy & FMCG Retail',
    investmentRange: '₹2L – ₹6L',
    investmentCategory: 'under_10L',
    franchiseFee: '₹0 (No franchise fee)',
    spaceSqFt: '100 – 300',
    royaltyModel: '0% Royalty (Wholesale-to-Retail margin)',
    paybackMonths: '6 – 12 Months',
    repeatCycle: 'Daily (Morning & Evening)',
    spoilageRisk: 'High (Dairy cold-chain critical)',
    operatorWorkload: 'High (6 AM opening, daily stock)',
    score: '91.0 / 100',
    badge: 'Lowest Capital Entry'
  },
  {
    rank: 3,
    name: 'DTDC Courier',
    sector: 'Express Logistics',
    investmentRange: '₹1L – ₹3.5L',
    investmentCategory: 'under_10L',
    franchiseFee: '₹25k – ₹50k Deposit',
    spaceSqFt: '100 – 250',
    royaltyModel: 'Commission Based (~20–30%)',
    paybackMonths: '6 – 12 Months',
    repeatCycle: 'Weekly / On-demand SME',
    spoilageRisk: 'Zero (Service delivery)',
    operatorWorkload: 'Medium (Dispatch & Counter)',
    score: '88.5 / 100',
    badge: 'Fastest Payback'
  },
  {
    rank: 4,
    name: 'Kidzee',
    sector: 'Preschool Education',
    investmentRange: '₹12L – ₹20L+',
    investmentCategory: 'under_20L',
    franchiseFee: '₹2L – ₹5L',
    spaceSqFt: '2,000 – 3,000',
    royaltyModel: 'Tuition Fee Revenue Share',
    paybackMonths: '20 – 30 Months',
    repeatCycle: 'Annual / Term Enrollment',
    spoilageRisk: 'Zero (Education service)',
    operatorWorkload: 'High (Parent & Safety Care)',
    score: '85.0 / 100',
    badge: 'High Lifetime Value'
  },
  {
    rank: 5,
    name: 'FirstCry',
    sector: 'Kids & Baby Retail',
    investmentRange: '₹35L – ₹50L+',
    investmentCategory: 'above_35L',
    franchiseFee: '₹3L – ₹5L',
    spaceSqFt: '1,000 – 2,500',
    royaltyModel: 'Margin Sharing on Retail Billing',
    paybackMonths: '24 – 36 Months',
    repeatCycle: 'Monthly (Diapers / Apparel)',
    spoilageRisk: 'Low (Apparel sizing deadstock)',
    operatorWorkload: 'Medium-to-High (Inventory & Billing)',
    score: '84.0 / 100',
    badge: 'Omni-channel Leader'
  },
  {
    rank: 6,
    name: 'Lenskart',
    sector: 'Eyewear Retail',
    investmentRange: '₹25L – ₹40L',
    investmentCategory: 'under_35L',
    franchiseFee: '₹2L – ₹5L',
    spaceSqFt: '300 – 500',
    royaltyModel: '25% – 30% Gross Retail Margin',
    paybackMonths: '18 – 24 Months',
    repeatCycle: '18 – 36 Months (Long cycle)',
    spoilageRisk: 'Zero (Central frame inventory)',
    operatorWorkload: 'Low-to-Medium (FOFO Model)',
    score: '87.5 / 100',
    badge: 'High Gross Margin'
  },
  {
    rank: 7,
    name: 'Tumbledry',
    sector: 'Laundry & Dry Cleaning',
    investmentRange: '₹18L – ₹25L',
    investmentCategory: 'under_25L',
    franchiseFee: '₹5L – ₹6.3L',
    spaceSqFt: '250 – 350',
    royaltyModel: '7.5% Monthly Sales Royalty',
    paybackMonths: '18 – 24 Months',
    repeatCycle: 'Every 7 Days',
    spoilageRisk: 'Zero (Garment processing)',
    operatorWorkload: 'Medium (Operations master)',
    score: '86.0 / 100',
    badge: 'Brand Footprint'
  },
  {
    rank: 8,
    name: 'UClean',
    sector: 'Laundromat Services',
    investmentRange: '₹12L – ₹25L',
    investmentCategory: 'under_25L',
    franchiseFee: '₹3L – ₹5L',
    spaceSqFt: '250 – 400',
    royaltyModel: '5% – 7% Monthly Royalty',
    paybackMonths: '18 – 24 Months',
    repeatCycle: 'Every 5–7 Days',
    spoilageRisk: 'Zero (Laundromat wash)',
    operatorWorkload: 'Medium (Walk-in & Pickups)',
    score: '85.5 / 100',
    badge: 'Self-Service Laundromat'
  },
  {
    rank: 9,
    name: 'Naturals Salon',
    sector: 'Grooming & Personal Care',
    investmentRange: '₹30L – ₹60L',
    investmentCategory: 'above_35L',
    franchiseFee: 'Structured in package',
    spaceSqFt: '1,000 – 2,000',
    royaltyModel: 'Monthly Brand Service Fee',
    paybackMonths: '24 – 36 Months',
    repeatCycle: 'Every 30–45 Days',
    spoilageRisk: 'Low (Cosmetics shelf life)',
    operatorWorkload: 'High (Beautician retention critical)',
    score: '83.5 / 100',
    badge: 'High Ticket Packages'
  },
  {
    rank: 10,
    name: 'Dr Lal PathLabs PSC',
    sector: 'Diagnostics & Pathology',
    investmentRange: '₹1L – ₹3L',
    investmentCategory: 'under_10L',
    franchiseFee: '₹10k – ₹50k Deposit',
    spaceSqFt: '200 – 250',
    royaltyModel: '25% – 40% Margin Retention',
    paybackMonths: '6 – 14 Months',
    repeatCycle: 'Quarterly / On-demand Illness',
    spoilageRisk: 'Moderate (Sample cold-transport)',
    operatorWorkload: 'Medium (Phlebotomist staff)',
    score: '88.0 / 100',
    badge: 'Healthcare Essential'
  }
];

export default function FranchiseComparisonTable() {
  const [filterBudget, setFilterBudget] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = FRANCHISE_MATRIX.filter((item) => {
    const matchesBudget =
      filterBudget === 'all' ||
      (filterBudget === 'under_10L' && (item.investmentCategory === 'under_10L')) ||
      (filterBudget === 'under_20L' && (item.investmentCategory === 'under_10L' || item.investmentCategory === 'under_20L')) ||
      (filterBudget === 'above_20L' && (item.investmentCategory === 'under_25L' || item.investmentCategory === 'under_35L' || item.investmentCategory === 'above_35L'));

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesBudget && matchesSearch;
  });

  return (
    <div style={{ margin: '36px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Table Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        background: '#F8FAFC',
        padding: '18px 24px',
        borderRadius: '12px 12px 0 0',
        border: '1px solid #E2E8F0',
        borderBottom: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Filter by Investment Budget:</span>
          {[
            { id: 'all', label: 'All 10 Franchises' },
            { id: 'under_10L', label: 'Under ₹10 Lakhs' },
            { id: 'under_20L', label: 'Under ₹20 Lakhs' },
            { id: 'above_20L', label: '₹20 Lakhs & Above' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilterBudget(btn.id)}
              style={{
                background: filterBudget === btn.id ? '#2563EB' : '#FFFFFF',
                color: filterBudget === btn.id ? '#FFFFFF' : '#475569',
                border: filterBudget === btn.id ? '1px solid #2563EB' : '1px solid #CBD5E1',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by brand or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              width: '240px'
            }}
          />
        </div>
      </div>

      {/* Responsive Table Container */}
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '0 0 12px 12px', background: '#FFFFFF' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#0F172A', color: '#F8FAFC', borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '14px 16px', fontWeight: 700, width: '60px' }}>Rank</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Franchise Brand</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Sector</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>All-In Investment</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Space (Sq Ft)</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Royalty / Fee</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Customer Cycle</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Payback Horizon</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Composite Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((brand, idx) => (
              <tr
                key={brand.name}
                style={{
                  background: brand.rank === 1 ? '#F0FDF4' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  transition: 'background 0.15s ease'
                }}
              >
                <td style={{ padding: '14px 16px', fontWeight: 800, color: brand.rank === 1 ? '#15803D' : '#475569' }}>
                  #{brand.rank}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 800, color: brand.rank === 1 ? '#15803D' : '#0F172A', fontSize: '14px' }}>
                    {brand.name}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    background: brand.rank === 1 ? '#DCFCE7' : '#F1F5F9',
                    color: brand.rank === 1 ? '#166534' : '#475569',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    marginTop: '4px'
                  }}>
                    {brand.badge}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>{brand.sector}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>{brand.investmentRange}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{brand.spaceSqFt}</td>
                <td style={{ padding: '14px 16px', color: '#475569', fontSize: '12px' }}>{brand.royaltyModel}</td>
                <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>{brand.repeatCycle}</td>
                <td style={{ padding: '14px 16px', color: '#0F172A', fontWeight: 700 }}>{brand.paybackMonths}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    display: 'inline-block',
                    background: brand.rank === 1 ? '#15803D' : '#334155',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}>
                    {brand.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '10px 14px', fontSize: '12px', color: '#64748B', background: '#F8FAFC', border: '1px solid #E2E8F0', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
        * <em>Evaluation framework weights:</em> Investment Transparency (20%), Recurring Demand (20%), Operating Economics (20%), Training & Setup (15%), Operating Complexity (10%), Agreement Risk (10%), Quality of Available Proof (5%). Cleanz24 is featured as the #1 recommendation based on the combined score of repeat cycle, zero inventory spoilage, and non-restrictive royalty friction.
      </div>
    </div>
  );
}
