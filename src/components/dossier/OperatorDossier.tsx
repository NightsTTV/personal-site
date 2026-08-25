import { ExternalLink } from '../ExternalLink'
import { GITHUB_URL, LINKEDIN_URL } from '../../constants/links'
import resumeUrl from '../../assets/Resume26.pdf'

/**
 * Operator Dossier — 3-zone technical dossier card (goal: About & Colophon refactor):
 *   Zone 1 — dual polaroid photo strip + status tag
 *   Zone 2 — mission & technical biography + action strip
 *   Zone 3 — channel matrix (key :: value contact log)
 * Lives in the right-hand rail when "get in touch" is selected; hidden otherwise.
 */

type OperatorDossierProps = {
  onClose: () => void
}

const frames = [
  {
    src: '/operator.jpg',
    alt: 'Kaspian Thomas — operator headshot',
    caption: 'OPERATOR',
    sub: 'KASPIAN THOMAS — NEW ORLEANS, LA',
  },
  {
    src: '/sidekick-casper.jpg',
    alt: 'Casper — rescued white pit mix and resident sidekick',
    caption: 'SIDEKICK · CASPER',
    sub: 'QA / COMPANION UNIT',
  },
]

/** Film-strip perforation row — decorative dots along a frame edge. */
function FilmPerfs() {
  return (
    <div aria-hidden="true" className="flex items-center justify-between px-1 py-1.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-[3px] w-[3px] rounded-full bg-ink-faint/50" />
      ))}
    </div>
  )
}

const channelRows: {
  key: string
  value: string
  href?: string
  external?: boolean
}[] = [
  { key: 'EMAIL — DIRECT', value: 'kaspian2005@gmail.com', href: 'mailto:kaspian2005@gmail.com' },
  { key: 'PHONE', value: '985-772-1721', href: 'tel:+19857721721' },
  { key: 'LINKEDIN', value: 'in/kaspian-thomas', href: LINKEDIN_URL, external: true },
  { key: 'GITHUB', value: '@NightsTTV', href: GITHUB_URL, external: true },
  { key: 'LOCATION', value: 'New Orleans, LA (Central Time)' },
]

export function OperatorDossier({ onClose }: OperatorDossierProps) {
  return (
    <div className="relative border border-line-strong bg-surface shadow-[0_24px_60px_-40px_rgb(0_0_0/0.5)]">
      {/* Collapse control — unselects "get in touch" */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Hide contact card"
        title="Hide contact card"
        className="absolute left-3 top-3 z-10 font-mono text-xs leading-none text-ink-faint transition hover:text-accent"
      >
        ✕
      </button>

      {/* -------------------------------------------------------------- *
       * Zone 1 — Visual identity & status (dual polaroid / photo strip)
       * -------------------------------------------------------------- */}
      <section aria-label="Visual identity" className="relative border-b border-line p-4 pt-11 sm:p-5 sm:pt-12">
        <p className="absolute right-3 top-3 border border-line-strong bg-paper px-2 py-1 font-mono text-[0.58rem] tracking-[0.08em] text-accent">
          [ STATUS: RESEARCH &amp; APPLIED AI / OPEN TO CONNECT ]
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {frames.map((frame) => (
            <figure key={frame.caption} className="border border-line-strong bg-surface-2/40">
              <FilmPerfs />
              <div className="px-2">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full border border-line object-cover grayscale transition duration-300 hover:grayscale-0"
                />
              </div>
              <FilmPerfs />
              <figcaption className="px-2 pb-3 pt-1 text-center">
                <p className="font-mono text-[0.66rem] tracking-[0.34em] text-ink">
                  {frame.caption}
                </p>
                <p className="mt-1.5 font-mono text-[0.56rem] tracking-[0.12em] text-ink-faint">
                  {frame.sub}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- *
       * Zone 2 — Mission & technical biography
       * -------------------------------------------------------------- */}
      <section aria-label="Mission and biography" className="border-b border-line p-4 sm:p-5">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-faint">
          {'// THE OPERATOR BEHIND THE SYSTEMS'}
        </p>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          <p>
            From <strong>Houma, Louisiana</strong> — bayou roots, New Orleans base.
            Undergraduate researcher in computer science (AI/ML) at the University
            of New Orleans.
          </p>
          <p>
            Focusing on evolutionary computation, genetic AI architectures, and
            real-time streaming pipelines outside traditional constraints.
          </p>
          <p>
            Resident QA engineer: <strong>Casper</strong>, a rescued white pit mix
            whose primary contribution to system uptime is strictly enforced walk
            breaks.
          </p>
        </div>

        {/* Action strip — primary artifact + core links */}
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-accent bg-accent-bright px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105"
          >
            [ RESUME — PDF ]
          </a>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <ExternalLink
              href={GITHUB_URL}
              className="ul-grow font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              GITHUB / NIGHTSTTV
            </ExternalLink>
            <a
              href="mailto:kaspian2005@gmail.com"
              className="ul-grow font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              CONTACT / OPEN CHANNEL
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- *
       * Zone 3 — Channel matrix (current links & contact)
       * -------------------------------------------------------------- */}
      <section aria-label="Current links and contact" className="p-4 sm:p-5">
        <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ink">
          Current Links &amp; Contact
        </h3>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          {channelRows.map((row) => (
            <div key={row.key} className="flex items-baseline gap-2 py-2 font-mono text-[0.72rem]">
              <dt className="w-[8.75rem] shrink-0 tracking-[0.06em] text-ink-faint">
                {row.key}
              </dt>
              <dd className="min-w-0 flex-1 break-words text-right sm:text-left">
                <span aria-hidden="true" className="mr-2 text-line-strong">::</span>
                {row.href ? (
                  row.external ? (
                    <ExternalLink href={row.href} className="text-ink-soft ul-grow hover:text-accent">
                      {row.value}
                    </ExternalLink>
                  ) : (
                    <a href={row.href} className="text-ink-soft ul-grow hover:text-accent">
                      {row.value}
                    </a>
                  )
                ) : (
                  <span className="text-ink-soft">{row.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
