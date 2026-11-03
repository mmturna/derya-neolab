// Bell Labs versions index: the five takes, each a full four-page site.
import type { Metadata } from "next";
import Link from "next/link";
import { VERSIONS } from "./sections";
import s from "./index.module.css";

export const metadata: Metadata = { title: "Derya Laboratories" };

export default function BellIndex() {
  return (
    <main className={s.page}>
      <p className={s.head}>Derya Laboratories, five versions</p>
      <ol className={s.list}>
        {VERSIONS.map((v, i) => (
          <li key={v.slug}>
            <Link href={`/bell/${v.slug}/`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.thumb} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/bell/${v.slug}.jpg`} alt="" width={640} height={400} />
              <span className={s.n}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.name}>{v.name}</span>
              <span className={s.note}>{v.note}</span>
            </Link>
          </li>
        ))}
      </ol>
      <Link href="/" className={s.home}>Main site</Link>
    </main>
  );
}
