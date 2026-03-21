const DEFAULT_APP_URL = "https://app.decern.dev";
const DEFAULT_WEBSITE_URL = "https://decern.dev";
const DEFAULT_CORE_URL = "https://app.decern.dev";

export function getAppUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!configured) return DEFAULT_APP_URL;
  return configured.replace(/\/+$/, "");
}

export function getWebsiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_WEBSITE_URL?.trim();
  if (!configured) return DEFAULT_WEBSITE_URL;
  return configured.replace(/\/+$/, "");
}

export function appPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getAppUrl()}${normalized}`;
}

export function getCoreUrl(): string {
  const configured = process.env.DECERN_CORE_URL?.trim();
  if (!configured) return DEFAULT_CORE_URL;
  return configured.replace(/\/+$/, "");
}
