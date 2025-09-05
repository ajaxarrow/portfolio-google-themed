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
  <div class=" cursor-pointer mb-3" @click="toggleAccordion" >
    <div class="">
      <div class="d-flex align-center justify-space-between accordion-item pa-1" >
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
  transition: height 0.3s ease-out;
  overflow: hidden;
}

@keyframes flip {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}

.accordion-item:hover{
  background-color: #e6e6e8;
  border-radius: 4px;
}

.flip-enter-active,
.flip-leave-active {
  animation: flip 0.15s;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotate(0deg);
}

.flip-enter-to,
.flip-leave-from {
  transform: rotate(360deg);
}
</style>
