"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/data/site";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M1 3l3.5 3.5L8 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setSubOpen(false);
  };

  useEffect(() => {
    const open = () => setMenuOpen(true);
    window.addEventListener("open-site-menu", open);
    return () => window.removeEventListener("open-site-menu", open);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 box-border h-47 border-b border-line bg-navy lg:h-110">
      {/* Desktop */}
      <div className="hidden h-full items-start justify-between lg:flex">
        <Link href="/" aria-label="NOLAR home" className="ml-23 mt-18 block h-71 w-210">
          <Logo className="h-full w-full" />
        </Link>

        <nav aria-label="Site" className="mr-41 mt-45">
          <ul className="flex items-start gap-20 font-nav text-[1rem] uppercase leading-[1.2] text-white">
            {NAV.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 underline-offset-[0.2em] hover:underline ${
                    isActive(item.href) ? "underline" : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <Chevron className="h-8 w-8 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <ul className="invisible absolute -left-10 top-full pb-12 pl-10 pr-10 pt-12 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href} className="mb-10 whitespace-nowrap last:mb-0">
                        <Link
                          href={child.href}
                          className={`underline-offset-[0.2em] hover:underline ${
                            isActive(child.href) ? "underline" : ""
                          }`}
                        >
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
      </div>

      {/* Mobile */}
      <div className="relative h-full lg:hidden">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="absolute left-195 top-3 flex h-42 w-42 items-center justify-center text-white"
        >
          <svg viewBox="0 0 24 24" className="h-24 w-24" fill="none" aria-hidden="true">
            <path d="M2 6h20M2 12h20M2 18h20" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] overflow-y-auto bg-navy lg:hidden"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeMenu}
            className="absolute right-11 top-11 h-24 w-24 text-white"
          >
            <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" aria-hidden="true">
              <path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <nav aria-label="Site" className="pl-10 pt-102">
            <ul className="font-nav text-[1rem] uppercase leading-[1.2] text-white">
              {NAV.map((item) => (
                <li key={item.href} className="mb-17">
                  <div className="flex items-center gap-5">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`underline-offset-[0.2em] ${isActive(item.href) ? "underline" : ""}`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`More ${item.label} pages`}
                        aria-expanded={subOpen}
                        onClick={() => setSubOpen((v) => !v)}
                        className="flex h-20 w-20 items-center justify-center"
                      >
                        <Chevron
                          className={`h-8 w-8 transition-transform duration-200 ${subOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && subOpen && (
                    <ul className="mt-18">
                      {item.children.map((child) => (
                        <li key={child.href} className="mb-18 last:mb-0">
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className={`underline-offset-[0.2em] ${isActive(child.href) ? "underline" : ""}`}
                          >
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

          <Link href="/" onClick={closeMenu} aria-label="NOLAR home" className="ml-75 mt-20 block h-81 w-240">
            <Logo className="h-full w-full" />
          </Link>
        </div>
      )}
    </header>
  );
}
