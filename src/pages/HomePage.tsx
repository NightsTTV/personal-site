import githubImg from '../assets/github.png'
import resumeUrl from '../assets/Resume26.pdf'
import { ContactIcon } from '../components/ContactIcon'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectsSection } from '../components/project/ProjectsSection'
import { GITHUB_URL, LINKEDIN_URL } from '../constants/links'
import { projectSummaries } from '../data/projects'

const focusAreas = [
  'Machine Learning',
  'Evolutionary Computation',
  'Distributed Systems',
  'NLP',
]

/* Mono status rows for the hero telemetry card — values sourced from site content. */
const statusRows: { label: string; value: string; data?: boolean; pulse?: boolean }[] = [
  { label: 'EDU', value: 'B.S. CS · AI/ML — UNO' },
  { label: 'BASE', value: 'New Orleans, Louisiana' },
  { label: 'FOCUS', value: 'Evolutionary computation' },
  { label: 'PROJECTS', value: String(projectSummaries.length).padStart(2, '0'), data: true },
  { label: 'STATUS', value: 'Building genetic AI systems', pulse: true },
]

export function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------------- *
       * Hero — 7/5 split: intro | telemetry status card
       * ----------------------------------------------------------------- */}
      <section
        id="home"
        className="scroll-mt-24 mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20"
      >
        <div className="lg:col-span-7">
          <p
            className="rise kicker flex items-center gap-2.5 text-accent"
            style={{ animationDelay: '0ms' }}
          >
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright" />
            B.S. Computer Science · AI / ML · UNO
          </p>

          <h1
            className="rise mt-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-tight text-ink"
            style={{ animationDelay: '90ms' }}
          >
            Hi, I&apos;m
            <br />
            Kaspian Thomas
            <span
              aria-hidden="true"
              className="caret ml-2 inline-block h-[0.78em] w-[0.45ch] translate-y-[0.06em] bg-accent-bright"
            />
          </h1>

          <ul
            className="rise mt-7 flex flex-wrap gap-x-2 gap-y-2"
            style={{ animationDelay: '240ms' }}
          >
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[0.72rem] text-ink-faint"
              >
                {area}
              </li>
            ))}
          </ul>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '320ms' }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-bright px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105 hover:shadow-[0_0_28px_rgb(var(--signal)/0.45)]"
            >
              View my work
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-line-strong px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Telemetry status card — compact portrait + live stat rows */}
        <div className="rise lg:col-span-5" style={{ animationDelay: '200ms' }}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-[rgb(var(--signal)/0.10)] blur-3xl" />
            <div className="relative rounded-2xl border border-line-strong bg-surface p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/me-card.jpg"
                  alt="Kaspian Thomas"
                  width={900}
                  height={1947}
                  fetchPriority="high"
                  className="h-52 w-full object-cover object-[50%_42%] sm:h-60"
                />
              </div>
              <dl className="px-2.5 pb-1.5">
                {statusRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0"
                  >
                    <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-ink-faint">
                      {row.label}
                    </dt>
                    <dd
                      className={`flex items-center gap-2 text-right font-mono text-xs ${
                        row.data ? 'text-data' : 'text-ink-soft'
                      }`} 
                    > 
                      {row.pulse && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-bright"
                        />
                      )}
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* corner focus brackets */}
              <span aria-hidden="true" className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-accent" />
              <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-accent" />
              <span aria-hidden="true" className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-accent" />
              <span aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-accent" />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* ----------------------------------------------------------------- *
       * About — 2-col: community feature | resume + Casper stack
       * ----------------------------------------------------------------- */}
      <section id="about" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading kicker="02 — Background" title="About">
              <p className="text-lg">
                Originally from Houma, Louisiana, I am rooted in the bayou, driven by curiosity,
                and always looking for the next problem worth solving.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Community &amp; Passions
              </h3>
              <p className="mt-2 text-ink-soft">
                Outside of code and research, I invest time in the people and communities around me.
              </p>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_50px_-32px_rgb(0_0_0/0.55)]">
                <div className="img-zoom overflow-hidden">
                  <img
                    src="/soccer.jpg"
                    alt="Kaspian Thomas with his youth soccer team"
                    width={1280}
                    height={590}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <figcaption className="border-t border-line bg-surface-2/40 p-6">
                  <p className="text-pretty leading-relaxed text-ink-soft">
                    In my free time I enjoy giving back to the community and coaching youth
                    sports as a{' '}
                    <span className="font-semibold text-accent">competitive soccer coach</span>.
                    This is a second passion of mine and I love to see the players grow and
                    succeed.
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Resume */}
              <Reveal>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <p className="kicker text-accent">Resume · PDF</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    Education, experience &amp; skills
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Download my FULL resume now for education, experience, and skills.
                  </p>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-bright px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105 hover:shadow-[0_0_24px_rgb(var(--signal)/0.4)]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    Download resume
                  </a>
                </div>
              </Reveal>

              {/* Casper */}
              <Reveal className="flex-1">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="img-zoom overflow-hidden border-b border-line">
                    <img
                      src="/casper-face.jpg"
                      alt="Casper, a white pit mix, resting with his head on his paw"
                      width={480}
                      height={503}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-[50%_35%]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <p className="kicker text-accent">The good boy</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                      Meet Casper
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      My son Casper is a huge part of my world. This rescued white pit mix is the
                      best companion a guy could ask for and is always ready for a nap.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- *
       * Contact
       * ----------------------------------------------------------------- */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-line bg-surface-2/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
            <Reveal className="flex flex-col items-center gap-5 lg:items-stretch">
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-2xl bg-[rgb(var(--signal)/0.1)] blur-2xl" />
                <img
                  src="/me-card.jpg"
                  alt="Kaspian Thomas"
                  width={900}
                  height={1947}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-48 rounded-2xl border border-line-strong object-cover object-[50%_30%] sm:h-52 sm:w-52"
                />
              </div>
        
          <p
            className="rise mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: '180ms' }}
          > {/*       <span style={{ color: '#CDFF70' }}></span>   */}
            Undergraduate at UNO studying computer science <span style={{ color: '#CDFF70' }}>(AI/ML)</span>.
            I am fascinated by the crossroad of evolutionary computation and artificial
            intelligence. <span style={{ color: '#CDFF70' }}>Empowering communities worldwide </span>  
            by developing  <span style={{ color: '#CDFF70' }}>efficient open-source</span> tools that <span style={{ color: '#CDFF70' }}>bridge the gap</span> for independent contractors, AI 
            engineers, and educators alike.
          </p>
              <ExternalLink
                href={GITHUB_URL}
                aria-label="GitHub profile — NightsTTV"
                className="group flex w-full max-w-[13rem] flex-col items-center rounded-2xl border border-line bg-surface px-6 py-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgb(var(--signal)/0.5)] sm:max-w-none"
              >
                <img
                  src={githubImg}
                  alt=""
                  className="h-11 w-11 object-contain transition group-hover:scale-110"
                />
                <span className="mt-3 font-mono text-sm font-semibold text-ink transition group-hover:text-accent">
                  @NightsTTV
                </span>
                <span className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">
                  View on GitHub
                </span>
              </ExternalLink>
            </Reveal>

            <Reveal>
              <SectionHeading kicker="03 — Get in touch" title="Contact">
                <p>
                  Feel free to reach out with any questions or just to say hello. I&apos;d love to
                  connect with you!
                </p>
              </SectionHeading>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                <li>
                  <a
                    href="mailto:klthoma8@uno.edu"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <ContactIcon type="email" />
                    <span className="font-mono text-sm text-ink-soft transition group-hover:text-ink">
                      klthoma8@uno.edu
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kaspian2005@gmail.com"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <ContactIcon type="email" />
                    <span className="font-mono text-sm text-ink-soft transition group-hover:text-ink">
                      kaspian2005@gmail.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+19857721721"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <ContactIcon type="phone" />
                    <span className="font-mono text-sm text-ink-soft transition group-hover:text-ink">
                      985-772-1721
                    </span>
                  </a>
                </li>
                <li>
                  <ExternalLink
                    href={LINKEDIN_URL}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <ContactIcon type="linkedin" />
                    <span className="font-mono text-sm text-ink-soft transition group-hover:text-ink">
                      LinkedIn
                    </span>
                  </ExternalLink>
                </li>
                <li className="sm:col-span-2">
                  <ExternalLink
                    href={GITHUB_URL}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <ContactIcon type="github" />
                    <span className="font-mono text-sm text-ink-soft transition group-hover:text-ink">
                      GitHub — NightsTTV
                    </span>
                  </ExternalLink>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
