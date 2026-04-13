# decern-website

Marketing and pricing website for Decern. Separate from `decern-core` (the app/dashboard).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page: hero, how it works, audit, trust, pricing teaser |
| `/pricing` | Plans: Free and Enterprise |
| `/terms` | Terms and conditions |
| `/docs` | Documentation entry |
| `/api/contact` | Contact form submission |

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- `next-intl` (English + Italian)
- Stripe SDK (checkout)

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WEBSITE_URL` | Website URL (e.g. `https://decern.dev`) |
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `https://app.decern.dev`) |
| `RESEND_API_KEY` | Email API for contact form |

## Deploy

Vercel as standalone app.
