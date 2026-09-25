import type { Metadata } from "next";
import Image from "next/image";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import BatteryPlatform from "@/components/aventurier/BatteryPlatform";
import Icon, { type IconName } from "@/components/aventurier/Icon";
import MachineHero from "@/components/aventurier/MachineHero";
import SpecList from "@/components/aventurier/SpecList";
import StatBand from "@/components/aventurier/StatBand";
import { ARTIST_1, RANGER_ONE } from "@/data/aventurier";

export const metadata: Metadata = {
  title: "Ranger One Cordless Backpack Vacuum",
  description: RANGER_ONE.summary,
};

const HIGHLIGHTS: { icon: IconName; title: string; text: string }[] = [
  { icon: "bolt", title: "Power That Travels", text: "Up to 75 minutes from one 25.2 V, 13 Ah battery." },
  { icon: "air", title: "Cleaner Exhaust Air", text: "Four-stage HEPA H13 filtration captures fine particles." },
  { icon: "battery", title: "Shared Battery", text: "V25 battery compatibility shared with Artist 1." },
];

const OPERATOR: { icon: IconName; title: string; text: string; accent: "red" | "teal" }[] = [
  {
    icon: "battery",
    title: "V25 Power Sharing",
    text: "Hot-swap 25.2 V, 13 Ah batteries and share the same platform as Artist 1.",
    accent: "red",
  },
  {
    icon: "filter",
    title: "HEPA H13 Filtration",
    text: "Four-stage filtration captures 99.97% of particles down to 0.3 microns.",
    accent: "teal",
  },
  {
    icon: "harness",
    title: "Ergonomic Harness",
    text: "A professional backpack harness supports mobile work across longer cleaning routes.",
    accent: "teal",
  },
  {
    icon: "hose",
    title: "Ambidextrous Hose",
    text: "Connect from either side for easier access in stairs, rows and tight corners.",
    accent: "red",
  },
];

const PLACES = [
  { src: "/images/aventurier/ranger-one-seating.jpg", title: "Fixed Seating", text: "Work along rows of seating without a cable snagging on every armrest." },
  { src: "/images/aventurier/ranger-one-stairs.jpg", title: "Stairs & Corridors", text: "Climb, turn and keep going. There is no socket to find on the next landing." },
  { src: "/images/aventurier/ranger-one-transport.jpg", title: "Transport Interiors", text: "Reach under seats and along narrow aisles in vehicle cabins." },
];

export default function RangerOnePage() {
  return (
    <>
      <MachineHero machine={RANGER_ONE} badge="Cordless · HEPA H13" />

      <StatBand stats={RANGER_ONE.stats} label="Ranger One key figures" />

      {/* Cut the cord */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
        <div className="grid grid-cols-1 items-center gap-48 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-96">
          <div>
            <Reveal>
              <p className="t-eyebrow text-av-teal">Ready to cut the cord?</p>
              <h2 className="t-h2 mt-16 lg:mt-24">Built for the Places Where Cords Slow You Down.</h2>
              <p className="t-lead mt-16 text-muted lg:mt-28">
                Move freely through stairs, fixed seating, narrow passages and vehicle interiors with a professional
                backpack vacuum engineered around the operator.
              </p>
            </Reveal>
            <ul className="mt-32 space-y-16 lg:mt-48 lg:space-y-24">
              {HIGHLIGHTS.map((item, i) => (
                <li key={item.title}>
                  <Reveal variant="fade" delay={i * 80} className="flex gap-16 lg:gap-20">
                    <span className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-av-teal/15 text-av-teal lg:h-52 lg:w-52">
                      <Icon name={item.icon} className="h-22 w-22 lg:h-26 lg:w-26" />
                    </span>
                    <div>
                      <h3 className="t-h6 uppercase tracking-[0.04em]">{item.title}</h3>
                      <p className="t-body mt-4 text-muted lg:mt-6">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal variant="fade" className="av-glow grid grid-cols-2 items-end gap-8 border border-line px-16 pb-24 pt-32 lg:gap-24 lg:px-40 lg:pb-48 lg:pt-56">
            <figure className="flex flex-col items-center">
              <Image
                src="/images/aventurier/ranger-one-front.webp"
                alt="Ranger One from the front"
                width={616}
                height={1178}
                sizes="(min-width: 1001px) 18vw, 40vw"
                className="h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              />
              <figcaption className="t-eyebrow mt-16 !text-[0.6875rem] text-muted">Front</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <Image
                src="/images/aventurier/ranger-one-harness.webp"
                alt="Ranger One harness from behind"
                width={558}
                height={1056}
                sizes="(min-width: 1001px) 18vw, 40vw"
                className="h-auto w-[92%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              />
              <figcaption className="t-eyebrow mt-16 !text-[0.6875rem] text-muted">Harness</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Engineered around the operator */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-120">
        <Reveal>
          <h2 className="t-h2 text-center">Engineered Around the Operator.</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-16 md:grid-cols-2 lg:mt-72 lg:gap-32">
          {OPERATOR.map((item, i) => (
            <li key={item.title}>
              <Reveal
                variant="fade"
                delay={i * 80}
                className={`flex h-full gap-16 border border-line border-l-4 bg-navy p-24 lg:gap-24 lg:p-40 ${
                  item.accent === "red" ? "border-l-av-red" : "border-l-av-teal"
                }`}
              >
                <Icon
                  name={item.icon}
                  className={`h-28 w-28 shrink-0 lg:h-32 lg:w-32 ${item.accent === "red" ? "text-[#e0566c]" : "text-av-teal"}`}
                />
                <div>
                  <h3 className="t-h6 uppercase tracking-[0.04em]">{item.title}</h3>
                  <p className="t-body mt-8 text-muted lg:mt-12">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Where it earns its keep */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
        <Reveal>
          <p className="t-eyebrow text-center text-av-teal">In the field</p>
          <h2 className="t-h2 mx-auto mt-16 text-center lg:mt-24 lg:w-800">Where Ranger One Earns Its Keep.</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 md:grid-cols-3 lg:mt-72 lg:gap-32">
          {PLACES.map((place, i) => (
            <li key={place.title}>
              <Reveal variant="fade" delay={i * 80} className="group h-full overflow-hidden border border-line bg-panel">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src={place.src}
                    alt={`Ranger One in use: ${place.title.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1001px) 30vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-av-red" />
                </div>
                <div className="p-24 lg:p-32">
                  <h3 className="t-h6 uppercase tracking-[0.04em]">{place.title}</h3>
                  <p className="t-body mt-8 text-muted lg:mt-12">{place.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <SpecList
        intro="A commercial-grade cordless dry vacuum with a 400 W brushless motor, four-stage HEPA H13 filtration and a battery shared with Artist 1."
        specs={RANGER_ONE.specs}
        brochure={RANGER_ONE.brochure}
      />

      <BatteryPlatform other={ARTIST_1} />

      <CtaSection title="Ready to Cut the Cord?" formId="enquiry-ranger-one" />
    </>
  );
}
