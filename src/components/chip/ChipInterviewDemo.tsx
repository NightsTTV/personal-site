import React, { useEffect, useRef, useState } from 'react';
import {
  getNextStateAndReply,
  INITIAL_STATE,
} from './chipInterviewEngine';
import type { InterviewState } from './chipInterviewEngine';

interface Msg {
  id: number;
  from: 'chip' | 'you';
  text: string;
  timestamp: string;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="CHIP is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="chip-dot h-1.5 w-1.5 rounded-full bg-ink-faint"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

export function ChipInterviewDemo() {
  const [started, setStarted] = useState(false);
  const [engineState, setEngineState] = useState<InterviewState>(INITIAL_STATE);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize messages when starting the demo
  const initDemo = () => {
    setEngineState(INITIAL_STATE);
    nextId.current = 0;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setMessages([
      {
        id: nextId.current++,
        from: 'chip',
        text: 'Hello! You can call me Sr. Professor Dev CHIP!',
        timestamp: now,
      },
      {
        id: nextId.current++,
        from: 'chip',
        text: 'I’m here for a practice technical interview.',
        timestamp: now,
      },
      {
        id: nextId.current++,
        from: 'chip',
        text: "Press Send or type anything when you're ready...",
        timestamp: now,
      },
    ]);
  };

  const launch = () => {
    setStarted(true);
    initDemo();
  };

  const handleRestart = () => {
    initDemo();
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    setIsTyping(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Keep latest message in view
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Append user message
    setMessages((prev) => [
      ...prev,
      {
        id: nextId.current++,
        from: 'you',
        text: trimmed,
        timestamp,
      },
    ]);
    setInputValue('');
    setIsTyping(true);

    // Call state machine
    const { reply, nextState } = getNextStateAndReply(trimmed, engineState);

    // Dynamic typing delay based on reply length to feel realistic
    const delay = 450 + Math.min(1000, reply.length * 8);

    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
      setEngineState(nextState);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          from: 'chip',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        },
      ]);
    }, delay);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const suggestions = (() => {
    if (engineState.phase === 'intro') {
      return ['Ready! Let\'s go.'];
    }
    if (engineState.phase === 'rating') {
      return ['10', '8', '5', '3'];
    }
    if (engineState.phase === 'language') {
      return ['Python', 'Java'];
    }
    if (engineState.phase === 'interview') {
      return ['Strings', 'Loops', 'Explain inheritance', 'What is recursion?', 'exit'];
    }
    if (engineState.phase === 'exit') {
      return [];
    }
    return [];
  })();

  const phaseNames = {
    intro: '01. Introduction',
    name: '02. Collect Name',
    rating: '03. Git / Sockets Rating',
    language: '04. Language Selection',
    interview: '05. Technical Q&A',
    exit: '06. Completed / Exit',
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3 bg-surface-2">
        <span className="kicker text-accent flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
          ● Interactive Demo
        </span>
        <span className="font-mono text-xs text-ink-faint">
          CHIP · Technical Interview Bot
        </span>
        
        {started && (
          <button
            onClick={handleRestart}
            className="ml-auto rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft hover:bg-surface-3 hover:text-ink transition-colors"
          >
            ↺ Restart
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        
        {/* Left Column: Chat Window */}
        <div className="bg-surface-2 flex flex-col h-[480px]">
          <div className="border-b border-line px-4 py-2 bg-surface-2/50 flex justify-between items-center shrink-0">
            <span className="kicker text-[10px] tracking-wider text-ink-faint">Console Session</span>
            <span className="font-mono text-[10px] text-ink-faint">
              STATUS: {engineState.phase.toUpperCase()}
            </span>
          </div>

          {/* Scrolling Chat Logs */}
          <div
            ref={logRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 font-sans"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.from === 'you' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={
                    m.from === 'you'
                      ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent-bright px-3.5 py-2.5 text-sm leading-relaxed text-accent-contrast shadow-sm'
                      : 'max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft shadow-sm'
                  }
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="mt-1 font-mono text-[9px] text-ink-faint px-1">
                  {m.from === 'you' ? 'You' : 'CHIP'} · {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2 shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions / Bubbles */}
          {started && suggestions.length > 0 && !isTyping && (
            <div className="px-4 py-1.5 bg-surface-2 border-t border-line/30 flex flex-wrap gap-1.5 shrink-0">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="rounded-full border border-line-strong bg-surface px-2.5 py-1 font-mono text-[10px] text-ink-soft hover:border-accent hover:text-accent hover:bg-surface-3 transition duration-150"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={onSubmit}
            className="border-t border-line bg-surface-2 p-3 flex gap-2 items-center shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!started || isTyping || engineState.phase === 'exit'}
              placeholder={
                !started
                  ? 'Launch the demo to start chatting...'
                  : engineState.phase === 'exit'
                  ? 'Interview completed.'
                  : 'Type your message...'
              }
              aria-label="Interview input field"
              className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none disabled:bg-surface-3 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!started || !inputValue.trim() || isTyping || engineState.phase === 'exit'}
              aria-label="Submit message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-bright text-accent-contrast transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Column: Engine Internals */}
        <div className="bg-surface-2 p-4 flex flex-col h-[480px] overflow-y-auto border-t md:border-t-0 md:border-l border-line">
          <div className="kicker mb-3 text-ink-faint">Engine State Panel</div>

          {/* Variables Table */}
          <div className="space-y-3 font-mono text-xs flex-1">
            <div className="rounded-lg border border-line bg-surface p-3 space-y-2.5">
              <div className="flex justify-between items-center pb-1.5 border-b border-line/60">
                <span className="text-ink-faint">VARIABLE</span>
                <span className="text-ink-faint text-right">VALUE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">state.name</span>
                <span className={engineState.name ? 'text-accent' : 'text-ink-faint'}>
                  {engineState.name ? `"${engineState.name}"` : 'null'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">state.comfortRating</span>
                <span className={engineState.comfortRating !== null ? 'text-accent' : 'text-ink-faint'}>
                  {engineState.comfortRating !== null ? `${engineState.comfortRating} / 10` : 'null'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">state.language</span>
                <span className={engineState.language ? 'text-accent font-semibold' : 'text-ink-faint'}>
                  {engineState.language ? engineState.language.toUpperCase() : 'null'}
                </span>
              </div>
            </div>

            {/* Phase Stepper */}
            <div className="rounded-lg border border-line bg-surface p-3 space-y-2">
              <div className="kicker text-[10px] text-ink-faint mb-2">Interview Stages</div>
              {Object.entries(phaseNames).map(([key, name]) => {
                const isActive = engineState.phase === key;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                      isActive ? 'bg-accent/10 border-l-2 border-accent text-ink font-semibold' : 'text-ink-faint'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-accent' : 'bg-line-strong'}`} />
                    <span>{name}</span>
                  </div>
                );
              })}
            </div>

            {/* Pattern Matching Inspection */}
            <div className="rounded-lg border border-line bg-surface p-3 space-y-2">
              <div className="kicker text-[10px] text-ink-faint">Pattern Analyzer</div>
              
              <div>
                <span className="text-ink-faint block text-[10px] uppercase">Last Detected Pattern:</span>
                <div className="mt-1 bg-surface-2 p-2 rounded border border-line font-mono text-[11px] text-ink-soft break-all select-all min-h-[32px] flex items-center">
                  {engineState.detectedPattern ? (
                    <span className="text-accent">{engineState.detectedPattern}</span>
                  ) : (
                    <span className="text-ink-faint italic">No regex matches found in last turn</span>
                  )}
                </div>
              </div>

              <div className="pt-1.5">
                <span className="text-ink-faint block text-[10px] uppercase">Fallback Selection:</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${
                    engineState.fallbackType === 'reflection' 
                      ? 'bg-accent-bright/10 border-accent/30 text-accent font-medium' 
                      : 'bg-surface-2 border-line text-ink-faint'
                  }`}>
                    Eliza Reflection (50%)
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${
                    engineState.fallbackType === 'technical' 
                      ? 'bg-accent-bright/10 border-accent/30 text-accent font-medium' 
                      : 'bg-surface-2 border-line text-ink-faint'
                  }`}>
                    Random Q + Transition (50%)
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-line font-sans text-xs text-ink-faint leading-normal">
            CHIP utilizes a state machine coupled with regular expression checks. If no matching keyword is found in the user prompt, the engine triggers a coin flip to either run ELIZA-style grammatical reflection, or select a new technical question with a conversational bridge.
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-line px-4 py-2.5 text-center font-mono text-[11px] text-ink-faint bg-surface-2">
        Pattern-matching engine · runs entirely in your browser
      </div>

      {/* Launch overlay */}
      {!started && (
        <button
          onClick={launch}
          aria-label="Launch the interactive CHIP demo"
          className="group absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-4 bg-surface-2/80 backdrop-blur-[3px] transition duration-200"
          style={{ background: 'rgba(18, 22, 16, 0.6)' }}
        >
          <span className="flex items-center gap-2 rounded-full bg-accent-bright px-7 py-3 text-sm font-semibold text-accent-contrast shadow-xl ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-105">
            <span className="text-base leading-none">▶</span> Launch Demo
          </span>
          <span className="kicker text-[11px]" style={{ color: 'rgba(233, 231, 218, 0.85)' }}>
            Interactive Practice Tech Interview · Runs in your browser
          </span>
        </button>
      )}
    </div>
  );
}
