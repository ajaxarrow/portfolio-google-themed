import {ref} from 'vue';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Light / dark theme. The first paint is set by the inline script in index.html
 * (saved choice, else the system setting) so the page never flashes the wrong theme;
 * this module reads that back, keeps following the system until the visitor picks
 * one, and remembers the pick.
 */
const theme = ref<Theme>('light');
let initialised = false;

function readSaved(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function apply(next: Theme) {
  theme.value = next;
  const html = document.documentElement;
  html.dataset.theme = next;
  html.style.colorScheme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#202124' : '#ffffff');
}

export function initTheme() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;

  const system = window.matchMedia('(prefers-color-scheme: dark)');
  apply(readSaved() ?? (system.matches ? 'dark' : 'light'));
  system.addEventListener('change', (e) => {
    if (!readSaved()) apply(e.matches ? 'dark' : 'light');
  });
}

export function useTheme() {
  function toggleTheme() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the choice lasts for this page view only */
    }
  }
  return {theme, toggleTheme};
}
