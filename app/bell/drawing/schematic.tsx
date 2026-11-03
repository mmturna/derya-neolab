// Drawing version, sheet 1: a block diagram of how work moves from sources, through an agent, to a person.
const BOXES = [
  { x: 20, y: 70, w: 170, h: 120, title: "SOURCES", lines: ["EMAIL", "DOCUMENTS", "RECORDS"] },
  { x: 290, y: 70, w: 180, h: 120, title: "AGENT", lines: ["READS", "FINDS WHAT MATTERS", "PREPARES THE WORK"] },
  { x: 570, y: 70, w: 170, h: 120, title: "PERSON", lines: ["JUDGES", "APPROVES"] },
  { x: 290, y: 270, w: 180, h: 70, title: "RULES", lines: ["WRITTEN DOWN"] },
];

const BALLOONS = [
  { n: 1, x: 400, y: 54 },
  { n: 2, x: 655, y: 214 },
  { n: 3, x: 494, y: 305 },
  { n: 4, x: 128, y: 222 },
  { n: 5, x: 240, y: 156 },
];

export function Schematic() {
  return (
    <svg viewBox="0 0 900 380" role="img" aria-label="Sources feed an agent, rules constrain it, a person approves before anything goes out">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 1 L10 5 L0 9 Z" fill="currentColor" />
        </marker>
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="8" y="22" width="194" height="182" strokeDasharray="6 5" strokeWidth="1" />
        {BOXES.map((b) => (
          <rect key={b.title} x={b.x} y={b.y} width={b.w} height={b.h} />
        ))}
        <line x1="190" y1="130" x2="288" y2="130" markerEnd="url(#arrow)" />
        <line x1="470" y1="130" x2="568" y2="130" markerEnd="url(#arrow)" />
        <line x1="380" y1="270" x2="380" y2="192" markerEnd="url(#arrow)" />
        <line x1="740" y1="130" x2="878" y2="130" markerEnd="url(#arrow)" />
        <path d="M380 70 V40 H105 V68" strokeDasharray="4 4" markerEnd="url(#arrow)" />
        {BALLOONS.map((b) => (
          <circle key={b.n} cx={b.x} cy={b.y} r="11" />
        ))}
      </g>
      <g fill="currentColor" stroke="none" fontFamily="inherit" letterSpacing="0.08em">
        {BOXES.map((b) => (
          <g key={b.title}>
            <text x={b.x + 12} y={b.y + 24} fontSize="15" fontWeight="500">{b.title}</text>
            {b.lines.map((line, i) => (
              <text key={line} x={b.x + 12} y={b.y + 52 + i * 20} fontSize="13" opacity="0.85">{line}</text>
            ))}
          </g>
        ))}
        <text x="752" y="118" fontSize="13">TO CUSTOMER</text>
        <text x="752" y="152" fontSize="13">OR SUPPLIER</text>
        <text x="216" y="32" fontSize="11" opacity="0.8">EVERY FACT CITES ITS SOURCE</text>
        <text x="20" y="226" fontSize="11" opacity="0.8">ONE COMPANY</text>
        {BALLOONS.map((b) => (
          <text key={b.n} x={b.x} y={b.y + 4.5} fontSize="12" textAnchor="middle">{b.n}</text>
        ))}
      </g>
    </svg>
  );
}
