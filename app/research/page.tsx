// Research: dated index of published papers and studies.
import type { Metadata } from "next";
import { LatestBar } from "../components/latest-bar";
import { PageIntro } from "../components/page-intro";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = { title: "Research" };

const ENTRIES = [
  {
    date: "Nov 2026",
    title: "When Must an Agent Remember?",
    sub: "Bounded action-time memory and consequential tool calls in a synthetic RFQ workflow.",
    body: "Under bounded action-time memory access, benchmark-provided compact current state improved consequential tool-use accuracy relative to model-driven search over append-only episodic history. When complete history could be reread, the advantage was not apparent. Synthetic benchmark, two models, descriptive evidence rather than a causal test.",
    meta: "Mert Turna · Preregistered · Claude Sonnet 5, GPT-4.1",
    links: [{ href: "/research/when-must-an-agent-remember.pdf", label: "Paper (PDF)" }],
  },
  {
    date: "Sep 2026",
    title: "Corvus",
    sub: "Successful but inapplicable memories in tool-using support agents.",
    body: "A controlled study of memories that worked once and do not apply now. 100 tasks, five memory conditions, two models. No observed average critical-decision penalty.",
    meta: "Mert Turna · v0.6.2",
    links: [{ href: "https://mmturna.github.io/corvus/", label: "Study site" }],
  },
];

export default function ResearchPage() {
  return (
    <div className="shell">
      <LatestBar />
      <SiteHeader />
      <main className="page">
        <PageIntro title="Research">
          <p>
            Agents that quote and bid take actions with consequences. We study what they should remember, when they
            should look, and what they should not reuse, and publish the results with their limits stated.
          </p>
        </PageIntro>
        <ul className="entries">
          {ENTRIES.map((entry) => (
            <li key={entry.title} className="entry">
              <span className="mono entry-date">{entry.date}</span>
              <div>
                <h2 className="entry-title">{entry.title}</h2>
                <p className="entry-sub">{entry.sub}</p>
                <p className="entry-body">{entry.body}</p>
                <span className="mono entry-meta">{entry.meta}</span>
                <div className="entry-links">
                  {entry.links.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
