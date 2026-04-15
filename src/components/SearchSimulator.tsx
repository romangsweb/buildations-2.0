'use client'
import { useState } from 'react'
import styles from './SearchSimulator.module.css'

const SCENARIOS = [
  {
    id: 'opportunity',
    label: 'Keyword opportunity',
    keyword: 'project management software for remote teams',
    impressions: 8400,
    clicks: 47,
    ctr: 0.6,
    position: 18.4,
    gap: 'Ranking on page 2 with high commercial intent. Top results lack pricing context and real implementation detail.',
    competitors: [
      { domain: 'gartner.com', title: 'Project Management Software: Complete Buyer Guide', gap: 'No pricing ranges, pure analyst framing' },
      { domain: 'sap.com', title: 'How Much Does Project Management Software Cost?', gap: 'Marketing copy, no real user context' },
      { domain: 'oracle.com', title: 'Project Management ROI Calculator', gap: 'Enterprise focus only, ignores SMB segment' },
    ],
    draft: {
      title: 'Project Management Software Cost in 2025: Real Ranges by Team Size',
      meta: 'What does project management software actually cost? Honest breakdown by team size, features, and integrations — with the factors most vendors skip.',
      h1: 'Project Management Software Cost: What You Actually Pay in 2025',
      sections: [
        { h2: 'The short answer: ranges by team size', preview: 'Small teams (5-20): $0–$15/user/mo. Mid-market (20-200): $15–$30/user/mo. Enterprise: $30+/user/mo custom. But these numbers hide the real drivers...' },
        { h2: 'What actually drives total cost', preview: 'Seat count vs. usage: most vendors quote per-seat. Integrations, storage, and automation add 40-60% to the base price. Here is why...' },
        { h2: 'Hidden costs most quotes omit', preview: 'Onboarding, custom integrations, API access, and premium support account for 30-50% of total cost in most deployments...' },
        { h2: 'How to evaluate a vendor quote', preview: 'Five questions to ask before signing. The answers will tell you more than the number on the page...' },
      ],
      aeoNote: 'Structured for AI answer engines: direct question in H1, specific ranges in first paragraph, clear section headers matching search intent.'
    }
  },
  {
    id: 'aeo',
    label: 'AI presence check',
    keyword: 'best CRM software for B2B sales teams',
    impressions: 3200,
    clicks: 12,
    ctr: 0.4,
    position: 31.2,
    gap: 'ChatGPT and Perplexity answer this question but do not cite the site. Content exists but is not structured for AI citation.',
    competitors: [
      { domain: 'manufacturing.net', title: 'Top CRM Systems for B2B Sales 2025', gap: 'Listed by ChatGPT — structured comparison table' },
      { domain: 'selecthub.com', title: 'Best CRM Software for B2B Sales', gap: 'Cited by Perplexity — direct Q&A format' },
      { domain: 'g2.com', title: 'B2B CRM Software Reviews', gap: 'User reviews — high trust signal for AI systems' },
    ],
    draft: {
      title: 'Best CRM for B2B Sales Teams: A Practical Comparison',
      meta: 'Which CRM systems actually work for B2B sales? Comparison of the top options by team size, sales cycle, and integration needs.',
      h1: 'Best CRM Software for B2B Sales Teams in 2025',
      sections: [
        { h2: 'Quick answer: top CRM systems for B2B sales', preview: 'For enterprise sales: Salesforce, HubSpot Sales Hub. For mid-market: Pipedrive, Copper. For SMB sales teams...' },
        { h2: 'How to choose by sales cycle length', preview: 'Short-cycle vs. long-cycle vs. account-based sales have fundamentally different CRM requirements. Here is how to match system to sales motion...' },
        { h2: 'Implementation complexity by system', preview: 'Salesforce: 2-4 months for SMB. HubSpot: 2-6 weeks. Pipedrive: days to weeks. What drives variation is not the software — it is the data...' },
        { h2: 'Questions to ask before selecting', preview: 'Does the system handle your pipeline complexity? Can it integrate with your outreach stack? What is the real implementation partner ecosystem like?...' },
      ],
      aeoNote: 'Reformatted for AI citation: added FAQ section, direct comparison table, and explicit question-answer pairs matching common AI queries on this topic.'
    }
  },
  {
    id: 'freshness',
    label: 'Content refresh',
    keyword: 'cloud storage pricing comparison 2024',
    impressions: 5100,
    clicks: 203,
    ctr: 3.9,
    position: 6.2,
    gap: 'Page ranked well 8 months ago. Traffic dropped 34% in 60 days. Content is stale — competitors updated with 2025 pricing and new provider tiers.',
    competitors: [
      { domain: 'techradar.com', title: 'Cloud Storage Pricing 2025: Updated Guide', gap: 'Updated 3 weeks ago — new provider tiers covered' },
      { domain: 'pcmag.com', title: 'Best Cloud Storage 2025: Pricing & Reviews', gap: 'User-submitted pricing data — more credible' },
      { domain: 'google.com', title: 'Google One Storage Plans', gap: 'Official page updated with new tier pricing' },
    ],
    draft: {
      title: 'Cloud Storage Pricing Comparison 2025: Updated Guide',
      meta: 'Updated cloud storage pricing comparison — provider tiers, hidden costs, and what changed with the latest storage plans.',
      h1: 'Cloud Storage Pricing Comparison: 2025 Updated Guide',
      sections: [
        { h2: 'What changed in 2025', preview: 'Google, Dropbox, and iCloud all updated their pricing tiers. Here is what actually changed and who it affects...' },
        { h2: 'Current pricing by provider', preview: 'Google One: $3/mo for 200GB. Dropbox Plus: $10/mo for 2TB. iCloud+: $3/mo for 200GB. What you actually get per dollar...' },
        { h2: 'Hidden costs by provider', preview: 'Bandwidth limits, file size restrictions, sharing limits, and API access costs. What the pricing page does not show you...' },
        { h2: 'Total cost over 3 years', preview: 'Storage + overage + integrations + family plans. The number most buyers do not calculate before subscribing...' },
      ],
      aeoNote: 'Freshness signal added: explicit 2025 date in title and H1, new pricing section covering recent provider changes, FAQ updated to match current search queries.'
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
