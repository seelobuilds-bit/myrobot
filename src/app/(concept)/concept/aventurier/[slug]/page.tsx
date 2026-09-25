import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Battery from "@/concept/Battery";
import { CtaBand, NumberedItem } from "@/concept/blocks";
import { MACHINE_CONTENT } from "@/concept/aventurier-content";
import { AVENTURIER, to } from "@/concept/data";
import { Arrow, Eyebrow, Lines, R, SectionHead } from "@/concept/ui";
import { ARTIST_COMPARISON, ARTIST_VERSIONS, ELECTROLYSIS_NOTE } from "@/data/aventurier";

export const dynamicParams = false;

export function generateStaticParams() {
  return AVENTURIER.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concept/aventurier/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = AVENTURIER.find((x) => x.slug === slug);
  return m ? { title: m.name, description: m.summary } : {};
}

const VERSION_ACCENT = { teal: "bg-[#0097b2]", slate: "bg-[#1f395b]", red: "bg-av" } as const;

export default async function MachinePage({ params }: PageProps<"/concept/aventurier/[slug]">) {
  const { slug } = await params;
  const m = AVENTURIER.find((x) => x.slug === slug);
  if (!m) notFound();
  const c = MACHINE_CONTENT[m.slug];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-mist pt-28 lg:pt-36">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="pb-10 lg:pb-28">
            <R>
              <nav aria-label="Breadcrumb" className="t-mono flex items-center gap-2 text-steel">
                <Link href={to("/aventurier")} className="hover:text-ink">
                  Aventurier
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-ink" aria-current="page">
                  {m.name}
                </span>
              </nav>
            </R>
            <R delay={60} className="mt-8">
              <Eyebrow className="!text-av-ink">
                {m.category} · {c.heroNote}
              </Eyebrow>
            </R>
            <Lines as="h1" lines={[m.name]} className="t-display mt-5 !text-[clamp(3.5rem,9vw,9rem)]" delay={100} />
            <R delay={250}>
              <p className="mt-6 text-[clamp(1.3rem,2vw,1.75rem)] font-[560] leading-tight tracking-[-0.02em]">
                {m.tagline}
              </p>
              <p className="t-lead mt-5 max-w-xl text-ink-soft">{m.summary}</p>
            </R>
            <R delay={350} className="mt-8 flex flex-wrap gap-3">
              <Link href={`${to("/contact")}?robot=${m.slug}`} className="btn btn-ink">
                Book a demo
                <Arrow />
              </Link>
              <a href={m.brochure} target="_blank" rel="noreferrer" className="btn btn-line">
                Leaflet (PDF)
                <Arrow direction="down" />
              </a>
            </R>
            <R delay={450} className="mt-10 grid max-w-md grid-cols-2 gap-4">
              {m.heroStats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-surface p-4">
                  <p className="t-num text-3xl">{s.value}</p>
                  <p className="mt-1.5 text-sm text-steel">{s.label}</p>
                </div>
              ))}
            </R>
          </div>
          <R
            variant="scale"
            delay={150}
            className="relative flex h-[32rem] items-end justify-center sm:h-[40rem] lg:h-[48rem]"
          >
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-10 rounded-t-[3rem] stage" />
            <Image
              src={m.image.src}
              alt={m.image.alt}
              width={m.image.width}
              height={m.image.height}
              priority
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="relative h-[92%] w-auto object-contain drop-shadow-[0_50px_40px_rgb(10_13_20/0.3)]"
            />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-av" />
          </R>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section data-nav="dark" className="bg-night text-white">
        <div className="wrap">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {m.stats.map((s, i) => (
              <R
                as="li"
                key={s.label}
                delay={i * 70}
                className={`border-white/10 py-10 pr-4 lg:py-12 ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
              >
                <p className="t-num text-[clamp(2rem,3vw,2.9rem)]">{s.value}</p>
                <p className="mt-3 text-sm text-white/55">{s.label}</p>
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Pitch ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <SectionHead eyebrow={c.pitch.eyebrow} title={c.pitch.title} intro={c.pitch.text} />
          <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3 lg:mt-20">
            {c.points.map((p, i) => (
              <R as="li" key={p.title} delay={i * 90}>
                <NumberedItem no={String(i + 1).padStart(2, "0")} title={p.title} text={p.text} />
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Artist 1: versions ---------------- */}
      {m.slug === "artist-1" && (
        <section className="bg-mist py-24 lg:py-36">
          <div className="wrap">
            <SectionHead
              eyebrow="YOUTH · SE · PRO"
              title={["Three versions.", "One cleaning platform."]}
              intro="Start simple with YOUTH, add on-machine guidance with SE, or go all in with PRO's dirt detection, Sterilization mode and 4G connectivity."
            />
            <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
              {ARTIST_VERSIONS.map((v, i) => (
                <R
                  as="li"
                  key={v.name}
                  delay={i * 100}
                  className="flex flex-col overflow-hidden rounded-[1.75rem] bg-surface"
                >
                  <div className={`h-1.5 ${VERSION_ACCENT[v.tone]}`} />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-3xl font-[650] tracking-[0.06em] [font-stretch:112%]">{v.name}</p>
                    <p className="mt-3 text-ink-soft">{v.summary}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-rule pt-5">
                      {v.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm">
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${VERSION_ACCENT[v.tone]}`} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </R>
              ))}
            </ul>

            <R className="mt-6 overflow-x-auto rounded-[1.75rem] bg-surface p-5 sm:p-8">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="t-mono pb-5 text-left text-steel">Choose the right Artist 1</caption>
                <thead>
                  <tr className="border-b border-ink">
                    <th scope="col" className="pb-3 font-[560]">
                      Feature
                    </th>
                    {ARTIST_VERSIONS.map((v) => (
                      <th key={v.name} scope="col" className="pb-3 font-[650] tracking-[0.06em]">
                        {v.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ARTIST_COMPARISON.map(([feature, ...cells]) => (
                    <tr key={feature} className="border-b border-rule last:border-0">
                      <th scope="row" className="t-mono py-3.5 pr-4 align-top font-normal text-steel">
                        {feature}
                      </th>
                      {cells.map((cell, i) => (
                        <td
                          key={i}
                          className={`whitespace-pre-line py-3.5 pr-4 align-top ${cell === "No" ? "text-steel" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-xs text-steel">{ELECTROLYSIS_NOTE}</p>
            </R>
          </div>
        </section>
      )}

      {/* ---------------- More points ---------------- */}
      {c.more && (
        <section className="bg-cloud py-24 lg:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <SectionHead eyebrow={c.more.eyebrow} title={c.more.title} />
              {m.slug === "artist-1" && (
                <R delay={200} className="relative mt-10 aspect-[1600/1187] max-w-md">
                  <Image
                    src="/images/aventurier/artist-1-console.webp"
                    alt="Artist 1 handle with full-colour display"
                    fill
                    sizes="448px"
                    className="object-contain drop-shadow-[0_30px_30px_rgb(10_13_20/0.25)]"
                  />
                </R>
              )}
              {m.slug === "ranger-one" && (
                <R delay={200} className="mt-10 grid max-w-md grid-cols-2 items-end gap-4">
                  <Image
                    src="/images/aventurier/ranger-one-front.webp"
                    alt="Ranger One from the front"
                    width={616}
                    height={1178}
                    sizes="200px"
                    className="h-auto w-full drop-shadow-[0_24px_24px_rgb(10_13_20/0.25)]"
                  />
                  <Image
                    src="/images/aventurier/ranger-one-harness.webp"
                    alt="Ranger One harness from behind"
                    width={558}
                    height={1056}
                    sizes="200px"
                    className="h-auto w-[92%] drop-shadow-[0_24px_24px_rgb(10_13_20/0.25)]"
                  />
                </R>
              )}
            </div>
            <ul className={`grid content-start gap-4 ${c.more.items.length % 2 === 0 ? "sm:grid-cols-2" : ""}`}>
              {c.more.items.map((p, i) => (
                <R as="li" key={p.title} delay={i * 80} className="rounded-[1.5rem] bg-surface p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-av/10 t-mono !text-[0.65rem] text-av-ink">
                    0{i + 1}
                  </span>
                  <h3 className="t-h3 mt-5">{p.title}</h3>
                  <p className="mt-2 text-ink-soft">{p.text}</p>
                </R>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Gallery (Artist 1) ---------------- */}
      {c.gallery && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="wrap">
            <SectionHead eyebrow="Designed from every angle" title={["Every angle."]} />
            <ul className="no-scrollbar -mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {c.gallery.map((g, i) => (
                <R as="li" key={g.src} delay={i * 80} className="w-[70vw] shrink-0 snap-start sm:w-[40vw] lg:w-auto">
                  <figure className="overflow-hidden rounded-[1.5rem] bg-surface">
                    <div className="relative flex aspect-[3/4] items-center justify-center stage p-6">
                      <Image
                        src={g.src}
                        alt={`${m.name}: ${g.caption.toLowerCase()}`}
                        width={g.w}
                        height={g.h}
                        sizes="(min-width: 1024px) 22vw, 70vw"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <figcaption className="t-mono border-t border-rule px-5 py-4 text-steel">{g.caption}</figcaption>
                  </figure>
                </R>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Places (Ranger One) ---------------- */}
      {c.places && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="wrap">
            <SectionHead eyebrow="In the field" title={["Where Ranger One", "earns its keep."]} />
            <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
              {c.places.map((p, i) => (
                <R as="li" key={p.title} delay={i * 90} className="overflow-hidden rounded-[1.5rem] bg-surface">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={p.src}
                      alt={`Ranger One in use: ${p.title.toLowerCase()}`}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="t-h3">{p.title}</h3>
                    <p className="mt-2 text-ink-soft">{p.text}</p>
                  </div>
                </R>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Specs ---------------- */}
      <section className="bg-cloud py-24 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow="Specification" title={["The numbers."]} intro={c.specIntro} />
            <R delay={200} className="mt-8">
              <a
                href={m.brochure}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-rule bg-surface p-4 pr-5 transition-colors hover:border-ink"
              >
                <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md bg-av/10">
                  <span className="t-mono !text-[0.6rem] text-av-ink">PDF</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-[600]">{m.name} leaflet</span>
                  <span className="block text-sm text-steel">Opens in a new tab</span>
                </span>
                <Arrow direction="down" className="h-5 w-5" />
              </a>
            </R>
          </div>
          <R delay={100}>
            <dl className="border-t border-ink">
              {m.specs.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_1fr] sm:gap-6 sm:py-5"
                >
                  <dt className="t-mono pt-1 text-steel">{label}</dt>
                  <dd className="text-[1.05rem] font-[500]">{value}</dd>
                </div>
              ))}
            </dl>
          </R>
        </div>
      </section>

      <Battery highlight={m.slug} />

      <CtaBand title={`Interested in ${m.name}?`} query={`robot=${m.slug}`} />
    </>
  );
}
