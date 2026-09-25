import type { Metadata } from "next";
import Image from "next/image";
import CtaSection from "@/components/CtaSection";
import DemoForm from "@/components/DemoForm";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

const STEPS = [
  { step: "1", text: "Get In Touch\nFill out the form or give us a call" },
  { step: "2", text: "We Visit Your Site\nFree assessment\nno obligation" },
  { step: "3", text: "We Deploy and\nSupport You\nFrom day one and long term" },
];

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Unit 5 Kilmallock Business Park, Kilmallock, Co. Limerick, V35 CY89, Ireland",
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-288 flex-col justify-center overflow-hidden px-24 lg:h-452 lg:px-0">
        <Image
          src="/images/contact-hero.jpg"
          alt="Gausium"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "77% 70%" }}
        />
        <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />
        <Reveal className="relative">
          <h1 className="t-h2 text-center">Get in touch</h1>
        </Reveal>
        <Reveal delay={200} className="relative">
          <p className="mx-auto mt-12 text-center text-[1.375rem] leading-[1.2] text-ink lg:mt-41 lg:w-578 lg:text-[1.75rem]">
            We&apos;re based in Limerick and deploy across all of Ireland. Whether you&apos;re ready to go or
            just exploring — we&apos;re happy to talk.
          </p>
        </Reveal>
      </section>

      {/* Details + form */}
      <section className="bg-navy px-24 pb-80 pt-60 lg:px-0 lg:pb-79 lg:pt-80">
        <div className="flex flex-col gap-48 lg:flex-row lg:gap-0 lg:pl-60">
          <div className="lg:w-424 lg:shrink-0">
            <Reveal delay={100}>
              <h2 className="t-h5 !text-white lg:ml-8">Email</h2>
            </Reveal>
            <Reveal delay={200}>
              <a href={CONTACT.emailHref} className="t-body mt-4 block text-ink hover:text-white lg:ml-8">
                {CONTACT.email}
              </a>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="t-h5 mt-16 !text-white lg:ml-4">Phone</h2>
            </Reveal>
            <Reveal delay={300}>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="t-body mt-4 block text-ink hover:text-white lg:ml-4"
              >
                {CONTACT.phone}
              </a>
            </Reveal>
            <Reveal delay={300}>
              <h2 className="t-h5 mt-16 !text-white">Address</h2>
            </Reveal>
            <Reveal delay={400}>
              <p className="t-body mt-4 text-ink lg:ml-2">{CONTACT.address}</p>
            </Reveal>
            <Reveal delay={500}>
              <p className="t-lead mt-12 text-center font-bold text-ink">Ireland-wide Deployment</p>
            </Reveal>
            <Reveal variant="fade" delay={300} className="mt-40 lg:-ml-8 lg:mt-92">
              <iframe
                title="NOLAR Tech Limited, Kilmallock Business Park"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-300 w-full rounded-[2px] border border-muted/30 bg-navy lg:h-349 lg:w-454"
              />
            </Reveal>
          </div>

          <Reveal variant="fade" delay={200} className="lg:ml-60 lg:w-656 lg:shrink-0">
            <div className="border border-line bg-panel p-24 lg:p-40 lg:pb-80">
              <div className="bg-navy px-16 py-24 lg:h-500 lg:px-0 lg:py-0">
                <DemoForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy px-24 pb-80 pt-30 lg:px-62 lg:pb-187 lg:pt-30">
        <Reveal>
          <h2 className="text-center text-[1.5rem] font-bold uppercase leading-[1.5] text-white lg:text-[2rem]">
            How It Works
          </h2>
        </Reveal>
        <ol className="mt-40 grid grid-cols-1 gap-40 lg:mt-62 lg:grid-cols-3 lg:gap-122">
          {STEPS.map((item, i) => (
            <li key={item.step}>
              <Reveal variant="fade" delay={i * 100}>
                <p className="text-[1.125rem] leading-[1.2] text-ink">{item.step}</p>
                <div className="mt-24 flex min-h-163 items-center justify-center border border-line px-16 py-24 lg:mt-17 lg:h-163 lg:py-0">
                  <p className="whitespace-pre-line text-center text-[1.5rem] font-bold leading-[1.1] text-ink lg:text-[1.75rem]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaSection text={null} primarySolid tone="panel" formId="enquiry-contact" />
    </>
  );
}
