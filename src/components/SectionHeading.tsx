import type { ReactNode } from 'react'

type SectionHeadingProps = {
  /** Mono eyebrow label, e.g. "02 — Selected work" */
  kicker: string
  title: string
  children?: ReactNode
  align?: 'left' | 'center'
}

/**
 * Shared section header: a monospace index kicker with an accent node,
 * a Fraunces display title, and optional supporting copy.
 */
export function SectionHeading({
  kicker,
  title,
  children,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p
        className={`kicker flex items-center gap-2.5 text-accent ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright"
        />
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {children && (
        <div className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-soft">
          {children}
        </div>
      )}
    </div>
  )
}
