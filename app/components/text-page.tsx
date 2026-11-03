// Layout for the reading pages: header, a titled column of text, a low sea and the footer.
import { Sea } from "./sea";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function TextPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="page">
      <SiteHeader />
      <main className="reading">
        <h1 className="reading-title">{title}</h1>
        <div className="prose">{children}</div>
      </main>
      <Sea className="sea sea-low" />
      <SiteFooter />
    </div>
  );
}
