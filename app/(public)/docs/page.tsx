import { DocsNav, type DocSection } from "@/components/docs/docs-nav";
import { appPath } from "@/lib/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SECTIONS: DocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "getting-started", label: "Getting Started" },
  { id: "workspaces", label: "Workspaces" },
  { id: "projects", label: "Projects" },
  { id: "decisions", label: "Decisions" },
  { id: "ci-integration", label: "CI Integration" },
  { id: "decision-gate", label: "Decision Gate" },
  { id: "judge", label: "LLM Judge" },
  { id: "roles", label: "Roles & Permissions", business: true },
  { id: "policies", label: "Policies" },
  { id: "github-sync", label: "GitHub Sync" },
  { id: "self-hosted", label: "Self Hosted" },
];

/* ── tiny helpers ── */
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

const BusinessBadge = () => (
  <span className="ml-2 inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
    Business
  </span>
);

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

/* ── page ── */
export default function DocsPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-12 lg:py-16">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Sidebar */}
        <DocsNav sections={SECTIONS} />

        {/* Content */}
        <article className="docs-prose min-w-0 max-w-3xl">
          {/* ─── Overview ─── */}
          <section id="overview" className="docs-section">
            <SectionTitle id="overview">Overview</SectionTitle>
            <P>
              <strong>Decern</strong> is the decision register for engineering teams.
              It helps you document, share and enforce architectural decisions (ADRs)
              across your entire software delivery lifecycle.
            </P>
            <P>
              Every significant technical choice, from database migrations to infrastructure changes,
              gets recorded as a <em>decision</em>. Decisions flow through a clear lifecycle
              (<Code>proposed</Code> → <Code>approved</Code> → <Code>superseded</Code> / <Code>rejected</Code>)
              and can be enforced automatically in your CI/CD pipeline via <strong>Decision Gate</strong>.
            </P>

            <SubTitle>How Decern fits your workflow</SubTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Document", desc: "Record context, options, outcome, and consequences for every architectural choice." },
                { title: "Collaborate", desc: "Team members propose decisions; approvers review and approve them inside the workspace." },
                { title: "Enforce", desc: "Decision Gate blocks high-impact CI changes (migrations, Dockerfiles, lockfiles) that lack an approved decision." },
                { title: "Judge", desc: "An optional LLM-as-a-Judge step verifies that the code diff actually aligns with the referenced decision." },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="font-semibold text-gray-900 dark:text-white">{c.title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
                </div>
              ))}
            </div>

            <SubTitle>Core components</SubTitle>
            <ul className="mt-3 space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>Decern App</strong> - the web dashboard where you manage workspaces, projects, decisions and team members.</li>
              <li><strong>Decision Gate</strong> (<Code>decern-gate</Code>) - a CLI you run in CI to enforce decision governance on high-impact changes.</li>
              <li><strong>Protocol</strong> (<Code>@decern/protocol</Code>) - a stateless TypeScript library with shared domain logic (ADR parsing, validation, policies).</li>
            </ul>
          </section>

          {/* ─── Getting Started ─── */}
          <section id="getting-started" className="docs-section">
            <SectionTitle id="getting-started">Getting Started</SectionTitle>
            <P>Get up and running in under five minutes.</P>

            <SubTitle>1. Create an account</SubTitle>
            <P>
              Sign up at <a href={appPath("/signup")} className="docs-link">app.decern.dev</a>.
              A default workspace is created automatically for you.
            </P>

            <SubTitle>2. Create your first project</SubTitle>
            <P>
              From the dashboard, go to <strong>Projects → New project</strong>.
              Give it a name (e.g. your repository name) and optionally link a GitHub repository
              to enable ADR sync.
            </P>

            <SubTitle>3. Record your first decision</SubTitle>
            <P>Open the project and click <strong>New decision</strong>. Fill in:</P>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>Title</strong> - a short summary (e.g. &quot;Adopt PostgreSQL for user data&quot;).</li>
              <li><strong>Context</strong> - the problem or requirement that prompted this decision.</li>
              <li><strong>Options considered</strong> - the alternatives you evaluated.</li>
              <li><strong>Decision</strong> - what you chose and why.</li>
              <li><strong>Consequences</strong> - positive and negative impacts of this choice.</li>
            </ul>
            <P>
              The decision starts in <Code>proposed</Code> status. An approver can move it to <Code>approved</Code>.
            </P>

            <SubTitle>4. Connect your CI (optional)</SubTitle>
            <P>
              To enforce decisions on pull requests, install <Code>decern-gate</Code> in your pipeline.
              See the <a href="#ci-integration" className="docs-link">CI Integration</a> section below.
            </P>

            <Callout type="tip">
              On the <strong>Free</strong> plan you can create unlimited decisions, one workspace, and one project.
              Upgrade to <strong>Team</strong> or <strong>Business</strong> for unlimited projects and advanced features.
            </Callout>
          </section>

          {/* ─── Workspaces ─── */}
          <section id="workspaces" className="docs-section">
            <SectionTitle id="workspaces">Workspaces</SectionTitle>
            <P>
              A <strong>workspace</strong> is the top-level container where your team collaborates.
              It holds projects, decisions, members, and policies.
            </P>
            <P>
              When you sign up, a default workspace is automatically created. Depending on your plan
              you can create additional workspaces.
            </P>

            <SubTitle>Members</SubTitle>
            <P>
              Invite team members via email from <strong>Workspace → Members</strong>.
              Each member has a <em>workspace access role</em> (admin or member).
              On the Business plan, members also receive a <em>decision role</em>,
              see <a href="#roles" className="docs-link">Roles &amp; Permissions</a>.
            </P>

            <SubTitle>CI Token</SubTitle>
            <P>
              To use Decision Gate, the workspace owner generates a <strong>CI Token</strong> from
              <strong> Workspace → Token CI (Decision Gate)</strong>.
              The token is shown only once, store it in your CI secrets as <Code>DECERN_CI_TOKEN</Code>.
            </P>
            <Callout type="warn">
              Only the workspace owner can generate or revoke the CI token.
              If the token is compromised, revoke it and generate a new one immediately.
            </Callout>
          </section>

          {/* ─── Projects ─── */}
          <section id="projects" className="docs-section">
            <SectionTitle id="projects">Projects</SectionTitle>
            <P>
              Projects live inside a workspace and group related decisions together,
              usually one project per repository or service.
            </P>
            <P>
              When creating a project you can optionally link a <strong>GitHub repository</strong>.
              This enables:
            </P>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Two-way ADR sync - decisions are committed as markdown files in your repo.</li>
              <li>Pull request URLs are automatically linked to decisions.</li>
            </ul>

            <SubTitle>Plan limits</SubTitle>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2.5">Plan</th>
                    <th className="px-4 py-2.5">Workspaces</th>
                    <th className="px-4 py-2.5">Projects</th>
                    <th className="px-4 py-2.5">Members</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-medium">Free</td><td className="px-4 py-2.5">1</td><td className="px-4 py-2.5">1</td><td className="px-4 py-2.5">1</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">Team</td><td className="px-4 py-2.5">1</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">10</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">Business</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">20</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">Self Hosted</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">Unlimited</td><td className="px-4 py-2.5">Unlimited</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── Decisions ─── */}
          <section id="decisions" className="docs-section">
            <SectionTitle id="decisions">Decisions</SectionTitle>
            <P>
              Decisions are the core entity of Decern. Each decision is an <strong>Architectural Decision Record (ADR)</strong> that
              captures the context, options, outcome, and consequences of a technical choice.
            </P>

            <SubTitle>Decision fields</SubTitle>
            <ul className="mt-3 ml-5 list-disc space-y-1.5 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><strong>Title</strong> - short summary of the decision.</li>
              <li><strong>Status</strong> - <Code>proposed</Code>, <Code>approved</Code>, <Code>superseded</Code>, or <Code>rejected</Code>.</li>
              <li><strong>Context</strong> - the problem or requirement.</li>
              <li><strong>Options</strong> - alternatives considered (one per line).</li>
              <li><strong>Decision</strong> - what was chosen and why.</li>
              <li><strong>Consequences</strong> - positive and negative impacts.</li>
              <li><strong>Tags</strong> - free-form labels for categorization.</li>
              <li><strong>External links</strong> - references to RFCs, design docs, etc.</li>
              <li><strong>Pull request URLs</strong> - linked PRs implementing this decision.</li>
              <li><strong>ADR ref</strong> - an optional identifier like <Code>ADR-001</Code> used for GitHub sync and CI references.</li>
              <li><strong>Linked decision</strong> - reference to a superseded decision.</li>
            </ul>

            <SubTitle>Decision lifecycle</SubTitle>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              {["proposed", "approved", "superseded", "rejected"].map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 font-medium ${
                    s === "proposed" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                    s === "approved" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                    s === "superseded" ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" :
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}>{s}</span>
                  {i < 3 && <span className="text-gray-400 dark:text-gray-600">→</span>}
                </span>
              ))}
            </div>
            <P>
              A decision starts as <Code>proposed</Code>. Team members with the appropriate role can
              approve or reject it. An approved decision can later be <Code>superseded</Code> by a new
              one, and the old decision links to its replacement.
            </P>

            <SubTitle>AI generation</SubTitle>
            <P>
              Decern can generate a decision draft from a plain-text description using AI.
              Paste your thoughts and click <strong>Generate with AI</strong>, and the system produces
              a structured ADR you can review and edit before saving. This feature is available
              on all plans under fair-use limits.
            </P>

            <SubTitle>CSV export</SubTitle>
            <P>
              Export all decisions in a project as CSV from <strong>Project → Export</strong>.
              Useful for audits and offline review.
            </P>
          </section>

          {/* ─── CI Integration ─── */}
          <section id="ci-integration" className="docs-section">
            <SectionTitle id="ci-integration">CI Integration</SectionTitle>
            <P>
              Decern integrates into your CI/CD pipeline via <Code>decern-gate</Code>,
              a lightweight CLI that ensures high-impact changes are backed by an approved decision
              before they can be merged.
            </P>

            <SubTitle>Quick setup</SubTitle>
            <ol className="mt-3 ml-5 list-decimal space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Generate a <strong>CI token</strong> in your workspace settings (see <a href="#workspaces" className="docs-link">Workspaces</a>).</li>
              <li>Add <Code>DECERN_BASE_URL</Code> and <Code>DECERN_CI_TOKEN</Code> as secrets in your CI provider.</li>
              <li>Add the gate step to your pipeline (see examples below).</li>
            </ol>

            <SubTitle>GitHub Actions</SubTitle>
            <Pre title=".github/workflows/decern.yml">{`name: Decern Gate
on:
  pull_request:
    branches: [main]

jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Decern gate
        env:
          DECERN_BASE_URL: \${{ secrets.DECERN_BASE_URL }}
          DECERN_CI_TOKEN: \${{ secrets.DECERN_CI_TOKEN }}
          CI_BASE_SHA: \${{ github.event.pull_request.base.sha }}
          CI_HEAD_SHA: \${{ github.event.pull_request.head.sha }}
          CI_PR_TITLE: \${{ github.event.pull_request.title }}
          CI_PR_BODY: \${{ github.event.pull_request.body }}
        run: npx decern-gate`}</Pre>

            <SubTitle>GitLab CI</SubTitle>
            <Pre title=".gitlab-ci.yml">{`decern-gate:
  script:
    - export CI_BASE_SHA=$CI_MERGE_REQUEST_DIFF_BASE_SHA
    - export CI_HEAD_SHA=$CI_COMMIT_SHA
    - export CI_PR_TITLE="$CI_MERGE_REQUEST_TITLE"
    - export CI_PR_BODY="$CI_MERGE_REQUEST_DESCRIPTION"
    - npx decern-gate
  variables:
    DECERN_BASE_URL: $DECERN_BASE_URL
    DECERN_CI_TOKEN: $DECERN_CI_TOKEN`}</Pre>

            <SubTitle>Jenkins</SubTitle>
            <Pre title="Jenkinsfile (shell step)">{`export DECERN_BASE_URL="https://app.decern.dev"
export DECERN_CI_TOKEN="$(cat /run/secrets/decern_ci_token)"
export CI_BASE_SHA="\${GIT_PREVIOUS_COMMIT:-origin/main}"
export CI_HEAD_SHA="\${GIT_COMMIT}"
npx decern-gate`}</Pre>

            <SubTitle>How to reference a decision in your PR</SubTitle>
            <P>
              The gate extracts decision references from the PR title, body, or commit message.
              Use any of these formats:
            </P>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li><Code>decern:&lt;decision-id&gt;</Code> - e.g. <Code>decern:550e8400-...</Code></li>
              <li><Code>DECERN-&lt;id&gt;</Code> - e.g. <Code>DECERN-550e8400</Code></li>
              <li>A Decern URL containing <Code>/decisions/&lt;id&gt;</Code></li>
              <li>An ADR ref - e.g. <Code>ADR-001</Code></li>
            </ul>

            <Callout type="info">
              If no high-impact files are changed, the gate passes immediately, with no decision reference needed.
            </Callout>
          </section>

          {/* ─── Decision Gate ─── */}
          <section id="decision-gate" className="docs-section">
            <SectionTitle id="decision-gate">Decision Gate</SectionTitle>
            <P>
              Decision Gate is the core enforcement mechanism. When your PR touches files
              that match <strong>high-impact patterns</strong>, the gate requires a reference
              to an approved decision.
            </P>

            <SubTitle>High-impact file patterns</SubTitle>
            <P>The gate automatically detects changes to:</P>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { cat: "Database / Schema", examples: "migrations/, schema.prisma, alembic/, drizzle/" },
                { cat: "Infrastructure", examples: "Dockerfile, docker-compose.yml, terraform/, helm/, k8s/" },
                { cat: "CI/CD", examples: ".github/workflows/, .gitlab-ci.yml, Jenkinsfile" },
                { cat: "Dependencies", examples: "package.json, yarn.lock, go.mod, Cargo.lock, requirements.txt" },
                { cat: "Security / Auth", examples: "auth/, rbac/, CODEOWNERS, .snyk" },
                { cat: "API contracts", examples: "openapi.yaml, schema.graphql, proto/" },
                { cat: "Runtime config", examples: ".env, vercel.json, nginx.conf, fly.toml" },
                { cat: "Observability", examples: "prometheus/, grafana/, sentry.*.config.js" },
              ].map((c) => (
                <div key={c.cat} className="rounded-lg border border-gray-200 px-3.5 py-2.5 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.cat}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{c.examples}</p>
                </div>
              ))}
            </div>

            <SubTitle>Custom patterns</SubTitle>
            <P>
              Add extra patterns via the <Code>DECERN_GATE_EXTRA_PATTERNS</Code> environment variable.
              Comma-separated. Paths containing <Code>/</Code> match as substrings; otherwise they match the basename exactly.
            </P>
            <Pre>{`DECERN_GATE_EXTRA_PATTERNS=internal/config/,secret.conf`}</Pre>

            <SubTitle>Gate flow</SubTitle>
            <ol className="mt-3 ml-5 list-decimal space-y-1.5 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Compute changed files via <Code>git diff --name-only base...head</Code>.</li>
              <li>Check if any file matches a high-impact pattern.</li>
              <li>If yes, extract decision references from PR title/body/commit message.</li>
              <li>Call the <strong>validate</strong> endpoint to confirm the decision is approved.</li>
              <li>If the <a href="#judge" className="docs-link">LLM Judge</a> is enabled, run the judge step.</li>
              <li>Exit 0 (pass) or exit 1 (block).</li>
            </ol>

            <SubTitle>Plan behavior</SubTitle>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2.5">Plan</th>
                    <th className="px-4 py-2.5">Gate behavior</th>
                    <th className="px-4 py-2.5">Judge mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-medium">Free</td><td className="px-4 py-2.5">Warnings only (non-blocking)</td><td className="px-4 py-2.5">Advisory only</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">Team</td><td className="px-4 py-2.5">Blocking on high-impact</td><td className="px-4 py-2.5">Can block (configurable)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">Business</td><td className="px-4 py-2.5">Blocking + advanced policies</td><td className="px-4 py-2.5">Can block (configurable)</td></tr>
                </tbody>
              </table>
            </div>

            <SubTitle>Environment variables</SubTitle>
            <EnvTable rows={[
              { name: "DECERN_BASE_URL", required: true, desc: "Base URL of your Decern instance (no trailing slash)." },
              { name: "DECERN_CI_TOKEN", required: true, desc: "Workspace CI token (from Dashboard → Workspace)." },
              { name: "CI_BASE_SHA", required: false, desc: "Git base ref for diff. Falls back to origin/main...HEAD." },
              { name: "CI_HEAD_SHA", required: false, desc: "Git head ref for diff." },
              { name: "CI_PR_TITLE", required: false, desc: "PR title (used to extract decision refs)." },
              { name: "CI_PR_BODY", required: false, desc: "PR body (used to extract decision refs)." },
              { name: "CI_COMMIT_MESSAGE", required: false, desc: "Commit message (fallback if PR vars not set)." },
              { name: "DECERN_GATE_TIMEOUT_MS", required: false, desc: "Validate API timeout in ms (default: 5000)." },
              { name: "DECERN_GATE_EXTRA_PATTERNS", required: false, desc: "Comma-separated extra file patterns." },
            ]} />

            <Callout type="warn">
              The gate is <strong>fail-closed</strong>: network errors, timeouts, or 5xx responses cause exit 1. The CI token is never logged.
            </Callout>
          </section>

          {/* ─── LLM Judge ─── */}
          <section id="judge" className="docs-section">
            <SectionTitle id="judge">LLM Judge</SectionTitle>
            <P>
              The <strong>LLM-as-a-Judge</strong> is an optional step that runs after validation.
              It uses an LLM to verify that the actual code diff is consistent with the referenced decision.
            </P>

            <SubTitle>How it works</SubTitle>
            <ol className="mt-3 ml-5 list-decimal space-y-1.5 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>After validate passes, the CLI builds the full <Code>git diff</Code> (with exclusions and a 2 MB cap).</li>
              <li>Sends the diff + decision reference + your LLM config to the judge endpoint.</li>
              <li>The backend calls the LLM with the decision content and diff, asking if they align.</li>
              <li>Returns <Code>allowed: true/false</Code> with a confidence score and reason.</li>
            </ol>

            <SubTitle>BYO LLM</SubTitle>
            <P>
              The judge is <strong>Bring Your Own LLM</strong>. You provide the API credentials
              via environment variables, they are sent in the request body and <strong>never stored</strong>
              by the backend. Compatible with OpenAI and Anthropic APIs.
            </P>
            <EnvTable rows={[
              { name: "DECERN_GATE_JUDGE_ENABLED", required: true, desc: "Set to true or 1 to enable the judge step." },
              { name: "DECERN_JUDGE_LLM_BASE_URL", required: true, desc: "LLM API base URL (e.g. https://api.openai.com/v1)." },
              { name: "DECERN_JUDGE_LLM_API_KEY", required: true, desc: "LLM API key. Never stored or logged." },
              { name: "DECERN_JUDGE_LLM_MODEL", required: true, desc: "Model name (e.g. gpt-4o-mini, claude-sonnet-4-20250514)." },
              { name: "DECERN_JUDGE_MIN_CONFIDENCE", required: false, desc: "Min confidence threshold 0–1. Blocks if below." },
            ]} />

            <SubTitle>Diff exclusions</SubTitle>
            <P>Before sending, the CLI automatically excludes:</P>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Images and heavy assets (<Code>.png</Code>, <Code>.jpg</Code>, <Code>.gif</Code>, <Code>.svg</Code>, <Code>.pdf</Code>, <Code>.woff2</Code>, etc.)</li>
              <li>Single files larger than 1 MB</li>
              <li>Total diff capped at 2 MB (truncated with a flag)</li>
            </ul>

            <SubTitle>Advisory vs Blocking</SubTitle>
            <P>
              On the <strong>Free</strong> plan the judge is always <em>advisory</em>, it logs warnings but never blocks the pipeline.
              On <strong>Team</strong> and <strong>Business</strong>, the judge can block if the workspace policy &quot;Judge blocking&quot;
              is enabled (on by default). When the backend returns <Code>advisory: true</Code>, the CLI passes even if <Code>allowed: false</Code>.
            </P>

            <SubTitle>Confidence &amp; tolerance</SubTitle>
            <P>
              The judge returns a confidence score (0–1). You can set a minimum threshold via
              <Code> DECERN_JUDGE_MIN_CONFIDENCE</Code> - the gate blocks if the score is below, even when
              <Code> allowed: true</Code>. Workspace admins can also set a <em>judge tolerance</em> percentage
              in the workspace policies.
            </P>
          </section>

          {/* ─── Roles & Permissions (Business) ─── */}
          <section id="roles" className="docs-section">
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-6 dark:border-amber-800/50 dark:bg-amber-900/10">
              <div className="flex items-center gap-3">
                <SectionTitle id="roles">Roles &amp; Permissions</SectionTitle>
                <BusinessBadge />
              </div>
              <P>
                The roles system provides fine-grained control over who can do what inside your workspace.
                It is available on the <strong>Business</strong> and <strong>Self Hosted</strong> plans.
              </P>

              <SubTitle>Two-tier role model</SubTitle>
              <P>Every workspace member has two distinct roles:</P>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Workspace access role</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Controls administration capabilities</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <li><strong>Owner</strong> - full control, generates CI tokens, manages billing.</li>
                    <li><strong>Admin</strong> - can manage members, update workspace settings.</li>
                    <li><strong>Member</strong> - basic workspace access.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Decision role</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Controls the decision lifecycle</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <li><strong>Approver</strong> - can approve/reject decisions, plus edit.</li>
                    <li><strong>Contributor</strong> - can create and edit decisions (not approve).</li>
                    <li><strong>Viewer</strong> - read-only access to decisions.</li>
                  </ul>
                </div>
              </div>

              <SubTitle>How roles are enforced</SubTitle>
              <P>
                Roles are enforced at the database level through Row Level Security (RLS) policies.
                This means permissions are checked on every query, regardless of how the request reaches the database.
              </P>
              <ul className="mt-2 ml-5 list-disc space-y-1 text-[0.935rem] text-gray-600 dark:text-gray-300">
                <li><strong>Creating/editing</strong> decisions requires at least the <em>contributor</em> decision role.</li>
                <li><strong>Approving/rejecting</strong> decisions requires the <em>approver</em> decision role.</li>
                <li><strong>Managing members</strong> requires the <em>admin</em> workspace access role or being the owner.</li>
              </ul>

              <SubTitle>Assigning roles</SubTitle>
              <P>
                Roles are assigned when inviting a member or can be changed later from
                <strong> Workspace → Members</strong>. The workspace owner and admins can modify roles.
                When inviting, you select both the workspace access role and the decision role.
              </P>

              <Callout type="info">
                On plans without roles enabled (Free, Team), all members have full access to create,
                edit, and approve decisions. Roles become active when you upgrade to Business.
              </Callout>
            </div>
          </section>

          {/* ─── Policies ─── */}
          <section id="policies" className="docs-section">
            <SectionTitle id="policies">Policies</SectionTitle>
            <P>
              Workspace policies configure how Decision Gate behaves for your team.
              They are set in <strong>Workspace → Policies</strong> (Team+ plans).
            </P>

            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2.5">Policy</th>
                    <th className="px-4 py-2.5">Default</th>
                    <th className="px-4 py-2.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-2.5 font-mono text-xs">high_impact</td><td className="px-4 py-2.5">on</td><td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Enforce the gate on high-impact file changes.</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">require_approved</td><td className="px-4 py-2.5">on</td><td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">The referenced decision must have &quot;approved&quot; status.</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">require_linked_pr</td><td className="px-4 py-2.5">off</td><td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">The decision must have at least one linked PR URL.</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">judge_blocking</td><td className="px-4 py-2.5">on</td><td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">LLM Judge can block the pipeline (vs advisory only).</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">judge_tolerance_percent</td><td className="px-4 py-2.5">N/A</td><td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Confidence tolerance for the judge (0-100%).</td></tr>
                </tbody>
              </table>
            </div>

            <Callout type="info">
              On the Free plan, the gate always runs in observation mode (warnings only, never blocks).
              Policies become effective starting from the Team plan.
            </Callout>
          </section>

          {/* ─── GitHub Sync ─── */}
          <section id="github-sync" className="docs-section">
            <SectionTitle id="github-sync">GitHub Sync</SectionTitle>
            <P>
              Decern can sync decisions as ADR markdown files in your GitHub repository, and vice versa.
            </P>

            <SubTitle>Setup</SubTitle>
            <ol className="mt-3 ml-5 list-decimal space-y-1.5 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Connect your GitHub account from <strong>Settings → GitHub</strong>.</li>
              <li>When creating a project, select the linked repository.</li>
              <li>Decisions with an <Code>ADR ref</Code> (e.g. <Code>ADR-001</Code>) will be committed as markdown files.</li>
            </ol>

            <SubTitle>ADR format</SubTitle>
            <P>
              Synced files follow the standard ADR markdown format:
            </P>
            <Pre title="docs/decisions/ADR-001.md">{`# ADR-001: Adopt PostgreSQL for user data

## Status
Approved

## Context
We need a reliable relational database for user data
that supports complex queries and strong consistency.

## Decision
We will use PostgreSQL as our primary database.

## Consequences
- Strong ACID compliance
- Rich ecosystem of tools and extensions
- Team already has PostgreSQL expertise`}</Pre>

            <SubTitle>Webhook sync</SubTitle>
            <P>
              Decern installs a GitHub webhook to detect when ADR files are pushed to the repository.
              Changes to ADR files in the repo are automatically synced back to the Decern dashboard.
            </P>
          </section>

          {/* ─── Self Hosted ─── */}
          <section id="self-hosted" className="docs-section">
            <SectionTitle id="self-hosted">Self Hosted</SectionTitle>
            <P>
              Decern is distributed as a <strong>Docker image</strong> for self-hosted deployments.
              The image includes all features (Decision Gate, Judge, GitHub Sync, AI generation,
              Roles, Policies) with unlimited members. You run the container on your
              infrastructure, and no source code is exposed.
            </P>

            <SubTitle>Quick start</SubTitle>
            <ol className="mt-3 ml-5 list-decimal space-y-2 text-[0.935rem] text-gray-600 dark:text-gray-300">
              <li>Contact <a href="mailto:support@decern.dev" className="docs-link">support@decern.dev</a> to get access to the container registry (<Code>ghcr.io/decernhq/decern</Code>).</li>
              <li>Create a <strong>Supabase</strong> project (hosted at <a href="https://supabase.com" className="docs-link" target="_blank" rel="noopener noreferrer">supabase.com</a> or self-hosted).</li>
              <li>Run the database migrations against your Supabase instance.</li>
              <li>Create an <Code>.env</Code> file with your configuration (see below).</li>
              <li>Start the container.</li>
            </ol>

            <Pre title="docker-compose.yml">{`services:
  decern:
    image: ghcr.io/decernhq/decern:latest
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NEXT_PUBLIC_SELF_HOSTED=true
    restart: unless-stopped`}</Pre>
            <Pre title="Terminal">{`docker compose up -d`}</Pre>

            <SubTitle>Required environment variables</SubTitle>
            <EnvTable rows={[
              { name: "NEXT_PUBLIC_SUPABASE_URL", required: true, desc: "Your Supabase project URL." },
              { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true, desc: "Supabase anonymous key." },
              { name: "SUPABASE_SERVICE_ROLE_KEY", required: true, desc: "Supabase service role key (server-only)." },
              { name: "SUPABASE_WEBHOOK_SECRET", required: true, desc: "From DB after migration 00014: SELECT secret FROM app_webhook_secret;" },
              { name: "NEXT_PUBLIC_APP_URL", required: true, desc: "The public URL of your instance (e.g. https://decern.yourcompany.com)." },
              { name: "NEXT_PUBLIC_SELF_HOSTED", required: true, desc: "Set to true (set automatically by the Docker entrypoint)." },
            ]} />

            <SubTitle>GitHub integration (recommended)</SubTitle>
            <P>
              To enable ADR sync and repository linking, create a
              <a href="https://github.com/settings/developers" className="docs-link" target="_blank" rel="noopener noreferrer"> GitHub OAuth App</a> and
              set these variables:
            </P>
            <EnvTable rows={[
              { name: "GITHUB_CLIENT_ID", required: true, desc: "OAuth App client ID." },
              { name: "GITHUB_CLIENT_SECRET", required: true, desc: "OAuth App client secret." },
              { name: "GITHUB_WEBHOOK_SECRET", required: false, desc: "Secret for verifying GitHub push webhooks." },
            ]} />
            <Callout type="tip">
              Set the OAuth callback URL to <Code>https://your-instance/api/github/callback</Code>.
            </Callout>

            <SubTitle>AI features</SubTitle>
            <P>
              AI decision generation and the fair-use Judge fallback require an OpenAI-compatible API key.
            </P>
            <EnvTable rows={[
              { name: "OPEN_AI_API_KEY", required: false, desc: "OpenAI API key for AI features." },
              { name: "OPEN_AI_MODEL", required: false, desc: "Model name (default: gpt-4o-mini)." },
              { name: "DECERN_LLM_CREDENTIALS_ENCRYPTION_KEY", required: false, desc: "Base64 key (32 bytes) to encrypt BYO LLM credentials in DB. Generate with: openssl rand -base64 32" },
            ]} />

            <SubTitle>Database migrations</SubTitle>
            <P>
              The Supabase migrations are provided separately. Apply them to your Supabase instance
              using the Supabase CLI or by running the SQL files in order:
            </P>
            <Pre title="Terminal">{`# With Supabase CLI (if using Supabase hosted)
supabase db push

# Or apply manually: run each file in supabase/migrations/ in order
# 00001_create_profiles.sql through 00038_projects_create_governance_roles.sql`}</Pre>

            <SubTitle>Plan &amp; features</SubTitle>
            <P>
              Licensed self-hosted instances automatically unlock the <strong>enterprise</strong> tier,
              all features are enabled with no limits. No Stripe setup is required
              unless you want to manage internal billing for your organization.
            </P>

            <SubTitle>Updating</SubTitle>
            <Pre title="Terminal">{`docker compose pull
docker compose up -d`}</Pre>

            <P>
              For pricing, license inquiries, or dedicated support contact{" "}
              <a href="mailto:support@decern.dev" className="docs-link">support@decern.dev</a>.
            </P>
          </section>

          {/* ─── Footer ─── */}
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ready to get started?
            </p>
            <div className="flex gap-3">
              <a href={appPath("/signup")}>
                <Button>Create free account</Button>
              </a>
              <Link href="/pricing">
                <Button variant="outline">View pricing</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
