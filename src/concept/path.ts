/**
 * A back-and-forth ("lawnmower") route, the pattern a cleaning robot drives
 * to cover a floor, as an SVG path. Draw it with pathLength="1" and animate
 * stroke-dashoffset from 1 to 0 to "drive" it.
 */
export function lanePath(x: number, y: number, w: number, h: number, lanes: number, radius = 0) {
  const gap = lanes > 1 ? h / (lanes - 1) : 0;
  const r = Math.min(radius, gap / 2);
  const right = x + w;
  let d = `M${x} ${y}`;
  for (let i = 0; i < lanes; i++) {
    const rowY = y + i * gap;
    const last = i === lanes - 1;
    const goingRight = i % 2 === 0;
    const end = goingRight ? right : x;
    const inset = last ? 0 : goingRight ? -r : r;
    d += ` L${end + inset} ${rowY}`;
    if (!last) {
      const nextY = rowY + gap;
      const back = goingRight ? -r : r;
      d += ` Q${end} ${rowY} ${end} ${rowY + r} L${end} ${nextY - r} Q${end} ${nextY} ${end + back} ${nextY}`;
    }
  }
  return d;
}

/** Point at fraction t (0–1) along a square-cornered lane route, for markers. */
export function lanePoint(x: number, y: number, w: number, h: number, lanes: number, t: number) {
  const gap = lanes > 1 ? h / (lanes - 1) : 0;
  const total = lanes * w + (lanes - 1) * gap;
  let d = Math.min(1, Math.max(0, t)) * total;
  for (let i = 0; i < lanes; i++) {
    const rowY = y + i * gap;
    const goingRight = i % 2 === 0;
    if (d <= w) return { x: goingRight ? x + d : x + w - d, y: rowY };
    d -= w;
    if (i < lanes - 1) {
      if (d <= gap) return { x: goingRight ? x + w : x, y: rowY + d };
      d -= gap;
    }
  }
  return { x: (lanes - 1) % 2 === 0 ? x + w : x, y: y + h };
}
