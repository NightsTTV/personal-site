import {
  DocLinks,
  FeatureList,
  ProjectPageLayout,
  ProjectSection,
  TechTable,
} from '../components/project/ProjectPageLayout'

const codeBlock =
  'overflow-x-auto rounded-xl border border-line bg-[#0c0f0a] p-4 text-sm leading-relaxed text-[#cfe6a4]'

export function HotworxProjectPage() {
  return (
    <ProjectPageLayout
      title="HOTWORX Churn Control Center"
      subtitle="An end-to-end machine learning system that predicts member churn for fitness studios, explains why each member is at risk, and automatically routes personalized interventions — wrapped in a production-grade Streamlit control center."
      tags={[
        'Python',
        'XGBoost',
        'DuckDB',
        'Docker',
        'Terraform',
        'AWS ECS',
        'Streamlit',
        'Plotly',
      ]}
    >
      <ProjectSection title="Overview">
        <p>
          Fitness studios live and die by retention: a member who quietly stops showing up is
          far cheaper to win back this week than next quarter. This project builds the full
          prediction-and-intervention loop — from raw membership and session data all the way
          to a staff-facing action queue — so studios can act on churn risk <em>before</em> it
          becomes churn.
        </p>
        <p>
          An <strong className="text-ink">XGBoost classifier with isotonic calibration</strong>{' '}
          scores every member daily (AUC 0.963 on the benchmark dataset), a{' '}
          <strong className="text-ink">DuckDB SQL pipeline</strong> engineers 29 rolling
          behavioral features, and a rules engine maps risk tiers to concrete interventions —
          email, SMS, push, or a staff call task. Everything is surfaced in a dark-themed{' '}
          <strong className="text-ink">Streamlit control center</strong> with row-level
          security, so each GM sees only their own studio.
        </p>
      </ProjectSection>

      <ProjectSection title="How It Works">
        <p>
          The system is a four-layer pipeline. Each layer is a clean seam: the data layer is
          designed so real studio data sources can be swapped in without rewriting any business
          logic.
        </p>
        <pre className={codeBlock}>
{`Data layer ──────► Feature engineering ──► ML scoring ──────────► Intervention router
 7 tables, 5K        DuckDB SQL models       XGBoost + isotonic     rules engine, A/B
 members, 10         staging → marts         calibration, daily     holdout, rate limits
 studios             29 rolling features     risk + explanations    → Streamlit dashboard`}
        </pre>
        <p>
          <strong className="text-ink">Explainable risk, not just scores.</strong> Every
          at-risk member gets human-readable reasons alongside the number — billing failures,
          session drop-off, AI Coach cancel/freeze inquiries — so staff act on a diagnosis,
          not a black box.
        </p>
        <TechTable
          rows={[
            { label: 'Top signal', value: 'Billing failure indicators' },
            { label: 'Engagement', value: 'Days since last session; 30-day rolling app logins' },
            { label: 'Intent', value: 'AI Coach cancel/freeze inquiries' },
            { label: 'Outreach', value: 'Declining email open rate' },
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Model Performance">
        <p>
          The classifier is calibrated with isotonic regression so the output scores are real
          probabilities, not just rankings — which is what lets the intervention rules use
          honest risk thresholds.
        </p>
        <TechTable
          rows={[
            { label: 'AUC-ROC', value: '0.963 (target > 0.80)' },
            { label: 'Precision @ top-10%', value: '73.9% (target > 50%)' },
            { label: 'Calibration', value: 'Isotonic — scores ≈ true probabilities' },
            { label: 'A/B measurement', value: 'Deterministic 10% holdout group with lift charts' },
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Key Features">
        <FeatureList
          items={[
            'Daily churn risk scores with human-readable explanations per member',
            'Automated interventions: rules engine maps risk tiers → email, SMS, push, or staff call tasks',
            'Built-in A/B testing: deterministic 10% control holdout with lift measurement',
            'Row-level security: GMs see only their own studio; admins see everything',
            'PII encrypted at rest with AES-256 (Fernet); decrypted in-memory only',
            'Kill switch + rate limits: global 50/hr send cap and 7-day per-member cooldown',
            'Password auth with PBKDF2-HMAC-SHA256 (240k iterations, per-user salt)',
            'Studio overview, member diagnostics, and intervention queue dashboard views',
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Architecture & Technologies">
        <p>
          Feature engineering follows a dbt-style layout — staging models normalize raw tables,
          an intermediate model resolves cross-system identity, and a single mart produces the
          daily feature wide table. DuckDB executes the whole graph locally, and a data-adapter
          seam toggles between local parquet and a production SQL source.
        </p>
        <TechTable
          rows={[
            { label: 'ML', value: 'XGBoost + isotonic calibration, daily batch scoring' },
            { label: 'Data', value: 'DuckDB SQL pipeline: staging → intermediate → marts (29 daily features)' },
            { label: 'Dashboard', value: 'Streamlit control center, dark theme, Plotly charts, row-level security' },
            { label: 'Security', value: 'AES-256 Fernet PII encryption, PBKDF2 password hashing, SECURITY.md threat model' },
            { label: 'Deployment', value: 'Multi-stage Docker build, docker-compose ETL scheduler, Terraform for AWS ECS / RDS / Secrets Manager' },
          ]}
        />
        <pre className={codeBlock}>
{`hotworx-churn-demo/
  dashboard.py                Streamlit control center (main entry point)
  auth.py                     PBKDF2 password hashing & account loader
  run_pipeline.py             DuckDB feature engineering orchestrator
  score_members.py            ML scoring engine with risk explanations
  interventions.py            Rules engine, A/B holdout, rate limits
  secure_data.py              AES-256 Fernet encryption for PII at rest
  identity_resolver.py        Multi-source fuzzy identity matching
  data_adapters.py            Unified connector (parquet ↔ SQL toggle)
  models/                     staging / intermediate / marts SQL models
  deploy/                     Dockerfile, docker-compose, Terraform (ECS, RDS)`}
        </pre>
      </ProjectSection>

      <ProjectSection title="How to Run">
        <p>
          The app ships with pre-built data, so it runs immediately after install. To rebuild
          the full pipeline from scratch, run the five stages in order.
        </p>
        <pre className={codeBlock}>
{`# Quick start
git clone https://github.com/NightsTTV/hotworx-churn-demo.git
cd hotworx-churn-demo && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
streamlit run dashboard.py

# Full rebuild: data → features → scores → interventions → dashboard
python generate_synthetic_data.py
python run_pipeline.py
python score_members.py
python interventions.py
streamlit run dashboard.py

# Docker: dashboard + nightly ETL scheduler on :8501
cd deploy && docker-compose up --build -d`}
        </pre>
      </ProjectSection>

      <ProjectSection title="Documentation & Source">
        <DocLinks
          links={[
            {
              label: 'Source on GitHub',
              href: 'https://github.com/NightsTTV/hotworx-churn-demo',
              external: true,
            },
          ]}
        />
        <p className="text-sm text-ink-faint">
          Source: hotworx-churn-demo — DuckDB feature pipeline, XGBoost scoring with isotonic
          calibration, intervention rules engine, and Streamlit control center. Includes a
          SECURITY.md threat model and an operator on-call runbook.
        </p>
      </ProjectSection>
    </ProjectPageLayout>
  )
}
