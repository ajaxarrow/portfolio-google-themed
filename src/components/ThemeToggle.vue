<script setup lang="ts">
import {computed} from "vue";
import {PhMoon, PhSun} from "@phosphor-icons/vue";
import {useTheme} from "../composables/useTheme.ts";

const {theme, toggleTheme} = useTheme();
const isDark = computed(() => theme.value === 'dark');
const label = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme');
</script>

<template>
  <button type="button" class="theme-toggle" :aria-label="label" :title="label" @click="toggleTheme">
    <!-- Both icons are rendered and swapped in CSS from html[data-theme], so the
         prerendered markup matches whatever theme the inline script picked. -->
    <PhMoon class="icon-moon" size="22" weight="bold" aria-hidden="true"/>
    <PhSun class="icon-sun" size="22" weight="bold" aria-hidden="true"/>
  </button>
</template>

<style scoped>
.theme-toggle{
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--meta);
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    color var(--duration-fast) var(--ease-out-quart);
}

.theme-toggle > *{
  grid-area: 1 / 1;
}

.theme-toggle:hover{
  background-color: var(--grey-100);
  color: var(--ink);
}

.icon-sun{ display: none; }
/* Wrap the whole selector: Vue keeps only what is inside :global(). */
:global(html[data-theme="dark"] .theme-toggle .icon-sun){ display: block; }
:global(html[data-theme="dark"] .theme-toggle .icon-moon){ display: none; }
</style>
