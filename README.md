# decern-website

Public website for Decern: landing, docs teaser, and pricing with checkout entry points.

## Scope

This repo is intentionally separate from `decern-core`:

- `decern-website`: marketing and pricing surfaces
- `decern-core`: authenticated app, dashboard, workspace and decision management

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Stripe SDK (checkout integration)
- `next-intl` for localization

## Routes

- `/` - landing page
- `/pricing` - plans and checkout CTA
- `/docs` - public docs entry page

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

Set these in your environment (local and deployment):

- `NEXT_PUBLIC_WEBSITE_URL`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_TEAM_PRICE_ID`
- `STRIPE_BUSINESS_PRICE_ID`

## Scripts

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - run built app
- `npm run lint` - lint codebase
# decern-website

Marketing and pricing website for Decern.

- Landing page: `/`
- Pricing page: `/pricing`
- Stripe checkout endpoint: `POST /api/stripe/checkout`

This repository is intentionally separate from `decern-core`:
- `decern-website` serves public marketing pages and checkout flow.
- `decern-core` serves app/dashboard/auth/API product functionality.

## Local development

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

## Required environment variables

- `NEXT_PUBLIC_WEBSITE_URL` (e.g. `https://decern.dev`)
- `NEXT_PUBLIC_APP_URL` (e.g. `https://app.decern.dev`)
- `STRIPE_SECRET_KEY`
- `STRIPE_TEAM_PRICE_ID`
- `STRIPE_BUSINESS_PRICE_ID`

## Deploy

Deploy on Vercel as a standalone app and set the env vars above for Production/Preview.
