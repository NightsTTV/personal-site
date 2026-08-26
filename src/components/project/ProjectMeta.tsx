/**
 * Shared metadata primitives — strict monospace, bracket-form, no pills.
 */

export function StatusLine({ status }: { status: string }) {
  const live = status.toLowerCase() === 'live'
  return (
    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ink-faint">
      <span aria-hidden="true">[ </span>
      <span className={live ? 'text-accent' : undefined}>{status}</span>
      {live && (
        <span
          aria-hidden="true"
          className="ml-1.5 inline-block h-1.5 w-1.5 animate-pulse bg-accent-bright align-middle"
        />
      )}
      <span aria-hidden="true"> ]</span>
    </span>
  )
}

/** `[ Python / FastAPI / RAG ]` — one mono line, not a row of chips. */
export function TagLine({ tags }: { tags: string[] }) {
  return (
    <p className="font-mono text-[0.7rem] leading-relaxed text-ink-faint">
      <span aria-hidden="true" className="text-line-strong">[ </span>
      {tags.join(' / ')}
      <span aria-hidden="true" className="text-line-strong"> ]</span>
    </p>
  )
}
