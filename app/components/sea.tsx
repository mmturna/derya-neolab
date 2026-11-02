// Engraving-style sea: thin wave lines that bunch toward the horizon and drift slowly.
const PERIOD = 1440;
const LINES = 46;
const HEIGHT = 420;

function wavePath(index: number) {
  const depth = index / (LINES - 1);
  const y = HEIGHT * Math.pow(depth, 1.7);
  const amp = 1.2 + depth * 9;
  const phase = index * 1.9;
  const points: string[] = [];
  for (let x = 0; x <= PERIOD * 2; x += 12) {
    const t = (x / PERIOD) * Math.PI * 2;
    const dy =
      Math.sin(t * 3 + phase) * amp +
      Math.sin(t * 7 + phase * 0.6) * amp * 0.35 +
      Math.sin(t * 13 + phase * 1.3) * amp * 0.12;
    points.push(`${x === 0 ? "M" : "L"}${x} ${(y + dy).toFixed(2)}`);
  }
  return { d: points.join(" "), depth };
}

const WAVES = Array.from({ length: LINES }, (_, i) => wavePath(i));

export function Sea() {
  return (
    <svg className="sea" viewBox={`0 -12 ${PERIOD} ${HEIGHT + 24}`} preserveAspectRatio="none" aria-hidden="true">
      {WAVES.map((wave, i) => (
        <path
          key={i}
          d={wave.d}
          style={{
            animationDuration: `${Math.round(260 - wave.depth * 170)}s`,
            opacity: 0.25 + wave.depth * 0.55,
          }}
        />
      ))}
    </svg>
  );
}
