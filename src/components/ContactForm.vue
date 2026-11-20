<script setup lang="ts">
import {computed, nextTick, reactive, ref, watch} from "vue";
import {PhArrowUpRight, PhCheckCircle, PhPaperPlaneRight, PhWarningCircle} from "@phosphor-icons/vue";
import {
  CONTACT_EMAIL, isEmailConfigured, mailtoHref, sendContactMessage, validateContact,
  type ContactErrors, type ContactMessage,
} from "../lib/contact.ts";

const props = defineProps<{
  /** Prefills the subject line, e.g. when arriving from a service. */
  subject?: string;
  /** Unique prefix for field ids when the form appears more than once. */
  idPrefix?: string;
}>();

const uid = props.idPrefix ?? 'contact';
const formRef = ref<HTMLFormElement | null>(null);
const successRef = ref<HTMLElement | null>(null);

const form = reactive<ContactMessage>({name: '', email: '', subject: props.subject ?? '', message: ''});
const touched = reactive<Record<keyof ContactMessage, boolean>>({name: false, email: false, subject: false, message: false});
const submitted = ref(false);
/** Hidden field real people never see or fill; bots do. */
const website = ref('');

type Status = 'idle' | 'sending' | 'sent' | 'error';
const status = ref<Status>('idle');
const replySent = ref(true);
const sentTo = ref('');

watch(() => props.subject, (value) => {
  if (value) form.subject = value;
});

const errors = computed<ContactErrors>(() => validateContact(form));
const shown = (field: keyof ContactMessage) =>
  (touched[field] || submitted.value) ? errors.value[field] : undefined;

const messageCount = computed(() => form.message.trim().length);

async function submit() {
  submitted.value = true;
  const firstInvalid = (Object.keys(errors.value) as (keyof ContactMessage)[])[0];
  if (firstInvalid) {
    nextTick(() => formRef.value?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
    return;
  }
  if (website.value) { // bot: pretend it worked, send nothing
    status.value = 'sent';
    return;
  }
  if (!isEmailConfigured) {
    // No EmailJS keys in this build: hand the message to the visitor's own mail app.
    window.location.href = mailtoHref(form);
    return;
  }

  status.value = 'sending';
  try {
    const result = await sendContactMessage({...form});
    replySent.value = result.replySent;
    sentTo.value = form.email.trim();
    status.value = 'sent';
    nextTick(() => successRef.value?.focus());
  } catch (error) {
    // EmailJS rejects with { status, text }; the text names the real cause (bad key, expired Gmail grant, quota).
    console.error('Contact form: EmailJS send failed', error);
    status.value = 'error';
  }
}

function reset() {
  Object.assign(form, {name: '', email: '', subject: props.subject ?? '', message: ''});
  (Object.keys(touched) as (keyof ContactMessage)[]).forEach((key) => { touched[key] = false; });
  submitted.value = false;
  status.value = 'idle';
  nextTick(() => formRef.value?.querySelector<HTMLElement>('[name="name"]')?.focus());
}
</script>

<template>
  <div class="compose">
    <div class="compose-bar">
      <span class="compose-bar-title">New message</span>
      <span class="compose-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    </div>

    <!-- Sent -->
    <div v-if="status === 'sent'" ref="successRef" class="compose-sent" tabindex="-1" role="status">
      <PhCheckCircle weight="fill" size="44" class="sent-icon"/>
      <h3 class="sent-title">Message sent</h3>
      <p class="sent-text">
        Thanks for reaching out. I read every message myself and will get back to you once I have gone through yours.
      </p>
      <p v-if="sentTo && replySent" class="sent-text">A confirmation is on its way to <strong>{{ sentTo }}</strong>.</p>
      <p v-else-if="sentTo" class="sent-text">
        Your message arrived, but the confirmation email to <strong>{{ sentTo }}</strong> did not go out. Nothing else is needed from you.
      </p>
      <button type="button" class="compose-link" @click="reset">Send another message</button>
    </div>

    <!-- Form -->
    <form v-else ref="formRef" class="compose-form" novalidate @submit.prevent="submit">
      <div class="compose-row compose-row--static">
        <span class="compose-label">To</span>
        <span class="compose-to">
          <span class="to-chip">Jiu Axl Tabilla</span>
          <a :href="mailtoHref()" class="to-email">{{ CONTACT_EMAIL }}</a>
        </span>
      </div>

      <div class="compose-row" :class="{ 'has-error': shown('name') }">
        <label class="compose-label" :for="`${uid}-name`">Name</label>
        <input
            :id="`${uid}-name`" v-model="form.name" name="name" type="text" autocomplete="name"
            placeholder="Your name" maxlength="80" required
            :aria-invalid="!!shown('name')" :aria-describedby="shown('name') ? `${uid}-name-error` : undefined"
            @blur="touched.name = true"
        />
        <p v-if="shown('name')" :id="`${uid}-name-error`" class="compose-error"><PhWarningCircle weight="fill" size="16"/> {{ shown('name') }}</p>
      </div>

      <div class="compose-row" :class="{ 'has-error': shown('email') }">
        <label class="compose-label" :for="`${uid}-email`">From</label>
        <input
            :id="`${uid}-email`" v-model="form.email" name="email" type="email" inputmode="email" autocomplete="email"
            placeholder="you@company.com" maxlength="254" required spellcheck="false" autocapitalize="off"
            :aria-invalid="!!shown('email')" :aria-describedby="shown('email') ? `${uid}-email-error` : undefined"
            @blur="touched.email = true"
        />
        <p v-if="shown('email')" :id="`${uid}-email-error`" class="compose-error"><PhWarningCircle weight="fill" size="16"/> {{ shown('email') }}</p>
      </div>

      <div class="compose-row" :class="{ 'has-error': shown('subject') }">
        <label class="compose-label" :for="`${uid}-subject`">Subject</label>
        <input
            :id="`${uid}-subject`" v-model="form.subject" name="subject" type="text"
            placeholder="A booking platform for clinics" maxlength="120" required
            :aria-invalid="!!shown('subject')" :aria-describedby="shown('subject') ? `${uid}-subject-error` : undefined"
            @blur="touched.subject = true"
        />
        <p v-if="shown('subject')" :id="`${uid}-subject-error`" class="compose-error"><PhWarningCircle weight="fill" size="16"/> {{ shown('subject') }}</p>
      </div>

      <div class="compose-body" :class="{ 'has-error': shown('message') }">
        <label class="sr-only" :for="`${uid}-message`">Message</label>
        <textarea
            :id="`${uid}-message`" v-model="form.message" name="message" rows="7" maxlength="5000" required
            placeholder="What are you building, who is it for, and when do you need it?"
            :aria-invalid="!!shown('message')" :aria-describedby="shown('message') ? `${uid}-message-error` : undefined"
            @blur="touched.message = true"
        ></textarea>
        <p v-if="shown('message')" :id="`${uid}-message-error`" class="compose-error"><PhWarningCircle weight="fill" size="16"/> {{ shown('message') }}</p>
      </div>

      <!-- Honeypot: off-screen, skipped by keyboards and screen readers -->
      <div class="compose-trap" aria-hidden="true">
        <label :for="`${uid}-website`">Website</label>
        <input :id="`${uid}-website`" v-model="website" type="text" name="website" tabindex="-1" autocomplete="off"/>
      </div>

      <p v-if="status === 'error'" class="compose-alert" role="alert">
        <PhWarningCircle weight="fill" size="18"/>
        <span>
          The message did not send. Check your connection and try again, or
          <a :href="mailtoHref(form)">email it from your own mail app</a>.
        </span>
      </p>

      <div class="compose-foot">
        <button type="submit" class="compose-send" :disabled="status === 'sending'">
          <span v-if="status === 'sending'" class="send-spinner" aria-hidden="true"></span>
          <PhPaperPlaneRight v-else weight="fill" size="18"/>
          {{ status === 'sending' ? 'Sending…' : 'Send' }}
        </button>
        <a class="compose-link" :href="mailtoHref(form)">
          Use my mail app instead <PhArrowUpRight size="14"/>
        </a>
        <span class="compose-count" :class="{ 'is-over': messageCount > 5000 }">{{ messageCount }} / 5,000</span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.compose{
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  border: 1px solid var(--grey-300);
  border-radius: 20px;
  background-color: var(--surface);
  color: var(--ink);
  font-size: 15px;
  text-align: left;
}

.compose-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: var(--grey-100);
}

.compose-bar-title{ font-size: 14px; font-weight: 500; }

.compose-dots{ display: flex; gap: 6px; }

.compose-dots i{
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.compose-dots i:nth-child(1){ background-color: var(--googleblue); }
.compose-dots i:nth-child(2){ background-color: var(--googlered); }
.compose-dots i:nth-child(3){ background-color: var(--googleyellow); }
.compose-dots i:nth-child(4){ background-color: var(--googlegreen); }

.compose-form{ padding: 0 20px 20px; }

/* A row is label + field on one line, like a mail client's header fields. */
.compose-row{
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  column-gap: 8px;
  min-height: 52px;
  border-bottom: 1px solid var(--grey-200);
  transition: border-color var(--duration-fast) var(--ease-out-quart);
}

.compose-row:focus-within{ border-bottom-color: var(--googleblue); box-shadow: 0 1px 0 var(--googleblue); }
.compose-row.has-error{ border-bottom-color: var(--googlered); box-shadow: 0 1px 0 var(--googlered); }

.compose-label{
  color: var(--meta);
  font-size: 14px;
}

.compose-row input,
.compose-body textarea{
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--ink);
  font-size: 16px;
  line-height: 1.5;
}

.compose-row input{ min-height: 50px; }

.compose-row input::placeholder,
.compose-body textarea::placeholder{ color: var(--placeholder); opacity: 1; }

.compose-to{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  padding: 8px 0;
}

.to-chip{
  padding: 3px 12px;
  border: 1px solid var(--grey-300);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
}

.to-email{
  color: var(--google-link);
  font-size: 14px;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.to-email:hover{ text-decoration: underline; }

.compose-body{
  padding-top: 14px;
  border-bottom: 1px solid var(--grey-200);
  transition: border-color var(--duration-fast) var(--ease-out-quart);
}

.compose-body:focus-within{ border-bottom-color: var(--googleblue); box-shadow: 0 1px 0 var(--googleblue); }
.compose-body.has-error{ border-bottom-color: var(--googlered); box-shadow: 0 1px 0 var(--googlered); }

.compose-body textarea{
  display: block;
  min-height: 150px;
  resize: vertical;
}

.compose-error{
  grid-column: 2;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding-bottom: 10px;
  color: var(--error-text);
  font-size: 13px;
  line-height: 1.4;
  animation: error-in 260ms var(--ease-out-expo);
}

.compose-error svg{ flex-shrink: 0; margin-top: 1px; }
.compose-body .compose-error{ padding-top: 6px; }

@keyframes error-in{
  from{ opacity: 0; transform: translateY(-4px); }
}

.compose-trap{
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.compose-alert{
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background-color: var(--error-bg);
  color: var(--error-strong);
  font-size: 14px;
  line-height: 1.45;
}

.compose-alert svg{ flex-shrink: 0; margin-top: 1px; }
.compose-alert a{ color: inherit; font-weight: 500; text-underline-offset: 3px; }

.compose-foot{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  margin-top: 18px;
}

.compose-send{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 24px;
  border: 0;
  border-radius: 9999px;
  background-color: var(--google-link);
  color: var(--surface);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out-quart),
    transform var(--duration-fast) var(--ease-out-quart);
}

.compose-send:hover{ background-color: var(--link-pressed); }
.compose-send:active{ transform: scale(0.97); }
.compose-send:disabled{ background-color: var(--grey-400); cursor: progress; }

.send-spinner{
  width: 16px;
  height: 16px;
  border: 2px solid color-mix(in srgb, var(--surface) 45%, transparent);
  border-top-color: var(--surface);
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

@keyframes spin{
  to{ transform: rotate(360deg); }
}

.compose-link{
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--google-link);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.compose-link:hover{ text-decoration: underline; text-underline-offset: 3px; }

.compose-count{
  margin-left: auto;
  color: var(--meta);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.compose-count.is-over{ color: var(--error-text); }

/* Sent */
.compose-sent{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 36px 24px 28px;
  outline: none;
}

.sent-icon{
  color: var(--googlegreen);
  animation: sent-pop 600ms var(--ease-out-expo);
}

@keyframes sent-pop{
  from{ transform: scale(0.4); opacity: 0; }
}

.sent-title{
  margin-top: 4px;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.sent-text{
  max-width: 52ch;
  color: var(--meta);
  line-height: 1.55;
}

.sent-text strong{ color: var(--ink); font-weight: 500; overflow-wrap: anywhere; }

@media (max-width: 520px){
  .compose-form{ padding: 0 16px 16px; }
  .compose-bar{ padding: 12px 16px; }
  .compose-row{ grid-template-columns: 56px minmax(0, 1fr); }
  .compose-count{ margin-left: 0; }
}

@media (prefers-reduced-motion: reduce){
  .compose-error, .sent-icon{ animation: none; }
  .send-spinner{ animation-duration: 1.6s; }
  .compose-send:active{ transform: none; }
}
</style>
