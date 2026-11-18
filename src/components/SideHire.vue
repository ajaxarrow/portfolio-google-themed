<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {PhCaretDown} from "@phosphor-icons/vue";
import SidePanel from "./SidePanel.vue";
import {caseStudies} from "../data/case-studies.ts";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {designs} from "../data/designs.ts";
import {isVisible} from "../utils/entries.ts";

// The Knowledge Panel for result pages without a panel of their own
// (All, Projects, Designs, Socials, 404): the facts a recruiter needs, one click away.
const stats = [
  {value: caseStudies.length, label: 'Case studies', to: '/case-studies'},
  {value: [...buzzerboyProjects, ...projects].filter(isVisible).length, label: 'Projects', to: '/projects'},
  {value: designs.filter(isVisible).length, label: 'UI designs', to: '/designs'},
];

const featured = caseStudies.filter((study) => study.featured).slice(0, 3);

// "All" is the portfolio's front page, so it also says how the site itself was made.
const route = useRoute();
const showAboutPortfolio = computed(() => route.name === 'all');
</script>

<template>
  <SidePanel class="hire">
    <ul class="hire-stats">
      <li v-for="stat in stats" :key="stat.label">
        <RouterLink :to="stat.to">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <p class="hire-label">Featured case studies</p>
    <ul class="hire-featured">
      <li v-for="study in featured" :key="study.id">
        <RouterLink :to="{path: '/case-studies', hash: `#${study.id}`}">
          <span class="hire-featured-logo"><img v-if="study.logo" :src="study.logo" alt=""></span>
          <span>
            <span class="hire-featured-name">{{ study.name }}</span>
            <span class="hire-featured-title">{{ study.title }}</span>
          </span>
        </RouterLink>
      </li>
    </ul>

    <details v-if="showAboutPortfolio" class="hire-about">
      <summary>
        About this portfolio
        <PhCaretDown size="16" class="hire-about-caret" aria-hidden="true"/>
      </summary>
      <p>
        A portfolio built as a search results page, designed and coded by Jiu Axl R. Tabilla.
        The search box works: try "django", "figma" or "champion". Every result is real work.
      </p>
      <p class="hire-about-meta">Vue.js and TypeScript, built with Vite, designed in Figma, hosted on Netlify.</p>
    </details>
  </SidePanel>
</template>

<style scoped>
.hire{
  position: sticky;
  top: 24px;
}


.hire-stats{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}

.hire-stats a{
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border: 1px solid var(--grey-200);
  border-radius: 12px;
  background-color: var(--surface);
  color: var(--ink);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.hire-stats a:hover{ background-color: var(--grey-200); }

.hire-stats strong{
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
}

.hire-stats span{
  font-size: 12px;
  color: var(--meta);
}

.hire-label{
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--meta);
}

.hire-featured{
  margin: 0;
  padding: 0;
  list-style: none;
}

.hire-featured a{
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  margin: 0 -8px;
  border-radius: 12px;
  color: var(--ink);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.hire-featured a:hover{ background-color: var(--grey-100); }
.hire-featured a:hover .hire-featured-title{ text-decoration: underline; }

.hire-featured-logo{
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 50%;
  background-color: var(--surface);
}

.hire-featured-logo img{ width: 16px; height: 16px; object-fit: contain; }

.hire-featured-name{
  display: block;
  font-size: 12px;
  color: var(--meta);
}

.hire-featured-title{
  display: block;
  font-size: 14px;
  line-height: 1.4;
  color: var(--google-link);
}


.hire-about{
  margin-top: 16px;
  padding-top: 8px;
  border-top: 1px solid var(--grey-200);
  font-size: 14px;
  line-height: 1.5;
}

.hire-about summary{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  color: var(--meta);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.hire-about summary::-webkit-details-marker{ display: none; }

.hire-about-caret{ transition: transform var(--duration-base) var(--ease-out-quart); }
.hire-about[open] .hire-about-caret{ transform: rotate(180deg); }

.hire-about-meta{
  margin-top: 8px;
  color: var(--meta);
  font-size: 13px;
}
</style>
