import type { CSSProperties, ReactNode } from "react";
import Logo from "@/components/Logo";

export function Arrow({
  className = "h-4 w-4",
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "up-right" | "down";
}) {
  const d =
    direction === "up-right"
      ? "M6 14 14 6M7 6h7v7"
      : direction === "down"
        ? "M10 4v12M5 11l5 5 5-5"
        : "M4 10h12M11 5l5 5-5 5";
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`arrow shrink-0 ${className}`} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The NOLAR wordmark in whatever colour the parent text is. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`block [&_path]:fill-current ${className}`}>
      <Logo className="h-full w-full" />
    </span>
  );
}

/** Small mono label with a leading tick, used as section eyebrows. */
export function Eyebrow({
  children,
  className = "",
  tone = "signal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "signal" | "muted" | "light";
}) {
  const color = tone === "signal" ? "text-signal-ink" : tone === "light" ? "text-white/60" : "text-steel";
  return (
    <p className={`t-mono flex items-center gap-2.5 ${color} ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current" />
      {children}
    </p>
  );
}

/** Splits a headline into lines that rise out of a mask when revealed. */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  step = 90,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <Tag className={className} data-lines="">
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span style={{ "--d": `${delay + i * step}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Wrapper that fades/rises content in when scrolled into view. */
export function R({
  children,
  className = "",
  delay = 0,
  variant,
  as: Tag = "div",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "scale";
  as?: "div" | "li" | "p" | "section" | "figure" | "span";
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={variant ?? ""}
      style={{ ...style, "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode[];
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <R>
          <Eyebrow tone={dark ? "light" : "signal"} className={center ? "justify-center" : ""}>
            {eyebrow}
          </Eyebrow>
        </R>
      )}
      <Lines lines={title} className={`t-h2 mt-5 ${dark ? "text-white" : ""}`} />
      {intro && (
        <R delay={150}>
          <p className={`t-lead mt-6 max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-white/65" : "text-ink-soft"}`}>
            {intro}
          </p>
        </R>
      )}
    </div>
  );
}

export function Chip({
  children,
  active = false,
  dark = false,
}: {
  children: ReactNode;
  active?: boolean;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm ${
        active
          ? "border-signal bg-signal text-white"
          : dark
            ? "border-white/15 text-white/80"
            : "border-rule bg-surface/60 text-ink-soft"
      }`}
    >
      {children}
    </span>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
