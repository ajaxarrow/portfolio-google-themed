<script setup lang="ts">
import {fadeUpOnce} from "../composables/useMotionPresets.ts";

// Letters borrow the search-engine palette on purpose; the closing dot does not.
// It is a blinking text caret in plain ink: the one letter that is not on loan.
const props = defineProps<{ reveal?: boolean }>();

const letters = [
  {char: 'j', tone: 'text-googleblue'},
  {char: 'i', tone: 'text-googlered'},
  {char: 'u', tone: 'text-googlegreen'},
  {char: 'a', tone: 'text-googleyellow'},
  {char: 'x', tone: 'text-googleblue'},
  {char: 'l', tone: 'text-googlered'},
  {char: '.', tone: 'wordmark-caret'},
];

const motionFor = (index: number) =>
  props.reveal ? fadeUpOnce(index * 45, {durationMs: 260, riseYPx: 10}) : undefined;
</script>

<template>
  <span class="wordmark" role="img" aria-label="jiuaxl">
    <span
        v-for="(letter, index) in letters"
        :key="index"
        aria-hidden="true"
        :class="letter.tone"
        v-motion="motionFor(index)"
    >{{ letter.char }}</span>
  </span>
</template>

<style scoped>
.wordmark{
  display: inline-block;
}

.wordmark-caret{
  color: var(--ink);
  animation: caret-blink 1.1s steps(1, end) infinite;
}

@keyframes caret-blink{
  0%, 55%{ opacity: 1; }
  56%, 100%{ opacity: 0; }
}

@media (prefers-reduced-motion: reduce){
  .wordmark-caret{
    animation: none;
  }
}
</style>
