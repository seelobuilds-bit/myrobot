import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

const STEPS = [
  { step: "1", title: "Get In Touch", text: "Fill out the form or give us a call" },
  { step: "2", title: "We Visit Your Site", text: "Free assessment\nno obligation" },
  { step: "3", title: "We Deploy and\nSupport You", text: "From day one and long term" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-300 flex-col justify-center overflow-hidden px-24 py-60 lg:h-452 lg:px-0 lg:py-0">
        <Image
          src="/images/contact-hero.jpg"
          alt="Gausium"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />
        <Reveal className="relative">
          <h1 className="t-h2 text-center">Get in touch</h1>
          <p className="mx-auto mt-16 text-center text-[1.25rem] leading-[1.2] text-ink lg:mt-41 lg:w-578 lg:text-[1.75rem]">
            We&apos;re based in Limerick and deploy across all of Ireland. Whether you&apos;re ready to go or
            just exploring — we&apos;re happy to talk.
          </p>
        </Reveal>
      </section>

      {/* Details + form */}
      <section className="bg-navy px-24 py-80 lg:px-60 lg:py-80">
        <div className="grid grid-cols-1 gap-60 lg:grid-cols-[26.5rem_1fr] lg:gap-80">
          <Reveal>
            <h2 className="t-h5">Email</h2>
            <a href={CONTACT.emailHref} className="t-body mt-4 block text-muted hover:text-ink">
              {CONTACT.email}
            </a>
            <h2 className="t-h5 mt-16">Phone</h2>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="t-body mt-4 block text-muted hover:text-ink"
            >
              {CONTACT.phone}
            </a>
            <h2 className="t-h5 mt-16">Address</h2>
            <p className="t-body mt-4 text-muted">{CONTACT.address}</p>
            <p className="t-lead mt-12 text-center text-ink">Ireland-wide Deployment</p>
          </Reveal>

          <Reveal>
            <ContactForm id="Contact Form" />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-panel px-24 py-80 lg:px-60 lg:pb-100 lg:pt-30">
        <Reveal>
          <h2 className="t-h5 text-center">How It Works</h2>
        </Reveal>
        <ol className="mt-40 grid grid-cols-1 gap-40 lg:mt-62 lg:grid-cols-3 lg:gap-88">
          {STEPS.map((item, i) => (
            <li key={item.step}>
              <Reveal delay={i * 80}>
                <p className="text-[1.125rem] font-bold leading-[1.2] text-ink">{item.step}</p>
                <h3 className="mt-40 whitespace-pre-line text-center text-[1.5rem] font-bold leading-[1.1] text-ink lg:mt-56 lg:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-8 whitespace-pre-line text-center text-[1.5rem] font-bold leading-[1.1] text-ink lg:text-[1.75rem]">
                  {item.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-navy px-24 py-80 lg:px-80 lg:pb-100 lg:pt-80">
        <Reveal>
          <h2 className="t-h2 text-center">Ready to See It in Action?</h2>
        </Reveal>
        <Reveal className="mt-40 flex justify-center">
          <a href="#Contact Form" className="btn h-52 w-180">
            Book a Demo
          </a>
        </Reveal>
      </section>
    </>
  );
}
