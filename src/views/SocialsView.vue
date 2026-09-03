<script setup lang="ts">
import ResultHeader from "../components/ResultHeader.vue";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {socialItems} from "../data/social-items.ts";
import {isVisible} from "../utils/entries.ts";

const visibleSocialItems = socialItems.filter(isVisible)
</script>

<template>
  <div>
    <ResultHeader :results="visibleSocialItems.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in visibleSocialItems"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
    </div>
  </div>
</template>

<style scoped>

</style>