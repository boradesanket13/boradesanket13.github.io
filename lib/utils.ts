import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthYear(iso: string | null): string {
  if (!iso) return "Present";
  const [y, m] = iso.split("-");
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatCount(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

// Years of experience, computed live from a fixed start date to "today"
// instead of a hardcoded number in JSON — so it keeps ticking up on its own.
export function getYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = (now.getTime() - start.getTime()) / msPerYear;
  return Math.max(0, years);
}

export function formatYearsExperience(startDate: string): string {
  const years = getYearsOfExperience(startDate);
  return years.toFixed(1).replace(/\.0$/, "");
}
