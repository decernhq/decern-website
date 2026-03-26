import Link from "next/link";
import { getTranslations, getMessages } from "next-intl/server";
import { PLANS, type PlanId } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { PricingCheckoutButton } from "@/components/pricing-checkout-button";
import { cn } from "@/lib/utils";
import { appPath } from "@/lib/config";

const PLAN_ORDER: PlanId[] = ["free", "team", "business", "enterprise"];

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const messages = await getMessages();
  const plansData = (messages as { plans?: Record<string, { name?: string; description?: string; features?: string[] }> })?.plans;

  const plans = PLAN_ORDER.map((id) => {
    const plan = PLANS[id];
    const pm = plansData?.[id];
    return {
      ...plan,
      name: pm?.name ?? plan.name,
      description: pm?.description ?? plan.description,
      features: pm?.features ?? plan.features,
    };
  });

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {t("subtitle")}
        </p>
      </div>

      <div className="mx-auto mt-6 w-full max-w-5xl">
        <div className="hidden items-center justify-center gap-3 md:flex">
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {t("progressFree")}
          </span>
          <span className="text-gray-400 dark:text-gray-500" aria-hidden>
            →
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {t("progressTeam")}
          </span>
          <span className="text-gray-400 dark:text-gray-500" aria-hidden>
            →
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {t("progressBusiness")}
          </span>
          <span className="text-gray-400 dark:text-gray-500" aria-hidden>
            →
          </span>
          <span className="rounded-full border border-gray-900 bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900">
            {t("progressEnterprise")}
          </span>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 md:hidden">
          {t("tierLadder")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white p-6 dark:bg-gray-900",
              plan.id === "team"
                ? "border-brand-500 shadow-lg dark:border-brand-400"
                : plan.id === "enterprise"
                  ? "border-gray-900 bg-gradient-to-b from-gray-50 to-white shadow-md dark:border-gray-200 dark:from-gray-900 dark:to-gray-900"
                  : "border-gray-200 dark:border-gray-700"
            )}
          >
            {plan.id === "team" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-brand-600 px-3 py-0.5 text-xs font-medium text-white">
                  {t("mostPopular")}
                </span>
              </div>
            )}
            {plan.id === "enterprise" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gray-900 px-3 py-0.5 text-xs font-medium text-white dark:bg-gray-100 dark:text-gray-900">
                  {t("enterpriseBadge")}
                </span>
              </div>
            )}

            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {plan.name}
              </h2>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{plan.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {plan.id === "enterprise" ? (
                    <>
                      <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                        {t("fromLabel")}{" "}
                      </span>
                      €149
                    </>
                  ) : plan.price === 0 ? (
                    "€0"
                  ) : (
                    `€${plan.price}`
                  )}
                </span>
                {(plan.price > 0 || plan.id === "enterprise") && (
                  <span className="text-gray-500 text-sm dark:text-gray-400">{t("perMonth")}</span>
                )}
              </div>
              {plan.id === "enterprise" && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t("enterpriseSubprice")}</p>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            {(plan.id === "team" || plan.id === "business") && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">* {t("byoLLM")}</p>
            )}
            {plan.id === "enterprise" && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">* {t("byoLLMEnterprise")}</p>
            )}

            <div className="mt-6">
              {plan.id === "free" ? (
                <a href={appPath("/signup")} className="block">
                  <Button variant="outline" className="w-full">
                    {t("startFree")}
                  </Button>
                </a>
              ) : plan.id === "enterprise" ? (
                <a
                  href="mailto:support@decern.dev?subject=Self%20Hosted"
                  className="block"
                >
                  <Button className="w-full bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                    {t("contactUs")}
                  </Button>
                </a>
              ) : (
                <PricingCheckoutButton
                  planId={plan.id as "team" | "business"}
                  planName={plan.name}
                  className={cn(plan.id === "team" && "bg-brand-600 hover:bg-brand-700")}
                  size="sm"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("questions")}{" "}
        <a
          href="mailto:support@decern.dev"
          className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
        >
          support@decern.dev
        </a>
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="ghost">Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
