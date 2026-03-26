# decern-website

Marketing and pricing website for Decern.

This repository is intentionally separate from `decern-core`:

- `decern-website` serves public marketing pages and checkout flow
- `decern-core` serves app/dashboard/auth/API product functionality

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Stripe SDK
- `next-intl` for localization

## Main Routes

- `/` - landing page
- `/pricing` - pricing and checkout CTA
- `/docs` - public docs entry
- `POST /api/stripe/checkout` - checkout session creation

## Local Development

1) Install dependencies:

```bash
npm install
```

2) Create env file:

```bash
cp .env.example .env.local
```

3) Run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

- `NEXT_PUBLIC_WEBSITE_URL` (example: `https://decern.dev`)
- `NEXT_PUBLIC_APP_URL` (example: `https://app.decern.dev`)
- `STRIPE_SECRET_KEY`
- `STRIPE_TEAM_PRICE_ID`
- `STRIPE_BUSINESS_PRICE_ID`

## Scripts

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - run built app
- `npm run lint` - lint codebase

## Deploy

Deploy on Vercel as a standalone app and set the env vars above for Production and Preview.
