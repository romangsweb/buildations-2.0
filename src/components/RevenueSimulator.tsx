'use client'
import { useState } from 'react'
import styles from './RevenueSimulator.module.css'

const DEALS = [
  {
    id: 'strong',
    label: 'Strong fit',
    company: 'Stark Industries S.A.',
    industry: 'Manufacturing',
    industryTier: 'tier1',
    winRate: 68,
    source: 'REFERRALS',
    amount: 145000,
    role: 'DECISION_MAKER',
    contacts: 4,
    daysInStage: 12,
    score: 87,
    factors: [
      { label: 'Industry fit', detail: 'Manufacturing — Tier 1, 68% win rate', delta: +25, positive: true },
      { label: 'Traffic source', detail: 'Referral — highest closing channel', delta: +10, positive: true },
      { label: 'Deal size', detail: '$145,000 — enterprise tier', delta: +15, positive: true },
      { label: 'Buying role', detail: 'Decision maker identified', delta: +10, positive: true },
      { label: 'Contact depth', detail: '4 contacts associated', delta: +5, positive: true },
      { label: 'Stage velocity', detail: '12 days — within normal range', delta: 0, positive: true },
    ],
    diagnosis: 'High-fit deal with decision maker engaged. Referral source and enterprise size align with historical winners. Prioritize now.',
    recommendation: 'Accelerate — move to proposal stage this week'
  },
  {
    id: 'risk',
    label: 'At risk',
    company: 'Initech Digital Ltd.',
    industry: 'Media',
    industryTier: 'tier3',
    winRate: 14,
    source: 'PAID_SEARCH',
    amount: 3800,
    role: 'END_USER',
    contacts: 1,
    daysInStage: 47,
    score: 22,
    factors: [
      { label: 'Industry fit', detail: 'Media — Tier 3, 14% win rate', delta: -20, positive: false },
      { label: 'Traffic source', detail: 'Paid search — lowest closing channel', delta: -10, positive: false },
      { label: 'Deal size', detail: '$3,800 — below typical threshold', delta: -5, positive: false },
      { label: 'Buying role', detail: 'End user — no decision maker identified', delta: -5, positive: false },
      { label: 'Contact depth', detail: '1 contact — shallow engagement', delta: 0, positive: false },
      { label: 'Stage velocity', detail: '47 days stalled — significant risk signal', delta: -5, positive: false },
    ],
    diagnosis: 'Multiple risk signals converging. Wrong industry, wrong source, no decision maker, stalled pipeline. Low probability of close.',
    recommendation: 'Deprioritize — reassign resources to higher-fit deals'
  },
  {
    id: 'mixed',
    label: 'Mixed signals',
    company: 'Umbrella Logistics Corp.',
    industry: 'Logistics',
    industryTier: 'tier2',
    winRate: 41,
    source: 'ORGANIC_SEARCH',
    amount: 62000,
    role: 'INFLUENCER',
    contacts: 2,
    daysInStage: 22,
    score: 61,
    factors: [
      { label: 'Industry fit', detail: 'Logistics — Tier 2, 41% win rate', delta: +10, positive: true },
      { label: 'Traffic source', detail: 'Organic search — moderate signal', delta: +5, positive: true },
      { label: 'Deal size', detail: '$62,000 — mid-market range', delta: +10, positive: true },
      { label: 'Buying role', detail: 'Influencer — decision maker not yet identified', delta: +5, positive: false },
      { label: 'Contact depth', detail: '2 contacts — needs expansion', delta: 0, positive: false },
      { label: 'Stage velocity', detail: '22 days — slightly slow for deal size', delta: 0, positive: false },
    ],
    diagnosis: 'Solid industry fit and deal size, but missing the decision maker. One key contact away from a strong deal.',
    recommendation: 'Develop — find and engage the decision maker this week'
  }
]

const TIER_COLOR: Record<string, string> = {
  tier1: '#2EFF6E',
  tier2: '#F5E642',
  tier3: '#FF2E2E',
}

export default function RevenueSimulator() {
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const d = DEALS[active]

  const reset = () => setRevealed(false)

  return (
    <div className={styles.simulator}>
      <div className={styles.tabs}>
        {DEALS.map((deal, i) => (
          <button key={deal.id}
            className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            onClick={() => { setActive(i); reset() }}>
            {deal.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Deal</p>
            <p className={styles.company}>{d.company}</p>
            <div className={styles.meta}>
              <span className={styles.metaTag} style={{ color: TIER_COLOR[d.industryTier] }}>
                {d.industry}
              </span>
              <span className={styles.metaDivider}>·</span>
              <span className={styles.metaVal}>${d.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>ICP tier</p>
            <div className={styles.tierRow}>
              <span className={styles.tierDot} style={{ background: TIER_COLOR[d.industryTier] }} />
              <span className={styles.tierLabel}>{d.industryTier.replace('tier', 'Tier ')} — {d.winRate}% win rate</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>Buying signals</p>
            <div className={styles.signalRow}>
              <span className={styles.signalKey}>Role</span>
              <span className={styles.signalVal}>{d.role.replace('_', ' ').toLowerCase()}</span>
            </div>
            <div className={styles.signalRow}>
              <span className={styles.signalKey}>Source</span>
              <span className={styles.signalVal}>{d.source.replace('_', ' ').toLowerCase()}</span>
            </div>
            <div className={styles.signalRow}>
              <span className={styles.signalKey}>Contacts</span>
              <span className={styles.signalVal}>{d.contacts}</span>
            </div>
            <div className={styles.signalRow}>
              <span className={styles.signalKey}>Days in stage</span>
              <span className={styles.signalVal}>{d.daysInStage}</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {!revealed ? (
            <div className={styles.scoreReveal}>
              <p className={styles.cardLabel}>Engine output</p>
              <p className={styles.revealHint}>Run the engine to score this deal</p>
              <button className={styles.runBtn} onClick={() => setRevealed(true)}>
                Score this deal →
              </button>
            </div>
          ) : (
            <div className={styles.output}>
              <div className={styles.scoreHeader}>
                <div>
                  <p className={styles.cardLabel}>ML Score</p>
                  <p className={styles.score}>{d.score}</p>
                </div>
                <div className={styles.scoreMeter}>
                  <div className={styles.scoreMeterFill}
                    style={{
                      height: `${d.score}%`,
                      background: d.score >= 70 ? '#2EFF6E' : d.score >= 40 ? '#F5E642' : '#FF2E2E'
                    }}
                  />
                </div>
              </div>

              <div className={styles.factors}>
                <p className={styles.cardLabel}>Factor breakdown</p>
                {d.factors.map((f, i) => (
                  <div key={i} className={styles.factor}>
                    <div className={styles.factorLeft}>
                      <span className={styles.factorLabel}>{f.label}</span>
                      <span className={styles.factorDetail}>{f.detail}</span>
                    </div>
                    <span className={styles.factorDelta}
                      style={{ color: f.delta > 0 ? '#2EFF6E' : f.delta < 0 ? '#FF2E2E' : 'rgba(255,255,255,0.3)' }}>
                      {f.delta > 0 ? '+' : ''}{f.delta !== 0 ? f.delta : '—'}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.diagnosis}>
                <p className={styles.cardLabel}>Diagnosis</p>
                <p className={styles.diagnosisText}>{d.diagnosis}</p>
              </div>

              <div className={styles.recommendation}>
                <p className={styles.recommendationText}>→ {d.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
