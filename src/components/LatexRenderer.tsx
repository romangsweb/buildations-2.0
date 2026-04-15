'use client'
import { useEffect, useRef } from 'react'
import styles from './LatexRenderer.module.css'

interface Props {
  content: string
}

declare global {
  interface Window { katex: any }
}

function latexToHtml(text: string): string {
  return text
    .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
    .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
    .replace(/\\texttt\{([^}]+)\}/g, '<code>$1</code>')
    .replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>')
    .replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>')
    .replace(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g, function(_: string, items: string) {
      const lis = items.replace(/\\item\s*/g, '\x01').split('\x01').filter(Boolean).map(function(s: string) { return '<li>' + s.trim() + '</li>' }).join('')
      return '<ul>' + lis + '</ul>'
    })
    .replace(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g, function(_: string, items: string) {
      const lis = items.replace(/\\item\s*/g, '\x01').split('\x01').filter(Boolean).map(function(s: string) { return '<li>' + s.trim() + '</li>' }).join('')
      return '<ol>' + lis + '</ol>'
    })
    .replace(/\\section\{([^}]+)\}/g, '<h2>$1</h2>')
    .replace(/\\subsection\{([^}]+)\}/g, '<h3>$1</h3>')
    .replace(/\\begin\{table\}[\s\S]*?\\begin\{tabular\}[^}]*\}([\s\S]*?)\\end\{tabular\}[\s\S]*?\\end\{table\}/g, function(_: string, content: string) {
      const rows = content.split('\\\\').map(function(r: string) { return r.replace(/\\hline/g, '').trim() }).filter(Boolean)
      const html = rows.map(function(row: string, i: number) {
        const cells = row.split('&').map(function(c: string) { return latexToHtml(c.trim()) })
        const tag = i === 0 ? 'th' : 'td'
        return '<tr>' + cells.map(function(c) { return '<' + tag + '>' + c + '</' + tag + '>' }).join('') + '</tr>'
      }).join('')
      return '<div class="latex-table-wrap"><table class="latex-table">' + html + '</table></div>'
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function renderMath(html: string, katex: any): string {
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, function(_: string, math: string) {
    try { return '<div class="katex-block">' + katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }) + '</div>' }
    catch { return '<div class="katex-error">' + math + '</div>' }
  })
  html = html.replace(/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, function(_: string, math: string) {
    try { return '<div class="katex-block">' + katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }) + '</div>' }
    catch { return '<div class="katex-error">' + math + '</div>' }
  })
  html = html.replace(/\$([^\$\n]+?)\$/g, function(_: string, math: string) {
    try { return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }) }
    catch { return '<span class="katex-error">' + math + '</span>' }
  })
  return html
}

function processContent(text: string): string {
  if (!text) return ''
  // Apply text transforms to raw content first
  const preprocessed = latexToHtml(text)
  return preprocessed.split('\n\n').map(function(para: string) {
    if (para.startsWith('<h2>') || para.startsWith('<h3>') || para.startsWith('<ul>') || para.startsWith('<ol>') || para.startsWith('<div') || para.startsWith('<table')) return para
    if (para.startsWith('## ')) return '<h2>' + para.replace(/^## /, '') + '</h2>'
    if (para.startsWith('# ')) return '<h1>' + para.replace(/^# /, '') + '</h1>'
    const transformed = para
    if (transformed.startsWith('<h') || transformed.startsWith('<ul') ||
        transformed.startsWith('<ol') || transformed.startsWith('<div') ||
        transformed.startsWith('<table')) {
      return transformed
    }
    return '<p>' + transformed + '</p>'
  }).join('\n')
}

export default function LatexRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || !content) return
    const render = () => {
      if (!ref.current) return
      ref.current.innerHTML = renderMath(ref.current.innerHTML, window.katex)
    }
    if (window.katex) {
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
      script.onload = render
      document.head.appendChild(script)
    }
  }, [content])
  return (
    <div ref={ref} className={styles.latex}
      dangerouslySetInnerHTML={{ __html: processContent(content) }} />
  )
}
