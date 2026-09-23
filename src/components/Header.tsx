"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { CONTACT, NAV, type NavItem } from "@/data/site";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M1 3l3.5 3.5L8 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const sectionOf = (pathname: string) =>
  NAV.find((item) => item.href === pathname || item.children?.some((child) => child.href === pathname))?.href ??
  null;

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    // Expand the section the visitor is currently in, so they can see where they are.
    const current = sectionOf(pathname);
    setOpenSection(NAV.find((item) => item.href === current)?.children ? current : null);
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const menuButton = menuButtonRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuButton?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;
  const inSection = (item: NavItem) => isActive(item.href) || !!item.children?.some((child) => isActive(child.href));

  return (
    <>
      <header className="sticky top-0 z-50 box-border h-64 border-b border-line bg-navy/90 backdrop-blur-md lg:relative lg:h-110 lg:bg-navy lg:backdrop-blur-none">
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

        {/* Mobile bar */}
        <div className="flex h-full items-center justify-between px-20 lg:hidden">
          <Link href="/" aria-label="NOLAR home" className="block h-40 w-140">
            <Logo className="h-full w-full" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={openMenu}
            className="-mr-10 flex h-44 w-44 items-center justify-center text-white"
          >
            <svg viewBox="0 0 24 24" className="h-24 w-24" fill="none" aria-hidden="true">
              <path d="M3 7h18M3 12h18M9 17h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu. Rendered outside <header> because the header's backdrop
          blur would otherwise become the containing block for position: fixed. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="anim-fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-navy lg:hidden"
        >
          <div className="flex h-64 shrink-0 items-center justify-between border-b border-line px-20">
            <Link href="/" onClick={closeMenu} aria-label="NOLAR home" className="block h-40 w-140">
              <Logo className="h-full w-full" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="-mr-10 flex h-44 w-44 items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" className="h-22 w-22" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Site" className="anim-sheet-in flex-1 px-20 pt-8">
            <ul className="font-nav uppercase">
              {NAV.map((item) => {
                const expanded = openSection === item.href;
                const submenuId = `submenu-${item.href.slice(1)}`;
                return (
                  <li key={item.href} className="border-b border-line">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`flex min-h-58 flex-1 items-center gap-10 text-[1.0625rem] tracking-[0.04em] ${
                          inSection(item) ? "text-white" : "text-ink/75"
                        }`}
                      >
                        {inSection(item) && <span className="h-6 w-6 rounded-full bg-accent" aria-hidden="true" />}
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          aria-label={`${expanded ? "Hide" : "Show"} ${item.label} pages`}
                          aria-expanded={expanded}
                          aria-controls={submenuId}
                          onClick={() => setOpenSection(expanded ? null : item.href)}
                          className="-mr-12 flex h-48 w-48 items-center justify-center text-white"
                        >
                          <Chevron
                            className={`h-12 w-12 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {item.children && expanded && (
                      <ul id={submenuId} className="anim-fade-in -mt-6 pb-14 normal-case">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={`flex min-h-44 items-center justify-between border-l pl-16 text-[1rem] ${
                                isActive(child.href) ? "border-accent text-white" : "border-line text-muted"
                              }`}
                            >
                              {child.label}
                              <svg viewBox="0 0 16 16" className="h-14 w-14" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 px-20 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-28">
            <Link href="/contact" onClick={closeMenu} className="btn btn-solid h-52 w-full">
              Book a Free Demo
            </Link>
            <a href={CONTACT.phoneHref} className="btn mt-12 h-52 w-full">
              Call {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref} className="t-small mt-18 block text-center text-muted">
              {CONTACT.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
