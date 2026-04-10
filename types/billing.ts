export type PlanId = "free" | "team" | "business" | "enterprise";

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
  team: {
    id: "team",
    name: "Team",
    description: "Enforcement",
    price: 12,
    perDeveloper: true,
    minDevelopers: 5,
    priceId: process.env.STRIPE_TEAM_PRICE_ID || "",
    features: [
      "1 workspace, unlimited projects, unlimited decisions",
      "Blocking mode",
      "Judge tolerance controls",
      "Integrated LLM (fair use) or BYO LLM",
      "Email support",
    ],
    limits: { workspaces_limit: 1, projects_limit: -1, users_per_workspace_limit: -1, decisions_limit: -1, ai_generations_per_month: 700 },
  },
  business: {
    id: "business",
    name: "Business",
    description: "Full control",
    price: 28,
    perDeveloper: true,
    minDevelopers: 15,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "",
    features: [
      "Unlimited workspaces, projects, decisions",
      "Everything in Team, plus:",
      "Advanced policies",
      "Roles & permissions",
      "SSO (SAML, OIDC)",
      "Audit log with extended retention",
      "Priority support",
    ],
    limits: { workspaces_limit: -1, projects_limit: -1, users_per_workspace_limit: -1, decisions_limit: -1, ai_generations_per_month: 1400 },
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
      "Everything in Business, plus:",
      "Self-hosted deployment (VPC, air-gapped options)",
      "BYO LLM enforced",
      "Dedicated support with SLA",
      "Security review assistance (SOC 2, ISO 42001 evidence pack)",
      "Custom onboarding",
    ],
    limits: { workspaces_limit: -1, projects_limit: -1, users_per_workspace_limit: -1, decisions_limit: -1, ai_generations_per_month: -1 },
  },
};
