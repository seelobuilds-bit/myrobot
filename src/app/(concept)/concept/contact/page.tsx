import type { Metadata } from "next";
import ContactFlow from "@/concept/ContactFlow";
import { Arrow, Eyebrow, Lines, R } from "@/concept/ui";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free site assessment and demo anywhere in Ireland. NOLAR Tech, Kilmallock, Co. Limerick.",
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Unit 5 Kilmallock Business Park, Kilmallock, Co. Limerick, V35 CY89, Ireland",
)}&output=embed`;

const METHODS = [
  { label: "Call", value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: "WhatsApp", value: "Message us", href: CONTACT.whatsappHref, external: true },
  { label: "Email", value: CONTACT.email, href: CONTACT.emailHref },
];

const STEPS = [
  { title: "Get in touch", text: "Fill out the form or give us a call." },
  { title: "We visit your site", text: "A free assessment, with no obligation." },
  { title: "We deploy and support you", text: "From day one, and for the long term." },
];

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: PageProps<"/concept/contact">) {
  const params = await searchParams;
  const area = Number(first(params.area));

  return (
    <>
      <section className="relative overflow-hidden bg-mist pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
        <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <R>
              <Eyebrow>Contact · free site assessment</Eyebrow>
            </R>
            <Lines
              as="h1"
              lines={["Let’s see what a robot can do for your floor."]}
              className="t-h1 mt-6 !text-[clamp(2.6rem,4.8vw,5rem)]"
              delay={100}
            />
            <R delay={300}>
              <p className="t-lead mt-8 max-w-md text-ink-soft">
                We&apos;re based in Limerick and deploy across all of Ireland. Whether you&apos;re ready to go or just
                exploring, we&apos;re happy to talk.
              </p>
            </R>

            <R delay={400}>
              <ul className="mt-10 divide-y divide-rule border-y border-rule">
                {METHODS.map((m) => (
                  <li key={m.label}>
                    <a
                      href={m.href}
                      target={m.external ? "_blank" : undefined}
                      rel={m.external ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span className="t-mono w-24 shrink-0 text-steel">{m.label}</span>
                      <span className="flex-1 text-[clamp(1.1rem,1.6vw,1.35rem)] font-[560] tracking-[-0.01em] transition-colors group-hover:text-signal-ink">
                        {m.value}
                      </span>
                      <Arrow
                        direction={m.external ? "up-right" : "right"}
                        className="h-5 w-5 text-steel group-hover:text-signal-ink"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </R>

            <R delay={500} className="mt-10">
              <address className="not-italic leading-relaxed text-ink-soft">
                <span className="t-mono mb-2 block text-steel">Visit</span>
                {CONTACT.address}
              </address>
            </R>
          </div>

          <R variant="scale" delay={200} id="book">
            <ContactFlow
              robot={first(params.robot)}
              space={first(params.space)}
              area={Number.isFinite(area) ? area : undefined}
            />
          </R>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="wrap">
          <R>
            <Eyebrow>How it works</Eyebrow>
          </R>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <R
                as="li"
                key={s.title}
                delay={i * 100}
                className="relative overflow-hidden rounded-[1.75rem] bg-surface p-8"
              >
                <p className="t-num absolute -right-2 -top-6 text-[9rem] text-paper" aria-hidden="true">
                  {i + 1}
                </p>
                <p className="t-mono relative text-signal-ink">Step 0{i + 1}</p>
                <p className="relative mt-10 text-[clamp(1.6rem,2.4vw,2.1rem)] font-[620] leading-none tracking-[-0.035em] [font-stretch:108%]">
                  {s.title}
                </p>
                <p className="relative mt-3 text-ink-soft">{s.text}</p>
              </R>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Map ---------------- */}
      <section className="bg-paper pb-8 lg:pb-10">
        <div className="wrap">
          <R variant="scale" className="relative overflow-hidden rounded-[2rem] bg-mist">
            <iframe
              title="NOLAR Tech Limited, Kilmallock Business Park"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-embed h-[26rem] w-full grayscale-[0.6] lg:h-[32rem]"
            />
            <div className="absolute right-6 top-6 hidden max-w-xs rounded-2xl bg-surface/95 p-5 shadow-[0_20px_50px_-20px_rgb(10_13_20/0.4)] backdrop-blur sm:block">
              <p className="font-[600]">NOLAR Tech Limited</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{CONTACT.address}</p>
              <p className="t-mono mt-3 text-signal-ink">Ireland-wide deployment</p>
            </div>
          </R>
        </div>
      </section>
    </>
  );
}
