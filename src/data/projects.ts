/**
 * Tiered project architecture:
 *  - Tier 1 `caseStudies`: flagship systems, rendered as wide asymmetric
 *    case-study rows (architecture, data flow, quantified outcomes).
 *  - Tier 2 `systemsLog`: foundational systems registry, rendered as a dense
 *    monospace table (System / Domain / Core Stack / Artifact).
 */

export type CaseStudy = {
  slug: string
  /** Outcome-first headline — system behavior, not the language it's written in. */
  title: string
  /** One-line thesis: what the system does and how. */
  summary: string
  status: string
  /** Bracket-form stack line, e.g. `[ Python / FastAPI / RAG ]` */
  stack: string[]
  /** Architecture / data-flow bullets shown on the case-study row. */
  architecture: string[]
  /** Quantified or concrete outcomes. */
  outcomes: string[]
  image?: { src: string; alt: string }
  path: string
}

export type RegistryEntry = {
  slug: string
  system: string
  domain: string
  coreStack: string
  artifact: { label: string; path: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'f1',
    title: 'Real-Time Telemetry Pipeline & History-Grounded Commentary Engine',
    summary:
      'Ingests the live Formula 1 timing firehose, detects narratively significant race events, and generates broadcast-style commentary grounded in each driver\'s real history at the circuit via a SQLite-backed RAG pipeline — streamed to a live dashboard.',
    status: 'LIVE',
    stack: ['Python', 'FastAPI', 'RAG', 'React'],
    architecture: [
      'Event trigger engine discriminates signal from telemetry noise before any generation cost is spent',
      'Per-driver historical context retrieved from SQLite and injected as grounding for the LLM',
      'IBM Granite inference behind a FastAPI service; SSE stream into a React dashboard',
    ],
    outcomes: [
      'Live end-to-end latency across ingestion → retrieval → generation → render',
      'Commentary grounded in verifiable circuit history, not free hallucination',
      'Runs against real race sessions, not canned replays',
    ],
    image: { src: '/projects/f1/commentator.png', alt: 'The F1 commentary engine delivering a history-grounded line during a live session' },
    path: '/projects/f1',
  },
  {
    slug: 'biobert',
    title: 'Clinical-Text Injury Triage — Five-Tier Severity Classification',
    summary:
      'Fine-tunes BioBERT on Premier League injury reports to classify incident narratives into five severity tiers — a domain-adapted transformer that turns unstructured clinical prose into structured triage signals.',
    status: 'COMPLETED',
    stack: ['Python', 'BioBERT', 'PyTorch', 'NLP'],
    architecture: [
      'Domain-specific pretraining weights (BioBERT) fine-tuned on sports-medicine injury narratives',
      'Five-class severity head over pooled [CLS] representations with class-imbalance handling',
      'Evaluation across precision/recall per tier rather than aggregate accuracy alone',
    ],
    outcomes: [
      'Severity tiers usable downstream for squad-risk and availability modeling',
      'Demonstrates why general-purpose encoders underperform on clinical shorthand',
      'Full presentation deck and methodology published alongside the code',
    ],
    path: '/projects/biobert',
  },
  {
    slug: 'hotworx',
    title: 'Production Churn-Prediction Pipeline & Studio Control Center',
    summary:
      'End-to-end ML system predicting member churn across fitness studios: calibrated XGBoost at AUC 0.963 behind a DuckDB SQL pipeline, deployed on AWS ECS with Terraform, surfaced through an operations control center with AES-256 PII encryption.',
    status: 'COMPLETED',
    stack: ['Python', 'XGBoost', 'DuckDB', 'Terraform', 'AWS'],
    architecture: [
      'Isotonic calibration so predicted churn probabilities are operationally trustworthy, not just ranked',
      'DuckDB analytical SQL layer between raw member events and feature matrices',
      'Terraform-provisioned ECS deployment; PII encrypted at rest with AES-256',
    ],
    outcomes: [
      'AUC 0.963 held out across studio populations',
      'Deployed infrastructure — not a notebook: containerized, provisioned, monitored',
      'Streamlit control center turns scores into actionable studio interventions',
    ],
    path: '/projects/hotworx',
  },
]

export const systemsLog: RegistryEntry[] = [
  {
    slug: 'uno',
    system: 'UNO Game Server',
    domain: 'Concurrent socket architecture — thread-safe game rooms, protocol state machine',
    coreStack: 'Java · Sockets · Multithreading',
    artifact: { label: '/projects/uno', path: '/projects/uno' },
  },
  {
    slug: 'chatty',
    system: 'TCP Chat Service',
    domain: 'Real-time multi-user messaging — concurrent clients, shared-state coordination',
    coreStack: 'Java · TCP · ConcurrentHashMap',
    artifact: { label: '/projects/chatty', path: '/projects/chatty' },
  },
  {
    slug: 'chip',
    system: 'CHIP Interview Engine',
    domain: 'Rule-based dialogue — pattern-triggered topic routing, Eliza-style reflection',
    coreStack: 'TypeScript · React · Regex Engine',
    artifact: { label: 'live demo → /projects/chip', path: '/projects/chip' },
  },
]

/** Flat list of everything navigable — command palette, hero counters. */
export const projectSummaries = [
  ...caseStudies.map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.summary,
    status: c.status,
    tags: c.stack,
    path: c.path,
  })),
  ...systemsLog.map((r) => ({
    slug: r.slug,
    title: r.system,
    description: r.domain,
    status: 'COMPLETED',
    tags: r.coreStack.split(' · '),
    path: r.artifact.path,
  })),
]
