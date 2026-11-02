// Bids: large industrial RFQ projects, read into source-linked requirements, with a labeled demo specimen.
import type { Metadata } from "next";
import Link from "next/link";
import { LatestBar } from "../components/latest-bar";
import { PageIntro } from "../components/page-intro";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = { title: "Bids" };

const STEPS = [
  { n: "01", title: "Sources", body: "Tender documents, specifications and past bids are gathered into one project." },
  { n: "02", title: "Requirements", body: "Every requirement is pulled out and linked to the page and clause it came from." },
  { n: "03", title: "Workflow", body: "A canvas runs the capability steps: classify, translate, deduplicate, check, assess." },
  { n: "04", title: "Review", body: "Each output is reviewed by a person against its source before the response is built." },
];

const REQUIREMENTS = [
  { id: "R-014", text: "Pumps rated for PN16 working pressure", src: "Technical spec §4.2, p. 11" },
  { id: "R-015", text: "Wetted parts in duplex stainless 1.4462", src: "Technical spec §4.3, p. 12" },
  { id: "R-031", text: "Delivery within 20 weeks of order", src: "Commercial terms §2.1, p. 3" },
  { id: "R-032", text: "Delivery within 16 weeks of order", src: "Annex C, p. 2 · conflicts with R-031" },
];

const PIPELINE = [
  ["Classify documents", "reviewed"],
  ["Translate", "reviewed"],
  ["Deduplicate requirements", "reviewed"],
  ["Check completeness", "1 gap"],
  ["Assess delivery risk", "needs review"],
  ["Check capacity", "queued"],
];

export default function BidsPage() {
  return (
    <div className="shell">
      <LatestBar />
      <SiteHeader />
      <main className="page">
        <PageIntro title="Bids">
          <p>
            Large industrial RFQs arrive as hundreds of pages. Derya reads the sources into requirements, links each one
            to where it was written, and runs the work of answering them as steps a person reviews.
          </p>
          <div className="actions">
            <Link href="/contact" className="button button--solid">Request a pilot</Link>
            <a href="https://app.derya.ai" className="button">Sign in</a>
          </div>
        </PageIntro>

        <section className="section">
          <span className="mono section-label">Pipeline</span>
          <div>
            <h2 className="section-heading">From a stack of tender documents to a reviewed response package.</h2>
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
            <h2 className="section-heading">Requirements keep their source. Conflicts surface instead of disappearing.</h2>
            <div className="board">
              <div className="board-head">
                <span className="mono">Project / process water pumps tender</span>
                <span className="mono">Demo data</span>
              </div>
              <div className="board-cols" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
                <div className="board-col">
                  <span className="mono">Requirements</span>
                  {REQUIREMENTS.map((req) => (
                    <div key={req.id} className="req">
                      <span className="req-id">{req.id}</span>
                      {req.text}
                      <span className="req-src">{req.src}</span>
                    </div>
                  ))}
                </div>
                <div className="board-col">
                  <span className="mono">Workflow</span>
                  <ul className="pipeline">
                    {PIPELINE.map(([step, state]) => (
                      <li key={step}>
                        <span><span className={state === "reviewed" ? "dot" : "dot dot--open"} />{step}</span>
                        <span>{state}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
