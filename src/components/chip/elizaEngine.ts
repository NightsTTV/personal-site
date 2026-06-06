/* ------------------------------------------------------------------ *
 * CHIP engine — a small ELIZA-style transform loop
 * ------------------------------------------------------------------
 * Faithful in spirit to Weizenbaum's design (and to Kaspian's Python
 * CHIP): rank the keyword rules, pick the highest-ranked rule whose
 * decomposition matches, and return one of its reassemblies. Responses
 * are cycled (not pure-random) so a visitor doesn't see repeats, and a
 * tiny memory of recent rules keeps the chat from looping.
 * ------------------------------------------------------------------ */

import {
  chipFinals,
  chipInitials,
  chipQuits,
  chipReflections,
  chipRules,
  type ChipRule,
} from '../../data/chipKnowledge'

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/** Swap first/second-person phrasing back at the visitor (ELIZA's trick). */
export function reflect(text: string): string {
  const keys = Object.keys(chipReflections).sort((a, b) => b.length - a.length)
  let out = text.toLowerCase()
  for (const key of keys) {
    const pattern = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')
    out = out.replace(pattern, chipReflections[key])
  }
  return out
}

export class ChipBot {
  /** Tracks which reassembly index each rule should serve next (cycling). */
  private cursors = new Map<string, number>()
  /** Last few rule ids, to avoid immediate repetition on the fallback. */
  private recent: string[] = []
  /** True once the visitor has said a quit phrase. */
  quit = false

  private sortedRules: ChipRule[] = [...chipRules].sort((a, b) => b.rank - a.rank)

  getInitial(): string {
    return pick(chipInitials)
  }

  getFinal(): string {
    return pick(chipFinals)
  }

  reset(): void {
    this.cursors.clear()
    this.recent = []
    this.quit = false
  }

  private nextResponse(rule: ChipRule): string {
    const i = this.cursors.get(rule.id) ?? Math.floor(Math.random() * rule.responses.length)
    this.cursors.set(rule.id, (i + 1) % rule.responses.length)
    this.recent = [rule.id, ...this.recent].slice(0, 4)
    return rule.responses[i]
  }

  /** Main entry — mirrors ElizaBot.transform(). */
  transform(input: string): string {
    const text = input.trim()
    if (!text) {
      return 'Give me a few words to work with — ask about Kaspian’s school, projects, or anything else.'
    }

    if (chipQuits.some((q) => new RegExp(`\\b${q}\\b`, 'i').test(text))) {
      this.quit = true
      return this.getFinal()
    }

    for (const rule of this.sortedRules) {
      if (rule.id === 'xnone') continue
      if (rule.patterns.some((p) => p.test(text))) {
        return this.nextResponse(rule)
      }
    }

    const fallback = this.sortedRules.find((r) => r.id === 'xnone')
    return fallback ? this.nextResponse(fallback) : 'I am at a loss for words.'
  }
}
