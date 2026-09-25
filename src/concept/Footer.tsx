import Link from "next/link";
import { CONTACT } from "@/data/site";
import { AVENTURIER, FLEET, machineHref, robotHref, to } from "./data";
import { Arrow, Wordmark } from "./ui";

const COMPANY = [
  { label: "Services", href: to("/services") },
  { label: "About NOLAR", href: to("/about") },
  { label: "Compare robots", href: `${to("/robots")}#compare` },
  { label: "Contact", href: to("/contact") },
];

export default function Footer() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-night text-white">
      <div className="wrap pb-24 pt-20 sm:pb-10 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] lg:gap-8">
          <div>
            <p className="max-w-xs text-[1.35rem] font-[560] leading-snug tracking-[-0.02em] [font-stretch:106%]">
              Ireland&apos;s dedicated autonomous cleaning specialist.
            </p>
            <Link href={to("/contact")} className="btn btn-signal mt-7">
              Book a free site assessment
              <Arrow />
            </Link>
          </div>

          <div>
            <p className="t-mono text-white/55">Robots</p>
            <ul className="mt-4 space-y-2.5">
              {FLEET.map((robot) => (
                <li key={robot.slug}>
                  <Link href={robotHref(robot.slug)} className="text-white/80 transition-colors hover:text-white">
                    {robot.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-mono text-white/55">Aventurier</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href={to("/aventurier")} className="text-white/80 transition-colors hover:text-white">
                  Overview
                </Link>
              </li>
              {AVENTURIER.map((m) => (
                <li key={m.slug}>
                  <Link href={machineHref(m.slug)} className="text-white/80 transition-colors hover:text-white">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="t-mono mt-8 text-white/55">Company</p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="t-mono text-white/55">Talk to us</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={CONTACT.phoneHref} className="text-white/80 transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-white/80 transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <address className="mt-8 max-w-[16rem] not-italic leading-relaxed text-white/55">
              Unit 5 Kilmallock Business Park
              <br />
              Kilmallock, Co. Limerick
              <br />
              V35 CY89, Ireland
            </address>
            <p className="t-mono mt-4 text-white/55">52.40° N · 8.58° W</p>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none mt-20 select-none text-white/[0.06] lg:mt-28">
          <Wordmark className="h-auto w-full" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} NOLAR Tech Limited · Part of the Arlaco group · Official Gausium partner</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/blank-1" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/account-settings" className="hover:text-white">
                MyRobot customer portal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
