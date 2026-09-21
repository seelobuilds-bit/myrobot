import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = { title: "Services" };

const PROCESS = [
  {
    step: "1",
    title: "Assessment",
    text: "We visit your facility, assess your floor space, understand your cleaning requirements and identify the right robot for your environment. No assumptions, no generic recommendations.",
  },
  {
    step: "2",
    title: "Deployment",
    text: "Our team handles everything. Robot delivery, floor mapping, path planning, docking station setup, staff training and initial test runs. Your robot is operational from day one.",
  },
  {
    step: "3",
    title: "Ongoing Support",
    text: "We stay in your corner long term. Scheduled maintenance, software updates, troubleshooting and on-site support whenever you need it. Ireland-wide, reliable and responsive.",
  },
];

const OFFERINGS = [
  {
    title: "Site Assessment and Consultation",
    text: "Free assessment of your space, floor type, layout, traffic patterns and cleaning requirements.",
  },
  {
    title: "Robot Supply and Delivery",
    text: "Full range of Gausium robots available, we supply exactly what your site needs.",
  },
  {
    title: "Professional Deployment",
    text: "Floor mapping, robot configuration, docking station installation and path planning.",
  },
  {
    title: "Staff Training",
    text: "Hands-on training for your team: operation, safety, basic maintenance and daily checks.",
  },
  {
    title: "Maintenance and Servicing",
    text: "Scheduled maintenance visits, part replacement and performance optimisation.",
  },
  {
    title: "Remote Monitoring and Support",
    text: "Cloud-connected robots with remote diagnostics, we spot issues before they become problems.",
  },
];

// Column-major order, matching the original three-column layout.
const CLOUD = [
  {
    title: "Remote Control",
    text: "Remotely activate, pause or stop any robot from your smartphone anytime, anywhere in real time.",
  },
  {
    title: "Task Scheduling",
    text: "Set up automated cleaning schedules so your robots start and finish exactly when you need them.",
  },
  {
    title: "Live Monitoring",
    text: "View your robot's current position, cleaning status and performance data in real time.",
  },
  {
    title: "Detailed Reporting",
    text: "Receive full operational reports and historical statistics to make data-driven management decisions.",
  },
  {
    title: "Instant Alerts",
    text: "Get push notifications the moment a robot needs attention, detects an issue or completes a task.",
  },
  {
    title: "OTA Software Updates",
    text: "Robots receive automatic over-the-air updates, new features and improvements at no extra cost.",
  },
];

const INDUSTRIES = [
  "Retail and Supermarkets",
  "Healthcare",
  "Hospitality",
  "Warehousing",
  "Manufacturing",
  "Transport",
  "Education",
  "Office Buildings",
  "Contract Cleaning",
  "Car Parking",
];

const WHY = [
  { title: "Irish Based", text: "Local expertise, Ireland-wide deployment from our base in Limerick." },
  {
    title: "Gausium Certified",
    text: "Official partner of the world's leading commercial cleaning robotics platform.",
  },
  {
    title: "Full Service",
    text: "We don't just sell robots, we assess, deploy, train and support you long term.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-24 pb-80 pt-81 lg:px-0 lg:pb-128 lg:pt-96">
        <Reveal>
          <h1 className="t-h1 mx-auto text-center lg:w-736">From First Assessment to Long-Term Support.</h1>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-50 lg:w-650">
            NOLAR doesn&apos;t just deliver a robot. We design, deploy and maintain your entire autonomous
            cleaning solution — end to end.
          </p>
        </Reveal>
      </section>

      {/* Process */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-80">
        <Reveal>
          <h2 className="t-h2 text-center">Our Process</h2>
        </Reveal>
        <ol className="mt-40 grid grid-cols-1 gap-40 lg:mt-80 lg:grid-cols-3 lg:gap-40">
          {PROCESS.map((item, i) => (
            <li key={item.step}>
              <Reveal delay={i * 80}>
                <p className="t-h2 !text-white/40">{item.step}</p>
                <h3 className="t-h5 mt-12 lg:mt-24">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-24">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Offerings */}
      <section className="bg-navy px-24 py-80 lg:px-80 lg:py-80">
        <Reveal>
          <h2 className="t-h2 mx-auto text-center lg:w-768">Everything You Need. Nothing You Don&apos;t.</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-48 lg:grid-cols-3 lg:gap-24">
          {OFFERINGS.map((item, i) => (
            <li key={item.title}>
              <Reveal variant="fade" delay={i * 50} className="h-full border border-line p-24 lg:min-h-208 lg:p-32">
                <h3 className="t-h5">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-16">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Cloud platform */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:pb-100 lg:pt-100">
        <Reveal>
          <h2 className="t-h2 mx-auto text-center lg:w-768">Full Control. From Anywhere.</h2>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-16 lg:w-672">
            Every NOLAR robot connects to the Gausium Cloud Platform and mobile app — giving you complete
            visibility and control of your cleaning operation from any smartphone, tablet or PC.
          </p>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-80 lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-2 lg:gap-32">
          {CLOUD.map((item, i) => (
            <li key={item.title}>
              <Reveal
                variant="fade"
                delay={i * 50}
                className="h-full rounded-[0.125rem] border border-line p-24 lg:min-h-166 lg:p-32"
              >
                <h3 className="t-h6 !text-white">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-16">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="t-lead mt-60 text-center font-bold uppercase text-ink lg:mt-170">
            Your robots work. You watch. NOLAR supports.
          </p>
        </Reveal>
      </section>

      {/* Industries */}
      <section className="bg-navy px-24 py-80 lg:px-160 lg:pb-100 lg:pt-100">
        <Reveal>
          <h2 className="t-h2 text-center">Industries We Work With</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-40 flex flex-wrap justify-center gap-x-12 gap-y-12 lg:mt-60 lg:gap-x-16 lg:gap-y-16">
            {INDUSTRIES.map((name) => (
              <li
                key={name}
                className="t-body rounded-full border border-muted bg-line px-24 py-12 text-center text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Why NOLAR */}
      <section className="bg-panel px-24 py-80 lg:px-100 lg:pb-100 lg:pt-100">
        <Reveal>
          <h2 className="t-h2 text-center">Why Choose NOLAR?</h2>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-48 lg:grid-cols-3 lg:gap-24">
          {WHY.map((item, i) => (
            <li key={item.title}>
              <Reveal variant="fade" delay={i * 50} className="h-full bg-navy p-24">
                <h3 className="t-h5">{item.title}</h3>
                <p className="t-body mt-12 text-muted lg:mt-16">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-64 border border-white px-24 py-40 lg:w-810 lg:px-47 lg:py-47">
          <h3 className="t-h3 text-center">Ready to See It in Action?</h3>
          <p className="t-lead mt-12 text-center text-muted lg:mt-16">
            Book a free site assessment and demo anywhere in Ireland.
          </p>
          <div className="mt-32 flex flex-col items-center gap-12 lg:mt-40 lg:flex-row lg:justify-center lg:gap-24">
            <Link href="/contact" className="btn btn-solid t-lead h-50 px-24 !normal-case">
              BOOK A DEMO
            </Link>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn t-lead h-50 px-24 !normal-case"
            >
              CALL US: {CONTACT.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
