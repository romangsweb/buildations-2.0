'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '@/app/field-notes/FieldNotes.module.css'

type Note = {
  slug: string
  title: string
  excerpt?: string
  publishedAt: string
  category?: string
  readTime?: string
}

interface Props {
  notes: Note[]
}

export default function FieldNotesSearch({ notes }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setQuery('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return notes
    const q = query.toLowerCase()
    return notes.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt?.toLowerCase().includes(q)
    )
  }, [query, notes])

  // Group by month
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, Note[]>>((acc, note) => {
      const month = new Date(note.publishedAt).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
      })
      if (!acc[month]) acc[month] = []
      acc[month].push(note)
      return acc
    }, {})
  }, [filtered])

  return (
    <>
      {/* Search bar */}
      <div className={styles.searchWrap}>
        <div className={styles.searchInner}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            id="field-notes-search"
            className={styles.searchInput}
            type="search"
            placeholder="Buscar notas…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Buscar field notes"
            autoComplete="off"
          />
          {query ? (
            <button
              className={styles.searchClear}
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          ) : (
            <kbd className={styles.searchKbd}>/</kbd>
          )}
        </div>
        {query && (
          <p className={styles.searchCount} aria-live="polite">
            {filtered.length === 0
              ? 'Sin resultados'
              : `${filtered.length} nota${filtered.length !== 1 ? 's' : ''}`}
          </p>
        )}
      </div>

      {/* Feed */}
      <div className={styles.feed}>
        <div className={styles.feedInner}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyGlyph}>◌</span>
              <p className={styles.emptyText}>
                No hay notas que coincidan con <em>"{query}"</em>
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([month, monthNotes]) => (
              <div key={month} className={styles.monthGroup}>
                <div className={styles.monthLabel}>{month}</div>
                <div className={styles.notesList}>
                  {monthNotes.map((note, i) => (
                    <Link
                      key={note.slug}
                      href={`/field-notes/${note.slug}`}
                      className={styles.noteRow}
                      aria-label={`Leer: ${note.title}`}
                      style={{ '--i': i } as React.CSSProperties}
                    >
                      <div className={styles.noteDate}>
                        {note.publishedAt
                          ? new Date(note.publishedAt).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short',
                            })
                          : ''}
                      </div>
                      <div className={styles.noteBody}>
                        <h2 className={styles.noteTitle}>{note.title}</h2>
                        <p className={styles.noteExcerpt}>
                          {note.excerpt?.substring(0, 140)}…
                        </p>
                        {note.readTime && (
                          <span className={styles.readTimeMobile}>{note.readTime}</span>
                        )}
                      </div>
                      <div className={styles.noteMeta}>
                        {note.readTime && (
                          <span className={styles.readTime}>{note.readTime}</span>
                        )}
                        <span className={styles.arrow} aria-hidden="true">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
