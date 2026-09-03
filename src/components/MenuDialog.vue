<script setup lang="ts">
  import {PhDotsNine, PhMagnifyingGlass} from "@phosphor-icons/vue";
  import {ref} from "vue";
  import {Link} from "../interfaces/link.interface.ts";
  import {links} from "../data/links.ts";
  import {socials} from "../data/socials.ts";
  import {scaleInStagger} from "../composables/useMotionPresets.ts";

  const menuDialog = ref(false);

  const emit = defineEmits(['focus-search']);

  const items: Link[] = [
    {
      name: 'Search',
      link: '/',
      color: 'var(--googlegreen)',
      icon: PhMagnifyingGlass
    },
    ...links,
  ]

  // The "Search" item never navigates: whichever page rendered this menu already has
  // its own visible search box (LandingView's hero search or MainLayout's topbar
  // search), so we just ask the parent to focus that local box.
  function handleMenuItemClick(link: Link) {
    menuDialog.value = false;
    if (link.name === 'Search') {
      emit('focus-search');
    }
  }
</script>

<template>
  <VMenu
      v-model="menuDialog"
      :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <PhDotsNine
          :class="{'icon': menuDialog}"
          v-bind="props"
          class="mx-2 cursor-pointer menu-icon"
          size="24"
          weight="bold"
          aria-label="Open menu"
          role="button"
          tabindex="0"
          @keydown.enter="menuDialog = true"
          @keydown.space.prevent="menuDialog = true"
      />
    </template>
    <VSheet class="menu-container px-2 pt-4 pb-10 mt-2" width="300">
      <component
          :is="link.name === 'Search' ? 'div' : 'RouterLink'"
          v-bind="link.name === 'Search' ? {tabindex: 0, role: 'button'} : {to: {path: link.link}}"
          @click="handleMenuItemClick(link)"
          @keydown.enter="handleMenuItemClick(link)"
          @keydown.space.prevent="handleMenuItemClick(link)"
          v-for="(link, index) in items"
          :key="link.name"
          v-motion="scaleInStagger(index)"
          class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black pa-2 menu-item ">
        <div class="menu-item-container">
          <component :is="link.icon" size="36" :color="link.color" weight="duotone"/>
        </div>
        <p class="mt-2 text-center" style="font-size: 14px">{{link.name}}</p>
      </component>
      <a
          v-for="(link, index) in socials"
          :key="link.name"
          v-motion="scaleInStagger(items.length + index)"
          class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black pa-2 menu-item "
          target="_blank"
          rel="noopener noreferrer"
          :href="link.link">
        <div class="menu-item-container">
          <component :is="link.icon" size="36" :color="link.color" weight="duotone"/>
        </div>
        <p class="mt-2 text-center" style="font-size: 14px">{{link.name}}</p>
      </a>
    </VSheet>
  </VMenu>
</template>

<style scoped>
  .menu-container{
    border-radius: 24px !important;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .menu-item:hover{
    background-color: var(--grey-200);
    border-radius: 10px;
  }

  .menu-item{
    width: 80px;
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .icon{
    border-radius: 50%;
    color: var(--googleblue);
  }

  .menu-icon:hover{
    color: var(--grey-400);
  }
</style>