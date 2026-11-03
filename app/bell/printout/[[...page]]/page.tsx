// Printout version: each page is a line printer run on green-bar fanfold paper, with a block-letter banner on home.
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, ABOUT_TITLE, PRINCIPLES, PRINCIPLES_TITLE, STATEMENT, SUPPORT, VISION, VISION_TITLE } from "../../../content";
import { SECTIONS, type Section, href, sectionOf, sectionParams } from "../../sections";
import s from "../printout.module.css";

export const dynamicParams = false;
export const generateStaticParams = sectionParams;

type Props = { params: Promise<{ page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = await sectionOf(params);
  return { title: `${section.toUpperCase()} | Derya Laboratories` };
}

const GLYPHS: Record<string, string[]> = {
  D: ["XXXX ", "X   X", "X   X", "X   X", "X   X", "X   X", "XXXX "],
  E: ["XXXXX", "X    ", "X    ", "XXXX ", "X    ", "X    ", "XXXXX"],
  R: ["XXXX ", "X   X", "X   X", "XXXX ", "X X  ", "X  X ", "X   X"],
  Y: ["X   X", "X   X", " X X ", "  X  ", "  X  ", "  X  ", "  X  "],
  A: [" XXX ", "X   X", "X   X", "XXXXX", "X   X", "X   X", "X   X"],
};

function banner(word: string) {
  return GLYPHS.D.map((_, row) =>
    [...word].map((ch) => GLYPHS[ch][row].replace(/X/g, ch)).join("   "),
  ).join("\n");
}

const TITLES: Record<Section, string> = {
  home: "JOB SUMMARY",
  vision: VISION_TITLE,
  principles: PRINCIPLES_TITLE,
  about: ABOUT_TITLE,
};

function Body({ section }: { section: Section }) {
  if (section === "vision" || section === "about") {
    const paragraphs = section === "vision" ? VISION : ABOUT;
    return paragraphs.map((p, i) => (
      <div key={i} className={s.row}>
        <span className={s.key}>P.{String(i + 1).padStart(2, "0")}</span>
        <p>{p}</p>
      </div>
    ));
  }
  if (section === "principles")
    return PRINCIPLES.map((p, i) => (
      <div key={p.name} className={s.row}>
        <span className={s.key}>R.{String(i + 1).padStart(2, "0")}</span>
        <p>
          <b>{p.name}.</b> {p.text}
          <span className={s.status}>STATUS: IN FORCE</span>
        </p>
      </div>
    ));
  return (
    <>
      <pre className={s.banner} aria-label="Derya">{banner("DERYA")}</pre>
      <div className={s.row}>
        <span className={s.key}>MISSION</span>
        <p>{STATEMENT}</p>
      </div>
      <div className={s.row}>
        <span className={s.key}>WORK</span>
        <p>{SUPPORT}</p>
      </div>
      <div className={s.row}>
        <span className={s.key}>FACTS</span>
        <p>Every fact points to its source. Unknowns stay unknown.</p>
      </div>
      <div className={s.row}>
        <span className={s.key}>OUTPUT</span>
        <p>Held for a person to approve.</p>
      </div>
    </>
  );
}

export default async function Printout({ params }: Props) {
  const section = await sectionOf(params);
  const n = SECTIONS.indexOf(section) + 1;
  return (
    <div className={s.desk}>
      <div className={s.paper}>
        <div className={s.feed} aria-hidden="true" />
        <div className={s.sheet}>
          <header className={s.head}>
            <span>DERYA LABORATORIES</span>
            <span>RUN 26-001</span>
            <span>PAGE {String(n).padStart(4, "0")}</span>
          </header>
          <nav className={s.index}>
            <span className={s.key}>INDEX</span>
            <span className={s.links}>
              {SECTIONS.map((x, i) => (
                <Link key={x} href={href("printout", x)} className={x === section ? s.on : undefined}>
                  {String(i + 1).padStart(2, "0")} {x.toUpperCase()}
                </Link>
              ))}
            </span>
          </nav>
          <h1 className={s.title}>{TITLES[section].replace(/\.$/, "")}</h1>
          <Body section={section} />
          <p className={s.end}>*** END OF PAGE {String(n).padStart(4, "0")} ***</p>
        </div>
        <div className={s.feed} aria-hidden="true" />
      </div>
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
