// Manual version: a plain CLI-style manual. Each page is a command, laid out like a printed ledger.
import type { Metadata } from "next";
import Link from "next/link";
import {
  ABOUT, ABOUT_TITLE, PRINCIPLES, PRINCIPLES_TITLE, RESEARCH, RESEARCH_INTRO, RESEARCH_TITLE, STATEMENT, SUPPORT,
  VISION, VISION_TITLE, WHO_CLOSE, WHO_COMPANIES, WHO_INTRO, WHO_PEOPLE, WHO_TITLE,
} from "../../../content";
import { type Page, PAGES, pageHref, pageOf, pageParams } from "../pages";
import { Scene } from "../scene";
import { ThemePicker } from "../theme";
import s from "../manual.module.css";

export const dynamicParams = false;
export const generateStaticParams = pageParams;

type Props = { params: Promise<{ page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await pageOf(params);
  return { title: p.slug ? `${p.title} | Derya Laboratories` : "Derya Laboratories" };
}

function Rule({ label, thin }: { label?: string; thin?: boolean }) {
  return (
    <div className={s.rule} aria-hidden="true">
      <span>{(thin ? "-" : "=").repeat(400)}</span>
      {label && <b>{label}</b>}
    </div>
  );
}

function Head({ cols, grid }: { cols: string[]; grid?: string }) {
  return (
    <div className={s.head} aria-hidden="true">
      <div className={`${s.row} ${grid ?? ""}`}>
        {cols.map((c, i) => <span key={i}>{c}</span>)}
      </div>
      <Rule thin />
    </div>
  );
}

function Title({ page, title }: { page: Page; title: string }) {
  return (
    <>
      <p className={s.prompt}><span aria-hidden="true">$ </span>derya {page.cmd}</p>
      <h1 className={s.h1}>{title}</h1>
    </>
  );
}

const n = (i: number) => String(i + 1).padStart(2, "0");

function Home() {
  const rest = PAGES.slice(1);
  return (
    <>
      <h1 className={s.statement}>{STATEMENT}</h1>
      <p className={s.lede}>{SUPPORT}</p>
      <Rule />
      <p className={s.caption}>CONTENTS</p>
      <Rule />
      <Head cols={["NO", "COMMAND", "PAGE", "DESCRIPTION"]} />
      <nav aria-label="Contents">
        {rest.map((p, i) => (
          <Link key={p.slug} href={pageHref(p)} className={`${s.row} ${s.link}`}>
            <span>{n(i)}</span>
            <span>derya {p.cmd}</span>
            <span>{p.title}</span>
            <span>{p.summary}</span>
          </Link>
        ))}
      </nav>
      <Rule />
      <Scene />
    </>
  );
}

function Prose({ items }: { items: readonly string[] }) {
  return (
    <div className={s.prose}>
      {items.map((t, i) => (
        <p key={i}><span className={s.pn}>{n(i)}</span>{t}</p>
      ))}
    </div>
  );
}

function Body({ page }: { page: Page }) {
  switch (page.slug) {
    case "":
      return <Home />;
    case "manifesto":
      return (<><Title page={page} title={VISION_TITLE} /><Prose items={VISION} /></>);
    case "about":
      return (<><Title page={page} title={ABOUT_TITLE} /><Prose items={ABOUT} /></>);
    case "principles":
      return (
        <>
          <Title page={page} title={PRINCIPLES_TITLE} />
          <Rule />
          <Head cols={["NO", "RULE", "WHAT IT MEANS"]} grid={s.three} />
          <ol className={s.table}>
            {PRINCIPLES.map((p, i) => (
              <li key={p.name} className={`${s.row} ${s.three}`}>
                <span>{n(i)}</span><b>{p.name}</b><span>{p.text}</span>
              </li>
            ))}
          </ol>
          <Rule />
        </>
      );
    case "who-we-help":
      return (
        <>
          <Title page={page} title={WHO_TITLE} />
          <div className={s.prose}><p>{WHO_INTRO}</p></div>
          <Rule label="COMPANIES" />
          <ul className={s.table}>
            {WHO_COMPANIES.map((c, i) => (
              <li key={c} className={`${s.row} ${s.two}`}><span>{n(i)}</span><span>{c}</span></li>
            ))}
          </ul>
          <Rule label="PEOPLE" />
          <Head cols={["NO", "ROLE", "THEIR WORK"]} grid={s.three} />
          <ul className={s.table}>
            {WHO_PEOPLE.map((p, i) => (
              <li key={p.role} className={`${s.row} ${s.three}`}>
                <span>{n(i)}</span><b>{p.role}</b><span>{p.text}</span>
              </li>
            ))}
          </ul>
          <Rule />
          <div className={s.prose}><p>{WHO_CLOSE}</p></div>
        </>
      );
    case "research":
      return (
        <>
          <Title page={page} title={RESEARCH_TITLE} />
          <div className={s.prose}><p>{RESEARCH_INTRO}</p></div>
          <Rule />
          <Head cols={["YEAR", "TYPE", "TITLE", ""]} grid={s.paper} />
          <ul className={s.table}>
            {RESEARCH.map((r) => (
              <li key={r.title} className={`${s.row} ${s.paper}`}>
                <span>{r.year}</span>
                <span>{r.kind}</span>
                <span>
                  <b>{r.title}</b>
                  <span className={s.abs}>{r.text}</span>
                </span>
                {r.href ? (
                  <a href={r.href} className={s.go} target="_blank" rel="noreferrer">{r.status} -&gt;</a>
                ) : (
                  <span className={s.muted}>{r.status}</span>
                )}
              </li>
            ))}
          </ul>
          <Rule />
        </>
      );
  }
}

export default async function Manual({ params }: Props) {
  const page = await pageOf(params);
  const i = PAGES.indexOf(page);
  const next = PAGES[(i + 1) % PAGES.length];
  return (
    <div className={s.page}>
      <div className={s.sheet}>
        <Rule label="DERYA(1)" />
        <header className={s.top}>
          <Link href="/bell/manual/" className={s.mark}>DERYA LABORATORIES</Link>
          <ThemePicker />
        </header>
        <Rule />
        <nav className={s.nav} aria-label="Pages">
          {PAGES.map((p) => (
            <Link key={p.slug} href={pageHref(p)} aria-current={p === page ? "page" : undefined}>
              {p.slug ? p.title.toLowerCase() : "home"}
            </Link>
          ))}
        </nav>
        <Rule thin />
        <main className={s.main}>
          <Body page={page} />
        </main>
        {page.slug && (
          <Link href={pageHref(next)} className={s.next}>
            next: derya {next.cmd} <span aria-hidden="true">-&gt;</span>
          </Link>
        )}
        <Rule />
        <footer className={s.foot}>
          <span>derya, n. the sea</span>
          <span>page {n(i)} of {n(PAGES.length - 1)}</span>
        </footer>
        <Rule />
      </div>
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
