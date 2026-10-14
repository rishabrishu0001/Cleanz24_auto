import React from 'react';
import Link from 'next/link';
import {
  section1Content,
  section2Content,
  section3Content,
  section4Content,
  section5Content,
  section6Content,
  section7Content,
  section8Content,
  section9Content,
  section10Content,
  section11Content,
  section12Content,
  section13Content,
  FRANCHISE_PILLAR_METADATA,
} from '../../../data/franchisePillarArticle';

import FranchiseProfitCalculator from '../../../components/franchise/FranchiseProfitCalculator';
import FranchiseComparisonTable from '../../../components/franchise/FranchiseComparisonTable';
import DueDiligenceChecklist from '../../../components/franchise/DueDiligenceChecklist';

export const metadata = {
  title: FRANCHISE_PILLAR_METADATA.seoTitle,
  description: FRANCHISE_PILLAR_METADATA.metaDescription,
  alternates: {
    canonical: FRANCHISE_PILLAR_METADATA.canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'article',
    title: FRANCHISE_PILLAR_METADATA.seoTitle,
    description: FRANCHISE_PILLAR_METADATA.metaDescription,
    url: FRANCHISE_PILLAR_METADATA.canonicalUrl,
    siteName: 'Cleanz24',
    locale: 'en_IN',
    publishedTime: FRANCHISE_PILLAR_METADATA.publishedDate,
    modifiedTime: FRANCHISE_PILLAR_METADATA.modifiedDate,
    authors: [FRANCHISE_PILLAR_METADATA.author.name],
    images: [
      {
        url: 'https://www.cleanz24.com/logo_laundry.jpg',
        width: 1200,
        height: 630,
        alt: FRANCHISE_PILLAR_METADATA.h1,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FRANCHISE_PILLAR_METADATA.seoTitle,
    description: FRANCHISE_PILLAR_METADATA.metaDescription,
    images: ['https://www.cleanz24.com/logo_laundry.jpg'],
  },
};

export default function BestFranchiseToBuyInIndiaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: FRANCHISE_PILLAR_METADATA.h1,
    description: FRANCHISE_PILLAR_METADATA.metaDescription,
    image: 'https://www.cleanz24.com/logo_laundry.jpg',
    author: {
      '@type': 'Organization',
      name: FRANCHISE_PILLAR_METADATA.author.name,
      url: FRANCHISE_PILLAR_METADATA.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: FRANCHISE_PILLAR_METADATA.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: FRANCHISE_PILLAR_METADATA.publisher.logo,
      },
    },
    datePublished: FRANCHISE_PILLAR_METADATA.publishedDate,
    dateModified: FRANCHISE_PILLAR_METADATA.modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': FRANCHISE_PILLAR_METADATA.canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.cleanz24.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.cleanz24.com/best-laundry-drycleaning/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '10 Best Franchises to Buy in India (2026)',
        item: FRANCHISE_PILLAR_METADATA.canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: section12Content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const tocLinks = [
    { href: '#section-1-quick-answer', label: '1. Quick Answer & 10-Brand Summary Matrix' },
    { href: '#section-2-ranking-methodology', label: '2. 7-Pillar Quantitative Methodology' },
    { href: '#section-3-franchise-landscape-india', label: '3. Indian Macroeconomic Landscape' },
    { href: '#section-4-cleanz24-master-profile', label: '4. #1 Cleanz24 Laundry Master Profile' },
    { href: '#section-5-nine-competitor-profiles', label: '5. Profiles of 9 Other Franchise Brands' },
    { href: '#section-6-investment-cost-comparison', label: '6. All-In Investment & CapEx Breakdown' },
    { href: '#section-7-profitability-and-breakeven', label: '7. Unit Economics & Profit Simulator' },
    { href: '#section-8-budget-and-investor-personas', label: '8. Best Franchises by Budget Tier' },
    { href: '#section-9-how-to-start-roadmap', label: '9. 9-Step Franchise Launch Blueprint' },
    { href: '#section-10-due-diligence-and-legal-checks', label: '10. Legal Checks & Due Diligence Checklist' },
    { href: '#section-11-location-demographics', label: '11. Location Strategy & Demographics' },
    { href: '#section-12-faqs', label: '12. 32 Frequently Asked Questions' },
    { href: '#section-13-conclusion-decision-roadmap', label: '13. Final Decision Framework & Next Steps' },
  ];

  return (
    <article className="container py-4" style={{ maxWidth: '1180px', lineHeight: '1.75' }}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-muted">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/best-laundry-drycleaning/blog" className="text-decoration-none text-secondary">Blog</Link>
          </li>
          <li className="breadcrumb-item active text-dark" aria-current="page">
            Best Franchise to Buy in India
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-5 pb-4 border-bottom">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <span className="badge bg-primary px-3 py-2 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
            2026 Investor Research Report
          </span>
          <span className="badge bg-light text-dark border px-3 py-2">
            20,000+ Word Authority Guide
          </span>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
            Verified Source Ledger
          </span>
        </div>

        <h1 className="display-5 fw-bold text-dark mb-3" style={{ lineHeight: '1.2' }}>
          {FRANCHISE_PILLAR_METADATA.h1}
        </h1>

        <p className="lead text-muted mb-4" style={{ fontSize: '1.2rem' }}>
          A definitive, data-backed operational comparison of India’s top 10 franchise business models. Evaluated across all-in capital expenditure, unit economics, recurring purchase velocity, operator workloads, and contract safety.
        </p>

        <div className="d-flex flex-wrap align-items-center justify-content-between p-3 rounded-3 bg-light border text-muted small gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px' }}>
              C24
            </div>
            <div>
              <div className="fw-bold text-dark">{FRANCHISE_PILLAR_METADATA.author.name}</div>
              <div className="text-secondary">{FRANCHISE_PILLAR_METADATA.author.role}</div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-4 text-secondary">
            <div><strong>Published:</strong> October 14, 2026</div>
            <div><strong>Last Reviewed:</strong> October 14, 2026</div>
            <div><strong>Reading Time:</strong> ~85 Minutes (In-Depth Reference)</div>
          </div>
        </div>
      </header>

      {/* Table of Contents Box */}
      <nav aria-label="Table of Contents" className="p-4 mb-5 rounded-3 border bg-white shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
          <h2 className="h5 fw-bold mb-0 text-dark">📋 Table of Contents & Quick Navigation</h2>
          <span className="badge bg-secondary-subtle text-secondary">13 In-Depth Sections</span>
        </div>
        <p className="text-muted small mb-3">
          Jump directly to any section of this comprehensive investor guide, or scroll down to read sequentially:
        </p>
        <div className="row g-2">
          {tocLinks.map((link) => (
            <div key={link.href} className="col-12 col-md-6">
              <a
                href={link.href}
                className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light text-dark small"
                style={{ transition: 'background 0.2s ease' }}
              >
                <span className="text-primary me-2">›</span>
                <span className="fw-medium">{link.label}</span>
              </a>
            </div>
          ))}
        </div>
      </nav>

      {/* SECTION 1: Intro & Quick Answer */}
      <section id={section1Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section1Content.h2}
        </h2>
        <div className="p-4 rounded-3 bg-primary-subtle border border-primary-subtle mb-4">
          <h3 className="h5 fw-bold text-primary-emphasis mb-2">The Direct Executive Summary</h3>
          <p className="mb-0 text-dark" style={{ fontSize: '1.05rem' }}>
            {section1Content.lead}
          </p>
        </div>
        <div className="mb-4">
          {section1Content.paragraphs.map((p, idx) => (
            <p key={idx} className="text-secondary mb-3">{p}</p>
          ))}
        </div>
        {section1Content.quickComparisonHighlights && (
          <div className="row g-3 mb-4">
            {section1Content.quickComparisonHighlights.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <div className="text-muted small mb-1">{item.metric}</div>
                  <strong className="text-dark d-block mb-1">{item.value}</strong>
                  <div className="text-secondary small">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {section1Content.targetAudienceGuidance && (
          <div className="p-4 rounded-3 border bg-light mb-4">
            <h3 className="h6 fw-bold text-dark mb-2">Who This Franchise Guide Is For:</h3>
            <ul className="mb-0 ps-3 small text-secondary">
              {section1Content.targetAudienceGuidance.map((aud, idx) => (
                <li key={idx} className="mb-1">{aud}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Comparison Table Island */}
        <div className="my-4">
          <FranchiseComparisonTable />
        </div>
      </section>

      {/* CTA 1: Contextual Franchise Enquiry */}
      <div className="my-5 p-4 rounded-3 text-white text-center shadow" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
        <h3 className="h4 fw-bold mb-2">Explore Franchise Opportunities with Cleanz24</h3>
        <p className="mb-3 mx-auto" style={{ maxWidth: '750px', opacity: 0.9 }}>
          Looking for a high-retention utility business with weekly repeat customers and zero inventory spoilage? Connect with our corporate franchise desk to assess territory availability in your city.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link
            href="/best-laundry-drycleaning/franchise-opportunities-in-india"
            className="btn btn-light text-primary fw-bold px-4 py-2"
          >
            Check Available Pincodes & Models →
          </Link>
          <a
            href="https://wa.me/919138004800?text=Hi%20Cleanz24,%20I%20am%20interested%20in%20franchise%20opportunities"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light fw-bold px-4 py-2"
          >
            WhatsApp Franchise Desk (+91 91380 04800)
          </a>
        </div>
      </div>

      {/* SECTION 2: Methodology */}
      <section id={section2Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section2Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section2Content.intro}</p>

        <div className="row g-4 mb-4">
          {section2Content.weights.map((w, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-3 border rounded-3 h-100 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="h6 fw-bold text-dark mb-0">{w.pillar}</h3>
                  <span className="badge bg-primary">{w.weight}</span>
                </div>
                <p className="small text-secondary mb-0">{w.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-3 border bg-white mb-4">
          <h3 className="h5 fw-bold text-dark mb-3">Scoring Formula & Calculation Mechanics</h3>
          {section2Content.scoringFormulaExplanation.map((p, idx) => (
            <p key={idx} className="text-secondary small mb-2">{p}</p>
          ))}
        </div>

        {section2Content.sensitivityWeightingAnalysis && (
          <div className="p-4 rounded-3 border bg-light mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">Sensitivity Weighting Analysis</h3>
            {section2Content.sensitivityWeightingAnalysis.map((p, idx) => (
              <p key={idx} className="text-secondary small mb-2">{p}</p>
            ))}
          </div>
        )}

        {/* Transparency Notice */}
        <div className="p-4 rounded-3 border border-warning-subtle bg-warning-subtle">
          <h3 className="h6 fw-bold text-dark mb-2">⚖️ {section2Content.transparencyNotice.title}</h3>
          <p className="small text-dark mb-0">{section2Content.transparencyNotice.body}</p>
        </div>
      </section>

      {/* SECTION 3: Macroeconomic Landscape */}
      <section id={section3Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section3Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section3Content.intro}</p>

        {section3Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        ))}
      </section>

      {/* SECTION 4: Cleanz24 Master Profile (#1) */}
      <section id={section4Content.id} className="mb-5 pt-3">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <span className="badge bg-success px-3 py-2 text-uppercase fw-bold">{section4Content.badge}</span>
          <span className="badge bg-primary px-3 py-2">Composite Score: {section4Content.compositeScore}</span>
        </div>
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section4Content.h2}
        </h2>

        <div className="p-4 rounded-3 bg-light border mb-4">
          <p className="lead text-dark mb-0" style={{ fontSize: '1.15rem' }}>
            {section4Content.executiveSummary}
          </p>
        </div>

        <h3 className="h5 fw-bold text-dark mb-3">Available Cleanz24 Studio Franchise Models (2026)</h3>
        <div className="row g-4 mb-5">
          {section4Content.modelsOverview.map((m, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="card h-100 border-primary-subtle shadow-sm">
                <div className="card-header bg-primary text-white py-3">
                  <h4 className="h6 fw-bold mb-0 text-white">{m.name}</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <span className="text-muted small">All-In Investment:</span>
                    <strong className="text-primary">{m.investment}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <span className="text-muted small">Space Required:</span>
                    <strong>{m.space}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <span className="text-muted small">Target Monthly Turnover:</span>
                    <strong>{m.turnoverTarget}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <span className="text-muted small">Projected Net Monthly Surplus:</span>
                    <strong className="text-success">{m.projectedNetMargin}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                    <span className="text-muted small">Capital Payback:</span>
                    <strong>{m.payback}</strong>
                  </div>
                  <div className="small text-secondary mb-2"><strong>Focus:</strong> {m.focus}</div>
                  <div className="small text-secondary mb-2"><strong>Machinery:</strong> {m.machinery}</div>
                  <div className="small text-secondary"><strong>Ideal Catchment:</strong> {m.idealLocation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="h5 fw-bold text-dark mb-3">Operational Economics & Standard Studio Balance Sheet</h3>
          {section4Content.operationalEconomicsDeepDive.map((p, idx) => (
            <p key={idx} className="text-secondary mb-2">{p}</p>
          ))}
        </div>

        {section4Content.itemizedSetupCapitalSchedule && (
          <div className="mb-4 p-4 rounded-3 border bg-light">
            <h3 className="h5 fw-bold text-dark mb-3">Itemized Setup Capital Schedule (Line-by-Line Allocation)</h3>
            {section4Content.itemizedSetupCapitalSchedule.map((p, idx) => (
              <p key={idx} className="text-secondary mb-2">{p}</p>
            ))}
          </div>
        )}

        <div className="mb-4">
          <h3 className="h5 fw-bold text-dark mb-3">Daily Store Operations Blueprint (Hour-by-Hour Routine)</h3>
          {section4Content.dailyStoreOperationsBlueprint.map((p, idx) => (
            <p key={idx} className="text-secondary mb-2">{p}</p>
          ))}
        </div>

        {section4Content.preventiveMaintenanceSchedule && (
          <div className="mb-4 p-4 rounded-3 border bg-white">
            <h3 className="h5 fw-bold text-dark mb-3">Preventive Maintenance Schedule & Machine Longevity Protocols</h3>
            {section4Content.preventiveMaintenanceSchedule.map((p, idx) => (
              <p key={idx} className="text-secondary mb-2">{p}</p>
            ))}
          </div>
        )}

        {section4Content.pickupDeliveryRouteEconomics && (
          <div className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">Pickup & Delivery Route Optimization Economics</h3>
            {section4Content.pickupDeliveryRouteEconomics.map((p, idx) => (
              <p key={idx} className="text-secondary mb-2">{p}</p>
            ))}
          </div>
        )}

        {section4Content.qualityControlAndDisputeMitigation && (
          <div className="mb-4 p-4 rounded-3 border bg-light">
            <h3 className="h5 fw-bold text-dark mb-3">Quality Control, Garment Tagging & Dispute Mitigation SOPs</h3>
            {section4Content.qualityControlAndDisputeMitigation.map((p, idx) => (
              <p key={idx} className="text-secondary mb-2">{p}</p>
            ))}
          </div>
        )}

        {section4Content.comparisonVsTraditionalDhobiAndMomPop && (
          <div className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">Cleanz24 vs. Traditional Dhobi & Mom-and-Pop Cleaners</h3>
            {section4Content.comparisonVsTraditionalDhobiAndMomPop.map((p, idx) => (
              <p key={idx} className="text-secondary mb-2">{p}</p>
            ))}
          </div>
        )}

        <div className="mb-4">
          <h3 className="h5 fw-bold text-dark mb-3">Hyper-Localized Customer Acquisition Playbook</h3>
          {section4Content.customerAcquisitionPlaybook.map((p, idx) => (
            <p key={idx} className="text-secondary mb-2">{p}</p>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="h5 fw-bold text-dark mb-3">Institutional Training & Support Infrastructure</h3>
          {section4Content.supportSystemAndTraining.map((p, idx) => (
            <p key={idx} className="text-secondary mb-2">{p}</p>
          ))}
        </div>

        <div className="p-4 rounded-3 border border-danger-subtle bg-danger-subtle">
          <h3 className="h6 fw-bold text-danger mb-2">⚠️ Transparent Boundary: Who Should NOT Buy a Cleanz24 Franchise</h3>
          {section4Content.whoShouldNotBuyCleanz24.map((p, idx) => (
            <p key={idx} className="small text-dark mb-2">{p}</p>
          ))}
        </div>
      </section>

      {/* SECTION 5: The Other 9 Profiles */}
      <section id={section5Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section5Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section5Content.intro}</p>

        {section5Content.profiles.map((brand) => (
          <div key={brand.rank} className="p-4 border rounded-3 mb-5 bg-white shadow-sm">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 border-bottom pb-2">
              <div>
                <span className="badge bg-secondary me-2">Rank #{brand.rank}</span>
                <span className="badge bg-light text-dark border me-2">{brand.sector}</span>
                {brand.badge && <span className="badge bg-success-subtle text-success border">{brand.badge}</span>}
                <h3 className="h4 fw-bold text-dark mt-2 mb-0">{brand.name}</h3>
              </div>
              <div className="text-end">
                <span className="small text-muted d-block">Composite Score</span>
                <strong className="text-primary fs-5">{brand.compositeScore}</strong>
              </div>
            </div>

            <div className="row g-3 mb-3 p-3 bg-light rounded-3">
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">All-In Investment:</span>
                <strong className="text-dark small">{brand.investmentRange}</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Space Required:</span>
                <strong className="text-dark small">{brand.spaceRequirement}</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Royalty / Margin:</span>
                <strong className="text-dark small">{brand.royaltyModel}</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Payback Horizon:</span>
                <strong className="text-dark small">{brand.paybackPeriod}</strong>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="h6 fw-bold text-dark mb-1">Business & Format Reality:</h4>
              <p className="text-secondary small mb-2">{brand.whatTheBusinessDoes}</p>
            </div>

            {brand.monthlyPLSimulation && brand.monthlyPLSimulation.length > 0 && (
              <div className="mb-3 p-3 rounded-2 bg-light border">
                <h4 className="h6 fw-bold text-dark mb-2">Simulated Unit Economics & Operating P&L:</h4>
                {brand.monthlyPLSimulation.map((line, plIdx) => (
                  <p key={plIdx} className="small text-secondary mb-1">{line}</p>
                ))}
              </div>
            )}

            {brand.operationalRealities && brand.operationalRealities.length > 0 && (
              <div className="mb-3 p-3 rounded-2 border bg-white">
                <h4 className="h6 fw-bold text-dark mb-2">Operational Ground Realities:</h4>
                {brand.operationalRealities.map((line, opIdx) => (
                  <p key={opIdx} className="small text-secondary mb-1">{line}</p>
                ))}
              </div>
            )}

            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6">
                <h4 className="h6 fw-bold text-success mb-2">✓ Key Operational Strengths:</h4>
                <ul className="small text-secondary ps-3 mb-0">
                  {brand.advantages && brand.advantages.map((adv, aIdx) => (
                    <li key={aIdx} className="mb-1">{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="h6 fw-bold text-danger mb-2">✕ Key Risks & Operational Traps:</h4>
                <ul className="small text-secondary ps-3 mb-0">
                  {brand.limitations && brand.limitations.map((lim, lIdx) => (
                    <li key={lIdx} className="mb-1">{lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-2 border bg-light small mb-3">
              <div className="mb-2"><strong>Best-Fit Investor Archetype:</strong> {brand.bestFitInvestor}</div>
              {brand.criticalQuestionsToAsk && (
                <div>
                  <strong>Critical Questions to Ask Corporate:</strong>
                  <ul className="ps-3 mb-0 mt-1">
                    {brand.criticalQuestionsToAsk.map((q, qIdx) => (
                      <li key={qIdx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center text-muted small border-top pt-2">
              <span>Customer Frequency: <strong>{brand.customerCycle}</strong></span>
              <span>Franchise Fee: <strong>{brand.franchiseFee}</strong></span>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 6: Investment and Cost Comparison */}
      <section id={section6Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section6Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section6Content.intro}</p>

        {section6Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content && sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}

            {sub.tableHeaders && (
              <div className="table-responsive my-4 border rounded-3">
                <table className="table table-striped table-hover mb-0 small">
                  <thead className="table-dark">
                    <tr>
                      {sub.tableHeaders.map((th, hIdx) => (
                        <th key={hIdx} className="py-2 px-3">{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sub.tableRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2 px-3">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* SECTION 7: Profitability & Calculator */}
      <section id={section7Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section7Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section7Content.intro}</p>

        {/* Interactive Simulator Island */}
        <div className="my-4">
          <FranchiseProfitCalculator />
        </div>

        {section7Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        ))}
      </section>

      {/* SECTION 8: Budget Tiers & Personas */}
      <section id={section8Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section8Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section8Content.intro}</p>

        <div className="row g-4 mb-4">
          {section8Content.budgetTiers.map((tier, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-4 border rounded-3 h-100 bg-light">
                <h3 className="h6 fw-bold text-primary mb-2">{tier.tier}</h3>
                <p className="small text-secondary mb-3">{tier.description}</p>
                <div className="small text-dark">
                  {tier.recommendations.map((rec, rIdx) => (
                    <div key={rIdx} className="mb-2">{rec}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {section8Content.governmentDebtFinancingGuide && (
          <div className="p-4 rounded-3 border bg-white mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">Government Debt Financing & Bank MSME Credit Schemes</h3>
            {section8Content.governmentDebtFinancingGuide.map((p, idx) => (
              <p key={idx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        )}

        <h3 className="h5 fw-bold text-dark mb-3">Which Franchise Matches Your Investor Persona?</h3>
        <div className="row g-4">
          {section8Content.investorPersonas.map((persona, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-4 border rounded-3 h-100 bg-white shadow-sm">
                <h4 className="h6 fw-bold text-dark mb-2">{persona.persona}</h4>
                <p className="small text-muted mb-2"><strong>Profile:</strong> {persona.profile}</p>
                <p className="small text-primary mb-2"><strong>Recommended Brands:</strong> {persona.bestFit}</p>
                <p className="small text-secondary mb-0"><strong>Strategic Rationale:</strong> {persona.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: 9-Step Roadmap */}
      <section id={section9Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section9Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section9Content.intro}</p>

        <div className="border-start border-3 border-primary ps-4 ms-2">
          {section9Content.steps.map((step, idx) => (
            <div key={idx} className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-primary">{step.timeframe}</span>
                <h3 className="h5 fw-bold text-dark mb-0">{step.step}</h3>
              </div>
              {step.content.map((p, cIdx) => (
                <p key={cIdx} className="text-secondary mb-2">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: Legal Due Diligence & Checklist */}
      <section id={section10Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section10Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section10Content.intro}</p>

        {/* Interactive Due Diligence Checklist Island */}
        <div className="my-4">
          <DueDiligenceChecklist />
        </div>

        {section10Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        ))}
      </section>

      {/* SECTION 11: Location Strategy */}
      <section id={section11Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section11Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section11Content.intro}</p>

        {section11Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        ))}
      </section>

      {/* SECTION 12: Detailed FAQs */}
      <section id={section12Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section12Content.h2}
        </h2>
        <p className="text-secondary mb-4">{section12Content.intro}</p>

        <div className="accordion" id="franchiseFaqAccordion">
          {section12Content.faqs.map((faq, idx) => (
            <div key={idx} className="accordion-item mb-2 border rounded-2">
              <h3 className="accordion-header" id={`faq-heading-${idx}`}>
                <button
                  className={`accordion-button fw-semibold text-dark ${idx !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq-collapse-${idx}`}
                  aria-expanded={idx === 0 ? 'true' : 'false'}
                  aria-controls={`faq-collapse-${idx}`}
                >
                  <span className="me-2 text-primary">{idx + 1}.</span> {faq.q}
                </button>
              </h3>
              <div
                id={`faq-collapse-${idx}`}
                className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                aria-labelledby={`faq-heading-${idx}`}
              >
                <div className="accordion-body text-secondary small" style={{ lineHeight: '1.7' }}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13: Conclusion & Next Steps */}
      <section id={section13Content.id} className="mb-5 pt-3">
        <h2 className="h3 fw-bold text-dark border-start border-4 border-primary ps-3 mb-4">
          {section13Content.h2}
        </h2>
        <p className="lead text-dark mb-4">{section13Content.intro}</p>

        {section13Content.subsections.map((sub, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="h5 fw-bold text-dark mb-3">{sub.title}</h3>
            {sub.content.map((p, cIdx) => (
              <p key={cIdx} className="text-secondary mb-3">{p}</p>
            ))}
          </div>
        ))}

        {/* Final Lead Capture Box */}
        <div className="p-5 rounded-4 text-white shadow-lg mt-5" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)' }}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-8 mb-4 mb-lg-0">
              <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-3">
                Direct Corporate Inquiry
              </span>
              <h3 className="h3 fw-bold text-white mb-2">Claim Your Pincode for a Cleanz24 Studio</h3>
              <p className="text-light mb-0" style={{ opacity: 0.9 }}>
                Cleanz24 grants strict 2.5 km territorial exclusivity to franchise partners. Contact our expansion team today to review territory availability, receive the detailed Franchise Disclosure Document, and schedule a 1-on-1 Discovery Day.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-lg-end">
              <Link
                href="/best-laundry-drycleaning/franchise-opportunities-in-india"
                className="btn btn-warning btn-lg text-dark fw-bold px-4 py-3 w-100 mb-2"
              >
                Apply for Franchise Territory →
              </Link>
              <a
                href="https://wa.me/919138004800?text=Hello%20Cleanz24,%20I%20read%20the%20Franchise%20Guide%20and%20want%20to%20know%20territory%20availability"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light w-100 py-2 small"
              >
                Direct WhatsApp: +91 91380 04800
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links & Content Cluster Navigation */}
      <footer className="pt-4 mt-5 border-top text-muted small">
        <h4 className="h6 fw-bold text-dark mb-3">Related Franchise & Laundry Resources on Cleanz24:</h4>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <h5 className="small fw-bold text-dark mb-1">Franchise Portals:</h5>
            <ul className="list-unstyled mb-0">
              <li><Link href="/best-laundry-drycleaning/franchise-opportunities-in-india" className="text-decoration-none text-primary">Cleanz24 Laundry Franchise India</Link></li>
              <li><Link href="/best-laundry-drycleaning/franchise-opportunities/noida" className="text-decoration-none text-primary">Laundry Franchise in Noida</Link></li>
              <li><Link href="/best-laundry-drycleaning/franchise-opportunities/delhi" className="text-decoration-none text-primary">Laundry Franchise in Delhi</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h5 className="small fw-bold text-dark mb-1">Services & Care Science:</h5>
            <ul className="list-unstyled mb-0">
              <li><Link href="/best-laundry-drycleaning/services" className="text-decoration-none text-primary">All Fabric Care Services</Link></li>
              <li><Link href="/best-laundry-drycleaning/services/shoe-handbag-spa" className="text-decoration-none text-primary">Shoe & Leather Spa</Link></li>
              <li><Link href="/best-laundry-drycleaning/services/eco-friendly-dry-cleaning" className="text-decoration-none text-primary">Eco-Friendly Dry Cleaning</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h5 className="small fw-bold text-dark mb-1">Store Network & Contact:</h5>
            <ul className="list-unstyled mb-0">
              <li><Link href="/best-laundry-drycleaning/stores" className="text-decoration-none text-primary">100+ Operational Studios</Link></li>
              <li><Link href="/best-laundry-drycleaning/contact-us" className="text-decoration-none text-primary">Contact Corporate Headquarters</Link></li>
              <li><Link href="/best-laundry-drycleaning/blog" className="text-decoration-none text-primary">Garment Care Guides & Blog</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}
