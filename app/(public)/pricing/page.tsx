import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getMessages } from "next-intl/server";
import { PLANS, type PlanId } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { ContactForm, ContactFormButton } from "@/components/contact-form";
import { cn } from "@/lib/utils";
import { appPath } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free forever on observation mode. Enterprise and Self-Hosted plans for CI blocking, LLM Judge, and self-hosted deployment.",
};

const PLAN_ORDER: PlanId[] = ["free", "enterprise"];

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const cfT = await getTranslations("contactForm");
  const messages = await getMessages();
  const contactLabels = {
    title: cfT("title"),
    subtitle: cfT("subtitle"),
    name: cfT("name"),
    namePlaceholder: cfT("namePlaceholder"),
    email: cfT("email"),
    emailPlaceholder: cfT("emailPlaceholder"),
    subject: cfT("subject"),
    subjectPlaceholder: cfT("subjectPlaceholder"),
    message: cfT("message"),
    messagePlaceholder: cfT("messagePlaceholder"),
    send: cfT("send"),
    sending: cfT("sending"),
    successTitle: cfT("successTitle"),
    successBody: cfT("successBody"),
    error: cfT("error"),
    close: cfT("close"),
    privacy: cfT("privacy"),
  };
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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {t.rich("subtitle", { mbr: () => <br className="sm:hidden" /> })}
        </p>
      </div>


      <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white p-6 dark:bg-gray-900",
              plan.id === "enterprise"
                ? "border-gray-900 bg-gradient-to-b from-gray-50 to-white shadow-md dark:border-gray-200 dark:from-gray-900 dark:to-gray-900"
                : "border-gray-200 dark:border-gray-700"
            )}
          >
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
                {plan.id === "enterprise" ? (
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t("contactSales")}</span>
                ) : (
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">€0</span>
                )}
              </div>
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
            <div className="mt-6">
              {plan.id === "free" ? (
                <a href={appPath("/signup")} className="block">
                  <Button variant="outline" className="w-full">
                    {t("startFree")}
                  </Button>
                </a>
              ) : (
                <ContactFormButton
                  labels={contactLabels}
                  defaultSubject="Enterprise / Self-Hosted"
                  className="w-full bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {t("contactSales")}
                </ContactFormButton>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <span>{t("questions")}</span>
        <ContactForm labels={contactLabels} />
      </div>
      <div className="mt-6">
        <Link href="/">
          <Button variant="ghost">Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
