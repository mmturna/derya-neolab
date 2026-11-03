// Principles: the rules every Derya agent is built to follow.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";

export const metadata: Metadata = { title: "Principles | Derya" };

const PRINCIPLES = [
  {
    name: "Sources first",
    text: "Every fact an agent uses points to the page, message or record it came from. What cannot be found stays unknown. It is never guessed.",
  },
  {
    name: "People decide",
    text: "Agents prepare the work. A person approves anything that reaches a customer or a supplier.",
  },
  {
    name: "Rules are written down",
    text: "Prices and commitments come from the company's own rules, kept as plain, predictable logic. Models read, draft and explain. They do not invent the numbers.",
  },
  {
    name: "Each company is its own world",
    text: "What one manufacturer teaches Derya stays with that manufacturer.",
  },
  {
    name: "Meet the work where it is",
    text: "Commercial work lives in email and documents. Derya reads it there instead of asking a team to move.",
  },
];

export default function Principles() {
  return (
    <TextPage title="How our agents work.">
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
