import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import Icon from "@/components/aventurier/Icon";
import { MACHINES } from "@/data/aventurier";

export const metadata: Metadata = {
  title: "Aventurier Machines",
  description:
    "Aventurier Artist 1 scrubber dryer and Ranger One cordless backpack vacuum, available from NOLAR across Ireland.",
};

export default function AventurierPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-24 pb-64 pt-48 lg:px-0 lg:pb-100 lg:pt-100">
        <div aria-hidden="true" className="av-glow absolute inset-0 opacity-60" />
        <div className="relative">
          <Reveal>
            <Image
              src="/images/aventurier/aventurier-logo.png"
              alt="Aventurier"
              width={1082}
              height={215}
              preload
              className="mx-auto h-40 w-auto lg:h-64"
            />
          </Reveal>
          <Reveal>
            <h1 className="t-h1 mx-auto mt-32 text-center lg:mt-48 lg:w-960 lg:tracking-[-0.01em]">
              Professional Floor Care in Your Team&apos;s Hands.
            </h1>
          </Reveal>
          <Reveal>
            <p className="t-lead mx-auto mt-16 text-center text-muted lg:mt-32 lg:w-680">
              Not every job suits a robot. Aventurier machines give your cleaning team compact, cordless tools for
              busy floors, stairs, seating and vehicle interiors, all running on one shared battery platform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Machines */}
      <section className="bg-navy px-24 pb-80 lg:px-80 lg:pb-120">
        <ul className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:gap-40">
          {MACHINES.map((machine, i) => (
            <li key={machine.slug}>
              <Reveal variant="fade" delay={i * 100} className="h-full">
                <Link
                  href={`/${machine.slug}`}
                  className="group flex h-full flex-col border border-line bg-panel transition-colors duration-300 hover:border-white/40"
                >
                  <div className="av-glow relative flex h-360 items-end justify-center overflow-hidden pt-32 lg:h-520 lg:pt-48">
                    <Image
                      src={machine.image.src}
                      alt={machine.image.alt}
                      width={machine.image.width}
                      height={machine.image.height}
                      sizes="(min-width: 1001px) 25vw, (min-width: 640px) 35vw, 60vw"
                      className="h-[92%] w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:-translate-y-8"
                    />
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-av-red" />
                  </div>
                  <div className="flex flex-1 flex-col p-24 lg:p-40">
                    <p className="t-eyebrow text-av-teal">{machine.category}</p>
                    <h2 className="t-h3 mt-12 uppercase tracking-[0.02em] !font-normal lg:mt-16">{machine.name}</h2>
                    <p className="t-body mt-12 flex-1 text-muted lg:mt-16">{machine.summary}</p>
                    <dl className="mt-24 grid grid-cols-2 gap-16 border-t border-line pt-20 lg:mt-32 lg:pt-28">
                      {machine.heroStats.map((stat) => (
                        <div key={stat.label}>
                          <dt className="sr-only">{stat.label}</dt>
                          <dd className="text-[1.75rem] leading-none text-white lg:text-[2.25rem]">{stat.value}</dd>
                          <dd className="t-small mt-6 text-muted">{stat.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <span className="t-body mt-28 inline-flex items-center gap-10 uppercase tracking-[0.05em] text-white lg:mt-36">
                      Explore {machine.name}
                      <Icon name="arrow" className="h-18 w-18 transition-transform duration-300 group-hover:translate-x-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Shared battery */}
      <section className="bg-av-slate px-24 py-64 lg:px-80 lg:py-80">
        <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-56">
          <Reveal variant="fade">
            <span className="flex h-64 w-64 items-center justify-center rounded-full border border-white/25 text-white lg:h-88 lg:w-88">
              <Icon name="battery" className="h-32 w-32 lg:h-44 lg:w-44" />
            </span>
          </Reveal>
          <Reveal>
            <h2 className="t-h4">One Battery. Two Machines.</h2>
            <p className="t-body mt-12 text-white/75 lg:mt-16">
              Artist 1 and Ranger One share the same hot-swappable V25 battery (25.2 V, 13 Ah), so spares move
              freely between machines and between shifts.
            </p>
          </Reveal>
          <Reveal className="lg:text-right">
            <p className="text-[2.5rem] leading-none text-white lg:text-[3.5rem]">V25</p>
            <p className="t-eyebrow mt-8 text-white/70">25.2 V · 13 Ah</p>
          </Reveal>
        </div>
      </section>

      {/* Robots + Aventurier */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
        <Reveal className="mx-auto border border-line p-24 text-center lg:w-960 lg:p-64">
          <h2 className="t-h3">Robots for the Big Floors. Aventurier for the Rest.</h2>
          <p className="t-lead mx-auto mt-16 text-muted lg:mt-24 lg:w-680">
            Let a NOLAR robot fleet run the large open floors on autopilot while your team covers stairs, seating
            and the tight spots with Aventurier machines.
          </p>
          <div className="mt-32 flex flex-col items-center gap-12 md:flex-row md:justify-center lg:mt-40 lg:gap-24">
            <Link href="/robotics" className="btn h-50 w-full px-32 md:w-auto">
              Explore Robotics
            </Link>
            <Link href="/services" className="btn h-50 w-full px-32 md:w-auto">
              Our Services
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaSection title="Interested in Aventurier?" formId="enquiry-aventurier" />
    </>
  );
}
