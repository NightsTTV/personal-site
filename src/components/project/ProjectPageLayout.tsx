import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Reveal } from '../Reveal'
import { TagLine } from './ProjectMeta'

type ProjectPageLayoutProps = {
  title: string
  subtitle: string
  tags: string[]
  heroImage?: { src: string; alt: string }
  children: ReactNode
}

export function ProjectPageLayout({
  title,
  subtitle,
  tags,
  heroImage,
  children,
}: ProjectPageLayoutProps) {
  return (
    <article className="scroll-mt-24 pb-16 pt-6 sm:pb-24">
      <div className="shell mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/#projects"
          className="kicker inline-flex items-center gap-2 text-ink-faint transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> Back to projects
        </Link>

        <header className="mt-8">
          <TagLine tags={tags} />
          <h1 className="mt-5 font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        </header>

        {heroImage && (
          <div className="mt-10 overflow-hidden border border-line-strong bg-surface p-2">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl object-cover"
            />
          </div>
        )}

        <div className="mt-14 space-y-14">{children}</div>
      </div>
    </article>
  )
}

export function ProjectSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Reveal as="section">
      <h2 className="flex items-center gap-3 font-display text-2xl tracking-tight text-ink">
        <span aria-hidden="true" className="h-6 w-1 shrink-0 bg-accent-bright" />
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">{children}</div>
    </Reveal>
  )
}

export function ImageGallery({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[]
}) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {images.map((img) => (
        <figure
          key={img.src}
          className="overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="img-zoom overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>
          {img.caption && (
            <figcaption className="border-t border-line px-4 py-3 font-mono text-xs leading-relaxed text-ink-faint">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink-soft"
        >
          <span className="mt-0.5 shrink-0 font-mono text-accent" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function TechTable({
  rows,
}: {
  rows: { label: string; value: string }[]
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-0">
              <th className="w-2/5 bg-surface-2/60 px-4 py-3 align-top font-mono text-xs font-medium uppercase tracking-wide text-ink-faint">
                {row.label}
              </th>
              <td className="bg-surface px-4 py-3 text-ink-soft">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocLinks({
  links,
}: {
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent-bright/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition hover:bg-accent-bright/20"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

export function SeverityScale() {
  const tiers = [
    { level: 1, name: 'Minor', duration: '1 – 7 days' },
    { level: 2, name: 'Mild', duration: '1 – 3 weeks' },
    { level: 3, name: 'Moderate', duration: '3 – 8 weeks' },
    { level: 4, name: 'Severe', duration: '2 – 6 months' },
    { level: 5, name: 'Season-Ending', duration: '6+ months' },
  ]

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.level}
          className="rounded-xl border border-line bg-surface p-4"
        >
          <p className="kicker text-accent">Severity {tier.level}</p>
          <p className="mt-2 font-display font-semibold text-ink">{tier.name}</p>
          <p className="mt-0.5 font-mono text-xs text-ink-faint">{tier.duration}</p>
        </div>
      ))}
    </div>
  )
}
