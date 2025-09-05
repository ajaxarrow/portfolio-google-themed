<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import ResultHeader from "../components/ResultHeader.vue";
import {about} from "../data/about.ts";
import SearchLinkItem from "../components/SearchLinkItem.vue";
import SideProfile from "../components/SideProfile.vue";
import {aboutQuestions} from "../data/questions.ts";
import AccordionItem from "../components/AccordionItem.vue";

const aboutItems = [...about]
const aboutData = [...about]

</script>

<template>
  <MainLayout>
    <div>
      <ResultHeader :results="about.length"/>
      <div class="mt-5">
        <SearchLinkItem
            v-for="link in aboutData.splice(0, 2)"
            :searchItem="link"
        />
        <div class="mb-7">
          <p class="text-suggestion mb-3">People Also Ask</p>
          <VDivider class="mb-3"/>
          <AccordionItem
              v-for="item in aboutQuestions"
              :item="item"
          />
        </div>
        <SearchLinkItem
            v-for="link in aboutItems.splice(2, 6)"
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
.text-suggestion{
  font-weight: 500;
  font-size: 20px;
}
</style>