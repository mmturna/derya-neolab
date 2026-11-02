// Home: the whole site on one page, in the plain single-column form most research labs use.
import { Mark } from "./components/mark";

const EMAIL = "mert@usederya.com";

const SYSTEMS = [
  {
    name: "Quotes",
    body: "An inbound RFQ becomes a priced, reviewed quote. Fields are extracted with a citation to the line they came from, prices come from the manufacturer's own rate card, and a person approves the quote before it is sent.",
  },
  {
    name: "Bids",
    body: "Industrial tenders run to hundreds of pages. Derya reads them into requirements, links each one to the page and clause it came from, and works through the response as steps a person reviews.",
  },
];

const RESEARCH = [
  {
    date: "November 2026",
    title: "When Must an Agent Remember?",
    body: "Under bounded action-time memory, compact current state beat model-driven search over episodic history on consequential tool calls in a synthetic RFQ workflow.",
    href: "/research/when-must-an-agent-remember.pdf",
  },
  {
    date: "September 2026",
    title: "Corvus: successful but inapplicable memories",
    body: "A controlled study of memories that worked once and do not apply now. 100 tasks, five memory conditions, two models. No observed average critical-decision penalty.",
    href: "https://mmturna.github.io/corvus/",
  },
];

export default function Home() {
  return (
    <div className="page">
      <nav className="nav" aria-label="Main">
        <a href="#research">Research</a>
        <a href="https://app.derya.ai">Sign in</a>
        <a href={`mailto:${EMAIL}`}>Get in touch ↗</a>
      </nav>

      <main className="column">
        <header className="masthead">
          <Mark className="mark" />
          <span className="wordmark">derya</span>
        </header>

        <a className="new" href={RESEARCH[0].href}>
          New: {RESEARCH[0].title} →
        </a>

        <section className="prose">
          <p>Derya is a research lab building agents for the commercial work of industrial manufacturers.</p>
          <p>
            A manufacturer&apos;s sales engineers spend their week reading RFQs: emails, drawings, spreadsheets and
            tender documents hundreds of pages long. Every answer has to be right, because a wrong price or a missed
            requirement becomes a contract.
          </p>
          <p>
            We build agents that do this reading. They cite where every fact came from, leave pricing to deterministic
            rules, and stop for a person before anything leaves the building. We study where they fail, and publish
            what we find.
          </p>
        </section>

        <section className="block">
          <h2 className="label">Systems</h2>
          {SYSTEMS.map((system) => (
            <div key={system.name} className="system">
              <h3>{system.name}</h3>
              <p>{system.body}</p>
            </div>
          ))}
        </section>

        <section className="block" id="research">
          <h2 className="label">Research</h2>
          <ol className="timeline">
            {RESEARCH.map((item) => (
              <li key={item.title}>
                <a href={item.href}>
                  <span className="date">{item.date}</span>
                  <span className="title">{item.title}</span>
                  <span className="summary">{item.body}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="block">
          <h2 className="label">Work with us</h2>
          <p>
            If your team answers RFQs every week, we would like to see how it is done today, and run Derya on real work
            with you. Reach us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </section>
      </main>

      <footer className="footer">© 2026 Derya</footer>
    </div>
  );
}
