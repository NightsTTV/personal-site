/**
 * Phase 4 — LIVE mode source (LOCAL DEV ONLY).
 *
 * Opens a WebSocket to the running f1-app backend and forwards its messages.
 *
 * SECURITY: this module is only ever imported when `VITE_F1_LIVE === 'true'`,
 * a build-time flag that is ABSENT from production builds. Because the import is
 * dynamic and guarded by that constant, Vite tree-shakes this file out of the
 * public bundle entirely — the deployed site can never open a socket. It also
 * carries no secrets: only a public backend URL is ever used (never an API key).
 */
import type { Snapshot, CommentaryPayload } from './types'

export type LiveHandlers = {
  onTelemetry: (s: Snapshot) => void
  onCommentary: (c: CommentaryPayload) => void
  onStatus: (connected: boolean) => void
}

/** Connect to the backend's /ws/race; returns a disconnect function. */
export function connectLive(apiBase: string, h: LiveHandlers): () => void {
  const wsUrl = apiBase.replace(/^http/, 'ws') + '/ws/race'
  let ws: WebSocket | null = null
  let closed = false
  let retry: ReturnType<typeof setTimeout> | null = null

  const open = () => {
    ws = new WebSocket(wsUrl)
    ws.onopen = () => h.onStatus(true)
    ws.onclose = () => {
      h.onStatus(false)
      if (!closed) retry = setTimeout(open, 1500) // auto-reconnect
    }
    ws.onerror = () => ws?.close()
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        if (msg.type === 'TELEMETRY_UPDATE') h.onTelemetry(msg.payload)
        else if (msg.type === 'COMMENTARY_UPDATE') h.onCommentary(msg.payload)
      } catch {
        /* ignore malformed frame */
      }
    }
  }
  open()

  return () => {
    closed = true
    if (retry) clearTimeout(retry)
    ws?.close()
  }
}
