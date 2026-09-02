export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

export function formatIssueDate(issueDate: string): string {
  const [year, month] = issueDate.split("-");
  return `${year}年${parseInt(month)}月号`;
}

export function parseJsonField<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    CN: "🇨🇳",
    US: "🇺🇸",
    UK: "🇬🇧",
    JP: "🇯🇵",
    KR: "🇰🇷",
    EU: "🇪🇺",
  };
  return flags[country] ?? "🌍";
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}