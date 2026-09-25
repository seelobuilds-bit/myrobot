import type { Metadata } from "next";
import Image from "next/image";
import Counter from "@/concept/Counter";
import IrelandMap from "@/concept/IrelandMap";
import { CtaBand, NumberedItem, PageHero } from "@/concept/blocks";
import { Arrow, Eyebrow, Lines, R, SectionHead } from "@/concept/ui";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "NOLAR Tech Limited: Ireland's dedicated autonomous cleaning specialist, based in Limerick and part of the Arlaco group.",
};

const STORY = [
  "NOLAR Tech was founded with a single mission: to provide the best autonomous cleaning solutions for business and industry in Ireland. We are not just a technology provider; we are cleaning industry experts who understand the practical challenges of maintaining large-scale facilities.",
  "Headquartered in Limerick, we have seen the evolution of the cleaning industry first-hand. As labour shortages and rising costs became the new normal, we saw an opportunity to introduce intelligent robotics that don't replace people, but augment what they can do.",
  "Today, NOLAR is Ireland's leading specialist in commercial autonomous cleaning. We are proud to partner with Gausium, world leaders in cleaning robotics, so our clients have access to the most advanced, reliable and efficient technology available.",
];

const DIFFERENT = [
  {
    title: "Specialist focus",
    text: "We don't do general electronics. We are 100% focused on autonomous cleaning technology and its real-world application.",
  },
  {
    title: "Proven tech",
    text: "We only deploy Gausium, the world's most advanced and widely used commercial cleaning robotics platform.",
  },
  {
    title: "Local support",
    text: "Based in Limerick, we provide Ireland-wide support, training and maintenance to keep your robots working.",
  },
  {
    title: "Data driven",
    text: "We don't guess. Full performance reporting shows exactly when and where your site was cleaned.",
  },
];

const HYBRID = [
  {
    title: "Hybrid service model",
    text: "Robots for floor maintenance, professional crews for specialist cleaning tasks.",
  },
  {
    title: "Seamless management",
    text: "One point of contact for your entire cleaning contract, automated and human-led alike.",
  },
  {
    title: "Full site audits",
    text: "Joint assessments by NOLAR and Arlaco find where people add value and where robots save money.",
  },
];

const HOW = [
  {
    title: "Free site assessment",
    text: "We visit your facility to map high-traffic areas and identify where robots can have the most impact.",
  },
  {
    title: "Custom deployment",
    text: "Our engineers programme the machines, define no-go zones and train your staff on the simple interface.",
  },
  {
    title: "Ongoing performance",
    text: "We monitor performance remotely and maintain your robots so they never stop cleaning.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NOLAR"
        title={["Built by people", "who know cleaning."]}
        intro="NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that work while your team focuses on what matters."
        aside={
          <dl className="grid grid-cols-2 gap-3">
            {[
              { v: 100, s: "%", l: "Irish owned & operated" },
              { v: 24, s: "/7", l: "Autonomous support" },
              { v: 0, s: "mm", l: "Edge cleaning precision" },
            ].map((n) => (
              <div key={n.l} className="flex flex-col-reverse rounded-2xl bg-surface p-5">
                <dt className="mt-2 text-sm text-steel">{n.l}</dt>
                <dd className="t-num text-[2.6rem]">
                  <Counter value={n.v} />
                  <span className="text-[0.5em] text-signal-ink">{n.s}</span>
                </dd>
              </div>
            ))}
            <div className="flex flex-col-reverse rounded-2xl border border-white/10 bg-night p-5 text-white">
              <dt className="mt-2 text-sm text-white/60">Hours saved weekly: countless</dt>
              <dd className="t-num text-[2.6rem]" aria-label="Countless">
                ∞
              </dd>
            </div>
          </dl>
        }
      />

      {/* ---------------- Story ---------------- */}
      <section className="bg-paper pb-24 lg:pb-36">
        <div className="wrap grid gap-10 border-t border-rule pt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:pt-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <R>
              <Eyebrow>Our story</Eyebrow>
            </R>
            <Lines lines={["Limerick-born.", "Cleaning-first."]} className="t-h2 mt-5" />
          </div>
          <div className="space-y-8">
            {STORY.map((p, i) => (
              <R key={i} delay={i * 80}>
                <p
                  className={
                    i === 0
                      ? "text-[clamp(1.35rem,2vw,1.8rem)] font-[500] leading-snug tracking-[-0.02em]"
                      : "t-lead text-ink-soft"
                  }
                >
                  {p}
                </p>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Mission ---------------- */}
      <section data-nav="dark" className="relative overflow-hidden bg-night py-28 text-white lg:py-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-[160px]"
        />
        <div className="wrap relative text-center">
          <R>
            <Eyebrow tone="light" className="justify-center">
              Our mission
            </Eyebrow>
          </R>
          <Lines
            lines={[
              "To accelerate the transition",
              "to smart surfaces through",
              "intelligent, sustainable and",
              "reliable autonomous solutions.",
            ]}
            className="mx-auto mt-8 max-w-5xl text-[clamp(2rem,4.6vw,4.4rem)] font-[600] leading-[1.02] tracking-[-0.04em] [font-stretch:106%]"
          />
        </div>
      </section>

      {/* ---------------- Different ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap">
          <SectionHead eyebrow="What makes us different" title={["Specialists,", "not resellers."]} />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {DIFFERENT.map((d, i) => (
              <R as="li" key={d.title} delay={i * 80}>
                <NumberedItem no={String(i + 1).padStart(2, "0")} title={d.title} text={d.text} />
              </R>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Arlaco ---------------- */}
      <section className="bg-mist py-24 lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Our sister company"
              title={["The complete", "cleaning solution."]}
              intro="NOLAR is part of the Arlaco group. While NOLAR focuses on high-tech autonomous deployment, Arlaco brings decades of traditional cleaning expertise across Ireland: a hybrid model that is unmatched in the Irish market."
            />
            <R delay={200} className="mt-8">
              <a href="https://www.arlaco.ie" target="_blank" rel="noreferrer" className="btn btn-line">
                Visit Arlaco
                <Arrow direction="up-right" />
              </a>
            </R>
          </div>
          <div>
            {/* Robots + people visual */}
            <R
              variant="scale"
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[1.75rem] bg-surface p-6 sm:p-8"
            >
              <div className="rounded-2xl bg-signal p-5 text-white">
                <p className="t-mono text-white/85">NOLAR</p>
                <p className="mt-3 text-xl font-[600] leading-tight">Robots handle the routine.</p>
              </div>
              <span className="text-3xl font-[300] text-steel">+</span>
              <div className="rounded-2xl border border-white/10 bg-night p-5 text-white">
                <p className="t-mono text-white/60">Arlaco</p>
                <p className="mt-3 text-xl font-[600] leading-tight">People handle the rest.</p>
              </div>
            </R>
            <ul className="mt-4 space-y-4">
              {HYBRID.map((h, i) => (
                <R as="li" key={h.title} delay={i * 80} className="flex gap-5 rounded-[1.5rem] bg-surface p-6">
                  <span className="t-mono pt-1 text-signal-ink">0{i + 1}</span>
                  <div>
                    <h3 className="t-h3">{h.title}</h3>
                    <p className="mt-2 text-ink-soft">{h.text}</p>
                  </div>
                </R>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap mt-20 lg:mt-28">
          <Lines
            lines={[
              "Robots handle the routine.",
              "Our people handle the rest.",
              <span key="c" className="text-signal-ink">
                Together we cover everything.
              </span>,
            ]}
            className="text-[clamp(1.8rem,3.8vw,3.6rem)] font-[600] leading-[1.04] tracking-[-0.035em] [font-stretch:106%]"
          />
        </div>
      </section>

      {/* ---------------- Gausium ---------------- */}
      <section className="bg-paper py-24 lg:py-36">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <R
            variant="scale"
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-surface"
          >
            <div aria-hidden="true" className="grid-lines absolute inset-0" />
            <div
              aria-hidden="true"
              className="sweep absolute h-[140%] w-[140%] bg-[conic-gradient(from_0deg,transparent_0deg,rgb(35_64_255/0.14)_40deg,transparent_60deg)]"
            />
            <Image
              src="/images/myrobot-logo.png"
              alt="Gausium"
              width={1814}
              height={2367}
              sizes="200px"
              className="relative h-auto w-[34%]"
            />
          </R>
          <div>
            <SectionHead
              eyebrow="Our technology partner"
              title={["Powered by the", "world number one."]}
              intro="NOLAR Tech Limited partners with Gausium (formerly Gaussian Robotics), the global leader in commercial cleaning robotics, with over 10,000 deployments worldwide and one of the most advanced SLAM navigation systems on the market."
            />
            <R delay={200}>
              <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
                By combining Gausium&apos;s world-class engineering with NOLAR&apos;s deep expertise in Irish commercial
                cleaning, we deliver a service that is technically superior and locally supported.
              </p>
            </R>
            <R delay={260} className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface p-5">
                <p className="t-num text-4xl">
                  <Counter value={10000} />+
                </p>
                <p className="mt-2 text-sm text-steel">Gausium deployments worldwide</p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <p className="t-num text-4xl">SLAM</p>
                <p className="mt-2 text-sm text-steel">Advanced autonomous navigation</p>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ---------------- How we work ---------------- */}
      <section data-nav="dark" className="bg-night py-24 text-white lg:py-36">
        <div className="wrap">
          <SectionHead dark eyebrow="How we work" title={["Three steps to a", "self-cleaning floor."]} />
          <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3 lg:mt-20">
            {HOW.map((h, i) => (
              <R as="li" key={h.title} delay={i * 100}>
                <p aria-hidden="true" className="t-num text-[5rem] text-white/20">
                  {i + 1}
                </p>
                <NumberedItem dark no={`Step 0${i + 1}`} title={h.title} text={h.text} />
              </R>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Coverage ---------------- */}
      <section className="bg-mist py-24 lg:py-36">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Ireland-wide deployment"
              title={["Distance is never", "a barrier."]}
              intro="Full service, delivery and technical support, available everywhere in the Republic of Ireland."
            />
            <R delay={200}>
              <dl className="mt-10 divide-y divide-rule border-y border-rule">
                {[
                  { k: "Email", v: CONTACT.email, href: CONTACT.emailHref },
                  { k: "Phone", v: CONTACT.phone, href: CONTACT.phoneHref },
                  { k: "Base", v: "Kilmallock, Co. Limerick" },
                ].map((d) => (
                  <div key={d.k} className="flex items-center justify-between gap-4 py-4">
                    <dt className="t-mono text-steel">{d.k}</dt>
                    <dd className="font-[540]">
                      {d.href ? (
                        <a href={d.href} className="hover:text-signal-ink">
                          {d.v}
                        </a>
                      ) : (
                        d.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </R>
          </div>
          <R variant="fade" className="mx-auto w-full max-w-sm lg:max-w-[30rem]">
            <IrelandMap className="h-auto w-full" />
          </R>
        </div>
      </section>

      <CtaBand title="Want to know more?" />
    </>
  );
}
