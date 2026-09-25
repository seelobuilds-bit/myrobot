"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FLEET, robotHref } from "./data";
import { Arrow } from "./ui";

// The robot range as an index: hovering (or focusing) a row swaps the large
// preview beside it. On phones each row carries its own photo instead.
export default function FleetIndex() {
  const [active, setActive] = useState(0);
  const robot = FLEET[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <ol className="border-t border-rule">
        {FLEET.map((r, i) => (
          <li key={r.slug} data-reveal="" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
            <Link
              href={robotHref(r.slug)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 border-b border-rule py-5 lg:grid-cols-[3rem_1fr_auto_2rem] lg:py-6"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 -z-0 bg-surface transition-[width] duration-500 ease-[var(--ease-out-expo)] ${
                  active === i ? "w-full" : "w-0"
                } hidden lg:block`}
              />
              <span className={`t-mono relative transition-colors ${active === i ? "text-signal-ink" : "text-steel"}`}>
                {r.meta.no}
              </span>
              <span className="relative min-w-0">
                <span className="block text-[clamp(1.6rem,2.6vw,2.4rem)] font-[600] leading-none tracking-[-0.035em] [font-stretch:106%]">
                  {r.name}
                </span>
                <span className="mt-1.5 block text-[0.95rem] text-ink-soft">{r.meta.short}</span>
              </span>
              <span className="relative hidden text-right lg:block">
                <span className="t-mono block text-steel">{r.meta.environment}</span>
                <span className="mt-1 block text-sm text-ink-soft">{r.meta.modes.join(" · ")}</span>
              </span>
              <span className="relative flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-rule transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink">
                <Arrow className="h-4 w-4" />
              </span>
              {/* Phone: inline photo */}
              <span className="relative col-span-3 mt-4 block aspect-[16/10] overflow-hidden rounded-2xl bg-mist lg:hidden">
                <Image
                  src={r.hero.src}
                  alt={r.hero.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: r.meta.focus }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist">
            {FLEET.map((r, i) => (
              <Image
                key={r.slug}
                src={r.hero.src}
                alt={i === active ? r.hero.alt : ""}
                fill
                sizes="40vw"
                className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
                style={{ objectPosition: r.meta.focus }}
              />
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent"
            />
            <div className="absolute left-5 top-5 rounded-full bg-surface/85 px-3 py-1.5 backdrop-blur">
              <span className="t-mono text-ink">
                {robot.meta.no} / {String(FLEET.length).padStart(2, "0")} · {robot.meta.code}
              </span>
            </div>
            <dl className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px p-5 text-white">
              {robot.meta.highlights.slice(0, 2).map((h) => (
                <div key={h.label} className="pr-4">
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="t-num text-[2.6rem]">
                    {h.value}
                    {h.unit && <span className="ml-1 text-[0.45em] text-white/70">{h.unit}</span>}
                  </dd>
                  <dd className="mt-1.5 text-sm text-white/70">{h.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-sm text-steel">
            Best for: <span className="text-ink">{robot.meta.bestFor}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
