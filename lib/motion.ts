import type { CSSProperties } from "react";

/** Avenor motion tokens (AGENTS.md §6.2). Durations in seconds, distances in px. */
export const motionTokens = {
  duration: {
    instant: 0.12,
    fast: 0.2,
    normal: 0.35,
    smooth: 0.55,
    reveal: 0.8,
    cinematic: 1.2,
  },

  easing: {
    standard: [0.22, 1, 0.36, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
    linear: [0, 0, 1, 1],
  },

  distance: {
    small: 12,
    medium: 24,
    large: 48,
  },
} as const;

export type MotionTokens = typeof motionTokens;

/** Inline style for a staggered `[data-reveal]` item (80ms per step, capped in CSS). */
export function revealIndex(index: number): CSSProperties {
  return { "--reveal-index": index } as CSSProperties;
}

/** Inline style that delays one step of the hero entrance. */
export function heroDelay(ms: number): CSSProperties {
  return { "--hero-delay": `${ms}ms` } as CSSProperties;
}
