export type PlanId = "free" | "enterprise";

export interface PlanLimits {
  workspaces_limit: number;
  projects_limit: number;
  users_per_workspace_limit: number;
  decisions_limit: number;
  ai_generations_per_month: number;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  perDeveloper: boolean;
  minDevelopers: number | null;
  priceId: string | null;
  features: string[];
  limits: PlanLimits;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    description: "Visibility",
    price: 0,
    perDeveloper: false,
    minDevelopers: null,
    priceId: null,
    features: [
      "Up to 5 developers",
      "1 workspace, unlimited projects, unlimited decisions",
      "Observation mode only (warnings, no blocking)",
      "LLM as a Judge (advisory, BYO only)",
      "AI decision generation (fair use)",
    ],
    limits: { workspaces_limit: 1, projects_limit: -1, users_per_workspace_limit: 5, decisions_limit: -1, ai_generations_per_month: 10 },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise / Self-Hosted",
    description: "Deployment control",
    price: 2500,
    perDeveloper: false,
    minDevelopers: null,
    priceId: null,
    features: [
      "Unlimited workspaces, projects, decisions",
      "Blocking mode + advanced policies",
      "Roles & permissions",
      "Self-hosted deployment (VPC, air-gapped options)",
      "BYO LLM enforced",
      "Dedicated support with SLA",
      "Security review assistance (SOC 2, ISO 42001 evidence pack)",
      "Custom onboarding",
    ],
    limits: { workspaces_limit: -1, projects_limit: -1, users_per_workspace_limit: -1, decisions_limit: -1, ai_generations_per_month: -1 },
  },
};
