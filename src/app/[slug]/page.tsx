import type { Metadata } from "next";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";
import { ROBOTS, getRobot, type Robot } from "@/data/robots";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROBOTS.map((robot) => ({ slug: robot.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const robot = getRobot(slug);
  return robot ? { title: robot.name, description: robot.tagline } : {};
}

function Features({ robot }: { robot: Robot }) {
  const boxed = robot.slug === "phantas";
  return (
    <section className={`${boxed ? "bg-panel" : "bg-navy"} px-24 py-80 lg:px-40 lg:pb-100 lg:pt-80`}>
      <Reveal>
        <h2 className={`t-h2 ${robot.featuresTitleAlign === "center" ? "text-center" : "text-left"}`}>
          Key Features
        </h2>
      </Reveal>
      <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-48 lg:grid-cols-3 lg:gap-32">
        {robot.features.map((feature, i) => (
          <li key={feature.title}>
            <Reveal
              variant="fade"
              delay={i * 50}
              className={`h-full p-24 lg:min-h-188 lg:p-32 ${
                boxed ? "border border-muted bg-line" : "border border-line"
              }`}
            >
              <h3 className="t-h5">{feature.title}</h3>
              <p className="t-body mt-12 text-muted lg:mt-16">{feature.text}</p>
              {robot.featuresNote && i === robot.features.length - 1 && (
                <p className="t-body mt-6 text-muted">{robot.featuresNote}</p>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Configurations({ robot }: { robot: Robot }) {
  if (!robot.configurations) return null;
  return (
    <section className="bg-panel px-24 py-80 lg:px-80 lg:pb-100 lg:pt-80">
      <Reveal>
        <h2 className="t-h2 text-center">Configurations</h2>
      </Reveal>
      <ul className="mt-40 grid grid-cols-1 gap-40 lg:mt-80 lg:grid-cols-3 lg:gap-88">
        {robot.configurations.map((config, i) => (
          <li key={config.name}>
            <Reveal variant="fade" delay={i * 50} className="flex flex-col items-center">
              <div className="relative aspect-square w-full">
                <Image
                  src={config.image}
                  alt={`PhanShop ${config.name}`}
                  fill
                  sizes="(min-width: 1001px) 25vw, 90vw"
                  className="object-contain"
                />
              </div>
              <h3 className="t-h5 mt-24 text-center lg:mt-33">{config.name}</h3>
              <p className="t-body mt-12 text-center text-muted lg:mt-16">{config.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Specs({ robot }: { robot: Robot }) {
  if (robot.specsStyle === "rows") {
    return (
      <section className="bg-navy px-24 py-80 lg:px-64 lg:pb-100 lg:pt-80">
        <Reveal>
          <h2 className="t-h2">Specifications</h2>
          {robot.specsIntro && <p className="t-body mt-12 text-muted lg:mt-24 lg:w-768">{robot.specsIntro}</p>}
        </Reveal>
        <dl className="mt-40 lg:mt-70">
          {robot.specs.map(([label, value]) => (
            <Reveal
              key={label}
              className="grid grid-cols-1 gap-6 border-b border-line py-14 lg:min-h-[var(--spec-row-h)] lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-0"
              style={{ "--spec-row-h": `${robot.specRowH / 16}rem` } as React.CSSProperties}
            >
              <dt className="t-h6">{label}</dt>
              <dd className="t-body self-center text-muted">{value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
    );
  }

  return (
    <section className="bg-navy px-24 py-80 lg:px-80 lg:pb-100 lg:pt-140">
      <div className="grid grid-cols-1 gap-40 lg:grid-cols-[31rem_39rem] lg:gap-0">
        <Reveal>
          <h2 className="t-h2 lg:tracking-[-0.01em]">Specifications</h2>
          {robot.specsIntro && <p className="t-body mt-12 text-muted lg:mt-24">{robot.specsIntro}</p>}
          {robot.specsImage && (
            <div className="relative mt-32 aspect-[784/511] w-full lg:-ml-120 lg:mt-70 lg:w-[125%]">
              <Image
                src={robot.specsImage.src}
                alt={robot.specsImage.alt}
                fill
                sizes="(min-width: 1001px) 50vw, 90vw"
                className="object-contain"
              />
            </div>
          )}
        </Reveal>
        <dl>
          {robot.specs.map(([label, value], i) => (
            <Reveal
              key={label}
              className="flex min-h-56 items-center justify-between gap-24 border-b border-line lg:min-h-[var(--spec-row-h)]"
              style={
                {
                  "--spec-row-h": `${robot.specRowH / 16}rem`,
                  marginBottom: i === 0 && robot.specGapAfterFirst ? `${robot.specGapAfterFirst / 16}rem` : undefined,
                } as React.CSSProperties
              }
            >
              <dt className={robot.slug === "phantas" ? "t-h6 !font-normal" : "t-body text-ink"}>{label}</dt>
              <dd
                className={`t-body text-muted ${
                  robot.specsValueAlign === "right" ? "text-right" : "w-1/2 text-left"
                }`}
              >
                {value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ChipGroup({ title, items, robot }: { title: string; items: string[]; robot: Robot }) {
  if (items.length === 0) return null;
  const style = robot.chipsStyle;
  const heading =
    style === "h3"
      ? "t-h3"
      : style === "h4"
        ? "t-h4"
        : style === "h6-center"
          ? "t-h6 text-center"
          : "t-h6 uppercase";
  const centered = style === "h6-center";

  return (
    <Reveal className="mt-40 first:mt-0 lg:mt-60">
      <h3 className={heading}>{title}</h3>
      <ul className={`mt-16 flex flex-wrap gap-12 lg:mt-24 ${centered ? "justify-center" : ""}`}>
        {items.map((item) => (
          <li
            key={item}
            className={`bg-line px-16 py-16 text-ink ${centered ? "t-body" : "t-small"} ${
              style === "h3" && title === "Ideal For" ? "uppercase" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function RobotPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const robot = getRobot(slug);
  if (!robot) notFound();

  const hasChips = robot.idealFor.length > 0 || robot.floorTypes.length > 0;

  return (
    <>
      {/* Hero */}
      <section
        className="bg-navy px-24 pb-60 pt-[var(--hero-top-m)] lg:px-0 lg:pb-[var(--hero-bottom)] lg:pt-[var(--hero-top)]"
        style={
          {
            "--hero-top": `${robot.heroBox.top / 16}rem`,
            "--hero-top-m": `${robot.heroMobile.top / 16}rem`,
            "--hero-bottom": `${robot.heroBox.bottom / 16}rem`,
            "--hero-left": `${robot.heroBox.left / 16}rem`,
            "--hero-text-w": `${robot.heroBox.textW / 16}rem`,
            "--hero-img-left": `${(robot.heroBox.imgLeft - robot.heroBox.left - robot.heroBox.textW) / 16}rem`,
            "--hero-img-w": `${robot.heroBox.imgW / 16}rem`,
            "--hero-img-top": `${robot.heroBox.imgTop / 16}rem`,
            "--hero-tagline-w": `${robot.heroBox.taglineW / 16}rem`,
            "--hero-intro-w": `${robot.heroBox.introW / 16}rem`,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col gap-32 lg:flex-row lg:items-start lg:gap-0 lg:pl-[var(--hero-left)]">
          <div className="lg:w-[var(--hero-text-w)] lg:shrink-0">
            <Reveal>
              <h1 className="t-h1">{robot.name}</h1>
            </Reveal>
            <Reveal>
              <p className={`${robot.taglineClass} mt-16 lg:mt-32 lg:w-[var(--hero-tagline-w)]`}>{robot.tagline}</p>
            </Reveal>
            <Reveal>
              <p className={`${robot.introClass} mt-16 text-ink lg:mt-32 lg:w-[var(--hero-intro-w)]`}>{robot.intro}</p>
            </Reveal>
            <Reveal className="mt-32 flex flex-col items-start gap-16 lg:mt-48 lg:gap-28">
              <div className="flex flex-wrap gap-16 lg:gap-20">
                {robot.showQuoteButton && (
                  <Link href="/contact" className="btn h-53 px-32">
                    Request a Quote
                  </Link>
                )}
                <Link href="/contact" className="btn h-53 px-32">
                  Book a Demo
                </Link>
              </div>
              <a
                href={robot.brochure}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid h-45 w-290 max-w-full"
              >
                Download Brochure
              </a>
            </Reveal>
          </div>

          <Reveal
            variant="fade"
            delay={200}
            className={`relative w-full max-lg:aspect-[342/300] lg:ml-[var(--hero-img-left)] lg:mt-[var(--hero-img-top)] lg:w-[var(--hero-img-w)] lg:shrink-0 lg:aspect-[var(--hero-aspect)] ${
              robot.heroMobile.imageFirst ? "max-lg:order-first" : ""
            }`}
            style={{ "--hero-aspect": robot.hero.aspect } as React.CSSProperties}
          >
            <Image
              src={robot.hero.src}
              alt={robot.hero.alt}
              fill
              priority
              sizes="(min-width: 1001px) 60vw, 100vw"
              quality={85}
              className={robot.hero.fit === "contain" ? "object-contain" : "object-cover"}
            />
          </Reveal>
        </div>
      </section>

      {robot.order === "specs-first" ? (
        <>
          <Specs robot={robot} />
          <Features robot={robot} />
        </>
      ) : (
        <>
          <Features robot={robot} />
          <Configurations robot={robot} />
          <Specs robot={robot} />
        </>
      )}

      {/* Suitability + video */}
      <section className={`${robot.slug === "phantas" ? "bg-panel" : "bg-navy"} px-24 pb-80 lg:px-128 lg:pb-108`}>
        {hasChips && (
          <div className="pt-20 lg:pt-40">
            <ChipGroup title="Ideal For" items={robot.idealFor} robot={robot} />
            <ChipGroup title="Floor Types" items={robot.floorTypes} robot={robot} />
          </div>
        )}

        <Reveal className="mt-80 lg:mt-150">
          <p className="t-body whitespace-pre-wrap text-center uppercase tracking-[0.05em] text-muted">
            {robot.video.label}
          </p>
          <VideoPlayer
            className="mt-24 lg:mt-44"
            src={robot.video.src}
            poster={robot.video.poster}
            title={robot.video.title}
          />
        </Reveal>
      </section>

      <CtaSection
        title={robot.cta.title}
        text={robot.cta.text}
        primaryLabel={robot.cta.primaryLabel}
        formId={`enquiry-${robot.slug}`}
      />
    </>
  );
}
