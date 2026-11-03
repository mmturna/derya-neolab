// Principles: the rules every Derya agent is built to follow.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";
import { PRINCIPLES, PRINCIPLES_TITLE } from "../content";

export const metadata: Metadata = { title: "Principles | Derya" };

export default function Principles() {
  return (
    <TextPage title={PRINCIPLES_TITLE}>
      <ol className="principles">
        {PRINCIPLES.map((principle) => (
          <li key={principle.name}>
            <h2>{principle.name}</h2>
            <p>{principle.text}</p>
          </li>
        ))}
      </ol>
    </TextPage>
  );
}
