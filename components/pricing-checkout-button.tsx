"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { appPath } from "@/lib/config";

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
  return (
    <a href={appPath(`/signup?plan=${planId}`)} className="block">
      <Button className={cn("w-full", className)} size={size}>
        {planName}
      </Button>
    </a>
  );
}
