// Drawing version: four sheets of an engineering drawing, with a title block that doubles as navigation.
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, ABOUT_TITLE, PRINCIPLES, PRINCIPLES_TITLE, STATEMENT, SUPPORT, VISION, VISION_TITLE } from "../../../content";
import { SECTIONS, type Section, href, sectionOf, sectionParams } from "../../sections";
import { Schematic } from "../schematic";
import s from "../drawing.module.css";

export const dynamicParams = false;
export const generateStaticParams = sectionParams;

type Props = { params: Promise<{ page?: string[] }> };

const SHEETS: Record<Section, string> = {
  home: "General arrangement",
  vision: "Vision",
  principles: "Principles",
  about: "About",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `${SHEETS[await sectionOf(params)]} | Derya Laboratories` };
}

const trim = (t: string) => t.replace(/\.$/, "");

function Notes({ items, title }: { items: string[]; title: string }) {
  return (
    <section className={s.notes}>
      <h2>{title}</h2>
      <ol>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function Body({ section }: { section: Section }) {
  if (section === "vision")
    return (
      <>
        <h1 className={s.heading}>{trim(VISION_TITLE)}</h1>
        <Notes title="General notes" items={VISION} />
      </>
    );
  if (section === "principles")
    return (
      <>
        <h1 className={s.heading}>{trim(PRINCIPLES_TITLE)}</h1>
        <Notes title="Notes, see sheet 1" items={PRINCIPLES.map((p) => `${p.name}. ${p.text}`)} />
      </>
    );
  if (section === "about")
    return (
      <>
        <h1 className={s.heading}>{trim(ABOUT_TITLE)}</h1>
        <Notes title="General notes" items={ABOUT} />
      </>
    );
  return (
    <>
      <h1 className={s.heading}>{trim(STATEMENT)}</h1>
      <p className={s.sub}>{SUPPORT}</p>
      <div className={s.figure}>
        <Schematic />
      </div>
      <Notes title="Notes" items={PRINCIPLES.map((p) => `${p.name}.`)} />
    </>
  );
}

export default async function Drawing({ params }: Props) {
  const section = await sectionOf(params);
  const n = SECTIONS.indexOf(section) + 1;
  return (
    <div className={s.desk}>
      <div className={s.frame}>
        <div className={s.zones} aria-hidden="true">
          {["A", "B", "C", "D"].map((z) => <span key={z}>{z}</span>)}
        </div>
        <main className={s.field}>
          <Body section={section} />
        </main>
        <footer className={s.block}>
          <div className={s.cell}>
            <span>Title</span>
            <b>Derya</b>
          </div>
          <div className={s.cell}>
            <span>Dwg no.</span>
            <b>D-26-001</b>
          </div>
          <div className={s.cell}>
            <span>Sheet</span>
            <b>{n} of 4</b>
          </div>
          <div className={s.cell}>
            <span>Drawn</span>
            <b>Derya Laboratories</b>
          </div>
          <div className={s.cell}>
            <span>Approved</span>
            <b>A person</b>
          </div>
          <nav className={`${s.cell} ${s.sheets}`}>
            <span>Sheets</span>
            {SECTIONS.map((x, i) => (
              <Link key={x} href={href("drawing", x)} className={x === section ? s.on : undefined}>
                {i + 1}&nbsp;&nbsp;{SHEETS[x]}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
