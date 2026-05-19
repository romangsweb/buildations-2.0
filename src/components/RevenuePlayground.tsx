'use client'
import { useState, useCallback } from 'react'
import styles from './RevenuePlayground.module.css'

/* ─── Engine scoring logic (mirrors the real ML model heuristics) ─── */

const INDUSTRIES = [
  { value: 'manufacturing', label: 'Manufacturing', tier: 1, winRate: 68 },
  { value: 'logistics', label: 'Logistics', tier: 2, winRate: 41 },
  { value: 'technology', label: 'Technology', tier: 1, winRate: 62 },
  { value: 'financial', label: 'Financial Services', tier: 1, winRate: 58 },
  { value: 'healthcare', label: 'Healthcare', tier: 2, winRate: 44 },
  { value: 'retail', label: 'Retail', tier: 2, winRate: 38 },
  { value: 'education', label: 'Education', tier: 3, winRate: 22 },
  { value: 'media', label: 'Media & Entertainment', tier: 3, winRate: 14 },
  { value: 'hospitality', label: 'Hospitality', tier: 3, winRate: 18 },
  { value: 'real_estate', label: 'Real Estate', tier: 2, winRate: 35 },
  { value: 'energy', label: 'Energy', tier: 1, winRate: 55 },
  { value: 'other', label: 'Other', tier: 3, winRate: 25 },
]

const SOURCES = [
  { value: 'referral', label: 'Referral', delta: 10 },
  { value: 'organic', label: 'Organic Search', delta: 5 },
  { value: 'direct', label: 'Direct Traffic', delta: 3 },
  { value: 'social', label: 'Social Media', delta: 0 },
  { value: 'paid', label: 'Paid Search', delta: -5 },
  { value: 'cold_outbound', label: 'Cold Outbound', delta: -8 },
]

const ROLES = [
  { value: 'decision_maker', label: 'Decision Maker', delta: 10 },
  { value: 'influencer', label: 'Influencer', delta: 5 },
  { value: 'champion', label: 'Internal Champion', delta: 7 },
  { value: 'end_user', label: 'End User', delta: -5 },
  { value: 'unknown', label: 'Unknown', delta: -10 },
]

const PROCESSING_STEPS = [
  'Loading ICP tier model…',
  'Cross-referencing industry win rates…',
  'Analyzing buying signals…',
  'Running ML ensemble (Random Forest + GBM)…',
  'Generating factor attribution…',
  'Composing diagnosis…',
]

interface FormData {
  company: string
  industry: string
  dealSize: string
  source: string
  role: string
  contacts: string
  daysInStage: string
}

interface Factor {
  name: string
  detail: string
  delta: number
}

interface ScoreResult {
  score: number
  verdict: string
  verdictColor: string
  factors: Factor[]
  diagnosis: string
  recommendation: string
}

function scoreDeal(data: FormData): ScoreResult {
  const industry = INDUSTRIES.find(i => i.value === data.industry)!
  const source = SOURCES.find(s => s.value === data.source)!
  const role = ROLES.find(r => r.value === data.role)!
  const dealSize = parseInt(data.dealSize) || 0
  const contacts = parseInt(data.contacts) || 1
  const days = parseInt(data.daysInStage) || 0

  const factors: Factor[] = []
  let base = 35

  // Industry fit
  const tierDelta = industry.tier === 1 ? 25 : industry.tier === 2 ? 10 : -20
  base += tierDelta
  factors.push({
    name: 'Industry fit',
    detail: `${industry.label} — Tier ${industry.tier}, ${industry.winRate}% win rate`,
    delta: tierDelta,
  })

  // Source
  base += source.delta
  factors.push({
    name: 'Traffic source',
    detail: `${source.label} — ${source.delta >= 0 ? 'positive' : 'negative'} closing signal`,
    delta: source.delta,
  })

  // Deal size
  const sizeDelta = dealSize >= 100000 ? 15 : dealSize >= 50000 ? 10 : dealSize >= 20000 ? 5 : dealSize >= 5000 ? 0 : -5
  base += sizeDelta
  factors.push({
    name: 'Deal size',
    detail: `$${dealSize.toLocaleString()} — ${dealSize >= 100000 ? 'enterprise tier' : dealSize >= 50000 ? 'mid-market' : dealSize >= 20000 ? 'SMB+' : dealSize >= 5000 ? 'SMB' : 'micro deal'}`,
    delta: sizeDelta,
  })

  // Buying role
  base += role.delta
  factors.push({
    name: 'Buying role',
    detail: `${role.label}${role.delta < 0 ? ' — no decision maker identified' : ' — engaged'}`,
    delta: role.delta,
  })

  // Contacts
  const contactDelta = contacts >= 4 ? 5 : contacts >= 2 ? 2 : 0
  base += contactDelta
  factors.push({
    name: 'Contact depth',
    detail: `${contacts} contact${contacts !== 1 ? 's' : ''} — ${contacts >= 4 ? 'strong engagement' : contacts >= 2 ? 'developing' : 'shallow'}`,
    delta: contactDelta,
  })

  // Stage velocity
  const velocityDelta = days <= 14 ? 5 : days <= 30 ? 0 : days <= 60 ? -5 : -10
  base += velocityDelta
  factors.push({
    name: 'Stage velocity',
    detail: `${days} days — ${days <= 14 ? 'within normal range' : days <= 30 ? 'slightly slow' : days <= 60 ? 'stalling' : 'significant risk signal'}`,
    delta: velocityDelta,
  })

  const score = Math.max(0, Math.min(100, base))

  let verdict: string, verdictColor: string, recommendation: string
  if (score >= 75) {
    verdict = 'ACCELERATE'
    verdictColor = '#2EFF6E'
    recommendation = `Accelerate — high-fit ${data.company || 'deal'} with strong signals. Move to proposal stage.`
  } else if (score >= 50) {
    verdict = 'DEVELOP'
    verdictColor = '#F5E642'
    recommendation = `Develop — ${data.company || 'deal'} has potential but needs key actions. ${role.delta < 0 ? 'Find and engage the decision maker.' : 'Expand contact depth.'}`
  } else {
    verdict = 'DEPRIORITIZE'
    verdictColor = '#FF2E2E'
    recommendation = `Deprioritize — multiple risk signals on ${data.company || 'deal'}. Reassign resources to higher-fit deals.`
  }

  const negativeFactors = factors.filter(f => f.delta < 0).map(f => f.name.toLowerCase())
  const positiveFactors = factors.filter(f => f.delta > 0).map(f => f.name.toLowerCase())

  let diagnosis = ''
  if (score >= 75) {
    diagnosis = `High-fit deal with ${positiveFactors.slice(0, 3).join(', ')} all signaling positively. Historical patterns match closed-won profile.`
  } else if (score >= 50) {
    diagnosis = `Mixed signals. ${positiveFactors.length > 0 ? `Positive on ${positiveFactors.slice(0, 2).join(' and ')}` : 'No strong positive signals'}${negativeFactors.length > 0 ? `, but ${negativeFactors.slice(0, 2).join(' and ')} are dragging the score down` : ''}. One or two actions could move this deal up.`
  } else {
    diagnosis = `Multiple risk signals converging: ${negativeFactors.slice(0, 3).join(', ')}. Low probability of close based on historical patterns.`
  }

  return { score, verdict, verdictColor, factors, diagnosis, recommendation }
}

export default function RevenuePlayground() {
  const [form, setForm] = useState<FormData>({
    company: '',
    industry: 'manufacturing',
    dealSize: '',
    source: 'organic',
    role: 'decision_maker',
    contacts: '',
    daysInStage: '',
  })

  const [result, setResult] = useState<ScoreResult | null>(null)
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const update = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const runEngine = useCallback(async () => {
    setProcessing(true)
    setResult(null)
    setCurrentStep(0)

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 200))
      setCurrentStep(i)
    }

    await new Promise(r => setTimeout(r, 300))
    const scored = scoreDeal(form)
    setProcessing(false)
    setResult(scored)
  }, [form])

  const reset = () => {
    setResult(null)
    setProcessing(false)
    setForm({
      company: '',
      industry: 'manufacturing',
      dealSize: '',
      source: 'organic',
      role: 'decision_maker',
      contacts: '',
      daysInStage: '',
    })
  }

  const canRun = form.dealSize && form.contacts && form.daysInStage

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.engineTag}>
            <span className={styles.engineDot} />
            Revenue Intelligence
          </span>
          <h2 className={styles.playgroundTitle}>Deal Scoring Playground</h2>
        </div>
        {result && (
          <button className={styles.resetBtn} onClick={reset}>
            Reset ↻
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {/* Input form */}
        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Company name</label>
            <input
              type="text"
              className={styles.fieldInput}
              placeholder="e.g. Acme Corp"
              value={form.company}
              onChange={e => update('company', e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Industry</label>
            <select
              className={styles.fieldSelect}
              value={form.industry}
              onChange={e => update('industry', e.target.value)}
            >
              {INDUSTRIES.map(i => (
                <option key={i.value} value={i.value}>
                  {i.label} (Tier {i.tier})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Deal size (USD)</label>
              <input
                type="number"
                className={styles.fieldInput}
                placeholder="e.g. 75000"
                value={form.dealSize}
                onChange={e => update('dealSize', e.target.value)}
                min="0"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Days in stage</label>
              <input
                type="number"
                className={styles.fieldInput}
                placeholder="e.g. 18"
                value={form.daysInStage}
                onChange={e => update('daysInStage', e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Traffic source</label>
            <select
              className={styles.fieldSelect}
              value={form.source}
              onChange={e => update('source', e.target.value)}
            >
              {SOURCES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Buyer role</label>
              <select
                className={styles.fieldSelect}
                value={form.role}
                onChange={e => update('role', e.target.value)}
              >
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Contacts</label>
              <input
                type="number"
                className={styles.fieldInput}
                placeholder="e.g. 3"
                value={form.contacts}
                onChange={e => update('contacts', e.target.value)}
                min="1"
              />
            </div>
          </div>

          <button
            className={processing ? styles.runBtnProcessing : styles.runBtn}
            onClick={runEngine}
            disabled={!canRun || processing}
          >
            {processing ? 'Processing…' : result ? 'Re-score deal →' : 'Score this deal →'}
          </button>
        </div>

        {/* Results */}
        <div className={styles.results}>
          {!result && !processing && (
            <div className={styles.emptyState}>
              <span className={styles.emptyGlyph} aria-hidden="true">⚡</span>
              <p className={styles.emptyText}>
                Enter deal details and run the engine to see a real-time ML score with full factor attribution.
              </p>
            </div>
          )}

          {processing && (
            <div className={styles.processing}>
              <div className={styles.processingSpinner} />
              <div className={styles.processingSteps}>
                {PROCESSING_STEPS.slice(0, currentStep + 1).map((step, i) => (
                  <span
                    key={i}
                    className={styles.processingStep}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result && !processing && (
            <div className={styles.output}>
              {/* Score + verdict */}
              <div className={styles.scoreCard}>
                <div className={styles.scoreLeft}>
                  <span className={styles.scoreLabel}>ML Score</span>
                  <span className={styles.scoreValue} style={{
                    color: result.score >= 75 ? '#2EFF6E' : result.score >= 50 ? '#F5E642' : '#FF2E2E'
                  }}>
                    {result.score}
                  </span>
                </div>
                <div className={styles.scoreMeter}>
                  <div
                    className={styles.scoreMeterFill}
                    style={{
                      height: `${result.score}%`,
                      background: result.verdictColor,
                    }}
                  />
                </div>
                <div className={styles.scoreVerdict}>
                  <span
                    className={styles.verdictBadge}
                    style={{ color: result.verdictColor, borderColor: result.verdictColor }}
                  >
                    {result.verdict}
                  </span>
                  <span className={styles.verdictSub}>
                    {form.company || 'Deal'} · ${parseInt(form.dealSize).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Factor breakdown */}
              <div className={styles.factorsCard}>
                <p className={styles.factorsTitle}>Factor breakdown</p>
                {result.factors.map((f, i) => (
                  <div
                    key={i}
                    className={styles.factor}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className={styles.factorInfo}>
                      <span className={styles.factorName}>{f.name}</span>
                      <span className={styles.factorDetail}>{f.detail}</span>
                    </div>
                    <span
                      className={styles.factorDelta}
                      style={{
                        color: f.delta > 0 ? '#2EFF6E' : f.delta < 0 ? '#FF2E2E' : 'rgba(255,255,255,0.3)'
                      }}
                    >
                      {f.delta > 0 ? '+' : ''}{f.delta !== 0 ? f.delta : '—'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Diagnosis */}
              <div className={styles.diagnosisCard}>
                <p className={styles.diagnosisLabel}>Diagnosis</p>
                <p className={styles.diagnosisText}>{result.diagnosis}</p>
              </div>

              {/* Recommendation */}
              <div className={styles.recommendation}>
                <p className={styles.recommendationText}>→ {result.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
