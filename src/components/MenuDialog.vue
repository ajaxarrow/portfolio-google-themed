<script setup lang="ts">
  import {PhDotsNine, PhMagnifyingGlass} from "@phosphor-icons/vue";
  import {ref} from "vue";
  import {Link} from "../interfaces/link.interface.ts";
  import {links} from "../data/links.ts";
  import {socials} from "../data/socials.ts";

  const menuDialog = ref(false);

  const items: Link[] = [
    {
      name: 'Search',
      link: '/',
      color: '#00b503',
      icon: PhMagnifyingGlass
    },
    ...links,
  ]
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
      />
    </template>
    <VSheet class="menu-container px-2 pt-4 pb-10 mt-2" width="300">
      <RouterLink
          @click="menuDialog = false"
          v-for="link in items"
          :key="link.name"
          class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black pa-2 menu-item "
          :to="{path: link.link}">
        <div class="menu-item-container">
          <component :is="link.icon" size="36" :color="link.color" weight="duotone"/>
        </div>
        <p class="mt-2 text-center" style="font-size: 14px">{{link.name}}</p>
      </RouterLink>
      <a
          v-for="link in socials"
          :key="link.name"
          class="d-flex flex-column align-center cursor-pointer text-decoration-none text-black pa-2 menu-item "
          target="_blank"
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
    background-color: #e9f3f8;
    border-radius: 10px;
  }

  .menu-item{
    width: 80px
  }

  .icon{
    border-radius: 50%;
    color: #4285F4;
  }

  .menu-icon:hover{
    color: #8ca3c7;
  }
</style>