// Interior page opening: oversized title on the left, short statement and actions on the right.
import type { ReactNode } from "react";

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="page-intro">
      <h1 className="page-title">{title}</h1>
      <div className="page-intro-body">{children}</div>
    </section>
  );
}
