import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Machine } from "@/data/aventurier";

type MachineHeroProps = {
  machine: Machine;
  /** Pill shown under the product render, as on the leaflet covers. */
  badge: string;
};

// Mirrors the leaflet covers: navy text column with a crimson rule beside the
// name, and the cut-out product render glowing on a slate panel to the right.
export default function MachineHero({ machine, badge }: MachineHeroProps) {
  const [first, second] = machine.heroStats;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[40%] bg-av-slate/35 lg:block" />

      <div className="relative grid grid-cols-1 px-24 pb-64 pt-28 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-x-120 lg:px-80 lg:pb-96 lg:pt-72">
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14">
            <Link href="/aventurier" aria-label="Aventurier machines" className="block">
              <Image
                src="/images/aventurier/aventurier-logo.png"
                alt="Aventurier"
                width={1082}
                height={215}
                className="h-18 w-auto lg:h-22"
              />
            </Link>
            <span aria-hidden="true" className="hidden h-14 w-px bg-white/25 lg:block" />
            <p className="t-eyebrow text-av-teal">{machine.category}</p>
          </Reveal>
          <Reveal>
            <h1 className="t-h1 mt-20 border-l-4 border-av-red pl-16 !font-normal tracking-[0.02em] uppercase lg:mt-36 lg:pl-28">
              {machine.name}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-16 text-[1.0625rem] font-bold uppercase leading-[1.3] tracking-[0.1em] text-ink lg:mt-28 lg:w-560 lg:text-[1.375rem]">
              {machine.tagline}
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="fade"
          delay={150}
          className="av-glow relative mt-28 flex h-[26rem] items-end justify-center pb-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-[40rem] lg:pb-32"
        >
          <Image
            src={machine.image.src}
            alt={machine.image.alt}
            width={machine.image.width}
            height={machine.image.height}
            preload
            sizes="(min-width: 1001px) 30vw, 60vw"
            className="h-full w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          />
          <span className="t-eyebrow absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-av-red px-20 py-8 text-white">
            {badge}
          </span>
        </Reveal>

        <div className="mt-32 lg:col-start-1 lg:row-start-2 lg:mt-40">
          <Reveal>
            <p className="t-lead text-muted lg:w-560">{machine.summary}</p>
          </Reveal>

          <Reveal className="mt-32 flex items-stretch gap-24 lg:mt-44 lg:gap-36">
            <div>
              <p className="text-[2.5rem] leading-none text-white lg:text-[3.5rem]">{first.value}</p>
              <p className="t-eyebrow mt-10 text-muted">{first.label}</p>
            </div>
            <span aria-hidden="true" className="w-3 shrink-0 bg-av-red" />
            <div>
              <p className="text-[2.5rem] leading-none text-av-teal lg:text-[3.5rem]">{second.value}</p>
              <p className="t-eyebrow mt-10 text-muted">{second.label}</p>
            </div>
          </Reveal>

          <Reveal className="mt-36 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mt-48 lg:flex lg:flex-wrap lg:gap-16">
            <Link href="/contact" className="btn h-50 px-28">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn h-50 px-28">
              Book a Demo
            </Link>
            <a
              href={machine.brochure}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid h-50 px-28 md:col-span-2"
            >
              Download Brochure
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
