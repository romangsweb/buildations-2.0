'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/Navbar.module.css';
import { IconHome, IconResearch, IconEngines, IconAbout, IconContact, IconMenu, IconClose } from '@/components/Icons';

// Lazy-load SearchModal to avoid hydration issues
const SearchModal = dynamic(() => import('@/components/SearchModal'), { ssr: false });

const links = [
  { href: '/',         label: 'Home',     index: '00', Icon: IconHome },
  { href: '/research', label: 'Research', index: '01', Icon: IconResearch },
  { href: '/engines',  label: 'Engines',  index: '02', Icon: IconEngines },
  { href: '/about',    label: 'About',    index: '03', Icon: IconAbout },
  { href: '/contact',  label: 'Contact',  index: '04', Icon: IconContact },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const checkBg = useCallback(() => {
    if (scrolled) { setDark(true); return; }
    const el = document.elementFromPoint(window.innerWidth / 2, 70);
    if (!el) return;
    const bg = window.getComputedStyle(el).backgroundColor;
    const match = bg.match(/\d+/g);
    if (!match) return;
    const [r, g, b] = match.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setDark(luminance < 0.6);
  }, [scrolled]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    checkBg();
    window.addEventListener('scroll', checkBg, { passive: true });
    return () => window.removeEventListener('scroll', checkBg);
  }, [checkBg]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${dark ? styles.navDark : styles.navLight}`}>
        {/* Logo / Wordmark */}
        <Link href="/" className={styles.logo} aria-label="Buildations Home">
          <span className={styles.logoIcon} aria-hidden="true">
            <span className={styles.logoIconLetter}>B</span>
            <span className={styles.logoIconDot} />
          </span>
          <span className={styles.logoText}>Buildations</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.filter(l => l.href !== '/').map(({ href, label, index }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${isActive(href) ? styles.active : ''}`}
            >
              <span className={styles.navIndex}>{index}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side group: search + CTA */}
        <div className={styles.navRight}>
          <SearchModal />
          <Link href="/contact" className={styles.ctaPill}>
            Start a project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open
            ? <IconClose size={22} color="currentColor" strokeWidth={1.3}/>
            : <IconMenu size={22} color="currentColor" strokeWidth={1.3}/>
          }
        </button>
      </header>

      {/* Mobile fullscreen overlay */}
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {links.map(({ href, label, index, Icon }, i) => (
            <Link
              key={href}
              href={href}
              className={`${styles.overlayLink} ${isActive(href) ? styles.overlayActive : ''}`}
              style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span className={styles.overlayIndex}>{index}</span>
              <span className={styles.overlayLabel}>{label}</span>
              <span className={styles.overlayIcon}>
                <Icon size={24} color="currentColor" strokeWidth={1}/>
              </span>
            </Link>
          ))}
        </nav>
        <div className={styles.overlaySearch}>
          <SearchModal />
          <span className={styles.overlaySearchLabel}>Buscar artículos · ⌘K</span>
        </div>
        <div className={styles.overlayFooter}>
          <span className={styles.overlayFooterText}>AI Research Laboratory — CDMX</span>
          <Link href="/contact" className={styles.overlayCtaPill} onClick={() => setOpen(false)}>
            Start a project →
          </Link>
        </div>
        {/* Large decorative number */}
        <span className={styles.overlayDecNum} aria-hidden="true">LAB</span>
      </div>
    </>
  );
}
