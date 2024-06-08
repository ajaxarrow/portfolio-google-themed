<script setup lang="ts">
import {PhArrowLeft, PhClockCounterClockwise, PhMagnifyingGlass, PhX} from "@phosphor-icons/vue";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const props = defineProps({
  searchQuery: String,
  links: Array
})
const emits = defineEmits(['update:searchQuery', 'change-layout'])
const router = useRouter();
const localQuery = ref(props.searchQuery);
const activeSearchItem = ref("");



const handleHover = (name: string) => {
  activeSearchItem.value = name;
}

const navigateTo = (path: string) => {
  router.push(path)
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
  <VLayout>
    <VAppBar elevation="0">
      <VTextField
        @keydown.enter="navigateTo(<string>props.searchQuery)"
        autofocus
        v-model="localQuery"
      >
        <template v-slot:prepend-inner>
          <PhArrowLeft
            @click="emits('change-layout')"
            class="mx-1 cursor-pointer"
          />
        </template>
        <template v-slot:append-inner>
          <VIcon
              class="mx-1"
          >
            mdi-magnify
          </VIcon>
          <VIcon
              class="mx-1"
          >
            mdi-close
          </VIcon>
        </template>
      </VTextField>
    </VAppBar>
    <VMain>
      <div
          @click="navigateTo(<string>props.searchQuery)"
          v-if="searchQuery !== ''"
          class="py-3 search-query text-black d-flex align-center justify-space-between cursor-pointer"
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
          class="px-5 py-3 search-suggestion-item text-black d-flex align-center justify-space-between cursor-pointer"
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
    </VMain>
  </VLayout>
</template>

<style scoped>
.search-suggestion-item:hover, .search-query{
  background-color: #e9e9ea;
}

.search-query{
  padding: 0 17px;
  border-left: 3px solid #4285F4;
}

.delete-icon:hover{
  border-radius: 50%;
  background-color: #cacace;
}

</style>