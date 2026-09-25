import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = { title: "About Us" };

const STORY = [
  "NOLAR tech was founded with a single mission: to provide the best autonomous cleaning solutions for business and industry in Ireland. We are not just a technology provider; we are cleaning industry experts who understand the practical challenges of maintaining large scale facilities.",
  "Headquartered in Limerick, we have witnessed the evolution of the cleaning industry firsthand. As labor shortages and rising costs became the new normal, we saw an opportunity to introduce intelligent robotics that don't replace people, but rather augment their capabilities.",
  "Today, NOLAR is Ireland's leading specialist in commercial autonomous cleaning. We are proud to be the partner for Gausium, world leaders in cleaning robotics, ensuring our clients have access to the most advanced, reliable, and efficient technology available globally.",
];

const DIFFERENT = [
  {
    title: "Specialist Focus",
    text: "We don't do general electronics. We are 100% focused on autonomous cleaning technology and its real-world application.",
  },
  {
    title: "Proven Tech",
    text: "We only deploy Gausium, the world's most advanced and widely used commercial cleaning robotics platform.",
  },
  {
    title: "Local Support",
    text: "Based in Limerick, we provide Ireland-wide support, training, and maintenance to ensure your robots keep working.",
  },
  {
    title: "Data Driven",
    text: "We don't guess. We provide full performance reporting so you can see exactly when and where your site was cleaned.",
  },
];

const HYBRID = [
  {
    title: "Hybrid Service Model",
    text: "Combine robots for floor maintenance with professional crews for specialist cleaning tasks.",
  },
  {
    title: "Seamless Management",
    text: "One point of contact for your entire cleaning contract, automation and human-led services alike.",
  },
  {
    title: "Full Site Audits",
    text: "Joint assessments by NOLAR and Arlaco to identify where humans add value and where robots save money.",
  },
];

const HOW = [
  {
    step: "1",
    title: "Free Site Assessment",
    text: "We visit your facility to map high-traffic areas and identify where robots can have the most impact.",
  },
  {
    step: "2",
    title: "Custom Deployment",
    text: "Our engineers program the machines, define forbidden zones, and train your staff on the simple interface.",
  },
  {
    step: "3",
    title: "Ongoing Performance",
    text: "We monitor performance remotely and provide ongoing maintenance to ensure your robots never stop cleaning.",
  },
];

const NUMBERS = [
  { value: "100%", label: "Irish Owned & Operated" },
  { value: "24/7", label: "Autonomous Support" },
  { value: "0mm", label: "Edge Cleaning Precision" },
  { value: "Countless", label: "Hours Saved Weekly" },
];

const DETAILS = [
  { title: "Email", value: CONTACT.email, href: CONTACT.emailHref },
  { title: "Phone", value: CONTACT.phone, href: CONTACT.whatsappHref },
  { title: "Address", value: "Limerick, Ireland" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-24 pb-80 pt-81 lg:px-0 lg:pb-154 lg:pt-152">
        <Reveal>
          <h1 className="t-h1 mx-auto text-center lg:w-896">Built by People Who Know Cleaning.</h1>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-68 lg:w-800">
            NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that
            work while your team focuses on what matters.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-80">
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-[26.5rem_1fr] lg:gap-40">
          <Reveal>
            <h2 className="t-h2">Our Story</h2>
          </Reveal>
          <div className="space-y-24 lg:space-y-40">
            {STORY.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)}>
                <p className="t-body text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Different */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-80">
        <Reveal>
          <h2 className="t-h2 text-center">What Makes Us Different</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 md:grid-cols-2 lg:mt-80 lg:grid-cols-4 lg:gap-32">
          {DIFFERENT.map((item, i) => (
            <li key={item.title}>
              <Reveal variant="fade" delay={i * 50} className="h-full border border-line p-24 lg:p-32">
                <h3 className="t-h5">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-16">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Mission */}
      <section className="bg-panel px-24 py-100 lg:px-192 lg:pb-186 lg:pt-160">
        <Reveal>
          <p className="t-small text-center uppercase tracking-[0.05em] text-muted">Our Mission</p>
          <p className="t-h3 mt-24 text-center lg:mt-40">
            To accelerate the transition to smart surfaces through intelligent, sustainable, and reliable
            autonomous solutions.
          </p>
        </Reveal>
      </section>

      {/* Sister company */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:pb-80 lg:pt-80">
        <div className="grid grid-cols-1 gap-48 lg:grid-cols-2 lg:gap-72">
          <Reveal>
            <p className="t-small uppercase tracking-[0.05em] text-muted">Our Sister Company</p>
            <h2 className="t-h2 mt-16 lg:mt-24">The Complete Cleaning Solution.</h2>
            <p className="t-body mt-16 text-muted lg:mt-24 lg:w-384">
              NOLAR is part of the Arlaco group. While NOLAR focuses on high-tech autonomous deployment, Arlaco
              brings decades of traditional cleaning expertise across Ireland. This allows us to offer a hybrid
              cleaning model that is unmatched in the Irish market.
            </p>
            <a href="https://www.arlaco.ie" target="_blank" rel="noreferrer" className="btn mt-32 h-52 w-180 lg:mt-40">
              Visit Arlaco
            </a>
          </Reveal>
          <ul className="space-y-24 lg:space-y-40">
            {HYBRID.map((item, i) => (
              <li key={item.title}>
                <Reveal variant="fade" delay={i * 50} className="border border-line p-24 lg:p-32">
                  <h3 className="t-h6">{item.title}</h3>
                  <p className="t-body mt-8 text-muted lg:mt-12">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Reveal>
          <p className="t-h4 mx-auto mt-80 text-center lg:mt-160 lg:w-896">
            Robots handle the routine. Our people handle the rest. Together we cover everything.
          </p>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-panel px-24 py-80 lg:px-120 lg:py-80">
        <Reveal>
          <h2 className="t-h2 text-center">How We Work</h2>
        </Reveal>
        <ol className="mt-40 grid grid-cols-1 gap-40 lg:mt-80 lg:grid-cols-3 lg:gap-120">
          {HOW.map((item, i) => (
            <li key={item.step}>
              <Reveal delay={i * 80}>
                <p className="t-h1 !text-white/40">{item.step}</p>
                <h3 className="t-h5 mt-12 lg:mt-16">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-16">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Technology partner */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-80">
        <div className="grid grid-cols-1 items-center gap-40 lg:grid-cols-[19.5rem_1fr] lg:gap-44">
          <Reveal className="relative mx-auto h-131 w-100">
            <Image
              src="/images/myrobot-logo.png"
              alt="MyRobot.ie-logo"
              fill
              sizes="120px"
              className="object-contain"
            />
          </Reveal>
          <Reveal>
            <p className="t-small uppercase tracking-[0.05em] text-muted">Our Technology Partner</p>
            <h2 className="t-h2 mt-16 lg:mt-24">Powered by the World Number One.</h2>
            <p className="t-body mt-24 text-muted lg:mt-116 lg:w-576">
              NOLAR Tech Limited is proud to partner with Gausium (formerly Gaussian Robotics), the undisputed
              global leader in commercial cleaning robotics. With over 10,000 deployments worldwide and the
              most advanced SLAM navigation system on the market, Gausium provides the intelligent hardware
              that powers our solutions. By combining Gausium&apos;s world-class engineering with NOLAR&apos;s
              deep expertise in Irish commercial cleaning, we deliver a service that is technically superior
              and locally supported.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-panel px-24 py-80 lg:px-40 lg:py-80">
        <Reveal>
          <h2 className="t-h2 text-center">By the Numbers</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-32 md:grid-cols-2 lg:mt-104 lg:grid-cols-4 lg:gap-32">
          {NUMBERS.map((item, i) => (
            <li key={item.label}>
              <Reveal delay={i * 80}>
                <p className="t-h2 text-center lg:!text-[3.75rem]">{item.value}</p>
                <p className="t-small mt-8 text-center text-muted">{item.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Coverage */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-80">
        <Reveal>
          <h2 className="t-h2 text-center">Ireland-wide Deployment</h2>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-24 lg:w-768">
            NOLAR provides full service, delivery and technical support available everywhere in the Republic of
            Ireland. Distance is never a barrier to a modern, autonomous cleaning fleet.
          </p>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-100 lg:grid-cols-3 lg:gap-40">
          {DETAILS.map((item, i) => (
            <li key={item.title}>
              <Reveal variant="fade" delay={i * 50} className="border border-line px-24 py-32 text-center">
                <h3 className="t-h6">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className="t-body mt-12 block text-muted hover:text-ink">
                    {item.value}
                  </a>
                ) : (
                  <p className="t-body mt-12 text-muted">{item.value}</p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-panel px-24 py-80 lg:px-80 lg:pb-94 lg:pt-80">
        <Reveal>
          <h2 className="t-h2 text-center">Want to Know More?</h2>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-24 lg:w-672">
            Book a free site assessment and demo anywhere in Ireland.
          </p>
        </Reveal>
        <Reveal className="mt-40 flex flex-col items-center gap-12 lg:mt-48 lg:flex-row lg:justify-center lg:gap-24">
          <Link href="/contact" className="btn h-56 w-273 lg:w-165">
            Book a Demo
          </Link>
          <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn h-56 w-273 lg:w-283">
            Call Us: {CONTACT.phone}
          </a>
        </Reveal>
      </section>
    </>
  );
}
