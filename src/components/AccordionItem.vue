<script setup lang="ts">
import {PropType, ref} from 'vue';
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue';
import {QnAItem} from "../interfaces/link.interface.ts";

const props = defineProps({
  item: {
    type: Object as PropType<QnAItem>,
    required: true
  }
})

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="cursor-pointer mb-3" @click="toggleAccordion" >
    <div class="">
      <div
          class="d-flex align-center justify-space-between accordion-item pa-1"
          role="button"
          tabindex="0"
          :aria-expanded="isOpen"
          @keydown.enter="toggleAccordion"
          @keydown.space.prevent="toggleAccordion"
      >
        <p>{{props.item.question}}</p>
        <transition name="flip" mode="out-in">
          <component :is="isOpen ? PhCaretUp : PhCaretDown" />
        </transition>
      </div>
      <VExpandTransition>
        <div v-show="isOpen" class="accordion-description mt-3 pa-1" v-html="props.item.answer">

        </div>
      </VExpandTransition>
    </div>
    <VDivider class="mt-3" />
  </div>
</template>

<style scoped>
.accordion-description {
  transition: height 0.3s var(--ease-out-quart);
  overflow: hidden;
}

.accordion-item:hover{
  background-color: var(--grey-200);
  border-radius: 8px;
}

.flip-enter-active,
.flip-leave-active {
  transition: transform var(--duration-fast) var(--ease-out-quart);
}

.flip-enter-from,
.flip-leave-to {
  transform: rotate(0deg);
}

.flip-enter-to,
.flip-leave-from {
  transform: rotate(180deg);
}
</style>
