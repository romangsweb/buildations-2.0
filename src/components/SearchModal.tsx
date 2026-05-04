'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '@/styles/SearchModal.module.css';
import { CategoryIcon, IconClose } from '@/components/Icons';

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  type: string;
  url?: string;
  engine?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  suggested: boolean;
}

const CATEGORIES = ['Design', 'Architecture', 'Typography', 'AI', 'Research'];

// Highlight matching text in a string
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className={styles.highlight}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggested, setSuggested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  // Open / close on ⌘K or Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      fetchResults(''); // load suggestions
    } else {
      setQuery('');
      setResults([]);
      setActiveIdx(-1);
    }
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const fetchResults = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: SearchResponse = await res.json();
      setResults(data.results);
      setSuggested(data.suggested);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!open) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(query), 180);
    return () => clearTimeout(debounceRef.current);
  }, [query, open, fetchResults]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0 && results[activeIdx]) {
      router.push(results[activeIdx].url || `/research/${results[activeIdx].slug}`);
      setOpen(false);
    }
  };

  // Scroll active result into view
  useEffect(() => {
    if (activeIdx < 0) return;
    const el = resultsRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const formatDate = (str: string) => {
    if (!str) return '';
    return new Date(str).toLocaleDateString('es-MX', { year: 'numeric', month: 'short' });
  };

  if (!open) {
    return (
      <button
        id="search-trigger"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Search (⌘K)"
        title="Search (⌘K)"
      >
        {/* Abstract search glyph — not a magnifying glass */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
          <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="5" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
          <line x1="7.5" y1="5" x2="7.5" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
        </svg>
        <span className={styles.triggerKbd}>⌘K</span>
      </button>
    );
  }

  return (
    <div
      className={styles.backdrop}
      onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className={styles.modal}>

        {/* Top bar */}
        <div className={styles.topBar}>
          {/* Abstract search glyph in large */}
          <div className={styles.searchGlyph} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="5" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4"/>
              <line x1="7.5" y1="5" x2="7.5" y2="10" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4"/>
            </svg>
          </div>

          <input
            ref={inputRef}
            id="search-input"
            className={styles.input}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(-1); }}
            onKeyDown={onKeyDown}
            placeholder="Buscar artículos, casos, notas, términos…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls="search-results"
          />

          <div className={styles.topBarRight}>
            {loading && <span className={styles.spinner} aria-hidden="true"/>}
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              <IconClose size={18} color="currentColor" strokeWidth={1.2}/>
            </button>
          </div>
        </div>

        {/* Divider line */}
        <div className={styles.divider} aria-hidden="true"/>

        {/* Body */}
        <div className={styles.body} ref={resultsRef} id="search-results" role="listbox">

          {/* Suggested state — no query */}
          {suggested && !query && (
            <div className={styles.suggestedSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Explorar categorías</span>
              </div>
              <div className={styles.categories}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={styles.categoryPill}
                    onClick={() => setQuery(cat)}
                  >
                    <CategoryIcon category={cat} size={14} color="currentColor" strokeWidth={1.1}/>
                    {cat}
                  </button>
                ))}
              </div>

              {results.length > 0 && (
                <>
                  <div className={styles.sectionHeader} style={{ marginTop: 32 }}>
                    <span className={styles.sectionLabel}>Publicaciones recientes</span>
                  </div>
                  {results.map((r, i) => (
                    <ResultRow
                      key={r.slug}
                      result={r}
                      query=""
                      isActive={i === activeIdx}
                      idx={i}
                      formatDate={formatDate}
                      onClick={() => { router.push(r.url || `/research/${r.slug}`); setOpen(false); }}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/* Search results */}
          {!suggested && results.length > 0 && (
            <div className={styles.resultsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>{results.length} resultado{results.length !== 1 ? 's' : ''}</span>
              </div>
              {results.map((r, i) => (
                <ResultRow
                  key={r.slug}
                  result={r}
                  query={query}
                  isActive={i === activeIdx}
                  idx={i}
                  formatDate={formatDate}
                  onClick={() => { router.push(r.url || `/research/${r.slug}`); setOpen(false); }}
                />
              ))}
            </div>
          )}

          {/* No results */}
          {!suggested && !loading && query && results.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyGlyph} aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"/>
                  <line x1="30" y1="30" x2="44" y2="44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"/>
                  <path d="M16 20 Q20 14, 24 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.4"/>
                  <line x1="20" y1="24" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
                </svg>
              </span>
              <p className={styles.emptyTitle}>
                Sin señal para <em>&ldquo;{query}&rdquo;</em>
              </p>
              <p className={styles.emptyHint}>
                Intenta con otro término — diseño, arquitectura, modelos, tipografía…
              </p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className={styles.footer}>
          <span className={styles.footerHint}>
            <kbd>↑↓</kbd> navegar · <kbd>↵</kbd> abrir · <kbd>esc</kbd> cerrar
          </span>
          <span className={styles.footerBrand}>Buildations Search</span>
        </div>
      </div>
    </div>
  );
}

// ─── Result Row ─────────────────────────────────────────────
function ResultRow({
  result,
  query,
  isActive,
  idx,
  formatDate,
  onClick,
}: {
  result: SearchResult;
  query: string;
  isActive: boolean;
  idx: number;
  formatDate: (s: string) => string;
  onClick: () => void;
}) {
  return (
    <button
      className={`${styles.resultRow} ${isActive ? styles.resultActive : ''}`}
      data-idx={idx}
      onClick={onClick}
      role="option"
      aria-selected={isActive}
    >
      <span className={styles.resultIdxNum} aria-hidden="true">0{idx + 1}</span>
      {result.type && result.type !== 'article' && (
        <span className={styles.resultTypeBadge} data-type={result.type}>
          {result.type === 'case-study' ? 'Case' : result.type === 'field-note' ? 'Note' : result.type === 'lexicon' ? 'Lexicon' : result.type}
        </span>
      )}
      <span className={styles.resultBody}>
        <span className={styles.resultMeta}>
          {result.category && (
            <span className={styles.resultCat}>
              <CategoryIcon category={result.category} size={11} color="currentColor" strokeWidth={1.1}/>
              {result.category}
            </span>
          )}
          {result.publishedAt && (
            <span className={styles.resultDate}>{formatDate(result.publishedAt)}</span>
          )}
        </span>
        <span className={styles.resultTitle}>
          <Highlight text={result.title} query={query}/>
        </span>
        {result.excerpt && (
          <span className={styles.resultExcerpt}>
            <Highlight text={result.excerpt.substring(0, 100)} query={query}/>…
          </span>
        )}
      </span>
      <span className={styles.resultArrow} aria-hidden="true">→</span>
    </button>
  );
}
