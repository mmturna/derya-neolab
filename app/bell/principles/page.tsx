// Bell Labs version, principles: the same rules as the main site, printed in the terminal.
import type { Metadata } from "next";
import { PRINCIPLES, PRINCIPLES_TITLE } from "../../content";
import { Prompt, Terminal } from "../components/terminal";

export const metadata: Metadata = { title: "Principles | Derya Laboratories" };

export default function BellPrinciples() {
  return (
    <Terminal active="principles">
      <Prompt command="cat principles.txt" />
      <section className="doc block">
        <h1>{PRINCIPLES_TITLE.toUpperCase()}</h1>
        <ol className="rules">
          {PRINCIPLES.map((principle, i) => (
            <li key={principle.name}>
              <h2>
                {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{principle.name.toUpperCase()}
              </h2>
              <p>{principle.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </Terminal>
  );
}
