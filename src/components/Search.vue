<script setup lang="ts">
import {PhClockCounterClockwise, PhMagnifyingGlass, PhX} from "@phosphor-icons/vue";
import {PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {Link} from "../interfaces/link.interface.ts";
import {useEasterEggs} from "../composables/useEasterEggs.ts";
import {resolveSearchDestination} from "../utils/search.ts";

const isActive = ref(false);
const activeSearchItem = ref("");
const textFieldRef = ref();

defineExpose({
  focus: () => textFieldRef.value?.focus(),
});

const props = defineProps({
  searchQuery: String,
  links: Object as PropType<Link[]>
})

const emits = defineEmits(['update:searchQuery'])
const localQuery = ref(props.searchQuery);

const router = useRouter();
const {tryTrigger} = useEasterEggs();

const handleFocus = () => {
  isActive.value = true;
};

// Closes the suggestions overlay only once focus actually leaves the whole
// search container (text field + dropdown), not merely between the two — this
// correctly handles both mouse clicks and Tab/keyboard navigation into a
// suggestion row, since every row is now a focusable element itself.
const handleContainerFocusOut = (event: FocusEvent) => {
  const container = event.currentTarget as HTMLElement;
  const next = event.relatedTarget as Node | null;
  if (!next || !container.contains(next)) {
    isActive.value = false;
  }
};

const handleHover = (name: string) => {
  activeSearchItem.value = name;
}

const navigateTo = (path: string) => {
  if (tryTrigger(path)) return;
  router.push(resolveSearchDestination(path));
}

const removeLink = (index: number, event: MouseEvent) => {
  event.stopPropagation();
  props.links!.splice(index, 1)
}

watch(() => localQuery.value, () => {
 emits('update:searchQuery', localQuery.value)
})

watch(() => props.searchQuery, (newQuery) => {
  localQuery.value = newQuery;
});


</script>

<template>
  <div class="search-container" @focusout="handleContainerFocusOut">
    <VTextField
        ref="textFieldRef"
        @keydown.enter="navigateTo(<string>props.searchQuery)"
        @focus="handleFocus"
        v-model="localQuery"
        placeholder="Search information about Jiu Axl"
        class="my-2 search"
        hide-details
        rounded="lg"
        density="compact"
        variant="outlined"
    >
      <template #prepend-inner>
        <PhMagnifyingGlass size="18" color="var(--meta)" class="ml-2"/>
      </template>
    </VTextField>
    <Transition name="suggestions">
    <div v-if="isActive" class="overlay pb-2">
      <div
          @click="navigateTo(<string>props.searchQuery)"
          @keydown.enter="navigateTo(<string>props.searchQuery)"
          v-if="searchQuery !== ''"
          class="py-3 mr-5 search-query text-black d-flex align-center justify-space-between cursor-pointer"
          role="button"
          tabindex="0"
      >
        <div class="d-flex align-center ga-2">
          <PhMagnifyingGlass/>
          <p>{{searchQuery}} - Search</p>
        </div>
      </div>
      <div
          v-for="(link, index) in props.links"
          @click="navigateTo(link.link)"
          @keydown.enter="navigateTo(link.link)"
          @mouseleave="handleHover('')"
          @mouseover="handleHover(link.name)"
          @focus="handleHover(link.name)"
          :key="index"
          class="px-5 py-3 mr-5 search-suggestion-item text-black d-flex align-center justify-space-between cursor-pointer"
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
          tabindex="0"
          v-if="link.name.toLowerCase() === activeSearchItem.toLowerCase()"/>
      </div>

    </div>
    </Transition>
  </div>
</template>

<style scoped>
  .search-container {
    width: 100%;
    box-sizing: border-box;
    border-radius: 24px; /* rounded.lg: stays a soft box when suggestions expand it; a pill radius turns the tall dropdown into an ellipse */
    color: var(--meta);
    border: 1px solid var(--grey-300);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    isolation: isolate;
    transition: border-color var(--duration-fast) var(--ease-out-quart),
      box-shadow var(--duration-fast) var(--ease-out-quart);
  }

  .search-container:focus-within {
    border-color: var(--googleblue);
    box-shadow: 0 0 0 0.5px var(--googleblue);
  }

  .overlay{
    background-color: var(--surface);
  }

  .suggestions-enter-active,
  .suggestions-leave-active {
    transition: opacity var(--duration-base) var(--ease-out-quart),
      transform var(--duration-base) var(--ease-out-quart);
  }

  .suggestions-enter-from,
  .suggestions-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  .search-suggestion-item, .search-query {
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .search-suggestion-item:hover, .search-query{
    background-color: var(--grey-200);
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  .search-query{
    padding: 0 20px;
    font-weight: 500;
  }

  .delete-icon:hover{
    border-radius: 50%;
    background-color: var(--grey-400);
  }

  :deep(.v-label){
    opacity: 100% !important;
  }

  :deep(.v-icon){
    --v-icon-size-multiplier: 1.23
  }

  :deep(.v-field__outline) {
    opacity: 0%;
  }

  :deep(input::placeholder) {
    color: var(--meta);
    opacity: 90%;
  }

</style>