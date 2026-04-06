import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://decern.dev";

export const metadata: Metadata = {
  title: {
    default: "Decern - Technical Decision Records",
    template: "%s | Decern",
  },
  description:
    "Document, share and enforce your team's architectural decisions. CI/CD gate blocks high-impact changes without an approved decision. LLM Judge evaluates compliance automatically.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Decern",
    title: "Decern - Technical Decision Records for Engineering Teams",
    description:
      "Document, share and enforce your team's architectural decisions. CI/CD gate blocks high-impact changes without an approved decision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decern - Technical Decision Records",
    description:
      "Document, share and enforce your team's architectural decisions. CI/CD gate and LLM Judge for engineering teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
(function(){var k='theme';var t=localStorage.getItem(k)||'light';document.documentElement.classList.toggle('dark',t==='dark');})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
