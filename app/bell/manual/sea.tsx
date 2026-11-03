"use client";
// Manual version: an ASCII cargo ship over an ASCII sea that rolls slowly. Still for reduced motion.
import { useEffect, useState } from "react";
import s from "./manual.module.css";

const COLS = 200;
const ROWS = 6;

const SHIP = [
  "                                                                  |",
  "                                                                __|__",
  "                                                               |     |",
  "          ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___       ___|_____|___",
  "         |___|___|___|___|___|___|___|___|___|___|___|     |  []  []  [] |",
  "         |___|___|___|___|___|___|___|___|___|___|___|     |  []  []  [] |",
  "    _____|___|___|___|___|___|___|___|___|___|___|___|_____|_____________|____",
  "    \\                                                                       /",
  "     \\     D E R Y A                                                     o /",
  "      \\_____________________________________________________________________/",
];
const WIDTH = Math.max(...SHIP.map((l) => l.length));

function sea(t: number) {
  const rows: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    let line = "";
    for (let c = 0; c < COLS; c++) {
      const v = Math.sin(c * 0.23 + t * 0.9 + r * 1.7) + 0.6 * Math.sin(c * 0.09 - t * 0.35 + r * 0.9);
      const edge = 1.25 - r * 0.1;
      line += v > edge ? "^" : v > 0.3 + r * 0.1 ? "~" : v > -0.5 && r < 2 ? "-" : " ";
    }
    rows.push(line);
  }
  return rows.join("\n");
}

export function Ship() {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setT((x) => x + 0.2), 200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className={s.art} aria-label="An ASCII drawing of a cargo ship on the sea" role="img">
      <pre className={s.ship}>{SHIP.map((l) => l.padEnd(WIDTH)).join("\n")}</pre>
      <pre className={s.sea}>{sea(t)}</pre>
    </div>
  );
}
