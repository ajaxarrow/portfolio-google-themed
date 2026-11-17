# Contact form email (EmailJS)

The contact form sends two emails through [EmailJS](https://www.emailjs.com), with no backend:

1. **Owner notification** to `VITE_CONTACT_EMAIL` with the visitor's message.
2. **Auto-reply** to the visitor, thanking them and confirming the message arrived.

Until the four `VITE_EMAILJS_*` variables are set, the Send button opens the visitor's own mail app instead.

## One-time setup

1. Create a free account at https://dashboard.emailjs.com.
2. **Email Services > Add New Service > Gmail**, connect the inbox that should send the emails, and copy the **Service ID**.
3. **Email Templates > Create New Template**, twice:

   | | Template 1: "Portfolio: new message" | Template 2: "Portfolio: auto-reply" |
   |---|---|---|
   | Content (code editor) | paste `owner-notification.html` | paste `auto-reply.html` |
   | Subject | `New message: {{subject}}` | `Thanks for reaching out, {{from_name}}` |
   | To Email | `{{to_email}}` | `{{from_email}}` |
   | From Name | `{{from_name}} (portfolio)` | `Jiu Axl Tabilla` |
   | Reply To | `{{reply_to}}` | your own address |

   Copy each **Template ID**.
4. **Account > General**, copy the **Public Key**.
5. Put the values in `.env.local` for local runs (see `.env.example`) and in **Netlify > Site configuration > Environment variables** for the live site, then redeploy.

## Recommended

- **Account > Security > Allowed origins**: add your site's domain so the public key cannot be used from other sites.
- The free plan sends 200 emails a month. Each form submission uses two.

## Template variables

`to_email`, `from_name`, `from_email`, `reply_to`, `subject`, `message`, `sent_at`, `page_url`. They are set in `src/lib/contact.ts`.
