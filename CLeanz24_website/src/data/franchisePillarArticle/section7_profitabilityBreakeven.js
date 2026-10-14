/**
 * Section 7: Profitability, Unit Economics, Margins & Break-Even Modeling
 * Target: ~1,900+ substantive words
 */
export const section7Content = {
  id: 'section-7-profitability-and-breakeven',
  h2: '7. Profitability, Unit Economics & Break-Even Analysis Across Franchise Sectors',
  intro: `To accurately compare business models, an investor must navigate past top-line revenue vanity and evaluate true net operating surplus. A business grossing ₹15 Lakhs monthly that yields ₹50,000 in net profit is fundamentally more fragile and carries higher risk than a compact service business grossing ₹4 Lakhs monthly that nets ₹1,80,000 in clean operating surplus.`,
  subsections: [
    {
      title: '7.1 Deconstructing the P&L: Revenue to Net Free Cash Flow',
      content: [
        `Franchise balance sheets in India must be evaluated through five disciplined financial layers:`,
        `Layer 1: Gross Customer Billing (Top-Line Turnover): The total sum paid by walk-in customers and doorstep pickup accounts, inclusive of all product and service categories.`,
        `Layer 2: Direct Cost of Goods Sold (COGS): The direct raw inputs required to fulfill that service. In QSR, COGS (bread, cheese, chicken, oil) consumes 32% to 40%. In Cleanz24 laundry, COGS (enzyme detergents, packaging bags, garment tags, spotting chemistry) consumes only 8% to 12%. In retail (FirstCry, Lenskart), inventory wholesale acquisition represents 65% to 75% of sales.`,
        `Layer 3: Gross Operational Margin: Gross Billing minus direct COGS. This represents the total pool of capital available to fund fixed commercial overheads. High-service models (laundry, diagnostics, courier) retain 60% to 90% in gross margin, whereas pure-play FMCG retail (Amul pouch milk) retains only 3% to 15%.`,
        `Layer 4: Fixed Operational Overheads (OpEx): Unavoidable monthly expenses that remain largely constant regardless of billing volume: Store Rent, Base Staff Salaries, Minimum Power Connected Load Tariffs, Municipal Water, Software Subscriptions, and Delivery Fuel.`,
        `Layer 5: Net Operating Surplus (EBITDA): Gross Margin minus Fixed OpEx. This is the true measure of unit-level franchise viability before debt servicing, personal income tax, and machinery depreciation.`
      ]
    },
    {
      title: '7.2 Unit Economics: Per-Kilogram & Per-Garment Cost Analysis',
      content: [
        `To understand the exceptional unit profitability of Cleanz24, we must analyze the micro-economics of cleaning a single kilogram of everyday wash-and-fold laundry and processing a single premium dry-cleaned suit:`,
        `Unit Economics for 1 kg Wash-and-Fold Laundry:`,
        `• Customer Billing Rate: ₹80 to ₹100 per kg (minimum ticket 4 kg = ₹320 to ₹400).`,
        `• Professional Enzyme Detergent & Optical Brightener: ₹3.80 per kg.`,
        `• Fabric Conditioner & Fragrance Booster: ₹1.40 per kg.`,
        `• Commercial Electricity (Washer tumbling & high-G extraction): ₹2.90 per kg.`,
        `• Tumble Drying Power / Heat Consumption: ₹4.20 per kg.`,
        `• Biodegradable Packaging Film & Thermal Barcode Tag: ₹1.80 per kg.`,
        `• Total Direct Variable Cost per kg: ₹14.10.`,
        `• Gross Contribution Margin per kg: ₹65.90 to ₹85.90 (82.3% to 85.9% Gross Margin).`,
        `Unit Economics for 1 Premium Two-Piece Woolen Suit (Dry Cleaning):`,
        `• Customer Billing Rate: ₹350 to ₹450 per suit.`,
        `• Specialized Pre-Spotting Chemistry (Stain treatment): ₹8.50 per suit.`,
        `• Hydro-Carbon Eco-Friendly Solvent or Wet-Clean Chemistry: ₹22.00 per suit.`,
        `• Vacuum Steam Ironing Electric Boiler Power: ₹9.50 per suit.`,
        `• Molded Wooden Suit Hanger, Shoulder Guard & Breathable Garment Suit Cover: ₹16.00 per suit.`,
        `• Total Direct Variable Cost per suit: ₹56.00.`,
        `• Gross Contribution Margin per suit: ₹294.00 to ₹394.00 (84.0% to 87.5% Gross Margin).`,
        `This dramatic gross contribution margin provides the franchisee with massive operating leverage: once monthly fixed store rent and core staff wages are covered, approximately 85 paise of every additional rupee billed flows straight into net operating surplus.`
      ]
    },
    {
      title: '7.3 Month-by-Month Cash Flow Ramp-Up Trajectory (Months 1 to 12)',
      content: [
        `Unlike seasonal retail or food concepts with high initial launch spikes followed by steep declines, laundry franchises exhibit a compounding "ratchet effect." Each satisfied household becomes a repeat customer every 7 to 10 days, steadily building a high-retention subscriber baseline:`,
        `• Month 1 (Launch & Discovery): Gross Billing: ₹95,000. Customer households: 110. Variable COGS: ₹10,450. Fixed OpEx (Rent, Wages, Utilities): ₹1,12,000. Net Cash Flow: -₹27,450 (Funded from initial working capital buffer).`,
        `• Month 2 (Early Organic Word of Mouth): Gross Billing: ₹1,65,000. Customer households: 195. Variable COGS: ₹18,150. Fixed OpEx: ₹1,14,000. Net Cash Flow: +₹32,850 (Store achieves operational cash break-even).`,
        `• Month 3 (Society WhatsApp Campaigns & Corporate Tie-ups): Gross Billing: ₹2,45,000. Customer households: 280. Variable COGS: ₹26,950. Fixed OpEx: ₹1,18,000. Net Cash Flow: +₹1,00,050 (Healthy cash surplus achieved).`,
        `• Month 6 (Mature Neighborhood Footprint): Gross Billing: ₹3,60,000. Customer households: 420. Variable COGS: ₹39,600. Fixed OpEx: ₹1,24,000. Net Cash Flow: +₹1,96,400. Cumulative net surplus begins aggressively retiring initial CapEx.`,
        `• Month 9 (Addition of Premium Shoe & Leather Spa Revenue): Gross Billing: ₹4,30,000. Customer households: 510. Variable COGS: ₹47,300. Fixed OpEx: ₹1,28,000. Net Cash Flow: +₹2,54,700.`,
        `• Month 12 (Stable Steady-State Operation): Gross Billing: ₹4,90,000. Customer households: 580+. Variable COGS: ₹53,900. Fixed OpEx: ₹1,32,000. Net Cash Flow: +₹3,04,100 monthly (Annualized pre-tax operating surplus exceeding ₹32 Lakhs).`
      ]
    },
    {
      title: '7.4 Unit-Level Scenario Modeling: Conservative, Base, and Optimistic Performance',
      content: [
        `To protect investor capital, we model three distinct operating performance scenarios for a standard Cleanz24 Beta Studio (₹15L CapEx, 350 sq. ft., Tier-2/prime Tier-1 residential sector):`,
        `Scenario A: Conservative (Subdued Launch / 40% Capacity Utilization):`,
        `• Daily Volume: 60 kg wet laundry + 35 dry-cleaned garments.`,
        `• Monthly Revenue: ₹2,20,000.`,
        `• Direct Consumables & Chemistry (10%): ₹22,000.`,
        `• Fixed Overheads (Rent ₹35,000, Wages ₹38,000, Power/Water ₹15,000, Misc ₹8,000): ₹96,000.`,
        `• Net Monthly Operating Surplus: ₹1,02,000 (46.3% Net Margin).`,
        `• Capital Payback Horizon: ~14.7 Months.`,
        `Scenario B: Base Case (Mature Store / 65% Capacity Utilization at Month 9):`,
        `• Daily Volume: 120 kg wet laundry + 75 dry-cleaned garments + 8 shoe/leather spa items.`,
        `• Monthly Revenue: ₹4,10,000.`,
        `• Direct Consumables & Chemistry (11%): ₹45,100.`,
        `• Fixed Overheads (Rent ₹38,000, Wages ₹48,000, Power/Water ₹22,000, Software/Mktg ₹16,000): ₹1,24,000.`,
        `• Net Monthly Operating Surplus: ₹2,40,900 (58.7% Net Margin).`,
        `• Capital Payback Horizon: ~6.2 Months of mature operation (18–20 months aggregate from launch).`,
        `Scenario C: Optimistic (High-Density Corridor / 85% Capacity + B2B Tie-Ups):`,
        `• Daily Volume: 180 kg wet laundry + 120 dry-cleaned garments + 15 shoe/leather spa items + corporate uniforms.`,
        `• Monthly Revenue: ₹6,50,000.`,
        `• Direct Consumables & Chemistry (12%): ₹78,000.`,
        `• Fixed Overheads (Rent ₹42,000, Wages ₹65,000 [added helper], Power/Water ₹32,000, Logistics ₹24,000): ₹1,63,000.`,
        `• Net Monthly Operating Surplus: ₹4,09,000 (62.9% Net Margin).`,
        `• Capital Payback Horizon: Under 14 months aggregate.`
      ]
    },
    {
      title: '7.5 Comparative Break-Even Horizons Across Franchise Sectors',
      content: [
        `How long does it take for an investor to recover 100% of their initial invested capital across the 10 profiled sectors?`,
        `• Ultra-Short Payback (6 to 12 Months): Low-CapEx, high-velocity models like Amul Kiosks and DTDC Booking Counters. Because initial investment is capped under ₹3.0 Lakhs, even a modest monthly net surplus of ₹30,000 to ₹40,000 completely retires capital within 8 to 10 months. However, the absolute lifetime earning ceiling remains modest.`,
        `• Medium Balanced Payback (16 to 24 Months): Organized Laundry & Dry Cleaning (Cleanz24, Tumbledry, UClean), Diagnostics (Dr Lal PathLabs), and Optical Retail (Lenskart). These models achieve the ideal balance: substantial capital recovery within 1.5 to 2 years, followed by strong, recurring annual cash flow (₹15L to ₹30L+ net surplus annually) for the remaining 5 to 10 years of store operation.`,
        `• Long Payback (24 to 36+ Months): Large-format retail (FirstCry) and Luxury Grooming Salons (Naturals). Because initial CapEx ranges from ₹35L to ₹60L+, amortizing the heavy civil interior and display fit-out over monthly operations requires 2.5 to 3 years of steady customer compounding before true capital break-even is achieved.`
      ]
    }
  ]
};
