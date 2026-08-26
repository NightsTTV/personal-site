import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { ThemeToggle } from './ThemeToggle'
import { ChipWidget } from './chip/ChipWidget'
import { OperatorDossier } from './dossier/OperatorDossier'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'

/**
 * Operator Dossier layout:
 *  - "Get in touch" is selected by default → the dossier is docked as an
 *    off-canvas panel on the right edge (page content reflows left of it on
 *    desktop so nothing is covered).
 *  - Deselect → the panel slides off to the right and hides; reopen from the
 *    nav CTA or the ⌘K palette.
 *  - kaspiBOT stays pinned bottom-right, above the panel, in both states.
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
  // "Get in touch" is selected by default, so the dossier shows on first load.
  const [contactOpen, setContactOpen] = useState(true)

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

      {/* Page content — reflows left of the dossier rail on desktop when open */}
      <div
        className={`relative mx-auto w-full max-w-[110rem] transition-[padding] duration-300 ease-out ${
          contactOpen ? 'lg:pr-[25rem] xl:pr-[27.5rem]' : ''
        }`}
      >
        <main className="relative min-w-0 pt-[3.25rem]">{children}</main>

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
      </div>

      {/* Operator dossier — off-canvas panel pinned to the right edge.
       * Selected by default (slid in); deselecting "get in touch" slides it
       * off to the right to hide. kaspiBOT (z-59/60) stays pinned above it. */}
      <aside
        id="colophon"
        aria-label="Operator dossier — links and contact"
        aria-hidden={!contactOpen}
        className={`fixed right-0 top-[3.25rem] z-40 max-h-[calc(100dvh-3.25rem)] w-[min(100vw,24rem)] overflow-y-auto overscroll-contain px-3 pb-6 pt-3 transition-transform duration-300 ease-out will-change-transform xl:w-[26.5rem] xl:px-4 ${
          contactOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        <OperatorDossier onClose={() => setContactOpen(false)} />
      </aside>

      <ChipWidget />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onContact={openContact}
      />
    </div>
  )
}
