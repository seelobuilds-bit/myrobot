// Dot-matrix map of Ireland with routes out from the Kilmallock base.
// The outline is a simplified coastline (lat, lon); dots are computed once at
// build time, so this stays a server component with CSS-only animation.

const COAST: [number, number][] = [
  [55.38, -7.37],
  [55.22, -6.95],
  [55.2, -6.65],
  [55.24, -6.51],
  [55.23, -6.15],
  [55.19, -6.06],
  [54.85, -5.8],
  [54.77, -5.69],
  [54.71, -5.8],
  [54.66, -5.67],
  [54.5, -5.45],
  [54.38, -5.55],
  [54.26, -5.61],
  [54.21, -5.89],
  [54.06, -6.0],
  [54.03, -6.18],
  [53.95, -6.35],
  [53.79, -6.22],
  [53.72, -6.25],
  [53.58, -6.1],
  [53.38, -6.05],
  [53.33, -6.2],
  [53.27, -6.1],
  [53.2, -6.09],
  [52.97, -5.99],
  [52.8, -6.14],
  [52.56, -6.19],
  [52.34, -6.4],
  [52.25, -6.34],
  [52.17, -6.36],
  [52.17, -6.59],
  [52.12, -6.93],
  [52.15, -7.15],
  [52.08, -7.6],
  [51.95, -7.72],
  [51.95, -7.85],
  [51.79, -8.25],
  [51.6, -8.53],
  [51.6, -8.88],
  [51.53, -8.95],
  [51.48, -9.37],
  [51.45, -9.82],
  [51.55, -9.85],
  [51.68, -9.45],
  [51.6, -10.22],
  [51.85, -9.75],
  [51.78, -10.34],
  [51.93, -10.35],
  [52.1, -9.8],
  [52.1, -10.46],
  [52.28, -10.23],
  [52.27, -9.85],
  [52.42, -9.94],
  [52.51, -9.67],
  [52.58, -9.37],
  [52.56, -9.93],
  [52.68, -9.65],
  [52.85, -9.44],
  [52.97, -9.43],
  [53.15, -9.27],
  [53.27, -9.05],
  [53.24, -9.3],
  [53.32, -9.85],
  [53.4, -10.2],
  [53.49, -10.02],
  [53.6, -9.9],
  [53.76, -9.8],
  [53.8, -9.52],
  [53.96, -10.1],
  [54.22, -10.0],
  [54.3, -9.99],
  [54.33, -9.83],
  [54.32, -9.35],
  [54.22, -9.2],
  [54.28, -8.6],
  [54.47, -8.45],
  [54.48, -8.28],
  [54.65, -8.11],
  [54.63, -8.44],
  [54.63, -8.7],
  [54.66, -8.79],
  [54.71, -8.73],
  [54.79, -8.5],
  [54.83, -8.56],
  [54.93, -8.46],
  [55.0, -8.53],
  [55.15, -8.28],
  [55.22, -7.98],
  [55.18, -7.85],
  [55.28, -7.63],
  [55.1, -7.5],
  [55.28, -7.52],
];

const LAT0 = 55.5;
const LON0 = -10.6;
const K = 100;
const COS = Math.cos((53.4 * Math.PI) / 180);

const project = (lat: number, lon: number): [number, number] => [(lon - LON0) * COS * K, (LAT0 - lat) * K];

const POLY = COAST.map(([lat, lon]) => project(lat, lon));

function inside([x, y]: [number, number]) {
  let hit = false;
  for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
    const [xi, yi] = POLY[i];
    const [xj, yj] = POLY[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const W = 5.4 * COS * K;
const H = 4.25 * K;
const STEP = 9.5;

const DOTS: [number, number][] = [];
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    if (inside([x, y])) DOTS.push([x, y]);
  }
}

const BASE = project(52.4, -8.58);

const CITIES = [
  { name: "Dublin", at: project(53.35, -6.26) },
  { name: "Cork", at: project(51.9, -8.47) },
  { name: "Galway", at: project(53.27, -9.05) },
  { name: "Waterford", at: project(52.26, -7.11) },
  { name: "Sligo", at: project(54.27, -8.47) },
  { name: "Athlone", at: project(53.42, -7.94) },
  { name: "Letterkenny", at: project(54.95, -7.73) },
  { name: "Kilkenny", at: project(52.65, -7.25) },
];

function arc([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const bend = Math.min(60, len * 0.28);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${(mx - (dy / len) * bend).toFixed(1)} ${(my + (dx / len) * bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export default function IrelandMap({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const dot = dark ? "rgb(255 255 255 / 0.22)" : "var(--map-dot)";
  const label = dark ? "fill-white/60" : "fill-ink-soft";
  return (
    <svg
      viewBox={`0 0 ${W.toFixed(0)} ${H.toFixed(0)}`}
      className={className}
      role="img"
      aria-label="Map of Ireland showing NOLAR's base in Kilmallock, Co. Limerick, with deployments across the country"
    >
      <g fill={dot}>
        {DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.1" />
        ))}
      </g>
      <g fill="none" stroke="var(--color-signal)" strokeWidth="1.6" strokeLinecap="round">
        {CITIES.map((c, i) => (
          <path
            key={c.name}
            d={arc(BASE, c.at)}
            pathLength={1}
            className="map-arc"
            style={{ animationDelay: `${300 + i * 140}ms` }}
          />
        ))}
      </g>
      {CITIES.map((c, i) => (
        <g key={c.name} className="map-city" style={{ animationDelay: `${900 + i * 140}ms` }}>
          <circle cx={c.at[0]} cy={c.at[1]} r="4" fill="var(--color-signal)" />
          <text
            x={c.at[0] + 8}
            y={c.at[1] + 3.5}
            className={`${label} font-mono text-[9px] uppercase tracking-[0.12em]`}
          >
            {c.name}
          </text>
        </g>
      ))}
      <g transform={`translate(${BASE[0]} ${BASE[1]})`}>
        <circle
          r="7"
          fill="var(--color-signal)"
          className="ping"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle r="7" fill="var(--color-signal)" />
        <circle r="2.6" fill="#fff" />
        <text
          x="-12"
          y="4"
          textAnchor="end"
          className={`${dark ? "fill-white" : "fill-ink"} font-sans text-[12px] font-semibold`}
        >
          Kilmallock
        </text>
      </g>
    </svg>
  );
}
