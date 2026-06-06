/**
 * Types + small helpers for the self-contained F1 replay demo.
 *
 * SECURITY: this demo makes exactly one network call — a fetch of its OWN
 * same-origin static recording (`/f1-demo-recording.json`). No backend, no
 * WebSocket, no external request, no secrets. The recording is pure race data
 * + AI commentary text.
 */

export type Snapshot = {
  lap_num: number
  driver: string
  lap_time_ms: number | null
  sector_1_ms: number | null
  sector_2_ms: number | null
  sector_3_ms: number | null
  compound: string | null
  tire_age: number | null
  gap_ahead_ms: number | null
  track_temp_c: number | null
  air_temp_c: number | null
}

export type CommentaryPayload = {
  trigger: string
  driver: string
  lap_num: number | null
  text: string
}

export type RecEvent =
  | { t: number; type: 'TELEMETRY_UPDATE'; payload: Snapshot }
  | { t: number; type: 'COMMENTARY_UPDATE'; payload: CommentaryPayload }
  | { t: number; type: 'RACE_FINISHED'; payload: Record<string, never> }

export type Recording = {
  meta: { track?: string; total_laps?: number; counts?: Record<string, number> }
  events: RecEvent[]
}

// Team colours by 3-letter code (2022–2026 grids); default grey.
export const TEAM_COLORS: Record<string, string> = {
  VER: '#3671C6', PER: '#3671C6',
  LEC: '#E8002D', SAI: '#E8002D', HAM: '#E8002D',
  RUS: '#27F4D2', ANT: '#27F4D2',
  NOR: '#FF8000', PIA: '#FF8000',
  ALO: '#229971', STR: '#229971',
  GAS: '#0093CC', OCO: '#0093CC', COL: '#0093CC',
  ALB: '#64C4FF', SAR: '#64C4FF',
  TSU: '#6692FF', RIC: '#6692FF', LAW: '#6692FF', HAD: '#6692FF', LIN: '#6692FF', DEV: '#6692FF',
  BOT: '#52E252', ZHO: '#52E252', BOR: '#52E252', HUL: '#52E252',
  MAG: '#B6BABD', BEA: '#B6BABD',
}
export const teamColor = (code: string) => TEAM_COLORS[code] ?? '#8b8b8b'

export const COMPOUND_COLORS: Record<string, string> = {
  SOFT: '#ff3b3b', MEDIUM: '#ffd23b', HARD: '#e8e8e8',
  INTERMEDIATE: '#3bd16f', WET: '#3b8bff',
}
export const compoundColor = (c: string | null) =>
  (c && COMPOUND_COLORS[c]) || '#8b8b8b'

export const TRIGGER_LABELS: Record<string, string> = {
  fast_lap: 'FAST LAP', slow_lap: 'SLOW LAP', sector_outlier: 'SECTOR',
  pit_anomaly: 'PIT', drs_battle: 'DRS',
}

// ── formatting (telemetry is in ms; we display human units) ──────────────────
export const fmtLap = (ms: number | null): string => {
  if (ms == null) return '—'
  const m = Math.floor(ms / 60000)
  const s = ((ms % 60000) / 1000).toFixed(3).padStart(6, '0')
  return `${m}:${s}`
}
export const fmtSec = (ms: number | null): string =>
  ms == null ? '—' : (ms / 1000).toFixed(3)
export const fmtGap = (ms: number | null): string => {
  if (ms == null) return '—'
  if (ms === 0) return 'LEADER'
  return `+${(ms / 1000).toFixed(2)}`
}
