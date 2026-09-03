<script setup lang="ts">
import {computed, PropType} from "vue";
import {SearchItem} from "../interfaces/link.interface.ts";
import {fadeUpStagger} from "../composables/useMotionPresets.ts";
import {isArticleItem} from "../utils/entries.ts";
import SkeletonImage from "./SkeletonImage.vue";

const prop = defineProps({
  searchItem: {
    type: Object as PropType<SearchItem>,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const isArticle = computed(() => isArticleItem(prop.searchItem));
const articlePath = computed(() => `/article/${prop.searchItem?.id}`);
const displaySource = computed(() => isArticle.value ? articlePath.value : truncateString(prop.searchItem?.link));

function truncateString(str: string): string {
  if (str.length > 100) {
    return str.slice(0, 80) + "...";
  }
  return str;
}
</script>

<template>
  <component
      :is="isArticle ? 'RouterLink' : 'a'"
      v-bind="isArticle ? {to: articlePath} : {href: prop.searchItem?.link, target: '_blank', rel: 'noopener noreferrer'}"
      class="search-item text-decoration-none text-black"
      :id="prop.searchItem?.id"
      v-motion="fadeUpStagger(prop.index)"
  >
    <div class="pb-6 px-2 search-item-inner">
      <div class="d-flex ga-3 align-center mb-1">
        <VAvatar size="30" class="icon-container">
          <img :src="prop.searchItem?.icon" style="width: 14px !important;" alt="" role="presentation"/>
        </VAvatar>
        <div>
          <p class="link-title">{{prop.searchItem.name}}</p>
          <p class="link-source">{{displaySource}}</p>
        </div>
      </div>
      <span class="link-item">
        {{prop.searchItem.title}}
      </span>
      <div class="d-flex align-center ga-2">
        <div v-if="prop.searchItem?.image" class="design-image">
          <SkeletonImage :src="prop.searchItem?.image" :alt="prop.searchItem?.id"/>
        </div>
        <p class="link-description mt-1 pr-2">
          <span v-if="prop.searchItem.date" class="link-date">{{prop.searchItem.date}} · </span>{{prop.searchItem.description}}
        </p>
      </div>
    </div>
  </component>
</template>

<style scoped>
.icon-container{
  background-color: var(--grey-100);
  border: 1px solid var(--grey-300);
}

.link-title{
  font-size: 14px;
  color: var(--ink);
}

.link-source{
  font-size: 12px;
  color: var(--meta);
}

.link-item{
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  color: var(--google-link);
}

.link-description{
  color: var(--meta);
}

.link-date{
  color: var(--meta);
  font-weight: 500;
}

.search-item-inner{
  border-radius: 12px;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.search-item:hover{
  cursor: pointer;

  .search-item-inner{
    background-color: var(--grey-100);
  }

  .link-item{
    text-decoration: underline;
  }
}

.design-image{
  flex-shrink: 0;
  height: 75px !important;
  width: 140px !important;
  border: 1px solid var(--grey-300);
  border-radius: 8px;
}


</style>