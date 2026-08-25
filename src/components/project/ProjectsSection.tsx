import { Link } from 'react-router-dom'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { caseStudies, systemsLog } from '../../data/projects'
import { StatusLine, TagLine } from './ProjectMeta'

/**
 * Tiered project architecture (journal overhaul):
 *  - Tier 1 — flagship case studies: wide asymmetric rows alternating
 *    narrative / visual, with architecture notes and quantified outcomes.
 *  - Tier 2 — foundational systems log: dense monospace registry table.
 */

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-y border-line bg-surface-2/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker="01 — Selected work" title="Case Studies &amp; Systems Log">
            <p>
              Flagship systems documented as engineering case studies — architecture,
              data flow, and measured outcomes. Foundational work is logged in the
              registry below.
            </p>
          </SectionHeading>
        </Reveal>

        {/* -------------------------------------------------------------- *
         * Tier 1 — flagship case studies
         * -------------------------------------------------------------- */}
        <div className="mt-12 space-y-6">
          {caseStudies.map((study, i) => {
            const flip = i % 2 === 1
            const body = (
              <>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-line-strong">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <StatusLine status={study.status} />
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight tracking-tight text-ink transition-colors group-hover:text-accent sm:leading-snug">
                  {study.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                  {study.summary}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                      Architecture
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {study.architecture.map((line) => (
                        <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-accent">—</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                      Outcomes
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {study.outcomes.map((line) => (
                        <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-data">→</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <TagLine tags={study.stack} />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                    Read the case study
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </>
            )

            return (
              <Reveal key={study.slug}>
                <Link
                  to={study.path}
                  className={`group grid gap-8 border border-line bg-surface p-6 transition duration-300 hover:border-accent/50 hover:shadow-[0_18px_44px_-30px_rgb(0_0_0/0.45)] sm:p-8 lg:grid-cols-12 lg:items-start ${
                    study.image ? 'lg:gap-10' : ''
                  }`}
                >
                  {/* Asymmetric split — visual column only when an artifact exists */}
                  {study.image && (
                    <div
                      className={`order-last lg:order-first lg:col-span-5 ${
                        flip ? 'lg:order-last' : ''
                      }`}
                    >
                      <div className="overflow-hidden border border-line bg-white p-2">
                        <img
                          src={study.image.src}
                          alt={study.image.alt}
                          width={980}
                          height={340}
                          loading="lazy"
                          decoding="async"
                          className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  )}
                  <div className={study.image ? 'lg:col-span-7' : 'lg:col-span-12'}>
                    {body}
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        {/* -------------------------------------------------------------- *
         * Tier 2 — foundational systems log (monospace registry)
         * -------------------------------------------------------------- */}
        <Reveal>
          <div className="mt-16">
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-line-strong pb-2">
              <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                Foundational Systems Log
              </h3>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                Registry · 03 entries
              </p>
            </div>

            {/* md+: true table; mobile: stacked definition rows */}
            <table className="mt-4 hidden w-full border-collapse text-left md:table">
              <thead>
                <tr className="border-b border-line">
                  {['System', 'Domain / Architecture', 'Core Stack', 'Artifact'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-2 pr-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systemsLog.map((entry) => (
                  <tr
                    key={entry.slug}
                    className="border-b border-line align-top transition-colors hover:bg-surface"
                  >
                    <td className="py-3 pr-6">
                      <Link
                        to={entry.artifact.path}
                        className="font-mono text-[0.8rem] font-semibold text-ink ul-grow hover:text-accent"
                      >
                        {entry.system}
                      </Link>
                    </td>
                    <td className="py-3 pr-6 text-sm leading-relaxed text-ink-soft">
                      {entry.domain}
                    </td>
                    <td className="py-3 pr-6 font-mono text-[0.72rem] text-ink-faint">
                      {entry.coreStack}
                    </td>
                    <td className="py-3 font-mono text-[0.72rem]">
                      <Link to={entry.artifact.path} className="text-accent hover:text-accent-strong">
                        {entry.artifact.label}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="mt-2 md:hidden">
              {systemsLog.map((entry) => (
                <div key={entry.slug} className="border-b border-line py-4">
                  <dt>
                    <Link
                      to={entry.artifact.path}
                      className="font-mono text-[0.85rem] font-semibold text-ink"
                    >
                      {entry.system}
                    </Link>
                  </dt>
                  <dd className="mt-1.5 space-y-1.5 pl-4">
                    <p className="text-sm leading-relaxed text-ink-soft">{entry.domain}</p>
                    <p className="font-mono text-[0.7rem] text-ink-faint">{entry.coreStack}</p>
                    <p className="font-mono text-[0.72rem]">
                      <Link to={entry.artifact.path} className="text-accent hover:text-accent-strong">
                        {entry.artifact.label}
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
