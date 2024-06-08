<script setup lang="ts">
  import Profile from '../assets/images/profile.jpg'
  import Search from "../components/Search.vue";
  import {links} from "../data/links.ts";
  import {useScreenStore} from "../stores/screenSizeStore.ts";
  import {ref, watch} from "vue";
  import SearchView from "./SearchView.vue";
  import {socials} from "../data/socials.ts";
  import MenuDialog from "../components/MenuDialog.vue";


  const {isMobile} = useScreenStore();
  const isSmallLayout = ref(false);
  const searchQuery = ref('');
  const linksData = ref(links);

  const filterLinks = () => {
    linksData.value = links.filter(link => link.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  const changeLayout = () => {
    isSmallLayout.value = !!isMobile.value;
  }

  watch(() => searchQuery.value, filterLinks)

</script>

<template>
  <div v-if="isSmallLayout">
    <SearchView
      @change-layout="isSmallLayout = false"
      @update:searchQuery="$event => (searchQuery = $event)"
      :searchQuery="searchQuery"
      :links="linksData"
    />
  </div>
  <div v-else class="pa-6">
    <VRow align="center" justify="end" class="ma-0">
      <a v-for="social in socials" target="_blank" :href="social.link" class="mx-2 text-decoration-none text-base text-small">
        {{social.name}}
      </a>
      <MenuDialog/>
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
            <p class="text-small font-weight-medium">Portfolio</p>
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
          <Search
            @click="changeLayout"
            :searchQuery="searchQuery"
            :links="linksData"
            @update:searchQuery="$event => (searchQuery = $event)"
          />
        </div>
        <div class="links-container mt-5">
          <RouterLink
            v-for="link in links"
            :key="link.name"
            class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black link-item"
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


  .link-item{
    padding: 15px;
    border-radius: 10px;
  }

  .link-item:hover{
    background-color: #dbe0e3;
  }


  .icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #E1E3E1;
    border-radius: 50%;
  }

  .menu-item-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
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

  @media (max-width: 580px) {
    .links-container{
      width: 400px;
    }

    .text-title{
      font-size: 72px;
    }
  }

  @media (max-width: 450px) {
    .links-container{
      width: 300px;
    }

    .text-title{
      font-size: 64px;
    }

  }
</style>