<script setup lang="ts">
import Profile from '../assets/images/closeup.webp'
import Cover from '../assets/images/profile-wide.webp'
import {PhEnvelopeSimple, PhGithubLogo, PhLinkedinLogo} from "@phosphor-icons/vue";
import {CONTACT_EMAIL} from "../lib/contact.ts";
import {getThumbImages} from "../data/gallery.ts";

// The shared frame of every profile Knowledge Panel (About, All, Projects,
// Designs, Socials, 404): the same cover, head, status and actions on every
// page, so only the body below the divider changes from page to page.
withDefaults(defineProps<{ label?: string; compact?: boolean }>(), {
  label: 'Profile summary',
});

// Photo strip, like the image row at the top of a Google Knowledge Panel: the
// portrait large, two award moments small, all opening the Images tab.
const photos = [
  {src: getThumbImages('reverse-pitching-competition-champion')[2], alt: 'Jiu Axl Tabilla receiving the DIGIMC 2025 Reverse Pitching championship'},
  {src: getThumbImages('hackathon-champion')[2], alt: 'Jiu Axl Tabilla with the Innova Hackathon 2024 champion team'},
].filter((photo) => photo.src);

const links = [
  {label: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: PhEnvelopeSimple},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/', icon: PhLinkedinLogo},
  {label: 'GitHub', href: 'https://github.com/ajaxarrow', icon: PhGithubLogo},
];
</script>

<template>
  <aside class="side-panel" :class="{ 'side-panel--compact': compact }" :aria-label="label">
    <!-- Photo strip on desktop; on phones the panel sits above the results, so it stays short. -->
    <div v-if="!compact" class="side-panel-photos">
      <img :src="Cover" alt="Jiu Axl Tabilla standing outdoors at night" class="side-panel-photo side-panel-photo--main" width="600" height="450">
      <RouterLink
        v-for="(photo, n) in photos"
        :key="photo.src"
        to="/images"
        class="side-panel-photo-link"
        :aria-label="n === photos.length - 1 ? 'More photos' : photo.alt"
      >
        <img :src="photo.src" :alt="photo.alt" class="side-panel-photo" width="640" height="427" loading="lazy">
        <span v-if="n === photos.length - 1" class="side-panel-more" aria-hidden="true">More photos</span>
      </RouterLink>
    </div>

    <div class="side-panel-inner">
      <div class="side-panel-head">
        <img v-if="compact" :src="Profile" alt="Portrait of Jiu Axl Tabilla" class="side-panel-avatar" width="64" height="64">
        <div class="side-panel-id">
          <p class="side-panel-name">Jiu Axl R. Tabilla</p>
          <p class="side-panel-role">Full-Stack Software Engineer</p>
        </div>
        <ul class="side-panel-links">
          <li v-for="link in links" :key="link.label">
            <a
              :href="link.href"
              :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
              rel="noopener noreferrer"
              :aria-label="link.label"
              :title="link.label"
            ><component :is="link.icon" size="20" aria-hidden="true"/></a>
          </li>
        </ul>
      </div>

      <p class="side-panel-status"><i aria-hidden="true"></i> Open to client projects and remote work</p>

      <div class="side-panel-actions">
        <RouterLink to="/contact" class="side-panel-action side-panel-action--primary">Contact me</RouterLink>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="side-panel-action">Résumé (PDF)<span class="side-panel-sr"> (opens in a new tab)</span></a>
      </div>

      <div class="side-panel-body">
        <slot/>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.side-panel{
  overflow: hidden;
  border: 1px solid var(--grey-200);
  border-radius: 20px;
  background-color: var(--grey-50);
  color: var(--ink);
}

.side-panel--compact{ margin-bottom: 24px; }

/* One large photo and two small ones, close to their own 4:3 shape so nothing
   important gets cropped away. */
.side-panel-photos{
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 3px;
  aspect-ratio: 2 / 1;
  background-color: var(--surface);
}

.side-panel-photo{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-panel-photo--main{
  grid-row: 1 / 3;
  object-position: 42% 60%;
  background-color: var(--ink);
}

.side-panel-photo-link{
  position: relative;
  display: block;
  min-height: 0;
  overflow: hidden;
}

.side-panel-photo-link img{ transition: transform 500ms var(--ease-out-quart); }
.side-panel-photo-link:hover img{ transform: scale(1.05); }
.side-panel-photo-link:focus-visible{ outline: 2px solid var(--google-link); outline-offset: -2px; }

.side-panel-more{
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgb(32 33 36 / 0.45);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.side-panel-inner{ padding: 20px 24px 24px; }

.side-panel-head{
  display: flex;
  align-items: center;
  gap: 14px;
}

.side-panel-avatar{
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 16px;
  object-fit: cover;
}

.side-panel-id{ min-width: 0; }

.side-panel-name{
  font-size: 22px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.side-panel-role{
  font-size: 14px;
  color: var(--meta);
}

.side-panel-status{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 6px 12px;
  border-radius: 9999px;
  background-color: color-mix(in srgb, var(--googlegreen) 12%, var(--surface));
  color: #137333;
  font-size: 13px;
  font-weight: 500;
}

.side-panel-status i{
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: var(--googlegreen);
}

.side-panel-actions{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.side-panel-action{
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 9999px;
  border: 1px solid var(--grey-300);
  background-color: var(--surface);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart);
}

.side-panel-action:hover{ background-color: var(--grey-200); }

.side-panel-action--primary{
  border-color: var(--google-link);
  background-color: var(--google-link);
  color: var(--surface);
}

.side-panel-action--primary:hover{ background-color: var(--link-pressed); }

/* Icon links sit at the right end of the name row, where there is room at any width. */
.side-panel-links{
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  margin: 0 -8px 0 auto;
  padding: 0;
  list-style: none;
}

/* Phones: not enough room beside the name, so the links take their own row. */
.side-panel--compact .side-panel-head{ flex-wrap: wrap; row-gap: 8px; }
.side-panel--compact .side-panel-links{ flex-basis: 100%; margin: 0 0 -8px -10px; }

.side-panel-links a{
  display: grid;
  place-items: center;
  width: 40px;
  height: 44px;
  border-radius: 9999px;
  color: var(--meta);
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    color var(--duration-fast) var(--ease-out-quart);
}

.side-panel-links a:hover{
  background-color: var(--grey-200);
  color: var(--ink);
}

.side-panel-body{
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--grey-200);
}

.side-panel-sr{
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
