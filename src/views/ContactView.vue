<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {PhClock, PhEnvelopeSimple, PhMapPin, PhUsersThree} from "@phosphor-icons/vue";
import ContactForm from "../components/ContactForm.vue";
import {CONTACT_EMAIL, mailtoHref} from "../lib/contact.ts";

const route = useRoute();
// /contact?subject=AI%20automation prefills the subject line.
const subject = computed(() => {
  const value = route.query.subject;
  return (Array.isArray(value) ? value[0] : value) ?? undefined;
});
</script>

<template>
  <div class="contact">
    <p class="contact-count">About 1 result (0.21 seconds)</p>

    <div class="contact-grid">
      <div class="contact-intro">
        <h1 class="contact-title">Tell me what you are building.</h1>
        <p class="contact-lead">
          Use the form and it lands straight in my inbox. You get a confirmation by email, and I reply once I have read your message.
        </p>

        <ul class="contact-facts">
          <li>
            <PhEnvelopeSimple size="20"/>
            <span>
              <span class="fact-label">Email</span>
              <a :href="mailtoHref()">{{ CONTACT_EMAIL }}</a>
            </span>
          </li>
          <li>
            <PhMapPin size="20"/>
            <span>
              <span class="fact-label">Based in</span>
              Bukidnon, Philippines (UTC+8)
            </span>
          </li>
          <li>
            <PhClock size="20"/>
            <span>
              <span class="fact-label">Working hours</span>
              Remote, with flexible overlap for your time zone
            </span>
          </li>
          <li>
            <PhUsersThree size="20"/>
            <span>
              <span class="fact-label">Elsewhere</span>
              <RouterLink to="/socials">LinkedIn, GitHub and résumé</RouterLink>
            </span>
          </li>
        </ul>

        <p class="contact-help">
          It helps to include what the product does, who it is for, and when you need it.
          Not sure yet? <RouterLink to="/case-studies">See the case studies</RouterLink> first.
        </p>
      </div>

      <ContactForm class="contact-form" :subject="subject" id-prefix="contact-page"/>
    </div>
  </div>
</template>

<style scoped>
.contact{
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  /* Keeps the compose card on the same grid as the results pages instead of
     running to the viewport edge on wide screens. */
  max-width: 1120px;
  padding-bottom: 72px;
  color: var(--ink);
  font-size: 15px;
  line-height: 1.55;
}

@media (min-width: 960px){
  .contact{ margin-left: var(--layout-rail-offset); padding-right: 24px; }
}

.contact a{
  color: var(--google-link);
  text-decoration: none;
  text-underline-offset: 3px;
}

.contact a:hover{ text-decoration: underline; }

.contact-count{
  color: var(--meta);
  font-size: 14px;
}

.contact-grid{
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
  padding-top: clamp(20px, 3vw, 40px);
}

.contact-title{
  max-width: 14ch;
  font-size: clamp(36px, 26px + 2.6vw, 60px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.contact-lead{
  max-width: 46ch;
  margin-top: 18px;
  font-size: clamp(17px, 15px + 0.4vw, 20px);
  text-wrap: pretty;
}

.contact-facts{
  margin-top: 28px;
  padding: 0;
  list-style: none;
}

.contact-facts li{
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-top: 1px solid var(--grey-200);
}

.contact-facts li:last-child{ border-bottom: 1px solid var(--grey-200); }
.contact-facts svg{ flex-shrink: 0; margin-top: 2px; color: var(--meta); }

.fact-label{
  display: block;
  color: var(--meta);
  font-size: 13px;
}

.contact-facts a{ overflow-wrap: anywhere; }

.contact-help{
  max-width: 50ch;
  margin-top: 20px;
  color: var(--meta);
  font-size: 14px;
}

@keyframes rise{
  from{ opacity: 0; transform: translateY(20px); }
}

@media (prefers-reduced-motion: no-preference){
  .contact-title{ animation: rise 800ms var(--ease-out-expo) backwards; }
  .contact-lead{ animation: rise 800ms var(--ease-out-expo) 100ms backwards; }
  .contact-facts{ animation: rise 800ms var(--ease-out-expo) 180ms backwards; }
  .contact-help{ animation: rise 800ms var(--ease-out-expo) 240ms backwards; }
  .contact-form{ animation: rise 900ms var(--ease-out-expo) 160ms backwards; }
}

@media (max-width: 900px){
  .contact-grid{ grid-template-columns: minmax(0, 1fr); }
}
</style>
