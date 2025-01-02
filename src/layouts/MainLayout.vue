<script setup lang="ts">
import Search from "../components/Search.vue";
import Profile from "../assets/images/profile.jpg";
import MenuDialog from "../components/MenuDialog.vue";
import {useScreenStore} from "../stores/screenSizeStore.ts";
import {ref, watch} from "vue";
import SearchView from "../views/SearchView.vue";
import {links} from "../data/links.ts";

const {isMobile, isLargePhone} = useScreenStore();
const isSmallLayout = ref(false);
const searchQuery = ref('');
const linksData = ref([...links]);

const filterLinks = () => {
  linksData.value = links.filter(link => link.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
}

const changeLayout = () => {
  if(isMobile.value || isLargePhone.value) {
    isSmallLayout.value = true;
  }
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
  <div v-else>
    <div v-if="isMobile || isLargePhone">
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
      <div class="d-flex ga-6" style="width: 60%">
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
          paddingLeft: isMobile || isLargePhone ? '0px' : '150px',
          paddingTop: isMobile || isLargePhone ? '70px' : '0px',
        }"
    >
      <RouterLink
        v-for="link in links" :key="link.name" class=" text-decoration-none text-black" :to="link.link">
        <div
            class="align-center cursor-pointer link-item"
            :class="{ 'active-link': $route.path === link.link }"
        >
          {{ link.name }}
        </div>
      </RouterLink>
    </div>
    <VDivider/>
  </div>

    <div
        class="mx-5 mt-5"
        :style="{
          paddingLeft: isMobile || isLargePhone ? '0px' : '150px',
        }">
      <slot>

      </slot>
    </div>
</template>

<style scoped>
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
  }

  .active-link{
    border-bottom: 3px solid #000;
  }
</style>