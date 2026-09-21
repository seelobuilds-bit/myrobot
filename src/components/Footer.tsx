"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div className="t-small flex flex-col items-center px-24 pb-39 pt-43 text-muted lg:hidden">
        <button
          type="button"
          aria-label="Menu"
          onClick={() => window.dispatchEvent(new Event("open-site-menu"))}
          className="flex h-42 w-42 items-center justify-center text-white"
        >
          <svg viewBox="0 0 24 24" className="h-24 w-24" fill="none" aria-hidden="true">
            <path d="M2 6h20M2 12h20M2 18h20" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <Link href={CONTACT.privacyHref} className="mt-43">
          Privacy Policy
        </Link>
        <a href={CONTACT.websiteHref} className="mt-41">
          {CONTACT.website}
        </a>
        <p className="mt-13 self-end">© {year} NOLAR Tech Limited</p>
        <a href={CONTACT.emailHref} className="mt-12 self-start">
          {CONTACT.email}
        </a>
      </div>
    </footer>
  );
}
