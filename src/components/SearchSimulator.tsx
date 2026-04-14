'use client'
import { useState } from 'react'
import styles from './SearchSimulator.module.css'

const SCENARIOS = [
  {
    id: 'opportunity',
    label: 'Keyword opportunity',
    keyword: 'enterprise resource planning implementation cost',
    impressions: 8400,
    clicks: 47,
    ctr: 0.6,
    position: 18.4,
    gap: 'Ranking on page 2 with high commercial intent. Top results lack pricing context and real implementation detail.',
    competitors: [
      { domain: 'gartner.com', title: 'ERP Implementation Costs: A Complete Guide', gap: 'No pricing ranges, pure analyst framing' },
      { domain: 'sap.com', title: 'What Does SAP Cost?', gap: 'Marketing copy, no implementation specifics' },
      { domain: 'oracle.com', title: 'ERP Total Cost of Ownership', gap: 'Enterprise focus only, ignores SMB segment' },
    ],
    draft: {
      title: 'ERP Implementation Cost in 2025: Real Ranges by Company Size',
      meta: 'What does ERP implementation actually cost? Honest breakdown by company size, modules, and region — with the factors most vendors skip.',
      h1: 'ERP Implementation Cost: What You Actually Pay in 2025',
      sections: [
        { h2: 'The short answer: ranges by company size', preview: 'SMB (50-200 employees): $25K–$80K. Mid-market (200-1000): $80K–$300K. Enterprise: $300K+. But these numbers hide the real drivers...' },
        { h2: 'What actually drives implementation cost', preview: 'License vs. implementation: most vendors quote license. Implementation is typically 2-3x the license cost. Here is why...' },
        { h2: 'Hidden costs most quotes omit', preview: 'Data migration, custom development, training, and post-go-live support account for 40-60% of total project cost in most implementations...' },
        { h2: 'How to evaluate an implementation quote', preview: 'Five questions to ask before signing. The answers will tell you more than the number on the page...' },
      ],
      aeoNote: 'Structured for AI answer engines: direct question in H1, specific ranges in first paragraph, clear section headers matching search intent.'
    }
  },
  {
    id: 'aeo',
    label: 'AI presence check',
    keyword: 'best ERP for manufacturing companies',
    impressions: 3200,
    clicks: 12,
    ctr: 0.4,
    position: 31.2,
    gap: 'ChatGPT and Perplexity answer this question but do not cite the site. Content exists but is not structured for AI citation.',
    competitors: [
      { domain: 'manufacturing.net', title: 'Top ERP Systems for Manufacturers 2025', gap: 'Listed by ChatGPT — structured comparison table' },
      { domain: 'selecthub.com', title: 'Best Manufacturing ERP Software', gap: 'Cited by Perplexity — direct Q&A format' },
      { domain: 'g2.com', title: 'Manufacturing ERP Reviews', gap: 'User reviews — high trust signal for AI systems' },
    ],
    draft: {
      title: 'Best ERP for Manufacturing Companies: A Practical Comparison',
      meta: 'Which ERP systems actually work for manufacturing? Comparison of the top options by production type, company size, and implementation complexity.',
      h1: 'Best ERP Systems for Manufacturing Companies in 2025',
      sections: [
        { h2: 'Quick answer: top ERP systems for manufacturers', preview: 'For discrete manufacturing: SAP Business One, Microsoft Dynamics 365. For process manufacturing: Oracle NetSuite, Epicor. For SMB manufacturers...' },
        { h2: 'How to choose by production type', preview: 'Discrete vs. process vs. mixed-mode manufacturing have fundamentally different ERP requirements. Here is how to match system to production type...' },
        { h2: 'Implementation complexity by system', preview: 'SAP B1: 3-6 months for SMB. Dynamics 365: 4-8 months. NetSuite: 3-5 months. What drives variation is not the software — it is the data...' },
        { h2: 'Questions to ask before selecting', preview: 'Does the system handle your BOM complexity? Can it integrate with your shop floor equipment? What is the real implementation partner ecosystem like?...' },
      ],
      aeoNote: 'Reformatted for AI citation: added FAQ section, direct comparison table, and explicit question-answer pairs matching common AI queries on this topic.'
    }
  },
  {
    id: 'freshness',
    label: 'Content refresh',
    keyword: 'SAP Business One pricing Mexico',
    impressions: 5100,
    clicks: 203,
    ctr: 3.9,
    position: 6.2,
    gap: 'Page ranked well 8 months ago. Traffic dropped 34% in 60 days. Content is stale — competitors updated with 2025 pricing context.',
    competitors: [
      { domain: 'softwareadvice.com', title: 'SAP B1 Cost 2025: Updated Pricing Guide', gap: 'Updated 3 weeks ago — new licensing model covered' },
      { domain: 'capterra.com', title: 'SAP Business One Pricing & Reviews 2025', gap: 'User-submitted pricing data — more credible' },
      { domain: 'sap.com', title: 'SAP Business One Pricing', gap: 'Official page updated with GROW with SAP offering' },
    ],
    draft: {
      title: 'SAP Business One Pricing in Mexico 2025: Updated Guide',
      meta: 'Updated SAP Business One pricing for Mexico — license models, implementation costs, and what changed with the new GROW with SAP offering.',
      h1: 'SAP Business One Cost in Mexico: 2025 Pricing Guide',
      sections: [
        { h2: 'What changed in 2025', preview: 'SAP introduced GROW with SAP — a cloud-first offering that changes the pricing structure for SMBs. Here is what it means for Mexico-based buyers...' },
        { h2: 'Current license pricing by model', preview: 'On-premise perpetual license: $3,500–$5,500 per named user. Cloud subscription: $150–$220/user/month. GROW with SAP: starting at...' },
        { h2: 'Implementation cost in Mexico', preview: 'Local implementation partners typically charge $25,000–$80,000 for a standard deployment. What drives variation is industry and customization depth...' },
        { h2: 'Total cost of ownership over 3 years', preview: 'License + implementation + maintenance + support. The number most buyers do not calculate before signing...' },
      ],
      aeoNote: 'Freshness signal added: explicit 2025 date in title and H1, new pricing section covering recent SAP model changes, FAQ updated to match current search queries.'
    }
  }
]

export default function SearchSimulator() {
  const [active, setActive] = useState(0)
  const [view, setView] = useState<'analysis' | 'draft'>('analysis')
  const s = SCENARIOS[active]

  return (
    <div className={styles.simulator}>
      <div className={styles.tabs}>
        {SCENARIOS.map((sc, i) => (
          <button key={sc.id}
            className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            onClick={() => { setActive(i); setView('analysis') }}>
            {sc.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Keyword</p>
            <p className={styles.keyword}>{s.keyword}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>GSC signals</p>
            <div className={styles.statGrid}>
              <div className={styles.stat}>
                <span className={styles.statNum}>{s.impressions.toLocaleString()}</span>
                <span className={styles.statLabel}>Impressions</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{s.clicks}</span>
                <span className={styles.statLabel}>Clicks</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{s.ctr}%</span>
                <span className={styles.statLabel}>CTR</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>#{Math.round(s.position)}</span>
                <span className={styles.statLabel}>Position</span>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Opportunity gap</p>
            <p className={styles.gapText}>{s.gap}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Top competitors</p>
            {s.competitors.map((c, i) => (
              <div key={i} className={styles.competitor}>
                <span className={styles.competitorDomain}>{c.domain}</span>
                <span className={styles.competitorGap}>{c.gap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${view === 'analysis' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('analysis')}>Analysis</button>
            <button className={`${styles.viewBtn} ${view === 'draft' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('draft')}>Generated draft</button>
          </div>

          {view === 'analysis' ? (
            <div className={styles.analysis}>
              <div className={styles.card}>
                <p className={styles.cardLabel}>Engine action</p>
                <p className={styles.actionText}>
                  {s.id === 'opportunity' && 'Generate new article targeting this keyword with competitive differentiation'}
                  {s.id === 'aeo' && 'Restructure existing content for AI answer engine citation'}
                  {s.id === 'freshness' && 'Refresh existing page with 2025 context and updated signals'}
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardLabel}>Competitive gaps identified</p>
                {s.competitors.map((c, i) => (
                  <div key={i} className={styles.gapItem}>
                    <span className={styles.gapNum}>{String(i+1).padStart(2,'0')}</span>
                    <span className={styles.gapItemText}>{c.gap}</span>
                  </div>
                ))}
              </div>
              <div className={styles.card}>
                <p className={styles.cardLabel}>AEO optimization</p>
                <p className={styles.aeoText}>{s.draft.aeoNote}</p>
              </div>
            </div>
          ) : (
            <div className={styles.draft}>
              <div className={styles.card}>
                <p className={styles.cardLabel}>Title tag</p>
                <p className={styles.draftTitle}>{s.draft.title}</p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardLabel}>Meta description</p>
                <p className={styles.draftMeta}>{s.draft.meta}</p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardLabel}>Article structure</p>
                <p className={styles.draftH1}>{s.draft.h1}</p>
                {s.draft.sections.map((sec, i) => (
                  <div key={i} className={styles.section}>
                    <p className={styles.sectionH2}>{sec.h2}</p>
                    <p className={styles.sectionPreview}>{sec.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
