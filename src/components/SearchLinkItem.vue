<script setup lang="ts">
import {PropType} from "vue";
import {SearchItem} from "../interfaces/link.interface.ts";

const prop = defineProps({
  searchItem: Object as PropType<SearchItem>
})

function truncateString(str: string): string {
  if (str.length > 100) {
    return str.slice(0, 80) + "...";
  }
  return str;
}
</script>

<template>
  <a :href="prop.searchItem?.link" class="search-item text-decoration-none text-black" :id="prop.searchItem?.id">
    <div class="pb-6">
      <div class="d-flex ga-3 align-center mb-1">
        <VAvatar size="30" class="icon-container">
          <img :src="prop.searchItem?.icon" style="width: 14px !important;" alt=""/>
        </VAvatar>
        <div>
          <p class="link-title">{{prop.searchItem.name}}</p>
          <p class="link-source">{{truncateString(prop.searchItem.link)}}</p>
        </div>
      </div>
      <a class="link-item" :href="prop.searchItem?.link">
        {{prop.searchItem.title}}
      </a>
      <div class="d-flex align-center ga-2">
        <img v-if="prop.searchItem?.image" :src="prop.searchItem?.image" :alt="prop.searchItem?.id" class="design-image"/>
        <p class="link-description mt-1 pr-2">
          {{prop.searchItem.description}}
        </p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.icon-container{
  background-color: #e5e5e5;
  border: 1px solid #cacace;
}

.link-title{
  font-size: 14px;
}

.link-source{
  font-size: 12px;
}

.link-item{
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
}

.search-item:hover{
  cursor: pointer;

  .link-item{
    text-decoration: underline;
  }
}

.design-image{
  flex-shrink: 0;
  height: 75px !important;
  width: 140px !important;
  object-fit: cover;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
}


</style>