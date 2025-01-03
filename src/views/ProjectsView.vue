<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {projects} from "../data/projects.ts";
</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="projects.length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in projects"
            :searchItem="link"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>