<script setup lang="ts">

import MainLayout from "../layouts/MainLayout.vue";
import ResultHeader from "../components/ResultHeader.vue";
import {designs} from "../data/designs.ts";
import SearchLinkItem from "../components/SearchLinkItem.vue";
</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="designs.length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in designs"
            :searchItem="link"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>