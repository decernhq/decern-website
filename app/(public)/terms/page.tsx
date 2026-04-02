import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default async function TermsPage() {
  const t = await getTranslations("terms");

  const sections = [
    "definitions",
    "acceptance",
    "accountRegistration",
    "subscriptionAndPayment",
    "freeplan",
    "trialAndChanges",
    "licenseGrant",
    "acceptableUse",
    "intellectualProperty",
    "userData",
    "thirdPartyLLM",
    "selfHosted",
    "availability",
    "disclaimerOfWarranties",
    "limitationOfLiability",
    "indemnification",
    "termination",
    "confidentiality",
    "dataProtection",
    "modifications",
    "governingLaw",
    "severability",
    "entireAgreement",
    "contact",
  ] as const;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {t("lastUpdated")}
      </p>
      <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-300">
        {t("intro")}
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((key, i) => (
          <section key={key} id={key}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {i + 1}. {t(`${key}.title`)}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {(t.raw(`${key}.body`) as string[]).map((paragraph: string, j: number) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link href="/">
          <Button variant="ghost">Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
