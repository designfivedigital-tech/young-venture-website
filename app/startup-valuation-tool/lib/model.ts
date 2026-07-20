// Domain model for the VC-method valuation tool.

export const BASE_YEAR = 2026; // Year N (current year)

export interface YearDef {
  off: number; // offset from Year N
  label: string; // N-1, N, N+1, ...
}

export const YEARS: YearDef[] = [
  { off: -1, label: "N-1" },
  { off: 0, label: "N" },
  { off: 1, label: "N+1" },
  { off: 2, label: "N+2" },
  { off: 3, label: "N+3" },
  { off: 4, label: "N+4" },
];

export interface Comparable {
  name: string;
  ebN: number | null; // EBITDA Year N
  ebN1: number | null; // EBITDA Year N+1
  mcap: number | null; // market capitalization
}

export function blankComp(): Comparable {
  return { name: "", ebN: null, ebN1: null, mcap: null };
}
