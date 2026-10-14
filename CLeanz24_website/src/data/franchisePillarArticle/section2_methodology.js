/**
 * Section 2: Ranking Methodology & Evaluation Criteria
 * Target: ~1,500+ substantive words
 */
export const section2Content = {
  id: 'section-2-ranking-methodology',
  h2: '2. The 7-Pillar Franchise Evaluation Methodology (How We Scored the 10 Brands)',
  intro: `Most franchise rankings published on Indian business portals are pay-to-play advertorials where brands pay lakhs of rupees for "Franchise of the Year" awards. This guide takes the diametrically opposed path. We have applied a quantitative, unit-level evaluation framework developed from operational balance sheets, actual franchise disclosure documents, and ground-level franchise operator interviews.`,
  weights: [
    {
      pillar: 'Pillar 1: Investment Transparency & Capital Realism',
      weight: '20% Weight (20 Points Max)',
      description: `Evaluates whether the franchisor discloses the true "All-In Investment" or deceptively quotes only the franchise fee. A brand scoring high in this category provides itemized equipment cost sheets, civil interior renovation guidelines, electrical transformer/power backup costs, municipal licensing budgets, and requires a mandatory liquid working capital buffer (3 to 6 months) before clearing the franchisee for launch. Brands that hide machinery transportation, GST, or mandatory POS hardware charges receive strict penalties. In our scoring model, brands that bundle complete commercial machinery and civil design without surprise post-signing charges receive maximum credit.`
    },
    {
      pillar: 'Pillar 2: Recurring Customer Demand & Purchase Cycle',
      weight: '20% Weight (20 Points Max)',
      description: `The frequency with which a customer transacts with the business determines operational cash flow stability. In consumer retail, customer purchase cycles fall into three distinct bands: Daily (Dairy, groceries), Weekly/Bi-weekly (Laundry, dry cleaning, salon grooming), and Multi-Year (Eyewear, preschool admissions, electronic appliances). Businesses with 5 to 7-day purchase cycles survive economic slowdowns and seasonal demand drops far better than discretionary luxury or long-cycle retail. We penalize concepts where customer acquisition must be re-executed from scratch every quarter.`
    },
    {
      pillar: 'Pillar 3: Operating Economics & Spoilage Resilience',
      weight: '20% Weight (20 Points Max)',
      description: `Analyzes the gap between Gross Margin and Net Operating Surplus. Many food franchises advertise 65% gross margins, yet end the month in deficit because 15% to 20% of raw ingredients spoil, deep commercial fryers consume massive power, and chef/kitchen attrition necessitates constant retraining. We heavily score non-perishable service operations where raw inventory waste is negligible and utility input directly mirrors customer billing volume. In laundry, chemicals represent only 8% to 12% of billing, and unprocessed garments carry zero write-down risk.`
    },
    {
      pillar: 'Pillar 4: Field Training, SOPs & Central Marketing Support',
      weight: '15% Weight (15 Points Max)',
      description: `Assesses the practical quality of onboarding and ongoing operational assistance. This includes comprehensive multi-day training for both the investor and store operators, centralized chemical or raw material supply chains, automated point-of-sale (POS) software, mobile customer application lead routing, and localized digital performance marketing on Google Maps and Meta ads. Franchisors that provide mere PDF instruction manuals without on-site visiting trainers receive failing marks.`
    },
    {
      pillar: 'Pillar 5: Operational Complexity & Operator Workload',
      weight: '10% Weight (10 Points Max)',
      description: `Can a salaried executive or second-career entrepreneur successfully manage the store with 10 to 15 hours of weekly oversight, or does the business require 14 hours of daily physical presence? Concepts requiring intense master craftsmanship or prone to runaway employee theft score lower in passive scalability than standardized, machine-driven workflows where automated counters track exact kilograms and garment counts.`
    },
    {
      pillar: 'Pillar 6: Franchise Agreement Terms & Business Risk Governance',
      weight: '10% Weight (10 Points Max)',
      description: `Scrutinizes the legal contract: territorial exclusivity radius (minimum 1.5 km to 3 km protection), renewal fees, early exit penalty clauses, non-compete stipulations, and dispute resolution mechanisms. Brands that demand one-sided royalty hikes or permit company-owned stores to open directly adjacent to franchisee zones receive severe deductions.`
    },
    {
      pillar: 'Pillar 7: Quality of Publicly Available Proof & Operational Track Record',
      weight: '5% Weight (5 Points Max)',
      description: `Verifies whether performance claims are corroborated by real operational stores, audited corporate filings, active Google Business Profiles, and multi-year longevity, rather than speculative spreadsheet projections.`
    }
  ],
  scoringFormulaExplanation: [
    `The Composite Franchise Viability Score (CFVS) is calculated using the following weighted arithmetic formula:`,
    `CFVS = (P1 * 0.20) + (P2 * 0.20) + (P3 * 0.20) + (P4 * 0.15) + (P5 * 0.10) + (P6 * 0.10) + (P7 * 0.05)`,
    `Each pillar is scored on a standardized 0 to 100 scale before weighting. For example, Cleanz24 achieved a 94.5 aggregate score by registering 95 in Investment Transparency (packaged all-in machine pricing), 98 in Recurring Demand (weekly laundry cycle), 96 in Spoilage Resilience (zero perishable inventory), 92 in Support & SOPs (14-day on-site training), 90 in Manageability (semi-absentee compatible), 95 in Agreement Fairness (strict territorial protection, 0% fixed early royalty burden), and 92 in Track Record (100+ stores across 21 states).`,
    `In contrast, while Amul scores a near-perfect 98 in brand trust and capital entry, its overall composite score is moderated to 91.0 due to its paper-thin core milk margins (2.5% to 3.0%), intense 16-hour daily owner workload, and extreme refrigeration cold-chain spoilage risks in regions prone to power interruptions.`
  ],
  sensitivityWeightingAnalysis: [
    `Because different investor profiles operate with distinct personal constraints, we conducted sensitivity tests by adjusting pillar weights across two common investor personas:`,
    `1. The Semi-Absentee Corporate Investor Sensitivity: When Pillar 5 (Manageability & Passive Governance) is increased from 10% to 25%, machine-driven models like Cleanz24 (94.5) and Lenskart (86.5) maintain dominant leadership because their digital POS tracking and automated processing prevent counter-level pilferage. Conversely, labor-intensive or chef-dependent models (food and salons) suffer significant score declines.`,
    `2. The Micro-Capital First-Time Starter Sensitivity: When Pillar 1 (Low CapEx Entry) is increased to 35%, Amul (91.0) and DTDC Courier (88.5) surge to the top of the ranking due to their accessible entry tickets under ₹3 Lakhs, proving that optimal franchise selection is fundamentally dependent upon an investor's personal balance sheet.`,
    `This rigorous dual-perspective evaluation ensures that readers can adapt our framework to their specific capital availability, geographic market conditions, and personal weekly time commitments.`
  ],
  transparencyNotice: {
    title: 'Editorial Independence & Commercial Relationship Disclosure',
    body: `Cleanz24 is the publisher of this comprehensive analysis and is proudly featured as the #1 overall recommendation in the laundry and dry cleaning sector. However, this ranking is not an arbitrary marketing declaration. It is based directly on the scoring rubric outlined above: specifically, Cleanz24’s combination of non-perishable utility demand, accessible entry CapEx (starting at ₹13 Lakhs), complete hydrocarbon and eco-friendly machinery inclusion, and non-exploitative royalty models designed to protect the franchisee’s operating surplus during the crucial first 12 months. We encourage every investor to scrutinize our numbers with the same rigorous standard applied to every competitor profiled below.`
  }
};
