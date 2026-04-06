import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { appPath } from "@/lib/config";

export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <header className="bg-app-card">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        {/* Desktop nav */}
        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <span className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost">{t("pricing")}</Button>
            </Link>
            <Link href="/docs">
              <Button variant="ghost">{t("docs")}</Button>
            </Link>
            <a href={appPath("/login")}>
              <Button variant="ghost">{t("logIn")}</Button>
            </a>
            <a href={appPath("/signup")}>
              <Button>{t("signUp")}</Button>
            </a>
          </span>
        </div>
        {/* Mobile nav */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <MobileNav
            links={[
              { href: "/pricing", label: t("pricing") },
              { href: "/docs", label: t("docs") },
              { href: appPath("/login"), label: t("logIn"), external: true },
              { href: appPath("/signup"), label: t("signUp"), external: true, primary: true },
            ]}
          />
        </div>
      </nav>
    </header>
  );
}
