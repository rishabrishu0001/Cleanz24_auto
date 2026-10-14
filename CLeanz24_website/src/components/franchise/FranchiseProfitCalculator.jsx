'use client';

import React, { useState, useId } from 'react';

/**
 * Franchise Profit & Working Capital Calculator
 * Allows prospective investors to model revenue, fixed costs, variable costs,
 * operating surplus, and capital payback horizons with transparent assumptions.
 */
export default function FranchiseProfitCalculator() {
  const [modelType, setModelType] = useState('laundry_alpha'); // 'laundry_alpha' | 'laundry_beta' | 'retail_kiosk' | 'service_center'
  const [monthlyRevenue, setMonthlyRevenue] = useState(300000);
  const [monthlyRent, setMonthlyRent] = useState(35000);
  const [staffCount, setStaffCount] = useState(3);
  const [avgStaffSalary, setAvgStaffSalary] = useState(15000);
  const [utilityCost, setUtilityCost] = useState(18000); // Power + Water
  const [consumablesPct, setConsumablesPct] = useState(12); // Chemicals/packaging % of rev
  const [royaltyPct, setRoyaltyPct] = useState(0); // Royalty %
  const [initialCapital, setInitialCapital] = useState(1300000); // All-in CapEx

  // Derived calculations
  const totalSalaries = staffCount * avgStaffSalary;
  const consumablesCost = Math.round((monthlyRevenue * consumablesPct) / 100);
  const royaltyCost = Math.round((monthlyRevenue * royaltyPct) / 100);
  const miscellaneousCost = Math.round(monthlyRevenue * 0.04); // 4% maintenance, software, local ads

  const totalMonthlyOpEx = monthlyRent + totalSalaries + utilityCost + consumablesCost + royaltyCost + miscellaneousCost;
  const monthlyOperatingSurplus = monthlyRevenue - totalMonthlyOpEx;
  const operatingMarginPct = monthlyRevenue > 0 ? ((monthlyOperatingSurplus / monthlyRevenue) * 100).toFixed(1) : 0;
  const annualOperatingSurplus = monthlyOperatingSurplus * 12;
  const estimatedPaybackMonths = monthlyOperatingSurplus > 0 ? (initialCapital / monthlyOperatingSurplus).toFixed(1) : 'Unprofitable at current volume';

  const handlePresetChange = (preset) => {
    setModelType(preset);
    if (preset === 'laundry_alpha') {
      setInitialCapital(1300000);
      setMonthlyRevenue(280000);
      setMonthlyRent(32000);
      setStaffCount(2);
      setAvgStaffSalary(14000);
      setUtilityCost(16000);
      setConsumablesPct(10);
      setRoyaltyPct(0);
    } else if (preset === 'laundry_beta') {
      setInitialCapital(1500000);
      setMonthlyRevenue(420000);
      setMonthlyRent(45000);
      setStaffCount(3);
      setAvgStaffSalary(15000);
      setUtilityCost(24000);
      setConsumablesPct(11);
      setRoyaltyPct(0);
    } else if (preset === 'laundry_combo') {
      setInitialCapital(2200000);
      setMonthlyRevenue(650000);
      setMonthlyRent(60000);
      setStaffCount(4);
      setAvgStaffSalary(16000);
      setUtilityCost(35000);
      setConsumablesPct(12);
      setRoyaltyPct(0);
    } else if (preset === 'competitor_avg') {
      setInitialCapital(2000000);
      setMonthlyRevenue(350000);
      setMonthlyRent(40000);
      setStaffCount(3);
      setAvgStaffSalary(15000);
      setUtilityCost(22000);
      setConsumablesPct(14);
      setRoyaltyPct(7.5);
    }
  };

  const revenueId = useId();
  const rentId = useId();
  const staffId = useId();
  const salaryId = useId();
  const utilityId = useId();
  const consumablesId = useId();
  const royaltyId = useId();
  const capitalId = useId();

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '28px',
      margin: '32px 0',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'inline-block', background: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Interactive Due Diligence Tool
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '4px 0 8px' }}>
          Franchise Profit, OpEx & Payback Horizon Simulator
        </h3>
        <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Model your projected unit-level economics by adjusting revenue assumptions, fixed rental liabilities, staff wages, utility loads, and royalty deductions. Figures represent illustrative modeling and do not constitute guaranteed returns.
        </p>
      </div>

      {/* Preset Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Quick Load Representative Store Formats:
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: 'laundry_alpha', label: 'Cleanz24 Alpha (₹13L Entry)' },
            { id: 'laundry_beta', label: 'Cleanz24 Beta (₹15L Mid-Tier)' },
            { id: 'laundry_combo', label: 'Cleanz24 Combo Hub (₹22L High-Volume)' },
            { id: 'competitor_avg', label: 'Typical Franchise (₹20L + 7.5% Royalty)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePresetChange(item.id)}
              style={{
                background: modelType === item.id ? '#2563EB' : '#F8FAFC',
                color: modelType === item.id ? '#FFFFFF' : '#475569',
                border: modelType === item.id ? '1px solid #2563EB' : '1px solid #CBD5E1',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div>
          <label htmlFor={capitalId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            All-In Capital Invested (CapEx in ₹):
          </label>
          <input
            id={capitalId}
            type="number"
            min="100000"
            step="50000"
            value={initialCapital}
            onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Includes machinery, franchise fee, deposit, fit-out.</span>
        </div>

        <div>
          <label htmlFor={revenueId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Target Monthly Revenue (₹):
          </label>
          <input
            id={revenueId}
            type="number"
            min="20000"
            step="10000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Estimated monthly gross customer billing.</span>
        </div>

        <div>
          <label htmlFor={rentId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Monthly Commercial Rent (₹):
          </label>
          <input
            id={rentId}
            type="number"
            min="5000"
            step="5000"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Fixed monthly store rent payable to landlord.</span>
        </div>

        <div>
          <label htmlFor={staffId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Store Staff Count:
          </label>
          <input
            id={staffId}
            type="number"
            min="1"
            max="15"
            value={staffCount}
            onChange={(e) => setStaffCount(Math.max(1, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Ironing operators, wash masters, counter executive.</span>
        </div>

        <div>
          <label htmlFor={salaryId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Average Salary Per Employee (₹):
          </label>
          <input
            id={salaryId}
            type="number"
            min="8000"
            step="1000"
            value={avgStaffSalary}
            onChange={(e) => setAvgStaffSalary(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Monthly cost to company (CTC) per worker.</span>
        </div>

        <div>
          <label htmlFor={utilityId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Utilities (Commercial Power + Water in ₹):
          </label>
          <input
            id={utilityId}
            type="number"
            min="2000"
            step="2000"
            value={utilityCost}
            onChange={(e) => setUtilityCost(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Commercial electricity tariff + water connection.</span>
        </div>

        <div>
          <label htmlFor={consumablesId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Consumables & Packaging (% of Revenue):
          </label>
          <input
            id={consumablesId}
            type="number"
            min="2"
            max="30"
            step="1"
            value={consumablesPct}
            onChange={(e) => setConsumablesPct(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>Eco-detergents, stain removers, garment covers.</span>
        </div>

        <div>
          <label htmlFor={royaltyId} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Monthly Royalty Fee (% of Gross Revenue):
          </label>
          <input
            id={royaltyId}
            type="number"
            min="0"
            max="15"
            step="0.5"
            value={royaltyPct}
            onChange={(e) => setRoyaltyPct(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: 600 }}
          />
          <span style={{ fontSize: '11px', color: '#64748B' }}>0% in Cleanz24 structured models; 5–7.5% in peers.</span>
        </div>
      </div>

      {/* Results Dashboard */}
      <div style={{
        background: '#0F172A',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div style={{ borderRight: '1px solid #334155', paddingRight: '16px' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Monthly OpEx</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
            ₹{totalMonthlyOpEx.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Rent + Salaries + Power + Supplies</span>
        </div>

        <div style={{ borderRight: '1px solid #334155', paddingRight: '16px' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Monthly Operating Surplus</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: monthlyOperatingSurplus > 0 ? '#10B981' : '#EF4444', marginTop: '4px' }}>
            ₹{monthlyOperatingSurplus.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{operatingMarginPct}% Net Operating Margin</span>
        </div>

        <div style={{ borderRight: '1px solid #334155', paddingRight: '16px' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual Operating Profit</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
            ₹{annualOperatingSurplus.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Before personal income tax / depreciation</span>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capital Payback Horizon</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#FBBF24', marginTop: '4px' }}>
            {typeof estimatedPaybackMonths === 'number' || !isNaN(Number(estimatedPaybackMonths)) ? `${estimatedPaybackMonths} Months` : estimatedPaybackMonths}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Initial CapEx recovery estimate</span>
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
        * <strong>Assumptions & Exclusions:</strong> This simulator provides an illustrative operational surplus model based on standard retail unit economics. It excludes commercial property purchase, abnormal equipment leasing interest, and GST input credit timing variances. Results should be independently audited with a chartered accountant and cross-referenced with the franchisor&apos;s Franchise Disclosure Document (FDD).
      </div>
    </div>
  );
}
