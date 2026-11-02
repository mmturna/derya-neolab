// Home: the whole site on one quiet page, a short statement over an engraved sea.
import { Mark } from "./components/mark";
import { Sea } from "./components/sea";

export default function Home() {
  return (
    <div className="page">
      <header className="top">
        <span className="brand">
          <Mark className="mark" />
          Derya
        </span>
      </header>

      <main className="body">
        <h1 className="statement">Intelligence for the companies that build the physical world.</h1>
        <p className="sub">We are building agents that work beside the people who sell what factories make.</p>
      </main>

      <Sea />

      <footer className="bottom">
        <span>© 2026</span>
        <span className="aside">derya, n. the sea</span>
      </footer>
    </div>
  );
}
