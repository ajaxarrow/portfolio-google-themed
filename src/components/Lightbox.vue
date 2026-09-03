<script setup lang="ts">
import {PropType, computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {PhCaretLeft, PhCaretRight, PhX} from "@phosphor-icons/vue";
import {SearchItem} from "../interfaces/link.interface.ts";
import {isArticleItem} from "../utils/entries.ts";
import {scaleInStagger} from "../composables/useMotionPresets.ts";

const props = defineProps({
  modelValue: {type: Boolean, required: true},
  images: {type: Array as PropType<string[]>, required: true},
  startIndex: {type: Number, default: 0},
  item: {type: Object as PropType<SearchItem>, default: undefined},
})

const emit = defineEmits(['update:modelValue']);

const currentIndex = ref(props.startIndex);
const panelMotion = scaleInStagger(0);
const backdropRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

watch(() => props.startIndex, (value) => {
  currentIndex.value = value;
});

const isArticle = computed(() => isArticleItem(props.item));

function close() {
  emit('update:modelValue', false);
}

function next() {
  if (!props.images.length) return;
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prev() {
  if (!props.images.length) return;
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}

function getFocusableEls(): HTMLElement[] {
  if (!backdropRef.value) return [];
  return Array.from(
      backdropRef.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  );
}

function trapFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab') return;
  const focusable = getFocusableEls();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.modelValue) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowRight') next();
  if (event.key === 'ArrowLeft') prev();
  trapFocus(event);
}

// immediate: true because the parent mounts this component via v-if already
// set to modelValue=true on first open, so there's no false-to-true transition
// to observe on that first render — without it, the very first open of a
// session would skip the focus-in entirely.
watch(() => props.modelValue, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement;
    nextTick(() => closeButtonRef.value?.focus());
  } else {
    previouslyFocused?.focus();
    previouslyFocused = null;
  }
}, {immediate: true});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <div
        v-if="modelValue"
        ref="backdropRef"
        class="lightbox-backdrop"
        @click.self="close"
    >
      <button ref="closeButtonRef" class="lightbox-close" @click="close" aria-label="Close">
        <PhX size="24" color="var(--surface)"/>
      </button>
      <div class="lightbox-panel" v-motion="panelMotion">
        <div class="lightbox-image-wrap">
          <button v-if="images.length > 1" class="lightbox-nav lightbox-nav-prev" @click="prev" aria-label="Previous photo">
            <PhCaretLeft size="20"/>
          </button>
          <img :src="images[currentIndex]" class="lightbox-image" :alt="item?.title ?? ''"/>
          <button v-if="images.length > 1" class="lightbox-nav lightbox-nav-next" @click="next" aria-label="Next photo">
            <PhCaretRight size="20"/>
          </button>
        </div>
        <div class="lightbox-meta" v-if="item">
          <p class="lightbox-title">{{ item.title }}</p>
          <p v-if="item.date" class="lightbox-date">{{ item.date }}</p>
          <p class="lightbox-description">{{ item.description }}</p>
          <RouterLink v-if="isArticle" :to="`/article/${item.id}`" class="lightbox-link" @click="close">Read the article</RouterLink>
          <a v-else :href="item.link" target="_blank" rel="noopener noreferrer" class="lightbox-link">View source</a>
        </div>
        <div class="related-strip" v-if="images.length > 1">
          <img
              v-for="(src, i) in images"
              :key="src"
              :src="src"
              class="related-thumb"
              :class="{ active: i === currentIndex }"
              role="button"
              tabindex="0"
              :aria-label="`View photo ${i + 1} of ${images.length}`"
              :aria-current="i === currentIndex"
              v-motion="scaleInStagger(i)"
              @click="currentIndex = i"
              @keydown.enter="currentIndex = i"
              @keydown.space.prevent="currentIndex = i"
              :alt="item?.title ? `${item.title} - photo ${i + 1}` : ''"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox-backdrop{
  position: fixed;
  inset: 0;
  background-color: rgba(32, 33, 36, 0.92); /* --ink at ~92% opacity */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: opacity var(--duration-base) var(--ease-out-quart);
}

.lightbox-close{
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 8px;
  border-radius: 50%;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.lightbox-close:hover{
  background-color: rgba(255, 255, 255, 0.15);
}

.lightbox-panel{
  background-color: var(--surface);
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
}

.lightbox-image-wrap{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey-50);
  border-radius: 12px;
  overflow: hidden;
}

.lightbox-image{
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  display: block;
}

.lightbox-nav{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.lightbox-nav:hover{
  background-color: var(--grey-200);
}

.lightbox-nav-prev{ left: 12px; }
.lightbox-nav-next{ right: 12px; }

.lightbox-meta{
  margin-top: 20px;
}

.lightbox-title{
  font-size: 20px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 4px;
}

.lightbox-date{
  font-size: 12px;
  color: var(--meta);
  margin-bottom: 8px;
}

.lightbox-description{
  font-size: 14px;
  color: var(--meta);
  margin-bottom: 12px;
}

.lightbox-link{
  font-size: 14px;
  font-weight: 500;
  color: var(--google-link);
  text-decoration: none;
}

.lightbox-link:hover{
  text-decoration: underline;
}

.related-strip{
  display: flex;
  gap: 8px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.related-thumb{
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  cursor: pointer;
  opacity: 0.6;
  border: 2px solid transparent;
  transition: opacity var(--duration-fast) var(--ease-out-quart),
    border-color var(--duration-fast) var(--ease-out-quart);
}

.related-thumb:hover{
  opacity: 0.85;
}

.related-thumb.active{
  opacity: 1;
  border-color: var(--googleblue);
}

@media (max-width: 600px){
  .lightbox-panel{
    padding: 16px;
  }
}
</style>
