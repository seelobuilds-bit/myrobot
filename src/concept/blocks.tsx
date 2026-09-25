import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT } from "@/data/site";
import { to } from "./data";
import { Arrow, Eyebrow, Lines, R } from "./ui";

/** Standard opening for inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
  tone = "paper",
  children,
}: {
  eyebrow: string;
  title: ReactNode[];
  intro?: ReactNode;
  aside?: ReactNode;
  tone?: "paper" | "mist";
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden ${tone === "mist" ? "bg-mist" : "bg-paper"} pb-16 pt-32 lg:pb-24 lg:pt-44`}
    >
      <div className="wrap">
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16" : ""}>
          <div>
            <R>
              <Eyebrow>{eyebrow}</Eyebrow>
            </R>
            <Lines as="h1" lines={title} className="t-h1 mt-6" delay={100} step={100} />
            {intro && (
              <R delay={300}>
                <p className="t-lead mt-8 max-w-2xl text-ink-soft">{intro}</p>
              </R>
            )}
          </div>
          {aside && <R delay={400}>{aside}</R>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Closing call to action used at the foot of inner pages. */
export function CtaBand({
  title = "Ready to see it in action?",
  text = "Book a free site assessment and demo anywhere in Ireland.",
  query,
}: {
  title?: string;
  text?: string;
  query?: string;
}) {
  return (
    <section className="bg-paper pb-8 pt-4 lg:pb-10">
      <div className="wrap">
        <R
          variant="scale"
          className="relative overflow-hidden rounded-[2rem] bg-signal px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20"
        >
          <div aria-hidden="true" className="grid-lines-dark absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-[100px]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <Eyebrow tone="light" className="!text-white/85">
                Free site assessment
              </Eyebrow>
              <h2 className="t-h2 mt-5 text-white">{title}</h2>
              <p className="t-lead mt-5 max-w-xl text-white/90">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link href={`${to("/contact")}${query ? `?${query}` : ""}`} className="btn btn-white">
                Book a free demo
                <Arrow />
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn-line-light">
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/** Numbered item used in feature and process grids. */
export function NumberedItem({
  no,
  title,
  text,
  dark = false,
}: {
  no: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className={`h-full border-t pt-5 ${dark ? "border-white/15" : "border-rule"}`}>
      <p className={`t-mono ${dark ? "text-glow" : "text-signal-ink"}`}>{no}</p>
      <h3 className={`t-h3 mt-4 ${dark ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-3 leading-relaxed ${dark ? "text-white/60" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}
