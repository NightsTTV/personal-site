import {
  DocLinks,
  FeatureList,
  ProjectPageLayout,
  ProjectSection,
  TechTable,
} from '../components/project/ProjectPageLayout';
import { ChipInterviewDemo } from '../components/chip/ChipInterviewDemo';

const codeBlock =
  'overflow-x-auto rounded-xl border border-line bg-[#0c0f0a] p-4 text-sm leading-relaxed text-[#cfe6a4] font-mono';

export function ChipProjectPage() {
  return (
    <ProjectPageLayout
      title="CHIP — Computerized Hiring Interview Program"
      subtitle="An Eliza-inspired technical interview simulator that assesses programming skills in Java or Python. By blending deterministic regular expressions with grammatical reflection rules, CHIP probes candidate depth and adapts to conversational inputs entirely in the browser."
      tags={['Python', 'TypeScript', 'React', 'Regex', 'NLP', 'Eliza Engine']}
      heroImage={{
        src: '/CHIP.png',
        alt: 'Sr. Professor Dev CHIP mascot representing the interview bot',
      }}
    >
      <ProjectSection title="Overview">
        <p>
          Coding interviews can be stressful, but practicing with an interactive bot shouldn&apos;t be.
          CHIP (Computerized Hiring Interview Program) is a custom simulation of a technical phone-screen
          or initial interview. Originally built in Python, this web-based interactive demo showcases
          the core logic running live in your browser.
        </p>
        <p>
          Rather than relying on modern heavyweight LLMs that are expensive to run and prone to hallucinating
          grading standards, CHIP uses classic computer science techniques. It employs regular expression pattern-matching
          to detect topics (like strings, concurrency, memory, or casting) and prompts the candidate.
          When a candidate responds with an unexpected topic, CHIP utilizes an Eliza-style reflection algorithm to
          mirror their response back grammatically, or transitions to another technical question.
        </p>
      </ProjectSection>

      <ProjectSection title="Live Demo">
        <p>
          Test your skills with Sr. Professor Dev CHIP. Click <strong>Launch Demo</strong> below to start
          your practice interview. Choose Python or Java, tell CHIP about your experience, and respond
          to its questions. Use the right-hand panel to see how the engine processes your messages
          and evaluates regex triggers in real time.
        </p>
        <div className="mt-6">
          <ChipInterviewDemo />
        </div>
      </ProjectSection>

      <ProjectSection title="How It Works">
        <p>
          CHIP behaves as a rule-based state machine that progresses through stages before locking into
          an active conversation loop:
        </p>
        <pre className={codeBlock}>
{`[Launch] ──► 1. Intro ──► 2. Collect Name ──► 3. Skill Rating (1-10)
                                                    │
  ┌─────────────────────────────────────────────────┘
  ▼
4. Language Pick (Java/Python) ──► 5. Free-form Interview (Loop) ──► [Exit]`}
        </pre>

        <p>
          During the interview loop, CHIP evaluates the user&apos;s raw text through three distinct evaluation tiers:
        </p>
        
        <TechTable
          rows={[
            {
              label: '1. Topic Triggers (Regex)',
              value: 'A dictionary of regular expressions matching specific concepts (e.g., string mutability, queue FIFO behavior, inheritance). If matched, it selects a random question from that topic.'
            },
            {
              label: '2. Eliza Reflections',
              value: 'If no topic matches, CHIP has a 50% chance of reflecting the user\'s statements (e.g. converting "I am fixing my code" to "you are refactoring your implementation") to ask a follow-up question.'
            },
            {
              label: '3. Topic Transition Pool',
              value: 'The remaining 50% fallback picks a conversational bridge (e.g. "Based on what you\'ve said...") and introduces a random question from the active language\'s question bank.'
            }
          ]}
        />

        <h3 className="text-md font-semibold text-ink mt-6 mb-2">The Reflection Engine</h3>
        <p>
          The grammatical reflection swaps pronouns and terms to build natural-sounding sentences. In keeping
          with Eliza&apos;s legacy, it sorts reflection rules from longest to shortest to avoid replacing substrings
          too early (e.g., replacing <code>&quot;my code&quot;</code> before <code>&quot;my&quot;</code>).
        </p>
        <pre className={codeBlock}>
{`Input:  "I am doing a challenge on my group project."
Reflect: "you are implementing a technical hurdle on your role in the group project."
Output: "When you say 'you are implementing a technical hurdle on your role in the group project.', 
         what part mattered most to you?"`}
        </pre>
      </ProjectSection>

      <ProjectSection title="Key Features">
        <FeatureList
          items={[
            'Stateful interview workflow managing name collection, self-rating, and topic settings',
            'Full dual-language question catalog covering Java (JVM memory, casts, extends) and Python (indentation, list vs set, duck typing)',
            'Classic Eliza-style pronoun translation mapping with sorted, priority-based substitutions',
            'Robust regex-based keyword detection with support for pluralization and word boundaries',
            'Interactive debug screen exposing state variables, parsed scale rating, last triggered pattern, and active fallback path',
            'Entirely client-side execution with zero latency and high privacy',
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Architecture & Tech Stack">
        <p>
          CHIP was originally written in Python utilizing standard regular expressions (<code>re</code>) and random lists.
          The Web version ports the exact regex engine and logic structures to a TypeScript state-machine, preserving
          the conversational quirks and responses of the Python terminal command-line program.
        </p>
        <TechTable
          rows={[
            { label: 'Language', value: 'TypeScript, Python' },
            { label: 'UI Library', value: 'React (Hooks & functional state management)' },
            { label: 'NLP / Parser', value: 'JavaScript RegExp (capturing groups & word boundaries)' },
            { label: 'Styling', value: 'Tailwind CSS, Phosphor Lab variables' },
            { label: 'Routing', value: 'React Router DOM' },
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Documentation & Source">
        <DocLinks
          links={[
            {
              label: 'Python Source (chip.py)',
              href: 'https://github.com/NightsTTV/kast/blob/main/Python/CHIP/chip.py',
              external: true,
            },
            {
              label: 'TypeScript Implementation (chipInterviewEngine.ts)',
              href: 'https://github.com/NightsTTV/kast/blob/main/my-personal-site/src/components/chip/chipInterviewEngine.ts',
              external: true,
            },
          ]}
        />
        <p className="text-sm text-ink-faint">
          CHIP was built as a demonstration of classic natural language processing (NLP) and rule-based chatbots.
          The modern web-facing port is wired directly to the project page route to allow visitors to interact
          with the same script running behind the terminal version.
        </p>
      </ProjectSection>
    </ProjectPageLayout>
  );
}
