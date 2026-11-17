<script setup lang="ts">
import {socials} from "../data/socials.ts";

</script>

<template>
  <div class="footer py-3 px-5">
    <p>Open to remote roles · Bukidnon, Philippines (UTC+8)</p>
    <ul class="footer-links">
      <li v-for="social in socials" :key="social.name">
        <a target="_blank" rel="noopener noreferrer" :href="social.link" class="footer-link text-decoration-none">
          <span class="text-base">{{social.name}}</span><span class="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
    </ul>
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

  .footer-links{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Separator sits between links, outside the tap target, with even space either side. */
  .footer-links li + li::before{
    content: "·";
    padding: 0 6px;
    color: var(--meta);
  }

  .footer-links li{
    display: flex;
    align-items: center;
  }

  .footer-link{
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 4px;
  }

  .footer-links li:first-child .footer-link{
    padding-left: 0;
  }

  .text-base:hover{
    text-decoration: underline !important;
  }
</style>