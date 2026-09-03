<script setup lang="ts">
  import Profile from '../assets/images/closeup.jpg'
  import Search from "../components/Search.vue";
  import {links} from "../data/links.ts";
  import {useScreenStore} from "../stores/screenSizeStore.ts";
  import {ref, watch, onMounted, nextTick} from "vue";
  import SearchView from "./SearchView.vue";
  import {socials} from "../data/socials.ts";
  import MenuDialog from "../components/MenuDialog.vue";
  import {fadeUpOnce, isReducedMotion} from "../composables/useMotionPresets.ts";

  const searchRef = ref();

  const letterMotion = (index: number) => fadeUpOnce(index * 45, {durationMs: 260, riseYPx: 10});
  const searchMotion = () => fadeUpOnce(350, {durationMs: 300, riseYPx: 12});

  // Plain CSS opacity fade (no transform) for the icon grid: it sits directly beneath
  // the search box, in the area the suggestions overlay expands over, and @vueuse/motion
  // leaves a permanent transform on animated elements even at rest, which can make the
  // overlay's opaque background fail to fully occlude content behind it.
  const iconsRevealed = ref(isReducedMotion());
  const iconRevealDelay = (index: number) => isReducedMotion() ? '0ms' : `${500 + index * 50}ms`;
  onMounted(() => {
    nextTick(() => { iconsRevealed.value = true; });
  });


  const {isMobile} = useScreenStore();
  const isSmallLayout = ref(false);
  const searchQuery = ref('');
  const linksData = ref([...links]);

  const filterLinks = () => {
    linksData.value = links.filter(link => link.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  const changeLayout = () => {
    isSmallLayout.value = !!isMobile.value;
  }

  watch(() => searchQuery.value, filterLinks)

  // Triggered by the app-launcher menu's "Search" item (see MenuDialog.vue). We're
  // already home, so just focus the hero search box directly, no navigation needed.
  const handleFocusSearch = () => {
    if (isMobile.value) {
      changeLayout(); // SearchView already autofocuses its own field
    } else {
      nextTick(() => searchRef.value?.focus());
    }
  };

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
      <MenuDialog @focus-search="handleFocusSearch"/>
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
          <span v-motion="letterMotion(0)" class="text-googleblue">j</span>
          <span v-motion="letterMotion(1)" class="text-googlered">i</span>
          <span v-motion="letterMotion(2)" class="text-googlegreen">u</span>
          <span v-motion="letterMotion(3)" class="text-googleyellow">a</span>
          <span v-motion="letterMotion(4)" class="text-googleblue">x</span>
          <span v-motion="letterMotion(5)" class="text-googlered">l</span>
          <span v-motion="letterMotion(6)" class="text-googleyellow">.</span>
        </p>
        <div class="position-relative mb-15" v-motion="searchMotion()">
          <Search
            ref="searchRef"
            @click="changeLayout"
            :searchQuery="searchQuery"
            :links="linksData"
            @update:searchQuery="$event => (searchQuery = $event)"
          />
        </div>
        <div class="links-container mt-5">
          <RouterLink
            v-for="(link, index) in links"
            :key="link.name"
            class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black link-item icon-reveal"
            :class="{ 'icon-reveal--visible': iconsRevealed }"
            :style="{ transitionDelay: iconRevealDelay(index) }"
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
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .icon-reveal{
    opacity: 0;
    transition: opacity var(--duration-base) var(--ease-out-quart);
  }

  .icon-reveal--visible{
    opacity: 1;
  }

  .link-item:hover{
    background-color: var(--grey-300);
  }


  .icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: var(--grey-200);
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
    font-size: clamp(2.5rem, 3rem + 4vw, 6rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
    text-wrap: balance;
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
  }

  @media (max-width: 450px) {
    .links-container{
      width: 300px;
    }
  }

  .text-base:hover{
    text-decoration: underline !important;
  }
</style>