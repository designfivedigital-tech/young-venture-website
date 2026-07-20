// VC-method valuation engine.
//   Exit value = average comparable multiple x exit-year EBITDA
//   Pre-money  = exit value / (1 + r)^holding

import { BASE_YEAR, Comparable, YEARS } from "./model";

export function rowMultiples(c: Comparable): { mN: number | null; mN1: number | null } {
  const mN = c.mcap != null && c.ebN != null && c.ebN > 0 ? c.mcap / c.ebN : null;
  const mN1 = c.mcap != null && c.ebN1 != null && c.ebN1 > 0 ? c.mcap / c.ebN1 : null;
  return { mN, mN1 };
}

function mean(a: number[]): number | null {
  return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
}

export function avgComparable(comps: Comparable[]): {
  avgN: number | null;
  avgN1: number | null;
  avg: number | null;
} {
  const allN: number[] = [];
  const allN1: number[] = [];
  const all: number[] = [];
  comps.forEach((c) => {
    const m = rowMultiples(c);
    if (m.mN != null && m.mN > 0) {
      allN.push(m.mN);
      all.push(m.mN);
    }
    if (m.mN1 != null && m.mN1 > 0) {
      allN1.push(m.mN1);
      all.push(m.mN1);
    }
  });
  return { avgN: mean(allN), avgN1: mean(allN1), avg: mean(all) };
}

export function ebitdaByOffset(ebitda: (number | null)[], off: number): number | null {
  const i = YEARS.findIndex((y) => y.off === off);
  return i >= 0 ? ebitda[i] : null;
}

export interface ComputeInput {
  ebitda: (number | null)[]; // aligned with YEARS
  comps: Comparable[];
  ror: number; // annual rate of return, percent
  hold: number; // holding period in years
  ticket: number | null; // optional investment amount
}

export interface ComputeResult {
  avg: number | null;
  avgN: number | null;
  avgN1: number | null;
  exitYear: number;
  exitEbitda: number | null;
  exitValue: number | null;
  disc: number | null;
  preMoney: number | null;
  postMoney: number | null;
  ownership: number | null; // percent
  ready: boolean;
  r: number; // rate as a fraction
  hold: number; // clamped holding period
}

export function compute(input: ComputeInput): ComputeResult {
  let hold = Math.round(input.hold);
  if (!isFinite(hold)) hold = 3;
  hold = Math.min(4, Math.max(1, hold));

  const exitYear = BASE_YEAR + hold;
  const a = avgComparable(input.comps);
  const exitEbitda = ebitdaByOffset(input.ebitda, hold);

  let r = input.ror;
  if (!isFinite(r)) r = 0;
  r = r / 100;
  const disc = 1 / Math.pow(1 + r, hold);

  const ready = a.avg != null && a.avg > 0 && exitEbitda != null && exitEbitda > 0;

  let exitValue: number | null = null;
  let preMoney: number | null = null;
  let postMoney: number | null = null;
  let ownership: number | null = null;

  if (ready) {
    exitValue = (a.avg as number) * (exitEbitda as number);
    preMoney = exitValue * disc;
    if (input.ticket != null && input.ticket > 0) {
      postMoney = preMoney + input.ticket;
      ownership = (input.ticket / postMoney) * 100;
    }
  }

  return {
    avg: a.avg,
    avgN: a.avgN,
    avgN1: a.avgN1,
    exitYear,
    exitEbitda,
    exitValue,
    disc,
    preMoney,
    postMoney,
    ownership,
    ready,
    r,
    hold,
  };
}
