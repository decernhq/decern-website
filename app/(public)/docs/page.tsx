import type { Metadata } from "next";
import { DocsNav, type DocSection } from "@/components/docs/docs-nav";
import { appPath } from "@/lib/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to set up Decern: bootstrap ADRs, configure CI gate, signal detection, evidence chain, dashboard lifecycle, and self-hosted deployment.",
};

const SECTIONS: DocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "quick-start", label: "Quick Start" },
  { id: "adr-format", label: "ADR Format" },
  { id: "writing-adrs", label: "Writing Good ADRs" },
  { id: "bootstrap", label: "Bootstrap (decern init)" },
  { id: "ci-gate", label: "CI Gate Setup" },
  { id: "evaluation", label: "How Evaluation Works" },
  { id: "signals", label: "Signal Detection" },
  { id: "lifecycle", label: "ADR Lifecycle" },
  { id: "override", label: "Override & Escape Hatches" },
  { id: "multi-repo", label: "Multi-Repo" },
  { id: "dashboard", label: "Dashboard" },
  { id: "evidence", label: "Evidence Chain" },
  { id: "models", label: "Recommended Models" },
  { id: "troubleshooting", label: "Troubleshooting & FAQ" },
  { id: "self-hosted", label: "Self-Hosted" },
  { id: "plans", label: "Plans" },
];

const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {children}
  </h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-[0.935rem] leading-relaxed text-gray-600 dark:text-gray-300">{children}</p>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.84rem] font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200">
    {children}
  </code>
);

const Pre = ({ children, title }: { children: string; title?: string }) => (
  <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
    {title && (
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
        {title}
      </div>
    )}
    <pre className="overflow-x-auto bg-gray-50 p-4 text-[0.82rem] leading-relaxed text-gray-800 dark:bg-gray-900/50 dark:text-gray-200">
      {children}
    </pre>
  </div>
);

const Callout = ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "tip" }) => {
  const styles = {
    info: "border-brand-300 bg-brand-50/50 text-brand-900 dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-200",
    warn: "border-amber-300 bg-amber-50/50 text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200",
    tip: "border-emerald-300 bg-emerald-50/50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200",
  };
  const icons = { info: "ℹ", warn: "⚠", tip: "✓" };
  return (
    <div className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed ${styles[type]}`}>
      <span className="mr-1.5 font-bold">{icons[type]}</span>
      {children}
    </div>
  );
};

const EnvTable = ({ rows }: { rows: { name: string; required: boolean; desc: string }[] }) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
    <table className="w-full text-left text-sm">
      <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
        <tr>
          <th className="px-4 py-2.5">Variable</th>
          <th className="px-4 py-2.5">Required</th>
          <th className="px-4 py-2.5">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
        {rows.map((r) => (
          <tr key={r.name}>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-gray-800 dark:text-gray-200">{r.name}</td>
            <td className="px-4 py-2.5 text-xs">{r.required ? <span className="font-semibold text-red-600 dark:text-red-400">Yes</span> : "No"}</td>
            <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function DocsPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-12 lg:py-16">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        <DocsNav sections={SECTIONS} />

        <article className="docs-prose min-w-0 max-w-3xl">

          {/* ─── Overview ─── */}
          <section id="overview" className="docs-section">
            <SectionTitle id="overview">Overview</SectionTitle>
            <P>
              Decern exists because the tech lead can{"'"}t review every PR anymore — especially when half of them are written by AI. Copilot, Cursor, and Claude Code write code fast, but they don{"'"}t know what your team decided last quarter about database access patterns, or why you deprecated that caching layer, or which dependencies are approved.
            </P>
            <P>
              <strong>Decern turns your team{"'"}s architecture decisions into rules the CI enforces automatically</strong>, so you can stop being the architecture police. It reads your ADRs from the repo, evaluates every pull request against them using your own LLM, blocks what doesn{"'"}t fit, and surfaces new patterns for the tech lead to formalize.
            </P>
            <SubTitle>Three phases</SubTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { title: "1. Bootstrap", desc: "Run `decern init` to analyze your codebase and generate ADR drafts. Review, approve, and commit to /docs/adr/." },
                { title: "2. CI Gate", desc: "Add `decern gate` to your CI. Every PR is evaluated against ADRs. Violations on blocking ADRs fail the build." },
                { title: "3. Evolution", desc: "Signals surface new patterns. The tech lead generates draft ADRs from the dashboard. The repo stays the source of truth." },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="font-semibold text-gray-900 dark:text-white">{c.title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Quick Start ─── */}
          <section id="quick-start" className="docs-section mt-16">
            <SectionTitle id="quick-start">Quick Start</SectionTitle>
            <P>Get from zero to enforced ADRs in 5 minutes.</P>

            <SubTitle>1. Bootstrap ADRs</SubTitle>
            <Pre title="Terminal">{`export DECERN_LLM_BASE_URL=https://api.anthropic.com
export DECERN_LLM_API_KEY=sk-ant-...
export DECERN_LLM_MODEL=claude-sonnet-4-6

npx decern init`}</Pre>
            <P>
              Decern scans your codebase (directory tree, package.json, git history, README) and proposes 15-25 ADR drafts. You review each one interactively: <Code>[A]pprove</Code> / <Code>[S]kip</Code> / <Code>[Q]uit</Code>. Approved ADRs are written to <Code>docs/adr/</Code>.
            </P>

            <SubTitle>2. Commit and push</SubTitle>
            <Pre title="Terminal">{`git add docs/adr/
git commit -m "docs: bootstrap architecture decisions"
git push`}</Pre>

            <SubTitle>3. Add the gate to CI</SubTitle>
            <Pre title=".github/workflows/decern.yml">{`name: Decern Gate
on: [pull_request]
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Decern gate
        run: npx decern gate
        env:
          DECERN_LLM_BASE_URL: \${{ secrets.DECERN_LLM_BASE_URL }}
          DECERN_LLM_API_KEY: \${{ secrets.DECERN_LLM_API_KEY }}
          DECERN_LLM_MODEL: \${{ secrets.DECERN_LLM_MODEL }}
          DECERN_BASE_URL: \${{ secrets.DECERN_BASE_URL }}
          DECERN_CI_TOKEN: \${{ secrets.DECERN_CI_TOKEN }}
          CI_PR_URL: \${{ github.event.pull_request.html_url }}`}</Pre>
            <Callout type="warn">
              <Code>fetch-depth: 0</Code> is required so git can compute the diff between base and head.
            </Callout>

            <SubTitle>4. Done</SubTitle>
            <P>Every PR is now evaluated against your ADRs. Violations on blocking ADRs fail the build. Warnings are logged. Signals are reported to the dashboard.</P>
          </section>

          {/* ─── ADR Format ─── */}
          <section id="adr-format" className="docs-section mt-16">
            <SectionTitle id="adr-format">ADR Format</SectionTitle>
            <P>ADRs are markdown files in <Code>docs/adr/</Code> with YAML frontmatter and three sections.</P>

            <Pre title="docs/adr/adr-007-use-postgres.md">{`---
id: ADR-007
title: Use PostgreSQL for persistence
status: approved
enforcement: blocking
scope:
  - src/db/**
  - migrations/**
supersedes: null
date: 2026-04-10
---

## Context
The team evaluated PostgreSQL, MySQL, and MongoDB.
PostgreSQL was chosen for its JSONB support and transactional integrity.

## Decision
All persistent data storage uses PostgreSQL.
No other database engines are allowed in production.

## Consequences
- All team members must know SQL
- MongoDB skills are not leveraged
- JSONB provides flexibility without a separate document store`}</Pre>

            <SubTitle>Frontmatter fields</SubTitle>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr><th className="px-4 py-2.5">Field</th><th className="px-4 py-2.5">Values</th><th className="px-4 py-2.5">Description</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-mono text-xs">id</td><td className="px-4 py-2.5 text-xs">ADR-NNN</td><td className="px-4 py-2.5">Unique identifier</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">title</td><td className="px-4 py-2.5 text-xs">Free text</td><td className="px-4 py-2.5">Concise, descriptive title</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">status</td><td className="px-4 py-2.5 text-xs">proposed | approved | superseded | rejected</td><td className="px-4 py-2.5">Only <Code>approved</Code> ADRs are enforced by the gate</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">enforcement</td><td className="px-4 py-2.5 text-xs">blocking | warning</td><td className="px-4 py-2.5"><Code>blocking</Code> fails CI on violation. <Code>warning</Code> logs but passes.</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">scope</td><td className="px-4 py-2.5 text-xs">Glob patterns</td><td className="px-4 py-2.5">Files this ADR applies to. Empty = all files. Supports <Code>*</Code>, <Code>**</Code>, <Code>?</Code></td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">supersedes</td><td className="px-4 py-2.5 text-xs">ADR-NNN | null</td><td className="px-4 py-2.5">Which ADR this one replaces</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">date</td><td className="px-4 py-2.5 text-xs">YYYY-MM-DD</td><td className="px-4 py-2.5">When the decision was made</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── Writing Good ADRs ─── */}
          <section id="writing-adrs" className="docs-section mt-16">
            <SectionTitle id="writing-adrs">Writing ADRs That Work With the Gate</SectionTitle>
            <P>
              The quality of the gate depends directly on the quality of your ADRs. A vague ADR produces vague verdicts. A precise ADR produces precise verdicts. This section is the difference between a gate that catches real violations and one that produces false positives until your team disables it.
            </P>

            <SubTitle>1. Decision must be specific and verifiable</SubTitle>
            <P>The LLM needs to answer a binary question: does this diff respect this decision, yes or no? If the decision is fuzzy, the LLM guesses.</P>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-800/50 dark:bg-red-900/10">
                <p className="text-xs font-semibold uppercase text-red-600 dark:text-red-400">Bad</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{'"'}Code should be readable and well-structured.{'"'}</p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/10">
                <p className="text-xs font-semibold uppercase text-green-600 dark:text-green-400">Good</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{'"'}All database queries go through the service layer in src/services/. No direct DB access from route handlers.{'"'}</p>
              </div>
            </div>

            <SubTitle>2. Scope must be specific</SubTitle>
            <P>Narrow scope = fewer files sent to the LLM = faster evaluation, lower cost, fewer false positives. An ADR with empty scope evaluates against every file in every PR.</P>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-800/50 dark:bg-red-900/10">
                <p className="text-xs font-semibold uppercase text-red-600 dark:text-red-400">Bad</p>
                <p className="mt-1 font-mono text-sm text-gray-700 dark:text-gray-300">scope: (empty)</p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/10">
                <p className="text-xs font-semibold uppercase text-green-600 dark:text-green-400">Good</p>
                <p className="mt-1 font-mono text-sm text-gray-700 dark:text-gray-300">scope: [src/api/**, src/routes/**]</p>
              </div>
            </div>

            <SubTitle>3. Context must explain the why</SubTitle>
            <P>
              Context is not just for humans — the LLM reads it too. A good Context section helps the LLM understand intent, which reduces false positives on edge cases. {'"'}We chose X because of Y{'"'} is more useful than {'"'}We use X.{'"'}
            </P>

            <SubTitle>4. Consequences must be honest</SubTitle>
            <P>
              Include trade-offs. This helps the LLM distinguish between {'"'}intentional deviation{'"'} (a known trade-off) and {'"'}violation{'"'} (something the team didn{"'"}t consider). It also helps future team members understand what they{"'"}re signing up for.
            </P>

            <SubTitle>5. Blocking vs Warning — the most important decision</SubTitle>
            <P>This is the choice that determines whether Decern helps or annoys your team.</P>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr><th className="px-4 py-2.5">Use blocking when...</th><th className="px-4 py-2.5">Use warning when...</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="px-4 py-2.5">The violation is clear-cut and binary (yes/no, not maybe)</td>
                    <td className="px-4 py-2.5">The violation is a judgment call or has legitimate exceptions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">A violation in production would be costly or hard to reverse</td>
                    <td className="px-4 py-2.5">A violation is a style preference or soft convention</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">The team has strong consensus (everyone agrees this is non-negotiable)</td>
                    <td className="px-4 py-2.5">The ADR is new and you{"'"}re still calibrating whether the gate catches it correctly</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5">The scope is narrow (less risk of false positives on unrelated code)</td>
                    <td className="px-4 py-2.5">The scope is broad or the decision is philosophical</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout type="tip">
              Start every ADR as <Code>warning</Code>. Observe the gate output for 1-2 weeks. When you{"'"}re confident it catches real violations without false positives, promote to <Code>blocking</Code>. This is the safe path.
            </Callout>

            <SubTitle>6. Anti-patterns to avoid</SubTitle>
            <ul className="mt-3 list-inside list-disc space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>ADRs about process, not code</strong>: {'"'}Every PR must be reviewed by 2 people{'"'} — the gate can{"'"}t see your GitHub review settings, only the diff.</li>
              <li><strong>ADRs that are always true</strong>: {'"'}We use TypeScript{'"'} for a TypeScript repo — every diff will pass, the ADR adds no value.</li>
              <li><strong>ADRs with overlapping scope</strong>: Two ADRs both covering <Code>src/**</Code> with conflicting decisions confuse the LLM.</li>
              <li><strong>Too many blocking ADRs too early</strong>: Start with 2-3 blocking ADRs. Add more as confidence grows.</li>
            </ul>
          </section>

          {/* ─── Bootstrap ─── */}
          <section id="bootstrap" className="docs-section mt-16">
            <SectionTitle id="bootstrap">Bootstrap (<Code>decern init</Code>)</SectionTitle>
            <P>
              The bootstrap command analyzes your codebase and proposes ADR drafts for decisions the team has implicitly made but never written down. It looks at: directory structure, package manifests, git history, README, and key entry point files.
            </P>
            <P>
              All proposed ADRs have <Code>status: approved</Code> and <Code>enforcement: warning</Code>. The tech lead promotes specific ADRs to <Code>blocking</Code> after review.
            </P>
            <EnvTable rows={[
              { name: "DECERN_LLM_BASE_URL", required: true, desc: "LLM API base URL" },
              { name: "DECERN_LLM_API_KEY", required: true, desc: "LLM API key" },
              { name: "DECERN_LLM_MODEL", required: true, desc: "Model ID (e.g. claude-sonnet-4-6)" },
              { name: "DECERN_ADR_DIR", required: false, desc: "ADR directory (default: docs/adr)" },
            ]} />
            <Callout type="tip">
              After bootstrap, run <Code>decern adr sync</Code> to push the ADR index to the dashboard (if cloud is configured). Or just add the gate to CI — it syncs automatically on the next PR.
            </Callout>
          </section>

          {/* ─── CI Gate ─── */}
          <section id="ci-gate" className="docs-section mt-16">
            <SectionTitle id="ci-gate">CI Gate Setup</SectionTitle>
            <P>
              The gate runs on every pull request and evaluates the diff against your approved ADRs. It requires a BYO LLM (you provide the API key) and optionally reports results to the Decern cloud dashboard.
            </P>

            <SubTitle>Environment variables</SubTitle>
            <EnvTable rows={[
              { name: "DECERN_LLM_BASE_URL", required: true, desc: "LLM API base URL (e.g. https://api.anthropic.com or https://api.openai.com/v1)" },
              { name: "DECERN_LLM_API_KEY", required: true, desc: "LLM API key" },
              { name: "DECERN_LLM_MODEL", required: true, desc: "Model ID. See Recommended Models section." },
              { name: "DECERN_ADR_DIR", required: false, desc: "ADR directory (default: docs/adr)" },
              { name: "DECERN_BASE_URL", required: false, desc: "Decern cloud URL. Enables evidence reporting and PR comments." },
              { name: "DECERN_CI_TOKEN", required: false, desc: "Workspace CI token. Required if DECERN_BASE_URL is set." },
              { name: "DECERN_CONFIDENCE_THRESHOLD", required: false, desc: "Minimum confidence to block (0-1, default: 0.75). Violations below this are degraded to warnings." },
              { name: "DECERN_EVAL_CONCURRENCY", required: false, desc: "Max parallel LLM calls (default: 3)" },
              { name: "CI_BASE_SHA", required: false, desc: "Base commit SHA. Auto-detected from origin/main if not set." },
              { name: "CI_HEAD_SHA", required: false, desc: "Head commit SHA. Auto-detected as HEAD if not set." },
              { name: "CI_PR_URL", required: false, desc: "PR URL. Enables PR violation comments and nudges." },
              { name: "CI_PR_TITLE", required: false, desc: "PR title. Included in evidence record." },
            ]} />

            <SubTitle>GitHub Actions</SubTitle>
            <Pre title=".github/workflows/decern.yml">{`name: Decern Gate
on: [pull_request]
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Decern gate
        run: npx decern gate
        env:
          DECERN_LLM_BASE_URL: \${{ secrets.DECERN_LLM_BASE_URL }}
          DECERN_LLM_API_KEY: \${{ secrets.DECERN_LLM_API_KEY }}
          DECERN_LLM_MODEL: \${{ secrets.DECERN_LLM_MODEL }}
          DECERN_BASE_URL: \${{ secrets.DECERN_BASE_URL }}
          DECERN_CI_TOKEN: \${{ secrets.DECERN_CI_TOKEN }}
          CI_PR_URL: \${{ github.event.pull_request.html_url }}`}</Pre>

            <SubTitle>GitLab CI</SubTitle>
            <Pre title=".gitlab-ci.yml">{`decern-gate:
  image: node:20
  stage: test
  script:
    - npx decern gate
  variables:
    DECERN_LLM_BASE_URL: \$DECERN_LLM_BASE_URL
    DECERN_LLM_API_KEY: \$DECERN_LLM_API_KEY
    DECERN_LLM_MODEL: \$DECERN_LLM_MODEL
    DECERN_BASE_URL: \$DECERN_BASE_URL
    DECERN_CI_TOKEN: \$DECERN_CI_TOKEN
  only:
    - merge_requests`}</Pre>

            <SubTitle>Bitbucket Pipelines</SubTitle>
            <Pre title="bitbucket-pipelines.yml">{`pipelines:
  pull-requests:
    '**':
      - step:
          name: Decern Gate
          image: node:20
          script:
            - npx decern gate`}</Pre>

            <SubTitle>Jenkins</SubTitle>
            <Pre title="Jenkinsfile">{`pipeline {
  agent { docker { image 'node:20' } }
  stages {
    stage('Decern Gate') {
      steps {
        sh 'npx decern gate'
      }
    }
  }
}`}</Pre>

            <SubTitle>Azure DevOps</SubTitle>
            <Pre title="azure-pipelines.yml">{`trigger: none
pr:
  branches:
    include: ['*']
pool:
  vmImage: 'ubuntu-latest'
steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
  - script: npx decern gate
    displayName: Decern Gate
    env:
      DECERN_LLM_BASE_URL: $(DECERN_LLM_BASE_URL)
      DECERN_LLM_API_KEY: $(DECERN_LLM_API_KEY)
      DECERN_LLM_MODEL: $(DECERN_LLM_MODEL)`}</Pre>
          </section>

          {/* ─── Evaluation ─── */}
          <section id="evaluation" className="docs-section mt-16">
            <SectionTitle id="evaluation">How Evaluation Works</SectionTitle>

            <SubTitle>Step by step</SubTitle>
            <P>For each PR, the gate:</P>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Reads approved ADRs from <Code>docs/adr/*.md</Code></li>
              <li>Computes the diff (<Code>git diff base...head</Code>)</li>
              <li><strong>Scope pre-filter</strong>: skips ADRs whose glob patterns don{"'"}t match any changed file (zero LLM cost)</li>
              <li><strong>Scope-filtered diff</strong>: for each relevant ADR, sends only the diff hunks for matching files (not the full diff)</li>
              <li><strong>LLM evaluation</strong>: concurrent calls (configurable, default 3) asking the LLM: does this diff respect, violate, or is unrelated to this ADR? Plus a confidence score (0-1).</li>
              <li><strong>Confidence threshold</strong>: violations with confidence below threshold (default 0.75) are degraded from blocking to warning</li>
              <li><strong>Signal detection</strong>: in parallel, a separate LLM call scans for new patterns not covered by any ADR (1-3 signals max)</li>
            </ol>

            <SubTitle>Verdict types</SubTitle>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr><th className="px-4 py-2.5">Result</th><th className="px-4 py-2.5">Blocks CI?</th><th className="px-4 py-2.5">Description</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-mono text-xs">pass</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">Diff respects the ADR</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">violation + blocking + high confidence</td><td className="px-4 py-2.5 font-semibold text-red-600">Yes</td><td className="px-4 py-2.5">Clear violation, CI fails</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">violation + blocking + low confidence</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">Ambiguous, degraded to warning</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">violation + warning</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">Advisory only, logged</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">unrelated</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">ADR not relevant to this diff</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">skipped</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">Scope pre-filter, no LLM call</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">error</td><td className="px-4 py-2.5">No</td><td className="px-4 py-2.5">LLM failure, fail-open with warning</td></tr>
                </tbody>
              </table>
            </div>

            <SubTitle>LLM cost</SubTitle>
            <P>
              <Code>N</Code> = ADRs that pass scope filter. Total LLM calls = <Code>N + 1</Code> (N evaluations + 1 signal detection). Skipped ADRs cost nothing. With 15 ADRs and 4 matching scope, you make 5 LLM calls per PR.
            </P>

            <SubTitle>Diff truncation</SubTitle>
            <P>
              Diffs are capped at 2MB total (100K chars per ADR evaluation, 80K for signal detection). When truncated, the gate logs: {'"'}Note: the diff was truncated for analysis. Some changes may not have been evaluated.{'"'}
            </P>
          </section>

          {/* ─── Signals ─── */}
          <section id="signals" className="docs-section mt-16">
            <SectionTitle id="signals">Signal Detection</SectionTitle>
            <P>
              Every PR is scanned for new architectural patterns not covered by any existing ADR. This runs in parallel with ADR evaluation — a PR can pass ADR-007, violate ADR-012, AND generate a signal for a new caching pattern, all at the same time.
            </P>
            <P>
              The LLM receives the diff, the list of existing ADR titles + decision summaries, and is asked: {'"'}does this diff introduce something architecturally significant not covered by the existing ADRs?{'"'} It returns 0-3 signals.
            </P>
            <SubTitle>What counts as a signal</SubTitle>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>New external dependency (library, framework, service)</li>
              <li>New structural pattern (layer, abstraction boundary, module system)</li>
              <li>New technology (first gRPC, first message queue, first IaC)</li>
              <li>New convention not covered by existing ADRs</li>
            </ul>
            <SubTitle>What does NOT count</SubTitle>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Bug fixes, refactors, renames, style changes</li>
              <li>Patch version updates</li>
              <li>Tests, docs, comments</li>
              <li>Routine feature work following existing patterns</li>
            </ul>

            <SubTitle>Dashboard flow</SubTitle>
            <P>
              Signals appear in the Signals page grouped by repo. The tech lead can:
            </P>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>Generate draft ADR</strong> (Enterprise) — cloud LLM creates a full ADR markdown from the signal(s)</li>
              <li><strong>Create PR</strong> (GitHub) — commits the ADR file to the repo via a PR</li>
              <li><strong>Copy markdown</strong> — for non-GitHub repos, copy and commit manually</li>
              <li><strong>Dismiss</strong> — mark as not a real architectural decision</li>
            </ul>
          </section>

          {/* ─── Lifecycle ─── */}
          <section id="lifecycle" className="docs-section mt-16">
            <SectionTitle id="lifecycle">ADR Lifecycle</SectionTitle>
            <P>
              ADRs follow a status flow. Only <Code>approved</Code> ADRs are enforced by the gate.
            </P>
            <Pre>{`proposed → approved → superseded
                ↘ rejected`}</Pre>

            <SubTitle>Lifecycle from the dashboard</SubTitle>
            <P>
              The ADR detail drawer shows contextual action buttons. Each action generates a markdown preview that you can edit, then either copy or create a PR (GitHub).
            </P>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr><th className="px-4 py-2.5">Current state</th><th className="px-4 py-2.5">Actions available</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-mono text-xs">proposed + warning</td><td className="px-4 py-2.5">Approve, Reject</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">approved + warning</td><td className="px-4 py-2.5">Promote to blocking, Supersede</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">approved + blocking</td><td className="px-4 py-2.5">Demote to warning, Supersede</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">superseded / rejected</td><td className="px-4 py-2.5">No actions (terminal states)</td></tr>
                </tbody>
              </table>
            </div>
            <Callout type="info">
              Every lifecycle action creates a PR on the repo. Nothing changes without a merge. The suggested branch name is shown in the preview.
            </Callout>
          </section>

          {/* ─── Override ─── */}
          <section id="override" className="docs-section mt-16">
            <SectionTitle id="override">Override &amp; Escape Hatches</SectionTitle>
            <P>
              Sometimes a developer needs to bypass a blocking ADR intentionally — a production hotfix on Friday evening, a one-time migration that temporarily violates a pattern, or an edge case the ADR didn{"'"}t anticipate. Decern supports this with a documented override workflow.
            </P>

            <SubTitle>How override works</SubTitle>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>The gate blocks the PR with a violation (exit code 1, CI fails)</li>
              <li>The developer or tech lead calls <Code>POST /api/override</Code> with the evidence ID and a <strong>mandatory reason</strong> (minimum 20 characters)</li>
              <li>Decern creates a new evidence record of type {'"'}override{'"'} linked to the original blocked record, containing who overrode, when, and why</li>
              <li>The original evidence record is updated with the override data</li>
              <li>The developer can re-run the gate or merge with a manual approval</li>
            </ol>

            <SubTitle>Override via API</SubTitle>
            <Pre title="curl">{`curl -X POST https://your-decern.app/api/override \\
  -H "Authorization: Bearer \$DECERN_CI_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "evidence_id": "01912345-...",
    "override_reason": "Production hotfix for payment processing bug. ADR-012 violation is intentional and will be reverted in follow-up PR #234."
  }'`}</Pre>

            <SubTitle>What gets recorded</SubTitle>
            <P>The override is part of the evidence chain. An auditor sees:</P>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>The original gate run (blocked, with ADR evaluation and confidence)</li>
              <li>The override record (who, when, reason)</li>
              <li>Both are hash-chained and signed — the override can{"'"}t be silently inserted after the fact</li>
            </ul>

            <Callout type="warn">
              The override reason is stored permanently in the evidence chain. Write it as if an auditor will read it in 6 months — because they might. {'"'}needed to deploy{'"'} is not enough. {'"'}Production hotfix for #123, ADR-012 violation intentional, revert in PR #234{'"'} is.
            </Callout>

            <SubTitle>Reducing the need for overrides</SubTitle>
            <P>If your team overrides the same ADR frequently, it{"'"}s a signal that the ADR needs updating — the decision may have changed, the scope may be too broad, or the enforcement should be <Code>warning</Code> instead of <Code>blocking</Code>. Check the drift report for patterns.</P>
          </section>

          {/* ─── Multi-Repo ─── */}
          <section id="multi-repo" className="docs-section mt-16">
            <SectionTitle id="multi-repo">Multi-Repo</SectionTitle>
            <P>
              A workspace can host multiple repos. Each repo has its own <Code>docs/adr/</Code> tree. ADRs are scoped per-repo — two repos can both have <Code>ADR-001</Code> without collision.
            </P>
            <P>
              Repos connect implicitly: any repo that presents the workspace{"'"}s CI token is associated with that workspace. No explicit {'"'}add repo{'"'} UI — the first gate run or ADR sync from a repo makes it appear.
            </P>
            <P>
              Repository identifier format: <Code>github.com/owner/repo</Code>, <Code>gitlab.com/group/project</Code>. Detected automatically from <Code>GITHUB_REPOSITORY</Code> (in CI) or <Code>git remote.origin.url</Code> (local).
            </P>
          </section>

          {/* ─── Dashboard ─── */}
          <section id="dashboard" className="docs-section mt-16">
            <SectionTitle id="dashboard">Dashboard</SectionTitle>
            <SubTitle>ADRs</SubTitle>
            <P>
              View all ADRs across repos. Collapsible accordion per repo with search bar. Each repo header shows counts (total, blocking, proposed) and a Sync button (GitHub repos). Click an ADR to open the detail drawer with full body, lifecycle actions, and raw markdown.
            </P>
            <SubTitle>Signals</SubTitle>
            <P>
              New architectural decisions detected in PRs. Grouped by repo. Generate draft ADR (Enterprise), create PR, or dismiss. Resolved signals (formalized or dismissed) shown at the bottom.
            </P>
            <SubTitle>Gate Runs</SubTitle>
            <P>
              Evidence records from CI. Stats (total, passed, warned, blocked) for the current month. Table with verdict badges, PR link, repo, and a detail modal showing commit SHA, CI provider, author, ADRs evaluated, and files changed.
            </P>
            <SubTitle>Workspace</SubTitle>
            <P>
              CI token management (generate, revoke). Evidence retention policy (days). Member management (invite, roles). Signing key warning if not configured.
            </P>
          </section>

          {/* ─── Evidence ─── */}
          <section id="evidence" className="docs-section mt-16">
            <SectionTitle id="evidence">Evidence Chain</SectionTitle>
            <P>
              Every gate run produces an immutable evidence record with:
            </P>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>All ADRs evaluated, each verdict with confidence score, enforcement level, and reason</li>
              <li>Diff hash (SHA-256) and files touched</li>
              <li>Author identity from CI metadata</li>
              <li>Timestamp with microsecond precision</li>
              <li>Hash chain: each record{"'"}s <Code>previous_evidence_hash</Code> points to the preceding record</li>
              <li>Ed25519 signature (algorithm, key_id, value)</li>
            </ul>

            <SubTitle>Export</SubTitle>
            <P>
              <Code>GET /api/evidence/export?from=...&amp;to=...</Code> returns a JSON bundle containing records, access logs, chain tip, manifest, and public keys. The manifest includes <Code>signing_key_type: {'"'}persistent{'"'} | {'"'}ephemeral{'"'}</Code> so auditors can verify integrity.
            </P>

            <SubTitle>Verification</SubTitle>
            <Pre title="Terminal">{`npx decern verify-evidence evidence-export.json`}</Pre>
            <P>Verifies hash chain continuity and Ed25519 signatures offline.</P>

            <SubTitle>Signing key</SubTitle>
            <P>Generate a persistent Ed25519 signing key:</P>
            <Pre title="Terminal">{`node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`}</Pre>
            <P>Add to your environment:</P>
            <Pre>{`DECERN_EVIDENCE_SIGNING_KEY=K7x2mFp3Q1nR8vYb...==`}</Pre>
            <Callout type="warn">
              Without this key, evidence is signed with an ephemeral key that changes on server restart. Signatures will not be verifiable across restarts. The dashboard shows a warning banner when the key is not configured.
            </Callout>
          </section>

          {/* ─── Models ─── */}
          <section id="models" className="docs-section mt-16">
            <SectionTitle id="models">Recommended Models</SectionTitle>
            <P>
              The gate quality depends directly on the LLM. Tested and recommended for production:
            </P>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><Code>claude-sonnet-4-6</Code>, <Code>claude-opus-4-6</Code> (Anthropic)</li>
              <li><Code>gpt-4o</Code>, <Code>gpt-4.1</Code>, <Code>gpt-5</Code> (OpenAI)</li>
              <li><Code>gemini-2.5-pro</Code> (Google)</li>
            </ul>
            <P>
              Smaller models (<Code>gpt-4o-mini</Code>, <Code>claude-haiku</Code>) work but produce significantly more false negatives — violations that the model misses. A runtime warning is logged in CI when using a non-recommended model.
            </P>
            <Callout type="info">
              The LLM is BYO (Bring Your Own). You provide the API key, Decern calls the API per-request. Keys stay in your CI environment, never stored by Decern.
            </Callout>
          </section>

          {/* ─── Troubleshooting ─── */}
          <section id="troubleshooting" className="docs-section mt-16">
            <SectionTitle id="troubleshooting">Troubleshooting &amp; FAQ</SectionTitle>

            <SubTitle>The gate is slow (30+ seconds)</SubTitle>
            <P>
              Each ADR that passes scope filter = one LLM call. With 10 matching ADRs at 3 concurrent (default), that{"'"}s 4 rounds of calls. Solutions: (1) Tighten scope patterns so fewer ADRs match per PR. (2) Increase <Code>DECERN_EVAL_CONCURRENCY</Code> to 5 (watch for LLM rate limits). (3) Use a faster model.
            </P>

            <SubTitle>I see {'"'}error{'"'} verdicts in gate runs</SubTitle>
            <P>
              An <Code>error</Code> verdict means the LLM call failed (timeout, rate limit, malformed response). The gate treats errors as fail-open: the PR passes, but the error is logged. If you see many errors: check your LLM API key, rate limits, and model availability. The CI log shows the exact error message for each failed evaluation.
            </P>

            <SubTitle>Too many false positives (blocking on things that aren{"'"}t violations)</SubTitle>
            <P>Ranked by impact:</P>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>Check the ADR</strong>: is the Decision section specific and verifiable? Vague ADRs produce vague verdicts.</li>
              <li><strong>Tighten the scope</strong>: a broad scope means the ADR evaluates diffs it shouldn{"'"}t care about.</li>
              <li><strong>Lower the confidence threshold</strong>: set <Code>DECERN_CONFIDENCE_THRESHOLD=0.85</Code> to only block high-confidence violations.</li>
              <li><strong>Upgrade the model</strong>: smaller models produce more false positives. Check the Recommended Models section.</li>
              <li><strong>Demote to warning</strong>: if the ADR is consistently problematic, switch from <Code>blocking</Code> to <Code>warning</Code> while you calibrate.</li>
            </ol>

            <SubTitle>The LLM provider is down — does the gate block all PRs?</SubTitle>
            <P>
              No. LLM failures are fail-open: the verdict is <Code>error</Code> (not <Code>violation</Code>), the PR passes, and the gate logs a warning. Your CI is never blocked by an LLM outage.
            </P>

            <SubTitle>How do I handle very large diffs (1000+ lines)?</SubTitle>
            <P>
              The gate sends a scope-filtered diff per ADR (only hunks matching the ADR{"'"}s scope, not the full diff). For most PRs this keeps the payload small. If the total diff exceeds 2MB, it{"'"}s truncated with a logged warning. For very large PRs, consider splitting into smaller PRs — this is good practice regardless of Decern.
            </P>

            <SubTitle>Can I run the gate locally before pushing?</SubTitle>
            <P>
              Yes. From your repo root:
            </P>
            <Pre title="Terminal">{`export DECERN_LLM_BASE_URL=https://api.anthropic.com
export DECERN_LLM_API_KEY=sk-ant-...
export DECERN_LLM_MODEL=claude-sonnet-4-6
npx decern gate`}</Pre>
            <P>
              It uses <Code>origin/main...HEAD</Code> as the diff range. Useful for testing before opening a PR.
            </P>

            <SubTitle>What happens if I have no ADRs?</SubTitle>
            <P>
              The gate passes immediately: {'"'}No approved ADRs found. Gate passes (nothing to enforce).{'"'} Signal detection also doesn{"'"}t run. Run <Code>decern init</Code> to bootstrap.
            </P>

            <SubTitle>Can two repos in the same workspace have the same ADR ID?</SubTitle>
            <P>
              Yes. ADRs are scoped per-repo. <Code>ADR-001</Code> in <Code>github.com/acme/api</Code> and <Code>ADR-001</Code> in <Code>github.com/acme/web</Code> are independent records in the dashboard.
            </P>

            <SubTitle>How do I remove an ADR?</SubTitle>
            <P>
              Delete the file from <Code>docs/adr/</Code> and commit. On the next sync (or gate run with cloud reporting), the ADR disappears from the dashboard. Alternatively, set <Code>status: rejected</Code> to keep the record but stop enforcement.
            </P>

            <SubTitle>Does Decern store my code?</SubTitle>
            <P>
              No. The gate runs in your CI and sends the LLM call directly to your BYO provider. The cloud receives only: verdict, confidence, ADR IDs evaluated, diff hash (not the diff itself), file paths, and author metadata. Your code never passes through Decern servers.
            </P>
          </section>

          {/* ─── Self-Hosted ─── */}
          <section id="self-hosted" className="docs-section mt-16">
            <SectionTitle id="self-hosted">Self-Hosted</SectionTitle>
            <P>
              Enterprise customers can deploy Decern on their own infrastructure (VPC, air-gapped). The gate CLI runs in your CI as always. The dashboard and cloud API run on your servers.
            </P>

            <SubTitle>Requirements</SubTitle>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Node.js 20+</li>
              <li>PostgreSQL 15+ (Supabase or standalone)</li>
              <li>BYO LLM endpoint accessible from CI</li>
            </ul>

            <SubTitle>Key environment variables</SubTitle>
            <EnvTable rows={[
              { name: "NEXT_PUBLIC_SUPABASE_URL", required: true, desc: "Supabase project URL" },
              { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true, desc: "Supabase anon key" },
              { name: "SUPABASE_SERVICE_ROLE_KEY", required: true, desc: "Supabase service role key" },
              { name: "DECERN_EVIDENCE_SIGNING_KEY", required: true, desc: "Ed25519 seed (32 bytes, base64) for persistent evidence signatures" },
              { name: "CLOUD_LLM_API_KEY", required: false, desc: "Anthropic key for draft ADR generation (Enterprise feature)" },
              { name: "CLOUD_LLM_MODEL", required: false, desc: "Model for draft generation (default: claude-sonnet-4-6)" },
              { name: "CRON_SECRET", required: false, desc: "Bearer token for cron endpoints (evidence archival)" },
            ]} />
            <Callout type="warn">
              No data leaves your infrastructure unless you configure an external LLM endpoint. The gate CLI calls the LLM directly from CI; the cloud dashboard calls the LLM only for Enterprise draft generation.
            </Callout>
          </section>

          {/* ─── Plans ─── */}
          <section id="plans" className="docs-section mt-16">
            <SectionTitle id="plans">Plans</SectionTitle>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr><th className="px-4 py-2.5">Feature</th><th className="px-4 py-2.5">Free</th><th className="px-4 py-2.5">Enterprise</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5">Workspaces</td><td className="px-4 py-2.5">1</td><td className="px-4 py-2.5">Unlimited</td></tr>
                  <tr><td className="px-4 py-2.5">Developers</td><td className="px-4 py-2.5">3</td><td className="px-4 py-2.5">Unlimited</td></tr>
                  <tr><td className="px-4 py-2.5">ADRs + gate runs</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">Unlimited</td></tr>
                  <tr><td className="px-4 py-2.5">CI blocking</td><td className="px-4 py-2.5">Yes</td><td className="px-4 py-2.5">Yes</td></tr>
                  <tr><td className="px-4 py-2.5">Signal detection</td><td className="px-4 py-2.5">Yes</td><td className="px-4 py-2.5">Yes</td></tr>
                  <tr><td className="px-4 py-2.5">Evidence chain + export</td><td className="px-4 py-2.5">Yes</td><td className="px-4 py-2.5">Yes</td></tr>
                  <tr><td className="px-4 py-2.5">Draft ADR from signals</td><td className="px-4 py-2.5 text-gray-400">No</td><td className="px-4 py-2.5">Cloud LLM</td></tr>
                  <tr><td className="px-4 py-2.5">Create PR from dashboard</td><td className="px-4 py-2.5 text-gray-400">No</td><td className="px-4 py-2.5">GitHub</td></tr>
                  <tr><td className="px-4 py-2.5">Self-hosted</td><td className="px-4 py-2.5 text-gray-400">No</td><td className="px-4 py-2.5">VPC / air-gapped</td></tr>
                  <tr><td className="px-4 py-2.5">SSO</td><td className="px-4 py-2.5 text-gray-400">No</td><td className="px-4 py-2.5">SAML, OIDC</td></tr>
                  <tr><td className="px-4 py-2.5">Support</td><td className="px-4 py-2.5">Community</td><td className="px-4 py-2.5">Dedicated with SLA</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex gap-4">
              <a href={appPath("/signup")}>
                <Button>Start free</Button>
              </a>
              <Link href="/pricing">
                <Button variant="outline">See pricing</Button>
              </Link>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
