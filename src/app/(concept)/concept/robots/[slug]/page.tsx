import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PromoVideo from "@/concept/PromoVideo";
import { CtaBand, NumberedItem } from "@/concept/blocks";
import { FLEET, promoVideoSrc, robotHref, to } from "@/concept/data";
import { Arrow, Chip, Eyebrow, Lines, R, SectionHead } from "@/concept/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return FLEET.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concept/robots/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const robot = FLEET.find((r) => r.slug === slug);
  return robot ? { title: robot.name, description: robot.tagline } : {};
}

// Mira's live page borrows the Omnie promo; the concept only shows footage of
// the robot itself, and swaps Omnie's blank poster for a frame from its video.
const VIDEO_OVERRIDES: Record<string, { poster?: string; hide?: boolean }> = {
  mira: { hide: true },
  omnie: { poster: "/concept/omnie-poster.jpg" },
};

export default async function RobotPage({ params }: PageProps<"/concept/robots/[slug]">) {
  const { slug } = await params;
  const index = FLEET.findIndex((r) => r.slug === slug);
  if (index === -1) notFound();
  const robot = FLEET[index];
  const next = FLEET[(index + 1) % FLEET.length];
  const prev = FLEET[(index - 1 + FLEET.length) % FLEET.length];
  const video = VIDEO_OVERRIDES[slug];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-mist pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div className="wrap">
          <R>
            <nav aria-label="Breadcrumb" className="t-mono flex items-center gap-2 text-steel">
              <Link href={to("/robots")} className="hover:text-ink">
                Robots
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink" aria-current="page">
                {robot.meta.no} {robot.name}
              </span>
            </nav>
          </R>
          <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="flex flex-col">
              <R>
                <Eyebrow>
                  {robot.meta.code} · {robot.meta.environment}
                </Eyebrow>
              </R>
              <Lines
                as="h1"
                lines={[robot.name]}
                className="t-display mt-5 !text-[clamp(3.5rem,10vw,10rem)]"
                delay={80}
              />
              <R delay={250}>
                <p className="mt-6 max-w-xl text-[clamp(1.3rem,2vw,1.75rem)] font-[560] leading-[1.15] tracking-[-0.02em] [font-stretch:104%]">
                  {robot.tagline}
                </p>
              </R>
              <R delay={350}>
                <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">{robot.intro}</p>
              </R>
              <R delay={450} className="mt-8 flex flex-wrap gap-3">
                <Link href={`${to("/contact")}?robot=${robot.slug}`} className="btn btn-ink">
                  Book a free demo
                  <Arrow />
                </Link>
                <a href={robot.brochure} target="_blank" rel="noreferrer" className="btn btn-line">
                  Brochure (PDF)
                  <Arrow direction="down" />
                </a>
              </R>
              <R delay={550} className="mt-auto pt-10">
                <p className="t-mono text-steel">Cleaning modes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {robot.meta.modes.map((mode) => (
                    <Chip key={mode}>{mode}</Chip>
                  ))}
                </div>
              </R>
            </div>

            <R variant="scale" delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper">
                <Image
                  src={robot.hero.src}
                  alt={robot.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: robot.meta.focus }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 sm:inset-x-5 sm:bottom-5">
                  {robot.meta.highlights.slice(0, 2).map((h) => (
                    <div key={h.label} className="rounded-2xl bg-surface/85 p-4 backdrop-blur-md">
                      <p className="t-num text-[clamp(1.8rem,3vw,2.6rem)]">
                        {h.value}
                        {h.unit && <span className="ml-1 text-[0.45em] text-steel">{h.unit}</span>}
                      </p>
                      <p className="mt-1.5 text-xs leading-snug text-ink-soft">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ---------------- Numbers ---------------- */}
      <section data-nav="dark" className="bg-night text-white">
        <div className="wrap">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {robot.meta.highlights.map((h, i) => (
              <R
                as="li"
                key={h.label}
                delay={i * 80}
                className={`border-white/10 py-10 lg:py-14 ${i % 2 === 1 ? "border-l pl-5 lg:pl-8" : "pr-5"} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l lg:pl-8" : ""
                }`}
              >
                <p className="t-num text-[clamp(2.4rem,4.4vw,4.25rem)]">
                  {h.value}
                  {h.unit && <span className="ml-1 text-[0.4em] text-glow">{h.unit}</span>}
                </p>
                <p className="mt-3 text-sm text-white/60">{h.label}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Key features" title={[`What makes ${robot.name}`, "different."]} />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {robot.features.map((f, i) => (
              <R as="li" key={f.title} delay={(i % 3) * 90}>
                <NumberedItem no={String(i + 1).padStart(2, "0")} title={f.title} text={f.text} />
              </R>
            ))}
          </ul>
          {robot.featuresNote && <p className="mt-10 text-sm text-steel">{robot.featuresNote}</p>}
        </div>
      </section>

      {/* ---------------- Configurations (PhanShop) ---------------- */}
      {robot.configurations && (
        <section className="bg-mist py-24 lg:py-36">
          <div className="wrap">
            <SectionHead eyebrow="Configurations" title={["Three ways to", "sell while you clean."]} />
            <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
              {robot.configurations.map((c, i) => (
                <R as="li" key={c.name} delay={i * 100} className="overflow-hidden rounded-[1.75rem] bg-surface">
                  <div className="stage relative aspect-square">
                    <Image
                      src={c.image}
                      alt={`${robot.name} ${c.name}`}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="scale-[1.35] object-contain"
                    />
                  </div>
                  <div className="border-t border-rule p-6">
                    <p className="t-mono text-signal-ink">0{i + 1}</p>
                    <p className="mt-3 text-2xl font-[620] tracking-[-0.03em] [font-stretch:108%]">{c.name}</p>
                    <p className="mt-2 text-ink-soft">{c.text}</p>
                  </div>
                </R>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Spec sheet ---------------- */}
      <section className="bg-cloud py-24 lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <R>
              <Eyebrow>Specification · {robot.meta.code}</Eyebrow>
            </R>
            <Lines lines={["The numbers."]} className="t-h2 mt-5" />
            <R delay={150}>
              <p className="t-lead mt-6 text-ink-soft">
                {robot.specsIntro ??
                  `${robot.name} pairs high-performance cleaning hardware with Gausium's autonomous navigation.`}
              </p>
            </R>
            {robot.specsImage && (
              <R delay={200} className="relative mt-8 aspect-[560/365] max-w-sm">
                <Image
                  src={robot.specsImage.src}
                  alt={robot.specsImage.alt}
                  fill
                  sizes="384px"
                  className="object-contain"
                />
              </R>
            )}
            <R delay={250} className="mt-8">
              <a
                href={robot.brochure}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-rule bg-surface p-4 pr-5 transition-colors hover:border-ink"
              >
                <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md bg-signal-soft">
                  <span className="t-mono !text-[0.6rem] text-signal-ink">PDF</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-[600]">{robot.name} brochure</span>
                  <span className="block text-sm text-steel">Full specification, opens in a new tab</span>
                </span>
                <Arrow direction="down" className="h-5 w-5" />
              </a>
            </R>
          </div>

          <R as="div" delay={100}>
            <dl className="border-t border-ink">
              {robot.specs.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_1fr] sm:gap-6 sm:py-5"
                >
                  <dt className="t-mono pt-1 text-steel">{label}</dt>
                  <dd className="text-[1.05rem] font-[500]">
                    {value.split(" / ").map((part) => (
                      <span key={part} className="block">
                        {part}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </R>
        </div>
      </section>

      {/* ---------------- Where it works ---------------- */}
      {(robot.idealFor.length > 0 || robot.floorTypes.length > 0) && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
            {robot.idealFor.length > 0 && (
              <div>
                <SectionHead eyebrow="Ideal for" title={["Where it works best."]} />
                <R delay={150} className="mt-8 flex flex-wrap gap-2">
                  {robot.idealFor.map((x) => (
                    <span key={x} className="rounded-full bg-ink px-4 py-2 text-on-ink">
                      {x}
                    </span>
                  ))}
                </R>
              </div>
            )}
            {robot.floorTypes.length > 0 && (
              <div>
                <SectionHead eyebrow="Floor types" title={["What it cleans."]} />
                <R delay={150} className="mt-8 flex flex-wrap gap-2">
                  {robot.floorTypes.map((x) => (
                    <span key={x} className="rounded-full border border-rule bg-surface px-4 py-2 text-ink-soft">
                      {x}
                    </span>
                  ))}
                </R>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------- Video ---------------- */}
      {!video?.hide && (
        <section className="bg-paper pb-24 lg:pb-32">
          <div className="wrap">
            <R>
              <Eyebrow>In action</Eyebrow>
            </R>
            <R delay={100} className="mt-6" variant="scale">
              <PromoVideo
                src={promoVideoSrc(robot.video.src)}
                poster={video?.poster ?? robot.video.poster}
                title={`${robot.name} in action`}
              />
            </R>
          </div>
        </section>
      )}

      {/* ---------------- Prev / next ---------------- */}
      <section className="bg-paper pb-16">
        <div className="wrap grid gap-4 sm:grid-cols-2">
          {[
            { r: prev, label: "Previous" },
            { r: next, label: "Next" },
          ].map(({ r, label }) => (
            <Link
              key={label}
              href={robotHref(r.slug)}
              className="group flex min-w-0 items-center gap-4 rounded-[1.75rem] bg-surface p-3 pr-5 transition-shadow sm:gap-5 sm:p-4 sm:pr-6 hover:shadow-[0_20px_50px_-25px_rgb(10_13_20/0.35)]"
            >
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist sm:h-24 sm:w-24">
                <Image
                  src={r.hero.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: r.meta.focus }}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-mono block text-steel">
                  {label} · {r.meta.no}
                </span>
                <span className="mt-1 block text-2xl font-[620] tracking-[-0.03em] [font-stretch:108%]">{r.name}</span>
                <span className="block truncate text-sm text-ink-soft">{r.meta.short}</span>
              </span>
              <Arrow className={`h-5 w-5 ${label === "Previous" ? "rotate-180" : ""}`} />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title={`Interested in ${robot.name}?`} query={`robot=${robot.slug}`} />
    </>
  );
}
