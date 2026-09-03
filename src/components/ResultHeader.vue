<script setup lang="ts">
const props = defineProps({
  results: {
    type: Number,
    required: true,
  },
});

const getRandomSeconds = (): string => {
  const randomSeconds = Math.random() * (0.90 - 0.01) + 0.01;
  return randomSeconds.toFixed(2);
};
</script>

<template>
  <p>About {{ props.results }} results ({{ getRandomSeconds() }} seconds)</p>
</template>

<style scoped>

  p{
    color: var(--meta);
    font-size: 14px;
  }
</style>
