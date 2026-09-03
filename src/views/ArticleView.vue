<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {findEntryById, getCategoryLabel, getEntryCategory} from "../utils/entries.ts";
import {getArticle, getReadingTime} from "../data/articles.ts";
import {getGalleryImages} from "../data/gallery.ts";
import Lightbox from "../components/Lightbox.vue";
import {fadeUpOnce, fadeUpStagger} from "../composables/useMotionPresets.ts";

const route = useRoute();

const id = computed(() => route.params.id as string);
const entry = computed(() => findEntryById(id.value));
const article = computed(() => getArticle(id.value));
const photos = computed(() => getGalleryImages(id.value));
const hero = computed(() => photos.value[0]);
const filmstrip = computed(() => photos.value.slice(1));

const categoryLabel = computed(() => {
  const category = getEntryCategory(id.value);
  return category ? getCategoryLabel(category) : undefined;
});

const accentVar = computed(() => `var(--${article.value?.accent ?? "googleblue"})`);

const readingTime = computed(() => getReadingTime(id.value));

const headerMotion = fadeUpOnce(0, {durationMs: 320, riseYPx: 14});
const bodyMotion = fadeUpOnce(120, {durationMs: 320, riseYPx: 14});

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}
</script>

<template>
  <article v-if="entry && article" class="article" :style="{'--accent': accentVar}">
    <RouterLink to="/about" class="back-link">
      <span class="back-arrow">&larr;</span> Back to About Me
    </RouterLink>

    <header class="article-header" v-motion="headerMotion">
      <div v-if="categoryLabel" class="kicker">
        <span class="kicker-dot"></span>{{ categoryLabel }}
      </div>
      <h1 class="article-title">{{ entry.title }}</h1>
      <div class="article-meta">
        <span v-if="entry.date">{{ entry.date }}</span>
        <span v-if="entry.date" class="meta-dot">&middot;</span>
        <span>{{ readingTime }} min read</span>
        <span class="meta-dot">&middot;</span>
        <span>Jiu Axl Tabilla</span>
      </div>
    </header>

    <div class="accent-rule"></div>

    <img v-if="hero" :src="hero" :alt="entry.title" class="article-hero" @click="openLightbox(0)"/>

    <div class="article-body" v-motion="bodyMotion" v-html="article.bodyHtml"></div>

    <div v-if="filmstrip.length" class="filmstrip-section">
      <p class="filmstrip-title">In photos</p>
      <div class="filmstrip">
        <img
            v-for="(src, index) in filmstrip"
            :key="src"
            :src="src"
            class="filmstrip-photo"
            :alt="`${entry.title} - photo ${index + 2}`"
            role="button"
            tabindex="0"
            v-motion="fadeUpStagger(index)"
            @click="openLightbox(index + 1)"
            @keydown.enter="openLightbox(index + 1)"
            @keydown.space.prevent="openLightbox(index + 1)"
        />
      </div>
    </div>

    <Lightbox
        v-model="lightboxOpen"
        :images="photos"
        :start-index="lightboxIndex"
        :item="entry"
    />
  </article>
  <div v-else class="article-not-found">
    <p class="text-red font-weight-medium mb-2">This article doesn't exist.</p>
    <p class="mb-3">Try heading back to <RouterLink to="/about">About Me</RouterLink> instead.</p>
  </div>
</template>

<style scoped>
.article{
  max-width: 680px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.back-link{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--meta);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out-quart);
}

.back-arrow{
  transition: transform var(--duration-fast) var(--ease-out-quart);
}

.back-link:hover{
  color: var(--ink);
}

.back-link:hover .back-arrow{
  transform: translateX(-3px);
}

.kicker{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: var(--grey-100);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.kicker-dot{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
  flex-shrink: 0;
}

.article-title{
  font-family: 'Literata', Georgia, serif !important;
  font-weight: 600;
  font-size: clamp(2rem, 1.6rem + 1.6vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 16px;
  text-wrap: balance;
}

.article-meta{
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--meta);
}

.meta-dot{
  color: var(--grey-400);
}

.accent-rule{
  height: 3px;
  width: 56px;
  border-radius: 2px;
  background-color: var(--accent);
  margin: 24px 0 32px;
}

.article-hero{
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--grey-300);
  cursor: pointer;
  margin-bottom: 36px;
  display: block;
}

.article-body{
  font-family: 'Satoshi', sans-serif;
}

.article-body :deep(p){
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink);
  margin-bottom: 20px;
  text-wrap: pretty;
}

.article-body :deep(h2){
  font-family: 'Literata', Georgia, serif !important;
  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  color: var(--ink);
  margin: 40px 0 16px;
  text-wrap: balance;
}

.article-body :deep(em){
  color: var(--meta);
}

.filmstrip-section{
  margin-top: 44px;
  padding-top: 32px;
  border-top: 1px solid var(--grey-300);
}

.filmstrip-title{
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 14px;
}

.filmstrip{
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.filmstrip-photo{
  height: 140px;
  width: auto;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--grey-300);
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out-quart);
}

.filmstrip-photo:hover{
  opacity: 0.85;
}

.article-not-found{
  max-width: 680px;
  margin: 0 auto;
}

@media (max-width: 600px){
  .article-title{
    font-size: clamp(1.75rem, 1.4rem + 2vw, 2.25rem);
  }
}
</style>
