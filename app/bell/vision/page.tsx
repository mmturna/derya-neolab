// Bell Labs version, vision: the same essay as the main site, printed in the terminal.
import type { Metadata } from "next";
import { VISION, VISION_TITLE } from "../../content";
import { Prompt, Terminal } from "../components/terminal";

export const metadata: Metadata = { title: "Vision | Derya Laboratories" };

export default function BellVision() {
  return (
    <Terminal active="vision">
      <Prompt command="cat vision.txt" />
      <section className="doc block">
        <h1>{VISION_TITLE.toUpperCase()}</h1>
        {VISION.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </Terminal>
  );
}
