import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Render as a different element (default div) */
  as?: ElementType
  /** Stagger in ms, applied as transition-delay */
  delay?: number
  className?: string
  id?: string
}

/**
 * Fades + lifts its children into view the first time they intersect the
 * viewport. Honors prefers-reduced-motion (the CSS shows content instantly).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`io-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
