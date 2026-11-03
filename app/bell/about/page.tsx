// Bell Labs version, about: the same text as the main site, printed in the terminal.
import type { Metadata } from "next";
import { ABOUT, ABOUT_TITLE } from "../../content";
import { Prompt, Terminal } from "../components/terminal";

export const metadata: Metadata = { title: "About | Derya Laboratories" };

export default function BellAbout() {
  return (
    <Terminal active="about">
      <Prompt command="cat about.txt" />
      <section className="doc block">
        <h1>{ABOUT_TITLE.toUpperCase()}</h1>
        {ABOUT.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </Terminal>
  );
}
