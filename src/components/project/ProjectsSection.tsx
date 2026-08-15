import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { projectSummaries } from '../../data/projects'
import { StatusChip, Tags } from './ProjectMeta'
import { ProjectsCarousel } from './ProjectsCarousel'

/**
 * Projects section with two layouts (KAS-1):
 *  - grid view — the original bento: featured row, coursework cells, ghost strip
 *  - scroll view — one project at a time on a focus rail (ProjectsCarousel)
 * The choice persists to localStorage('projects-view').
 */

const VIEW_KEY = 'projects-view'
type ProjectsView = 'grid' | 'scroll'

function readStoredView(): ProjectsView {
  if (typeof window === 'undefined') return 'grid'
  return window.localStorage.getItem(VIEW_KEY) === 'scroll' ? 'scroll' : 'grid'
}

export function ProjectsSection() {
  const [view, setView] = useState<ProjectsView>(readStoredView)

  const selectView = (next: ProjectsView) => {
    setView(next)
    try {
      window.localStorage.setItem(VIEW_KEY, next)
    } catch {
      /* storage unavailable (private mode) — the toggle still works for the session */
    }
  }

  const featured = projectSummaries.find((p) => p.slug === 'f1')
  const upcoming = projectSummaries.filter(
    (p) => p.slug !== 'f1' && p.status.toLowerCase().includes('coming'),
  )
  const coursework = projectSummaries.filter(
    (p) => p.slug !== 'f1' && !p.status.toLowerCase().includes('coming'),
  )
  // Scroll view order mirrors the grid's numbering: featured, coursework, upcoming.
  const ordered = [...(featured ? [featured] : []), ...coursework, ...upcoming]

  const toggleButton = (target: ProjectsView, label: string) => (
    <button
      type="button"
      aria-pressed={view === target}
      onClick={() => selectView(target)}
      className={`rounded px-3 py-1.5 transition ${
        view === target
          ? 'bg-accent-bright font-semibold text-accent-contrast'
          : 'text-ink-faint hover:text-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-y border-line bg-surface-2/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading kicker="01 — Selected work" title="Projects">
              <p>
                A portfolio of coursework and research. Click on any project for the full
                architecture details, screenshots, and documentation. See Contact for more
                information, including links to repositories and other relevant information.
              </p>
            </SectionHeading>
            <div
              role="group"
              aria-label="Projects layout"
              className="inline-flex shrink-0 self-start rounded-md border border-line bg-surface p-1 font-mono text-[0.68rem] uppercase tracking-wider sm:self-auto"
            >
              {toggleButton('grid', 'Grid view')}
              {toggleButton('scroll', 'Scroll view')}
            </div>
          </div>
        </Reveal>

        {view === 'scroll' ? (
          <ProjectsCarousel projects={ordered} />
        ) : (
          <>
            {/* Featured — F1 */}
            {featured && (
              <Reveal>
                <Link
                  to={featured.path}
                  className="group mt-12 grid gap-6 rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_22px_50px_-28px_rgb(var(--signal)/0.55)] sm:p-8 lg:grid-cols-2 lg:items-center"
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-accent">
                        01
                      </span>
                      <StatusChip status={featured.status} />
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-data">
                        Featured
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                      {featured.description}
                    </p>
                    <div className="mt-4">
                      <Tags tags={featured.tags} />
                    </div>
                    <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                      View project details
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-line bg-white p-2">
                    <img
                      src="/projects/f1/commentator.png"
                      alt="The F1 AI commentator delivering a history-grounded line"
                      width={980}
                      height={340}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Coursework cells */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coursework.map((project, i) => (
                <Reveal key={project.slug} delay={i * 70}>
                  <Link
                    to={project.path}
                    className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_22px_50px_-28px_rgb(var(--signal)/0.55)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-accent">
                        {String(i + 2).padStart(2, '0')}
                      </span>
                      <StatusChip status={project.status} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-soft">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <Tags tags={project.tags} />
                    </div>
                    <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                      View project details
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* In-development ghost strip */}
            {upcoming.map((project) => (
              <Reveal key={project.slug}>
                <article className="mt-5 flex flex-col gap-4 rounded-2xl border border-dashed border-line-strong/70 bg-surface/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4 sm:items-center">
                    <span className="font-mono text-sm text-ink-faint">
                      {String(projectSummaries.length).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 pl-9 sm:pl-0">
                    <Tags tags={project.tags} />
                    <StatusChip status={project.status} />
                  </div>
                </article>
              </Reveal>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
