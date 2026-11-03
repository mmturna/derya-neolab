// About: what the company is, who started it and where the name comes from.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";
import { ABOUT, ABOUT_TITLE } from "../content";

export const metadata: Metadata = { title: "About | Derya" };

export default function About() {
  return (
    <TextPage title={ABOUT_TITLE}>
      {ABOUT.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </TextPage>
  );
}
