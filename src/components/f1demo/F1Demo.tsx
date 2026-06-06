import { useEffect, useMemo, useRef, useState } from 'react'
import {
  type Recording,
  type Snapshot,
  type CommentaryPayload,
  teamColor,
  compoundColor,
  fmtLap,
  fmtSec,
  fmtGap,
  TRIGGER_LABELS,
} from './types'

// Same-origin static recording — no backend, no WebSocket, no external call.
const RECORDING_URL = '/f1-demo-recording.json'
const RACE_LABEL = '2023 Dutch Grand Prix'
const FEED_CAP = 16

// Phase 4 — local-only LIVE mode. Enabled ONLY when VITE_F1_LIVE === 'true',
// which is set in a gitignored .env.local and is ABSENT from production builds.
// As a build-time constant it lets Vite dead-code-eliminate the live path (and
// the dynamically-imported liveSource module) from the public bundle.
const LIVE_ENABLED = import.meta.env?.VITE_F1_LIVE === 'true'
const LIVE_API = import.meta.env?.VITE_F1_API || 'http://localhost:8000'

type Mode = 'replay' | 'live'

type TimelineItem =
  | { t: number; kind: 'tel'; snap: Snapshot }
  | { t: number; kind: 'comm'; comm: CommentaryPayload }

type FeedLine = CommentaryPayload & { id: number }

/**
 * Turn the recorded event log into a playable timeline.
 * Key move: the LLM lagged behind telemetry while recording, so instead of
 * replaying commentary at its recorded timestamp we RE-ANCHOR each line to the
 * moment its lap actually happens on screen (then stagger lines within a lap so
 * they cascade in — the "flood"). Result: perfectly-timed commentary regardless
 * of how slow the model was during capture.
 */
function buildTimeline(rec: Recording) {
  const tel = rec.events.filter((e) => e.type === 'TELEMETRY_UPDATE') as Array<
    { t: number; payload: Snapshot }
  >
  const comm = rec.events.filter((e) => e.type === 'COMMENTARY_UPDATE') as Array<
    { t: number; payload: CommentaryPayload }
  >

  // earliest telemetry timestamp per lap
  const lapFirstT = new Map<number, number>()
  for (const e of tel) {
    const l = e.payload.lap_num
    if (!lapFirstT.has(l)) lapFirstT.set(l, e.t)
  }

  // demo window = the commentary-rich opening, plus a short tail
  const commLaps = comm.map((c) => c.payload.lap_num ?? 0)
  const lastCommLap = commLaps.length ? Math.max(...commLaps) : 6
  const endLap = lastCommLap + 3

  const items: TimelineItem[] = []
  for (const e of tel) {
    if (e.payload.lap_num <= endLap) items.push({ t: e.t, kind: 'tel', snap: e.payload })
  }

  // re-anchor + stagger commentary within each lap
  const byLap = new Map<number, typeof comm>()
  for (const c of comm) {
    const l = c.payload.lap_num ?? 0
    if (!byLap.has(l)) byLap.set(l, [])
    byLap.get(l)!.push(c)
  }
  for (const [lap, lines] of byLap) {
    const base = lapFirstT.get(lap) ?? lines[0].t
    lines
      .sort((a, b) => a.t - b.t)
      .forEach((c, i) => {
        items.push({ t: base + 1.0 + i * 0.7, kind: 'comm', comm: c.payload })
      })
  }

  items.sort((a, b) => a.t - b.t)
  // normalise so playback starts at 0
  const t0 = items.length ? items[0].t : 0
  for (const it of items) it.t -= t0
  const duration = items.length ? items[items.length - 1].t + 1.5 : 0
  return { items, duration, totalLaps: rec.meta.total_laps ?? 72 }
}

export function F1Demo() {
  const [rec, setRec] = useState<Recording | null>(null)
  const [error, setError] = useState(false)

  const [latest, setLatest] = useState<Snapshot | null>(null)
  const [feed, setFeed] = useState<FeedLine[]>([])
  const [lap, setLap] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(2)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState<Mode>('replay')
  const [liveConnected, setLiveConnected] = useState(false)

  const clock = useRef(0)
  const ptr = useRef(0)
  const feedId = useRef(0)

  // ── load the recording (one same-origin fetch) ──────────────────────────
  useEffect(() => {
    let alive = true
    fetch(RECORDING_URL)
      .then((r) => r.json())
      .then((d: Recording) => {
        if (!alive) return
        setRec(d)
        // Seed a frozen preview so the dimmed pre-launch state looks alive.
        const firstTel = d.events.find((e) => e.type === 'TELEMETRY_UPDATE')
        if (firstTel) setLatest(firstTel.payload as Snapshot)
        const firstComm = d.events
          .filter((e) => e.type === 'COMMENTARY_UPDATE')
          .slice(0, 4)
        setFeed(firstComm.map((e, i) => ({ ...(e.payload as CommentaryPayload), id: -1 - i })))
      })
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [])

  const timeline = useMemo(() => (rec ? buildTimeline(rec) : null), [rec])

  const reset = () => {
    clock.current = 0
    ptr.current = 0
    setLatest(null)
    setFeed([])
    setLap(0)
    setProgress(0)
    setDone(false)
  }

  // ── playback loop ─────────────────────────────────────────────────────────
  // setInterval (not requestAnimationFrame) so it keeps running in a background
  // tab; dt is timestamp-derived, so timing stays accurate regardless of jitter.
  useEffect(() => {
    if (!playing || !timeline || mode !== 'replay') return
    let last = performance.now()
    const id = setInterval(() => {
      const now = performance.now()
      const dt = (now - last) / 1000
      last = now
      clock.current += dt * speed

      const items = timeline.items
      let newLatest: Snapshot | null = null
      const newLines: FeedLine[] = []
      while (ptr.current < items.length && items[ptr.current].t <= clock.current) {
        const it = items[ptr.current++]
        if (it.kind === 'tel') newLatest = it.snap
        else {
          feedId.current += 1
          newLines.push({ ...it.comm, id: feedId.current })
        }
      }
      if (newLatest) {
        setLatest(newLatest)
        setLap(newLatest.lap_num)
      }
      if (newLines.length) setFeed((f) => [...newLines.reverse(), ...f].slice(0, FEED_CAP))
      setProgress(Math.min(1, clock.current / timeline.duration))

      if (clock.current >= timeline.duration) {
        setPlaying(false)
        setDone(true)
      }
    }, 40)
    return () => clearInterval(id)
  }, [playing, timeline, speed, mode])

  // ── LIVE mode (local dev only) — connect to the running backend ───────────
  // Dynamically imported so the WebSocket code is tree-shaken from production.
  useEffect(() => {
    if (!LIVE_ENABLED || mode !== 'live') return
    let disconnect: (() => void) | null = null
    let cancelled = false
    import('./liveSource').then(({ connectLive }) => {
      if (cancelled) return
      disconnect = connectLive(LIVE_API, {
        onTelemetry: (s) => {
          setLatest(s)
          setLap(s.lap_num)
        },
        onCommentary: (c) => {
          feedId.current += 1
          const line: FeedLine = { ...c, id: feedId.current }
          setFeed((f) => [line, ...f].slice(0, FEED_CAP))
        },
        onStatus: setLiveConnected,
      })
    })
    return () => {
      cancelled = true
      disconnect?.()
      setLiveConnected(false)
    }
  }, [mode])

  const switchMode = (m: Mode) => {
    if (m === mode) return
    setPlaying(false)
    reset()
    setStarted(m === 'live') // live: skip the launch overlay; replay: show it again
    setMode(m)
  }

  const onPlayPause = () => {
    if (done) {
      reset()
      setPlaying(true)
    } else setPlaying((p) => !p)
  }
  const onRestart = () => {
    reset()
    setPlaying(true)
  }
  const launch = () => {
    setStarted(true)
    reset()
    setPlaying(true)
  }

  if (error)
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-ink-faint">
        Couldn’t load the demo data.
      </div>
    )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-sm">
      {/* ── screen header / transport ───────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3">
        <span className="kicker text-accent">● Live Telemetry</span>
        <span className="font-mono text-xs text-ink-faint">
          {RACE_LABEL} ·{' '}
          {mode === 'live' ? (liveConnected ? 'live' : 'connecting…') : 'replay'}
        </span>
        <span className="ml-auto font-mono text-xs text-ink-soft tabular-nums">
          LAP {lap || '—'} / {timeline?.totalLaps ?? 72}
        </span>

        {/* LOCAL-ONLY: replay/live source toggle (absent from production builds) */}
        {LIVE_ENABLED && (
          <div className="flex overflow-hidden rounded-md border border-line font-mono text-xs">
            {(['replay', 'live'] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={
                  'px-2.5 py-1 transition-colors ' +
                  (mode === m
                    ? 'bg-accent-bright text-accent-contrast'
                    : 'bg-surface text-ink-soft hover:text-ink')
                }
              >
                {m === 'live' ? 'Live' : 'Replay'}
              </button>
            ))}
          </div>
        )}

        {mode === 'live' ? (
          <span className="flex items-center gap-1.5 font-mono text-xs text-ink-soft">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: liveConnected ? '#3bd16f' : '#e0533b' }}
            />
            {liveConnected ? 'CONNECTED' : 'OFFLINE'}
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPlayPause}
              className="rounded-md border border-line bg-surface px-3 py-1 font-mono text-xs text-ink transition-colors hover:bg-accent-bright hover:text-accent-contrast"
            >
              {done ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
            </button>
            <button
              onClick={onRestart}
              aria-label="Restart"
              className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors hover:text-ink"
            >
              ↺
            </button>
            <button
              onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
              className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors hover:text-ink"
            >
              {speed}×
            </button>
          </div>
        )}
      </div>

      {/* progress */}
      <div className="h-0.5 w-full bg-line">
        <div
          className="h-full bg-accent-bright transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        {/* ── latest-lap telemetry (the raw firehose) ─────────────────────── */}
        <div className="bg-surface-2 p-4">
          <div className="kicker mb-3 text-ink-faint">Latest Lap</div>
          {latest ? (
            <>
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-6 w-1 rounded"
                    style={{ background: teamColor(latest.driver) }}
                  />
                  <span className="font-mono text-2xl font-semibold text-ink">
                    {latest.driver}
                  </span>
                </div>
                <span className="font-mono text-2xl font-semibold tabular-nums text-ink">
                  {fmtLap(latest.lap_time_ms)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {(
                  [
                    ['S1', latest.sector_1_ms],
                    ['S2', latest.sector_2_ms],
                    ['S3', latest.sector_3_ms],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-line bg-surface py-2">
                    <div className="kicker text-ink-faint">{k}</div>
                    <div className="font-mono text-sm font-semibold tabular-nums text-ink-soft">
                      {fmtSec(v)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(
                  [
                    ['GAP', fmtGap(latest.gap_ahead_ms), false],
                    ['TYRE', `${latest.compound ?? '—'} · ${latest.tire_age ?? '—'}L`, true],
                    ['TRACK', latest.track_temp_c != null ? `${latest.track_temp_c.toFixed(0)}°C` : '—', false],
                    ['AIR', latest.air_temp_c != null ? `${latest.air_temp_c.toFixed(0)}°C` : '—', false],
                  ] as const
                ).map(([k, v, tyre]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2"
                  >
                    <span className="kicker text-ink-faint">{k}</span>
                    <span
                      className="font-mono text-sm tabular-nums text-ink-soft"
                      style={tyre ? { color: compoundColor(latest.compound) } : undefined}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                The raw firehose — lap time, three sector splits, tyres, gaps and temps, for
                all 20 cars every lap. A trigger engine flags only the noteworthy moments;{' '}
                <span className="text-accent">IBM Granite</span> turns each into the
                plain-English line on the right.
              </p>
            </>
          ) : (
            <div className="py-8 text-center font-mono text-sm text-ink-faint">Loading telemetry…</div>
          )}
        </div>

        {/* ── AI commentary feed (the distilled insight) ──────────────────── */}
        <div className="bg-surface-2 p-4">
          <div className="kicker mb-3 flex items-center gap-2 text-ink-faint">
            AI Commentary
            <span className="rounded bg-accent-bright/20 px-1.5 py-0.5 text-[10px] text-accent">
              IBM Granite
            </span>
          </div>
          <div className="flex flex-col gap-2" style={{ minHeight: 240 }}>
            {feed.length === 0 && (
              <div className="py-8 text-center font-mono text-sm text-ink-faint">
                Commentary fires only when the AI flags a noteworthy event.
              </div>
            )}
            {feed.map((c) => (
              <div
                key={c.id}
                className="rise rounded-lg border border-line bg-surface px-3 py-2"
                style={{ borderLeft: `3px solid ${teamColor(c.driver)}`, animationDuration: '0.45s' }}
              >
                <span
                  className="mr-2 font-mono text-xs font-semibold"
                  style={{ color: teamColor(c.driver) }}
                >
                  {c.driver}
                </span>
                <span className="mr-2 font-mono text-[10px] tracking-widest text-ink-faint">
                  {TRIGGER_LABELS[c.trigger] ?? c.trigger}
                </span>
                <span className="text-sm text-ink-soft">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-2 text-center font-mono text-[11px] text-ink-faint">
        Recorded replay · AI commentary distilled live from telemetry · runs entirely in your browser
      </div>

      {/* ── Launch overlay — frosted grey cover with a centred CTA ───────────── */}
      {!started && (
        <button
          onClick={launch}
          aria-label="Launch the interactive F1 demo"
          className="group absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(18, 22, 16, 0.55)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
        >
          <span className="flex items-center gap-2 rounded-full bg-accent-bright px-7 py-3 text-sm font-semibold text-accent-contrast shadow-xl ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-105">
            <span className="text-base leading-none">▶</span> Launch Demo
          </span>
          <span className="kicker" style={{ color: 'rgba(233, 231, 218, 0.85)' }}>
            Interactive · 2023 Dutch GP · runs in your browser
          </span>
        </button>
      )}
    </div>
  )
}
