import { ProjectsSection } from '../components/project/ProjectsSection'

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
        className="shell scroll-mt-24 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-28"
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
            Building an inclusive future for everyone by adapting to modern
            agentic systems, architectures, and their real world
            implications/trade-offs.
          </h1>

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

    </>
  )
}
