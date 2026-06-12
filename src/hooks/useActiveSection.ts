import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Tracks which home-page section is currently in view so the navbar can show
 * an active indicator. Returns null on non-home routes.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/') {
      setActive(null)
      return
    }
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      // band around the upper-middle of the viewport decides the active section
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname, ids])

  return active
}
