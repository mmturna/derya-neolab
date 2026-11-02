// Home: dark lab front page with the one-line statement and three doors into the site.
import Link from "next/link";
import { Mark } from "./components/mark";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const DOORS = [
  { href: "/quotes", label: "Systems", title: "Quotes and Bids", note: "RFQ in, cited fields, rule-based prices, a person signs off." },
  { href: "/research", label: "Research", title: "Published research", note: "Agent memory under consequential tool calls." },
  { href: "/contact", label: "Contact", title: "Work with us", note: "For manufacturers who answer RFQs every week." },
];

export default function Home() {
  return (
    <div className="shell shell--night">
      <SiteHeader />
      <main className="home">
        <Mark className="home-orbit" />
        <div className="home-lead">
          <Link href="/research" className="latest">
            <span className="mono">Latest</span>
            <span>When Must an Agent Remember?</span>
            <span aria-hidden="true">→</span>
          </Link>
          <h1 className="statement">
            Derya <span className="dim">is a research lab building agents for the</span> commercial work of
            industrial manufacturers.
          </h1>
        </div>
        <div className="home-columns">
          {DOORS.map((door) => (
            <Link key={door.href} href={door.href} className="home-column">
              <span className="mono">{door.label}</span>
              <span className="home-column-title">{door.title}</span>
              <span className="home-column-note">{door.note}</span>
              <span className="home-column-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
