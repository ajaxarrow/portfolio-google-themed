<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import ResultHeader from "../components/ResultHeader.vue";
import {about} from "../data/about.ts";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import SideProfile from "../components/SideProfile.vue";

</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="about.length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in about"
            :searchItem="link"
        />
      </div>
    </div>
    <template #side-details>
      <SideProfile/>
    </template>
  </MainLayout>
</template>

<style scoped>

</style>