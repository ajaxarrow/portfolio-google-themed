<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import Profile from '../assets/images/closeup.jpg'
import {findEntryById, getCategoryLabel, getEntryCategory} from "../utils/entries.ts";
import {articles, getReadingTime} from "../data/articles.ts";

const route = useRoute();
const id = computed(() => route.params.id as string);
const entry = computed(() => findEntryById(id.value));

const categoryLabel = computed(() => {
  const category = getEntryCategory(id.value);
  return category ? getCategoryLabel(category) : undefined;
});

const readingTime = computed(() => getReadingTime(id.value));

const otherArticles = computed(() =>
  Object.keys(articles)
    .filter((articleId) => articleId !== id.value)
    .map((articleId) => findEntryById(articleId))
    .filter((item): item is NonNullable<typeof item> => !!item)
);
</script>

<template>
  <div v-if="entry" class="side-article-container">
    <div class="d-flex align-center ga-2">
      <img :src="Profile" alt="Jiu Axl" class="avatar">
      <div>
        <p class="text-name">Jiu Axl R. Tabilla</p>
        <p class="text-role">UI/UX Designer | Frontend Developer</p>
      </div>
    </div>
    <p class="bio-text my-4">
      Writes about frontend development, UI/UX design, and the talks and trainings he's taken part in along the way.
    </p>
    <RouterLink to="/about" class="about-link">More about Jiu Axl &rarr;</RouterLink>

    <VDivider class="my-4"/>

    <div class="field-group">
      <div v-if="categoryLabel" class="field">
        <p class="field-label">Category</p>
        <p class="field-value">{{ categoryLabel }}</p>
      </div>
      <div v-if="entry.date" class="field">
        <p class="field-label">Published</p>
        <p class="field-value">{{ entry.date }}</p>
      </div>
      <div class="field">
        <p class="field-label">Reading time</p>
        <p class="field-value">{{ readingTime }} min read</p>
      </div>
    </div>

    <template v-if="otherArticles.length">
      <VDivider class="my-4"/>
      <p class="section-title mb-2">More from the blog</p>
      <RouterLink
          v-for="other in otherArticles"
          :key="other.id"
          :to="`/article/${other.id}`"
          class="read-next-row"
      >
        <p class="read-next-title">{{ other.title }}</p>
        <p class="read-next-desc">{{ other.description }}</p>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.side-article-container{
  background-color: var(--grey-50);
  border-radius: 16px;
  max-width: 600px !important;
  padding: 24px;
  /* Lines the panel up with the article's kicker badge instead of its "Back" link,
     which sits above the kicker with no equivalent on this side. */
  margin-top: 49px;
}

.avatar{
  height: 56px;
  width: 56px;
  border-radius: 16px;
  object-fit: cover;
}

.text-name{
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
}

.text-role{
  font-size: 13px;
  color: var(--meta);
}

.bio-text{
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink);
}

.about-link{
  font-size: 13px;
  font-weight: 500;
  color: var(--google-link);
  text-decoration: none;
}

.about-link:hover{
  text-decoration: underline;
}

.section-title{
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
}

.field-group{
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field-label{
  font-size: 12px;
  font-weight: 600;
  color: var(--meta);
  margin-bottom: 2px;
}

.field-value{
  font-size: 14px;
  color: var(--ink);
  line-height: 1.4;
}

.read-next-row{
  display: block;
  padding: 10px;
  margin: 0 -10px;
  border-radius: 12px;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.read-next-row:hover{
  background-color: var(--grey-100);
}

.read-next-row:hover .read-next-title{
  text-decoration: underline;
}

.read-next-title{
  font-size: 14px;
  font-weight: 500;
  color: var(--google-link);
  margin-bottom: 4px;
}

.read-next-desc{
  font-size: 13px;
  color: var(--meta);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
