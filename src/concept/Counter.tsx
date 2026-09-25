"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "./hooks";

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-IE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up to `value` the first time it scrolls into view. */
export default function Counter({
  value,
  duration = 1800,
  decimals = 0,
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.5 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduced || value === 0) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final figure, not every frame of the count. */}
      <span aria-hidden="true">{fmt(reduced ? value : shown, decimals)}</span>
      <span className="sr-only">{fmt(value, decimals)}</span>
    </span>
  );
}
