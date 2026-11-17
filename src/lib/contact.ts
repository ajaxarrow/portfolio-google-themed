import emailjs from "@emailjs/browser";

/**
 * Contact form delivery through EmailJS (no backend).
 * Two emails per submission:
 *   1. owner template  -> VITE_CONTACT_EMAIL, with the visitor's message
 *   2. reply template  -> the visitor, confirming it was received
 * Templates and setup: emailjs/README.md
 */
const env = import.meta.env;

export const CONTACT_EMAIL: string = env.VITE_CONTACT_EMAIL || "axldamnaxl@gmail.com";

const config = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  ownerTemplate: env.VITE_EMAILJS_TEMPLATE_OWNER as string | undefined,
  replyTemplate: env.VITE_EMAILJS_TEMPLATE_REPLY as string | undefined,
};

/** False until the four EmailJS variables are set; the form then falls back to the visitor's mail app. */
export const isEmailConfigured = Boolean(
  config.serviceId && config.publicKey && config.ownerTemplate && config.replyTemplate
);

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

export function validateContact(form: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Add your name so I know who I am replying to.";
  else if (name.length > 80) errors.name = "Keep the name under 80 characters.";

  if (!email) errors.email = "Add your email so I can reply.";
  else if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = "That email does not look right. Check for a typo, like name@company.com.";

  if (!subject) errors.subject = "Add a subject, a few words are enough.";
  else if (subject.length < 3) errors.subject = "Make the subject at least 3 characters.";
  else if (subject.length > 120) errors.subject = "Keep the subject under 120 characters.";

  if (!message) errors.message = "Tell me a little about the project.";
  else if (message.length < 5) errors.message = "Write at least a few words.";
  else if (message.length > 5000) errors.message = "Keep the message under 5,000 characters.";

  return errors;
}

export function mailtoHref(form: Partial<ContactMessage> = {}): string {
  const subject = form.subject?.trim() || "Project inquiry";
  const body = [form.message?.trim(), form.name?.trim() ? `\n${form.name.trim()}` : ""].filter(Boolean).join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
}

/** Sends the owner notification, then the confirmation to the visitor. Throws if the first one fails. */
export async function sendContactMessage(form: ContactMessage): Promise<{replySent: boolean}> {
  if (!isEmailConfigured) throw new Error("EmailJS is not configured");

  const params = {
    to_email: CONTACT_EMAIL,
    from_name: form.name.trim(),
    from_email: form.email.trim(),
    reply_to: form.email.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
    sent_at: new Date().toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila"}) + " (Philippine time)",
    page_url: window.location.href,
  };
  const options = {publicKey: config.publicKey!};

  await emailjs.send(config.serviceId!, config.ownerTemplate!, params, options);

  // The message is already delivered; a failed confirmation should not look like a failed send.
  let replySent = true;
  try {
    await emailjs.send(config.serviceId!, config.replyTemplate!, params, options);
  } catch {
    replySent = false;
  }
  return {replySent};
}
