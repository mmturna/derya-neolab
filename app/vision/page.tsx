// Vision: the long-form case for why Derya exists and where it is going.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";
import { VISION, VISION_TITLE } from "../content";

export const metadata: Metadata = { title: "Vision | Derya" };

export default function Vision() {
  return (
    <TextPage title={VISION_TITLE}>
      {VISION.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </TextPage>
  );
}
