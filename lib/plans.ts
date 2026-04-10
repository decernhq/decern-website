export type PlanId = "free" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  priceLabel: string;
  ctaLabel: string;
  checkout: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals getting started",
    priceLabel: "EUR 0",
    ctaLabel: "Start free",
    checkout: false,
    features: [
      "1 workspace",
      "Unlimited projects",
      "Unlimited decisions",
      "Judge (advisory, BYO LLM)",
    ],
  },
  {
    id: "enterprise",
    name: "Self Hosted",
    description: "Deploy on your infrastructure",
    priceLabel: "Contact us",
    ctaLabel: "Contact sales",
    checkout: false,
    features: [
      "Unlimited workspaces",
      "Advanced policies",
      "Roles and collaboration",
      "Judge + advanced controls",
      "Self-hosted integration",
      "Dedicated support",
    ],
  },
];
