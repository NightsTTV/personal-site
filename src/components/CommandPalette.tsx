import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import resumeUrl from '../assets/KaspianThomas_Resume.pdf'
import { GITHUB_URL, LINKEDIN_URL } from '../constants/links'
import { projectSummaries } from '../data/projects'

type Item = { label: string; hint: string; run: () => void }

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  /** Opens the docked operator dossier / contact rail. */
  onContact?: () => void
}

/**
 * ⌘K quick-nav: sections, project pages, resume, and external profiles.
 * Keyboard: arrows to move, Enter to run, Escape to close.
 */
export function CommandPalette({ open, onClose, onContact }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const go = (to: string) => () => {
      navigate(to)
      onClose()
    }
    const ext = (url: string) => () => {
      window.open(url, '_blank', 'noopener,noreferrer')
      onClose()
    }
    return [
      { label: 'Home', hint: 'SECTION', run: go('/') },
      { label: 'Projects', hint: 'SECTION', run: go('/#projects') },
      { label: 'Get in touch', hint: 'CONTACT', run: () => { onContact?.(); onClose() } },
      ...projectSummaries
        .filter((p) => p.path.startsWith('/projects'))
        .map((p) => ({ label: p.title, hint: 'PROJECT', run: go(p.path) })),
      { label: 'Download resume', hint: 'PDF', run: ext(resumeUrl) },
      { label: 'GitHub — NightsTTV', hint: 'LINK', run: ext(GITHUB_URL) },
      { label: 'LinkedIn', hint: 'LINK', run: ext(LINKEDIN_URL) },
    ]
  }, [navigate, onClose, onContact])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items
  }, [items, query])

  // reset + focus on open (setTimeout, not rAF — rAF stalls in hidden tabs)
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when the palette opens
      setQuery('')
      setSel(0)
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSel((s) => Math.min(s + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSel((s) => Math.max(s - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[sel]?.run()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, filtered, sel, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[16vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4">
          <span aria-hidden="true" className="font-mono text-sm text-accent">
            ›
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Jump to…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSel(0)
            }}
            aria-label="Search destinations"
            className="w-full bg-transparent py-3.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.62rem] text-ink-faint">
            ESC
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                onMouseEnter={() => setSel(i)}
                onClick={item.run}
                className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === sel ? 'bg-surface-2 text-ink' : 'text-ink-soft'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 font-mono text-[0.62rem] tracking-wider text-ink-faint">
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center font-mono text-xs text-ink-faint">
              No matches
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
