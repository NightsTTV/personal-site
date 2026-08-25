import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { ThemeToggle } from './ThemeToggle'
import { ChipWidget } from './chip/ChipWidget'
import { OperatorDossier } from './dossier/OperatorDossier'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'

/**
 * Docked dossier layout (goal: About & Colophon refactor):
 *  - "get in touch" selected (default on desktop) → index/work fill the left,
 *    the Operator Dossier docks into a right-hand rail — no dead margins.
 *  - Unselected → classic centered layout, contact card hidden until reopened
 *    from the nav CTA / ⌘K palette.
 *  - kaspiBOT stays pinned bottom-right in both states.
 */

const navLinks = [
  { label: 'Index', to: '/', id: 'home' },
  { label: 'Work', to: '/#projects', id: 'projects' },
]

// Scroll-spy only tracks real page sections — the dossier rail is a persistent
// overlay-style panel, not something the viewport band should highlight.
const sectionIds = navLinks.map((l) => l.id)

function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`text-accent ${className}`}
    >
      <g
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 13 V35" />
        <path d="M17 24 L31 13" />
        <path d="M17 24 L31 35" />
      </g>
      <circle cx="31" cy="13" r="3.1" fill="currentColor" />
      <circle cx="31" cy="35" r="2.2" fill="currentColor" />
    </svg>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(sectionIds)
  // Dossier defaults open where a rail fits (desktop); hidden behind the CTA on mobile.
  const [contactOpen, setContactOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 1024,
  )

  const openContact = () => {
    setContactOpen(true)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className="relative min-h-screen text-ink"
      data-dock={contactOpen ? 'open' : 'closed'}
    >
      {/* Atmosphere: dot lattice · grain */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-lattice absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Kaspian Thomas — home"
          >
            <Monogram className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-[-6deg]" />
            <span className="font-display text-lg tracking-tight text-ink">
              Kaspian Thomas
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`kicker ul-grow inline-flex items-center gap-1.5 transition-colors ${
                      active === link.id
                        ? 'text-ink'
                        : 'text-ink-faint hover:text-ink'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1 w-1 rounded-full bg-accent-bright transition-opacity ${
                        active === link.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openContact}
                  aria-expanded={contactOpen}
                  className={`kicker ul-grow inline-flex items-center gap-1.5 transition-colors ${
                    contactOpen ? 'text-accent' : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full bg-accent-bright transition-opacity ${
                      contactOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  Colophon
                </button>
              </li>
            </ul>
            <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Open quick navigation (Command K)"
              className="inline-flex items-center rounded-md border border-line px-2.5 py-1.5 font-mono text-[0.68rem] text-ink-faint transition hover:border-accent hover:text-accent"
            >
              ⌘K
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setContactOpen((o) => !o)}
              aria-pressed={contactOpen}
              className={`border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                contactOpen
                  ? 'border-accent bg-accent-bright text-accent-contrast hover:brightness-105'
                  : 'border-line-strong text-ink hover:border-accent hover:text-accent'
              }`}
            >
              Get in touch
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-ink-soft transition hover:bg-surface-2 hover:text-ink"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-line bg-paper/95 px-4 pb-4 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="block rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openContact}
                  aria-expanded={contactOpen}
                  className="block w-full rounded-lg px-3 py-2.5 text-left font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                >
                  Colophon
                </button>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setContactOpen((o) => !o)}
              aria-pressed={contactOpen}
              className="mt-3 block w-full border border-line-strong px-5 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent"
            >
              Get in touch
            </button>
          </div>
        )}
      </header>

      {/* Docked split: index/work left · dossier rail right */}
      <div className="relative mx-auto flex w-full max-w-[110rem] items-start">
        <main className="relative min-w-0 flex-1 pt-[3.25rem]">{children}</main>

        <aside
          id="colophon"
          aria-label="Operator dossier — links and contact"
          className="sticky top-[3.25rem] hidden max-h-[calc(100vh-3.25rem)] w-[24rem] shrink-0 overflow-y-auto p-4 lg:block xl:w-[26.5rem] xl:p-6"
        >
          <OperatorDossier onClose={() => setContactOpen(false)} />
        </aside>
      </div>

      {/* Mobile drawer — same dossier, slides over content */}
      {contactOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Operator dossier — links and contact"
          className="fixed inset-0 z-[55] lg:hidden"
        >
          <button
            type="button"
            aria-label="Close contact card"
            onClick={() => setContactOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[min(26rem,calc(100vw-1.5rem))] overflow-y-auto p-3">
            <OperatorDossier onClose={() => setContactOpen(false)} />
          </div>
        </div>
      )}

      <footer className="relative border-t border-line">
        <div className="flex max-w-none flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Monogram className="h-5 w-5" />
            <p className="font-mono text-xs text-ink-faint">
              © {new Date().getFullYear()} Kaspian Thomas
            </p>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-faint">
            Designed &amp; built in New Orleans
          </p>
        </div>
      </footer>

      <ChipWidget />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onContact={openContact}
      />
    </div>
  )
}
