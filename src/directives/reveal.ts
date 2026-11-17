import type {Directive} from "vue";
import {isReducedMotion} from "../composables/useMotionPresets.ts";

/**
 * v-reveal="index": fade + rise a row the first time it scrolls into view.
 *
 * Replaces the old v-motion `visibleOnce` preset, which wrote `opacity:0` into the
 * prerendered HTML, so crawlers, link previews, print and no-JS visitors saw blank
 * rows. Here:
 *  - SSR renders nothing extra: the row is visible in the static HTML.
 *  - Rows already on screen when the page mounts are left alone (no flash).
 *  - Only rows below the fold are hidden, then revealed as they enter the viewport.
 * The delay resets every GROUP rows so long lists never sit invisible for long.
 */
const GROUP = 8;
const STEP_MS = 40;
const DURATION_MS = 250;
const RISE_PX = 12;
const EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

const observed = new WeakMap<Element, IntersectionObserver>();

function show(el: HTMLElement, delay: number) {
  el.style.transition = `opacity ${DURATION_MS}ms ${EASE} ${delay}ms, transform ${DURATION_MS}ms ${EASE} ${delay}ms`;
  el.style.opacity = "1";
  el.style.transform = "none";
  // Drop the inline styles once done so hover transforms etc. behave normally.
  setTimeout(() => {
    el.style.removeProperty("transition");
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
  }, DURATION_MS + delay + 50);
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),

  mounted(el, binding) {
    if (isReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    const delay = ((binding.value ?? 0) % GROUP) * STEP_MS;
    el.style.opacity = "0";
    el.style.transform = `translateY(${RISE_PX}px)`;

    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      observed.delete(el);
      show(el, delay);
    }, {rootMargin: "0px 0px -8% 0px"});
    io.observe(el);
    observed.set(el, io);
  },

  unmounted(el) {
    observed.get(el)?.disconnect();
    observed.delete(el);
  },
};
