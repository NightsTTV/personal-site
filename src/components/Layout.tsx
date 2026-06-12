import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { ThemeToggle } from './ThemeToggle'
import { ChipWidget } from './chip/ChipWidget'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { label: 'Home', to: '/', id: 'home' },
  { label: 'Projects', to: '/#projects', id: 'projects' },
  { label: 'About', to: '/#about', id: 'about' },
  { label: 'Contact', to: '/#contact', id: 'contact' },
]

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
    <div className="relative min-h-screen text-ink">
      {/* Atmosphere: phosphor glow · dot lattice · grain */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="bg-lattice absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <div className="absolute -top-48 left-1/2 h-[620px] w-[min(960px,120vw)] -translate-x-1/2 rounded-full bg-[rgb(var(--signal)/0.10)] blur-[130px]" />
        <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-[rgb(var(--signal)/0.05)] blur-[120px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Kaspian Thomas — home"
          >
            <Monogram className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-[-6deg]" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
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
            <Link
              to="/#contact"
              className="rounded-md bg-accent-bright px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105 hover:shadow-[0_0_24px_rgb(var(--signal)/0.45)]"
            >
              Get in touch
            </Link>
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
            <Link
              to="/#contact"
              className="mt-3 block rounded-md bg-accent-bright px-5 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-accent-contrast transition hover:brightness-105"
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        )}
      </header>

      <main className="relative pt-[3.25rem]">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
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
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  )
}
