// Manual version: each page is an entry in a typeset programmer's manual, cross-referenced under SEE ALSO.
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, PRINCIPLES, STATEMENT, SUPPORT, VISION } from "../../../content";
import { type Section, href, sectionOf, sectionParams } from "../../sections";
import s from "../manual.module.css";

export const dynamicParams = false;
export const generateStaticParams = sectionParams;

const ENTRIES: Record<Section, { name: string; part: string; summary: string }> = {
  home: { name: "derya", part: "1", summary: STATEMENT.replace(/\.$/, "").toLowerCase() },
  vision: { name: "vision", part: "7", summary: "why the physical world needs its own intelligence" },
  principles: { name: "principles", part: "7", summary: "how our agents work" },
  about: { name: "about", part: "7", summary: "a small company working on an old industry" },
};

type Props = { params: Promise<{ page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = ENTRIES[await sectionOf(params)];
  return { title: `${e.name}(${e.part}) | Derya Programmer's Manual` };
}

function Ref({ section }: { section: Section }) {
  const e = ENTRIES[section];
  return (
    <Link href={href("manual", section)} className={s.ref}>
      <i>{e.name}</i>({e.part})
    </Link>
  );
}

function Body({ section }: { section: Section }) {
  if (section === "vision") return <Sh title="DESCRIPTION">{VISION.map((p, i) => <p key={i}>{p}</p>)}</Sh>;
  if (section === "about") return <Sh title="DESCRIPTION">{ABOUT.map((p, i) => <p key={i}>{p}</p>)}</Sh>;
  if (section === "principles")
    return (
      <Sh title="DESCRIPTION">
        <p>Every agent Derya runs follows these rules. They are not configurable.</p>
        <dl className={s.tp}>
          {PRINCIPLES.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </Sh>
    );
  return (
    <>
      <Sh title="SYNOPSIS">
        <p className={s.syn}>
          <b>derya</b> [ <i>inbox</i> ] [ <i>documents</i> ] [ <i>records</i> ]
        </p>
      </Sh>
      <Sh title="DESCRIPTION">
        <p>{SUPPORT}</p>
        <p>
          <b>Derya</b> reads what comes in, finds what matters and prepares the work for a person to judge. Every fact
          it uses points back to where it came from.
        </p>
      </Sh>
      <Sh title="DIAGNOSTICS">
        <p>What cannot be found is reported as unknown. It is never guessed.</p>
      </Sh>
      <Sh title="BUGS">
        <p>Nothing leaves without a person saying yes. This is intended.</p>
      </Sh>
    </>
  );
}

function Sh({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={s.sh}>
      <h2>{title}</h2>
      <div className={s.in}>{children}</div>
    </section>
  );
}

export default async function Manual({ params }: Props) {
  const section = await sectionOf(params);
  const e = ENTRIES[section];
  const tag = `${e.name.toUpperCase()}(${e.part})`;
  return (
    <div className={s.page}>
      <div className={s.sheet}>
        <header className={s.run}>
          <span>{tag}</span>
          <span>Derya Programmer&apos;s Manual</span>
          <span>{tag}</span>
        </header>
        <Sh title="NAME">
          <p>
            {e.name} - {e.summary}
          </p>
        </Sh>
        <Body section={section} />
        <Sh title="SEE ALSO">
          <p>
            {(["home", "vision", "principles", "about"] as Section[])
              .filter((x) => x !== section)
              .map((x, i, all) => (
                <span key={x}>
                  <Ref section={x} />
                  {i < all.length - 1 ? ", " : ""}
                </span>
              ))}
          </p>
        </Sh>
        <footer className={s.run}>
          <span>Derya Laboratories</span>
          <span>2026</span>
          <span>{["home", "vision", "principles", "about"].indexOf(section) + 1}</span>
        </footer>
      </div>
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
