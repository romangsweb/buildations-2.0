'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/engines', label: 'Engines' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>Buildations</Link>
      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href}
            className={`${styles.navLink} ${pathname === href || (pathname.startsWith(href) && href !== '/') ? styles.active : ''}`}>
            {label}
          </Link>
        ))}
      </nav>
      <button className={styles.menuBtn} onClick={() => setOpen(o => !o)} aria-label="Menu">
        {open ? '✕' : '☰'}
      </button>
    </header>
  );
}
