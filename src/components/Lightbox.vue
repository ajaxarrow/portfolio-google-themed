<script setup lang="ts">
import {PropType, computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {PhArrowUpRight, PhCaretLeft, PhCaretRight, PhX} from "@phosphor-icons/vue";
import {SearchItem} from "../interfaces/link.interface.ts";
import {isArticleItem} from "../utils/entries.ts";

const props = defineProps({
  modelValue: {type: Boolean, required: true},
  images: {type: Array as PropType<string[]>, required: true},
  /** Small versions of `images` (same order) for the thumbnail strip. Falls back to the full images. */
  thumbs: {type: Array as PropType<string[]>, default: () => []},
  startIndex: {type: Number, default: 0},
  item: {type: Object as PropType<SearchItem>, default: undefined},
})

const emit = defineEmits(['update:modelValue']);

const currentIndex = ref(props.startIndex);
/** Which way the next image should travel: 1 = forward, -1 = back. */
const direction = ref(1);
const imageLoaded = ref(false);
const backdropRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLElement | null>(null);
const stripRef = ref<HTMLElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

watch(() => props.startIndex, (value) => {
  currentIndex.value = value;
});

// A different entry (or re-opening) starts clean at the requested photo.
watch(() => [props.images, props.modelValue], () => {
  if (props.modelValue) currentIndex.value = Math.min(props.startIndex, Math.max(props.images.length - 1, 0));
});

const isArticle = computed(() => isArticleItem(props.item));
const hasMany = computed(() => props.images.length > 1);
const isExternal = computed(() => /^https?:/.test(props.item?.link ?? ''));

const linkLabel = computed(() => {
  const link = props.item?.link ?? '';
  if (!isExternal.value) return 'Open';
  try {
    const host = new URL(link).hostname.replace(/^www\./, '');
    if (host.includes('figma.com')) return 'Open the prototype';
    if (host.includes('loom.com')) return 'Watch the walkthrough';
    if (host.includes('facebook.com')) return 'See the post';
    return `Visit ${host}`;
  } catch {
    return 'Open';
  }
});

function close() {
  emit('update:modelValue', false);
}

function go(index: number, dir: number) {
  if (!props.images.length || index === currentIndex.value) return;
  direction.value = dir;
  imageLoaded.value = false;
  currentIndex.value = (index + props.images.length) % props.images.length;
}

const next = () => go(currentIndex.value + 1, 1);
const prev = () => go(currentIndex.value - 1, -1);
const pick = (index: number) => go(index, index > currentIndex.value ? 1 : -1);

// Warm the neighbours so stepping through never shows an empty stage,
// and keep the active thumbnail in view.
watch(currentIndex, (index) => {
  if (typeof window === 'undefined') return;
  [index + 1, index - 1].forEach((i) => {
    const src = props.images[(i + props.images.length) % props.images.length];
    if (src) new Image().src = src;
  });
  nextTick(() => {
    stripRef.value?.querySelector<HTMLElement>('.is-active')
      ?.scrollIntoView({block: 'nearest', inline: 'center'});
  });
});

/* Swipe left/right on touch screens. */
let touchStartX = 0;
let touchStartY = 0;
function onTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}
function onTouchEnd(event: TouchEvent) {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (!hasMany.value || Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (dx < 0) next(); else prev();
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
  if (typeof document === 'undefined') return; // SSG: no DOM at build time
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (isOpen) {
    imageLoaded.value = false;
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
    <Transition name="lb" appear>
      <div
          v-if="modelValue"
          ref="backdropRef"
          class="lb"
          :class="{ 'lb--solo': !item }"
          role="dialog"
          aria-modal="true"
          :aria-label="item?.title ?? 'Image viewer'"
      >
        <!-- Stage: the image, on a dark surface -->
        <div class="lb-stage" @click.self="close" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
          <p v-if="hasMany" class="lb-counter" aria-live="polite">
            <span class="lb-counter-now">{{ currentIndex + 1 }}</span> / {{ images.length }}
          </p>

          <div class="lb-frame" @click.self="close">
            <div v-if="!imageLoaded" class="lb-loading" aria-hidden="true"></div>
            <Transition :name="direction > 0 ? 'lb-next' : 'lb-prev'" mode="out-in">
              <img
                  :key="images[currentIndex]"
                  :src="images[currentIndex]"
                  class="lb-image"
                  :alt="item?.title ? `${item.title}, photo ${currentIndex + 1} of ${images.length}` : ''"
                  @load="imageLoaded = true"
              />
            </Transition>
          </div>

          <button v-if="hasMany" class="lb-nav lb-nav-prev" @click="prev" aria-label="Previous photo">
            <PhCaretLeft size="22"/>
          </button>
          <button v-if="hasMany" class="lb-nav lb-nav-next" @click="next" aria-label="Next photo">
            <PhCaretRight size="22"/>
          </button>

          <div v-if="hasMany" ref="stripRef" class="lb-strip">
            <button
                v-for="(src, i) in images"
                :key="src"
                class="lb-thumb"
                :class="{ 'is-active': i === currentIndex }"
                :style="{ '--i': i }"
                :aria-label="`View photo ${i + 1} of ${images.length}`"
                :aria-current="i === currentIndex"
                @click="pick(i)"
            >
              <img :src="thumbs[i] ?? src" alt="" loading="lazy" decoding="async"/>
            </button>
          </div>
        </div>

        <!-- Panel: what you are looking at -->
        <aside v-if="item" class="lb-panel">
          <div class="lb-source">
            <span v-if="item.icon" class="lb-source-icon"><img :src="item.icon" alt=""/></span>
            <span class="lb-source-name">{{ item.name }}</span>
          </div>
          <h2 class="lb-title">{{ item.title }}</h2>
          <p v-if="item.date" class="lb-date">{{ item.date }}</p>
          <p v-if="item.role" class="lb-role">{{ item.role }}</p>
          <p class="lb-description">{{ item.description }}</p>
          <ul v-if="item.stack?.length" class="lb-stack" aria-label="Stack">
            <li v-for="tech in item.stack" :key="tech">{{ tech }}</li>
          </ul>

          <RouterLink v-if="isArticle" :to="`/article/${item.id}`" class="lb-link" @click="close">
            Read the article
          </RouterLink>
          <a
              v-else
              :href="item.link"
              class="lb-link"
              v-bind="isExternal ? {target: '_blank', rel: 'noopener noreferrer'} : {}"
              @click="!isExternal && close()"
          >
            {{ linkLabel }} <PhArrowUpRight v-if="isExternal" size="16"/>
            <span v-if="isExternal" class="sr-only"> (opens in a new tab)</span>
          </a>

          <p v-if="hasMany" class="lb-hint">
            <kbd>←</kbd> <kbd>→</kbd> to browse · <kbd>Esc</kbd> to close
          </p>
        </aside>

        <button ref="closeButtonRef" class="lb-close" @click="close" aria-label="Close">
          <PhX size="22"/>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb{
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --stage: #17181A;
  --stage-raised: #2A2B2E;
  --on-stage: #E8EAED;
  position: fixed;
  inset: 0;
  z-index: 2400;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  background-color: var(--stage);
  color: var(--ink);
}

.lb--solo{ grid-template-columns: minmax(0, 1fr); }

/* Stage */
.lb-stage{
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 20px 20px 16px;
}

.lb-counter{
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 9999px;
  background-color: var(--stage-raised);
  color: var(--on-stage);
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.lb-counter-now{ color: #fff; }

.lb-frame{
  position: relative;
  flex: 1;
  display: grid;
  place-items: center;
  min-height: 0;
  padding: 16px 56px;
}

.lb-image{
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  border-radius: 12px;
  object-fit: contain;
}

.lb-frame > .lb-image{ grid-area: 1 / 1; max-height: calc(100dvh - 200px); }

.lb-loading{
  grid-area: 1 / 1;
  width: min(60%, 480px);
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: linear-gradient(100deg, var(--stage-raised) 30%, #3A3B3F 45%, var(--stage-raised) 60%);
  background-size: 300% 100%;
  animation: lb-shimmer 1.6s ease-in-out infinite;
}

@keyframes lb-shimmer{
  0%{ background-position: 200% 0; }
  100%{ background-position: -200% 0; }
}

.lb-nav{
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-top: -40px;
  border: 0;
  border-radius: 50%;
  background-color: var(--stage-raised);
  color: #fff;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.lb-nav:hover{ background-color: #3C4043; }
.lb-nav-prev{ left: 16px; }
.lb-nav-next{ right: 16px; }
.lb-nav-prev:hover{ transform: translateX(-3px); }
.lb-nav-next:hover{ transform: translateX(3px); }
.lb-nav:active{ transform: scale(0.94); }

.lb-strip{
  display: flex;
  gap: 8px;
  justify-content: safe center;
  padding: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.lb-strip::-webkit-scrollbar{ display: none; }

.lb-thumb{
  flex: 0 0 auto;
  width: 84px;
  height: 56px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 8px;
  background-color: var(--stage-raised);
  opacity: 0.45;
  cursor: pointer;
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart),
    box-shadow var(--duration-base) var(--ease-out-quart);
}

.lb-thumb img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-thumb:hover{ opacity: 0.85; transform: translateY(-2px); }

.lb-thumb.is-active{
  opacity: 1;
  box-shadow: 0 0 0 2px var(--stage), 0 0 0 4px #fff;
}

/* Panel */
.lb-panel{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 72px 28px 28px;
  overflow-y: auto;
  background-color: var(--surface);
}

.lb-source{
  display: flex;
  align-items: center;
  gap: 10px;
}

.lb-source-icon{
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 50%;
  background-color: var(--grey-100);
}

.lb-source-icon img{ width: 18px; height: 18px; object-fit: contain; }
.lb-source-name{ font-size: 14px; font-weight: 500; }

.lb-title{
  margin-top: 14px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
  text-wrap: balance;
}

.lb-date{
  margin-top: 6px;
  color: var(--meta);
  font-size: 13px;
}

.lb-role{
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
}

.lb-description{
  margin-top: 10px;
  color: var(--meta);
  font-size: 15px;
  line-height: 1.55;
}

.lb-stack{
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
  padding: 0;
  list-style: none;
}

.lb-stack li{
  padding: 3px 10px;
  border-radius: 9999px;
  background-color: var(--grey-100);
  font-size: 13px;
  font-weight: 500;
}

.lb-link{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  margin-top: 22px;
  padding: 0 20px;
  border-radius: 9999px;
  background-color: var(--google-link);
  color: var(--surface);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.lb-link:hover{ background-color: var(--link-pressed); }

.lb-hint{
  margin-top: auto;
  padding-top: 28px;
  color: var(--meta);
  font-size: 13px;
}

.lb-hint kbd{
  display: inline-block;
  min-width: 24px;
  padding: 1px 6px;
  border: 1px solid var(--grey-300);
  border-radius: 6px;
  background-color: var(--grey-50);
  color: var(--ink);
  font-size: 12px;
  text-align: center;
}

/* Close */
.lb-close{
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background-color: var(--grey-100);
  color: var(--ink);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.lb-close:hover{ background-color: var(--grey-300); transform: rotate(90deg); }

.lb--solo .lb-close{ background-color: var(--stage-raised); color: #fff; }
.lb--solo .lb-close:hover{ background-color: #3C4043; }

.lb :focus-visible{ outline-color: var(--googleblue); }
.lb-stage :focus-visible{ outline-color: #fff; }

/* Open / close */
.lb-enter-active{ transition: opacity 260ms var(--ease-out-quart); }
.lb-leave-active{ transition: opacity 180ms var(--ease-out-quart); }
.lb-enter-from,
.lb-leave-to{ opacity: 0; }

.lb-enter-active .lb-frame{ animation: lb-frame-in 520ms var(--ease-out-expo) backwards; }
.lb-enter-active .lb-panel{ animation: lb-panel-in 520ms var(--ease-out-expo) 60ms backwards; }
.lb-enter-active .lb-thumb{ animation: lb-thumb-in 420ms var(--ease-out-expo) calc(160ms + var(--i) * 35ms) backwards; }

@keyframes lb-frame-in{
  from{ opacity: 0; transform: scale(0.94) translateY(16px); }
  to{ opacity: 1; transform: none; }
}

@keyframes lb-panel-in{
  from{ transform: translateX(48px); opacity: 0; }
  to{ transform: none; opacity: 1; }
}

@keyframes lb-thumb-in{
  from{ transform: translateY(14px); opacity: 0; }
}

/* Stepping between photos */
.lb-next-enter-active,
.lb-prev-enter-active{ transition: opacity 240ms var(--ease-out-quart), transform 320ms var(--ease-out-expo); }
.lb-next-leave-active,
.lb-prev-leave-active{ transition: opacity 110ms linear, transform 110ms linear; }

.lb-next-enter-from{ opacity: 0; transform: translateX(36px); }
.lb-next-leave-to{ opacity: 0; transform: translateX(-20px); }
.lb-prev-enter-from{ opacity: 0; transform: translateX(-36px); }
.lb-prev-leave-to{ opacity: 0; transform: translateX(20px); }

@media (prefers-reduced-motion: reduce){
  .lb-enter-active .lb-frame,
  .lb-enter-active .lb-panel,
  .lb-enter-active .lb-thumb,
  .lb-loading{ animation: none; }

  .lb-next-enter-from, .lb-next-leave-to,
  .lb-prev-enter-from, .lb-prev-leave-to{ transform: none; }

  .lb-close:hover, .lb-nav:hover, .lb-thumb:hover{ transform: none; }
}

/* Stacked: image on top, details in a sheet below */
@media (max-width: 960px){
  .lb{
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .lb-stage{ padding: 14px 12px 10px; }
  .lb-frame{ padding: 12px 0; }
  .lb-frame > .lb-image{ max-height: 100%; }

  .lb-nav{
    width: 44px;
    height: 44px;
    margin-top: -22px;
    background-color: color-mix(in srgb, var(--stage-raised) 86%, transparent);
  }

  .lb-nav-prev{ left: 8px; }
  .lb-nav-next{ right: 8px; }

  .lb-thumb{ width: 64px; height: 44px; }

  .lb-panel{
    max-height: 44dvh;
    padding: 20px 20px 24px;
    border-radius: 24px 24px 0 0;
  }

  .lb-title{ font-size: 20px; margin-top: 10px; }
  .lb-hint{ display: none; }

  .lb-close{
    top: 10px;
    right: 10px;
    background-color: var(--stage-raised);
    color: #fff;
  }

  .lb-close:hover{ background-color: #3C4043; }

  @keyframes lb-panel-in{
    from{ transform: translateY(48px); opacity: 0; }
    to{ transform: none; opacity: 1; }
  }
}
</style>
