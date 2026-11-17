<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {
  PhArrowUp, PhArrowUpRight, PhCaretLeft, PhCaretRight, PhCheckCircle, PhEnvelopeSimple, PhSparkle, PhStar,
} from "@phosphor-icons/vue";
import Lightbox from "../components/Lightbox.vue";
import Portrait from "../assets/images/profile-wide.webp";
import PortraitCloseup from "../assets/images/closeup.webp";
import {
  caseStudies, services, speedFacts, testimonials, trackRecord, type CaseStudy,
} from "../data/case-studies.ts";
import {findEntryById} from "../utils/entries.ts";
import {isReducedMotion} from "../composables/useMotionPresets.ts";
import ContactForm from "../components/ContactForm.vue";
import {CONTACT_EMAIL, mailtoHref} from "../lib/contact.ts";

const route = useRoute();
const root = ref<HTMLElement | null>(null);

const host = (url: string) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
};

// Same stable "search time" joke as ResultHeader.
const seconds = ((caseStudies.length * 37) % 89 + 11) / 100;

const ACCENTS = ['var(--googleblue)', 'var(--googlered)', 'var(--googleyellow)', 'var(--googlegreen)'];
const accent = (index: number) => ACCENTS[index % ACCENTS.length];

/* Screenshot viewer: one active image per case study. */
const activeImage = ref<Record<string, number>>({});
const imageIndex = (id: string) => activeImage.value[id] ?? 0;

/* Carousel: remember which way each viewer last moved so the slide travels that way. */
const slideDir = ref<Record<string, number>>({});
function showImage(study: CaseStudy, index: number, dir?: number) {
  const count = study.images.length;
  const current = imageIndex(study.id);
  const target = (index + count) % count;
  if (target === current) return;
  slideDir.value[study.id] = dir ?? (target > current ? 1 : -1);
  activeImage.value[study.id] = target;
}
const stepImage = (study: CaseStudy, delta: number) => showImage(study, imageIndex(study.id) + delta, delta);

let swipeX = 0;
let swipeY = 0;
function onSwipeStart(event: TouchEvent) {
  swipeX = event.touches[0].clientX;
  swipeY = event.touches[0].clientY;
}
function onSwipeEnd(event: TouchEvent, study: CaseStudy) {
  const dx = event.changedTouches[0].clientX - swipeX;
  const dy = event.changedTouches[0].clientY - swipeY;
  if (study.images.length < 2 || Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  stepImage(study, dx < 0 ? 1 : -1);
}

const lightbox = ref<{study: CaseStudy; index: number} | null>(null);
const lightboxOpen = ref(false);
function openLightbox(study: CaseStudy, index: number) {
  lightbox.value = {study, index};
  lightboxOpen.value = true;
}

/* Image pack: every screenshot, in case-study order. */
const allShots = computed(() =>
  caseStudies.flatMap((study) => study.images.map((src, index) => ({study, src, thumb: study.thumbs[index] ?? src, index})))
);

/* Converter card. */
const speedId = ref(speedFacts[0].id);
const speed = computed(() => speedFacts.find((f) => f.id === speedId.value) ?? speedFacts[0]);

/* Time card. Filled in on the client only, so prerendered HTML never shows a stale time. */
const STUDIO_TZ = 'Asia/Manila';
const STUDIO_OFFSET_HOURS = 8;
const studioTime = ref('');
const studioDay = ref('');
const offsetLine = ref('');
let clock: ReturnType<typeof setInterval> | undefined;

function tick() {
  const now = new Date();
  studioTime.value = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', timeZone: STUDIO_TZ}).format(now);
  studioDay.value = new Intl.DateTimeFormat('en-US', {weekday: 'long', month: 'long', day: 'numeric', timeZone: STUDIO_TZ}).format(now);
  const viewerTime = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit'}).format(now);
  const diff = STUDIO_OFFSET_HOURS + now.getTimezoneOffset() / 60;
  const hours = Math.abs(diff);
  const amount = `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ${hours === 1 ? 'hour' : 'hours'}`;
  offsetLine.value = diff === 0
    ? `Same time zone as you. It is ${viewerTime} for both of us.`
    : `${amount} ${diff > 0 ? 'ahead of' : 'behind'} you. It is ${viewerTime} where you are.`;
}

/* Arriving on /case-studies#id (from the landing page, a chip or a service link):
   land on that case study, move focus to it and mark it briefly. */
const targetId = ref('');
let targetTimer: ReturnType<typeof setTimeout> | undefined;

function goToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const id = hash.replace(/^#/, '');
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  el.scrollIntoView({block: 'start', behavior});
  el.focus({preventScroll: true});
  targetId.value = id;
  clearTimeout(targetTimer);
  targetTimer = setTimeout(() => { targetId.value = ''; }, 2200);
}

watch(() => route.hash, (hash) => {
  if (hash) nextTick(() => goToHash(hash, isReducedMotion() ? 'auto' : 'smooth'));
});

/* Scroll reveals. Content is visible by default (prerendered HTML, no JS, reduced
   motion); the hidden starting state only applies once this has run. */
const motionOn = ref(false);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  tick();
  clock = setInterval(tick, 20_000);

  if (!isReducedMotion() && 'IntersectionObserver' in window) {
    motionOn.value = true;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer?.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -12% 0px', threshold: 0.08});
    nextTick(() => root.value?.querySelectorAll('[data-reveal]').forEach((el) => observer?.observe(el)));
  }

  if (route.hash) {
    // Two frames: the route transition has to finish laying the page out first.
    requestAnimationFrame(() => requestAnimationFrame(() => goToHash(route.hash, 'instant' as ScrollBehavior)));
  }
});

onUnmounted(() => {
  clearInterval(clock);
  clearTimeout(targetTimer);
  observer?.disconnect();
});

/* Contact: a service link prefills the subject, then lands on the form. */
const inquirySubject = ref('');
function startInquiry(subject = '') {
  inquirySubject.value = subject;
  goToHash('contact', isReducedMotion() ? 'auto' : 'smooth');
  setTimeout(() => document.getElementById('cs-contact-name')?.focus({preventScroll: true}), isReducedMotion() ? 0 : 700);
}
/* Client work often cannot show source; say so plainly instead of leaving the gap unexplained. */
const hasCodeLink = (study: CaseStudy) => !!study.extraLinks?.some((l) => /code|source|github/i.test(l.label));
const jumpTo = (id: string) => goToHash(id, isReducedMotion() ? 'auto' : 'smooth');

/* Table of contents: an "On this page" panel fixed to the right on wide screens
   (a "snake" of colored segments fills dot to dot as you read), and a sticky chip
   strip on smaller screens. It appears once the hero has scrolled away and hides
   again after the contact section. */
const tocItems = [
  ...caseStudies.map((study, i) => ({id: study.id, label: study.name, color: accent(i)})),
  {id: 'availability', label: 'Speed & hours', color: 'var(--grey-400)'},
  {id: 'services', label: 'What I offer', color: 'var(--grey-400)'},
  {id: 'contact', label: 'Contact', color: 'var(--grey-400)'},
];
const tocGroups = [
  {label: 'Case studies', items: tocItems.slice(0, caseStudies.length).map((item, i) => ({...item, index: i}))},
  {label: 'Also on this page', items: tocItems.slice(caseStudies.length).map((item, i) => ({...item, index: caseStudies.length + i}))},
];
const tocActive = ref(-1);
const tocProgress = ref(0); // 0..tocItems.length-1, fractional between items
const tocVisible = ref(false);
const tocStrip = ref<HTMLElement | null>(null);
const tocBody = ref<HTMLElement | null>(null);
const dotCenters = ref<number[]>([]); // y of each dot's centre inside .toc-body
let tocFrame = 0;

function measureDots() {
  const body = tocBody.value;
  if (!body || !body.offsetParent) { dotCenters.value = []; return; }
  const top = body.getBoundingClientRect().top;
  dotCenters.value = [...body.querySelectorAll<HTMLElement>('.toc-dot')]
    .map((dot) => { const r = dot.getBoundingClientRect(); return r.top - top + r.height / 2; });
}

// One segment between each pair of neighbouring dots, filled in the colour of the
// item it leaves from, so the snake picks up each study's accent as it passes.
const snakeSegments = computed(() => dotCenters.value.slice(0, -1).map((y, i) => ({
  top: `${y}px`,
  height: `${dotCenters.value[i + 1] - y}px`,
  fill: Math.min(1, Math.max(0, tocProgress.value - i)),
  color: tocItems[i].color,
})));

const tocCaption = computed(() => {
  const i = tocActive.value;
  if (i < 0) return 'Start reading';
  return i < caseStudies.length ? `Case study ${i + 1} of ${caseStudies.length}` : tocItems[i].label;
});

function backToTop() {
  window.scrollTo({top: 0, behavior: isReducedMotion() ? 'auto' : 'smooth'});
  document.getElementById('main')?.focus({preventScroll: true});
}

function measureToc() {
  tocFrame = 0;
  const line = window.innerHeight * 0.35;
  const sections = tocItems.map((item) => document.getElementById(item.id));
  let active = -1;
  let fraction = 0;
  sections.forEach((el, i) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= line) {
      active = i;
      fraction = Math.min(1, Math.max(0, (line - rect.top) / Math.max(rect.height, 1)));
    }
  });
  const first = sections[0]?.getBoundingClientRect();
  const last = sections[sections.length - 1]?.getBoundingClientRect();
  tocVisible.value = !!first && !!last && first.top < window.innerHeight * 0.6 && last.bottom > window.innerHeight * 0.4;
  tocProgress.value = active < 0 ? 0 : Math.min(tocItems.length - 1, active + (active < tocItems.length - 1 ? fraction : 0));
  if (active !== tocActive.value) {
    tocActive.value = active;
    centerActiveChip();
  }
}

function centerActiveChip() {
  nextTick(() => {
    const strip = tocStrip.value;
    const chip = strip?.querySelector<HTMLElement>('.is-active');
    if (!strip || !chip) return;
    strip.scrollTo({
      left: Math.max(0, chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2),
      behavior: isReducedMotion() ? 'auto' : 'smooth',
    });
  });
}

const onTocScroll = () => { if (!tocFrame) tocFrame = requestAnimationFrame(measureToc); };
const onTocResize = () => { measureDots(); onTocScroll(); };

onMounted(() => {
  window.addEventListener('scroll', onTocScroll, {passive: true});
  window.addEventListener('resize', onTocResize, {passive: true});
  measureDots();
  measureToc();
  // Fonts change label heights slightly; re-measure once they settle.
  document.fonts?.ready.then(measureDots);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onTocScroll);
  window.removeEventListener('resize', onTocResize);
  cancelAnimationFrame(tocFrame);
});

const stripProgress = computed(() => `${tocActive.value < 0 ? 0 : ((tocProgress.value + 1) / tocItems.length) * 100}%`);

function feelingLucky() {
  const pick = caseStudies[Math.floor(Math.random() * caseStudies.length)];
  goToHash(pick.id, isReducedMotion() ? 'auto' : 'smooth');
}
</script>

<template>
  <div ref="root" class="cs" :class="{ 'cs--motion': motionOn }">
    <p class="cs-count">About {{ caseStudies.length }} case studies ({{ seconds.toFixed(2) }} seconds)</p>

    <!-- Hero -->
    <header class="hero">
      <div class="hero-text">
        <h1 class="hero-title">Software that ships, from the first screen to deployed code.</h1>
        <p class="hero-label">
          <PhSparkle weight="fill" size="18" class="hero-spark"/> Overview
        </p>
        <p class="hero-lead">
          Jiu Axl is a <mark>software engineer</mark> who takes on AI automation, software development and
          web development. He builds SaaS backends, two-sided marketplaces and
          <mark>AI tools that explain real numbers</mark>, and he <mark>led three products</mark> for an Ontario
          software company, working remotely from the Philippines from 2024 to 2026. He also designs in Figma.
        </p>
        <ul class="hero-sources" aria-label="Jump to a case study">
          <li v-for="(study, i) in caseStudies" :key="study.id" :style="{ '--i': i }">
            <RouterLink :to="{hash: `#${study.id}`}" class="source-chip">
              <span class="source-chip-logo"><img v-if="study.logo" :src="study.logo" alt=""/></span>
              {{ study.name }}
            </RouterLink>
          </li>
        </ul>
        <div class="hero-actions">
          <button type="button" class="btn btn-primary" @click="startInquiry()">
            <PhEnvelopeSimple size="18"/> Start a project
          </button>
          <RouterLink class="btn" :to="{hash: '#services'}">What I offer</RouterLink>
        </div>
      </div>

      <figure class="hero-portrait">
        <div class="portrait-frame">
          <picture>
            <!-- Square close-up for the compact byline on narrow screens. -->
            <source media="(max-width: 900px)" :srcset="PortraitCloseup"/>
            <img :src="Portrait" alt="Jiu Axl Tabilla" width="933" height="1400" fetchpriority="high"/>
          </picture>
        </div>
        <span class="portrait-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <figcaption class="portrait-card">
          <span class="portrait-name">Jiu Axl Tabilla</span>
          <span class="portrait-role">Software engineer</span>
          <span class="portrait-status"><i aria-hidden="true"></i> Open to client projects</span>
          <span class="portrait-time">Bukidnon, Philippines<template v-if="studioTime"> · {{ studioTime }}</template></span>
        </figcaption>
      </figure>
    </header>

    <!-- Case studies -->
    <article
        v-for="(study, i) in caseStudies"
        :id="study.id"
        :key="study.id"
        class="study"
        :class="{ 'study--flip': i % 2 === 1, 'is-target': targetId === study.id }"
        :style="{ '--accent': accent(i) }"
        tabindex="-1"
        :aria-labelledby="`${study.id}-title`"
    >
      <div class="study-text" data-reveal>
        <div class="study-source">
          <span class="study-logo"><img v-if="study.logo" :src="study.logo" alt=""/></span>
          <div>
            <p class="study-name">{{ study.name }}</p>
            <p class="study-client">{{ study.client }}</p>
          </div>
        </div>
        <h2 :id="`${study.id}-title`" class="study-title">{{ study.title }}</h2>
        <p class="study-role">{{ study.role }}</p>
        <ul class="study-stack" aria-label="Stack">
          <li v-for="tech in study.stack" :key="tech">{{ tech }}</li>
        </ul>

        <dl class="study-facts">
          <div>
            <dt>Problem</dt>
            <dd>{{ study.problem }}</dd>
          </div>
          <div>
            <dt>What I built</dt>
            <dd>{{ study.built }}</dd>
          </div>
          <div class="study-outcome">
            <dt><PhCheckCircle weight="fill" size="16"/> Outcome</dt>
            <dd>
              <ul v-if="study.metrics?.length" class="study-metrics">
                <li v-for="metric in study.metrics" :key="metric.label">
                  <strong>{{ metric.value }}</strong> {{ metric.label }}
                </li>
              </ul>
              {{ study.outcome }}
            </dd>
          </div>
        </dl>

        <ul class="study-links">
          <li>
            <a class="study-link" :href="study.link" target="_blank" rel="noopener noreferrer">
              {{ study.linkLabel ?? `Visit ${host(study.link)}` }} <PhArrowUpRight size="14"/><span class="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li v-for="extra in study.extraLinks" :key="extra.href">
            <a class="study-link" :href="extra.href" target="_blank" rel="noopener noreferrer">
              {{ extra.label }} <PhArrowUpRight size="14"/><span class="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
        <p v-if="!hasCodeLink(study)" class="study-note">
          Source is private{{ study.client.startsWith('Buzzerboy') ? ' (employer product)' : '' }}. I can walk you through the architecture on a call:
          <a href="#contact" @click.prevent="jumpTo('contact')">ask me</a>.
        </p>
      </div>

      <div v-if="study.images.length" class="study-media" data-reveal="media">
        <div class="stage">
          <div class="browser">
            <div class="browser-bar" aria-hidden="true">
              <span class="browser-dots"><i></i><i></i><i></i></span>
              <span class="browser-url">{{ host(study.link).includes('loom.com') ? study.name.toLowerCase() : host(study.link) }}</span>
            </div>
            <div
                class="viewer"
                @touchstart.passive="onSwipeStart"
                @touchend.passive="onSwipeEnd($event, study)"
                @keydown.left.prevent="stepImage(study, -1)"
                @keydown.right.prevent="stepImage(study, 1)"
            >
              <button
                  class="viewer-main img-skeleton"
                  :aria-label="`Enlarge ${study.name} screenshot ${imageIndex(study.id) + 1} of ${study.images.length}`"
                  @click="openLightbox(study, imageIndex(study.id))"
              >
                <Transition :name="(slideDir[study.id] ?? 1) > 0 ? 'slide-next' : 'slide-prev'">
                  <img
                      :key="study.images[imageIndex(study.id)]"
                      :src="study.images[imageIndex(study.id)]"
                      class="viewer-img"
                      :alt="`${study.name} screenshot ${imageIndex(study.id) + 1}`"
                      decoding="async"
                  />
                </Transition>
              </button>
              <template v-if="study.images.length > 1">
                <button class="viewer-nav viewer-nav-prev" :aria-label="`Previous ${study.name} screenshot`" @click="stepImage(study, -1)">
                  <PhCaretLeft size="18"/>
                </button>
                <button class="viewer-nav viewer-nav-next" :aria-label="`Next ${study.name} screenshot`" @click="stepImage(study, 1)">
                  <PhCaretRight size="18"/>
                </button>
                <span class="viewer-count" aria-hidden="true">{{ imageIndex(study.id) + 1 }} / {{ study.images.length }}</span>
              </template>
            </div>
          </div>
        </div>
        <div v-if="study.images.length > 1" class="viewer-thumbs">
          <button
              v-for="(src, n) in study.images"
              :key="src"
              class="viewer-thumb img-skeleton"
              :class="{ 'is-active': n === imageIndex(study.id) }"
              :aria-label="`Show ${study.name} screenshot ${n + 1}`"
              :aria-pressed="n === imageIndex(study.id)"
              @click="showImage(study, n)"
          >
            <img :src="study.thumbs[n] ?? src" alt="" loading="lazy" decoding="async"/>
          </button>
        </div>
      </div>
    </article>

    <!-- Speed + availability -->
    <section id="availability" class="answers" aria-labelledby="answers-heading" tabindex="-1">
      <h2 id="answers-heading" class="section-heading" data-reveal>How fast, and when are you reachable?</h2>
      <div class="answers-grid">
        <div class="answer-card" data-reveal>
          <label class="answer-select-label" for="speed-select">Convert time into</label>
          <select id="speed-select" v-model="speedId" class="answer-select">
            <option v-for="fact in speedFacts" :key="fact.id" :value="fact.id">{{ fact.label }}</option>
          </select>
          <div class="converter" aria-live="polite">
            <div :key="`${speed.id}-in`" class="converter-box">
              <span class="converter-amount">{{ speed.amount }}</span>
              <span class="converter-unit">{{ speed.unit }}</span>
            </div>
            <span class="converter-equals" aria-hidden="true">=</span>
            <div :key="`${speed.id}-out`" class="converter-box converter-box-result">
              <span class="converter-amount">{{ speed.resultAmount }}</span>
              <span class="converter-unit">{{ speed.result }}</span>
            </div>
          </div>
          <p class="answer-note">{{ speed.note }}</p>
        </div>

        <div class="answer-card" data-reveal style="--i: 1">
          <p class="answer-select-label">Time in Bukidnon, Philippines</p>
          <p class="clock-time">{{ studioTime || '–:–' }}</p>
          <p class="clock-day">{{ studioDay || 'Philippine Standard Time' }} (UTC+8)</p>
          <p class="answer-note">{{ offsetLine || 'Flexible overlap with your working hours.' }}</p>
        </div>
      </div>

      <dl class="record">
        <div v-for="(row, i) in trackRecord" :key="row.label" class="record-row" data-reveal :style="{ '--i': i }">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>

      <div v-if="testimonials.length" class="reviews">
        <h3 class="reviews-heading">Reviews</h3>
        <figure v-for="review in testimonials" :key="review.name" class="review" data-reveal>
          <div class="review-stars" aria-hidden="true">
            <PhStar v-for="n in 5" :key="n" weight="fill" size="14"/>
          </div>
          <blockquote>{{ review.quote }}</blockquote>
          <figcaption><strong>{{ review.name }}</strong> · {{ review.role }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Services, as sponsored results -->
    <section id="services" class="services" :class="{ 'is-target': targetId === 'services' }" aria-labelledby="services-heading" tabindex="-1">
      <h2 id="services-heading" class="section-heading" data-reveal>What I offer</h2>
      <div class="services-list">
        <div v-for="(service, i) in services" :key="service.id" class="service" data-reveal :style="{ '--i': i }">
          <p class="service-meta"><strong>Sponsored</strong> · jiuaxl › hire › {{ service.id }}</p>
          <a class="service-title" href="#contact" @click.prevent="startInquiry(service.title)">{{ service.title }}</a>
          <p class="service-description">{{ service.description }}</p>
          <ul class="service-links">
            <li><a href="#contact" @click.prevent="startInquiry(service.title)">Ask about this</a></li>
            <li v-for="proof in service.proof" :key="proof.to">
              <RouterLink :to="proof.to.startsWith('#') ? {hash: proof.to} : proof.to">{{ proof.label }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Image pack -->
    <section class="shots" aria-labelledby="shots-heading" data-reveal>
      <div class="shots-head">
        <h2 id="shots-heading" class="section-heading">Images for case studies</h2>
        <RouterLink to="/images" class="shots-all">View all</RouterLink>
      </div>
      <div class="shots-strip" tabindex="0" role="group" aria-label="Screenshots from every case study">
        <button
            v-for="shot in allShots"
            :key="shot.src"
            class="shot img-skeleton"
            :aria-label="`Enlarge ${shot.study.name} screenshot ${shot.index + 1}`"
            @click="openLightbox(shot.study, shot.index)"
        >
          <img :src="shot.thumb" alt="" loading="lazy" decoding="async"/>
          <span class="shot-caption">{{ shot.study.name }}</span>
        </button>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="contact" :class="{ 'is-target': targetId === 'contact' }" aria-labelledby="contact-heading" tabindex="-1">
      <div class="contact-panel" data-reveal>
        <div class="contact-copy">
          <span class="contact-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <h2 id="contact-heading" class="contact-heading">Have a project like these? Tell me about it.</h2>
          <p class="contact-text">
            Fill in the form and it goes straight to my inbox. You get a confirmation by email, and I reply once I have read your message.
          </p>
          <p class="contact-email">
            <PhEnvelopeSimple size="20"/>
            <span>
              Or write to me directly<br>
              <a :href="mailtoHref()">{{ CONTACT_EMAIL }}</a>
            </span>
          </p>
          <button type="button" class="btn btn-flat" @click="feelingLucky">I'm Feeling Lucky</button>
        </div>
        <ContactForm class="contact-form" :subject="inquirySubject" id-prefix="cs-contact"/>
      </div>
    </section>

    <!-- Table of contents: "On this page" panel, fixed right (wide screens) -->
    <nav class="toc-panel" :class="{ 'is-visible': tocVisible }" aria-labelledby="toc-heading" :inert="!tocVisible">
      <div class="toc-head">
        <p id="toc-heading" class="toc-heading">On this page</p>
        <p class="toc-caption" aria-live="polite">{{ tocCaption }}</p>
      </div>

      <div ref="tocBody" class="toc-body">
        <div class="toc-snake" aria-hidden="true">
          <span
              v-for="(segment, i) in snakeSegments"
              :key="i"
              class="toc-segment"
              :style="{ top: segment.top, height: segment.height }"
          >
            <span class="toc-segment-fill" :style="{ transform: `scaleY(${segment.fill})`, backgroundColor: segment.color }"></span>
          </span>
        </div>

        <template v-for="group in tocGroups" :key="group.label">
          <p class="toc-group">{{ group.label }}</p>
          <ol class="toc-list">
            <li
                v-for="item in group.items"
                :key="item.id"
                class="toc-item"
                :class="{ 'is-active': item.index === tocActive, 'is-done': item.index < tocActive }"
                :style="{ '--dot': item.color }"
            >
              <a
                  :href="`#${item.id}`"
                  :aria-current="item.index === tocActive ? 'location' : undefined"
                  @click.prevent="jumpTo(item.id)"
              >
                <span class="toc-dot" aria-hidden="true"></span>
                <span class="toc-label">{{ item.label }}</span>
              </a>
            </li>
          </ol>
        </template>
      </div>

      <button type="button" class="toc-top" @click="backToTop">
        <PhArrowUp size="14" aria-hidden="true"/> Back to top
      </button>
    </nav>

    <!-- Table of contents: sticky chip strip (smaller screens) -->
    <nav class="toc-bar" :class="{ 'is-visible': tocVisible }" aria-label="Jump to a case study" :inert="!tocVisible">
      <ol ref="tocStrip" class="toc-strip">
        <li v-for="(item, i) in tocItems" :key="item.id">
          <a
              :href="`#${item.id}`"
              class="toc-chip"
              :class="{ 'is-active': i === tocActive }"
              :style="{ '--dot': item.color }"
              :aria-current="i === tocActive ? 'location' : undefined"
              @click.prevent="jumpTo(item.id)"
          >{{ item.label }}</a>
        </li>
      </ol>
      <span class="toc-bar-progress" :style="{ width: stripProgress }" aria-hidden="true"></span>
    </nav>

    <Lightbox
        v-if="lightbox"
        v-model="lightboxOpen"
        :images="lightbox.study.images"
        :thumbs="lightbox.study.thumbs"
        :start-index="lightbox.index"
        :item="findEntryById(lightbox.study.id)"
    />
  </div>
</template>

<style scoped>
.cs{
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 1240px;
  padding-bottom: 96px;
  color: var(--ink);
  font-size: 15px;
  line-height: 1.55;
}

/* Same left rail, from the same breakpoint, as every other results page. */
@media (min-width: 960px){
  .cs{ margin-left: var(--layout-rail-offset); }
}

.cs a{ text-underline-offset: 3px; }

.cs-count{
  color: var(--meta);
  font-size: 14px;
}

.section-heading{
  font-size: clamp(24px, 20px + 1vw, 32px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
  text-wrap: balance;
}

/* Scroll reveals (only once .cs--motion is set on the client) */
.cs--motion [data-reveal]{
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms var(--ease-out-expo), transform 800ms var(--ease-out-expo);
  transition-delay: calc(var(--i, 0) * 70ms);
}

.cs--motion [data-reveal="media"]{
  transform: translateY(40px) scale(0.97);
  clip-path: inset(0 0 18% 0 round 28px);
  transition: opacity 700ms var(--ease-out-expo), transform 900ms var(--ease-out-expo),
    clip-path 900ms var(--ease-out-expo);
  transition-delay: 90ms;
}

.cs--motion [data-reveal].is-in{
  opacity: 1;
  transform: none;
}

.cs--motion [data-reveal="media"].is-in{ clip-path: inset(-8px -8px -8px -8px round 28px); }

/* Buttons */
.btn{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid var(--grey-300);
  border-radius: 9999px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    border-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-fast) var(--ease-out-quart);
}

.btn:hover{ background-color: var(--grey-100); }
.btn:active{ background-color: var(--grey-200); transform: scale(0.98); }

.btn-primary{
  border-color: var(--google-link);
  background-color: var(--google-link);
  color: var(--surface);
}

.btn-primary:hover,
.btn-primary:active{
  border-color: var(--link-pressed);
  background-color: var(--link-pressed);
}

.btn-flat{
  border-color: var(--grey-100);
  border-radius: 8px;
  background-color: var(--grey-100);
}

.btn-flat:hover{ border-color: var(--grey-300); }

/* Hero */
.hero{
  display: grid;
  /* Same split as the About page: an 800px results column, then the side panel column. */
  grid-template-columns: minmax(0, var(--layout-content-width)) minmax(260px, 1fr);
  gap: 28px;
  align-items: center;
  padding: clamp(20px, 3vw, 40px) 0 clamp(40px, 6vw, 80px);
}

.hero-title{
  max-width: 16ch;
  font-size: clamp(38px, 26px + 3.4vw, 68px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.hero-label{
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  font-size: 15px;
  font-weight: 500;
}

.hero-spark{ color: var(--googleblue); }

.hero-lead{
  max-width: 60ch;
  margin-top: 8px;
  font-size: clamp(17px, 15px + 0.4vw, 20px);
  line-height: 1.55;
  text-wrap: pretty;
}

.hero-lead mark{
  padding: 1px 4px;
  border-radius: 6px;
  background-color: color-mix(in srgb, var(--googleblue) 16%, transparent);
  color: inherit;
}

.hero-sources{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  padding: 0;
  list-style: none;
}

.source-chip{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px 0 6px;
  border: 1px solid var(--grey-300);
  border-radius: 9999px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.source-chip:hover{ background-color: var(--grey-100); transform: translateY(-2px); }

.source-chip-logo,
.study-logo{
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 50%;
  background-color: var(--grey-100);
}

.source-chip-logo{ width: 28px; height: 28px; }
.source-chip-logo img{ width: 16px; height: 16px; object-fit: contain; }

.hero-actions{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

/* Portrait */
.hero-portrait{
  position: relative;
  justify-self: start;
  width: min(100%, 340px);
  margin: 0;
}

.portrait-frame{
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 28px;
  background-color: var(--grey-100);
}

.portrait-frame picture{ display: contents; }

.portrait-frame img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
}

.portrait-dots{
  display: flex;
  gap: 6px;
}

.portrait-dots{
  position: absolute;
  top: 18px;
  left: 18px;
  padding: 8px 10px;
  border-radius: 9999px;
  background-color: var(--surface);
}

.portrait-dots i{
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.portrait-dots i:nth-child(1){ background-color: var(--googleblue); }
.portrait-dots i:nth-child(2){ background-color: var(--googlered); }
.portrait-dots i:nth-child(3){ background-color: var(--googleyellow); }
.portrait-dots i:nth-child(4){ background-color: var(--googlegreen); }

.portrait-card{
  position: absolute;
  left: -20px;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 220px;
  padding: 14px 16px;
  border: 1px solid var(--grey-300);
  border-radius: 16px;
  background-color: var(--surface);
  font-size: 13px;
  line-height: 1.4;
}

.portrait-name{ font-size: 16px; font-weight: 600; }
.portrait-role,
.portrait-time{ color: var(--meta); }

.portrait-status{
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-weight: 500;
}

.portrait-status i{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--googlegreen);
}

/* Hero entrance: plain CSS, so it plays on first paint without waiting for JS. */
@keyframes rise{
  from{ opacity: 0; transform: translateY(22px); }
  to{ opacity: 1; transform: none; }
}

@keyframes portrait-in{
  from{ clip-path: inset(100% 0 0 0 round 28px); }
  to{ clip-path: inset(0 0 0 0 round 28px); }
}

@keyframes portrait-settle{
  from{ transform: scale(1.12); }
  to{ transform: none; }
}

@keyframes dot-pop{
  0%{ transform: scale(0); }
  70%{ transform: scale(1.35); }
  100%{ transform: scale(1); }
}

@keyframes pulse{
  0%, 100%{ box-shadow: 0 0 0 0 color-mix(in srgb, var(--googlegreen) 45%, transparent); }
  50%{ box-shadow: 0 0 0 6px color-mix(in srgb, var(--googlegreen) 0%, transparent); }
}

@media (prefers-reduced-motion: no-preference){
  .hero-title{ animation: rise 900ms var(--ease-out-expo) backwards; }
  .hero-label{ animation: rise 800ms var(--ease-out-expo) 120ms backwards; }
  .hero-lead{ animation: rise 800ms var(--ease-out-expo) 180ms backwards; }
  .hero-sources li{ animation: rise 600ms var(--ease-out-expo) calc(300ms + var(--i) * 45ms) backwards; }
  .hero-actions{ animation: rise 700ms var(--ease-out-expo) 620ms backwards; }
  .portrait-frame{ animation: portrait-in 1100ms var(--ease-out-expo) 100ms backwards; }
  .portrait-frame img{ animation: portrait-settle 1500ms var(--ease-out-expo) 100ms backwards; }
  .portrait-card{ animation: rise 800ms var(--ease-out-expo) 700ms backwards; }
  .portrait-dots{ animation: rise 600ms var(--ease-out-expo) 600ms backwards; }
  .portrait-dots i{ animation: dot-pop 500ms var(--ease-out-quart) backwards; }
  .portrait-dots i:nth-child(1){ animation-delay: 850ms; }
  .portrait-dots i:nth-child(2){ animation-delay: 920ms; }
  .portrait-dots i:nth-child(3){ animation-delay: 990ms; }
  .portrait-dots i:nth-child(4){ animation-delay: 1060ms; }
  .portrait-status i{ animation: pulse 2.4s ease-in-out 1.6s infinite; }
}

/* Case study */
.study{
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
  padding: clamp(40px, 6vw, 80px) 0;
  border-top: 1px solid var(--grey-200);
  scroll-margin-top: 8px;
}

.study:focus{ outline: none; }

.study--flip .study-text{ order: 2; }

.study-source{
  display: flex;
  align-items: center;
  gap: 12px;
}

.study-logo{ width: 40px; height: 40px; }
.study-logo img{ width: 22px; height: 22px; object-fit: contain; }

.study-name{ font-size: 15px; font-weight: 600; line-height: 1.3; }
.study-client{ color: var(--meta); font-size: 13px; line-height: 1.3; }

/* The short accent rule under the title draws in when the study scrolls into view. */
.study-title{
  margin-top: 16px;
  padding-bottom: 12px;
  background: linear-gradient(var(--accent), var(--accent)) no-repeat 0 100% / 56px 3px;
  font-size: clamp(26px, 20px + 1.3vw, 38px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.cs--motion .study-title{
  background-size: 0 3px;
  transition: background-size 900ms var(--ease-out-expo) 300ms;
}

.cs--motion .is-in .study-title{ background-size: 56px 3px; }

.study-role{
  margin-top: 12px;
  font-size: 15px;
  font-weight: 500;
}

.study-stack{
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.study-stack li{
  padding: 3px 10px;
  border-radius: 9999px;
  background-color: var(--grey-100);
  font-size: 13px;
  font-weight: 500;
}

.study-facts{ margin-top: 22px; }

.study-facts > div{
  padding: 14px 0;
  border-top: 1px solid var(--grey-200);
}

.study-facts dt{
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--meta);
  font-size: 13px;
  font-weight: 500;
}

.study-facts dd{
  max-width: 62ch;
  margin-top: 2px;
}

.study-outcome dt{ color: #188038; }
.study-outcome dd{ font-weight: 500; }

.study-metrics{
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin-bottom: 6px;
  padding: 0;
  list-style: none;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}

.study-metrics strong{ font-size: 20px; font-weight: 700; }

.study-note{
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--meta);
}

.study-note a{
  color: var(--google-link);
}

.study-links{
  display: flex;
  flex-wrap: wrap;
  gap: 0 20px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
}

.study-link{
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  color: var(--google-link);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.study-link svg{ transition: transform var(--duration-base) var(--ease-out-quart); }
.study-link:hover{ text-decoration: underline; }
.study-link:hover svg{ transform: translate(2px, -2px); }

/* Arrival mark for a deep link: the stage and logo flash the study's accent. */
@keyframes target-mark{
  0%, 35%{ box-shadow: 0 0 0 4px var(--accent, var(--googleblue)); }
  100%{ box-shadow: 0 0 0 4px transparent; }
}

.study.is-target .stage,
.study.is-target .study-logo{ animation: target-mark 2s var(--ease-out-quart); }

.services.is-target .section-heading{ color: var(--google-link); transition: color 600ms var(--ease-out-quart); }

/* Screenshot stage */
.study-media{
  position: sticky;
  top: 16px;
}

.stage{
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: 28px;
  background-color: color-mix(in srgb, var(--accent) 14%, var(--surface));
}

.browser{
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--grey-300));
  border-radius: 14px;
  background-color: var(--surface);
  transition: transform 600ms var(--ease-out-expo);
}

.stage:hover .browser{ transform: translateY(-4px); }

.browser-bar{
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--grey-200);
}

.browser-dots{ display: flex; gap: 5px; }

.browser-dots i{
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: var(--grey-300);
}

.browser-url{
  flex: 1;
  min-width: 0;
  padding: 3px 12px;
  overflow: hidden;
  border-radius: 9999px;
  background-color: var(--grey-100);
  color: var(--meta);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.viewer{
  position: relative;
}

.viewer-main{
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 0;
  overflow: hidden;
  border: 0;
  background-color: var(--grey-100);
  cursor: zoom-in;
}

.viewer-img{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

/* Slides travel in the direction of the step; the outgoing one drifts less, for depth. */
.slide-next-enter-active,
.slide-prev-enter-active,
.slide-next-leave-active,
.slide-prev-leave-active{
  transition: transform 700ms var(--ease-out-expo), opacity 500ms var(--ease-out-quart);
}

.slide-next-enter-from{ transform: translateX(100%); }
.slide-next-leave-to{ transform: translateX(-28%); opacity: 0; }
.slide-prev-enter-from{ transform: translateX(-100%); }
.slide-prev-leave-to{ transform: translateX(28%); opacity: 0; }

.viewer-nav{
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-top: -22px;
  border: 1px solid var(--grey-300);
  border-radius: 50%;
  background-color: var(--surface);
  color: var(--ink);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart),
    background-color var(--duration-fast) var(--ease-out-quart);
}

.viewer-nav-prev{ left: 10px; transform: translateX(-8px); }
.viewer-nav-next{ right: 10px; transform: translateX(8px); }

.viewer:hover .viewer-nav,
.viewer:focus-within .viewer-nav{ opacity: 1; transform: none; }

.viewer-nav:hover{ background-color: var(--grey-100); }
.viewer .viewer-nav:active{ transform: scale(0.92); }

.viewer-count{
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 10px;
  border-radius: 9999px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

@media (hover: none){
  .viewer-nav{ opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce){
  .slide-next-enter-from, .slide-next-leave-to,
  .slide-prev-enter-from, .slide-prev-leave-to{ transform: none; }
  .slide-next-enter-from, .slide-prev-enter-from{ opacity: 0; }
}

.viewer-thumbs{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding-inline: 4px;
}

.viewer-thumb{
  width: 76px;
  aspect-ratio: 16 / 10;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 8px;
  background-color: var(--grey-100);
  opacity: 0.6;
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out-quart),
    border-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.viewer-thumb img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.viewer-thumb:hover{ opacity: 1; transform: translateY(-2px); }

.viewer-thumb.is-active{
  border-color: var(--accent);
  outline: 2px solid var(--accent);
  opacity: 1;
  transform: translateY(-2px);
}

/* Answer cards */
.answers{
  padding-top: clamp(56px, 7vw, 96px);
  border-top: 1px solid var(--grey-200);
}

.answers-grid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.answer-card{
  padding: 24px;
  border: 1px solid var(--grey-300);
  border-radius: 20px;
}

.answer-select-label{
  display: block;
  color: var(--meta);
  font-size: 13px;
  font-weight: 500;
}

.answer-select{
  width: 100%;
  min-height: 44px;
  margin-top: 8px;
  padding: 0 40px 0 14px;
  border: 1px solid var(--grey-300);
  border-radius: 8px;
  background: var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 256 256'%3E%3Cpath fill='%235F6368' d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z'/%3E%3C/svg%3E") no-repeat right 14px center;
  color: var(--ink);
  font-size: 15px;
  appearance: none;
  cursor: pointer;
}

.answer-select:hover{ border-color: var(--grey-400); }

.converter{
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) auto minmax(0, 1.3fr);
  gap: 12px;
  align-items: stretch;
  margin-top: 14px;
}

.converter-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 112px;
  padding: 12px 16px;
  border: 1px solid var(--grey-300);
  border-radius: 8px;
}

.converter-box-result{
  border-color: transparent;
  background-color: var(--grey-100);
}

@keyframes converter-in{
  from{ clip-path: inset(0 0 100% 0); transform: translateY(6px); }
  to{ clip-path: inset(0 0 0 0); transform: translateY(0); }
}

@media (prefers-reduced-motion: no-preference){
  .converter-box{ animation: converter-in 420ms var(--ease-out-quart); }
  .converter-box-result{ animation-delay: 70ms; animation-fill-mode: backwards; }
}

@media (prefers-reduced-motion: reduce){
  .stage:hover .browser,
  .source-chip:hover,
  .viewer-thumb:hover,
  .shot:hover img{ transform: none; }
}

.converter-amount{
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
}

.converter-unit{
  margin-top: 6px;
  color: var(--meta);
  font-size: 14px;
  line-height: 1.35;
}

.converter-equals{
  align-self: center;
  color: var(--meta);
  font-size: 28px;
}

.answer-note{
  margin-top: 14px;
  color: var(--meta);
  font-size: 14px;
}

.clock-time{
  margin-top: 6px;
  font-size: clamp(48px, 36px + 3vw, 68px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.clock-day{ font-size: 15px; }

/* Track record */
.record{ margin-top: 28px; }

.record-row{
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--grey-200);
}

.record-row:last-child{ border-bottom: 1px solid var(--grey-200); }

.record dt{ color: var(--meta); font-size: 14px; }
.record dd{ font-weight: 500; }

/* Reviews (hidden until testimonials exist) */
.reviews{ margin-top: 40px; }
.reviews-heading{ font-size: 18px; font-weight: 500; }

.review{
  max-width: 68ch;
  padding: 18px 0;
  border-bottom: 1px solid var(--grey-200);
}

.review-stars{ display: flex; gap: 2px; color: var(--googleyellow); }
.review blockquote{ margin-top: 8px; font-size: 17px; }
.review figcaption{ margin-top: 8px; color: var(--meta); font-size: 14px; }
.review figcaption strong{ color: var(--ink); font-weight: 500; }

/* Services */
.services{
  padding-top: clamp(56px, 7vw, 96px);
  scroll-margin-top: 0;
}

.services:focus{ outline: none; }

.services-list{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 56px;
  margin-top: 8px;
}

.service{ margin-top: 24px; }

.service-meta{ color: var(--meta); font-size: 13px; }
.service-meta strong{ color: var(--ink); font-weight: 700; }

.service-title{
  display: inline-block;
  margin-top: 2px;
  color: var(--google-link);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.3;
  text-decoration: none;
}

.service-title:hover{ text-decoration: underline; }
.service-title:active{ color: var(--link-pressed); }

.service-description{ margin-top: 4px; color: var(--meta); }

.service-links{
  display: flex;
  flex-wrap: wrap;
  gap: 0 20px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
}

.service-links a{
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--google-link);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.service-links a:hover{ text-decoration: underline; }

/* Image pack */
.shots{ padding-top: clamp(56px, 7vw, 96px); }

.shots-head{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.shots-all{
  color: var(--google-link);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.shots-all:hover{ text-decoration: underline; }

.shots-strip{
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 12px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: var(--grey-400) transparent;
}

.shot{
  position: relative;
  flex: 0 0 auto;
  height: 180px;
  min-width: 280px; /* reserve the slot so the strip does not jump as screenshots arrive */
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 14px;
  background-color: var(--grey-100);
  cursor: zoom-in;
  scroll-snap-align: start;
}

.shot img{
  display: block;
  width: auto;
  height: 100%;
  transition: transform 600ms var(--ease-out-expo);
}

.shot:hover img{ transform: scale(1.04); }

.shot-caption{
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 2px 8px;
  border-radius: 9999px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart);
}

.shot:hover .shot-caption,
.shot:focus-visible .shot-caption{ opacity: 1; transform: none; }

/* Contact */
.contact{
  padding-top: clamp(72px, 9vw, 120px);
  scroll-margin-top: 0;
}

.contact:focus{ outline: none; }

.contact-panel{
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
  padding: clamp(24px, 4vw, 56px);
  border-radius: 28px;
  background-color: color-mix(in srgb, var(--googleblue) 10%, var(--surface));
}

.contact-dots{ display: flex; gap: 6px; }

.contact-dots i{
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.contact-dots i:nth-child(1){ background-color: var(--googleblue); }
.contact-dots i:nth-child(2){ background-color: var(--googlered); }
.contact-dots i:nth-child(3){ background-color: var(--googleyellow); }
.contact-dots i:nth-child(4){ background-color: var(--googlegreen); }

.contact-heading{
  max-width: 14ch;
  margin-top: 20px;
  font-size: clamp(30px, 22px + 1.8vw, 48px);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.contact-text{
  max-width: 44ch;
  margin-top: 16px;
  font-size: 17px;
  color: #3C4043;
}

.contact-email{
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 24px 0 20px;
  color: #3C4043;
  font-size: 14px;
}

.contact-email svg{ flex-shrink: 0; margin-top: 2px; }

.contact-email a{
  color: var(--link-pressed);
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.contact-email a:hover{ text-decoration: underline; }

.contact-panel .btn-flat{
  border-color: transparent;
  background-color: var(--surface);
}

.contact-panel .btn-flat:hover{ border-color: var(--grey-300); }

.contact.is-target .contact-form{ animation: target-mark 2s var(--ease-out-quart); border-radius: 20px; }

/* Table of contents ---------------------------------------------------------- */

/* Wide screens: an "On this page" panel fixed to the right. The page reserves a
   right-hand column for it (padding on .cs) so it never covers content. */
@media (min-width: 1280px){
  .cs{ padding-right: calc(var(--toc-width) + 48px); }
}

.cs{ --toc-width: 208px; }

.toc-panel{
  position: fixed;
  top: 50%;
  right: 24px;
  z-index: 5;
  display: none;
  width: var(--toc-width);
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  padding: 18px 16px 12px;
  border-radius: 16px;
  background-color: var(--grey-50);
  opacity: 0;
  visibility: hidden;
  transform: translate(12px, -50%);
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart),
    visibility 0s linear var(--duration-base);
  scrollbar-width: thin;
}

.toc-panel.is-visible{
  opacity: 1;
  visibility: visible;
  transform: translate(0, -50%);
  transition-delay: 0s;
}

@media (min-width: 1280px){
  .toc-panel{ display: block; }
}

.toc-head{
  padding: 0 4px 12px;
  border-bottom: 1px solid var(--grey-200);
}

.toc-heading{
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
}

.toc-caption{
  margin-top: 2px;
  font-size: 13px;
  color: var(--meta);
  font-variant-numeric: tabular-nums;
}

.toc-body{
  position: relative;
  padding-top: 4px;
}

.toc-group{
  margin: 12px 0 2px;
  padding-left: 28px; /* align with item labels, clear of the snake */
  font-size: 12px;
  font-weight: 600;
  color: var(--meta);
}

/* The snake: grey track segments between dots, each filled in its item's colour. */
.toc-snake{
  position: absolute;
  inset: 0 auto 0 0;
  width: 24px;
  pointer-events: none;
}

.toc-segment{
  position: absolute;
  left: 11px;
  width: 2px;
  overflow: hidden;
  border-radius: 2px;
  background-color: var(--grey-200);
}

.toc-segment-fill{
  position: absolute;
  inset: 0;
  transform-origin: top;
  transition: transform 120ms linear;
}

.toc-list{
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.toc-item a{
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding: 0 8px 0 6px;
  border-radius: 10px;
  color: var(--meta);
  font-size: 14px;
  line-height: 1.25;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    color var(--duration-fast) var(--ease-out-quart);
}

.toc-item a:hover{
  background-color: var(--grey-100);
  color: var(--ink);
}

.toc-item a:focus-visible{
  outline: 2px solid var(--google-link);
  outline-offset: -2px;
}

.toc-dot{
  position: relative; /* above the snake */
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border: 2px solid var(--grey-300);
  border-radius: 50%;
  background-color: var(--grey-50);
  transition: border-color var(--duration-base) var(--ease-out-quart),
    background-color var(--duration-base) var(--ease-out-quart),
    box-shadow var(--duration-base) var(--ease-out-quart);
}

.toc-item.is-done .toc-dot{
  border-color: var(--dot);
  background-color: var(--dot);
}

.toc-item.is-active .toc-dot{
  border-color: var(--dot);
  background-color: var(--surface);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot) 22%, transparent);
}

.toc-item.is-active a{
  background-color: var(--surface);
  color: var(--ink);
  font-weight: 600;
}

.toc-label{
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-top{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-height: 36px;
  margin-top: 10px;
  padding: 0 10px;
  border-top: 1px solid var(--grey-200);
  border-radius: 0 0 10px 10px;
  background: none;
  color: var(--google-link);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.toc-top:hover{ text-decoration: underline; }
.toc-top:focus-visible{ outline: 2px solid var(--google-link); outline-offset: 2px; }

/* Phones/tablets: a sticky strip of chips at the top, with a progress line. */
.toc-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  border-bottom: 1px solid var(--grey-200);
  background-color: var(--surface);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition: opacity var(--duration-base) var(--ease-out-quart),
    transform var(--duration-base) var(--ease-out-quart),
    visibility 0s linear var(--duration-base);
}

.toc-bar.is-visible{
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: 0s;
}

@media (min-width: 1280px){
  .toc-bar{ display: none; }
}

.toc-strip{
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 8px 16px;
  overflow-x: auto;
  list-style: none;
  scrollbar-width: none;
}

.toc-strip::-webkit-scrollbar{ display: none; }

.toc-chip{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--grey-300);
  border-radius: 9999px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    border-color var(--duration-fast) var(--ease-out-quart);
}

.toc-chip::before{
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--dot);
}

.toc-chip.is-active{
  border-color: var(--ink);
  background-color: var(--ink);
  color: var(--surface);
}

.toc-bar-progress{
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  background-color: var(--googleblue);
  transition: width 120ms linear;
}

@media (max-width: 1279px){
  /* Land below the sticky strip when jumping to a section. */
  .study, .answers, .services, .contact{ scroll-margin-top: 72px; }
}

/* Narrow screens */
@media (max-width: 900px){
  .hero{ grid-template-columns: minmax(0, 1fr); }

  /* The portrait becomes a compact byline above the headline, so the headline
     and pitch land in the first screen instead of a full-height photo. */
  .hero-portrait{
    order: -1;
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
  }

  .portrait-frame{
    flex-shrink: 0;
    width: 76px;
    aspect-ratio: 1;
    border-radius: 20px;
  }

  .portrait-frame img{ object-position: center; }

  .portrait-dots{ display: none; }

  .portrait-card{
    position: static;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
  }

  .hero{ gap: 20px; }

  .study{
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .study-media{
    position: static;
    order: -1;
  }

  .study--flip .study-text{ order: 0; }

  .answers-grid,
  .services-list,
  .contact-panel{ grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 600px){
  .answer-card{ padding: 18px; }
  .converter{ grid-template-columns: minmax(0, 1fr); }
  .converter-box{ min-height: 0; padding: 14px 16px; }
  .converter-equals{ justify-self: center; line-height: 1; }
  .record-row{ grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .shot{ height: 132px; }
}
</style>
