"use client";

import { useMemo, useRef, useState } from "react";
import { BASE_YEAR, blankComp, Comparable, YEARS } from "./lib/model";
import { compute, rowMultiples } from "./lib/calc";
import { euro, euroAbbr, mult } from "./lib/format";
import LogoMark from "./LogoMark";
import NumberField from "./NumberField";

export default function ValuationTool() {
  const [ebitda, setEbitda] = useState<(number | null)[]>(
    Array(YEARS.length).fill(null)
  );
  const [comps, setComps] = useState<Comparable[]>([
    blankComp(),
    blankComp(),
    blankComp(),
  ]);
  const [ror, setRor] = useState<number>(40);
  const [hold, setHold] = useState<number>(3);
  const [ticket, setTicket] = useState<number | null>(null);

  const resultRef = useRef<HTMLElement>(null);

  const res = useMemo(
    () => compute({ ebitda, comps, ror, hold, ticket }),
    [ebitda, comps, ror, hold, ticket]
  );

  /* ---------- handlers ---------- */
  const setEbitdaAt = (i: number, n: number | null) =>
    setEbitda((prev) => prev.map((v, idx) => (idx === i ? n : v)));

  const setCompAt = (i: number, key: keyof Comparable, val: string | number | null) =>
    setComps((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, [key]: val } : c))
    );

  const addComp = () => setComps((prev) => [...prev, blankComp()]);

  const removeComp = (i: number) =>
    setComps((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      return next.length ? next : [blankComp()];
    });

  const loadExample = () => {
    setEbitda([-150000, 100000, 700000, 1800000, 3500000, 6000000]);
    setComps([
      { name: "Listed peer A", ebN: 50000000, ebN1: 62000000, mcap: 760000000 },
      { name: "Listed peer B", ebN: 30000000, ebN1: 38000000, mcap: 540000000 },
      { name: "Listed peer C", ebN: 82000000, ebN1: 96000000, mcap: 1040000000 },
    ]);
    setRor(40);
    setHold(3);
    setTicket(null);
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0
    );
  };

  const resetAll = () => {
    setEbitda(Array(YEARS.length).fill(null));
    setComps([blankComp(), blankComp(), blankComp()]);
    setRor(40);
    setHold(3);
    setTicket(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- derived display strings ---------- */
  const exitMultStr = res.avg != null ? res.avg.toFixed(1) + "×" : "-×";
  const avgMultStr = res.avg != null ? res.avg.toFixed(1) + "×" : "-";
  const discStr = res.disc != null ? res.disc.toFixed(3) : "-";
  const yearWord = res.hold === 1 ? "year" : "years";

  const preBig = res.ready ? euroAbbr(res.preMoney) : "€ -";
  const preFull = res.ready
    ? euro(res.preMoney)
    : res.avg == null || res.avg <= 0
    ? "Add at least one comparable with a valid multiple"
    : `Enter EBITDA for the exit year (N+${res.hold})`;
  const preFoot =
    res.ready && res.avg != null
      ? `= ${res.avg.toFixed(1)}× × ${euroAbbr(res.exitEbitda)} exit, discounted at ${Math.round(
          res.r * 100
        )}% for ${res.hold} ${yearWord}`
      : "Discounted exit value at your target return";

  return (
    <>
      {/* ===== nav ===== */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <LogoMark className="brand-mark" />
            <span className="brand-name">Young Ventures</span>
          </div>
          <span className="nav-tag">Startup Valuation Tool</span>
        </div>
      </nav>

      {/* ===== hero ===== */}
      <header className="hero">
        <div className="wrap hero-inner">
          <span className="eyebrow">
            <span className="dot" /> VC Method · Pre-money estimate
          </span>
          <h1 className="display">
            Startup
            <br />
            Valuation
            <br />
            <span className="accent">Tool</span>
          </h1>
          <p className="lead">
            Estimate a startup&apos;s pre-money valuation with the Venture Capital
            method: project EBITDA, benchmark against listed comparables, and
            discount the exit value back to today at your target rate of return.
          </p>
          <div className="hero-actions">
            <a href="#step1" className="btn btn-primary">
              Start valuing &rarr;
            </a>
            <button className="btn btn-ghost" onClick={loadExample}>
              Load example
            </button>
            <button className="btn btn-ghost" onClick={resetAll}>
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="wrap section" style={{ paddingTop: 0 }}>
        <div className="steps">
          {/* ===== STEP 1 ===== */}
          <section className="card" id="step1">
            <div className="step-head">
              <div className="step-no c1">1</div>
              <div>
                <h2 className="step-title">Company financial data</h2>
                <p className="step-desc">
                  Enter your projected <b>EBITDA</b> for each year, in euros. The
                  exit value will be built on the EBITDA of the year you exit
                  (Year N is the current year).
                </p>
              </div>
            </div>
            <div className="years-grid">
              {YEARS.map((y, i) => (
                <div className="field" key={y.off}>
                  <label>
                    {y.label} <span className="sub">{BASE_YEAR + y.off}</span>
                  </label>
                  <NumberField
                    value={ebitda[i]}
                    onChange={(n) => setEbitdaAt(i, n)}
                    prefix="€"
                    placeholder="0"
                    ariaLabel={`EBITDA ${y.label}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ===== STEP 2 ===== */}
          <section className="card" id="step2">
            <div className="step-head">
              <div className="step-no c2">2</div>
              <div>
                <h2 className="step-title">Comparable companies</h2>
                <p className="step-desc">
                  Add listed peers. For each one, enter EBITDA for Year N and N+1
                  plus the market capitalization. The EBITDA multiples are computed
                  automatically, and their average drives the exit multiple.
                </p>
              </div>
            </div>
            <div className="table-scroll">
              <table className="comps">
                <thead>
                  <tr>
                    <th style={{ minWidth: 150 }}>Company</th>
                    <th className="num">EBITDA N (€)</th>
                    <th className="num">EBITDA N+1 (€)</th>
                    <th className="num">Market cap (€)</th>
                    <th className="num">Multiple N</th>
                    <th className="num">Multiple N+1</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {comps.map((c, i) => {
                    const m = rowMultiples(c);
                    const okN = m.mN != null && m.mN > 0;
                    const okN1 = m.mN1 != null && m.mN1 > 0;
                    return (
                      <tr key={i}>
                        <td>
                          <div className="cell-inp">
                            <input
                              className="name"
                              type="text"
                              placeholder="Company name"
                              aria-label="Company name"
                              value={c.name}
                              onChange={(e) => setCompAt(i, "name", e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <NumberField
                            className="cell-inp"
                            prefix="€"
                            placeholder="0"
                            ariaLabel="EBITDA N"
                            value={c.ebN}
                            onChange={(n) => setCompAt(i, "ebN", n)}
                          />
                        </td>
                        <td>
                          <NumberField
                            className="cell-inp"
                            prefix="€"
                            placeholder="0"
                            ariaLabel="EBITDA N+1"
                            value={c.ebN1}
                            onChange={(n) => setCompAt(i, "ebN1", n)}
                          />
                        </td>
                        <td>
                          <NumberField
                            className="cell-inp"
                            prefix="€"
                            placeholder="0"
                            ariaLabel="Market cap"
                            value={c.mcap}
                            onChange={(n) => setCompAt(i, "mcap", n)}
                          />
                        </td>
                        <td className="num">
                          <span className={"mult" + (okN ? "" : " empty")}>
                            {mult(m.mN)}
                          </span>
                        </td>
                        <td className="num">
                          <span className={"mult n1" + (okN1 ? "" : " empty")}>
                            {mult(m.mN1)}
                          </span>
                        </td>
                        <td className="rm">
                          <button
                            className="row-rm"
                            title="Remove"
                            aria-label="Remove comparable"
                            onClick={() => removeComp(i)}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>
                      <span className="avg-pill">
                        Average comparable multiple &nbsp; <b>{avgMultStr}</b>
                      </span>
                    </td>
                    <td className="num">
                      <span className="mult">{mult(res.avgN)}</span>
                    </td>
                    <td className="num">
                      <span className="mult n1">{mult(res.avgN1)}</span>
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="comps-actions">
              <button className="btn btn-ghost btn-sm" onClick={addComp}>
                + Add comparable
              </button>
              <span className="ror-note">
                Tip: pick 3 to 6 peers with a similar business model and growth
                profile.
              </span>
            </div>
          </section>

          {/* ===== STEP 3 ===== */}
          <section className="card" id="step3">
            <div className="step-head">
              <div className="step-no c3">3</div>
              <div>
                <h2 className="step-title">Investor rate of return</h2>
                <p className="step-desc">
                  Set the annual rate of return the investor targets and the
                  holding period. The exit year is derived from Year N plus the
                  holding period.
                </p>
              </div>
            </div>
            <div className="ror-grid">
              <div className="field">
                <label htmlFor="rorInput">Annual rate of return</label>
                <div className="inp">
                  <input
                    id="rorInput"
                    type="number"
                    min={0}
                    max={300}
                    step={1}
                    value={ror}
                    onChange={(e) =>
                      setRor(e.target.value === "" ? 0 : Number(e.target.value))
                    }
                  />
                  <span className="pre">%</span>
                </div>
                <div className="range-row">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={Math.min(100, Math.max(0, ror))}
                    onChange={(e) => setRor(Number(e.target.value))}
                    aria-label="Annual rate of return slider"
                  />
                </div>
                <p className="ror-note">
                  Typically 30% to 100% depending on maturity and risk.
                </p>
              </div>
              <div className="field">
                <label htmlFor="holdInput">Holding period</label>
                <div className="inp">
                  <input
                    id="holdInput"
                    type="number"
                    min={1}
                    max={4}
                    step={1}
                    value={hold}
                    onChange={(e) =>
                      setHold(e.target.value === "" ? 3 : Number(e.target.value))
                    }
                    onBlur={(e) => {
                      let v = Math.round(Number(e.target.value));
                      if (!isFinite(v)) v = 3;
                      v = Math.min(4, Math.max(1, v));
                      setHold(v);
                    }}
                  />
                  <span className="pre">years</span>
                </div>
                <p className="ror-note">
                  From Year N. Limited to the years you projected (max N+4).
                </p>
              </div>
              <div className="field">
                <label>Implied exit</label>
                <div style={{ height: 50, display: "flex", alignItems: "center" }}>
                  <span className="exit-chip">
                    Exit in {res.exitYear} · uses EBITDA N+{res.hold}
                  </span>
                </div>
                <p className="ror-note">
                  Exit value = avg multiple × exit-year EBITDA.
                </p>
              </div>
            </div>
          </section>

          {/* ===== RESULT ===== */}
          <section className="card" id="result" ref={resultRef}>
            <div className="result-head">
              <div
                className="step-no c3"
                style={{ color: "#fff", borderColor: "var(--line)" }}
              >
                Σ
              </div>
              <h2>Your valuation</h2>
            </div>

            <div className="bento">
              <div className="tile hero-tile">
                <div className="t-label">Estimated pre-money valuation</div>
                <div className="t-val">{preBig}</div>
                <div>
                  <div className="t-sub">{preFull}</div>
                  <div className="t-foot">{preFoot}</div>
                </div>
              </div>

              <div className="tile">
                <span className="accent-bar magenta" />
                <div className="t-label">Exit value</div>
                <div className="t-val magenta">
                  {res.ready ? euroAbbr(res.exitValue) : "€ -"}
                </div>
                <div className="t-sub">
                  {res.ready ? `in ${res.exitYear}` : "at exit year"}
                </div>
              </div>

              <div className="tile">
                <span className="accent-bar green" />
                <div className="t-label">Exit multiple</div>
                <div className="t-val green">{exitMultStr}</div>
                <div className="t-sub">avg of comparables</div>
              </div>

              <div className="tile">
                <span className="accent-bar cyan" />
                <div className="t-label">Exit-year EBITDA</div>
                <div className="t-val white">
                  {res.exitEbitda != null ? euroAbbr(res.exitEbitda) : "€ -"}
                </div>
                <div className="t-sub">
                  Year N+{res.hold} ({res.exitYear})
                </div>
              </div>

              <div className="tile">
                <span className="accent-bar white" />
                <div className="t-label">Discount factor</div>
                <div className="t-val white">{discStr}</div>
                <div className="t-sub">
                  {Math.round(res.r * 100)}% over {res.hold} {yearWord}
                </div>
              </div>
            </div>

            {/* optional investor view */}
            <details className="opt">
              <summary>
                Optional: add an investment ticket to see post-money and ownership
              </summary>
              <div className="opt-grid">
                <div className="field">
                  <label htmlFor="ticket">Investment amount</label>
                  <NumberField
                    value={ticket}
                    onChange={setTicket}
                    prefix="€"
                    placeholder="e.g. 1,000,000"
                    ariaLabel="Investment amount"
                  />
                </div>
                <div className="opt-out">
                  <span className="k">Post-money valuation</span>
                  <span className="v">
                    {res.postMoney != null ? euroAbbr(res.postMoney) : "€ -"}
                  </span>
                </div>
                <div className="opt-out">
                  <span className="k">Investor ownership</span>
                  <span className="v magenta">
                    {res.ownership != null ? res.ownership.toFixed(1) + " %" : "- %"}
                  </span>
                </div>
              </div>
              <p className="ror-note" style={{ marginTop: 12 }}>
                Post-money = pre-money + investment. Ownership = investment /
                post-money.
              </p>
            </details>

            {/* methodology */}
            <details className="method">
              <summary>How this is calculated · VC method</summary>
              <div className="body">
                <p>
                  The <strong>Venture Capital (VC) method</strong> values a company
                  by projecting what it could be worth at exit and discounting that
                  value back to today at the return an investor requires.
                </p>
                <p style={{ marginTop: 12 }}>
                  <strong>1. Exit multiple.</strong> For every listed comparable we
                  compute <code>Market cap / EBITDA</code> for Year N and Year N+1.
                  The exit multiple used is the average across all the multiples you
                  enter.
                </p>
                <p style={{ marginTop: 12 }}>
                  <strong>2. Exit value.</strong>{" "}
                  <code>Exit value = exit multiple × exit-year EBITDA</code>, where
                  the exit year is Year N plus your holding period.
                </p>
                <p style={{ marginTop: 12 }}>
                  <strong>3. Discount to today.</strong>{" "}
                  <code>Pre-money = exit value / (1 + r)^holding</code>, with{" "}
                  <code>r</code> the annual rate of return.
                </p>
                <p style={{ marginTop: 12 }}>
                  This is an <strong>indicative estimate</strong>. It is sensitive to
                  your assumptions on multiples, EBITDA and required return, and it
                  does not replace a full valuation or due diligence.
                </p>
              </div>
            </details>
          </section>
        </div>
      </main>

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-inner">
          <div className="brand">
            <LogoMark className="brand-mark" />
            <span className="brand-name">Young Ventures</span>
          </div>
          <p className="disc">
            Indicative pre-money estimate produced with the VC method. For
            information only, not investment advice or a valuation opinion. All
            figures in euros.
          </p>
        </div>
      </footer>
    </>
  );
}
