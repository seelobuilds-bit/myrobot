"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { GREETING, STARTER_SUGGESTIONS, getReply, type AssistantLink } from "@/data/assistant";
import { conceptHref } from "./data";
import { Arrow } from "./ui";

// A command-palette take on the site assistant: the same rule-based matcher
// (src/data/assistant.ts), answering live as the visitor types.
export default function AskPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState({ query: "", index: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const deferred = useDeferredValue(query);

  const reply = useMemo(() => (deferred.trim().length >= 2 ? getReply(deferred) : GREETING), [deferred]);
  const links: AssistantLink[] = useMemo(
    () => reply.links.map((link) => ({ ...link, href: conceptHref(link.href) })),
    [reply],
  );
  const suggestions = reply.suggestions ?? (deferred.trim() ? [] : STARTER_SUGGESTIONS);
  // The highlighted row resets whenever the answer changes.
  const active = selection.query === deferred ? selection.index : 0;
  const setActive = (update: (i: number) => number) => setSelection({ query: deferred, index: update(active) });

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const go = (link: AssistantLink) => {
    if (link.external || /^(https?:|mailto:|tel:)/.test(link.href) || link.href.endsWith(".pdf")) {
      window.open(
        link.href,
        link.href.startsWith("tel:") || link.href.startsWith("mailto:") ? "_self" : "_blank",
        "noreferrer",
      );
    } else {
      router.push(link.href);
    }
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (!links.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % links.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + links.length) % links.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(links[active]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-3 pt-[12vh] sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Ask NOLAR"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-night/45 backdrop-blur-sm pop-in"
      />
      <div className="pop-in relative w-full max-w-2xl overflow-hidden rounded-3xl border border-rule bg-surface/95 shadow-[0_40px_120px_-30px_rgb(5_7_13/0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-rule px-5">
          <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-signal-ink" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <label htmlFor="ask-input" className="sr-only">
            Ask a question
          </label>
          <input
            ref={inputRef}
            id="ask-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Try “robot for a 10,000 m² warehouse”"
            autoComplete="off"
            spellCheck={false}
            maxLength={200}
            className="h-16 min-w-0 flex-1 bg-transparent text-[1.1rem] outline-none placeholder:text-steel/70"
          />
          <kbd
            onClick={onClose}
            className="t-mono cursor-pointer rounded-md border border-rule px-1.5 py-0.5 !text-[0.65rem] !tracking-normal text-steel"
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5" aria-live="polite">
          <p className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-soft">
            <span aria-hidden="true" className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-signal" />
            {reply.text}
          </p>

          {links.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {links.map((link, i) => {
                const external = link.external || link.href.endsWith(".pdf");
                const cls = `group flex items-center gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                  i === active
                    ? "border-signal/40 bg-signal-soft/60"
                    : "border-transparent bg-paper hover:bg-signal-soft/40"
                }`;
                const body = (
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="block font-[600]">{link.title}</span>
                      <span className="mt-0.5 block truncate text-sm text-steel">{link.text}</span>
                    </span>
                    <Arrow direction={external ? "up-right" : "right"} className="h-4 w-4 text-signal-ink" />
                  </>
                );
                return (
                  <li key={link.href + link.title} onMouseEnter={() => setActive(() => i)}>
                    {external ? (
                      <a
                        href={link.href}
                        target={link.href.endsWith(".pdf") ? "_blank" : undefined}
                        rel="noreferrer"
                        onClick={onClose}
                        className={cls}
                      >
                        {body}
                      </a>
                    ) : (
                      <Link href={link.href} onClick={onClose} className={cls}>
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {suggestions.length > 0 && (
            <div className="mt-5">
              <p className="t-mono text-steel">Try</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-rule px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-on-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-rule bg-paper/60 px-5 py-3">
          <p className="t-mono text-steel">↑↓ to choose · ↵ to open</p>
          <p className="t-mono text-steel">NOLAR guide</p>
        </div>
      </div>
    </div>
  );
}
