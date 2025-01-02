<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import {links} from "../data/links.ts";
</script>

<template>
  <MainLayout>
    <div>
      <p class="text-red font-weight-medium mb-2">Did you mean:</p>
      <div class="d-flex ga-2 mb-4">
        <RouterLink
            v-for="link in links"
            :key="link.name"
            :to="link.link"
            style="color: #00f"
            class="text-decoration-none font-weight-bold">
          <em>{{ link.name }}</em>
        </RouterLink>
      </div>
      <p class="mb-3">
        Your search - <strong>{{ $route.path.split("/")[1] || "" }}</strong> - did not match any documents.
      </p>
      <p class="mb-2">Suggestions:</p>
      <ul class="pl-10">
        <li>Make sure all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
      </ul>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>