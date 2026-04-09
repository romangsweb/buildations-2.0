export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  color: string;
}

export const articles: Article[] = [
  {
    slug: 'the-new-primitives',
    title: 'The New Primitives: Prompting as a Design Tool',
    excerpt: 'El diseño ya no trata de posicionar píxeles, sino de articular intención. Cómo herramientas como Flux y Midjourney requieren una comprensión sintáctica más que motriz.',
    date: '2026-04-01',
    readTime: '5 min',
    category: 'Design',
    color: '#1A3BFF', // Blue
  },
  {
    slug: 'latent-spaces',
    title: 'Navigating Latent Spaces in Architecture',
    excerpt: 'Explorando cómo los modelos de difusión entienden el espacio 3D y cómo los arquitectos pueden usar el espacio latente para descubrir formas imposibles.',
    date: '2026-03-15',
    readTime: '8 min',
    category: 'Architecture',
    color: '#0A0A0A', // Black
  },
  {
    slug: 'synthetic-typography',
    title: 'Synthetic Typography and the Grotesk Revival',
    excerpt: 'Por qué la explosión de la IA generativa ha provocado un retorno pendular hacia tipografías ultra-estructuradas y diseños brutalistas como mecanismo de anclaje humano.',
    date: '2026-02-28',
    readTime: '4 min',
    category: 'Typography',
    color: '#0A0A0A', // Black
  },
];

export interface Engine {
  slug: string;
  name: string;
  description: string;
  color: string;
  number: string;
}

export const engines: Engine[] = [
  {
    slug: 'seo-automator',
    name: 'SEO Automator',
    description: 'Generación de contenido semántico escalable y optimización on-page dirigida por agentes autónomos.',
    color: '#2EFF6E', // Green
    number: '01',
  },
  {
    slug: 'flux-vision',
    name: 'FLUX Vision',
    description: 'Síntesis visual hiperrealista. El motor degenerativo aplicado a tipografía y arquitectura.',
    color: '#0A0A0A', // Black
    number: '02',
  },
  {
    slug: 'ollama-logic',
    name: 'Ollama Logic',
    description: 'Razonamiento local. Modelos de lenguaje operando en edge para análisis y clasificación de datos crudos.',
    color: '#1A3BFF', // Blue
    number: '03',
  },
  {
    slug: 'whisper-voice',
    name: 'Whisper Voice',
    description: 'Transcripción y análisis semántico de audio en tiempo real para indexación narrativa.',
    color: '#F5E642', // Yellow
    number: '04',
  },
];
