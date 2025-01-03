<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {socialItems} from "../data/social-items.ts";
</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="socialItems.length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in socialItems"
            :searchItem="link"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>