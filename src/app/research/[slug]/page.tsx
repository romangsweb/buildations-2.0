import { notFound } from 'next/navigation';
import { articles } from '@/lib/data';
import styles from './Article.module.css';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  return {
    title: article?.title || 'Article Not Found',
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.article} style={{ '--theme': article.color } as React.CSSProperties}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.meta} data-reveal>
            <span>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className={styles.title} data-reveal>{article.title}</h1>
          <p className={styles.excerpt} data-reveal>{article.excerpt}</p>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.containerText} data-reveal>
          <p>
            This is a mock implementation of the article content. In a production environment, this would be rendered from MDX or a headless CMS. For now, we are demonstrating the layout and typography system.
          </p>
          <h2>El rol del humano en el loop</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <blockquote>
            "La herramienta moldea al humano tanto como el humano moldea la herramienta."
          </blockquote>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </article>
  );
}
