import { NextResponse } from "next/server";
import { getCoreUrl } from "@/lib/config";

/**
 * Website layer receives Stripe webhooks and forwards them to decern-core.
 * Core remains the source of truth for subscription state updates.
 */
export async function POST(request: Request) {
  const coreUrl = getCoreUrl();
  const target = `${coreUrl}/api/stripe/webhook`;
  const rawBody = await request.text();
  const stripeSignature = request.headers.get("stripe-signature");
  const contentType = request.headers.get("content-type") ?? "application/json";

  if (!stripeSignature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "content-type": contentType,
        "stripe-signature": stripeSignature,
      },
      body: rawBody,
      cache: "no-store",
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to forward webhook to decern-core." },
      { status: 502 }
    );
  }
}
