<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  /** Eager + high priority for above-the-fold images (LCP). Lazy otherwise. */
  priority?: boolean;
  fit?: "cover" | "contain";
  /** Reserve space before the image arrives, e.g. "16 / 9". Skip when the parent already sizes the box. */
  ratio?: string;
  /** Static width/height so the browser can reserve layout before load. */
  width?: number;
  height?: number;
}>(), {fit: "cover"});

const emit = defineEmits<{ (e: "loaded"): void }>();

const loaded = ref(false);
const failed = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);

function onLoad() {
  loaded.value = true;
  emit("loaded");
}

function onError() {
  // Stop the shimmer forever-looping on a broken image; show the quiet empty tile instead.
  failed.value = true;
}

// The prerendered HTML ships the <img>; it can finish loading before Vue hydrates and
// attaches @load. Without this check such an image stays at opacity 0 behind the shimmer.
function syncFromDom() {
  const el = imgEl.value;
  if (el?.complete) {
    if (el.naturalWidth > 0) onLoad();
    else onError();
  }
}

onMounted(syncFromDom);
watch(() => props.src, () => {
  loaded.value = false;
  failed.value = false;
  // A swapped src may already be in the HTTP cache and complete synchronously.
  queueMicrotask(syncFromDom);
});
</script>

<template>
  <div class="skeleton-image-wrap" :style="ratio ? {aspectRatio: ratio} : undefined" :aria-busy="!loaded && !failed">
    <div v-if="!loaded" class="skeleton-image-shimmer" :class="{'skeleton-image-shimmer--idle': failed}"></div>
    <img
        v-if="src"
        ref="imgEl"
        :src="src"
        :alt="alt ?? ''"
        class="skeleton-image"
        :class="{ 'skeleton-image--visible': loaded }"
        :style="{objectFit: fit}"
        :width="width"
        :height="height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : undefined"
        decoding="async"
        @load="onLoad"
        @error="onError"
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

.skeleton-image-shimmer--idle{
  animation: none;
  background: var(--grey-100);
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
  display: block;
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out-quart);
}

.skeleton-image--visible{
  opacity: 1;
}
</style>
