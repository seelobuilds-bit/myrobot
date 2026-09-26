import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CloudDemo from "@/concept/CloudDemo";
import Counter from "@/concept/Counter";
import Finder from "@/concept/Finder";
import FleetIndex from "@/concept/FleetIndex";
import IrelandMap from "@/concept/IrelandMap";
import LoopVideo from "@/concept/LoopVideo";
import NightShift from "@/concept/NightShift";
import { AVENTURIER, HEADLINE_STATS, INDUSTRIES, machineHref, robotHref, to } from "@/concept/data";
import { Arrow, Eyebrow, Lines, R, SectionHead } from "@/concept/ui";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "NOLAR — The future of clean is already here" },
};

const PILLARS = [
  {
    no: "01",
    title: "Assess",
    text: "We visit your site, map the floor, traffic and cleaning needs, and match the right robot to it.",
  },
  {
    no: "02",
    title: "Deploy",
    text: "Delivery, mapping, path planning, docking set-up and staff training. Working from day one.",
  },
  {
    no: "03",
    title: "Support",
    text: "Maintenance, updates and on-site help whenever you need it, anywhere in Ireland.",
  },
];

// Hotspots on the studio render, as a percentage of the image.
const HOTSPOTS = [
  { slug: "omnie", name: "Omnie", no: "05", x: 38.4, y: 66 },
  { slug: "marvel", name: "Marvel", no: "06", x: 90.2, y: 65 },
];

const CLOUD_POINTS = [
  { title: "Remote control", text: "Start, pause or stop any robot from your phone, in real time." },
  { title: "Task scheduling", text: "Robots start and finish exactly when you need them." },
  { title: "Live monitoring", text: "Position, cleaning status and performance as it happens." },
  { title: "Detailed reporting", text: "Full reports and history for data-driven decisions." },
  { title: "Instant alerts", text: "Push notifications when a robot needs attention or finishes." },
  { title: "OTA updates", text: "New features and improvements arrive automatically." },
];

export default function ConceptHome() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero relative overflow-hidden bg-mist lg:min-h-[max(100svh,56.8vw)]">
        {/* Dark theme: LiDAR footage replaces the white studio render, which
            only blends into the light page. */}
        <div className="dark-only absolute inset-0">
          <LoopVideo
            src="/concept/hero-dark.mp4"
            poster="/concept/hero-dark-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover object-[65%_50%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-paper/85 lg:via-paper/30 lg:to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[90%] bg-gradient-to-t from-paper from-40% via-paper/80 to-transparent lg:h-[62%] lg:from-0%"
          />
          <p className="t-mono absolute bottom-[5.25rem] right-[var(--gutter)] hidden items-center gap-2.5 text-ink-soft lg:flex">
            <span aria-hidden="true" className="blink h-1.5 w-1.5 rounded-full bg-lidar" />
            Omnie &amp; Beetle · 3D LiDAR navigation
          </p>
        </div>

        {/* Desktop: the studio render spans the full width and sits on the floor of
            the hero. Its backdrop is the same grey as the section, so any extra
            height above it is seamless. */}
        <div className="light-only hero-drift absolute inset-x-0 bottom-[-6%] hidden aspect-[4400/2497] lg:block">
          <Image
            src="/images/contact-hero.jpg"
            alt="The Gausium robot range in a white studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* LiDAR sweep across the fleet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[10%] top-[56%] overflow-hidden"
          >
            <div className="scanline absolute inset-y-0 left-0 w-[16vw]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-signal/[0.04] to-signal/[0.16]" />
              <div className="absolute inset-y-0 right-0 w-px bg-signal shadow-[0_0_18px_4px_rgb(35_64_255/0.5)]" />
            </div>
          </div>
          {HOTSPOTS.map((h, i) => (
            <Link
              key={h.slug}
              href={robotHref(h.slug)}
              className="group absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className="pop-in flex flex-col items-center" style={{ animationDelay: `${1400 + i * 200}ms` }}>
                <span className="flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1 pr-3 shadow-[0_8px_24px_-10px_rgb(10_13_20/0.35)] backdrop-blur transition-colors group-hover:bg-ink group-hover:text-white">
                  <span className="t-mono flex h-6 w-6 items-center justify-center rounded-full bg-signal !text-[0.6rem] !tracking-normal text-white">
                    {h.no}
                  </span>
                  <span className="text-sm font-[600]">{h.name}</span>
                  <Arrow className="h-3.5 w-3.5" />
                </span>
                <span className="h-8 w-px bg-ink/40" />
                <span className="relative h-2 w-2">
                  <span className="ping absolute inset-0 rounded-full bg-signal" />
                  <span className="absolute inset-0 rounded-full bg-signal" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="hero-copy wrap relative pb-10 pt-28 sm:pt-32 lg:pb-0 lg:pt-[7.5rem]">
          <R>
            <Eyebrow>Autonomous cleaning · Limerick to all of Ireland</Eyebrow>
          </R>
          <Lines
            as="h1"
            lines={["The future of clean", "is already here."]}
            className="t-display mt-6 !text-[clamp(3rem,6.6vw,7.75rem)] lg:mt-7"
            delay={120}
            step={120}
          />
          <div className="hero-row mt-8 lg:mt-9 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <R delay={450} className="max-w-[33rem]">
              <p className="t-lead text-ink-soft">
                NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that work
                while your team focuses on what matters.
              </p>
            </R>
            <R delay={600} className="hero-ctas mt-8 flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-0">
              <Link href={to("/contact")} className="btn btn-ink w-full sm:w-auto">
                Book a free demo
                <Arrow />
              </Link>
              <Link href={`${to("/robots")}#finder`} className="hero-ghost btn btn-line w-full sm:w-auto">
                Find your robot
              </Link>
            </R>
          </div>
        </div>

        {/* Phone/tablet: a tight crop of the fleet under the copy */}
        <div className="light-only relative aspect-[16/11] overflow-hidden sm:aspect-[16/9] lg:hidden">
          <Image
            src="/images/contact-hero.jpg"
            alt="The Gausium robot range in a white studio"
            fill
            priority
            sizes="180vw"
            className="origin-[74%_84%] scale-[1.9] object-cover sm:scale-[1.5]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[6%] top-[28%] overflow-hidden"
          >
            <div className="scanline absolute inset-y-0 left-0 w-[30vw]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-signal/20" />
              <div className="absolute inset-y-0 right-0 w-px bg-signal shadow-[0_0_14px_3px_rgb(35_64_255/0.55)]" />
            </div>
          </div>
        </div>

        {/* Industries ticker */}
        <div className="marquee-wrap relative border-t border-ink/10 bg-mist/70 py-4 backdrop-blur lg:absolute lg:inset-x-0 lg:bottom-0">
          <div className="marquee" style={{ "--speed": "55s" } as React.CSSProperties}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {INDUSTRIES.map((name) => (
                  <li key={name} className="t-mono flex items-center gap-8 px-4 text-ink-soft">
                    {name}
                    <span className="h-1 w-1 rounded-full bg-signal" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Who we are ---------------- */}
      <section className="relative bg-paper py-24 lg:py-40">
        <div className="wrap grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <div>
            <R>
              <Eyebrow>Who we are</Eyebrow>
            </R>
            <Lines
              lines={[
                "We don’t just sell robots.",
                <span key="b" className="text-signal-ink">
                  We make them work for you.
                </span>,
              ]}
              className="t-h1 mt-6"
            />
          </div>
          <div className="lg:pt-16">
            <R>
              <p className="t-lead text-ink-soft">
                NOLAR Tech Limited is Ireland&apos;s only dedicated autonomous cleaning specialist. Based in Limerick,
                we deploy Gausium robots, the world&apos;s number one commercial cleaning robotics platform, across
                Ireland.
              </p>
            </R>
            <ol className="mt-10 border-t border-rule">
              {PILLARS.map((p, i) => (
                <R
                  key={p.no}
                  as="li"
                  delay={i * 90}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule py-6"
                >
                  <span className="t-mono pt-1.5 text-signal-ink">{p.no}</span>
                  <div>
                    <h3 className="t-h3">{p.title}</h3>
                    <p className="mt-2 text-ink-soft">{p.text}</p>
                  </div>
                </R>
              ))}
            </ol>
            <R className="mt-8">
              <Link href={to("/services")} className="group inline-flex items-center gap-2 font-[560] text-ink">
                <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-signal group-hover:text-signal-ink">
                  How we work, end to end
                </span>
                <Arrow />
              </Link>
            </R>
          </div>
        </div>
      </section>

      {/* ---------------- Night shift ---------------- */}
      <NightShift />

      {/* ---------------- Stats ---------------- */}
      <section className="bg-night pb-24 text-white lg:pb-32" data-nav="dark">
        <div className="wrap">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 lg:grid-cols-4">
            {HEADLINE_STATS.map((s, i) => (
              <R key={s.label} as="li" delay={i * 90} className="bg-night p-5 sm:p-7 lg:p-8">
                <p className="t-num whitespace-nowrap text-[clamp(2.2rem,3.9vw,4rem)]">
                  <Counter value={s.value} />
                  <span className="ml-0.5 text-[0.55em] text-glow">{s.suffix}</span>
                </p>
                <p className="mt-5 font-[560]">{s.label}</p>
                <p className="mt-1 text-sm text-white/50">{s.note}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Fleet ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="The fleet"
              title={["Seven robots.", "One for every floor."]}
              intro="Every robot in the range is purpose-built for a specific environment and cleaning challenge, from compact four-in-one scrubbers to industrial sweepers."
            />
            <R className="shrink-0">
              <Link href={`${to("/robots")}#compare`} className="btn btn-line">
                Compare the fleet
                <Arrow />
              </Link>
            </R>
          </div>
          <div className="mt-14 lg:mt-20">
            <FleetIndex />
          </div>
        </div>
      </section>

      {/* ---------------- Finder ---------------- */}
      <section id="finder" className="grid-lines relative bg-mist py-24 lg:py-36">
        <div className="wrap">
          <SectionHead
            eyebrow="Robot finder"
            title={["Find your robot", "in ten seconds."]}
            intro="Tell us the kind of space and roughly how big it is. We'll suggest a starting point and how long it takes to cover."
          />
          <R className="mt-12 lg:mt-16" variant="scale">
            <Finder />
          </R>
        </div>
      </section>

      {/* ---------------- Alongside people ---------------- */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="wrap">
          <R variant="scale" className="relative overflow-hidden rounded-[2rem] bg-night text-white">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
              <LoopVideo
                src="/concept/day.mp4"
                poster="/concept/day-poster.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent lg:bg-gradient-to-r lg:from-night/80 lg:via-night/25"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:inset-y-0 lg:flex lg:max-w-xl lg:flex-col lg:justify-end lg:p-14">
                <Eyebrow tone="light">Daytime, too</Eyebrow>
                <h2 className="t-h2 mt-4">Safe alongside people. Quiet around customers.</h2>
                <p className="mt-4 max-w-md text-white/75">
                  AI obstacle avoidance trained on millions of real-world images means robots work through trading hours
                  without getting in anyone&apos;s way.
                </p>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ---------------- Cloud ---------------- */}
      <section data-nav="dark" className="grid-lines-dark relative overflow-hidden bg-night py-24 text-white lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full bg-signal/25 blur-[140px]"
        />
        <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              dark
              eyebrow="Gausium Cloud Platform"
              title={["Full control.", "From anywhere."]}
              intro="Every NOLAR robot connects to the cloud platform and mobile app, so you can see and steer your whole cleaning operation from a phone, tablet or PC."
            />
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              {CLOUD_POINTS.map((c, i) => (
                <R as="li" key={c.title} delay={i * 60}>
                  <p className="font-[600]">{c.title}</p>
                  <p className="mt-1 text-sm leading-snug text-white/55">{c.text}</p>
                </R>
              ))}
            </ul>
          </div>
          <R variant="scale">
            <CloudDemo />
          </R>
        </div>
        <div className="wrap relative mt-16 lg:mt-24">
          <R>
            <p className="t-mono text-center text-white/55">Your robots work · You watch · NOLAR supports</p>
          </R>
        </div>
      </section>

      {/* ---------------- Aventurier ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <R>
                <Eyebrow className="!text-av-ink">Aventurier · operator-led</Eyebrow>
              </R>
              <Lines lines={["Robots for the", "big floors.", "Aventurier for", "the rest."]} className="t-h2 mt-5" />
              <R delay={150}>
                <p className="t-lead mt-6 text-ink-soft">
                  Not every job suits a robot. Cordless Aventurier machines give your team professional tools for
                  stairs, seating, vehicle interiors and the tight spots, all on one shared battery.
                </p>
              </R>
              <R delay={250} className="mt-8">
                <Link href={to("/aventurier")} className="btn btn-line">
                  Explore Aventurier
                  <Arrow />
                </Link>
              </R>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {AVENTURIER.map((m, i) => (
                <R as="li" key={m.slug} delay={i * 120} className={i === 1 ? "sm:mt-16" : ""}>
                  <Link href={machineHref(m.slug)} className="group block overflow-hidden rounded-[1.75rem] bg-surface">
                    <div className="relative flex h-[26rem] items-end justify-center overflow-hidden stage pt-8">
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
                        width={m.image.width}
                        height={m.image.height}
                        sizes="(min-width: 1024px) 22vw, 60vw"
                        className="h-[88%] w-auto object-contain drop-shadow-[0_30px_30px_rgb(10_13_20/0.25)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-[1.02]"
                      />
                      <span className="t-mono absolute left-5 top-5 text-av-ink">{m.category}</span>
                    </div>
                    <div className="flex items-end justify-between gap-4 p-6">
                      <div>
                        <p className="text-2xl font-[620] tracking-[-0.03em] [font-stretch:108%]">{m.name}</p>
                        <p className="mt-1 text-sm text-steel">
                          {m.heroStats[0].value} · {m.heroStats[0].label.toLowerCase()}
                        </p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-av group-hover:bg-av group-hover:text-white">
                        <Arrow />
                      </span>
                    </div>
                  </Link>
                </R>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Ireland-wide + CTA ---------------- */}
      <section className="relative overflow-hidden bg-mist py-24 lg:py-32">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <R variant="fade" className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-[31rem]">
            <IrelandMap className="h-auto w-full" />
          </R>
          <div className="order-1 lg:order-2">
            <SectionHead
              eyebrow="Ireland-wide deployment"
              title={["Limerick-based.", "Everywhere else, too."]}
              intro="Full service, delivery and technical support anywhere in the Republic of Ireland. Distance is never a barrier to a modern, autonomous cleaning fleet."
            />
            <R delay={200} className="mt-10 rounded-[1.75rem] border border-white/10 bg-night p-6 text-white sm:p-8">
              <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-[600] leading-tight tracking-[-0.03em] [font-stretch:106%]">
                Book a free site assessment and demo, anywhere in Ireland.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={to("/contact")} className="btn btn-signal">
                  Book a free demo
                  <Arrow />
                </Link>
                <a href={CONTACT.phoneHref} className="btn btn-line-light">
                  {CONTACT.phone}
                </a>
              </div>
              <p className="mt-6 text-sm text-white/50">
                Or email{" "}
                <a
                  href={CONTACT.emailHref}
                  className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {CONTACT.email}
                </a>
              </p>
            </R>
          </div>
        </div>
      </section>
    </>
  );
}
