'use client';
// Scroll-triggered reveal animation using IntersectionObserver
import { useEffect } from 'react';

export default function RevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
