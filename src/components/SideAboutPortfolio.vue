<script setup lang="ts">
import Logo from '../assets/logo.jpg'
</script>

<template>
  <div class="side-profile-container">
    <div class="d-flex align-center ga-2">
      <img :src="Logo" alt="Portfolio logo" class="avatar">
      <div>
        <p class="text-name">About Portfolio</p>
        <p class="text-role">Portfolio of Jiu Axl R. Tabilla</p>
      </div>
    </div>
    <div class="desc-container my-5">
      A portfolio built as a search results page, designed and coded by Jiu Axl R. Tabilla. The search box works: try "django", "figma" or "champion". Every result is real work, and the résumé is one click away.
    </div>


    <VDivider/>
    <div class="my-5">
      <p class="mb-1">
        <span class="font-weight-medium">Framework and Language Used: </span>
        Vue.JS, TypeScript
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">Additional Technologies: </span>
        Vite for build optimization, Figma for UI design and Netlify for Hosting
      </p>
    </div>
  </div>
</template>

<style scoped>
.side-profile-container{
  background-color: var(--grey-50);
  border-radius: 16px;
  max-width: 600px !important;
  padding: 24px;
}

.avatar{
  height: 80px;
  width: 80px;
  border-radius: 16px;
}

.text-name{
  font-size: 20px;
  font-weight: 500;
  color: var(--ink);
}


.desc-container{
  background-color: var(--surface);
  padding: 10px;
  border-radius: 16px;
}

.section-title{
  font-weight: 600;
  font-size: 20px;
}
</style>