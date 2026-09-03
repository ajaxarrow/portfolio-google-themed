import {onMounted, onUnmounted} from 'vue';

/** Watches the global keydown stream for a specific sequence (e.g. the Konami
 *  code) and calls onMatch when the full sequence is typed in order. The
 *  rolling buffer resets if too much time passes between keystrokes, so a
 *  stray sequence typed slowly across unrelated actions never accidentally
 *  accumulates into a match. */
export function useKeySequence(sequence: string[], onMatch: () => void, opts?: { resetTimeoutMs?: number }) {
  const resetTimeoutMs = opts?.resetTimeoutMs ?? 2000;
  let buffer: string[] = [];
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  function handleKeydown(event: KeyboardEvent) {
    clearTimeout(resetTimer);
    buffer.push(event.key);
    if (buffer.length > sequence.length) {
      buffer = buffer.slice(-sequence.length);
    }
    if (buffer.length === sequence.length && buffer.every((key, i) => key === sequence[i])) {
      buffer = [];
      onMatch();
      return;
    }
    resetTimer = setTimeout(() => {
      buffer = [];
    }, resetTimeoutMs);
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    clearTimeout(resetTimer);
  });
}
