import fs from "node:fs";
import path from "node:path";

export default function DocsPage() {
  const filePath = path.join(process.cwd(), "docs", "placeholder.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Docs
      </h1>
      <pre className="mt-6 whitespace-pre-wrap text-sm text-gray-500 dark:text-gray-400">
        {content}
      </pre>
    </main>
  );
}
