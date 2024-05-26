<script setup lang="ts">
  import {PhDotsNine} from "@phosphor-icons/vue";
  import Profile from '../assets/images/profile.jpg'

  const socials = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    },
    {
      name: 'Email',
      link: 'mailto:axldamnaxl@gmail.com',
    },
    {
      name: 'Github',
      link: 'https://github.com/ajaxarrow',
    }
  ];
</script>

<template>
  <div class="pa-6">
    <VRow align="center" justify="end" class="ma-0">
      <a v-for="social in socials" :href="social.link" class="mx-2 text-decoration-none text-base text-small">
        {{social.name}}
      </a>
      <PhDotsNine class="mx-2" size="24" />
      <VAvatar
          size="32"
          class="ml-2 cursor-pointer"
      >
        <VImg :src="Profile"></VImg>
        <VTooltip
          activator="parent"
          location="bottom"
        >
          <div class="tooltip-container">
            <p>Portfolio</p>
            <p class="text-small text-gs90">Jiu Axl R. Tabilla</p>
            <p class="text-small text-gs90">axldamnaxl@gmail.com</p>
          </div>
        </VTooltip>
      </VAvatar>
    </VRow>
    <div class="center">
      <p class="text-title">
        <span class="text-googleblue">j</span>
        <span class="text-googlered">i</span>
        <span class="text-googlegreen">u</span>
        <span class="text-googleyellow">a</span>
        <span class="text-googleblue">x</span>
        <span class="text-googlered">l</span>
        <span class="text-googleyellow">.</span>
      </p>
    </div>

  </div>
</template>

<style scoped>
  .tooltip-container{
    line-height: 1.25;
  }

  .text-title{
    font-weight: 700;
    font-size: 96px;
  }
</style>