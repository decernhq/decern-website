export type PlanId = "free" | "team" | "business" | "enterprise";

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
      "1 project",
      "Unlimited decisions",
      "Judge (advisory, BYO LLM)",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For growing teams",
    priceLabel: "EUR 49 / month",
    ctaLabel: "Choose Team",
    checkout: true,
    features: [
      "1 workspace",
      "Unlimited projects",
      "CI blocking for high impact",
      "Judge tolerance controls",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "For organizations",
    priceLabel: "EUR 99 / month",
    ctaLabel: "Choose Business",
    checkout: true,
    features: [
      "Unlimited workspaces",
      "Advanced policies",
      "Roles and collaboration",
      "Judge + governance controls",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom support and deployment",
    priceLabel: "Contact us",
    ctaLabel: "Contact sales",
    checkout: false,
    features: [
      "Custom limits",
      "Dedicated support",
      "Private hosting options",
    ],
  },
];
