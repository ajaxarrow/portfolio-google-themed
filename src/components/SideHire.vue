<script setup lang="ts">
import Profile from '../assets/images/closeup.webp'
import {caseStudies} from "../data/case-studies.ts";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {designs} from "../data/designs.ts";
import {isVisible} from "../utils/entries.ts";

// A short Knowledge Panel for result pages that have no panel of their own
// (Projects, Designs, Socials, 404): the facts a recruiter needs, one click away.
const stats = [
  {value: caseStudies.length, label: 'Case studies', to: '/case-studies'},
  {value: [...buzzerboyProjects, ...projects].filter(isVisible).length, label: 'Projects', to: '/projects'},
  {value: designs.filter(isVisible).length, label: 'UI designs', to: '/designs'},
];

const featured = caseStudies.filter((study) => study.featured).slice(0, 3);
</script>

<template>
  <aside class="hire" aria-label="Profile summary">
    <div class="hire-head">
      <img :src="Profile" alt="Portrait of Jiu Axl Tabilla" class="hire-avatar" width="64" height="64">
      <div>
        <p class="hire-name">Jiu Axl R. Tabilla</p>
        <p class="hire-role">Full-Stack Software Engineer</p>
      </div>
    </div>

    <p class="hire-status"><i aria-hidden="true"></i> Open to client projects and remote work</p>

    <ul class="hire-stats">
      <li v-for="stat in stats" :key="stat.label">
        <RouterLink :to="stat.to">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <div class="hire-actions">
      <RouterLink to="/contact" class="action action--primary">Contact me</RouterLink>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="action">Résumé (PDF)<span class="sr-only"> (opens in a new tab)</span></a>
    </div>

    <VDivider class="my-4"/>

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
  </aside>
</template>

<style scoped>
.hire{
  position: sticky;
  top: 24px;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--grey-50);
  color: var(--ink);
}

.hire-head{
  display: flex;
  align-items: center;
  gap: 12px;
}

.hire-avatar{
  width: 64px;
  height: 64px;
  border-radius: 16px;
  object-fit: cover;
}

.hire-name{
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
}

.hire-role{
  font-size: 14px;
  color: var(--meta);
}

.hire-status{
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
}

.hire-status i{
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: var(--googlegreen);
}

.hire-stats{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.hire-stats a{
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
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

.hire-actions{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.action{
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid var(--grey-300);
  background-color: var(--surface);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.action:hover{ background-color: var(--grey-200); }

.action--primary{
  border-color: var(--google-link);
  background-color: var(--google-link);
  color: var(--surface);
}

.action--primary:hover{ background-color: var(--link-pressed); }

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

.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
