"use client";
// Manual version: wraps every page and lets a visitor switch between paper, green, blue and black.
import { createContext, useContext, useEffect, useRef } from "react";
import s from "./manual.module.css";

export const THEMES = ["paper", "green", "blue", "black"] as const;
type Theme = (typeof THEMES)[number];
const KEY = "derya-manual-theme";

const Ctx = createContext<(t: Theme) => void>(() => {});

export function ThemeShell({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const apply = (t: Theme) => {
    if (ref.current) ref.current.dataset.theme = t;
    try { localStorage.setItem(KEY, t); } catch {}
  };
  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
    if (saved && ref.current && (THEMES as readonly string[]).includes(saved)) ref.current.dataset.theme = saved;
  }, []);
  return (
    <Ctx.Provider value={apply}>
      <div ref={ref} data-theme="paper" className={`${className} ${s.root}`}>{children}</div>
    </Ctx.Provider>
  );
}

export function ThemePicker() {
  const apply = useContext(Ctx);
  return (
    <span className={s.themes} role="group" aria-label="Colour">
      {THEMES.map((t) => (
        <button key={t} type="button" data-t={t} onClick={() => apply(t)}>{t}</button>
      ))}
    </span>
  );
}
