// About: what the company is, who started it and where the name comes from.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";

export const metadata: Metadata = { title: "About | Derya" };

export default function About() {
  return (
    <TextPage title="A small company working on an old industry.">
      <p>
        Derya builds agents for the commercial side of industrial manufacturing. It was founded by Mert Turna. We are
        early, and deliberately small.
      </p>
      <p>
        The name is the Turkish word for the sea. Most of what factories make crosses one on the way to where it is
        used.
      </p>
    </TextPage>
  );
}
