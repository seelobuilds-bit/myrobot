"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "./hooks";
import { lanePath } from "./path";

const ROUTE = lanePath(64, 58, 452, 214, 9, 13);
const CYCLE_MS = 19000;
const HOLD_MS = 2600;
const AREA = 1240;
/** Where the robot sits, static, for visitors who prefer reduced motion. */
const REDUCED_FRAME = 0.62;

const SCHEDULE = [
  { time: "22:00", task: "Main floor · scrub", state: "now" },
  { time: "02:30", task: "Aisles 1–6 · sweep", state: "next" },
  { time: "05:15", task: "Entrance · dust mop", state: "later" },
];

// Illustrative fleet-app dashboard: a robot drives its route across a floor
// plan while the task figures and alerts update alongside it.
export default function CloudDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cleanRef = useRef<SVGPathElement>(null);
  const robotRef = useRef<SVGGElement>(null);
  const inView = useInView(wrapRef, { once: false, threshold: 0.2 });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState<null | { title: string; text: string }>(null);

  useEffect(() => {
    const path = pathRef.current;
    const clean = cleanRef.current;
    const robot = robotRef.current;
    if (!path || !clean || !robot) return;
    const total = path.getTotalLength();

    const place = (p: number) => {
      const at = path.getPointAtLength(p * total);
      const ahead = path.getPointAtLength(Math.min(total, p * total + 2));
      const angle = (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
      robot.setAttribute("transform", `translate(${at.x} ${at.y}) rotate(${angle})`);
      clean.style.strokeDashoffset = String(1 - p);
    };

    if (reduced || !inView) {
      place(reduced ? REDUCED_FRAME : progress);
      return;
    }

    let frame = 0;
    let lastUi = 0;
    let spotShown = false;
    const start = performance.now() - progress * CYCLE_MS;
    const tick = (now: number) => {
      const elapsed = (now - start) % (CYCLE_MS + HOLD_MS);
      const p = Math.min(1, elapsed / CYCLE_MS);
      place(p);
      if (now - lastUi > 120) {
        lastUi = now;
        setProgress(p);
        if (p > 0.38 && p < 0.52 && !spotShown) {
          spotShown = true;
          setToast({ title: "Spot detected · Aisle 3", text: "Dirty area found. Cleaning it before moving on." });
        } else if (p >= 0.52 && p < 1 && spotShown) {
          setToast(null);
        } else if (p >= 1) {
          setToast({
            title: "Task complete · Main floor",
            text: `${AREA.toLocaleString("en-IE")} m² cleaned. Returning to dock.`,
          });
        } else if (p < 0.05) {
          spotShown = false;
          setToast(null);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // progress is only read to resume where we left off
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  const shown = reduced ? REDUCED_FRAME : progress;
  const pct = Math.round(shown * 100);
  const battery = Math.round(96 - shown * 31);
  const water = Math.round(100 - shown * 58);
  const status = shown >= 1 ? "Returning to dock" : shown > 0.38 && shown < 0.52 ? "Spot cleaning" : "Cleaning";

  return (
    <div
      ref={wrapRef}
      className="@container relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-night-2 text-white shadow-[0_40px_120px_-40px_rgb(35_64_255/0.45)]"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="t-mono ml-3 text-white/55">Fleet · Kilmallock Retail Park</span>
        <span className="t-mono ml-auto hidden text-white/55 sm:inline">Illustrative interface</span>
      </div>

      <div className="grid @2xl:grid-cols-[1.6fr_1fr]">
        {/* Map */}
        <div className="relative border-b border-white/10 p-3 sm:p-5 @2xl:border-b-0 @2xl:border-r">
          <svg
            viewBox="0 0 580 330"
            className="w-full"
            role="img"
            aria-label="Floor plan with the robot's cleaning route"
          >
            <defs>
              <pattern id="cd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="rgb(255 255 255 / 0.04)" />
              </pattern>
              <radialGradient
                id="cd-cone"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(0 0) scale(70)"
              >
                <stop offset="0" stopColor="#8af0ff" stopOpacity="0.45" />
                <stop offset="1" stopColor="#8af0ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="580" height="330" fill="url(#cd-grid)" />
            {/* Walls and fixtures */}
            <path d="M40 34H540V296H330M270 296H40Z" fill="none" stroke="rgb(255 255 255 / 0.35)" strokeWidth="2" />
            <g fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.18)">
              <rect x="44" y="38" width="12" height="80" rx="2" />
              <rect x="524" y="38" width="12" height="120" rx="2" />
              <rect x="524" y="190" width="12" height="100" rx="2" />
            </g>
            <text x="300" y="318" textAnchor="middle" className="fill-white/35 font-mono text-[10px] tracking-widest">
              ENTRANCE
            </text>
            {/* Dock */}
            <g transform="translate(58 282)">
              <rect x="-10" y="-8" width="20" height="16" rx="3" fill="none" stroke="#7b93ff" strokeWidth="1.5" />
              <path d="M-3 -2l3 -3 3 3M0 -5v9" stroke="#7b93ff" strokeWidth="1.2" fill="none" />
            </g>
            {/* Planned route */}
            <path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="rgb(255 255 255 / 0.12)"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />
            {/* Cleaned swath */}
            <path
              ref={cleanRef}
              d={ROUTE}
              pathLength={1}
              fill="none"
              stroke="#2340ff"
              strokeOpacity="0.55"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 1"
              strokeDashoffset="1"
            />
            {/* Spill */}
            <g transform="translate(300 165)">
              <circle
                r="9"
                fill="#ffb020"
                opacity={shown < 0.5 ? 0.9 : 0}
                className="transition-opacity duration-700"
              />
              {shown > 0.3 && shown < 0.5 && (
                <circle
                  r="16"
                  fill="none"
                  stroke="#ffb020"
                  strokeWidth="1.5"
                  className="animate-ping"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              )}
            </g>
            {/* Robot */}
            <g ref={robotRef} transform="translate(64 58)">
              <path d="M0 0 L70 -30 A76 76 0 0 1 70 30 Z" fill="url(#cd-cone)" />
              <circle r="11" fill="#fff" />
              <circle r="11" fill="none" stroke="#2340ff" strokeWidth="3" />
              <path
                d="M3 -4l5 4-5 4"
                fill="none"
                stroke="#2340ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          {toast && (
            <div
              key={toast.title}
              className="pop-in absolute bottom-4 left-4 right-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-night/90 p-3.5 backdrop-blur sm:left-auto sm:w-80"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path
                    d="M10 3a5 5 0 0 0-5 5v3l-1.5 2.5h13L15 11V8a5 5 0 0 0-5-5ZM8 16a2 2 0 0 0 4 0"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-sm font-[600]">{toast.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-white/60">{toast.text}</span>
              </span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="p-5 @2xl:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[600]">Phantas · Unit 01</p>
              <p className="t-mono mt-1 text-white/55">Main floor · scrub</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-lidar/10 px-3 py-1 text-xs text-lidar">
              <span className="h-1.5 w-1.5 rounded-full bg-lidar blink" />
              {status}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <p className="t-mono text-white/55">Task progress</p>
              <p className="t-num text-3xl">{pct}%</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-signal" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {[
              { k: "Cleaned", v: `${Math.round(shown * AREA).toLocaleString("en-IE")}`, u: "m²" },
              { k: "Battery", v: `${battery}`, u: "%" },
              { k: "Clean water", v: `${water}`, u: "%" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white/[0.04] p-3">
                <dt className="t-mono !text-[0.62rem] text-white/55">{s.k}</dt>
                <dd className="t-num mt-2 text-xl">
                  {s.v}
                  <span className="ml-0.5 text-xs text-white/50">{s.u}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="t-mono mt-6 text-white/55">Tonight&apos;s schedule</p>
          <ul className="mt-3 space-y-2">
            {SCHEDULE.map((item) => (
              <li
                key={item.time}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                  item.state === "now" ? "border-signal/50 bg-signal/10" : "border-white/10"
                }`}
              >
                <span className="t-mono text-white/60">{item.time}</span>
                <span className="text-white/85">{item.task}</span>
                {item.state === "now" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-signal" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
