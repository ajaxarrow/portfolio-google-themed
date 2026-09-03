<script setup lang="ts">
import ResultHeader from "../components/ResultHeader.vue";
import {about} from "../data/about.ts";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import {aboutQuestions} from "../data/questions.ts";
import AccordionItem from "../components/AccordionItem.vue";
import {isVisible} from "../utils/entries.ts";

const visibleAbout = about.filter(isVisible)
const aboutItems = [...visibleAbout]
const aboutData = [...visibleAbout]

</script>

<template>
  <div>
    <ResultHeader :results="visibleAbout.length"/>
    <div class="mt-5">
      <SearchLinkItem
          v-for="(link, index) in aboutData.splice(0, 2)"
          :key="link.id"
          :searchItem="link"
          :index="index"
      />
      <div class="mb-7">
        <p class="text-suggestion mb-3">People Also Ask</p>
        <VDivider class="mb-3"/>
        <AccordionItem
            v-for="item in aboutQuestions"
            :key="item.question"
            :item="item"
        />
      </div>
      <SearchLinkItem
          v-for="(link, index) in aboutItems.splice(2)"
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
</style>