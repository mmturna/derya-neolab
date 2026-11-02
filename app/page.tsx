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
        <a href="https://app.derya.ai">Sign in</a>
      </header>

      <main className="body">
        <h1 className="statement">
          Agents for the quoting and bidding work of industrial manufacturers.
        </h1>
        <dl className="lines">
          <div>
            <dt>Quotes</dt>
            <dd>An RFQ email becomes a priced quote, checked by a person.</dd>
          </div>
          <div>
            <dt>Bids</dt>
            <dd>A tender becomes a set of requirements, each tied to its page.</dd>
          </div>
        </dl>
      </main>

      <Sea />

      <footer className="bottom">
        <span>© 2026</span>
        <span className="aside">derya, n. the sea</span>
      </footer>
    </div>
  );
}
