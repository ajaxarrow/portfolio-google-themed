<script setup lang="ts">
import {PhMagnifyingGlass} from "@phosphor-icons/vue";
import {ref} from "vue";

const isActive = ref(false);

// Event handlers to update the active state
const handleFocus = () => {
  isActive.value = true;
};

const handleBlur = () => {
  isActive.value = false;
};
</script>

<template>
  <div class="search-container">
    <VTextField
        @focus="handleFocus"
        @blur="handleBlur"
        placeholder="Search information about Jiu Axl"
        class="my-2 search"
        hide-details
        rounded="lg"
        density="compact"
        variant="outlined"
        base-color="gs60"
    >
      <template #prepend-inner>
        <PhMagnifyingGlass size="20" color="#666464"/>
      </template>
    </VTextField>
    <div v-if="isActive">
    </div>
  </div>
</template>

<style scoped>

  .search-container{
    width: 523px;
    border-radius: 25px;
    overflow: hidden;
    color: #8C8C8C;
    box-shadow: 0 0 0 1px #E5E5E5;
  }

  @media (max-width: 620px) {
    .search-container{
      width: 350px;
    }
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
</style>