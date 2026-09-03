<script setup lang="ts">
import Search from "../components/Search.vue";
import Profile from "../assets/images/closeup.jpg";
import MenuDialog from "../components/MenuDialog.vue";
import {useScreenStore} from "../stores/screenSizeStore.ts";
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import SearchView from "../views/SearchView.vue";
import {links} from "../data/links.ts";
import {useRoute} from "vue-router";
import {PhMagnifyingGlass} from "@phosphor-icons/vue";
import Footer from "../components/Footer.vue";
import SideProfile from "../components/SideProfile.vue";
import SideAboutPortfolio from "../components/SideAboutPortfolio.vue";
import SideArticleInfo from "../components/SideArticleInfo.vue";
import {fadeUpStagger} from "../composables/useMotionPresets.ts";

const sideComponents: Record<string, any> = {
  profile: SideProfile,
  aboutPortfolio: SideAboutPortfolio,
  article: SideArticleInfo,
};


const route = useRoute()
const {isMobile, isSmall} = useScreenStore();

const sideComponent = computed(() => {
  const side = route.meta.side as string | undefined;
  return side ? sideComponents[side] : null;
});

const isFullWidth = computed(() => !!route.meta.fullWidth);

const navContainer = ref<HTMLElement | null>(null);
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)', opacity: 0 });

const updateIndicator = () => {
  nextTick(() => {
    const activeEl = navContainer.value?.querySelector<HTMLElement>('.active-link');
    if (!activeEl || !navContainer.value) {
      indicatorStyle.value = { ...indicatorStyle.value, opacity: 0 };
      return;
    }
    const containerRect = navContainer.value.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    indicatorStyle.value = {
      width: `${activeRect.width}px`,
      transform: `translateX(${activeRect.left - containerRect.left}px)`,
      opacity: 1,
    };
  });
};

watch(() => route.path, updateIndicator);
onMounted(() => {
  updateIndicator();
  window.addEventListener('resize', updateIndicator);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator);
});
const isSmallLayout = ref(false);
const searchQuery = ref('');
const linksData = ref([...links]);
const searchRef = ref();

// Triggered by the app-launcher menu's "Search" item (see MenuDialog.vue). We're
// already on a page with its own topbar search box, so just focus it directly.
const handleFocusSearch = () => {
  nextTick(() => searchRef.value?.focus());
};

const filterLinks = () => {
  linksData.value = links.filter(link => link.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
}

const changeLayout = () => {
  if(isMobile.value || isSmall.value) {
    isSmallLayout.value = true;
  }
}

const getFirstSegment = (path: string) => {
  return path.split("/")[1] || "";
};

watch(() => searchQuery.value, filterLinks)

watch(
    () => route.path,
    (newPath) => {
      searchQuery.value = newPath ? getFirstSegment(newPath) : "";
    }
);

onMounted(() => {
  if (route.path) {
    searchQuery.value = getFirstSegment(route.path);
  }
});
</script>

<template>
 <div class="main-layout-root">
  <div v-if="isSmallLayout">
    <SearchView
        @change-layout="isSmallLayout = false"
        @update:searchQuery="$event => (searchQuery = $event)"
        :searchQuery="searchQuery"
        :links="linksData"
    />
  </div>
  <div v-else>
    <div v-if="isMobile || isSmall">
      <VRow class="ma-0 px-6 pt-6" justify="center" >
        <RouterLink class="text-logo text-center mb-3 text-decoration-none" to="/">
          <span class="text-googleblue">j</span>
          <span class="text-googlered">i</span>
          <span class="text-googlegreen">u</span>
          <span class="text-googleyellow">a</span>
          <span class="text-googleblue">x</span>
          <span class="text-googlered">l</span>
          <span class="text-googleyellow">.</span>
        </RouterLink>
      </VRow>
      <div class="position-relative mx-3">
        <Search
          @click="changeLayout"
          :searchQuery="searchQuery"
          :links="linksData"
          @update:searchQuery="$event => (searchQuery = $event)"
        />
      </div>

    </div>
    <VRow
        v-else
        class="ma-0 px-6 pt-6 pb-2"
        align="center"
        justify="space-between"
    >
      <div class="d-flex ga-6" style="width: 800px">
        <RouterLink class="text-logo text-center mb-3 text-decoration-none" to="/">
          <span class="text-googleblue">j</span>
          <span class="text-googlered">i</span>
          <span class="text-googlegreen">u</span>
          <span class="text-googleyellow">a</span>
          <span class="text-googleblue">x</span>
          <span class="text-googlered">l</span>
          <span class="text-googleyellow">.</span>
        </RouterLink>
        <div class="position-relative w-100" >
          <Search
              ref="searchRef"
              @click="changeLayout"
              :searchQuery="searchQuery"
              :links="linksData"
              @update:searchQuery="$event => (searchQuery = $event)"
          />
        </div>
      </div>
      <div class="d-flex align-center ga-2">
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
      </div>
    </VRow>
    <div
        ref="navContainer"
        class="ma-0 mx-10 d-flex ga-3 nav-links-container"
        :style="{
          paddingLeft: isMobile || isSmall ? '0px' : 'var(--layout-rail-offset)',
          paddingTop: isMobile || isSmall ? '70px' : '0px',
          overflowX: 'auto',
        }"
    >
      <RouterLink
        v-for="link in links" :key="link.name" class=" text-decoration-none text-black" :to="link.link">
        <div
            class="align-center cursor-pointer link-item d-flex align-center ga-2"
            :class="{ 'active-link': $route.path === link.link }"
        >
          <component :is="link.icon" /> {{ link.name }}
        </div>
      </RouterLink>
      <div class="nav-indicator" :style="indicatorStyle"></div>
    </div>
    <VDivider/>
    <div
      class="mx-5 mt-5"
      :style="{
        paddingLeft: isMobile || isSmall || isFullWidth ? '0px' : 'var(--layout-rail-offset)',
        minHeight: '85vh'
      }"
    >
      <div class="d-flex ga-7">
        <div
            :style="{
              width: isMobile || isSmall || isFullWidth ? '100%' : 'var(--layout-content-width) !important',
            }">
          <RouterView v-slot="{ Component }">
            <Transition name="results" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </Transition>
          </RouterView>
        </div>
        <div v-if="!isMobile && !isSmall && !isFullWidth" class="side-details w-50"
        >
          <component :is="sideComponent" v-if="sideComponent" />
        </div>
      </div>
      <div
        v-if="!isFullWidth"
        class="mt-5 mb-15"
        :style="{
          width: isMobile || isSmall ? '100%' : 'var(--layout-content-width)',
        }"
      >
        <p class="text-suggestion mb-3">People Also Search For</p>
        <VRow class="ma-0 ga-3">
            <VCol v-for="(link, index) in links" :key="link.name" class="pa-0" cols="5">
              <a class="text-decoration-none text-black" :href="link.link">
                <div class="suggestion-item" v-motion="fadeUpStagger(index)">
                  <div class="suggestion-item-text">
                    {{ link.name }}
                  </div>
                  <PhMagnifyingGlass/>
                </div>
              </a>
            </VCol>
        </VRow>
      </div>
    </div>

  </div>
  <Footer/>
 </div>
</template>

<style scoped>
  .results-enter-active,
  .results-leave-active {
    transition: opacity var(--duration-base) var(--ease-out-quart),
      transform var(--duration-base) var(--ease-out-quart);
  }

  .results-enter-from,
  .results-leave-to {
    opacity: 0;
    transform: translateY(8px);
  }

  .nav-links-container{
    position: relative;
  }

  .nav-indicator{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    border-radius: 2px;
    background-color: var(--googleblue);
    transition: transform var(--duration-base) var(--ease-out-quart),
      width var(--duration-base) var(--ease-out-quart),
      opacity var(--duration-fast) var(--ease-out-quart);
    pointer-events: none;
  }

  .suggestion-item{
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: var(--grey-100);
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .suggestion-item-text{
    font-weight: 500;
  }

  .suggestion-item:hover{
    background-color: var(--grey-300);

    .suggestion-item-text{
      text-decoration: underline;
    }
  }
  .text-suggestion{
    font-weight: 500;
    font-size: 20px;
  }
  .text-logo{
    font-size: 36px;
    font-weight: 800;
  }

  .tooltip-container{
    line-height: 1.25;
  }

  .link-item{
    padding-right: 10px !important;
    padding-left: 10px !important;
    padding-bottom: 10px !important;
    color: var(--ink);
  }

  .active-link{
    color: var(--googleblue);
    font-weight: 500;
  }
</style>