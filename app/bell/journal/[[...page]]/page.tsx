// Journal version: the home page is the cover and contents of a technical journal, the other pages are its articles.
import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, ABOUT_TITLE, PRINCIPLES, PRINCIPLES_TITLE, STATEMENT, VISION, VISION_TITLE } from "../../../content";
import { type Section, href, sectionOf, sectionParams } from "../../sections";
import s from "../journal.module.css";

export const dynamicParams = false;
export const generateStaticParams = sectionParams;

const ARTICLES: { section: Section; title: string; page: number; abstract: string }[] = [
  {
    section: "vision",
    title: VISION_TITLE,
    page: 1,
    abstract: "On the commercial knowledge of industrial companies, where it lives, and the systems that could keep it.",
  },
  {
    section: "principles",
    title: PRINCIPLES_TITLE,
    page: 9,
    abstract: "Five rules followed by every agent Derya runs, and the reasons for each.",
  },
  { section: "about", title: ABOUT_TITLE, page: 13, abstract: "A note on the company and its name." },
];

type Props = { params: Promise<{ page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = await sectionOf(params);
  const article = ARTICLES.find((x) => x.section === section);
  return { title: article ? `${article.title} | The Derya Technical Journal` : "The Derya Technical Journal" };
}

const trim = (t: string) => t.replace(/\.$/, "");

function Cover() {
  return (
    <div className={s.cover}>
      <div className={s.mast}>
        <p className={s.small}>The</p>
        <h1>Derya Technical Journal</h1>
        <p className={s.devoted}>
          devoted to the {trim(STATEMENT).replace(/^Intelligence for/, "intelligence of")}
        </p>
      </div>
      <p className={s.vol}>
        <span>Volume I</span>
        <span>2026</span>
        <span>Number 1</span>
      </p>
      <ol className={s.toc}>
        {ARTICLES.map((a) => (
          <li key={a.section}>
            <Link href={href("journal", a.section)}>
              <span className={s.tt}>{trim(a.title)}</span>
              <span className={s.lead} />
              <span>{a.page}</span>
            </Link>
            <span className={s.by}>M. Turna</span>
          </li>
        ))}
      </ol>
      <p className={s.copy}>Published by Derya Laboratories</p>
    </div>
  );
}

function Article({ section }: { section: Section }) {
  const a = ARTICLES.find((x) => x.section === section)!;
  return (
    <article className={s.article}>
      <header className={s.running}>
        <span>{a.page}</span>
        <Link href={href("journal", "home")}>The Derya Technical Journal, 2026</Link>
      </header>
      <h1 className={s.title}>{trim(a.title)}</h1>
      <p className={s.author}>By M. TURNA</p>
      <p className={s.abstract}>{a.abstract}</p>
      <div className={s.cols}>
        {section === "vision" && VISION.map((p, i) => <p key={i}>{p}</p>)}
        {section === "about" && ABOUT.map((p, i) => <p key={i}>{p}</p>)}
        {section === "principles" &&
          PRINCIPLES.map((p, i) => (
            <section key={p.name}>
              <h2>
                {["I", "II", "III", "IV", "V"][i]}. {p.name}
              </h2>
              <p>{p.text}</p>
            </section>
          ))}
      </div>
      <nav className={s.next}>
        {ARTICLES.filter((x) => x.section !== section).map((x) => (
          <Link key={x.section} href={href("journal", x.section)}>
            {trim(x.title)}, p. {x.page}
          </Link>
        ))}
        <Link href={href("journal", "home")}>Contents</Link>
      </nav>
    </article>
  );
}

export default async function Journal({ params }: Props) {
  const section = await sectionOf(params);
  return (
    <div className={section === "home" ? `${s.page} ${s.buff}` : s.page}>
      {section === "home" ? <Cover /> : <Article section={section} />}
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
