"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FLEET, robotHref, type Mode } from "./data";
import { useInView } from "./hooks";
import { Check } from "./ui";

type MetricKey = "capacity" | "runtime" | "passWidth";

const METRICS: { key: MetricKey; label: string; unit: string; hint: string; lowerIsBetter?: boolean }[] = [
  { key: "capacity", label: "Cleaning capacity", unit: "m²/h", hint: "Maximum rated area per hour" },
  { key: "runtime", label: "Runtime", unit: "h", hint: "Longest runtime on the spec sheet" },
  {
    key: "passWidth",
    label: "Tightest aisle",
    unit: "mm",
    hint: "Minimum pass width, narrower reaches further",
    lowerIsBetter: true,
  },
];

const MODES: Mode[] = ["Scrub", "Sweep", "Vacuum", "Dust mop"];

// Side-by-side comparison of the range: animated bars for one metric at a
// time, plus a capability matrix. Figures come from each robot's spec table.
export default function SpecCompare() {
  const [metric, setMetric] = useState<MetricKey>("capacity");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.25 });
  const m = METRICS.find((x) => x.key === metric)!;
  const values = FLEET.map((r) => r.meta.metrics[metric]).filter((v): v is number => v !== null);
  const max = Math.max(...values);

  const rows = [...FLEET].sort((a, b) => {
    const va = a.meta.metrics[metric];
    const vb = b.meta.metrics[metric];
    if (va === null) return 1;
    if (vb === null) return -1;
    return m.lowerIsBetter ? va - vb : vb - va;
  });

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[2rem] border border-rule bg-surface p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Compare by" className="flex flex-wrap gap-1 rounded-full bg-paper p-1">
            {METRICS.map((x) => (
              <button
                key={x.key}
                role="tab"
                type="button"
                aria-selected={metric === x.key}
                onClick={() => setMetric(x.key)}
                className={`rounded-full px-4 py-2 text-sm font-[540] transition-colors ${
                  metric === x.key ? "bg-ink text-on-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <p className="t-mono hidden text-steel sm:block">{m.hint}</p>
        </div>

        <ul className="mt-8 space-y-3" role="tabpanel">
          {rows.map((r, i) => {
            const v = r.meta.metrics[metric];
            const note =
              metric === "capacity"
                ? r.meta.metrics.capacityNote
                : metric === "runtime"
                  ? r.meta.metrics.runtimeNote
                  : undefined;
            const width = v === null ? 0 : m.lowerIsBetter ? (Math.min(...values) / v) * 100 : (v / max) * 100;
            return (
              <li key={r.slug}>
                <Link
                  href={robotHref(r.slug)}
                  className="group grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4"
                >
                  <span className="truncate font-[560] transition-colors group-hover:text-signal-ink">{r.name}</span>
                  <span className="flex h-10 min-w-0 items-center gap-3">
                    {v !== null && (
                      <span
                        className="h-full shrink-0 rounded-xl bg-signal transition-[width,background-color] duration-1000 ease-[var(--ease-out-expo)] group-hover:bg-ink"
                        style={{
                          width: inView ? `calc(${Math.max(width, 4)}% * 0.6)` : "0%",
                          transitionDelay: `${i * 60}ms`,
                        }}
                      />
                    )}
                    <span className={`whitespace-nowrap text-sm ${v === null ? "text-steel" : "font-[560]"}`}>
                      {v === null ? "Not on the spec sheet" : `${v.toLocaleString("en-IE")} ${m.unit}`}
                      {note && v !== null && (
                        <span className="ml-1.5 hidden font-normal text-steel sm:inline">{note}</span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative overflow-x-auto rounded-[2rem] border border-rule bg-surface p-5 sm:p-8">
        <table className="w-full min-w-[26rem] text-left text-sm">
          <caption className="t-mono pb-5 text-left text-steel">Cleaning modes</caption>
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className="pb-3 font-[560]">
                Robot
              </th>
              {MODES.map((mode) => (
                <th key={mode} scope="col" className="pb-3 text-center font-[560]">
                  {mode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FLEET.map((r) => (
              <tr key={r.slug} className="border-b border-rule last:border-0">
                <th scope="row" className="py-3 font-normal">
                  <Link href={robotHref(r.slug)} className="flex items-center gap-3 hover:text-signal-ink">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-mist">
                      <Image
                        src={r.hero.src}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover"
                        style={{ objectPosition: r.meta.focus }}
                      />
                    </span>
                    {r.name}
                  </Link>
                </th>
                {MODES.map((mode) => (
                  <td key={mode} className="py-3 text-center">
                    {r.meta.modes.includes(mode) ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-signal-soft text-signal-ink">
                        <Check className="h-3.5 w-3.5" />
                        <span className="sr-only">Yes</span>
                      </span>
                    ) : (
                      <>
                        <span className="text-rule" aria-hidden="true">
                          —
                        </span>
                        <span className="sr-only">No</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
