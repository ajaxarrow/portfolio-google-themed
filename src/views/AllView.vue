<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import {socialItems} from "../data/social-items.ts";
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {designs} from "../data/designs.ts";
import SideAboutPortfolio from "../components/SideAboutPortfolio.vue";
import AccordionItem from "../components/AccordionItem.vue";
import {overviewQuestions} from "../data/questions.ts";

const aboutItems = [...about]
const aboutData = [...about]

const combinedLinks = [
    ...aboutItems.splice(2, 6),
    ...projects,
    ...designs,
    ...socialItems,
]
</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="combinedLinks.length + aboutData.splice(0, 2).length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in aboutData.splice(0, 2)"
            :searchItem="link"
        />
        <div class="mb-7">
          <p class="text-suggestion mb-3">People Also Ask</p>
          <VDivider class="mb-3 "/>
          <AccordionItem
              v-for="item in overviewQuestions"
              :item="item"
          />
        </div>
        <SearchLinkItem
            v-for="link in combinedLinks"
            :searchItem="link"
        />
      </div>
    </div>
    <template #side-details>
      <SideAboutPortfolio/>
    </template>
  </MainLayout>
</template>

<style scoped>
.text-suggestion{
  font-weight: 500;
  font-size: 20px;
}
</style>