import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getWebsiteUrl, appPath } from "@/lib/config";

type CheckoutRequest = {
  planId?: "team" | "business";
};

function getPriceId(planId: "team" | "business"): string | null {
  if (planId === "team") return process.env.STRIPE_TEAM_PRICE_ID ?? null;
  return process.env.STRIPE_BUSINESS_PRICE_ID ?? null;
}

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  let body: CheckoutRequest;
  try {
    body = (await req.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const planId = body.planId;
  if (planId !== "team" && planId !== "business") {
    return NextResponse.json({ error: "Invalid plan." }, { status: 422 });
  }

  const priceId = getPriceId(planId);
  if (!priceId) {
    return NextResponse.json({ error: `Missing Stripe price for ${planId}.` }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const websiteUrl = getWebsiteUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${websiteUrl}/pricing?checkout=success`,
    cancel_url: `${websiteUrl}/pricing?checkout=cancel`,
    allow_promotion_codes: true,
    metadata: {
      source: "decern-website",
      plan_id: planId,
      app_url: appPath("/"),
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe session has no URL." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url }, { status: 200 });
}
