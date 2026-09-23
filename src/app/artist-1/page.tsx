import type { Metadata } from "next";
import Image from "next/image";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import BatteryPlatform from "@/components/aventurier/BatteryPlatform";
import Icon, { type IconName } from "@/components/aventurier/Icon";
import MachineHero from "@/components/aventurier/MachineHero";
import SpecList from "@/components/aventurier/SpecList";
import StatBand from "@/components/aventurier/StatBand";
import {
  ARTIST_1,
  ARTIST_COMPARISON,
  ARTIST_VERSIONS,
  ELECTROLYSIS_NOTE,
  RANGER_ONE,
} from "@/data/aventurier";

export const metadata: Metadata = {
  title: "Artist 1 Scrubber Dryer",
  description: ARTIST_1.summary,
};

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: "drop", title: "One-Pass Results", text: "Scrub, recover water and leave floors ready to use." },
  { icon: "rotate", title: "Easy to Handle", text: "360° control, compact access and operator support." },
  { icon: "wrench", title: "Less Downtime", text: "Hot-swappable batteries and tool-free maintenance." },
];

const CONTROL_POINTS: { icon: IconName; text: string }[] = [
  { icon: "screen", text: "Full-colour LCD and voice speaker on SE and PRO" },
  { icon: "signal", text: "Wi-Fi on every version, plus 4G/SIM on PRO" },
  { icon: "battery", text: "Two hot-swappable batteries for up to 150 minutes in Eco" },
];

const GALLERY = [
  { src: "/images/aventurier/artist-1-angle.webp", w: 767, h: 1837, caption: "Twin brush deck" },
  { src: "/images/aventurier/artist-1-tilted.webp", w: 1512, h: 2088, caption: "Working position" },
  { src: "/images/aventurier/artist-1-upright.webp", w: 982, h: 2400, caption: "Handle and display" },
  { src: "/images/aventurier/artist-1-rear.webp", w: 798, h: 1950, caption: "Rear view" },
];

const TONE = {
  teal: { bar: "bg-av-teal", head: "bg-av-teal text-white", text: "text-av-teal" },
  slate: { bar: "bg-[#3a6aa5]", head: "bg-av-slate text-white", text: "text-[#7fa6d8]" },
  red: { bar: "bg-av-red", head: "bg-av-red text-white", text: "text-[#e0566c]" },
};

const VERSION_TONES = ARTIST_VERSIONS.map((version) => TONE[version.tone]);

export default function Artist1Page() {
  return (
    <>
      <MachineHero machine={ARTIST_1} badge="YOUTH · SE · PRO" />

      <StatBand stats={ARTIST_1.stats} label="Artist 1 key figures" />

      {/* Benefits */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
        <Reveal>
          <p className="t-eyebrow text-center text-av-teal">Built for real commercial cleaning</p>
          <h2 className="t-h2 mx-auto mt-16 text-center lg:mt-24 lg:w-800">Clean and Dry in One Pass.</h2>
          <p className="t-lead mx-auto mt-16 text-center text-muted lg:mt-28 lg:w-640">
            Twin brushes scrub while powerful suction recovers the dirty water behind them, so floors are ready to
            use straight away. No mop, no bucket.
          </p>
        </Reveal>
        <ul className="mt-48 grid grid-cols-1 gap-16 md:grid-cols-3 lg:mt-72 lg:gap-32">
          {BENEFITS.map((item, i) => (
            <li key={item.title}>
              <Reveal variant="fade" delay={i * 80} className="h-full border border-line bg-panel p-24 lg:p-40">
                <span className="flex h-48 w-48 items-center justify-center rounded-full bg-av-red/15 text-[#e0566c] lg:h-56 lg:w-56">
                  <Icon name={item.icon} className="h-24 w-24 lg:h-28 lg:w-28" />
                </span>
                <h3 className="t-h5 mt-20 lg:mt-28">{item.title}</h3>
                <p className="t-body mt-10 text-muted lg:mt-14">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Control */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-120">
        <div className="grid grid-cols-1 items-center gap-40 lg:grid-cols-2 lg:gap-96">
          <Reveal variant="fade" className="av-glow relative flex aspect-[4/3] items-center justify-center">
            <Image
              src="/images/aventurier/artist-1-console.webp"
              alt="Artist 1 handle with full-colour display"
              width={1600}
              height={1187}
              sizes="(min-width: 1001px) 40vw, 90vw"
              className="h-auto w-[88%] drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="t-eyebrow text-av-teal">Easy to handle</p>
              <h2 className="t-h2 mt-16 lg:mt-24">Control at Your Fingertips.</h2>
              <p className="t-body mt-16 text-muted lg:mt-28">
                360° control and compact access make Artist 1 easy to guide around busy spaces and into tight
                corners. SE and PRO add on-machine guidance, and PRO responds to dirty areas automatically.
              </p>
            </Reveal>
            <ul className="mt-28 space-y-12 lg:mt-40 lg:space-y-16">
              {CONTROL_POINTS.map((point, i) => (
                <li key={point.text}>
                  <Reveal variant="fade" delay={i * 80} className="flex items-center gap-16 border-b border-line pb-12 lg:pb-16">
                    <Icon name={point.icon} className="h-24 w-24 shrink-0 text-av-teal" />
                    <span className="t-body text-ink">{point.text}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Versions */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
        <div className="grid grid-cols-1 items-end gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-64">
          <Reveal>
            <p className="t-eyebrow text-av-teal">Youth · SE · Pro</p>
            <h2 className="t-h2 mt-16 lg:mt-24">Three Versions. One Cleaning Platform.</h2>
          </Reveal>
          <Reveal>
            <p className="t-lead text-muted">
              Every Artist 1 shares the same scrubbing performance. Choose the level of guidance, automation and
              connectivity your team needs.
            </p>
          </Reveal>
        </div>

        <ul className="mt-40 grid grid-cols-1 gap-16 md:grid-cols-3 lg:mt-72 lg:gap-32">
          {ARTIST_VERSIONS.map((version, i) => {
            const tone = VERSION_TONES[i];
            return (
              <li key={version.name}>
                <Reveal variant="fade" delay={i * 80} className="relative flex h-full flex-col border border-line bg-panel">
                  <span aria-hidden="true" className={`h-4 w-full ${tone.bar}`} />
                  <div className="flex flex-1 flex-col p-24 lg:p-40">
                    <div className="flex items-center justify-between gap-12">
                      <h3 className="text-[1.75rem] font-bold tracking-[0.12em] text-white lg:text-[2.25rem]">
                        {version.name}
                      </h3>
                      {version.name === "PRO" && (
                        <span className="t-eyebrow rounded-full border border-av-red px-12 py-4 !text-[0.6875rem] text-[#e0566c]">
                          Most advanced
                        </span>
                      )}
                    </div>
                    <p className="t-body mt-12 text-ink lg:mt-16">{version.summary}</p>
                    <ul className="mt-20 space-y-10 border-t border-line pt-20 lg:mt-28 lg:pt-28">
                      {version.points.map((point) => (
                        <li key={point} className="t-small flex gap-10 text-muted">
                          <Icon name="check" className={`mt-1 h-16 w-16 shrink-0 ${tone.text}`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Comparison */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-120">
        <Reveal>
          <h2 className="t-h2 text-center">Choose the Right Artist 1</h2>
        </Reveal>
        <Reveal className="mt-40 lg:mt-64">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th scope="col" className="t-eyebrow hidden bg-av-navy px-20 py-18 text-left text-white lg:table-cell">
                  Feature
                </th>
                {ARTIST_VERSIONS.map((version, i) => (
                  <th
                    key={version.name}
                    scope="col"
                    className={`t-eyebrow w-1/3 px-8 py-14 lg:w-1/4 lg:py-18 ${VERSION_TONES[i].head}`}
                  >
                    {version.name}
                  </th>
                ))}
              </tr>
            </thead>
            {ARTIST_COMPARISON.map(([feature, ...values]) => (
              <tbody key={feature}>
                {/* Phones: the feature name gets its own full-width row above the values. */}
                <tr className="lg:hidden">
                  <th scope="colgroup" colSpan={3} className="t-eyebrow px-8 pb-8 pt-20 text-left !text-[0.75rem] text-muted">
                    {feature}
                  </th>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="t-small hidden px-20 py-18 text-left font-normal uppercase tracking-[0.08em] text-muted lg:table-cell">
                    {feature}
                  </th>
                  {values.map((value, i) => (
                    <td
                      key={i}
                      className={`t-small whitespace-pre-line px-6 pb-14 pt-4 align-middle lg:py-18 lg:!text-[1rem] ${
                        value === "No" ? "text-muted/60" : "text-ink"
                      }`}
                    >
                      {value === "Yes" ? (
                        <>
                          <Icon name="check" className={`mx-auto h-18 w-18 ${VERSION_TONES[i].text}`} />
                          <span className="sr-only">Yes</span>
                        </>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            ))}
          </table>
          <p className="t-small mt-20 text-muted">{ELECTROLYSIS_NOTE}</p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="bg-navy py-80 lg:px-80 lg:py-120">
        <Reveal className="px-24 lg:px-0">
          <h2 className="t-h2">Designed From Every Angle.</h2>
        </Reveal>
        <ul className="no-scrollbar mt-40 flex snap-x snap-mandatory gap-16 overflow-x-auto px-24 pb-8 lg:mt-64 lg:grid lg:grid-cols-4 lg:gap-24 lg:overflow-visible lg:px-0 lg:pb-0">
          {GALLERY.map((shot, i) => (
            <li key={shot.src} className="w-[72%] shrink-0 snap-center md:w-[40%] lg:w-auto">
              <Reveal variant="fade" delay={i * 80} className="border border-line bg-panel">
                <div className="av-glow flex h-360 items-center justify-center p-24 lg:h-440">
                  <Image
                    src={shot.src}
                    alt={`Artist 1: ${shot.caption.toLowerCase()}`}
                    width={shot.w}
                    height={shot.h}
                    sizes="(min-width: 1001px) 20vw, 70vw"
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
                <p className="t-eyebrow border-t border-line px-16 py-14 text-muted">{shot.caption}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <SpecList
        intro="Compact enough for busy commercial spaces, with the suction and brush pressure to leave floors clean and dry in a single pass."
        specs={ARTIST_1.specs}
        brochure={ARTIST_1.brochure}
      />

      <BatteryPlatform other={RANGER_ONE} />

      <CtaSection title="Interested in Artist 1?" formId="enquiry-artist-1" />
    </>
  );
}
