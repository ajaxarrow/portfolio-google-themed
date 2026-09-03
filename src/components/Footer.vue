<script setup lang="ts">
import {socials} from "../data/socials.ts";

</script>

<template>
  <div class="footer py-3 px-5">
    <p class="">Made with angst and passion</p>
    <div class="d-flex align-center ga-2">
      <a v-for="(social, index) in socials" target="_blank" rel="noopener noreferrer" :href="social.link" class=" text-decoration-none">
        <span class="text-base">{{social.name}}</span> <span v-if="index != socials.length - 1">·</span>
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
  }

  .text-base:hover{
    text-decoration: underline !important;
  }
</style>