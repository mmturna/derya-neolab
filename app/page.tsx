// Home: a short statement over an engraved sea, with a way into the vision.
import Link from "next/link";
import { Sea } from "./components/sea";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="body">
        <h1 className="statement">Intelligence for the companies that build the physical world.</h1>
        <p className="sub">We are building agents that work beside the people who sell what factories make.</p>
        <Link href="/vision/" className="more">Read the vision</Link>
      </main>
      <Sea />
      <SiteFooter />
    </div>
  );
}
