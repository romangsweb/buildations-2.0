import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>Buildations</span>
        <nav className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/about">About</Link>
        </nav>
        <span className={styles.copy}>© {year}</span>
      </div>
    </footer>
  );
}
