"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
};

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const Tag = link.external ? "a" : Link;
              return link.primary ? (
                <Tag key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  <Button className="w-full">{link.label}</Button>
                </Tag>
              ) : (
                <Tag
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Tag>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
