<script setup lang="ts">
import {watch} from 'vue';
import {useEasterEggs} from '../composables/useEasterEggs.ts';

const {toastMessage, toastVisible, pendingEgg, triggerToken} = useEasterEggs();

watch(triggerToken, () => {
  const egg = pendingEgg.value;
  if (!egg || egg.kind !== 'transform' || !egg.className) return;

  const root = document.documentElement;
  const className = egg.className;

  // Force a reflow between remove/add so a rapid re-trigger restarts the
  // animation instead of being a no-op (the class would otherwise already be present).
  root.classList.remove(className);
  void root.offsetWidth;
  root.classList.add(className);

  const cleanup = () => root.classList.remove(className);
  root.addEventListener('animationend', cleanup, {once: true});
});
</script>

<template>
  <VSnackbar v-model="toastVisible" location="bottom" timeout="2500">
    {{ toastMessage }}
  </VSnackbar>
</template>
