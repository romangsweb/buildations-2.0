'use client'
import { useState, useCallback } from 'react'
import styles from './SearchPlayground.module.css'

/* ─── Search analysis engine logic ─── */

const CONTENT_TYPES = [
  { value: 'blog', label: 'Blog / Article' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'product', label: 'Product Page' },
  { value: 'comparison', label: 'Comparison Guide' },
  { value: 'how_to', label: 'How-to Guide' },
]

const PROCESSING_STEPS = [
  'Extracting keyword intent signals…',
  'Querying search data warehouse…',
  'Analyzing SERP competitive landscape…',
  'Embedding competitor content into Qdrant…',
  'Identifying content gaps…',
  'Running dual-LLM writer + auditor…',
  'Structuring for AI answer engines…',
  'Generating content blueprint…',
]

interface AnalysisResult {
  keyword: string
  intent: string
  difficulty: number
  impressions: number
  clicks: number
  ctr: number
  position: number
  gap: string
  competitors: Array<{
    domain: string
    title: string
    gap: string
  }>
  action: string
  draft: {
    title: string
    meta: string
    h1: string
    sections: Array<{ h2: string; preview: string }>
    aeoNote: string
  }
}

function analyzeKeyword(keyword: string, contentType: string, industry: string): AnalysisResult {
  // Generate realistic metrics based on keyword characteristics
  const words = keyword.toLowerCase().split(' ')
  const length = words.length
  const hasCommercial = words.some(w =>
    ['buy', 'price', 'cost', 'best', 'top', 'review', 'vs', 'compare', 'software', 'tool', 'service', 'platform', 'solution'].includes(w)
  )
  const hasInformational = words.some(w =>
    ['how', 'what', 'why', 'guide', 'tutorial', 'learn', 'example', 'tips'].includes(w)
  )

  // Simulate search metrics
  const seed = keyword.length * 137 + keyword.charCodeAt(0) * 47
  const impressions = 1200 + (seed % 15000)
  const position = hasCommercial ? 8 + (seed % 25) : 4 + (seed % 18)
  const ctr = position <= 5 ? 3 + (seed % 7) * 0.3 : position <= 10 ? 1.2 + (seed % 4) * 0.3 : 0.3 + (seed % 3) * 0.2
  const clicks = Math.round(impressions * (ctr / 100))
  const difficulty = Math.min(95, 30 + length * 5 + (hasCommercial ? 15 : 0) + (seed % 25))

  const intent = hasCommercial ? 'Commercial' : hasInformational ? 'Informational' : 'Navigational'

  // Generate competitive analysis
  const domains = ['hubspot.com', 'semrush.com', 'ahrefs.com', 'moz.com', 'searchenginejournal.com', 'backlinko.com', 'neilpatel.com', 'contentmarketinginstitute.com']
  const gaps = [
    'Generic overview without actionable steps',
    'Outdated information from 2023',
    'Lacks pricing and ROI context',
    'No real implementation examples',
    'Missing comparison with alternatives',
    'Not structured for AI citation',
    'Enterprise focus only — ignores SMB segment',
    'Feature-focused copy, misses buyer questions',
  ]

  const competitors = Array.from({ length: 3 }, (_, i) => ({
    domain: domains[(seed + i * 3) % domains.length],
    title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: ${['Complete Guide', 'Best Practices', 'Everything You Need to Know'][i]}`,
    gap: gaps[(seed + i * 2) % gaps.length],
  }))

  // Determine action
  const isOnPage2 = position > 10
  const isStale = (seed % 4) === 0
  const action = isOnPage2
    ? 'Generate new article targeting this keyword with competitive differentiation'
    : isStale
    ? 'Refresh existing content with updated context and fresh data'
    : 'Restructure for AI answer engine citation and improve depth'

  // Generate content draft based on keyword and type
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const year = new Date().getFullYear()

  const sectionTemplates = {
    blog: [
      { h2: `What ${keyword} actually means in ${year}`, preview: `The definition has evolved. Here is what practitioners mean today, not what the textbook says...` },
      { h2: 'The core components you need to understand', preview: `Breaking down the architecture into digestible parts. Each component serves a specific function...` },
      { h2: 'Real implementation examples', preview: `Three case studies from different industries showing how this works in production, not theory...` },
      { h2: 'Common mistakes and how to avoid them', preview: `The patterns we see repeatedly in failed implementations. Most start from the wrong assumption...` },
    ],
    landing: [
      { h2: `Why ${keyword} matters for your business`, preview: 'The business case in concrete terms — revenue impact, cost reduction, competitive advantage...' },
      { h2: 'How it works in practice', preview: 'A 4-step process from initial assessment to full deployment. No black boxes, no hand-waving...' },
      { h2: 'Results from real deployments', preview: 'Metrics from three client implementations across different industries and scales...' },
      { h2: 'Getting started', preview: 'The first diagnostic is free. Here is what we assess and what you will learn...' },
    ],
    comparison: [
      { h2: 'Quick comparison table', preview: 'Side-by-side feature matrix of the top options. Filtered for what actually matters in production...' },
      { h2: 'Detailed analysis by use case', preview: `Different tools excel in different contexts. Here is which one fits ${industry || 'your'} needs...` },
      { h2: 'Total cost of ownership breakdown', preview: 'License cost is only part of the equation. Implementation, integration, and maintenance costs vary dramatically...' },
      { h2: 'Our recommendation', preview: 'Based on analysis of 50+ implementations, the right choice depends on three key variables...' },
    ],
    product: [
      { h2: 'What this solves', preview: 'The specific problem this product addresses, in language your team already uses...' },
      { h2: 'How it integrates with your stack', preview: `Compatible with common ${industry || 'enterprise'} tools. API-first architecture means no vendor lock-in...` },
      { h2: 'Pricing and implementation timeline', preview: 'Honest ranges by team size and complexity. No hidden costs, no surprise overages...' },
      { h2: 'Getting a custom assessment', preview: 'Tell us your constraints. We will tell you if this is the right fit...' },
    ],
    how_to: [
      { h2: 'Prerequisites', preview: 'What you need before starting. Technical requirements, access, and estimated time investment...' },
      { h2: `Step-by-step: ${capitalize(keyword)}`, preview: 'Walk through each stage with screenshots and code examples. Copy-paste ready...' },
      { h2: 'Troubleshooting common issues', preview: 'The five problems most people encounter and their solutions. Saves hours of debugging...' },
      { h2: 'Next steps after implementation', preview: 'What to optimize first, how to measure success, and when to scale...' },
    ],
  }

  const sections = sectionTemplates[contentType as keyof typeof sectionTemplates] || sectionTemplates.blog

  const gap = isOnPage2
    ? `Ranking on page 2 with ${intent.toLowerCase()} intent. Top results lack depth and practical context — significant opportunity.`
    : isStale
    ? `Page has existing visibility but traffic dropped 30%+ in 60 days. Content is stale — competitors updated with ${year} context.`
    : `Content exists but is not structured for AI citation. ChatGPT and Perplexity answer this query without citing the site.`

  return {
    keyword,
    intent,
    difficulty,
    impressions,
    clicks,
    ctr: Math.round(ctr * 10) / 10,
    position: Math.round(position * 10) / 10,
    gap,
    competitors,
    action,
    draft: {
      title: `${capitalize(keyword)}${contentType === 'comparison' ? ': Practical Comparison' : contentType === 'how_to' ? ': Step-by-Step Guide' : ` in ${year}`}${industry ? ` for ${industry}` : ''}`,
      meta: `${capitalize(keyword)} — ${contentType === 'comparison' ? 'honest comparison' : contentType === 'how_to' ? 'step-by-step guide' : 'practical breakdown'} with real implementation data${industry ? ` for ${industry}` : ''}.`,
      h1: `${capitalize(keyword)}${contentType === 'how_to' ? ': Complete Guide' : ''} — ${year}${industry ? ` (${industry} Edition)` : ''}`,
      sections,
      aeoNote: `Structured for AI answer engines: direct question in H1, specific data in first paragraph, clear section headers matching search intent. FAQ schema and llms.txt context file included.`,
    },
  }
}

export default function SearchPlayground() {
  const [keyword, setKeyword] = useState('')
  const [contentType, setContentType] = useState('blog')
  const [industry, setIndustry] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [view, setView] = useState<'analysis' | 'draft'>('analysis')

  const runEngine = useCallback(async () => {
    if (!keyword.trim()) return
    setProcessing(true)
    setResult(null)
    setCurrentStep(0)

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 350 + Math.random() * 200))
      setCurrentStep(i)
    }

    await new Promise(r => setTimeout(r, 400))
    const analysis = analyzeKeyword(keyword.trim(), contentType, industry)
    setProcessing(false)
    setResult(analysis)
    setView('analysis')
  }, [keyword, contentType, industry])

  const reset = () => {
    setResult(null)
    setProcessing(false)
    setKeyword('')
    setIndustry('')
  }

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.engineTag}>
            <span className={styles.engineDot} />
            Search &amp; Presence
          </span>
          <h2 className={styles.playgroundTitle}>Content Engine Playground</h2>
        </div>
        {result && (
          <button className={styles.resetBtn} onClick={reset}>
            Reset ↻
          </button>
        )}
      </div>

      {/* Input area */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Target keyword</label>
            <input
              type="text"
              className={styles.fieldInput}
              placeholder="e.g. AI customer service automation"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && keyword.trim() && !processing && runEngine()}
            />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Content type</label>
            <select
              className={styles.fieldSelect}
              value={contentType}
              onChange={e => setContentType(e.target.value)}
            >
              {CONTENT_TYPES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Industry (optional)</label>
            <input
              type="text"
              className={styles.fieldInput}
              placeholder="e.g. SaaS, Healthcare"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
            />
          </div>
          <button
            className={styles.runBtn}
            onClick={runEngine}
            disabled={!keyword.trim() || processing}
          >
            {processing ? 'Analyzing…' : 'Analyze →'}
          </button>
        </div>
      </div>

      {/* Processing */}
      {processing && (
        <div className={styles.processing}>
          <div className={styles.processingSpinner} />
          <div className={styles.processingSteps}>
            {PROCESSING_STEPS.slice(0, currentStep + 1).map((step, i) => (
              <span
                key={i}
                className={styles.processingStep}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !processing && (
        <div className={styles.resultsGrid}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <p className={styles.cardLabel}>Keyword</p>
              <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>{result.keyword}</p>
              <div className={styles.scoreRow}>
                <span
                  className={styles.scoreBadge}
                  style={{
                    color: result.difficulty >= 70 ? '#FF2E2E' : result.difficulty >= 40 ? '#F5E642' : '#2EFF6E',
                    borderColor: result.difficulty >= 70 ? '#FF2E2E' : result.difficulty >= 40 ? '#F5E642' : '#2EFF6E',
                  }}
                >
                  KD {result.difficulty}
                </span>
                <span className={styles.scoreDetail}>{result.intent} intent</span>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>GSC signals</p>
              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{result.impressions.toLocaleString()}</span>
                  <span className={styles.statLabel}>Impressions</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{result.clicks}</span>
                  <span className={styles.statLabel}>Clicks</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{result.ctr}%</span>
                  <span className={styles.statLabel}>CTR</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>#{Math.round(result.position)}</span>
                  <span className={styles.statLabel}>Position</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>Opportunity gap</p>
              <p className={styles.gapText}>{result.gap}</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>Top competitors</p>
              {result.competitors.map((c, i) => (
                <div key={i} className={styles.competitor}>
                  <span className={styles.competitorDomain}>{c.domain}</span>
                  <span className={styles.competitorGap}>{c.gap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${view === 'analysis' ? styles.viewBtnActive : ''}`}
                onClick={() => setView('analysis')}
              >
                Analysis
              </button>
              <button
                className={`${styles.viewBtn} ${view === 'draft' ? styles.viewBtnActive : ''}`}
                onClick={() => setView('draft')}
              >
                Generated draft
              </button>
            </div>

            {view === 'analysis' ? (
              <>
                <div className={styles.card}>
                  <p className={styles.cardLabel}>Engine action</p>
                  <span className={styles.actionBadge}>{result.action.split('—')[0].trim()}</span>
                  <p className={styles.gapText} style={{ marginTop: 12 }}>{result.action}</p>
                </div>

                <div className={styles.card}>
                  <p className={styles.cardLabel}>Competitive gaps identified</p>
                  {result.competitors.map((c, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      padding: '10px 0',
                      borderBottom: i < result.competitors.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.3 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 13, opacity: 0.7 }}>{c.gap}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.card}>
                  <p className={styles.cardLabel}>AEO optimization</p>
                  <p className={styles.aeoNote}>{result.draft.aeoNote}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.card}>
                  <p className={styles.cardLabel}>Title tag</p>
                  <p className={styles.draftTitle}>{result.draft.title}</p>
                </div>

                <div className={styles.card}>
                  <p className={styles.cardLabel}>Meta description</p>
                  <p className={styles.draftMeta}>{result.draft.meta}</p>
                </div>

                <div className={styles.card}>
                  <p className={styles.cardLabel}>Article structure</p>
                  <p className={styles.draftH1}>{result.draft.h1}</p>
                  {result.draft.sections.map((sec, i) => (
                    <div key={i} className={styles.section}>
                      <p className={styles.sectionH2}>{sec.h2}</p>
                      <p className={styles.sectionPreview}>{sec.preview}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
