// Striped globe: horizontal bands clipped to a circle, thin at the poles and thick at the equator.
const SIZE = 260;
const BANDS = [5, 7, 10, 14, 18, 21, 21, 18, 15, 12, 9, 6];
const GAP = (SIZE - 4 - BANDS.reduce((a, b) => a + b, 0)) / (BANDS.length - 1);

const RECTS = BANDS.map((height, i) => ({
  y: 2 + BANDS.slice(0, i).reduce((a, b) => a + b, 0) + i * GAP,
  height,
}));

export function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="globe-clip">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} />
        </clipPath>
      </defs>
      <g clipPath="url(#globe-clip)" fill="currentColor">
        {RECTS.map((rect) => (
          <rect key={rect.y} x="0" y={rect.y} width={SIZE} height={rect.height} />
        ))}
      </g>
    </svg>
  );
}
