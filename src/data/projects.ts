export type ProjectSummary = {
  slug: string
  title: string
  description: string
  status: string
  tags: string[]
  path: string
}

export const projectSummaries: ProjectSummary[] = [
  {
    slug: 'f1',
    title: 'F1 AI Telemetry Commentary',
    description:
      'Real-time F1 telemetry turned into history-grounded AI commentary — a trigger engine and SQLite-backed RAG pipeline feed IBM Granite, streamed to a live React dashboard.',
    status: 'Live',
    tags: ['Python', 'FastAPI', 'RAG', 'React'],
    path: '/projects/f1',
  },
  {
    slug: 'uno',
    title: 'UNO Card Game',
    description:
      'Multiplayer UNO with Java sockets, thread-safe game rooms, and a Swing client for 2–4 players.',
    status: 'Completed',
    tags: ['Java', 'Sockets', 'Swing', 'Multithreading'],
    path: '/projects/uno',
  },
  {
    slug: 'chatty',
    title: 'Multi-User Chat Application',
    description:
      'Real-time TCP chat server with concurrent clients and a themed Java Swing GUI.',
    status: 'Completed',
    tags: ['Java', 'Swing', 'TCP', 'ConcurrentHashMap'],
    path: '/projects/chatty',
  },
  {
    slug: 'biobert',
    title: 'BioBERT — Premier League Injury Severity',
    description:
      'Fine-tuning BioBERT to classify soccer injury reports into five severity tiers.',
    status: 'Completed',
    tags: ['Python', 'BioBERT', 'PyTorch', 'NLP'],
    path: '/projects/biobert',
  },
  {
    slug: 'chip',
    title: 'CHIP',
    description:
      'An Eliza influenced conversational chatbot exploring pattern matching dialogue and personality.',
    status: 'Live',
    tags: ['NLP', 'Chatbot'],
    path: '/projects/chip',
  },
]
