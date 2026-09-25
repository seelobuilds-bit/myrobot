import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

const INDUSTRIES = [
  "Retail",
  "Healthcare",
  "Hospitality",
  "Warehousing",
  "Manufacturing",
  "Transport",
  "Education",
  "Offices",
  "Car Parks",
  "Contract Cleaning",
];

const STATS = [
  { value: "400%", label: "Efficiency Improvement" },
  { value: "40000m²", label: "Covered Overnight" },
  { value: "24/7", label: "Autonomous Operation" },
  { value: "0mm", label: "Edge Cleaning Distance" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-24 pb-128 pt-81 lg:px-0 lg:pb-75 lg:pt-73">
        <Reveal>
          <h1 className="t-h1 mx-auto text-center lg:w-736 lg:tracking-[-0.01em]">
            The Future of Clean Is Already Here.
          </h1>
        </Reveal>
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-28 lg:w-626">
            NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that
            work while your team focuses on what matters.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={200} className="mt-40 flex flex-col items-center gap-12 lg:relative lg:-left-20 lg:mt-51 lg:flex-row lg:justify-center lg:gap-36">
          <Link href="/contact" className="btn h-53 w-202">
            Book Demo
          </Link>
          <Link href="/contact" className="btn h-53 w-202">
            Site Assessment
          </Link>
        </Reveal>
      </section>

      {/* Fleet banner */}
      {/* The original serves this photo as two Wix-cropped renditions (3.2:1 on
          desktop, 1.95:1 on mobile) rather than a CSS crop of the full image. */}
      <section className="relative h-200 bg-ink lg:h-400">
        <Image
          src="/images/home-fleet-desktop.jpg"
          alt="Gausium"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="hidden object-cover lg:block"
        />
        <Image
          src="/images/home-fleet-mobile.jpg"
          alt="Gausium"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover lg:hidden"
        />
      </section>

      {/* Intro */}
      <section className="bg-navy px-24 pb-106 pt-106 lg:px-133 lg:pb-140 lg:pt-106">
        <Reveal>
          <h2 className="t-h2 text-center">We Don&apos;t Just Sell Robots. We Make Them Work for You.</h2>
        </Reveal>
        <Reveal>
          <p className="t-h5 mt-12 text-center !leading-[1.5] lg:mt-44">
            NOLAR Tech Limited is Ireland&apos;s only dedicated autonomous cleaning specialist. Based in
            Limerick, we deploy Gausium robots — the world&apos;s number one commercial cleaning robotics
            platform — across Ireland. We assess, deploy, train and support. End to end
          </p>
        </Reveal>
        <Reveal variant="fade" delay={200} className="mt-32 flex justify-center lg:mt-44">
          <Link href="/abouts" className="btn t-lead h-50 w-185 !normal-case">
            LEARN MORE
          </Link>
        </Reveal>
        <Reveal>
          <p className="t-h6 mt-32 whitespace-pre-wrap text-center text-white lg:mt-75">
            {"ASSESSMENT         /         DEPLOYMENT         /         SUPPORT"}
          </p>
        </Reveal>
      </section>

      {/* Industries */}
      <section className="bg-navy px-24 pb-93 pt-93 lg:px-58 lg:pb-123 lg:pt-93">
        <Reveal className="border border-line px-24 py-24 lg:px-0 lg:py-0">
          <h2 className="t-h3 text-left !leading-[1.5] max-lg:!text-[1.875rem] lg:text-center">
            Every Industry. One Smart Solution.
          </h2>
        </Reveal>

        <ul className="mt-40 grid grid-cols-1 gap-24 md:grid-cols-2 lg:mt-102 lg:grid-cols-[minmax(0,220fr)_minmax(0,198fr)_minmax(0,198fr)_minmax(0,198fr)_minmax(0,221fr)] lg:gap-x-32 lg:gap-y-73">
          {INDUSTRIES.map((name, i) => (
            <li key={name}>
              <Reveal
                variant="fade"
                delay={i * 50}
                className="flex h-74 items-center justify-center border border-line px-24 lg:h-170 lg:px-10"
              >
                <h3 className="t-h5 text-center">{name}</h3>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="bg-panel px-24 py-80 lg:px-80 lg:py-80">
        <ul className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-24">
          {STATS.map((stat, i) => (
            <li key={stat.label} className={i === 0 ? "max-md:mb-16" : undefined}>
              <Reveal
                variant="fade"
                delay={i * 100}
                className="flex h-109 flex-col items-center justify-center border border-line border-b-[#3d66d6] lg:h-236 lg:justify-start lg:pt-40"
              >
                <p className="t-h2 text-center">{stat.value}</p>
                <p className="t-body mt-12 text-center text-ink lg:mt-72">{stat.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection />
    </>
  );
}
