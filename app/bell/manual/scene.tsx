"use client";
// Manual version: an animated ASCII sea on a character grid, with a cargo ship riding the swell and dolphins leaping past.
import { useEffect, useRef } from "react";
import s from "./manual.module.css";

type Mask = { rows: string[]; w: number; h: number };
const mask = (rows: string[]): Mask => ({ rows, w: Math.max(...rows.map((r) => r.length)), h: rows.length });

const SHIP = mask(
  (() => {
    const g = Array.from({ length: 11 }, () => Array(48).fill(" "));
    const fill = (r: number, a: number, b: number, ch: string) => { for (let c = a; c <= b; c++) g[r][c] = ch; };
    g[0][37] = "m";
    fill(1, 36, 37, "f"); fill(2, 36, 37, "f");
    for (let r = 3; r <= 6; r++) fill(r, 32, 41, "b");
    for (let c = 33; c <= 40; c += 2) g[4][c] = "w";
    for (let r = 4; r <= 6; r++) for (let k = 0; k < 9; k++) fill(r, 3 + k * 3, 5 + k * 3, String(((k * 2 + r) % 9) + 1));
    fill(7, 0, 47, "h"); fill(8, 1, 46, "h"); fill(9, 2, 44, "h"); fill(10, 4, 41, "h");
    [..."DERYA"].forEach((l, i) => (g[8][6 + i * 2] = l));
    return g.map((r) => r.join(""));
  })(),
);

const DOLPHIN_LEN = 36;

const tri = (x: number, y: number, a: number[], b: number[], c: number[]) => {
  const s1 = (x - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (y - b[1]);
  const s2 = (x - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (y - c[1]);
  const s3 = (x - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (y - a[1]);
  return !((s1 < 0 || s2 < 0 || s3 < 0) && (s1 > 0 || s2 > 0 || s3 > 0));
};

// Dolphin silhouette in body lengths: tail at x = -0.5, beak at x = +0.5, y points down.
function dolphinAt(x: number, y: number): 0 | 1 | 2 {
  if (Math.hypot(x - 0.31, y + 0.012) < 0.014) return 2;
  if (x > -0.42 && x < 0.38) {
    const u = (x + 0.02) / 0.42;
    const hw = 0.105 * Math.sqrt(Math.max(0, 1 - u * u * u * u)) * (x < 0 ? 1 - 0.45 * (-x / 0.42) : 1);
    if (y > -hw * 1.05 && y < hw * 0.95) return 1;
  }
  if (x >= 0.36 && x < 0.5 && y > -0.004 && y < 0.03) return 1;
  if (tri(x, y, [-0.08, -0.07], [0.1, -0.08], [-0.14, -0.22])) return 1;
  if (tri(x, y, [0.12, 0.05], [0.2, 0.05], [0.07, 0.15])) return 1;
  if (tri(x, y, [-0.39, 0], [-0.53, -0.11], [-0.47, 0.005])) return 1;
  if (tri(x, y, [-0.39, 0], [-0.53, 0.11], [-0.47, -0.005])) return 1;
  return 0;
}

const RAMP = "..--~-~=";
const BODY = "S%X8$S#X";

type Cell = { g: string; a: number; b: number; acc: boolean };
type Dolphin = { x: number; y: number; vx: number; vy: number; above: boolean };
type Bit = { x: number; y: number; vx: number; vy: number; life: number; max: number; g: string; grav: number };

export function Scene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cw = 10, ch = 15, cols = 0, rows = 0, dpr = 1;
    let grid: (Cell | null)[] = [];
    let fg = "#141414", acc = "#5b5fa8", family = "monospace";

    const readTheme = () => {
      const cs = getComputedStyle(canvas);
      fg = cs.getPropertyValue("--fg").trim() || fg;
      acc = cs.getPropertyValue("--accent").trim() || acc;
      family = cs.fontFamily || family;
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      cw = Math.max(5, Math.min(10, r.width / 98));
      ch = cw * 1.5;
      cols = Math.ceil(r.width / cw);
      rows = Math.ceil(r.height / ch);
      grid = new Array(cols * rows).fill(null);
    };
    resize();
    readTheme();
    let draw = () => {};
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const mo = new MutationObserver(readTheme);
    const shell = canvas.closest("[data-theme]");
    if (shell) mo.observe(shell, { attributes: true, attributeFilter: ["data-theme"] });

    const put = (c: number, r: number, cell: Cell) => {
      c = Math.floor(c); r = Math.floor(r);
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;
      grid[r * cols + c] = cell;
    };
    const sea = (x: number, t: number) =>
      rows * 0.66 + 1.1 * Math.sin(x * 0.085 - t * 1.25) + 0.6 * Math.sin(x * 0.21 + t * 0.85) + 0.35 * Math.sin(x * 0.035 - t * 0.4);

    const stamp = (m: Mask, cx: number, cy: number, ang: number, flip: boolean, fn: (k: string, mr: number, mc: number, c: number, r: number) => void) => {
      const k = ch / cw, cos = Math.cos(ang), sin = Math.sin(ang);
      const R = Math.hypot(m.w, m.h * k) / 2 + 1;
      for (let r = Math.floor(cy - R / k); r <= cy + R / k; r++) {
        for (let c = Math.floor(cx - R); c <= cx + R; c++) {
          let dx = c + 0.5 - cx;
          const dy = (r + 0.5 - cy) * k;
          if (flip) dx = -dx;
          const lx = dx * cos + dy * sin;
          const ly = -dx * sin + dy * cos;
          const mc = Math.floor(lx + m.w / 2);
          const mr = Math.floor(ly / k + m.h / 2);
          const key = m.rows[mr]?.[mc];
          if (key && key !== " ") fn(key, mr, mc, c, r);
        }
      }
    };

    const dolphins: Dolphin[] = [];
    const bits: Bit[] = [];
    const specks = Array.from({ length: 36 }, () => ({ x: Math.random(), y: Math.random() * 0.55, v: 0.004 + Math.random() * 0.01, g: Math.random() < 0.7 ? "-" : "." }));
    let nextPod = 0.8;
    const queue: { at: number; x: number; dir: number }[] = [];

    const splash = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++)
        bits.push({ x: x + (Math.random() - 0.5) * 4, y, vx: (Math.random() - 0.5) * 10, vy: -4 - Math.random() * 9, life: 0, max: 0.6 + Math.random() * 0.6, g: "'.*o"[i % 4], grav: 22 });
    };
    const leap = (x: number, dir: number, t: number) => {
      dolphins.push({ x, y: sea(x, t) + 3, vx: dir * (13 + Math.random() * 4), vy: -(16 + Math.random() * 3), above: false });
    };
    const pod = (t: number) => {
      const dir = Math.random() < 0.6 ? 1 : -1;
      const start = dir > 0 ? cols * (0.04 + Math.random() * 0.12) : cols * (0.36 + Math.random() * 0.06);
      const n = Math.random() < 0.6 ? 1 : 2;
      for (let i = 0; i < n; i++) queue.push({ at: t + i * 1.5, x: start, dir });
    };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / cw;
      leap(x, x < cols / 2 ? 1 : -1, last);
    };
    canvas.addEventListener("pointerdown", onDown);

    let last = 0;
    const step = (t: number, dt: number) => {
      if (t > nextPod) { pod(t); nextPod = t + 3.8 + Math.random() * 3; }
      for (let i = queue.length - 1; i >= 0; i--) if (queue[i].at <= t) { leap(queue[i].x, queue[i].dir, t); queue.splice(i, 1); }
      for (let i = dolphins.length - 1; i >= 0; i--) {
        const d = dolphins[i];
        d.x += d.vx * dt; d.vy += 17 * dt; d.y += d.vy * dt;
        const above = d.y < sea(d.x, t);
        if (above !== d.above) { splash(d.x, sea(d.x, t), above ? 8 : 12); d.above = above; }
        if ((d.vy > 0 && d.y > sea(d.x, t) + 7) || d.x < -30 || d.x > cols + 30) dolphins.splice(i, 1);
      }
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.life += dt; b.vy += b.grav * dt; b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.life > b.max) bits.splice(i, 1);
      }
    };

    const frame = (t: number) => {
      grid.fill(null);
      for (const p of specks) {
        const x = ((p.x - t * p.v) % 1 + 1) % 1;
        put(x * cols, p.y * rows, { g: p.g, a: 0.16, b: 0, acc: false });
      }
      for (let c = 0; c < cols; c++) {
        const h = sea(c + 0.5, t);
        const slope = sea(c + 1.5, t) - sea(c - 0.5, t);
        for (let r = Math.floor(h); r < rows; r++) {
          const d = r + 0.5 - h;
          if (d < 0) continue;
          if (d < 1) { put(c, r, { g: slope < -0.25 ? "^" : "~", a: 0.8, b: 0.1, acc: false }); continue; }
          const n = Math.sin(c * 0.09 + r * 1.9 + t * 0.7) * Math.sin(r * 0.83 + c * 0.021 - t * 0.4) + 0.3 * Math.sin(c * 0.27 - r * 0.5 + t * 1.3);
          const thr = 0.42 + d * 0.02;
          if (n <= thr) continue;
          const k = Math.min(1, (n - thr) / (1 - thr));
          const fade = 1 - Math.min(0.7, d / (rows * 0.4));
          put(c, r, { g: RAMP[Math.floor(k * (RAMP.length - 1))], a: (0.18 + 0.4 * k) * fade, b: 0.05 * k * fade, acc: k > 0.85 });
        }
      }

      const sx = cols * 0.7;
      const sy = sea(sx, t) - SHIP.h / 2 + 2.4;
      const sAng = Math.atan(((sea(sx + 12, t) - sea(sx - 12, t)) * ch) / (24 * cw)) * 0.7;
      if (!still && Math.random() < 0.7)
        bits.push({ x: sx - SHIP.w / 2 + Math.random() * 2, y: sea(sx - SHIP.w / 2, t) + Math.random(), vx: -5 - Math.random() * 5, vy: -0.5 + Math.random(), life: 0, max: 1.4 + Math.random(), g: "~-.~"[Math.floor(Math.random() * 4)], grav: 0 });
      stamp(SHIP, sx, sy, sAng, false, (key, mr, mc, c, r) => {
        const wet = r + 0.5 > sea(c + 0.5, t);
        let cell: Cell;
        if (key === "h") cell = { g: "#", a: 0.85, b: 0.24, acc: false };
        else if (key === "b") cell = { g: "@", a: 0.85, b: 0.2, acc: false };
        else if (key === "w") cell = { g: ".", a: 0.6, b: 0.04, acc: false };
        else if (key === "f") cell = { g: "|", a: 0.9, b: 0.32, acc: false };
        else if (key === "m") cell = { g: "|", a: 0.7, b: 0, acc: false };
        else if (key >= "1" && key <= "9") {
          const d = Number(key);
          cell = { g: "%8XS$&%8X"[d - 1], a: 0.75, b: 0.08 + (d % 3) * 0.07, acc: d % 2 === 0 };
        } else cell = { g: key, a: 1, b: 0.05, acc: false };
        if (wet) { cell.a *= 0.35; cell.b *= 0.4; }
        put(c, r, cell);
      });

      for (const d of dolphins) {
        const k = ch / cw;
        const dir = d.vx < 0 ? -1 : 1;
        const ang = Math.atan2(d.vy * k, Math.abs(d.vx));
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const R = DOLPHIN_LEN * 0.56;
        const inside = (c: number, r: number) => {
          const dx = (c + 0.5 - d.x) * dir, dy = (r + 0.5 - d.y) * k;
          return dolphinAt((dx * cos + dy * sin) / DOLPHIN_LEN, (-dx * sin + dy * cos) / DOLPHIN_LEN);
        };
        for (let r = Math.floor(d.y - R / k); r <= d.y + R / k; r++) {
          for (let c = Math.floor(d.x - R); c <= d.x + R; c++) {
            const v = inside(c, r);
            if (!v) continue;
            const dy = (r + 0.5 - d.y) * k;
            const dx = (c + 0.5 - d.x) * dir;
            const ly = (-dx * sin + dy * cos) / DOLPHIN_LEN;
            const edge = !inside(c + 1, r) || !inside(c - 1, r) || !inside(c, r + 1) || !inside(c, r - 1);
            const wet = r + 0.5 > sea(c + 0.5, t);
            const cell: Cell =
              v === 2 ? { g: "o", a: 1, b: 0.1, acc: false }
              : edge ? { g: ly > 0.02 ? "." : ":", a: 0.7, b: 0.12, acc: false }
              : { g: BODY[(r * 7 + c * 13) % BODY.length], a: 0.85, b: ly > 0.03 ? 0.14 : 0.32, acc: (r * 3 + c) % 7 === 0 };
            if (wet) { cell.a *= 0.22; cell.b *= 0.25; }
            put(c, r, cell);
          }
        }
      }
      for (const b of bits) {
        const f = 1 - b.life / b.max;
        put(b.x, b.y, { g: b.g, a: 0.75 * f, b: 0.06 * f, acc: false });
      }

      const W = canvas.width, H = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${Math.round(ch * 0.74)}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r * cols + c];
          if (!cell) continue;
          const col = cell.acc ? acc : fg;
          const x = c * cw, y = r * ch;
          if (cell.b > 0) { ctx.globalAlpha = cell.b; ctx.fillStyle = col; ctx.fillRect(x + 0.5, y + 0.5, cw - 1, ch - 1); }
          ctx.globalAlpha = cell.a; ctx.fillStyle = fg;
          ctx.fillText(cell.g, x + cw / 2, y + ch / 2 + 0.5);
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, prev = 0;
    if (still) {
      leap(cols * 0.12, 1, 0);
      for (let t = 0; t < 0.6; t += 1 / 30) step(t, 1 / 30);
      bits.length = 0;
      draw = () => frame(0.6);
      draw();
      return () => { ro.disconnect(); mo.disconnect(); canvas.removeEventListener("pointerdown", onDown); };
    }
    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop);
      const t = ms / 1000;
      if (t - prev < 1 / 30) return;
      const dt = Math.min(0.1, t - (prev || t));
      prev = t; last = t;
      step(t, dt);
      frame(t);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); canvas.removeEventListener("pointerdown", onDown); };
  }, []);

  return <canvas ref={ref} className={s.scene} role="img" aria-label="An ASCII cargo ship on a moving sea, with dolphins leaping alongside" />;
}
