// Bell Labs version, home: a system banner and a fetch-style readout of what Derya is.
import type { Metadata } from "next";
import { STATEMENT } from "../content";
import { Globe } from "./components/globe";
import { Prompt, Terminal } from "./components/terminal";

export const metadata: Metadata = { title: "Derya Laboratories" };

const BANNER = [
  ["INSTALLATION", "26-0001"],
  ["EQUIPMENT", "COMMERCIAL AGENT TERMINAL"],
  ["SERVICE", "DERYA"],
  ["OPERATING SYS", "SOURCE-CITED INTELLIGENCE"],
  ["MAINTENANCE", "A PERSON APPROVES EVERYTHING"],
];

const READOUT = [
  ["MISSION", STATEMENT],
  ["OPERATORS", "The people who sell what factories make"],
  ["FACTS", "Cited to source. Unknowns stay unknown"],
  ["RULES", "Written down. Models do not invent the numbers"],
  ["OUTBOUND", "Nothing leaves without a person saying yes"],
  ["KNOWLEDGE", "Each company keeps its own"],
];

export default function BellHome() {
  return (
    <Terminal active="home">
      <section className="block">
        <p>DERYA LABORATORIES</p>
        <p>INDUSTRIAL SYSTEMS DIVISION</p>
      </section>
      <dl className="block banner">
        {BANNER.map(([key, value]) => (
          <div key={key}>
            <dt>{key}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="block">ALL SYSTEMS NOMINAL.</p>
      <section className="block">
        <p>NOTICE:</p>
        <p>THIS TERMINAL SERVES THE COMPANIES</p>
        <p>THAT BUILD THE PHYSICAL WORLD.</p>
      </section>
      <p className="block">UNSOURCED FACTS ARE NOT PERMITTED.</p>
      <Prompt command="derya-fetch" />
      <section className="fetch block">
        <Globe className="globe" />
        <dl className="readout">
          {READOUT.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div className="gap">
            <dt>STATUS</dt>
            <dd>ALL SYSTEMS NOMINAL</dd>
          </div>
        </dl>
      </section>
    </Terminal>
  );
}
