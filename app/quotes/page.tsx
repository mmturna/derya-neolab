// Quotes: how an inbound RFQ becomes a reviewed quote, with a labeled demo specimen.
import type { Metadata } from "next";
import Link from "next/link";
import { LatestBar } from "../components/latest-bar";
import { PageIntro } from "../components/page-intro";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = { title: "Quotes" };

const STEPS = [
  { n: "01", title: "Intake", body: "An RFQ arrives by email, with or without drawings and spreadsheets attached." },
  { n: "02", title: "Extraction", body: "A model reads it into fields. Each field points at the sentence it came from." },
  { n: "03", title: "Pricing", body: "Your rate card prices the job in plain code. The model never sets a number." },
  { n: "04", title: "Review", body: "A person checks the quote and approves it before the PDF leaves the building." },
];

const RULES = [
  ["Models read. Rules price.", "Extraction, drafting and explanation use a model. Every price is computed from the rate card."],
  ["Every field has a source.", "Click a value and see the line of the email or page of the drawing it came from."],
  ["Unknowns stay unknown.", "A missing tolerance is shown as missing, not guessed."],
  ["Nothing leaves without a person.", "Quotes are sent only after someone on your team approves them."],
];

export default function QuotesPage() {
  return (
    <div className="shell">
      <LatestBar />
      <SiteHeader />
      <main className="page">
        <PageIntro title="Quotes">
          <p>
            An inbound RFQ becomes a priced, reviewed quote. Fields are extracted with citations back to the source,
            prices come from your own rate card, and nothing is sent until a person approves it.
          </p>
          <div className="actions">
            <Link href="/contact" className="button button--solid">Request a pilot</Link>
            <a href="https://app.derya.ai" className="button">Sign in</a>
          </div>
        </PageIntro>

        <section className="section">
          <span className="mono section-label">Pipeline</span>
          <div>
            <h2 className="section-heading">Four steps, one record. Every value can be traced back.</h2>
            <div className="steps">
              {STEPS.map((step) => (
                <div key={step.n} className="step">
                  <span className="mono">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <span className="mono section-label">Specimen</span>
          <div>
            <h2 className="section-heading">One RFQ, read, priced and waiting for review.</h2>
            <div className="board">
              <div className="board-head">
                <span className="mono">RFQ / bracket, BRK-2210</span>
                <span className="mono">Demo data</span>
              </div>
              <div className="board-cols">
                <div className="board-col">
                  <span className="mono">Source</span>
                  <div className="email-meta">From: purchasing@demo-customer.example<br />Subject: RFQ BRK-2210 rev B</div>
                  <div className="email">
                    Hi, please quote <span className="cite">500 pcs<sup>1</sup></span> of the attached bracket{" "}
                    <span className="cite">BRK-2210 rev B<sup>2</sup></span>, machined from{" "}
                    <span className="cite">6061-T6 aluminum<sup>3</sup></span>,{" "}
                    <span className="cite">clear anodized<sup>4</sup></span>. We need parts on our dock by{" "}
                    <span className="cite">December 14<sup>5</sup></span>. Drawing attached.
                  </div>
                </div>
                <div className="board-col">
                  <span className="mono">Extracted</span>
                  <table className="kv">
                    <tbody>
                      <tr><td>Part</td><td>BRK-2210 rev B<span className="ref">2</span></td></tr>
                      <tr><td>Quantity</td><td>500<span className="ref">1</span></td></tr>
                      <tr><td>Material</td><td>6061-T6 Al<span className="ref">3</span></td></tr>
                      <tr><td>Finish</td><td>Clear anodize<span className="ref">4</span></td></tr>
                      <tr><td>Need by</td><td>Dec 14<span className="ref">5</span></td></tr>
                      <tr><td>Tolerance</td><td><span className="unknown">not stated</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="board-col">
                  <span className="mono">Priced from rate card</span>
                  <table className="kv">
                    <tbody>
                      <tr><td>Setup</td><td>$180.00</td></tr>
                      <tr><td>Machining 500 × $6.40</td><td>$3,200.00</td></tr>
                      <tr><td>Anodize 500 × $0.85</td><td>$425.00</td></tr>
                      <tr className="total"><td>Total</td><td>$3,805.00</td></tr>
                    </tbody>
                  </table>
                  <div className="status-line">
                    <span><span className="dot dot--open" />Awaiting approval</span>
                    <span>1 open question</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <span className="mono section-label">Rules</span>
          <ul className="rules">
            {RULES.map(([title, body], i) => (
              <li key={title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <span>{body}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
