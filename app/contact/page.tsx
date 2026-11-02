// Contact: who we work with and how to reach us.
import type { Metadata } from "next";
import { LatestBar } from "../components/latest-bar";
import { PageIntro } from "../components/page-intro";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = { title: "Contact" };

const EMAIL = "mert@usederya.com";

const ROWS = [
  ["Quote pilots", "Send us a few real RFQs and your rate card. We set up Quotes on them and your team reviews every result."],
  ["Bid projects", "Bring a live or past tender. We read it into source-linked requirements and run the workflow with you."],
  ["Research", "Working on agent memory, tool use or evaluation in industrial settings? We would like to compare notes."],
];

export default function ContactPage() {
  return (
    <div className="shell">
      <LatestBar />
      <SiteHeader />
      <main className="page">
        <PageIntro title="Contact">
          <p>
            We are looking for industrial manufacturers whose teams answer RFQs every week. We would like to see how
            your quotes and bids get made today, and run Derya on real work with you.
          </p>
          <div className="actions">
            <a href={`mailto:${EMAIL}`} className="button button--solid">{EMAIL}</a>
          </div>
        </PageIntro>
        <section className="section">
          <span className="mono section-label">Ways in</span>
          <ul className="rows">
            {ROWS.map(([title, body]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
