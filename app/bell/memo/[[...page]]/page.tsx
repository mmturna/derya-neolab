// Memorandum version: the home page is a typed memo for file, the other pages are its attachments.
import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "../../../components/mark";
import { ABOUT, ABOUT_TITLE, PRINCIPLES, PRINCIPLES_TITLE, STATEMENT, SUPPORT, VISION, VISION_TITLE } from "../../../content";
import { type Section, href, sectionOf, sectionParams } from "../../sections";
import s from "../memo.module.css";

export const dynamicParams = false;
export const generateStaticParams = sectionParams;

const ATTACHMENTS: { section: Section; letter: string; title: string }[] = [
  { section: "vision", letter: "A", title: VISION_TITLE },
  { section: "principles", letter: "B", title: PRINCIPLES_TITLE },
  { section: "about", letter: "C", title: ABOUT_TITLE },
];

type Props = { params: Promise<{ page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = await sectionOf(params);
  const att = ATTACHMENTS.find((a) => a.section === section);
  return { title: att ? `Attachment ${att.letter} | Derya Laboratories` : "Memorandum | Derya Laboratories" };
}

function Body({ section }: { section: Section }) {
  if (section === "vision") return VISION.map((p, i) => <p key={i}><span className={s.num}>{i + 1}.</span>{p}</p>);
  if (section === "about") return ABOUT.map((p, i) => <p key={i}><span className={s.num}>{i + 1}.</span>{p}</p>);
  if (section === "principles")
    return PRINCIPLES.map((p, i) => (
      <p key={p.name}>
        <span className={s.num}>{i + 1}.</span>
        <u>{p.name}.</u> {p.text}
      </p>
    ));
  return (
    <>
      <p><span className={s.num}>1.</span>{SUPPORT}</p>
      <p><span className={s.num}>2.</span>The attached papers set out why we are doing this, the rules our agents work by, and a short note on the company.</p>
    </>
  );
}

export default async function Memo({ params }: Props) {
  const section = await sectionOf(params);
  const att = ATTACHMENTS.find((a) => a.section === section);
  return (
    <div className={s.desk}>
      <article className={s.sheet}>
        <header className={s.head}>
          <Link href={href("memo", "home")} className={s.org}>
            <Mark />
            <span>Derya</span>
            <span>Laboratories</span>
          </Link>
          <dl className={s.fields}>
            <dt>subject:</dt>
            <dd>{att ? att.title.replace(/\.$/, "") : STATEMENT.replace(/\.$/, "")}</dd>
            <dt>date:</dt>
            <dd>2026</dd>
            <dt>from:</dt>
            <dd>M. Turna</dd>
            <dt>file:</dt>
            <dd>MM-26-001{att ? ` / Att. ${att.letter}` : ""}</dd>
          </dl>
        </header>
        <h1 className={s.kind}>{att ? `Attachment ${att.letter}` : "Memorandum for File"}</h1>
        <div className={s.body}>
          <Body section={section} />
        </div>
        <p className={s.sign}>M. TURNA</p>
        <footer className={s.foot}>
          <p className={s.label}>{att ? "Memorandum and attachments:" : "Att."}</p>
          <ul className={s.list}>
            {!att ? null : (
              <li>
                <Link href={href("memo", "home")}>Memorandum for File</Link>
              </li>
            )}
            {ATTACHMENTS.map((a) => (
              <li key={a.letter} className={a.section === section ? s.here : undefined}>
                <Link href={href("memo", a.section)}>
                  {a.letter}. {a.title.replace(/\.$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </article>
      <Link href="/bell/" className={s.back}>other versions</Link>
    </div>
  );
}
