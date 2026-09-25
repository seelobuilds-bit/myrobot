"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FLEET, SPACES, robotHref, to, type FleetRobot, type SpaceKey } from "./data";
import { Arrow } from "./ui";

const MIN = 250;
const MAX = 60000;
const SHIFT_HOURS = 8;

// The slider is logarithmic so small shops and huge warehouses both get room.
const toArea = (v: number) => {
  const raw = MIN * Math.pow(MAX / MIN, v / 100);
  const step = raw < 1000 ? 50 : raw < 10000 ? 250 : 1000;
  return Math.round(raw / step) * step;
};
const toSlider = (area: number) => (Math.log(area / MIN) / Math.log(MAX / MIN)) * 100;

const fmt = (n: number) => n.toLocaleString("en-IE");

function duration(hours: number) {
  const total = Math.max(5, Math.round((hours * 60) / 5) * 5);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

function rank(space: SpaceKey, area: number) {
  const picks: readonly string[] = SPACES.find((s) => s.key === space)?.picks ?? [];
  return FLEET.map((robot) => {
    const i = picks.indexOf(robot.slug);
    const placeScore = i === -1 ? 0 : (3 - i) * 2;
    const [lo, hi] = robot.meta.sweetSpot;
    const sizeScore = area < lo ? 3 * (area / lo) : area > hi ? 3 * (hi / area) : 3;
    return { robot, score: placeScore + sizeScore };
  })
    .sort((a, b) => b.score - a.score)
    .map((r) => r.robot);
}

export default function Finder({ dark = false }: { dark?: boolean }) {
  const [space, setSpace] = useState<SpaceKey>("warehouse");
  const [slider, setSlider] = useState(toSlider(8000));
  const area = toArea(slider);
  const [best, ...rest] = useMemo(() => rank(space, area), [space, area]);
  const spaceLabel = SPACES.find((s) => s.key === space)!.label;

  const surface = dark ? "bg-night-2 text-white border-white/10" : "bg-surface text-ink border-rule";
  const muted = dark ? "text-white/60" : "text-steel";

  return (
    <div className={`grid overflow-hidden rounded-[2rem] border lg:grid-cols-[1fr_1.1fr] ${surface}`}>
      {/* Inputs */}
      <div className={`p-6 sm:p-8 lg:p-10 ${dark ? "" : "bg-cloud"}`}>
        <fieldset>
          <legend className="t-mono flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal text-[0.65rem] text-white">
              1
            </span>
            What kind of space?
          </legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {SPACES.map((s) => {
              const on = s.key === space;
              return (
                <label
                  key={s.key}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[0.92rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                    on
                      ? "border-signal bg-signal text-white"
                      : dark
                        ? "border-white/15 text-white/80 hover:border-white/40"
                        : "border-rule bg-surface text-ink-soft hover:border-ink/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="finder-space"
                    value={s.key}
                    checked={on}
                    onChange={() => setSpace(s.key)}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-10">
          <label htmlFor="finder-area" className="t-mono flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal text-[0.65rem] text-white">
              2
            </span>
            Roughly how much floor?
          </label>
          <p className="t-num mt-5 text-[clamp(2.75rem,5vw,4.25rem)]">
            {fmt(area)}
            <span className={`ml-2 text-[0.4em] ${muted}`}>m²</span>
          </p>
          <input
            id="finder-area"
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            aria-valuetext={`${fmt(area)} square metres`}
            className="range mt-3"
            style={{ "--fill": `${slider}%` } as React.CSSProperties}
          />
          <div className={`t-mono mt-1 flex justify-between ${muted}`}>
            <span>250 m²</span>
            <span>60,000 m²</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="relative p-6 sm:p-8 lg:p-10" aria-live="polite">
        <Result key={`${best.slug}`} robot={best} area={area} space={space} spaceLabel={spaceLabel} dark={dark} />
        <div className={`mt-8 border-t pt-5 ${dark ? "border-white/10" : "border-rule"}`}>
          <p className={`t-mono ${muted}`}>Also worth a look</p>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {rest.slice(0, 2).map((r) => (
              <li key={r.slug}>
                <Link
                  href={robotHref(r.slug)}
                  className={`group flex items-center gap-3 rounded-2xl border p-2 pr-3 transition-colors ${
                    dark ? "border-white/10 hover:border-white/30" : "border-rule hover:border-ink/40"
                  }`}
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-mist">
                    <Image
                      src={r.hero.src}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      style={{ objectPosition: r.meta.focus }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-[600]">{r.name}</span>
                    <span className={`block truncate text-xs ${muted}`}>{r.meta.bestFor}</span>
                  </span>
                  <Arrow className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Result({
  robot,
  area,
  space,
  spaceLabel,
  dark,
}: {
  robot: FleetRobot;
  area: number;
  space: SpaceKey;
  spaceLabel: string;
  dark: boolean;
}) {
  const cap = robot.meta.metrics.capacity;
  const hours = cap ? area / cap : null;
  const muted = dark ? "text-white/60" : "text-steel";
  const contact = `${to("/contact")}?robot=${robot.slug}&space=${space}&area=${area}`;

  return (
    <div className="pop-in">
      <p className={`t-mono ${muted}`}>Our suggestion for {spaceLabel.toLowerCase()}</p>
      <div className="mt-4 flex items-start gap-5">
        <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-mist sm:w-36">
          <Image
            src={robot.hero.src}
            alt={robot.hero.alt}
            fill
            sizes="144px"
            className="object-cover"
            style={{ objectPosition: robot.meta.focus }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-[clamp(2rem,3.6vw,3rem)] font-[620] leading-none tracking-[-0.04em] [font-stretch:108%]">
            {robot.name}
          </p>
          <p className={`mt-2 text-[0.98rem] leading-snug ${dark ? "text-white/75" : "text-ink-soft"}`}>
            {robot.meta.short}
          </p>
        </div>
      </div>

      <div className={`mt-6 rounded-2xl p-5 ${dark ? "bg-white/5" : "bg-signal-soft/50"}`}>
        {hours !== null ? (
          <>
            <p className="t-mono text-signal-ink">Estimated time to cover {fmt(area)} m²</p>
            <p className="t-num mt-2 text-[2.4rem]">{duration(hours)}</p>
            <p className={`mt-2 text-sm leading-snug ${dark ? "text-white/70" : "text-ink-soft"}`}>
              At its max rated {fmt(cap!)} m²/h
              {robot.meta.metrics.capacityNote ? ` (${robot.meta.metrics.capacityNote})` : ""}.{" "}
              {hours <= SHIFT_HOURS
                ? "Comfortably inside one overnight shift."
                : "More than one night's work for one robot, so we'd look at a second unit or daytime runs."}
            </p>
          </>
        ) : (
          <>
            <p className="t-mono text-signal-ink">Cleans while it sells</p>
            <p className={`mt-2 text-sm leading-snug ${dark ? "text-white/70" : "text-ink-soft"}`}>
              Built on the Phantas platform with a sliding merchandise tray and an optional promotional display, so one
              machine does two jobs on the shop floor.
            </p>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href={contact} className={`btn ${dark ? "btn-signal" : "btn-ink"}`}>
          Book a free assessment
          <Arrow />
        </Link>
        <Link href={robotHref(robot.slug)} className={`btn ${dark ? "btn-line-light" : "btn-line"}`}>
          Meet {robot.name}
        </Link>
      </div>
      <p className={`mt-4 text-xs leading-snug ${muted}`}>
        A starting point, not a quote: real cleaning times depend on layout, mode and traffic. We measure yours at the
        free site assessment.
      </p>
    </div>
  );
}
