<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  src?: string;
  alt?: string;
}>();

const loaded = ref(false);

function onLoad() {
  loaded.value = true;
}
</script>

<template>
  <div class="skeleton-image-wrap">
    <div v-if="!loaded" class="skeleton-image-shimmer"></div>
    <img
        v-if="src"
        :src="src"
        :alt="alt ?? ''"
        class="skeleton-image"
        :class="{ 'skeleton-image--visible': loaded }"
        loading="lazy"
        decoding="async"
        @load="onLoad"
    />
  </div>
</template>

<style scoped>
.skeleton-image-wrap{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
}

.skeleton-image-shimmer{
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(100deg, var(--grey-100) 30%, var(--grey-200) 45%, var(--grey-100) 60%);
  background-size: 300% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

@keyframes skeleton-shimmer{
  0%{ background-position: 200% 0; }
  100%{ background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce){
  .skeleton-image-shimmer{
    animation: none;
  }
}

.skeleton-image{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out-quart);
}

.skeleton-image--visible{
  opacity: 1;
}
</style>
