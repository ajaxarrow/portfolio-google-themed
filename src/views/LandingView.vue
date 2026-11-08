<script setup lang="ts">
  import Profile from '../assets/images/closeup.webp'
  import Search from "../components/Search.vue";
  import {links} from "../data/links.ts";
  import {useScreenStore} from "../stores/screenSizeStore.ts";
  import {ref, watch, onMounted, nextTick} from "vue";
  import SearchView from "./SearchView.vue";
  import {socials} from "../data/socials.ts";
  import MenuDialog from "../components/MenuDialog.vue";
  import Wordmark from "../components/Wordmark.vue";
  import {fadeUpOnce, isReducedMotion} from "../composables/useMotionPresets.ts";

  const searchRef = ref();

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
      <a v-for="social in socials" :key="social.name" :target="social.link.startsWith('mailto:') ? undefined : '_blank'" rel="noopener noreferrer" :href="social.link" class="top-link mx-2 text-decoration-none text-base text-small">
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
    <main class="center" id="main">
      <div class="hero-col d-flex flex-column justify-center">
        <p class="text-title text-center mb-6">
          <Wordmark reveal/>
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
        <section class="profile icon-reveal" :class="{ 'icon-reveal--visible': iconsRevealed }" :style="{ transitionDelay: iconRevealDelay(0) }" aria-label="About Jiu Axl">
          <div class="profile-head">
            <img :src="Profile" alt="Portrait of Jiu Axl Tabilla" class="profile-photo" width="64" height="64">
            <div>
              <h1 class="profile-role"><span class="profile-name">Jiu Axl Tabilla</span><span class="profile-title">Full-stack software engineer</span></h1>
              <p class="profile-meta">Python · Django · Laravel · Vue.js</p>
            </div>
          </div>
          <p class="profile-status">
            <span class="status-dot" aria-hidden="true"></span>
            Open to remote work · Bukidnon, Philippines
          </p>
          <div class="cta-row">
            <a class="cta cta--primary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé (PDF)<span class="sr-only"> (opens in a new tab)</span></a>
            <a class="cta" href="mailto:axldamnaxl@gmail.com">Email me</a>
            <a class="cta" href="https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
        <nav class="chip-row icon-reveal" :class="{ 'icon-reveal--visible': iconsRevealed }" :style="{ transitionDelay: iconRevealDelay(2) }" aria-label="Sections">
          <RouterLink v-for="link in links" :key="link.name" :to="{path: link.link}" class="chip">
            <component :is="link.icon" size="18" :color="link.color" weight="duotone"/>
            {{ link.name }}
          </RouterLink>
        </nav>
        <p class="try icon-reveal" :class="{ 'icon-reveal--visible': iconsRevealed }" :style="{ transitionDelay: iconRevealDelay(4) }">
          Try searching
          <RouterLink v-for="q in ['django', 'figma', 'champion', 'aws']" :key="q" :to="{path: '/all', query: {q}}">{{ q }}</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
  .hero-col{
    width: min(584px, calc(100vw - 32px));
  }

  .icon-reveal{
    opacity: 0;
    transition: opacity var(--duration-base) var(--ease-out-quart);
  }

  .icon-reveal--visible{
    opacity: 1;
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

  .profile{
    background-color: var(--grey-50);
    border-radius: 16px;
    padding: 20px;
    margin-top: 24px;
  }

  .profile-head{
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile-photo{
    width: 64px;
    height: 64px;
    border-radius: 16px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .profile-role{
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--ink);
  }

  .profile-name{
    display: block;
    font-weight: 600;
  }

  .profile-title{
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--meta);
  }

  .profile-meta{
    font-size: 14px;
    color: var(--meta);
  }

  .profile-status{
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0;
    font-size: 14px;
    color: var(--ink);
  }

  .status-dot{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--googlegreen);
    flex-shrink: 0;
  }

  .cta-row{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cta{
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
    border-radius: 9999px;
    background-color: var(--surface);
    border: 1px solid var(--grey-300);
    color: var(--ink);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .cta:hover{ background-color: var(--grey-200); }

  .cta--primary{
    background-color: var(--google-link);
    border-color: var(--google-link);
    color: var(--surface);
  }

  .cta--primary:hover{ background-color: var(--link-pressed); }

  .chip-row{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
  }

  .chip{
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    padding: 0 10px;
    border-radius: 16px;
    background-color: var(--grey-100);
    color: var(--ink);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .chip:hover{ background-color: var(--grey-300); }

  .try{
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: var(--meta);
  }

  .try a{
    margin-left: 12px;
    color: var(--google-link);
    text-decoration: none;
  }

  .try a:hover{ text-decoration: underline; }

  .top-link{
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 6px;
  }

  .text-base:hover{
    text-decoration: underline !important;
  }
</style>
