/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_TEMPLATE_OWNER?: string;
  readonly VITE_EMAILJS_TEMPLATE_REPLY?: string;
}

declare module '*?thumb' {
  const src: string;
  export default src;
}
