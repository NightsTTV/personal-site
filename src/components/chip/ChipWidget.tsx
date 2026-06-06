import { useEffect, useRef, useState } from 'react'
import { chipSuggestions } from '../../data/chipKnowledge'
import { ChipBot } from './elizaEngine'

type Msg = { id: number; from: 'chip' | 'you'; text: string }

/** Small terminal-cursor monogram for kaspiBOT's avatar. */
function ChipMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 16h7" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="kaspiBOT is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="chip-dot h-1.5 w-1.5 rounded-full bg-ink-faint"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  )
}

export function ChipWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  // Stable bot instance for the component's lifetime.
  const [bot] = useState(() => new ChipBot())
  // 0 = peeking over the wall · 1 = fully popped out (driven by mouse closeness).
  const [proximity, setProximity] = useState(0)
  const nextId = useRef(0)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const charRef = useRef<HTMLDivElement>(null)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const addMsg = (from: Msg['from'], text: string) => {
    setMessages((prev) => [...prev, { id: nextId.current++, from, text }])
  }

  // Seed kaspiBOT's greeting the first time the window opens, then focus input.
  useEffect(() => {
    if (open && messages.length === 0) {
      addMsg('chip', bot.getInitial())
    }
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 160)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the latest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current)
  }, [])

  // Mouse-closeness → pop-out. The nearer the cursor gets to the mascot,
  // the more he rises out from behind the kaspiBOT "wall".
  useEffect(() => {
    if (open) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const el = charRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ax = r.left + r.width / 2
      const ay = r.bottom - r.height * 0.45 // roughly his peeking head
      const dist = Math.hypot(e.clientX - ax, e.clientY - ay)
      const near = 80 // fully out within this radius
      const far = 440 // back to peeking beyond this radius
      const p = Math.min(1, Math.max(0, 1 - (dist - near) / (far - near)))
      setProximity((prev) => (Math.abs(prev - p) < 0.01 ? prev : p))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [open])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || typing) return
    addMsg('you', text)
    setInput('')
    setTyping(true)
    const reply = bot.transform(text)
    const delay = 420 + Math.min(900, reply.length * 12)
    typingTimer.current = setTimeout(() => {
      setTyping(false)
      addMsg('chip', reply)
    }, delay)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  // Toggle the chat; reset the mascot to "peeking" whenever we open it.
  const toggleChat = () => {
    const next = !open
    setOpen(next)
    if (next) setProximity(0)
  }

  // Only surface quick replies until the visitor sends their first message.
  const showSuggestions = open && messages.filter((m) => m.from === 'you').length === 0 && !typing

  // Crossfade the peeking mascot into the full-body "popped out" pose.
  const p = proximity
  const peekStyle: React.CSSProperties = {
    opacity: Math.max(0, 1 - p * 1.3),
    transform: `translateX(-50%) translateY(${(-p * 28).toFixed(1)}px)`,
  }
  const fullStyle: React.CSSProperties = {
    opacity: Math.min(1, Math.max(0, (p - 0.12) * 1.4)),
    transform: `translateX(-50%) translateY(${((1 - p) * 74).toFixed(1)}px) scale(${(0.94 + p * 0.06).toFixed(3)})`,
  }
  const hideBrokenImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none'
  }

  /* ---- pill geometry ------------------------------------------------- */
  // Height of the pill bar itself (used to position mascot on top).
  const pillH = 44 // px – matches py-2.5 + content
  // The mascot container sits above the pill so his feet rest on it.
  // We nudge him down a few px so the shoe soles overlap the pill top edge.
  const mascotOverlap = 6 // px the mascot descends into the pill

  return (
    <>
      {/* Mascot peeking / popped-out — sits on top of the pill */}
      {!open && (
        <div
          ref={charRef}
          aria-hidden="true"
          className="pointer-events-none fixed z-[59] select-none"
          style={{
            /* Centre the mascot container over the pill */
            left: 24,
            bottom: pillH + 12 - mascotOverlap, // 12 = pill bottom offset
            width: 160,
            height: 200,
          }}
        >
          <img
            src="/kaspibot/full.png"
            alt=""
            onError={hideBrokenImg}
            className="kaspibot-sprite absolute bottom-0 left-1/2 w-[120px] drop-shadow-[0_8px_18px_rgb(0_0_0/0.25)]"
            style={fullStyle}
          />
          <img
            src="/kaspibot/peek.png"
            alt=""
            onError={hideBrokenImg}
            className="kaspibot-sprite absolute bottom-0 left-1/2 w-[150px] drop-shadow-[0_6px_12px_rgb(0_0_0/0.2)]"
            style={peekStyle}
          />
        </div>
      )}

      {/* Pop-up chat window — anchored above the pill, left-aligned */}
      {open && (
        <div
          className="pointer-events-none fixed z-[60]"
          style={{ left: 16, bottom: pillH + 12 + 8 }}
        >
          <div
            role="dialog"
            aria-label="Chat with kaspiBOT about Kaspian"
            className="chip-panel pointer-events-auto flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_70px_-12px_rgb(0_0_0/0.4)]"
            style={{ height: 'min(32rem, calc(100vh - 9rem))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-bright text-accent-contrast">
                <ChipMark className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold leading-tight text-ink">kaspiBOT</p>
                <p className="kicker text-[0.6rem] tracking-[0.18em] text-ink-faint">
                  Ask me about Kaspian
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto rounded-lg p-1.5 text-ink-faint transition hover:bg-surface hover:text-ink"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message log */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={
                      m.from === 'you'
                        ? 'max-w-[82%] rounded-2xl rounded-br-sm bg-accent-bright px-3.5 py-2 text-sm leading-relaxed text-accent-contrast'
                        : 'max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2 text-sm leading-relaxed text-ink-soft'
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2">
                    <TypingDots />
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chipSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line-strong bg-surface px-3 py-1.5 font-mono text-[0.7rem] text-ink-soft transition hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-line bg-surface-2 px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kaspian…"
                aria-label="Type your question for kaspiBOT"
                className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-bright text-accent-contrast transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Compact oval pill launcher — pinned bottom-left, capped at 1/8 screen */}
      <button
        type="button"
        onClick={toggleChat}
        aria-expanded={open}
        aria-label={open ? 'Close kaspiBOT chat' : 'Open kaspiBOT chat'}
        className="chip-pill fixed bottom-3 left-4 z-[60] flex items-center gap-2 rounded-full border border-line bg-surface-2/95 px-4 py-2.5 shadow-lg backdrop-blur-xl transition-all hover:bg-surface-2 hover:shadow-xl"
        style={{ maxWidth: 'max(12.5vw, 160px)' }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-bright text-accent-contrast">
          <ChipMark className="h-4 w-4" />
        </span>
        <span className="truncate font-display text-xs font-semibold tracking-tight text-ink">
          kaspiBOT
        </span>
        <svg
          className={`ml-auto h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
        </svg>
      </button>
    </>
  )
}
