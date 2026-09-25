import type { Metadata } from "next";
import CloudDemo from "@/concept/CloudDemo";
import { CtaBand, PageHero } from "@/concept/blocks";
import { INDUSTRIES } from "@/concept/data";
import { Eyebrow, R, SectionHead } from "@/concept/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Assessment, deployment, training, maintenance and remote support for autonomous cleaning robots, anywhere in Ireland.",
};

const PROCESS = [
  {
    step: "01",
    title: "Assessment",
    text: "We visit your facility, assess your floor space, understand your cleaning requirements and identify the right robot for your environment. No assumptions, no generic recommendations.",
    tags: ["Site visit", "Floor & traffic survey", "Robot match"],
  },
  {
    step: "02",
    title: "Deployment",
    text: "Our team handles everything. Robot delivery, floor mapping, path planning, docking station set-up, staff training and initial test runs. Your robot is operational from day one.",
    tags: ["Mapping", "Path planning", "Staff training"],
  },
  {
    step: "03",
    title: "Ongoing support",
    text: "We stay in your corner long term. Scheduled maintenance, software updates, troubleshooting and on-site support whenever you need it. Ireland-wide, reliable and responsive.",
    tags: ["Maintenance", "Updates", "On-site help"],
  },
];

const OFFERINGS = [
  {
    title: "Site assessment and consultation",
    text: "Free assessment of your space, floor type, layout, traffic patterns and cleaning requirements.",
  },
  {
    title: "Robot supply and delivery",
    text: "The full range of Gausium robots, supplied to exactly what your site needs.",
  },
  {
    title: "Professional deployment",
    text: "Floor mapping, robot configuration, docking station installation and path planning.",
  },
  {
    title: "Staff training",
    text: "Hands-on training for your team: operation, safety, basic maintenance and daily checks.",
  },
  {
    title: "Maintenance and servicing",
    text: "Scheduled maintenance visits, part replacement and performance optimisation.",
  },
  {
    title: "Remote monitoring and support",
    text: "Cloud-connected robots with remote diagnostics. We spot issues before they become problems.",
  },
];

const CLOUD = [
  {
    title: "Remote control",
    text: "Remotely activate, pause or stop any robot from your smartphone, anytime, anywhere.",
  },
  {
    title: "Task scheduling",
    text: "Automated cleaning schedules so robots start and finish exactly when you need them.",
  },
  {
    title: "Live monitoring",
    text: "Each robot's current position, cleaning status and performance data in real time.",
  },
  {
    title: "Detailed reporting",
    text: "Full operational reports and historical statistics for data-driven decisions.",
  },
  {
    title: "Instant alerts",
    text: "Push notifications the moment a robot needs attention, detects an issue or completes a task.",
  },
  {
    title: "OTA software updates",
    text: "Automatic over-the-air updates bring new features and improvements at no extra cost.",
  },
];

const WHY = [
  { title: "Irish based", text: "Local expertise and Ireland-wide deployment from our base in Limerick." },
  {
    title: "Gausium certified",
    text: "Official partner of the world's leading commercial cleaning robotics platform.",
  },
  { title: "Full service", text: "We don't just sell robots. We assess, deploy, train and support you long term." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={["From first assessment", "to long-term support."]}
        intro="NOLAR doesn't just deliver a robot. We design, deploy and maintain your entire autonomous cleaning solution, end to end."
      />

      {/* ---------------- Process ---------------- */}
      <section className="bg-paper pb-24 lg:pb-36">
        <div className="wrap">
          <R className="relative">
            {/* The route that links the three stages draws itself in */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 40"
              preserveAspectRatio="none"
              className="absolute left-0 top-[1.9rem] hidden h-10 w-full lg:block"
            >
              <path
                d="M40 20 H1160"
                pathLength={1}
                className="draw-line"
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="2"
                strokeDasharray="1 1"
              />
            </svg>
            <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-6">
              {PROCESS.map((p, i) => (
                <li
                  key={p.step}
                  className="rounded-[1.75rem] bg-surface p-7 lg:p-8"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-signal font-mono text-sm text-white ring-8 ring-paper">
                    {p.step}
                  </span>
                  <h2 className="mt-8 text-[clamp(1.8rem,2.6vw,2.4rem)] font-[620] leading-none tracking-[-0.035em] [font-stretch:108%]">
                    {p.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-paper px-3 py-1.5 text-xs text-ink-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </R>
        </div>
      </section>

      {/* ---------------- Offerings ---------------- */}
      <section className="grid-lines bg-mist py-24 lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="What's included"
              title={["Everything you need.", "Nothing you don’t."]}
              intro="One partner from the first site visit to the thousandth clean."
            />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-rule bg-rule sm:grid-cols-2">
            {OFFERINGS.map((o, i) => (
              <R
                as="li"
                key={o.title}
                delay={(i % 2) * 90}
                className="group bg-surface p-7 transition-colors hover:bg-signal hover:text-white"
              >
                <p className="t-mono text-signal-ink transition-colors group-hover:text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-h3 mt-6">{o.title}</h3>
                <p className="mt-3 text-ink-soft transition-colors group-hover:text-white/80">{o.text}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Cloud ---------------- */}
      <section data-nav="dark" className="grid-lines-dark relative overflow-hidden bg-night py-24 text-white lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-40 h-[36rem] w-[36rem] rounded-full bg-signal/25 blur-[140px]"
        />
        <div className="wrap relative">
          <SectionHead
            dark
            eyebrow="Gausium Cloud Platform"
            title={["Full control.", "From anywhere."]}
            intro="Every NOLAR robot connects to the Gausium Cloud Platform and mobile app, giving you complete visibility and control of your cleaning operation from any smartphone, tablet or PC."
          />
          <R variant="scale" className="mt-14 lg:mt-20">
            <CloudDemo />
          </R>
          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {CLOUD.map((c, i) => (
              <R as="li" key={c.title} delay={(i % 3) * 80} className="border-t border-white/15 pt-5">
                <p className="t-mono text-glow">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4 text-white">{c.title}</h3>
                <p className="mt-2 text-white/60">{c.text}</p>
              </R>
            ))}
          </ul>
          <R className="mt-20">
            <p className="text-center text-[clamp(1.6rem,3.4vw,3rem)] font-[600] leading-tight tracking-[-0.03em] [font-stretch:106%]">
              Your robots work. <span className="text-white/55">You watch.</span>{" "}
              <span className="text-glow">NOLAR supports.</span>
            </p>
          </R>
        </div>
      </section>

      {/* ---------------- Industries ---------------- */}
      <section className="overflow-hidden bg-paper py-24 lg:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Industries" title={["Industries we", "work with."]} />
        </div>
        <div className="mt-12 space-y-3 lg:mt-16">
          {[0, 1].map((row) => (
            <div key={row} className="marquee-wrap">
              <div
                className="marquee"
                style={
                  {
                    "--speed": row ? "70s" : "55s",
                    animationDirection: row ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {[0, 1].map((copy) => (
                  <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 || row === 1}>
                    {(row ? [...INDUSTRIES].reverse() : INDUSTRIES).map((name) => (
                      <li
                        key={name}
                        className={`whitespace-nowrap rounded-full px-7 py-4 text-[clamp(1.1rem,1.8vw,1.6rem)] font-[560] tracking-[-0.02em] ${
                          row ? "border border-rule text-ink-soft" : "bg-ink text-on-ink"
                        }`}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Why ---------------- */}
      <section className="bg-paper pb-24 lg:pb-32">
        <div className="wrap">
          <R>
            <Eyebrow>Why NOLAR</Eyebrow>
          </R>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {WHY.map((w, i) => (
              <R as="li" key={w.title} delay={i * 90} className="rounded-[1.75rem] bg-surface p-8">
                <p className="text-[clamp(1.8rem,2.6vw,2.4rem)] font-[620] leading-none tracking-[-0.035em] [font-stretch:108%]">
                  {w.title}
                </p>
                <p className="mt-4 text-ink-soft">{w.text}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
