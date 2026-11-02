// Top bar shared by every page: wordmark on the left, section links on the right.
import Link from "next/link";
import { Mark } from "./mark";

const LINKS = [
  { href: "/quotes", label: "Quotes" },
  { href: "/bids", label: "Bids" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Derya home">
        <Mark className="wordmark-mark" />
        <span>DERYA</span>
      </Link>
      <nav className="site-nav" aria-label="Main">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
