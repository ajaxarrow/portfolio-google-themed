<script setup lang="ts">
import {PhArrowLeft, PhClockCounterClockwise, PhMagnifyingGlass, PhX} from "@phosphor-icons/vue";
import {Link} from "../interfaces/link.interface.ts";
import {PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useEasterEggs} from "../composables/useEasterEggs.ts";
import {resolveSearchDestination} from "../utils/search.ts";

const props = defineProps({
  searchQuery: String,
  links: Object as PropType<Link[]>
})
const emits = defineEmits(['update:searchQuery', 'change-layout'])
const router = useRouter();
const {tryTrigger} = useEasterEggs();
const localQuery = ref(props.searchQuery);

const navigateTo = (path: string) => {
  if (tryTrigger(path)) return;
  router.push(resolveSearchDestination(path))
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
        density="default"
        @keydown.enter="navigateTo(<string>props.searchQuery)"
        autofocus
        v-model="localQuery"
      >
        <template v-slot:prepend-inner>
          <PhArrowLeft
            weight="bold"
            color="var(--googleblue)"
            @click="emits('change-layout')"
            @keydown.enter="emits('change-layout')"
            class="mx-1 cursor-pointer delete-icon"
            aria-label="Go back"
            role="button"
            tabindex="0"
          />
        </template>
        <template v-slot:append-inner>
          <PhX
            @click="localQuery = ''"
            @keydown.enter="localQuery = ''"
            v-if="localQuery"
            class="mx-1 delete-icon cursor-pointer"
            aria-label="Clear search"
            role="button"
            tabindex="0"
          />
        </template>
      </VTextField>
    </VAppBar>
    <VMain>
      <div
          @click="navigateTo(<string>props.searchQuery)"
          @keydown.enter="navigateTo(<string>props.searchQuery)"
          v-if="searchQuery !== ''"
          class="py-3 search-query text-black d-flex align-center justify-space-between cursor-pointer"
          role="button"
          tabindex="0"
      >
        <div class="d-flex align-center ga-2">
          <PhMagnifyingGlass/>
          <p>{{searchQuery}} - Search</p>
        </div>
      </div>
      <div
          @click="navigateTo(link.link)"
          @keydown.enter="navigateTo(link.link)"
          v-for="(link, index) in props.links"
          :key="index"
          class="px-5 py-3 search-suggestion-item text-black d-flex align-center justify-space-between cursor-pointer"
          role="button"
          tabindex="0"
      >
        <div class="d-flex align-center ga-2">
          <PhClockCounterClockwise/>
          <p>{{link.name.toLowerCase()}}</p>
        </div>
        <PhX
            @click="removeLink(index, $event)"
            @keydown.enter="removeLink(index, $event as unknown as MouseEvent)"
            class="delete-icon"
            aria-label="Remove from history"
            role="button"
            tabindex="0"/>
      </div>
    </VMain>
  </VLayout>
</template>

<style scoped>
.search-suggestion-item, .search-query {
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.search-suggestion-item:hover, .search-query{
  background-color: var(--grey-200);
}

.search-query{
  padding: 0 20px;
  font-weight: 500;
}

.delete-icon:hover{
  border-radius: 50%;
  background-color: var(--grey-400);
}

</style>