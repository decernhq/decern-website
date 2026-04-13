import Link from "next/link";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { SolutionFlowAnimation } from "@/components/landing/solution-flow-animation";
import { FadeIn } from "@/components/landing/fade-in";
import { ContactForm, ContactFormButton } from "@/components/contact-form";
import { appPath } from "@/lib/config";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-500 dark:text-brand-400">
      {children}
    </p>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </strong>
  );
}
export default async function LandingPage() {
  const user = null;
  const t = await getTranslations("landing");
  const plansT = await getTranslations("plans");
  const cfT = await getTranslations("contactForm");
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

  const bold = { b: (c: React.ReactNode) => <Bold>{c}</Bold> };

  return (
    <main className="overflow-x-hidden bg-white dark:bg-gray-950">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-400/20 blur-[110px] dark:bg-brand-500/20" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-violet-400/15 blur-[110px] dark:bg-violet-500/20" aria-hidden />
        <div className="pointer-events-none absolute inset-0 landing-grid-pattern landing-hero-grid-fade" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.03fr] lg:items-center">
            <div>
              <FadeIn delay={0} duration={600}>
                <span className="inline-flex items-center rounded-full border border-brand-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 shadow-sm backdrop-blur dark:border-brand-700/40 dark:bg-gray-900/60 dark:text-brand-300">
                  {t("hero.eyebrow")}
                </span>
              </FadeIn>

              <FadeIn delay={90} duration={700}>
                <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  <span className="landing-gradient-text">{t.rich("hero.headline", { br: () => <br /> })}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={170} duration={700}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
                  {t.rich("hero.subheadline", bold)}
                </p>
              </FadeIn>

              <FadeIn delay={250} duration={650}>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                  {user ? (
                    <a href={appPath("/dashboard")} className="w-full sm:w-auto">
                      <Button size="lg" className="h-12 w-full rounded-xl px-7 shadow-lg shadow-brand-500/20 sm:w-auto">
                        Dashboard
                      </Button>
                    </a>
                  ) : (
                    <>
                      <a href={appPath("/signup")} className="w-full sm:w-auto">
                        <Button size="lg" className="h-12 w-full rounded-xl px-7 shadow-lg shadow-brand-500/20 sm:w-auto">
                          {t("hero.ctaPrimary")}
                        </Button>
                      </a>
                      <a href="#solution" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="h-12 w-full rounded-xl border-gray-300 px-7 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white/5 sm:w-auto">
                          {t("hero.ctaSecondary")}
                        </Button>
                      </a>
                    </>
                  )}
                </div>
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                  {t.rich("hero.ctaMicrocopy", { br: () => <br /> })}
                </p>
              </FadeIn>

              <FadeIn delay={320} duration={650}>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {t("hero.buyerLine")}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={320} duration={850} direction="right" distance={28}>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-5 rounded-[28px] bg-gradient-to-br from-brand-500/15 via-violet-400/5 to-transparent blur-2xl" aria-hidden />
                <div className="landing-terminal relative overflow-hidden rounded-2xl border border-gray-200/70 bg-gray-950 shadow-[0_30px_90px_-34px_rgba(15,23,42,0.7)] dark:border-white/10">
                  <div className="flex items-center justify-between border-b border-white/[0.08] bg-gray-900/90 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 font-mono text-[11px] text-gray-500">decern gate</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 font-mono text-[11px] leading-6 text-gray-400 sm:px-6 sm:py-4 sm:text-[13px] sm:leading-7">
                    <p><span className="text-gray-600">$</span> <span className="text-white">npx decern gate</span></p>
                    <p className="mt-1">ADRs: found <span className="text-gray-300">4 approved</span> in docs/adr</p>
                    <p>Changed files: <span className="text-gray-300">3</span></p>
                    <p className="mt-2">Evaluating ADR-007: Use PostgreSQL for persistence...</p>
                    <p className="text-emerald-400">  pass <span className="text-gray-500">(92%)</span></p>
                    <p className="mt-1">Evaluating ADR-012: No direct DB access from handlers...</p>
                    <p className="text-red-400">  BLOCKED <span className="text-gray-500">(87%)</span> <span className="text-gray-500">— handler queries DB directly, bypassing service layer</span></p>
                    <p className="mt-1 text-amber-400">SIGNAL: New Redis caching layer detected</p>
                    <p className="mt-2 font-medium text-red-400">Gate: blocked. <span className="text-gray-500">1 new decision also detected.</span></p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── No ADRs yet? ─────────────────────────────────────────── */}
      <section className="scroll-mt-20 border-y border-brand-100/60 bg-brand-50/30 px-4 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center">
              <Eyebrow>{t("noAdrs.eyebrow")}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.rich("noAdrs.title", { br: () => <br /> })}</h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {t("noAdrs.body")}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 text-center">
              <a href="#solution">
                <Button variant="outline" className="h-10 px-6">{t("noAdrs.cta")}</Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem / Value (Sound familiar?) ──────────────────────── */}
      <section id="value" className="scroll-mt-20 px-4 py-16 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{t("value.eyebrow")}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t.rich("value.title", { br: () => <br /> })}
              </h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {(["pain1", "pain2", "pain3"] as const).map((k, i) => (
              <FadeIn key={k} delay={80 * i}>
                <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/60">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-rose-500 dark:text-rose-400">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </div>
                  <p className="text-[0.9rem] leading-relaxed text-gray-700 dark:text-gray-300">
                    {t(`value.${k}`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={260}>
            <p className="mt-10 text-center text-base font-semibold text-gray-900 dark:text-white">
              {t("value.closingLine")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Now ──────────────────────────────────────────────── */}
      <section className="scroll-mt-20 border-y border-gray-900/10 bg-gray-900/[0.03] px-4 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center">
              <Eyebrow>{t("whyNow.eyebrow")}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{t.rich("whyNow.title", { br: () => <br /> })}</h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {t("whyNow.body")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Integrations bar ────────────────────────────────────────── */}
      <section className="border-y border-gray-200/70 bg-gray-50/70 px-4 py-10 dark:border-gray-800/80 dark:bg-gray-900/40">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
            {t("integrations.label")}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-400 dark:text-gray-500 sm:gap-x-8 sm:text-sm">
            {(["i1", "i2", "i3", "i4", "i5"] as const).map((k) => (
              <span key={k}>{t(`integrations.${k}`)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section id="solution" className="scroll-mt-20 border-y border-gray-200/70 bg-gray-50/70 px-4 py-16 dark:border-gray-800/80 dark:bg-gray-900/40 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <Eyebrow>{t("solution.eyebrow")}</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("solution.title")}</h2>
          </FadeIn>
          <div className="mt-14">
            <SolutionFlowAnimation
              steps={[t("solution.step1Title"), t("solution.step2Title"), t("solution.step3Title")]}
              stepBodies={[t("solution.flowStep1Desc"), t("solution.flowStep2Desc"), t("solution.flowStep3Desc")]}
              judgeLabel={t("solution.flowJudgeLabel")}
              outcomeLabel={t("solution.flowOutcome")}
            />
          </div>
          <FadeIn delay={400}>
            <p className="mt-12 text-center text-base font-medium text-gray-600 dark:text-gray-300">
              {t.rich("solution.bottomLine", { br: () => <br /> })}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Audit-ready by design ─────────────────────────────────── */}
      <section id="audit" className="scroll-mt-20 border-y border-brand-100/60 bg-brand-50/30 px-4 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <Eyebrow>{t("audit.eyebrow")}</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("audit.title")}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-8 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {t("audit.body1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {t("audit.body2")}
            </p>
            <p className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              {t("audit.badgeLine")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────────── */}
      <section id="buyers" className="scroll-mt-20 px-4 py-16 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <Eyebrow>{t("buyers.eyebrow")}</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("buyers.title")}</h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {([["b1Role", "b1Desc", "b1Outcome"], ["b2Role", "b2Desc", "b2Outcome"], ["b3Role", "b3Desc", "b3Outcome"]] as const).map(([role, desc, outcome], i) => (
              <FadeIn key={role} delay={80 * i}>
                <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/60">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{t(`buyers.${role}`)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t(`buyers.${desc}`)}</p>
                  <p className="mt-4 text-sm font-semibold text-brand-700 dark:text-brand-300">{t(`buyers.${outcome}`)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust and control ───────────────────────────────────────── */}
      <section id="trust" className="scroll-mt-20 border-y border-gray-200/70 bg-gray-50/70 px-4 py-16 dark:border-gray-800/80 dark:bg-gray-900/40 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <Eyebrow>{t("trust.eyebrow")}</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.rich("trust.title", { mbr: () => <br className="sm:hidden" /> })}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-left text-lg text-gray-600 dark:text-gray-300">{t("trust.intro")}</p>
          </FadeIn>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {(["t1", "t2", "t3"] as const).map((k, i) => (
              <FadeIn key={k} delay={80 * i}>
                <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/60">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t(`trust.${k}Title`)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t(`trust.${k}Desc`)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Self-hosted ────────────────────────────────────────────── */}
      <section id="self-hosted" className="scroll-mt-20 border-y border-gray-900/10 bg-gray-900/[0.03] px-4 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center">
              <Eyebrow>{t("selfHosted.eyebrow")}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("selfHosted.title")}</h2>
            </div>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">{t("selfHosted.body")}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 text-center">
              <ContactFormButton
                labels={contactLabels}
                defaultSubject="Self-Hosted"
                className="h-12 px-7 text-base border border-gray-900 bg-gray-900 text-white hover:bg-black dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {t("selfHosted.cta")}
              </ContactFormButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing teaser ──────────────────────────────────────────── */}
      <section id="pricing-teaser" className="scroll-mt-20 px-4 py-16 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <Eyebrow>{t("pricingTeaser.eyebrow")}</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.rich("pricingTeaser.title", { br: () => <br /> })}</h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-2 max-w-2xl mx-auto">
            {([["free", "freeDesc"], ["enterprise", "enterpriseDesc"]] as const).map(([plan, descKey], i) => (
              <FadeIn key={plan} delay={80 * i}>
                <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/60">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plansT(`${plan}.name`)}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plansT(`${plan}.description`)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t(`pricingTeaser.${descKey}`)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pricing"><Button size="lg">{t("pricingTeaser.ctaPrimary")}</Button></Link>
          </FadeIn>
          <FadeIn>
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {t("pricingTeaser.bottomLine")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Decern (founder voice) ──────────────────────────────── */}
      <section className="border-y border-gray-200/70 bg-gray-50/70 px-4 py-16 dark:border-gray-800/80 dark:bg-gray-900/40 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Eyebrow>{t("whyDecern.eyebrow")}</Eyebrow>
            <p className="mt-4 text-base italic leading-relaxed text-gray-600 dark:text-gray-300">
              {t("whyDecern.body")}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{t("earlyAdopter.line")}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("earlyAdopter.cta")}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="landing-cta-bg relative overflow-hidden px-4 py-16 sm:py-28 lg:py-36">
        <div className="landing-cta-horizon" aria-hidden />
        <div className="landing-cta-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="landing-cta-blob landing-cta-blob-1 absolute -left-[20%] top-1/4" aria-hidden />
        <div className="landing-cta-blob landing-cta-blob-2 absolute -right-[15%] bottom-1/4" aria-hidden />
        <div className="landing-cta-blob landing-cta-blob-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="landing-cta-shine pointer-events-none absolute inset-0" aria-hidden />
        <div className="landing-cta-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="landing-cta-title text-3xl font-bold leading-snug tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {t.rich("cta.title", { ...bold, br: () => <br />, accent: (c) => <span className="mt-2 inline-block landing-gradient-text-reverse">{c}</span> })}
          </h2>
          <div className="landing-cta-buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <a href={appPath("/dashboard")}>
                <Button size="lg" className="shadow-lg shadow-brand-500/20">Dashboard</Button>
              </a>
            ) : (
              <>
                <a href={appPath("/signup")} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full shadow-lg shadow-brand-500/20 sm:w-auto">{t("cta.ctaPrimary")}</Button>
                </a>
                <ContactFormButton
                  labels={contactLabels}
                  defaultSubject="Decern Demo"
                  className="h-12 w-full px-6 text-base border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white sm:w-auto"
                >
                  {t("cta.ctaSecondary")}
                </ContactFormButton>
              </>
            )}
          </div>
          <p className="landing-cta-subline mt-4 text-sm text-gray-500 dark:text-gray-400">{t.rich("cta.microcopy", { br: () => <br /> })}</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 sm:flex-row">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <Link href="/pricing" className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{t("footer.pricing")}</Link>
              <Link href="/terms" className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{t("footer.terms")}</Link>
              <ContactForm labels={contactLabels} />
              {user ? (
                <a href={appPath("/dashboard")} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{t("footer.dashboard")}</a>
              ) : (
                <>
                  <a href={appPath("/login")} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{t("footer.logIn")}</a>
                  <a href={appPath("/signup")} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">{t("footer.signUp")}</a>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
              <a href="https://www.iubenda.com/privacy-policy/22250478" className="iubenda-white iubenda-noiframe iubenda-embed text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" title="Privacy Policy">Privacy Policy</a>
              <a href="https://www.iubenda.com/privacy-policy/22250478/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" title="Cookie Policy">Cookie Policy</a>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("footer.copyright")}</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {t("footer.builtBy")}
              {" · "}
              <a href="https://www.linkedin.com/in/alessandropalazzesi" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-gray-600 dark:hover:text-gray-300">LinkedIn</a>
              {" · "}
              <a href="https://github.com/AlexPalaz" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-gray-600 dark:hover:text-gray-300">GitHub</a>
            </p>
          </div>
        </div>
      </footer>
      <Script src="https://cdn.iubenda.com/iubenda.js" strategy="lazyOnload" />
    </main>
  );
}
