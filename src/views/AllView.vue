<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {socialItems} from "../data/social-items.ts";
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {designs} from "../data/designs.ts";
import AccordionItem from "../components/AccordionItem.vue";
import {overviewQuestions} from "../data/questions.ts";
import {isVisible} from "../utils/entries.ts";
import {searchEntries} from "../utils/search.ts";

const aboutItems = [...about]
const aboutData = [...about]

const firstTwo = aboutData.splice(0, 2)
const combinedLinks = [
    ...aboutItems.splice(2),
    ...projects,
    ...buzzerboyProjects,
    ...designs,
    ...socialItems,
].filter(isVisible)

const route = useRoute();
const searchQuery = computed(() => (route.query.q as string) || '');
const isSearching = computed(() => searchQuery.value.length > 0);
const searchResults = computed(() => isSearching.value ? searchEntries(searchQuery.value) : []);
</script>

<template>
  <div v-if="isSearching">
    <ResultHeader :results="searchResults.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in searchResults"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
      <div v-if="searchResults.length === 0" class="empty-state">
        <p class="mb-2">Your search - <strong>{{ searchQuery }}</strong> - did not match any documents.</p>
        <p class="mb-2">Suggestions:</p>
        <ul class="pl-10">
          <li>Make sure all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <ResultHeader :results="combinedLinks.length + firstTwo.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in firstTwo"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
      <div v-if="overviewQuestions.length" class="mb-7">
        <p class="text-suggestion mb-3">People Also Ask</p>
        <VDivider class="mb-3 "/>
        <AccordionItem
            v-for="item in overviewQuestions"
            :key="item.question"
            :item="item"
        />
      </div>
      <SearchLinkItem
          v-for="(link, index) in combinedLinks"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
    </div>
  </div>
</template>

<style scoped>
.text-suggestion{
  font-weight: 500;
  font-size: 20px;
}

.empty-state{
  color: var(--ink);
}
</style>