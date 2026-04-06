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
    default: "Decern — The CI gate between AI code and production",
    template: "%s | Decern",
  },
  description:
    "A CI gate that checks every AI-generated pull request against your team's architecture decisions. What doesn't fit gets blocked.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Decern",
    title: "Decern — The CI gate between AI code and production",
    description:
      "A CI gate that checks every AI-generated pull request against your team's architecture decisions. What doesn't fit gets blocked.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decern — The CI gate between AI code and production",
    description:
      "A CI gate that checks every AI-generated pull request against your team's architecture decisions. What doesn't fit gets blocked.",
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
