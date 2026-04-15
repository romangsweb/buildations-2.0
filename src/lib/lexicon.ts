// Buildations — Lexicon of AI terms
// Editorial definitions. Not Wikipedia.

export interface LexiconTerm {
  id: string;
  term: string;
  letter: string;
  definition: string;
  relatedEngine?: string;
  engineColor?: string;
  tags?: string[];
}

export const lexiconTerms: LexiconTerm[] = [
  {
    id: 'agente',
    term: 'Agente',
    letter: 'A',
    definition: 'Un modelo de lenguaje que no solo responde, sino que actúa: llama funciones, evalúa resultados y decide el siguiente paso. La diferencia entre un chatbot y un sistema autónomo.',
    relatedEngine: 'Adaptive Security',
    engineColor: '#FF2D2D',
    tags: ['autonomy', 'LLM'],
  },
  {
    id: 'arquitectura-rag',
    term: 'Arquitectura RAG',
    letter: 'A',
    definition: 'Retrieval-Augmented Generation. El modelo no inventa — primero recupera contexto relevante de una base de conocimiento, luego genera. Reduce alucinaciones. Base de nuestro motor de búsqueda semántica.',
    relatedEngine: 'Search & Presence',
    engineColor: '#1A3BFF',
    tags: ['retrieval', 'generation'],
  },
  {
    id: 'alucinacion',
    term: 'Alucinación',
    letter: 'A',
    definition: 'Cuando un modelo genera información plausible pero falsa con total confianza. No es un error de programación — es una característica estadística del proceso de generación. Se mitiga con RAG, grounding y validación humana.',
    tags: ['failure mode', 'LLM'],
  },
  {
    id: 'contexto-ventana',
    term: 'Ventana de Contexto',
    letter: 'C',
    definition: 'El máximo de tokens que un modelo puede "ver" en una sola inferencia. GPT-4 Turbo: 128K. Claude: 200K. Más contexto permite razonamiento más profundo, pero aumenta latencia y costo.',
    tags: ['tokens', 'memory'],
  },
  {
    id: 'diffusion',
    term: 'Diffusion Model',
    letter: 'D',
    definition: 'La arquitectura detrás de Stable Diffusion, FLUX y DALL-E. Aprende a revertir ruido gaussiano progresivamente hasta recuperar una imagen coherente. La síntesis generativa más poderosa para medios visuales.',
    relatedEngine: 'FLUX Vision',
    engineColor: '#0A0A0A',
    tags: ['vision', 'generative'],
  },
  {
    id: 'edge-inference',
    term: 'Inferencia Local (Edge)',
    letter: 'E',
    definition: 'Correr modelos de lenguaje directamente en hardware propio, sin depender de APIs externas. Ollama lo hace posible en CPU o GPU local. Cero latencia de red, cero datos enviados a terceros. Nuestra filosofía operacional.',
    relatedEngine: 'Ollama Logic',
    engineColor: '#1A3BFF',
    tags: ['ollama', 'privacy', 'local'],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    letter: 'E',
    definition: 'La representación numérica de texto (o imagen) en un espacio vectorial de alta dimensión. Dos frases semánticamente similares tienen embeddings cercanos, aunque no compartan palabras. La base de la búsqueda semántica.',
    relatedEngine: 'Search & Presence',
    engineColor: '#1A3BFF',
    tags: ['vectors', 'semantic'],
  },
  {
    id: 'espacio-latente',
    term: 'Espacio Latente',
    letter: 'E',
    definition: 'El espacio matemático comprimido donde un modelo codifica sus representaciones internas del mundo. Navegar el espacio latente de un modelo de difusión es explorar todas las imágenes que el modelo "puede imaginar".',
    tags: ['generative', 'representation'],
  },
  {
    id: 'few-shot',
    term: 'Few-Shot Prompting',
    letter: 'F',
    definition: 'Proporcionar ejemplos concretos dentro del prompt para que el modelo aprenda el patrón deseado sin re-entrenamiento. Tres ejemplos bien elegidos superan frecuentemente a un prompt explicativo extenso.',
    tags: ['prompting', 'in-context learning'],
  },
  {
    id: 'fine-tuning',
    term: 'Fine-Tuning',
    letter: 'F',
    definition: 'Ajustar los pesos de un modelo pre-entrenado con datos específicos de un dominio. No es reentrenar desde cero — es especializar. LoRA y QLoRA hacen esto viable en hardware modesto.',
    tags: ['training', 'specialization'],
  },
  {
    id: 'grafo-conocimiento',
    term: 'Grafo de Conocimiento',
    letter: 'G',
    definition: 'Estructura de datos que representa entidades y sus relaciones. Combinar grafos con LLMs reduce alucinaciones en dominios estructurados — el modelo razona sobre hechos explícitos, no solo sobre patrones estadísticos.',
    tags: ['knowledge', 'reasoning'],
  },
  {
    id: 'langgraph',
    term: 'LangGraph',
    letter: 'L',
    definition: 'Framework para construir agentes como grafos de estado. Permite ciclos, bifurcaciones y memoria persistente entre pasos. Nuestra base para el motor Adaptive Security.',
    relatedEngine: 'Adaptive Security',
    engineColor: '#FF2D2D',
    tags: ['agents', 'orchestration'],
  },
  {
    id: 'llm',
    term: 'LLM',
    letter: 'L',
    definition: 'Large Language Model. Un modelo entrenado sobre grandes corpus de texto para predecir tokens. La distinción relevante no es el tamaño — es la capacidad de razonamiento emergente que aparece en modelos suficientemente grandes.',
    tags: ['foundation', 'core'],
  },
  {
    id: 'multimodal',
    term: 'Multimodal',
    letter: 'M',
    definition: 'Un modelo que procesa y genera múltiples tipos de datos: texto, imagen, audio, video. GPT-4o y Gemini son multimodales. La frontera donde el lenguaje se vuelve percepción.',
    tags: ['vision', 'audio', 'future'],
  },
  {
    id: 'orquestacion',
    term: 'Orquestación',
    letter: 'O',
    definition: 'La capa que coordina múltiples agentes, servicios y llamadas a APIs en flujos complejos. n8n es nuestro orquestador: conecta LLMs, bases de datos, webhooks y notificaciones sin fricciones.',
    relatedEngine: 'Revenue Intelligence',
    engineColor: '#F5E642',
    tags: ['n8n', 'workflow', 'automation'],
  },
  {
    id: 'prompt',
    term: 'Prompt',
    letter: 'P',
    definition: 'La instrucción que define el comportamiento de un modelo. No es simplemente "lo que le dices al modelo" — es diseño de interfaz. Un prompt bien construido es la diferencia entre una herramienta útil y una ilusión de capacidad.',
    tags: ['design', 'core'],
  },
  {
    id: 'qdrant',
    term: 'Qdrant',
    letter: 'Q',
    definition: 'Base de datos vectorial que almacena embeddings y permite búsqueda semántica de alta velocidad. Nuestro sistema de memoria: conecta lo que los modelos necesitan recordar con lo que realmente existe en los datos.',
    relatedEngine: 'Search & Presence',
    engineColor: '#1A3BFF',
    tags: ['vector store', 'memory', 'search'],
  },
  {
    id: 'razonamiento',
    term: 'Razonamiento Emergente',
    letter: 'R',
    definition: 'Capacidades que no fueron explícitamente entrenadas pero emergen a cierta escala de parámetros. Chain-of-thought, aritmética compleja, analogía — aparecen sin ser programadas. Siguen siendo parcialmente no explicadas.',
    tags: ['emergent', 'scale'],
  },
  {
    id: 'temperatura',
    term: 'Temperatura',
    letter: 'T',
    definition: 'Parámetro que controla la aleatoriedad de las predicciones. Temperatura 0 = determinista, reproducible. Temperatura 1+ = creativo, impredecible. Para código: baja. Para poesía: alta. Para sistemas de producción: siempre auditar.',
    tags: ['inference', 'sampling'],
  },
  {
    id: 'vector-store',
    term: 'Vector Store',
    letter: 'V',
    definition: 'Base de datos especializada en almacenar y recuperar vectores de alta dimensión por similitud (no por coincidencia exacta). Qdrant, Chroma, Pinecone. La capa de memoria semántica de cualquier sistema RAG.',
    relatedEngine: 'Search & Presence',
    engineColor: '#1A3BFF',
    tags: ['memory', 'retrieval'],
  },
  {
    id: 'whisper',
    term: 'Whisper',
    letter: 'W',
    definition: 'Modelo de transcripción de audio de OpenAI, open source. Soporta 99 idiomas. Nuestro motor de audio corre Whisper localmente para indexar contenido hablado sin enviar audio a APIs externas.',
    relatedEngine: 'Whisper Voice',
    engineColor: '#F5E642',
    tags: ['audio', 'transcription', 'local'],
  },
  {
    id: 'zero-shot',
    term: 'Zero-Shot',
    letter: 'Z',
    definition: 'Pedir a un modelo que realice una tarea sin darle ejemplos previos. Funciona porque los modelos grandes generalizan desde su entrenamiento. La brecha entre zero-shot y few-shot mide qué tan bien el modelo entiende la intención.',
    tags: ['prompting', 'generalization'],
  },
];

export const letters = [...new Set(lexiconTerms.map(t => t.letter))].sort();
