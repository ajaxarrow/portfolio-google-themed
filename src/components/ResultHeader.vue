<script setup lang="ts">
const props = defineProps({
  results: {
    type: Number,
    required: true,
  },
});

// Stable per result count: the same page always reports the same "time", so the joke
// doesn't jitter on static data between visits or re-renders.
const seconds = ((props.results * 37) % 89 + 11) / 100;
</script>

<template>
  <p>About {{ props.results }} results ({{ seconds.toFixed(2) }} seconds)</p>
</template>

<style scoped>

  p{
    color: var(--meta);
    font-size: 14px;
  }
</style>
