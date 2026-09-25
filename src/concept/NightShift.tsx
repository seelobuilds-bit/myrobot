"use client";

import { useRef } from "react";
import LoopVideo from "./LoopVideo";
import { segment, useStickyProgress } from "./hooks";
import { lanePath, lanePoint } from "./path";

const BEATS = [
  { from: 0, to: 0.3, lines: ["Your team", "clocks off."] },
  { from: 0.3, to: 0.62, lines: ["The fleet", "clocks on."] },
  { from: 0.62, to: 1.01, lines: ["By six, the", "floor is done."] },
];

const STATS = [
  { at: 0.12, value: "400%", label: "Efficiency improvement" },
  { at: 0.36, value: "24/7", label: "Autonomous operation" },
  { at: 0.58, value: "0 mm", label: "Edge cleaning distance" },
];

const MAP_BOX = [10, 10, 140, 60, 11] as const;
const MAP = lanePath(...MAP_BOX, 2.5);

const clock = (p: number) => {
  const minutes = (22 * 60 + Math.round(p * 480)) % (24 * 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/**
 * Scroll-driven "night shift": as the visitor scrolls, the clock runs from
 * 22:00 to 06:00, the route map fills in and the covered area counts up to
 * the 40,000 m² overnight figure.
 */
export default function NightShift() {
  const ref = useRef<HTMLElement>(null);
  const p = useStickyProgress(ref);
  const drive = segment(p, 0.05, 0.92);
  const area = Math.round(drive * 40000);
  const bot = lanePoint(...MAP_BOX, drive);

  return (
    <section ref={ref} data-nav="dark" className="relative h-[300svh] bg-night text-white" aria-label="The night shift">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <LoopVideo
          src="/concept/night.mp4"
          poster="/concept/night-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(110%_80%_at_65%_40%,rgb(5_7_13/0)_0%,rgb(5_7_13/0.55)_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/10 to-night/50" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(to_bottom,rgb(255_255_255/0.12)_0,rgb(255_255_255/0.12)_1px,transparent_1px,transparent_4px)]"
        />

        <div className="wrap relative flex h-full flex-col pb-8 pt-24 lg:pb-12 lg:pt-28">
          {/* HUD top row */}
          <div className="flex items-start justify-between gap-6">
            <div className="t-mono flex items-center gap-2.5 text-white/70">
              <span className="blink h-2 w-2 rounded-full bg-[#ff3b4e]" aria-hidden="true" />
              Night shift · live illustration
            </div>
            <div className="text-right">
              <p className="t-num text-[clamp(2.5rem,6vw,5.5rem)] text-white" aria-label={`Time ${clock(p)}`}>
                {clock(p)}
              </p>
              <div className="ml-auto mt-3 h-[3px] w-40 overflow-hidden rounded-full bg-white/15 lg:w-56">
                <div className="h-full bg-lidar" style={{ width: `${p * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="relative mt-auto grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative h-[2em] text-[clamp(2.6rem,6.8vw,7rem)] font-[620] leading-[0.95] tracking-[-0.045em] [font-stretch:108%]">
              {BEATS.map((beat) => {
                const visible = p >= beat.from && p < beat.to;
                return (
                  <p
                    key={beat.lines[0]}
                    aria-hidden={!visible}
                    className={`absolute inset-x-0 bottom-0 transition-[opacity,transform,filter] duration-700 ease-[var(--ease-out-expo)] ${
                      visible ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0 blur-sm"
                    }`}
                  >
                    {beat.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-night/50 p-5 backdrop-blur-md lg:p-6">
              <div className="flex items-center justify-between">
                <p className="t-mono text-white/55">Area covered</p>
                <p className="t-mono text-lidar">{p >= 0.92 ? "Complete" : p > 0.04 ? "Cleaning" : "Docked"}</p>
              </div>
              <p className="t-num mt-3 text-[clamp(2.4rem,4.4vw,4rem)]">
                {area.toLocaleString("en-IE")}
                <span className="ml-2 text-[0.45em] text-white/60">m²</span>
              </p>
              <svg viewBox="0 0 160 80" className="mt-4 w-full" aria-hidden="true">
                <defs>
                  <pattern id="ns-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M8 0H0V8" fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="158"
                  height="78"
                  rx="5"
                  fill="url(#ns-grid)"
                  stroke="rgb(255 255 255 / 0.18)"
                />
                <path d={MAP} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="0.8" strokeDasharray="1.5 2" />
                <path
                  d={MAP}
                  pathLength={1}
                  fill="none"
                  stroke="var(--color-lidar)"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - drive}
                  opacity="0.35"
                />
                <circle cx={bot.x} cy={bot.y} r="5" fill="var(--color-lidar)" opacity="0.25" />
                <circle cx={bot.x} cy={bot.y} r="2.4" fill="#fff" />
              </svg>
              <ul className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                {STATS.map((s) => (
                  <li
                    key={s.label}
                    className={`transition-opacity duration-700 ${p >= s.at ? "opacity-100" : "opacity-25"}`}
                  >
                    <p className="t-num text-xl lg:text-2xl">{s.value}</p>
                    <p className="mt-1.5 text-[0.72rem] leading-tight text-white/55">{s.label}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.68rem] leading-snug text-white/55">
                40,000 m² in a single overnight session: Beetle in AI spot-cleaning mode. Clock and map are
                illustrative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
