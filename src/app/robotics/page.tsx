import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Robotics" };

const TECH = [
  {
    title: "3D LiDAR Navigation",
    text: "Precise mapping and localisation in any environment, low-light or high-dynamic",
  },
  {
    title: "AI Obstacle Avoidance",
    text: "Deep learning trained on millions of real-world scenarios, avoids people, wires and obstacles",
  },
  {
    title: "Auto Spot Cleaning",
    text: "Detects and cleans dirty areas autonomously, up to 400% more efficient",
  },
  { title: "Zero-Distance Edge Cleaning", text: "Cleans right to the wall every time, 0mm from edges" },
  { title: "Autonomous Charging", text: "Self-docking charging station enables 24/7 continuous operation" },
  { title: "Smart Cloud Platform", text: "Remote monitoring, OTA updates and real-time performance data" },
];

const GUIDE_HEAD = ["Robot", "Scrubbing", "Sweeping", "Vacuuming", "Industrial", "Best For"];

const GUIDE_ROWS = [
  ["Phantas", "Yes", "Yes", "Yes", "No", "Small to mid-sized indoor spaces"],
  ["Phantas Single", "Yes", "Yes", "No", "No", "Small to mid-sized commercial floors"],
  ["Mira", "Yes", "Yes", "No", "Yes", "Mid-sized busy commercial spaces"],
  ["Marvel", "Yes", "Yes", "No", "Yes", "Large and complex indoor spaces"],
  ["Omnie", "Yes", "Yes", "No", "Yes", "Large high-traffic and high-dynamic environments"],
  ["Beetle", "No", "Yes", "No", "Yes", "Industrial and back-of-house"],
  ["PhanShop", "Yes", "Yes", "Yes", "No", "Active retail floors with customer footfall"],
];

const RANGE = [
  {
    no: "01",
    name: "Phantas 3in1",
    text: "Commercial Robot Floor Cleaner for Small to Midsize Spaces",
    href: "/phantas",
  },
  {
    no: "02",
    name: "Phantas Single",
    text: "Engineered for Continuous Autonomous Floor Scrubbing",
    href: "/phantas-single",
  },
  { no: "03", name: "PhanShop", text: "Clean Your Store While Selling Your Stock.", href: "/phan-shop" },
  { no: "04", name: "Mira", text: "Award-Winning Sweep and Scrub in One Pass", href: "/mira" },
  { no: "05", name: "Marvel", text: "High-Capacity Cleaner for Large and Complex Spaces", href: "/marvel" },
  { no: "06", name: "Omnie", text: "AI-Powered Cleaning for High-Dynamic Environments", href: "/omnie" },
  { no: "07", name: "Beetle", text: "Heavy-Duty Autonomous Industrial Sweeper", href: "/beetle" },
];

export default function RoboticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-24 pb-80 pt-81 lg:px-0 lg:pb-328 lg:pt-120">
        <Reveal>
          <h1 className="t-h1 mx-auto text-center lg:w-896 lg:tracking-[-0.02em]">
            Intelligent Machines. Real-World Results.
          </h1>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-white lg:mt-32 lg:w-672">
            Every robot in our range is purpose-built for a specific environment and cleaning challenge. Find
            the right one for your space.
          </p>
        </Reveal>
      </section>

      {/* Technology */}
      <section className="bg-panel px-24 py-80 lg:px-60 lg:pb-100 lg:pt-100">
        <Reveal>
          <h2 className="t-h2 mx-auto text-center lg:w-1024">The Technology Behind Every Robot</h2>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-32 lg:w-768">
            Every robot in the NOLAR range is powered by Gausium&apos;s industry-leading technology platform.
          </p>
        </Reveal>
        <ul className="mt-40 grid grid-cols-1 gap-24 lg:mt-64 lg:grid-cols-3 lg:gap-32">
          {TECH.map((item, i) => (
            <li key={item.title}>
              <Reveal
                variant="fade"
                delay={i * 50}
                className="flex h-full flex-col justify-between border border-line bg-navy p-24 lg:min-h-208 lg:p-32"
              >
                <h3 className="t-h5">{item.title}</h3>
                <p className="t-body mt-12 text-muted">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Guide */}
      <section className="bg-navy px-24 py-80 lg:px-60 lg:pb-100 lg:pt-100">
        <Reveal>
          <h2 className="t-h2 text-center">Find Your Robot</h2>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-32 lg:w-768">
            Not sure which robot suits your space? Use this quick guide.
          </p>
        </Reveal>
        <Reveal className="mt-40 overflow-x-auto lg:mt-64">
          <table className="w-full min-w-700 border-collapse text-left">
            <thead>
              <tr>
                {GUIDE_HEAD.map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="t-h6 w-1/6 rounded-[0.125rem] border border-line bg-panel px-20 py-20 align-middle"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GUIDE_ROWS.map(([robot, ...cells]) => (
                <tr key={robot}>
                  <th
                    scope="row"
                    className="t-body rounded-[0.125rem] border border-line bg-panel px-20 py-28 text-left align-middle font-normal text-ink"
                  >
                    {robot}
                  </th>
                  {cells.map((cell, i) => (
                    <td
                      key={i}
                      className="t-body rounded-[0.125rem] border border-line px-20 py-18 align-middle text-muted"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* Range */}
      <section className="bg-panel px-24 py-80 lg:px-40 lg:pb-135 lg:pt-100">
        <ul className="grid grid-cols-1 gap-24 lg:grid-cols-4 lg:gap-x-40 lg:gap-y-40">
          {RANGE.map((robot, i) => (
            <li key={robot.href}>
              <Reveal
                variant="fade"
                delay={i * 50}
                className="flex h-full flex-col border border-line p-24 lg:min-h-261 lg:p-32"
              >
                <p className="t-small text-white">{robot.no}</p>
                <h3 className="t-h5 mt-12 lg:mt-16">{robot.name}</h3>
                <p className="t-body mt-12 flex-1 text-muted lg:mt-16">{robot.text}</p>
                <Link
                  href={robot.href}
                  className="btn t-small mx-auto mt-24 h-43 w-140 lg:mt-32"
                  aria-label={`View robot: ${robot.name}`}
                >
                  View Robot
                </Link>
              </Reveal>
            </li>
          ))}
          <li>
            <Reveal
              variant="fade"
              delay={350}
              className="flex h-full items-center justify-center border border-line bg-white/75 p-24 lg:min-h-261"
            >
              <p className="t-h5 text-center !text-navy">COMING SOON</p>
            </Reveal>
          </li>
        </ul>
      </section>

      <CtaSection />
    </>
  );
}
