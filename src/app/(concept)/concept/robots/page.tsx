import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Finder from "@/concept/Finder";
import LoopVideo from "@/concept/LoopVideo";
import SpecCompare from "@/concept/SpecCompare";
import { CtaBand, NumberedItem, PageHero } from "@/concept/blocks";
import { FLEET, robotHref } from "@/concept/data";
import { Arrow, R, SectionHead } from "@/concept/ui";

export const metadata: Metadata = {
  title: "Robots",
  description:
    "The NOLAR autonomous cleaning robot range: Phantas, Phantas Single, PhanShop, Mira, Omnie, Marvel and Beetle.",
};

const TECH = [
  {
    title: "3D LiDAR navigation",
    text: "Precise mapping and localisation in any environment, low-light or high-dynamic.",
  },
  {
    title: "AI obstacle avoidance",
    text: "Deep learning trained on millions of real-world scenarios avoids people, wires and obstacles.",
  },
  { title: "Auto spot cleaning", text: "Detects and cleans dirty areas autonomously, up to 400% more efficient." },
  { title: "Zero-distance edges", text: "Cleans right to the wall every time, 0 mm from edges." },
  { title: "Autonomous charging", text: "A self-docking charging station enables 24/7 continuous operation." },
  { title: "Smart cloud platform", text: "Remote monitoring, OTA updates and real-time performance data." },
];

export default function RobotsPage() {
  return (
    <>
      <PageHero
        eyebrow="The fleet · 07 robots"
        title={["Intelligent machines.", "Real-world results."]}
        intro="Every robot in the range is purpose-built for a specific environment and cleaning challenge. Find the right one for your space."
      >
        <R variant="scale" className="relative mt-14 overflow-hidden rounded-[2rem] bg-night lg:mt-20">
          <div className="relative aspect-[16/10] sm:aspect-[21/9]">
            <LoopVideo
              src="/concept/day.mp4"
              poster="/concept/day-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
            />
            <nav aria-label="Jump to" className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5 sm:p-8">
              {["#range", "#compare", "#finder"].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-[540] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-night"
                >
                  {["The range", "Compare", "Robot finder"][i]}
                </a>
              ))}
            </nav>
          </div>
        </R>
      </PageHero>

      {/* Range */}
      <section id="range" className="bg-paper pb-24 lg:pb-36">
        <div className="wrap">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((r, i) => {
              const wide = i === 0 || i === 3;
              return (
                <R as="li" key={r.slug} delay={(i % 3) * 90} className={wide ? "lg:col-span-2" : ""}>
                  <Link
                    href={robotHref(r.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-surface"
                  >
                    <div
                      className={`relative overflow-hidden bg-mist ${wide ? "aspect-[4/3] lg:aspect-auto lg:min-h-[17rem] lg:flex-1" : "aspect-[4/3]"}`}
                    >
                      <Image
                        src={r.hero.src}
                        alt={r.hero.alt}
                        fill
                        sizes={
                          wide
                            ? "(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
                            : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                        style={{ objectPosition: r.meta.focus }}
                      />
                      <span className="t-mono absolute left-4 top-4 rounded-full bg-surface/85 px-2.5 py-1 text-ink backdrop-blur">
                        {r.meta.no} · {r.meta.environment}
                      </span>
                    </div>
                    <div className={`flex flex-col p-6 ${wide ? "" : "flex-1"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-3xl font-[620] tracking-[-0.035em] [font-stretch:108%]">{r.name}</p>
                          <p className="mt-1.5 text-ink-soft">{r.meta.short}</p>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink">
                          <Arrow />
                        </span>
                      </div>
                      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-rule pt-5">
                        {r.meta.highlights.slice(0, 2).map((h) => (
                          <div key={h.label}>
                            <dt className="sr-only">{h.label}</dt>
                            <dd className="t-num text-2xl">
                              {h.value}
                              {h.unit && <span className="ml-1 text-sm text-steel">{h.unit}</span>}
                            </dd>
                            <dd className="mt-1 text-xs leading-snug text-steel">{h.label}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </Link>
                </R>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="grid-lines bg-mist py-24 lg:py-36">
        <div className="wrap">
          <SectionHead
            eyebrow="Compare"
            title={["The whole range,", "side by side."]}
            intro="Switch between capacity, runtime and the tightest aisle each robot can pass through. Every figure is from the robot's own spec sheet."
          />
          <R className="mt-12 lg:mt-16">
            <SpecCompare />
          </R>
        </div>
      </section>

      {/* Technology */}
      <section data-nav="dark" className="relative overflow-hidden bg-night py-24 text-white lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-signal/20 blur-[140px]"
        />
        <div className="wrap relative">
          <SectionHead
            dark
            eyebrow="Powered by Gausium"
            title={["The technology", "behind every robot."]}
            intro="Every robot in the NOLAR range runs on Gausium's industry-leading autonomy platform."
          />
          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {TECH.map((t, i) => (
              <R as="li" key={t.title} delay={(i % 3) * 90}>
                <NumberedItem dark no={String(i + 1).padStart(2, "0")} title={t.title} text={t.text} />
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* Finder */}
      <section id="finder" className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <SectionHead
            eyebrow="Robot finder"
            title={["Still not sure?", "Start here."]}
            intro="Pick your kind of space and roughly how big it is. We'll suggest a starting point, and confirm it at a free site assessment."
          />
          <R className="mt-12 lg:mt-16" variant="scale">
            <Finder />
          </R>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
