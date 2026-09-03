<script setup lang="ts">

import ResultHeader from "../components/ResultHeader.vue";
import {designs} from "../data/designs.ts";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {isVisible} from "../utils/entries.ts";

const visibleDesigns = designs.filter(isVisible)
</script>

<template>
  <div>
    <ResultHeader :results="visibleDesigns.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in visibleDesigns"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
    </div>
  </div>
</template>

<style scoped>

</style>