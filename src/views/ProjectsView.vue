<script setup lang="ts">
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {isVisible} from "../utils/entries.ts";

const allProjects = [...projects, ...buzzerboyProjects].filter(isVisible);
</script>

<template>
  <div>
    <ResultHeader :results="allProjects.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in allProjects"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
    </div>
  </div>
</template>

<style scoped>

</style>