"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export type ContactLabels = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  error: string;
  close: string;
  privacy: string;
};

type ContactFormProps = {
  labels: ContactLabels;
  defaultSubject?: string;
};

/* ── Shared input styles ─────────────────────────────────────────── */

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-brand-400 dark:focus:bg-gray-800";

/* ── Shared dialog content ───────────────────────────────────────── */

function ContactDialog({
  labels,
  defaultSubject,
  open,
  onClose,
}: ContactFormProps & { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      const timeout = setTimeout(() => setStatus("idle"), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-gray-200/80 bg-white p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900"
    >
      <div className="p-6 sm:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <svg className="h-7 w-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {labels.successTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {labels.successBody}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-6 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              {labels.close}
            </Button>
          </div>
        ) : (
          <>
            {/* Header with icon */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40">
                <svg className="h-5 w-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="min-w-0 pr-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {labels.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {labels.subtitle}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-5 border-t border-gray-100 dark:border-gray-800" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {labels.name}
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    placeholder={labels.namePlaceholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {labels.email}
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    placeholder={labels.emailPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {labels.subject}
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  required
                  defaultValue={defaultSubject}
                  placeholder={labels.subjectPlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {labels.message}
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  required
                  rows={4}
                  placeholder={labels.messagePlaceholder}
                  className={inputClass + " resize-y"}
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-950/30">
                  <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <p className="text-sm text-red-600 dark:text-red-400">{labels.error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {labels.sending}
                  </span>
                ) : labels.send}
              </Button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                {labels.privacy}
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

/* ── Public: inline text trigger (footer, pricing questions) ─────── */

export function ContactForm({ labels, defaultSubject }: ContactFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        {labels.title}
      </button>
      <ContactDialog labels={labels} defaultSubject={defaultSubject} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/* ── Public: Button trigger (hero CTA, enterprise card) ──────────── */

export function ContactFormButton({
  labels,
  defaultSubject,
  children,
  className,
}: ContactFormProps & { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </Button>
      <ContactDialog labels={labels} defaultSubject={defaultSubject} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
