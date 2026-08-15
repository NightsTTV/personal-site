/** Shared bits between the projects grid and scroll views. */

export function StatusChip({ status }: { status: string }) {
  const upcoming = status.toLowerCase().includes('coming')
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide ${
        upcoming
          ? 'border-line bg-surface-2 text-ink-faint'
          : 'border-accent/30 bg-accent-bright/10 text-accent'
      }`}
    >
      {!upcoming && (
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-bright" />
      )}
      {status}
    </span>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[0.68rem] text-ink-faint"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
