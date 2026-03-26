"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type DocSection = {
  id: string;
  label: string;
  business?: boolean;
};

export function DocsNav({ sections }: { sections: DocSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Mobile: horizontal scroll */}
      <nav className="sticky top-16 z-10 -mx-4 mb-8 flex gap-2 overflow-x-auto border-b border-gray-200/60 bg-white/80 px-4 py-3 backdrop-blur dark:border-gray-800/60 dark:bg-gray-900/80 lg:hidden">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              active === s.id
                ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
            )}
          >
            {s.label}
            {s.business && (
              <span className="rounded bg-amber-400/20 px-1 py-px text-[0.55rem] font-bold uppercase text-amber-600 dark:text-amber-400">
                B
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block">
        <div className="sticky top-24 space-y-0.5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Documentation
          </p>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                active === s.id
                  ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                  : "text-gray-600 hover:bg-gray-100/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-100",
              )}
            >
              {s.label}
              {s.business && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  Business
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
