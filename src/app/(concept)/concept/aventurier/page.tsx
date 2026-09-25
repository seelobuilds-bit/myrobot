import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Battery from "@/concept/Battery";
import { CtaBand } from "@/concept/blocks";
import { AVENTURIER, machineHref, to } from "@/concept/data";
import { Arrow, Eyebrow, Lines, R } from "@/concept/ui";

export const metadata: Metadata = {
  title: "Aventurier",
  description:
    "Aventurier Artist 1 scrubber dryer and Ranger One cordless backpack vacuum, available from NOLAR across Ireland.",
};

export default function AventurierPage() {
  const [artist, ranger] = AVENTURIER;
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-mist pb-10 pt-32 lg:pt-40">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-10">
            <div className="pb-6 lg:pb-24">
              <R>
                <span role="img" aria-label="Aventurier" className="av-logo h-8 lg:h-10" />
              </R>
              <R delay={80} className="mt-8">
                <Eyebrow className="!text-av-ink">Operator-led · cordless · one battery</Eyebrow>
              </R>
              <Lines
                as="h1"
                lines={["Professional floor care in your team’s hands."]}
                className="t-h1 mt-6"
                delay={150}
              />
              <R delay={400}>
                <p className="t-lead mt-8 max-w-xl text-ink-soft">
                  Not every job suits a robot. Aventurier machines give your cleaning team compact, cordless tools for
                  busy floors, stairs, seating and vehicle interiors, all running on one shared battery platform.
                </p>
              </R>
            </div>
            <R variant="scale" delay={200} className="relative">
              <div className="relative flex h-[30rem] items-end justify-center gap-4 sm:h-[38rem] lg:h-[44rem]">
                <div aria-hidden="true" className="absolute inset-x-6 bottom-6 top-16 rounded-[2.5rem] stage" />
                <div aria-hidden="true" className="absolute inset-x-16 bottom-6 h-1 rounded-full bg-av" />
                <Link href={machineHref(artist.slug)} className="group relative z-10 h-[88%] w-auto">
                  <Image
                    src={artist.image.src}
                    alt={artist.image.alt}
                    width={artist.image.width}
                    height={artist.image.height}
                    priority
                    sizes="(min-width: 1024px) 22vw, 40vw"
                    className="h-full w-auto object-contain drop-shadow-[0_40px_40px_rgb(10_13_20/0.3)] transition-transform duration-700 group-hover:-translate-y-2"
                  />
                </Link>
                <Link href={machineHref(ranger.slug)} className="group relative z-10 mb-2 h-[62%] w-auto">
                  <Image
                    src={ranger.image.src}
                    alt={ranger.image.alt}
                    width={ranger.image.width}
                    height={ranger.image.height}
                    priority
                    sizes="(min-width: 1024px) 18vw, 34vw"
                    className="h-full w-auto object-contain drop-shadow-[0_40px_40px_rgb(10_13_20/0.3)] transition-transform duration-700 group-hover:-translate-y-2"
                  />
                </Link>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ---------------- Machines ---------------- */}
      {AVENTURIER.map((m, i) => (
        <section key={m.slug} className={`${i === 0 ? "bg-paper" : "bg-cloud"} py-24 lg:py-32`}>
          <div className={`wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <R variant="scale" className={`relative ${i === 1 ? "lg:order-2" : ""}`}>
              <Link
                href={machineHref(m.slug)}
                className="group relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[2rem] stage pt-10"
              >
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  width={m.image.width}
                  height={m.image.height}
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className="h-[90%] w-auto object-contain drop-shadow-[0_40px_40px_rgb(10_13_20/0.28)] transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-av" />
                <span className="t-mono absolute left-5 top-5 text-av-ink">
                  0{i + 1} · {m.category}
                </span>
              </Link>
            </R>
            <div>
              <R>
                <Eyebrow className="!text-av-ink">{m.category}</Eyebrow>
              </R>
              <Lines lines={[m.name]} className="t-h1 mt-5" />
              <R delay={120}>
                <p className="mt-4 text-[clamp(1.25rem,1.8vw,1.6rem)] font-[560] leading-tight tracking-[-0.02em]">
                  {m.tagline}
                </p>
                <p className="t-lead mt-5 text-ink-soft">{m.summary}</p>
              </R>
              <R delay={200}>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule pt-6 sm:grid-cols-3">
                  {m.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="t-num text-[1.9rem]">{s.value}</dd>
                      <dd className="mt-1.5 text-sm text-steel">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </R>
              <R delay={280} className="mt-10 flex flex-wrap gap-3">
                <Link href={machineHref(m.slug)} className="btn btn-ink">
                  Explore {m.name}
                  <Arrow />
                </Link>
                <a href={m.brochure} target="_blank" rel="noreferrer" className="btn btn-line">
                  Leaflet (PDF)
                  <Arrow direction="down" />
                </a>
              </R>
            </div>
          </div>
        </section>
      ))}

      <Battery />

      {/* ---------------- Robots + Aventurier ---------------- */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="wrap">
          <R className="grid gap-10 rounded-[2rem] border border-rule bg-surface p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-16">
            <div>
              <Eyebrow>Better together</Eyebrow>
              <h2 className="t-h2 mt-5">Robots for the big floors. Aventurier for the rest.</h2>
              <p className="t-lead mt-5 text-ink-soft">
                Let a NOLAR robot fleet run the large open floors on autopilot while your team covers stairs, seating
                and the tight spots with Aventurier machines.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link href={to("/robots")} className="btn btn-ink">
                Explore the robots
                <Arrow />
              </Link>
              <Link href={to("/services")} className="btn btn-line">
                Our services
              </Link>
            </div>
          </R>
        </div>
      </section>

      <CtaBand title="Interested in Aventurier?" query="robot=aventurier" />
    </>
  );
}
