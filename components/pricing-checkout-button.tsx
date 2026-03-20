"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCheckoutButton({
  planId,
  planName,
  className,
  size = "sm",
}: {
  planId: "team" | "business";
  planName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json()) as { url?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // no-op, fall through to reset button state
    }
    setLoading(false);
  }

  return (
    <Button
      className={cn("w-full", className)}
      size={size}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Redirecting..." : planName}
    </Button>
  );
}
