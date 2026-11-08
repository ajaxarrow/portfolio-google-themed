<script setup lang="ts">
import EasterEggHost from "./components/EasterEggHost.vue";
import {useEasterEggs, KONAMI_SEQUENCE} from "./composables/useEasterEggs.ts";
import {useKeySequence} from "./composables/useKeySequence.ts";
import {useRouteHead} from "./seo/useRouteHead.ts";

useRouteHead();
const {triggerById} = useEasterEggs();
useKeySequence(KONAMI_SEQUENCE, () => triggerById('konami-note'));
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <EasterEggHost/>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
