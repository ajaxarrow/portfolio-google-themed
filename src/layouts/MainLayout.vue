<script setup lang="ts">
import Search from "../components/Search.vue";
import Profile from "../assets/images/profile.jpg";
import MenuDialog from "../components/MenuDialog.vue";
import {useScreenStore} from "../stores/screenSizeStore.ts";
import {onMounted, ref, watch} from "vue";
import SearchView from "../views/SearchView.vue";
import {links} from "../data/links.ts";
import {useRoute} from "vue-router";
import {PhMagnifyingGlass} from "@phosphor-icons/vue";
import Footer from "../components/Footer.vue";


const route = useRoute()
const {isMobile, isSmall} = useScreenStore();
const isSmallLayout = ref(false);
const searchQuery = ref('');
const linksData = ref([...links]);

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
              @click="changeLayout"
              :searchQuery="searchQuery"
              :links="linksData"
              @update:searchQuery="$event => (searchQuery = $event)"
          />
        </div>
      </div>
      <div class="d-flex align-center ga-2">
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
      </div>
    </VRow>
    <div
        class="ma-0 mx-10 d-flex ga-3"
        :style="{
          paddingLeft: isMobile || isSmall ? '0px' : '150px',
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
    </div>
    <VDivider/>
    <div
      class="mx-5 mt-5"
      :style="{
        paddingLeft: isMobile || isSmall ? '0px' : '150px',
        minHeight: '85vh'
      }"
    >
      <div class="d-flex ga-7">
        <div
            :style="{
              width: isMobile || isSmall ? '100%' : '800px !important',
            }">
          <slot></slot>
        </div>
        <div v-if="!isMobile && !isSmall" class="side-details w-50"
        >
          <slot name="side-details">

          </slot>
        </div>
      </div>
      <div
        class="mt-5 mb-15"
        :style="{
          width: isMobile || isSmall ? '100%' : '800px',
        }"
      >
        <p class="text-suggestion mb-3">People Also Search For</p>
        <VRow class="ma-0 ga-3">
            <VCol v-for="link in links" class="pa-0" cols="5">
              <a class="text-decoration-none text-black" :href="link.link">
                <div class="suggestion-item">
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
</template>

<style scoped>
  .suggestion-item{
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f1f3f4;
  }

  .suggestion-item-text{
    font-weight: 500;
  }

  .suggestion-item:hover{
    background-color: #dbdfe1;

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
    color: #2D2D2D;
  }

  .active-link{

    border-bottom: 3px solid #4285F4;
    color: #4285F4;
    font-weight: 500;
  }
</style>