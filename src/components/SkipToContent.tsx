'use client'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content"
      onFocus={e => {
        e.currentTarget.style.cssText = `
          position: fixed; top: 96px; left: 16px; z-index: 9999;
          background: #F5E642; color: #0A0A0A;
          padding: 12px 20px; font-weight: 700;
          font-size: 13px; letter-spacing: 0.05em;
          text-decoration: none;
        `
      }}
      onBlur={e => {
        e.currentTarget.style.cssText = `
          position: absolute; left: -9999px; top: auto;
          width: 1px; height: 1px; overflow: hidden;
        `
      }}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      Saltar al contenido
    </a>
  )
}
