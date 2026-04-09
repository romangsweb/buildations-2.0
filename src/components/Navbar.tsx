'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Navbar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/engines', label: 'Engines' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Buildations
      </Link>
      <nav className={styles.nav}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${
               pathname === href || (pathname.startsWith('/engines') && href === '/engines') 
                 ? styles.active : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
