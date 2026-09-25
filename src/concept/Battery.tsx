import Image from "next/image";
import Link from "next/link";
import { AVENTURIER, machineHref } from "./data";
import { Arrow, Eyebrow, Lines, R } from "./ui";

/** "One battery, two machines": the V25 pack shared by Artist 1 and Ranger One. */
export default function Battery({ highlight }: { highlight?: string }) {
  return (
    <section data-nav="dark" className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-av/30 blur-[140px]"
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <R>
            <Eyebrow tone="light">Shared battery platform</Eyebrow>
          </R>
          <Lines lines={["One battery.", "Two machines."]} className="t-h2 mt-5" />
          <R delay={150}>
            <p className="t-lead mt-6 max-w-lg text-white/65">
              Artist 1 and Ranger One share the same hot-swappable V25 battery. Keep spares charged and swap them
              between machines, so your team spends the shift cleaning instead of waiting on a charger.
            </p>
          </R>
          <R delay={250} className="mt-10 flex items-center gap-6">
            {/* Battery glyph that fills as it comes into view */}
            <div className="relative h-20 w-40 rounded-2xl border-2 border-white/70 p-1.5" aria-hidden="true">
              <span className="absolute -right-2.5 top-1/2 h-7 w-2 -translate-y-1/2 rounded-r-md bg-white/70" />
              <span className="battery-fill block h-full rounded-xl bg-gradient-to-r from-av to-[#ff5a73]" />
            </div>
            <div>
              <p className="t-num text-5xl">V25</p>
              <p className="t-mono mt-2 text-white/55">25.2 V · 13 Ah · hot-swap</p>
            </div>
          </R>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {AVENTURIER.map((m, i) => (
            <R as="li" key={m.slug} delay={i * 120}>
              <Link
                href={machineHref(m.slug)}
                className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border transition-colors ${
                  highlight === m.slug
                    ? "border-av/60 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                <div className="relative flex h-64 items-end justify-center bg-[radial-gradient(60%_55%_at_50%_60%,rgb(255_255_255/0.14),transparent)] pt-6 sm:h-80">
                  <Image
                    src={m.image.src}
                    alt=""
                    width={m.image.width}
                    height={m.image.height}
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="h-[90%] w-auto object-contain drop-shadow-[0_24px_30px_rgb(0_0_0/0.5)] transition-transform duration-700 group-hover:-translate-y-1.5"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4 sm:p-5">
                  <span>
                    <span className="block font-[600]">{m.name}</span>
                    <span className="block text-xs text-white/50">
                      {highlight === m.slug ? "You are here" : m.category}
                    </span>
                  </span>
                  <Arrow className="h-4 w-4" />
                </div>
              </Link>
            </R>
          ))}
        </ul>
      </div>
    </section>
  );
}
