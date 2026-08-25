import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectsSection } from '../components/project/ProjectsSection'
import { GITHUB_URL, LINKEDIN_URL } from '../constants/links'
import { ExternalLink } from '../components/ExternalLink'
import resumeUrl from '../assets/Resume26.pdf'

const heroStats: { label: string; value: string; data?: boolean }[] = [
  { label: 'FOCUS', value: 'Evolutionary computation · genetic AI', data: true },
  { label: 'SYSTEMS', value: 'Real-time distributed telemetry' },
  { label: 'EDU', value: 'B.S. CS · AI/ML — University of New Orleans' },
  { label: 'BASE', value: 'New Orleans · Houma, Louisiana' },
]

export function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------------- *
       * Hero — engineering thesis first, no introduction boilerplate
       * ----------------------------------------------------------------- */}
      <section
        id="home"
        className="scroll-mt-24 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-28"
      >
        <div className="max-w-4xl">
          <p
            className="rise kicker flex items-center gap-2.5 text-accent"
            style={{ animationDelay: '0ms' }}
          >
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-accent-bright" />
            Kaspian Thomas — Systems &amp; AI Engineering
          </p>

          <h1
            className="rise mt-8 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-ink"
            style={{ animationDelay: '90ms' }}
          >
            Evolutionary computation, genetic AI systems, and real-time
            distributed telemetry — engineered end to end, measured where it
            counts.
          </h1>

          <p
            className="rise mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: '200ms' }}
          >
            I build systems that have to survive contact with live data:
            telemetry pipelines that turn raw event firehoses into decisions,
            learning systems grounded in verifiable history, and the
            concurrent infrastructure underneath them. The work below is
            documented the way it was built — architecture, trade-offs, and
            outcomes.
          </p>

          <dl
            className="rise mt-10 grid gap-x-10 border-y border-line py-5 sm:grid-cols-2"
            style={{ animationDelay: '300ms' }}
          >
            {heroStats.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0 sm:border-b-0"
              >
                <dt className="font-mono text-[0.62rem] tracking-[0.22em] text-ink-faint">
                  {row.label}
                </dt>
                <dd
                  className={`text-right font-mono text-xs ${
                    row.data ? 'text-data' : 'text-ink-soft'
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ProjectsSection />

      {/* ----------------------------------------------------------------- *
       * Colophon / Notes Dispatch — restrained, at the base of the page
       * ----------------------------------------------------------------- */}
      <section id="colophon" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading kicker="03 — Colophon" title="Notes Dispatch">
              <p>
                The operator behind the systems.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            {/* Notes column */}
            <Reveal className="lg:col-span-7">
              <div className="space-y-5 border-l-2 border-line pl-6 leading-relaxed text-ink-soft">
                <p>
                  From <strong>Houma, Louisiana</strong> — bayou roots, New Orleans
                  base. Undergraduate in computer science (AI/ML) at the University
                  of New Orleans; the research interests above are not a phase, they
                  are the throughline.
                </p>
                <p>
                  Off the keyboard: head coach for competitive youth soccer. Teaching
                  kids to read a field two passes ahead turns out to be the same skill
                  as designing for latency — position before the ball arrives.
                </p>
                <p>
                  Resident quality-assurance engineer: <strong>Casper</strong>, a
                  rescued white pit mix whose primary contribution to these systems
                  is enforced walk breaks.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line-strong px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent"
                >
                  Resume — PDF ↓
                </a>
                <ExternalLink
                  href={GITHUB_URL}
                  className="font-mono text-xs uppercase tracking-wider text-ink-faint transition hover:text-accent"
                >
                  github/NightsTTV →
                </ExternalLink>
              </div>
            </Reveal>

            {/* Contact register */}
            <Reveal className="lg:col-span-5" delay={80}>
              <div className="border border-line bg-surface p-6 sm:p-8">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                  Open a channel
                </p>
                <ul className="mt-5 divide-y divide-line">
                  {[
                    { label: 'Email — university', value: 'klthoma8@uno.edu', href: 'mailto:klthoma8@uno.edu' },
                    { label: 'Email — personal', value: 'kaspian2005@gmail.com', href: 'mailto:kaspian2005@gmail.com' },
                    { label: 'Phone', value: '985-772-1721', href: 'tel:+19857721721' },
                    { label: 'LinkedIn', value: 'in/kaspian-thomas', href: LINKEDIN_URL, external: true },
                    { label: 'GitHub', value: '@NightsTTV', href: GITHUB_URL, external: true },
                  ].map((row) => (
                    <li key={row.label}>
                      {row.external ? (
                        <ExternalLink
                          href={row.href}
                          className="group flex items-baseline justify-between gap-4 py-3"
                        >
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                            {row.label}
                          </span>
                          <span className="font-mono text-sm text-ink-soft transition group-hover:text-accent">
                            {row.value}
                          </span>
                        </ExternalLink>
                      ) : (
                        <a href={row.href} className="group flex items-baseline justify-between gap-4 py-3">
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                            {row.label}
                          </span>
                          <span className="font-mono text-sm text-ink-soft transition group-hover:text-accent">
                            {row.value}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-[0.68rem] leading-relaxed text-ink-faint">
                  Recruiting, research collab, or a hard problem worth arguing about —
                  all three reach the same inbox.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
