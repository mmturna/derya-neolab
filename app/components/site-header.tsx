// Shared top bar: the Derya mark linking home, and the three page links.
import Link from "next/link";
import { Mark } from "./mark";

const LINKS = [
  { href: "/vision/", label: "Vision" },
  { href: "/principles/", label: "Principles" },
  { href: "/about/", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="top">
      <Link href="/" className="brand">
        <Mark className="mark" />
        Derya
      </Link>
      <nav className="nav">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
