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

- `NEXT_PUBLIC_WEBSITE_URL` (e.g. `https://decern.app`)
- `NEXT_PUBLIC_APP_URL` (e.g. `https://app.decern.app`)
- `STRIPE_SECRET_KEY`
- `STRIPE_TEAM_PRICE_ID`
- `STRIPE_BUSINESS_PRICE_ID`

## Deploy

Deploy on Vercel as a standalone app and set the env vars above for Production/Preview.
