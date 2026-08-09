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
    slug: 'hotworx',
    title: 'HOTWORX Churn Control Center',
    description:
      'End-to-end production ML pipeline predicting member churn across fitness studios. XGBoost with isotonic calibration at AUC 0.963, DuckDB SQL pipeline, Docker, Terraform/AWS ECS, and a Streamlit control center with AES-256 PII encryption.',
    status: 'Completed',
    tags: ['Python', 'XGBoost', 'DuckDB', 'Terraform', 'Streamlit'],
    path: '/projects/hotworx',
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
    title: 'CHIP — Interview Simulator',
    description:
      'A rule-based technical interview simulator running live in the browser. Regex topic triggers, Eliza-style reflection, and a real-time engine debug panel — originally written in Python, ported to TypeScript.',
    status: 'Live',
    tags: ['TypeScript', 'React', 'NLP', 'Eliza Engine'],
    path: '/projects/chip',
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
]
