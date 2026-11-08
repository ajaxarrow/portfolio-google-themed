<script setup lang="ts">
import {socials} from "../data/socials.ts";

</script>

<template>
  <div class="footer py-3 px-5">
    <p>Open to remote roles · Bukidnon, Philippines (UTC+8)</p>
    <div class="d-flex align-center ga-2">
      <a v-for="(social, index) in socials" :key="social.name" target="_blank" rel="noopener noreferrer" :href="social.link" class="footer-link text-decoration-none">
        <span class="text-base">{{social.name}}</span><span class="sr-only"> (opens in a new tab)</span> <span v-if="index != socials.length - 1">·</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .footer{
    background-color: var(--grey-50);
    color: var(--meta);
    font-size: 14px;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 16px;
  }

  .footer > div{
    flex-wrap: wrap;
  }

  .footer-link{
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 4px;
  }

  .text-base:hover{
    text-decoration: underline !important;
  }
</style>