import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import type { ProjectSummary } from '../../data/projects'
import { StatusChip, Tags } from './ProjectMeta'

/**
 * Scroll view (KAS-1): a focus rail showing one project at a time. The
 * centered card is in focus at full size; its neighbors peek from the sides
 * at 40% opacity. Arrows (or Left/Right keys) slide the rail; the order
 * wraps around infinitely.
 */

/** Signed circular distance from the focused index (…-1, 0, 1…). */
function railOffset(index: number, focus: number, count: number) {
  const half = Math.floor(count / 2)
  return ((index - focus + count + half) % count) - half
}

function CardBody({ project, order }: { project: ProjectSummary; order: number }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-sm text-ink-faint">
          {String(order + 1).padStart(2, '0')}
        </span>
        <StatusChip status={project.status} />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-3 line-clamp-4 flex-1 text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
        {project.description}
      </p>
      <div className="mt-5">
        <Tags tags={project.tags} />
      </div>
    </>
  )
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${direction === 'left' ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function ProjectsCarousel({ projects }: { projects: ProjectSummary[] }) {
  const [focus, setFocus] = useState(0)
  const count = projects.length
  const current = projects[focus]

  const step = (dir: 1 | -1) => setFocus((f) => (f + dir + count) % count)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  if (count === 0) return null

  const arrowClass =
    'absolute top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgb(var(--signal)/0.35)]'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects, one at a time"
      onKeyDown={onKeyDown}
    >
      {/* Focus rail */}
      <div className="relative mt-12 h-[26rem] overflow-hidden sm:h-96">
        {projects.map((project, i) => {
          const offset = railOffset(i, focus, count)
          const centered = offset === 0
          const hidden = Math.abs(offset) > 1
          return (
            <div
              key={project.slug}
              aria-hidden={!centered}
              className="rail-card absolute left-1/2 top-1/2 w-[min(100%-5.5rem,26rem)] sm:w-[26rem]"
              style={{
                transform: `translate(calc(-50% + ${offset * 106}%), -50%) scale(${centered ? 1 : 0.82})`,
                opacity: hidden ? 0 : centered ? 1 : 0.4,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: hidden ? 'none' : undefined,
              }}
            >
              {centered ? (
                <Link
                  to={project.path}
                  className="group relative flex h-[22rem] flex-col overflow-hidden rounded-2xl border border-accent/50 bg-surface p-6 shadow-[0_22px_50px_-28px_rgb(var(--signal)/0.55)] transition duration-300 hover:-translate-y-1 sm:h-80 sm:p-7"
                >
                  <CardBody project={project} order={i} />
                  <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                    View project details
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                  {/* corner focus brackets — this card is "in focus" */}
                  <span aria-hidden="true" className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-accent" />
                  <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-accent" />
                  <span aria-hidden="true" className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-accent" />
                  <span aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-accent" />
                </Link>
              ) : (
                /* Side cards open their page too (KAS-1 AC) — arrows slide the rail. */
                <Link
                  to={project.path}
                  tabIndex={-1}
                  className="flex h-[22rem] w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 text-left sm:h-80 sm:p-7"
                >
                  <CardBody project={project} order={i} />
                </Link>
              )}
            </div>
          )
        })}

        <button
          type="button"
          aria-label="Previous project"
          onClick={() => step(-1)}
          className={`${arrowClass} left-1 sm:left-3`}
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => step(1)}
          className={`${arrowClass} right-1 sm:right-3`}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* Readout + open the focused project */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="font-mono text-xs text-ink-faint" aria-live="polite">
          <span className="text-data">{String(focus + 1).padStart(2, '0')}</span>
          {' / '}
          {String(count).padStart(2, '0')}
          <span className="sr-only"> — {current.title}</span>
        </p>
        <Link
          to={current.path}
          className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-bright px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105 hover:shadow-[0_0_28px_rgb(var(--signal)/0.45)]"
        >
          Open project
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
