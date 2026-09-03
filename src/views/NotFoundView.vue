<script setup lang="ts">
import {links} from "../data/links.ts";
import {fadeUpStagger} from "../composables/useMotionPresets.ts";

const suggestions = [
  "Make sure all words are spelled correctly.",
  "Try different keywords.",
  "Try more general keywords.",
];
</script>

<template>
  <div>
    <p class="text-red font-weight-medium mb-2">Did you mean:</p>
    <div class="d-flex ga-2 mb-4">
      <RouterLink
          v-for="(link, index) in links"
          :key="link.name"
          :to="link.link"
          v-motion="fadeUpStagger(index)"
          class="text-decoration-none font-weight-bold not-found-link">
        <em>{{ link.name }}</em>
      </RouterLink>
    </div>
    <p class="mb-3">
      Your search - <strong>{{ $route.path.split("/")[1] || "" }}</strong> - did not match any documents.
    </p>
    <p class="mb-2">Suggestions:</p>
    <ul class="pl-10">
      <li v-for="(suggestion, index) in suggestions" :key="suggestion" v-motion="fadeUpStagger(index)">{{ suggestion }}</li>
    </ul>
  </div>
</template>

<style scoped>
.not-found-link{
  color: var(--google-link);
}
</style>