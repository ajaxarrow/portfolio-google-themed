import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Inertial page scrolling (Lenis). The wheel eases toward its target instead of
 * jumping in steps; touch devices keep their native momentum. Off entirely when the
 * visitor prefers reduced motion (Lenis respects that on its own).
 *
 * One instance for the whole app, created on the client only (the site is prerendered).
 */
let lenis: Lenis | null = null;
let rafId = 0;
let lockObserver: MutationObserver | null = null;

export function getLenis() {
  return lenis;
}

/** Something else (Lightbox, a Vuetify dialog) locked the page: pause, then resume. */
function syncWithScrollLock() {
  if (!lenis) return;
  const html = document.documentElement;
  const locked =
    html.classList.contains('v-overlay-scroll-blocked') ||
    document.body.style.overflow === 'hidden';
  if (locked && !lenis.isStopped) lenis.stop();
  else if (!locked && lenis.isStopped) lenis.start();
}

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    // Scrollable panels inside the page (TOC, carousels, dialogs) scroll on their own.
    allowNestedScroll: true,
    // Hash links are handled by the router (and CaseStudiesView), which call scrollPageTo.
    anchors: false,
    // Leaving for another page drops leftover momentum so the new page starts at the top.
    stopInertiaOnNavigate: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lockObserver = new MutationObserver(syncWithScrollLock);
  lockObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
  lockObserver.observe(document.body, {attributes: true, attributeFilter: ['style']});

  return lenis;
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId);
  lockObserver?.disconnect();
  lenis?.destroy();
  lenis = null;
}

/**
 * Scroll the page to an element or y position, through Lenis when it is running
 * so programmatic jumps use the same easing as the wheel.
 */
export function scrollPageTo(target: HTMLElement | number, opts: {smooth?: boolean} = {}) {
  const smooth = opts.smooth ?? true;
  if (lenis) {
    lenis.scrollTo(target, {immediate: !smooth, force: true});
    return;
  }
  const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';
  if (typeof target === 'number') window.scrollTo({top: target, behavior});
  else target.scrollIntoView({block: 'start', behavior});
}
