<script setup lang="ts">
  import {PhDotsNine} from "@phosphor-icons/vue";
  import Profile from '../assets/images/profile.jpg'
  import Search from "../components/Search.vue";
  import {links} from "../data/links.ts";

  const socials = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    },
    {
      name: 'Email',
      link: 'https://mail.google.com/mail/u/0/?fs=1&to=axldamnaxl@gmail.com&tf=cm',
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
      <a v-for="social in socials" target="_blank" :href="social.link" class="mx-2 text-decoration-none text-base text-small">
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
      <div class="d-flex flex-column justify-center  ">
        <p class="text-title text-center mb-3">
          <span class="text-googleblue">j</span>
          <span class="text-googlered">i</span>
          <span class="text-googlegreen">u</span>
          <span class="text-googleyellow">a</span>
          <span class="text-googleblue">x</span>
          <span class="text-googlered">l</span>
          <span class="text-googleyellow">.</span>
        </p>
        <div class="position-relative mb-15">
          <Search/>
        </div>
        <div class="links-container mt-5">
          <RouterLink
            v-for="link in links"
            :key="link.name"
            class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black"
            :to="{path: link.link}">
            <div class="icon-container">
              <component :is="link.icon" size="32" :color="link.color" weight="duotone"/>
            </div>
            <p class="text-small mt-2">{{link.name}}</p>
          </RouterLink>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #E1E3E1;
    border-radius: 50%;
  }
  .tooltip-container{
    line-height: 1.25;
  }

  .text-title{
    font-weight: 700;
    font-size: 96px;
  }

  .links-container{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 523px;
  }

  @media (max-width: 620px) {
    .links-container{
      width: 300px;
    }

    .text-title{
      font-size: 72px;
    }
  }
</style>