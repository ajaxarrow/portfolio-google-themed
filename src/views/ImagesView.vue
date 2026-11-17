<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {galleryImages, getThumbImages} from "../data/gallery.ts";
import {findEntryById, getCategoryLabel, getEntryCategory, isVisible, EntryCategory} from "../utils/entries.ts";
import Lightbox from "../components/Lightbox.vue";
import ResultHeader from "../components/ResultHeader.vue";
import {fadeUpStagger} from "../composables/useMotionPresets.ts";

const route = useRoute();
const router = useRouter();

interface GalleryTile {
  src: string;
  thumb: string;
  id: string;
  index: number;
  item: ReturnType<typeof findEntryById>;
  images: string[];
  category?: EntryCategory;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const allPhotos = computed<GalleryTile[]>(() =>
  shuffle(
    Object.entries(galleryImages).flatMap(([id, images]) => {
      const item = findEntryById(id);
      if (!item || !isVisible(item)) return [];
      const category = getEntryCategory(id);
      const thumbs = getThumbImages(id);
      return images.map((src, index) => ({src, thumb: thumbs[index] ?? src, id, index, item, images, category}));
    })
  )
);

const categories = computed<EntryCategory[]>(() => {
  const seen = new Set<EntryCategory>();
  allPhotos.value.forEach((tile) => {
    if (tile.category) seen.add(tile.category);
  });
  return Array.from(seen);
});

const activeCategory = ref<EntryCategory | "all">("all");

const filteredPhotos = computed(() =>
  activeCategory.value === "all"
    ? allPhotos.value
    : allPhotos.value.filter((tile) => tile.category === activeCategory.value)
);

// ref() deep-wraps object values via reactive(), so Set mutations (add) are tracked natively.
const loadedSrcs = ref(new Set<string>());

function markLoaded(src: string) {
  loadedSrcs.value.add(src);
}

// Images that finished loading before hydration never fire @load; pick them up here.
const gridRoot = ref<HTMLElement | null>(null);
function syncLoaded() {
  gridRoot.value?.querySelectorAll<HTMLImageElement>('.masonry-tile img').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) markLoaded(img.getAttribute('src') ?? '');
  });
}
onMounted(() => nextTick(syncLoaded));
watch(activeCategory, () => nextTick(syncLoaded));

// Varied placeholder heights so the grid does not look like identical blocks while loading.
const skeletonHeight = (i: number) => [150, 210, 180, 240][i % 4] + 'px';

const lightboxOpen = ref(false);
const activeTile = ref<GalleryTile | null>(null);

function openTile(tile: GalleryTile, startIndex = 0) {
  activeTile.value = {...tile, index: startIndex};
  lightboxOpen.value = true;
  router.replace({query: {...route.query, item: tile.id}});
}

function closeLightbox() {
  lightboxOpen.value = false;
  const {item, ...rest} = route.query;
  router.replace({query: rest});
}

onMounted(() => {
  const itemId = route.query.item as string | undefined;
  if (!itemId) return;
  const tile = allPhotos.value.find((photo) => photo.id === itemId);
  if (tile) {
    activeTile.value = tile;
    lightboxOpen.value = true;
  }
});
</script>

<template>
  <div class="images-page">
    <div class="chip-row">
      <button
          class="chip"
          :class="{ 'chip-active': activeCategory === 'all' }"
          @click="activeCategory = 'all'"
      >
        All
      </button>
      <button
          v-for="category in categories"
          :key="category"
          class="chip"
          :class="{ 'chip-active': activeCategory === category }"
          @click="activeCategory = category"
      >
        {{ getCategoryLabel(category) }}
      </button>
    </div>

    <ResultHeader :results="filteredPhotos.length"/>

    <div v-if="filteredPhotos.length === 0" class="empty-state">
      <p class="mb-2">No photos in this category yet.</p>
      <p>Try a different category above.</p>
    </div>

    <div v-else ref="gridRoot" class="masonry">
      <div v-for="(tile, i) in filteredPhotos" :key="`${tile.id}-${tile.index}`" class="masonry-item" v-motion="fadeUpStagger(i)">
        <div v-if="!loadedSrcs.has(tile.thumb)" class="masonry-skeleton" :style="{height: skeletonHeight(i)}" aria-hidden="true"></div>
        <button
            class="masonry-tile"
            :class="{ 'masonry-tile--visible': loadedSrcs.has(tile.thumb) }"
            :aria-label="`Open ${tile.item?.name ?? 'photo'}, photo ${tile.index + 1} of ${tile.images.length}`"
            @click="openTile(tile, tile.index)"
        >
          <img
              :src="tile.thumb"
              :alt="tile.item?.title ?? ''"
              loading="lazy"
              decoding="async"
              @load="markLoaded(tile.thumb)"
          />
          <span class="tile-caption">
            <span class="tile-name">{{ tile.item?.name }}</span>
            <span v-if="tile.images.length > 1" class="tile-count">{{ tile.index + 1 }}/{{ tile.images.length }}</span>
          </span>
        </button>
      </div>
    </div>

    <Lightbox
        v-if="activeTile"
        v-model="lightboxOpen"
        :images="activeTile.images"
        :thumbs="getThumbImages(activeTile.id)"
        :start-index="activeTile.index"
        :item="activeTile.item"
        @update:model-value="(value: boolean) => !value && closeLightbox()"
    />
  </div>
</template>

<style scoped>
.images-page{
  padding: 0 24px;
}

.chip-row{
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 8px;
}

.chip{
  flex-shrink: 0;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--grey-300);
  background-color: var(--surface);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    border-color var(--duration-fast) var(--ease-out-quart),
    color var(--duration-fast) var(--ease-out-quart);
}

.chip:hover{
  background-color: var(--grey-100);
}

.chip.chip-active,
.chip.chip-active:hover{
  background-color: var(--googleblue);
  border-color: var(--googleblue);
  color: var(--surface);
}

.empty-state{
  color: var(--meta);
  font-size: 14px;
  padding: 24px 0;
}

.masonry{
  column-count: 2;
  column-gap: 12px;
}

.masonry-item{
  break-inside: avoid;
  margin-bottom: 12px;
}

.masonry-skeleton{
  width: 100%;
  height: 140px;
  border-radius: 16px;
  background: linear-gradient(100deg, var(--grey-100) 30%, var(--grey-200) 45%, var(--grey-100) 60%);
  background-size: 300% 100%;
  animation: masonry-shimmer 1.6s ease-in-out infinite;
}

@keyframes masonry-shimmer{
  0%{ background-position: 200% 0; }
  100%{ background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce){
  .masonry-skeleton{
    animation: none;
  }
}

.masonry-tile{
  position: relative;
  width: 100%;
  height: 0;
  padding: 0;
  overflow: hidden;
  display: block;
  border-radius: 16px;
  border: 1px solid var(--grey-300);
  background-color: var(--grey-100);
  cursor: zoom-in;
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out-quart);
}

.masonry-tile img{
  display: block;
  width: 100%;
  height: auto;
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.masonry-tile--visible{
  height: auto;
  opacity: 1;
}

.masonry-tile--visible:hover img,
.masonry-tile--visible:focus-visible img{
  transform: scale(1.05);
}

.tile-caption{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.tile-name,
.tile-count{
  padding: 3px 10px;
  border-radius: 9999px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 12px;
  font-weight: 500;
}

.tile-name{
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile-count{
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}

.masonry-tile:hover .tile-caption,
.masonry-tile:focus-visible .tile-caption{
  opacity: 1;
  transform: none;
}

@media (hover: none){
  .tile-caption{ display: none; }
}

@media (prefers-reduced-motion: reduce){
  .masonry-tile--visible:hover img,
  .masonry-tile--visible:focus-visible img{ transform: none; }
}

@media (min-width: 640px){
  .masonry{ column-count: 3; }
}

@media (min-width: 900px){
  .masonry{ column-count: 4; }
}

@media (min-width: 1200px){
  .masonry{ column-count: 5; }
}

@media (min-width: 1500px){
  .masonry{ column-count: 6; }
}
</style>
