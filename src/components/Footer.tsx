"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { CONTACT, NAV } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy">
      {/* Desktop */}
      <div className="hidden h-220 flex-col items-center lg:flex">
        <nav aria-label="Footer" className="mt-49">
          <ul className="flex items-start gap-43 text-[1rem] uppercase leading-[1.2] tracking-[0.05em] text-ink">
            {NAV.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 underline-offset-[0.2em] hover:underline ${
                    pathname === item.href ? "underline" : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg viewBox="0 0 9 9" className="h-8 w-8" fill="none" aria-hidden="true">
                      <path d="M1 3l3.5 3.5L8 3" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <ul className="invisible absolute bottom-full -left-10 bg-navy px-10 pb-10 pt-10 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href} className="mb-10 whitespace-nowrap last:mb-0">
                        <Link href={child.href} className="underline-offset-[0.2em] hover:underline">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link href={CONTACT.privacyHref} className="t-small mt-31 text-muted hover:text-ink">
          Privacy Policy
        </Link>

        <div className="t-small mt-35 flex items-center gap-15 text-muted">
          <a href={CONTACT.emailHref} className="hover:text-ink">
            {CONTACT.email}
          </a>
          <a href={CONTACT.websiteHref} className="hover:text-ink">
            {CONTACT.website}
          </a>
          <p>© {year} NOLAR Tech Limited</p>
        </div>
      </div>

      {/* Mobile */}
      <div className="px-24 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-48 lg:hidden">
        <Link href="/" aria-label="NOLAR home" className="mx-auto block h-44 w-154">
          <Logo className="h-full w-full" />
        </Link>

        <nav aria-label="Footer" className="mt-36">
          <ul className="grid grid-cols-2 gap-x-16 font-nav text-[0.9375rem] uppercase tracking-[0.04em] text-ink md:grid-cols-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex min-h-44 items-center ${pathname === item.href ? "text-white underline underline-offset-[0.25em]" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="t-small mt-28 space-y-6 border-t border-line pt-28 text-muted">
          <a href={CONTACT.emailHref} className="flex min-h-32 items-center hover:text-ink">
            {CONTACT.email}
          </a>
          <a href={CONTACT.phoneHref} className="flex min-h-32 items-center hover:text-ink">
            {CONTACT.phone}
          </a>
          <p className="pt-4 leading-[1.4]">{CONTACT.address}</p>
        </div>

        <div className="t-small mt-28 flex flex-wrap items-center justify-between gap-12 border-t border-line pt-24 text-muted">
          <p>© {year} NOLAR Tech Limited</p>
          <Link href={CONTACT.privacyHref} className="flex min-h-32 items-center hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
