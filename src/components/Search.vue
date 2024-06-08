<script setup lang="ts">
import {PhClockCounterClockwise, PhMagnifyingGlass, PhX} from "@phosphor-icons/vue";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const isActive = ref(false);
const activeSearchItem = ref("");

const props = defineProps({
  searchQuery: String,
  links: Array
})

const emits = defineEmits(['update:searchQuery'])
const localQuery = ref(props.searchQuery);

const isClickingLink = ref(false);
const router = useRouter();

const handleFocus = () => {
  isActive.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    if (!isClickingLink.value) {
      isActive.value = false;
    }
  }, 150);
};

const handleHover = (name: string) => {
  activeSearchItem.value = name;
}

const navigateTo = (path: string) => {
  isClickingLink.value = true;
  router.push(path).then(() => {
    isClickingLink.value = false;
  });
}

const removeLink = (index: number, event: MouseEvent) => {
  event.stopPropagation();
  props.links!.splice(index, 1)
}

watch(() => localQuery.value, () => {
 emits('update:searchQuery', localQuery.value)
})
</script>

<template>
  <div class="search-container">
    <VTextField
        @keydown.enter="navigateTo(<string>props.searchQuery)"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="localQuery"
        placeholder="Search information about Jiu Axl"
        class="my-2 search"
        hide-details
        rounded="lg"
        density="compact"
        variant="outlined"
    >
      <template #prepend-inner>
        <PhMagnifyingGlass size="18" color="#666464" class="ml-2"/>
      </template>
    </VTextField>
    <div v-if="isActive" class="overlay pb-2">
      <div
          @click="navigateTo(<string>props.searchQuery)"
          v-if="searchQuery !== ''"
          class="py-3 mr-5 search-query text-black d-flex align-center justify-space-between cursor-pointer"
      >
        <div class="d-flex align-center ga-2">
          <PhMagnifyingGlass/>
          <p>{{searchQuery}} - Search</p>
        </div>
      </div>
      <div
          @click="navigateTo(link.link)"
          @mouseleave="handleHover('')"
          @mouseover="handleHover(link.name)"
          v-for="(link, index) in props.links"
          :key="index"
          class="px-5 py-3 mr-5 search-suggestion-item text-black d-flex align-center justify-space-between cursor-pointer"
      >
        <div class="d-flex align-center ga-2">
          <PhClockCounterClockwise/>
          <p>{{link.name.toLowerCase()}}</p>
        </div>
        <PhX
          @click="removeLink(index, $event)"
          class="delete-icon"
          v-if="link.name.toLowerCase() === activeSearchItem.toLowerCase()"/>
      </div>

    </div>
  </div>
</template>

<style scoped>

  .search-container {
    width: 523px;
    border-radius: 25px;
    color: #8C8C8C;
    box-shadow: 0 0 0 1px #E5E5E5;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .overlay{
    background-color: #ffffff;
  }

  .search-suggestion-item:hover, .search-query{
    background-color: #e9e9ea;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  .search-query{
    padding: 0 17px;
    border-left: 3px solid #4285F4;
  }

  .delete-icon:hover{
    border-radius: 50%;
    background-color: #cacace;
  }

  :deep .v-label{
    opacity: 100% !important;
  }

  :deep .v-icon{
    --v-icon-size-multiplier: 1.23
  }

  :deep .v-field__outline {
    opacity: 0%;
    color: #8C8C8C;
    --v-field-border-width: 1.75px !important;
    box-shadow: 0 0 0 1px #E5E5E5;

  }

  :deep input::placeholder {
    color: #666464;
    opacity: 90%;
  }

  @media (max-width: 580px) {
    .search-container{
      width: 400px;
    }
  }

  @media (max-width: 450px) {
    .search-container{
      width: 300px;
    }
  }
</style>