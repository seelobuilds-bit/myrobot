"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AskPalette from "./AskPalette";
import { AVENTURIER, FLEET, NAV, machineHref, robotHref, to } from "./data";
import { Arrow, Wordmark } from "./ui";

export default function Nav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const [ask, setAsk] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const megaTimer = useRef<number | undefined>(undefined);

  // Close overlays on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMega(false);
    setMenu(false);
    setAsk(false);
  }

  // Swap to the light-on-dark treatment over dark sections, and tuck the bar
  // away while scrolling down so it never sits on top of content.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const probe = 36;
      const darkSections = document.querySelectorAll<HTMLElement>("[data-nav='dark']");
      let isDark = false;
      darkSections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) isDark = true;
      });
      setDark(isDark);
      setScrolled(y > 12);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // ⌘K / Ctrl+K opens the assistant from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setAsk((open) => !open);
      }
      if (e.key === "Escape") {
        setMega(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  const openMega = () => {
    window.clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    window.clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMega(false), 140);
  };

  const onDark = dark && !mega && !menu;
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !mega && !menu ? "-translate-y-[140%]" : ""
        }`}
      >
        <div className="wrap pt-3 lg:pt-4">
          <div
            onMouseLeave={closeMega}
            className={`relative rounded-[1.4rem] border transition-[background-color,border-color,color,box-shadow] duration-500 ${
              onDark
                ? "border-white/10 bg-night/55 text-white backdrop-blur-xl"
                : scrolled || mega
                  ? "border-ink/[0.07] bg-surface/80 text-ink shadow-[0_12px_40px_-18px_rgb(10_13_20/0.35)] backdrop-blur-xl"
                  : "border-transparent bg-transparent text-ink"
            }`}
          >
            <div className="flex h-14 items-center gap-4 pl-4 pr-2 lg:h-16 lg:pl-5">
              <Link href={to("/")} aria-label="NOLAR home" className="h-7 w-[6.2rem] shrink-0 lg:h-8 lg:w-[7rem]">
                <Wordmark className="h-full w-full" />
              </Link>

              <nav aria-label="Main" className="ml-6 hidden flex-1 lg:block">
                <ul className="flex items-center gap-1">
                  {NAV.map((item) => {
                    const isRobots = item.label === "Robots";
                    return (
                      <li key={item.href} onMouseEnter={isRobots ? openMega : closeMega}>
                        <Link
                          href={item.href}
                          onFocus={isRobots ? openMega : undefined}
                          aria-expanded={isRobots ? mega : undefined}
                          className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.94rem] font-[520] transition-colors ${
                            onDark ? "hover:bg-white/10" : "hover:bg-ink/[0.05]"
                          }`}
                        >
                          {item.label}
                          {isRobots && (
                            <svg
                              viewBox="0 0 10 10"
                              className={`h-2.5 w-2.5 transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                              aria-hidden="true"
                            >
                              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" />
                            </svg>
                          )}
                          {active(item.href) && (
                            <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-current" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="ml-auto flex items-center gap-1.5 lg:gap-2">
                <button
                  type="button"
                  onClick={() => setAsk(true)}
                  className={`group flex h-10 items-center gap-2 rounded-full px-3 text-[0.9rem] font-[520] transition-colors lg:h-11 lg:border lg:pl-3.5 lg:pr-2 ${
                    onDark ? "border-white/15 hover:bg-white/10" : "border-ink/10 hover:bg-ink/[0.05]"
                  }`}
                  aria-label="Ask a question"
                >
                  <svg viewBox="0 0 20 20" className="h-[1.1rem] w-[1.1rem]" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="hidden xl:inline">Ask anything</span>
                  <kbd
                    className={`t-mono hidden rounded-md border px-1.5 py-0.5 !text-[0.65rem] !tracking-normal xl:inline ${
                      onDark ? "border-white/15 text-white/60" : "border-ink/10 text-steel"
                    }`}
                  >
                    ⌘K
                  </kbd>
                </button>
                <Link
                  href={to("/contact")}
                  className={`btn hidden !h-11 !px-5 !text-[0.9rem] md:inline-flex ${onDark ? "btn-signal" : "btn-ink"}`}
                >
                  Book a free demo
                </Link>
                <button
                  type="button"
                  onClick={() => setMenu((open) => !open)}
                  aria-expanded={menu}
                  aria-controls="concept-menu"
                  aria-label={menu ? "Close menu" : "Open menu"}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
                >
                  <span
                    className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${menu ? "rotate-45" : "-translate-y-[4px]"}`}
                  />
                  <span
                    className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${menu ? "-rotate-45" : "translate-y-[4px]"}`}
                  />
                </button>
              </div>
            </div>

            {/* Robots mega menu */}
            {/* Grid rows animate from 0fr to 1fr, so the panel opens to exactly its
                content height; on short windows it scrolls instead of clipping. */}
            <div
              onMouseEnter={openMega}
              className={`hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] lg:grid ${
                mega ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid max-h-[calc(100svh-7rem)] grid-cols-[1fr_16rem] gap-5 overflow-y-auto overscroll-contain border-t border-ink/[0.07] p-4 xl:grid-cols-[1fr_17rem] xl:p-5">
                  <ul className="grid grid-cols-4 gap-2">
                    {FLEET.map((robot) => (
                      <li key={robot.slug}>
                        <Link
                          href={robotHref(robot.slug)}
                          onClick={() => setMega(false)}
                          className="group block rounded-2xl p-2 transition-colors hover:bg-paper"
                        >
                          <span className="relative block aspect-[16/9] overflow-hidden rounded-xl bg-mist">
                            <Image
                              src={robot.hero.src}
                              alt=""
                              fill
                              sizes="220px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              style={{ objectPosition: robot.meta.focus }}
                            />
                          </span>
                          <span className="mt-2.5 flex items-baseline justify-between px-1">
                            <span className="font-[600]">{robot.name}</span>
                            <span className="t-mono text-steel">{robot.meta.no}</span>
                          </span>
                          <span className="mt-0.5 block truncate px-1 text-[0.8rem] leading-snug text-steel">
                            {robot.meta.short}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={to("/robots")}
                        onClick={() => setMega(false)}
                        className="flex h-full flex-col justify-between rounded-2xl bg-ink p-4 text-on-ink transition-colors hover:bg-signal hover:text-white"
                      >
                        <span className="t-mono opacity-60">Not sure?</span>
                        <span>
                          <span className="block text-lg font-[600] leading-tight">
                            Compare the fleet &amp; find your robot
                          </span>
                          <Arrow className="mt-3 h-5 w-5" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="flex flex-col rounded-2xl bg-paper p-4">
                    <p className="t-mono text-av-ink">Aventurier · operator-led</p>
                    <ul className="mt-3 space-y-2">
                      {AVENTURIER.map((machine) => (
                        <li key={machine.slug}>
                          <Link
                            href={machineHref(machine.slug)}
                            onClick={() => setMega(false)}
                            className="group flex items-center gap-3 rounded-xl bg-surface p-2 pr-3 transition-shadow hover:shadow-md"
                          >
                            <span className="relative h-16 w-12 shrink-0">
                              <Image src={machine.image.src} alt="" fill sizes="48px" className="object-contain" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-[600]">{machine.name}</span>
                              <span className="block text-[0.78rem] leading-snug text-steel">{machine.category}</span>
                            </span>
                            <Arrow className="ml-auto h-4 w-4 text-steel" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-4 text-[0.8rem] leading-snug text-steel">
                      Cordless machines for stairs, seating and the tight spots robots don&apos;t reach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="concept-menu"
        className={`fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-500 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex h-full flex-col overflow-y-auto pb-8 pt-24">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                  menu ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: menu ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link href={item.href} className="flex items-baseline justify-between border-b border-rule py-3.5">
                  <span className="text-[2rem] font-[600] tracking-[-0.03em] [font-stretch:106%]">{item.label}</span>
                  <span className="t-mono text-steel">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="t-mono mt-8 text-steel">The fleet</p>
          <ul className="no-scrollbar -mx-[var(--gutter)] mt-3 flex gap-3 overflow-x-auto px-[var(--gutter)] pb-2">
            {FLEET.map((robot) => (
              <li key={robot.slug} className="w-36 shrink-0">
                <Link href={robotHref(robot.slug)} className="block">
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-mist">
                    <Image
                      src={robot.hero.src}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover"
                      style={{ objectPosition: robot.meta.focus }}
                    />
                  </span>
                  <span className="mt-2 block text-sm font-[600]">{robot.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-2 pt-8">
            <Link href={to("/contact")} className="btn btn-ink w-full">
              Book a free demo
            </Link>
            <a href="tel:+353851942831" className="btn btn-line w-full">
              Call +353 85 194 2831
            </a>
          </div>
        </nav>
      </div>

      {ask && <AskPalette onClose={() => setAsk(false)} />}
    </>
  );
}
