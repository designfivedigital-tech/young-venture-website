// Number parsing and formatting helpers (all figures in euros).

export function parseNum(v: string | null | undefined): number | null {
  if (v == null) return null;
  const s = ("" + v).replace(/[^0-9.\-]/g, "");
  if (s === "" || s === "-" || s === ".") return null;
  const n = parseFloat(s);
  return isFinite(n) ? n : null;
}

export function group(n: number | null): string {
  if (n == null || !isFinite(n)) return "";
  const neg = n < 0;
  const a = Math.abs(Math.round(n));
  return (neg ? "-" : "") + a.toLocaleString("en-US");
}

export function euro(n: number | null): string {
  return "€ " + group(n);
}

export function abbr(n: number | null): string {
  if (n == null || !isFinite(n)) return "-";
  const neg = n < 0 ? "-" : "";
  const a = Math.abs(n);
  if (a >= 1e9) return neg + (a / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (a >= 1e6) return neg + (a / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (a >= 1e3) return neg + (a / 1e3).toFixed(0) + "K";
  return neg + Math.round(a);
}

export function euroAbbr(n: number | null): string {
  return "€ " + abbr(n);
}

export function mult(n: number | null): string {
  return n != null && isFinite(n) && n > 0 ? n.toFixed(1) + "×" : "-";
}
