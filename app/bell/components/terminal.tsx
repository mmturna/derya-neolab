// Terminal frame for the Bell Labs version: workspace bar as navigation, a window, and a closing prompt.
import Link from "next/link";

const PAGES = [
  { href: "/bell/", label: "home", file: "" },
  { href: "/bell/vision/", label: "vision", file: "vision.txt" },
  { href: "/bell/principles/", label: "principles", file: "principles.txt" },
  { href: "/bell/about/", label: "about", file: "about.txt" },
];

export function Prompt({ command }: { command?: string }) {
  return (
    <p className="prompt">
      <span className="who">[visitor@derya:~]$</span> {command}
    </p>
  );
}

export function Terminal({ active, children }: { active: string; children: React.ReactNode }) {
  const current = PAGES.find((page) => page.label === active);
  return (
    <div className="bell-screen">
      <header className="bar">
        <nav className="spaces">
          {PAGES.map((page, i) => (
            <Link key={page.href} href={page.href} className={page.label === active ? "space on" : "space"}>
              {i + 1} {page.label}
            </Link>
          ))}
        </nav>
        <span className="bar-title">visitor@derya: ~{current?.file ? `/${current.file}` : ""}</span>
        <span className="bar-right">status nominal&nbsp;&nbsp;&nbsp;© 2026</span>
      </header>
      <main className="window">
        {children}
        <Prompt command="ls" />
        <p className="files">
          {PAGES.slice(1).map((page) => (
            <Link key={page.href} href={page.href}>
              {page.file}
            </Link>
          ))}
        </p>
        <p className="prompt">
          <span className="who">[visitor@derya:~]$</span> <span className="cursor" />
        </p>
      </main>
    </div>
  );
}
