import { usePreferredReducedMotion } from "@vueuse/core";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const STAGGER_STEP_MS = 40;
const STAGGER_GROUP_SIZE = 8;

const reducedMotion = usePreferredReducedMotion();

function isReduced() {
  return reducedMotion.value === "reduce";
}

/**
 * v-motion config for a fade + rise reveal, staggered by list index, triggered once
 * per element as it individually scrolls into view (visibleOnce). The delay resets
 * every STAGGER_GROUP_SIZE items rather than growing with the raw index: each element
 * gets its own IntersectionObserver, so a delay based on absolute list position would
 * make later rows (already scrolled well past index ~12) sit invisible for the full
 * capped delay *every time* they enter the viewport, not just on initial page load.
 */
export function fadeUpStagger(index: number, opts: { durationMs?: number; riseYPx?: number } = {}) {
  const durationMs = opts.durationMs ?? 250;
  const riseYPx = opts.riseYPx ?? 12;

  if (isReduced()) {
    return {
      initial: { opacity: 1, y: 0 },
      visibleOnce: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

  const delay = (index % STAGGER_GROUP_SIZE) * STAGGER_STEP_MS;

  return {
    initial: { opacity: 0, y: riseYPx },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: durationMs, ease: EASE_OUT_QUART },
    },
  };
}

/** One-shot fade + rise for a single hero-style element, with an explicit delay in ms. */
export function fadeUpOnce(delayMs = 0, opts: { durationMs?: number; riseYPx?: number } = {}) {
  const durationMs = opts.durationMs ?? 300;
  const riseYPx = opts.riseYPx ?? 16;

  if (isReduced()) {
    return {
      initial: { opacity: 1, y: 0 },
      enter: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

  return {
    initial: { opacity: 0, y: riseYPx },
    enter: { opacity: 1, y: 0, transition: { delay: delayMs, duration: durationMs, ease: EASE_OUT_QUART } },
  };
}

/** Scale + fade for menu/icon-grid stagger (app-launcher style). */
export function scaleInStagger(index: number, opts: { durationMs?: number } = {}) {
  const durationMs = opts.durationMs ?? 180;

  if (isReduced()) {
    return {
      initial: { opacity: 1, scale: 1 },
      enter: { opacity: 1, scale: 1, transition: { duration: 0 } },
    };
  }

  const delay = Math.min(index * 30, 300);

  return {
    initial: { opacity: 0, scale: 0.92 },
    enter: { opacity: 1, scale: 1, transition: { delay, duration: durationMs, ease: EASE_OUT_QUART } },
  };
}

export { isReduced as isReducedMotion };
