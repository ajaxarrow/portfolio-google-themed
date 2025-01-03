<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import {socialItems} from "../data/social-items.ts";
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {designs} from "../data/designs.ts";
import SideAboutPortfolio from "../components/SideAboutPortfolio.vue";

const combinedLinks = [
    ...about,
    ...projects,
    ...designs,
    ...socialItems,
]
</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="combinedLinks.length"/>
      <div class="mt-5">
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

</style>