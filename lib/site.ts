export function sitePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return base || "/";
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
