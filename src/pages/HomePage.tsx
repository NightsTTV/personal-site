import { Link } from 'react-router-dom'
import githubImg from '../assets/github.png'
import resumeUrl from '../assets/Resume26.pdf'
import { ContactIcon } from '../components/ContactIcon'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { GITHUB_URL, LINKEDIN_URL } from '../constants/links'
import { projectSummaries } from '../data/projects'

const focusAreas = [
  'Machine Learning',
  'Evolutionary Computation',
  'Distributed Systems',
  'NLP',
]

export function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------------- *
       * Hero
       * ----------------------------------------------------------------- */}
      <section
        id="home"
        className="scroll-mt-24 mx-auto flex max-w-6xl flex-col items-start gap-14 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:pb-24 lg:pt-24"
      >
        <div className="flex-1">
          <p
            className="rise kicker flex items-center gap-2.5 text-accent"
            style={{ animationDelay: '0ms' }}
          >
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright" />
            B.S. Computer Science · AI / ML · UNO
          </p>

          <h1
            className="rise mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '90ms' }}
          >
            Hi, I&apos;m
            <br />
            <span className="relative inline-block">
              Kaspian Thomas
              <svg
                className="absolute -bottom-2.5 left-0 h-[0.45em] w-full text-accent sm:-bottom-3.5"
                viewBox="0 0 320 16"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 10.5C70 4 150 3.5 230 6.5c30 1.1 60 2.5 87 4"
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: '180ms' }}
          >
            I am currently an undergraduate at UNO studying computer science (AI/ML).
            I am fascinated by the crossroad of evolutionary computation and artificial
            intelligence. My goal is to build genetic AI systems that operate beyond
            human constraints of time.
          </p>

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

        {/* Portrait — framed like a technical plate, image untouched */}
        <div
          className="rise relative mx-auto shrink-0 lg:mx-0"
          style={{ animationDelay: '200ms' }}
        >
          <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-[rgb(var(--signal)/0.12)] blur-3xl" />
          <div className="relative rounded-2xl border border-line-strong bg-surface p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
            <img
              src="/me.jpg"
              alt="Kaspian Thomas"
              width={560}
              height={747}
              className="h-72 w-64 rounded-xl object-cover object-top sm:h-80 sm:w-72 lg:h-[26rem] lg:w-80"
            />
            {/* corner focus brackets */}
            <span aria-hidden="true" className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-accent" />
            <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-accent" />
            <span aria-hidden="true" className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-accent" />
            <span aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-accent" />
          </div>
          <p className="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
            New Orleans, Louisiana
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------------- *
       * Projects
       * ----------------------------------------------------------------- */}
      <section
        id="projects"
        className="scroll-mt-24 border-y border-line bg-surface-2/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading kicker="01 — Selected work" title="Projects">
              <p>
                A portfolio of coursework and research. Click on any project for the full
                architecture details, screenshots, and documentation. See Contact for more
                information, including links to repositories and other relevant information.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {projectSummaries.map((project, i) => {
              const index = String(i + 1).padStart(2, '0')
              const isLink = project.path.startsWith('/projects')
              const upcoming = project.status.toLowerCase().includes('coming')

              const inner = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-accent">
                      {index}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide ${
                        upcoming
                          ? 'border-line bg-surface-2 text-ink-faint'
                          : 'border-accent/30 bg-accent-bright/10 text-accent'
                      }`}
                    >
                      {!upcoming && (
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                      )}
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-soft">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[0.68rem] text-ink-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLink && (
                    <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-wider text-accent">
                      View project details
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  )}
                </>
              )

              const base =
                'group relative flex flex-col rounded-2xl border bg-surface p-6 transition duration-300'

              return (
                <Reveal key={project.slug} delay={i * 70}>
                  {isLink ? (
                    <Link
                      to={project.path}
                      className={`${base} border-line hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_22px_50px_-28px_rgb(var(--signal)/0.55)]`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <article className={`${base} border-dashed border-line-strong/70`}>
                      {inner}
                    </article>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- *
       * About
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

          <Reveal>
            <h3 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">
              Community &amp; Passions
            </h3>
            <p className="mt-2 max-w-2xl text-ink-soft">
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
              <figcaption className="relative border-t border-line bg-surface-2/40 p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-3 font-display text-6xl leading-none text-accent/30"
                >
                  &ldquo;
                </span>
                <p className="relative pl-6 font-display text-lg italic leading-relaxed text-ink sm:text-xl">
                  In my free time I enjoy giving back to the community and coaching youth
                  sports as a{' '}
                  <span className="font-semibold not-italic text-accent">
                    competitive soccer coach
                  </span>
                  . This is a second passion of mine and I love to see the players grow and
                  succeed.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Resume */}
          <Reveal>
            <div className="mt-8 flex flex-col items-start gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="kicker text-accent">Resume · PDF</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  Education, experience &amp; skills
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Download my FULL resume now for education, experience, and skills.
                </p>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent-bright px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105 hover:shadow-[0_0_24px_rgb(var(--signal)/0.4)]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download resume
              </a>
            </div>
          </Reveal>

          {/* Casper */}
          <Reveal>
            <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface lg:flex-row lg:items-stretch">
              <div className="flex items-center justify-center bg-surface-2/40 p-6 sm:p-8 lg:w-80 lg:shrink-0">
                <div className="img-zoom w-full max-w-[17rem] overflow-hidden rounded-2xl border border-line-strong shadow-lg">
                  <img
                    src="/casper-face.jpg"
                    alt="Casper, a white pit mix, resting with his head on his paw"
                    width={480}
                    height={503}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[6/7] w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
                <p className="kicker text-accent">The good boy</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                  Meet Casper
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                  My son Casper is a huge part of my world. This rescued white pit mix is the best
                  companion a guy could ask for and is always ready for a nap.
                </p>
              </div>
            </div>
          </Reveal>
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
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
            <Reveal className="flex flex-col items-center gap-6 lg:items-stretch">
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-2xl bg-[rgb(var(--signal)/0.1)] blur-2xl" />
                <img
                  src="/me.jpg"
                  alt="Kaspian Thomas"
                  width={560}
                  height={747}
                  loading="lazy"
                  decoding="async"
                  className="h-52 w-52 rounded-2xl border border-line-strong object-cover object-top sm:h-56 sm:w-56"
                />
              </div>

              <ExternalLink
                href={GITHUB_URL}
                aria-label="GitHub profile — NightsTTV"
                className="group flex w-full max-w-[14rem] flex-col items-center rounded-2xl border border-line bg-surface px-6 py-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgb(var(--signal)/0.5)] sm:w-56 sm:max-w-none"
              >
                <img
                  src={githubImg}
                  alt=""
                  className="h-12 w-12 object-contain transition group-hover:scale-110"
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
