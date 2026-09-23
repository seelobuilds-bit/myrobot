"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { GREETING, getReply, type AssistantLink, type AssistantReply } from "@/data/assistant";

type Message = { id: number; from: "bot"; reply: AssistantReply } | { id: number; from: "user"; text: string };

const MOBILE = "(max-width: 1000px)";

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5h16v10.5H9.5L5.5 19.5V16H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ external }: { external?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-14 w-14 shrink-0" aria-hidden="true">
      {external ? (
        <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.3" />
      ) : (
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
      )}
    </svg>
  );
}

// Floating "find your way" assistant. It matches what the visitor types to
// the page that answers it (see src/data/assistant.ts) and links them there.
export default function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", reply: GREETING }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Scroll to the newest message.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (!open) return;
    // Phones get a full sheet, so stop the page scrolling underneath it and
    // don't pop the keyboard up straight away.
    const mobile = window.matchMedia(MOBILE).matches;
    if (mobile) document.body.style.overflow = "hidden";
    else inputRef.current?.focus();
    const launcher = launcherRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      if (mobile) document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      launcher?.focus({ preventScroll: true });
    };
  }, [open]);

  const send = (text: string) => {
    const question = text.trim();
    if (!question || thinking) return;
    setMessages((list) => [...list, { id: nextId.current++, from: "user", text: question }]);
    setInput("");
    setThinking(true);
    // A short pause reads as a reply rather than an instant page jump.
    window.setTimeout(() => {
      setMessages((list) => [...list, { id: nextId.current++, from: "bot", reply: getReply(question) }]);
      setThinking(false);
    }, 450);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(input);
  };

  const restart = () => {
    setMessages([{ id: nextId.current++, from: "bot", reply: GREETING }]);
    setInput("");
  };

  const last = messages[messages.length - 1];

  const linkClass =
    "group flex items-center gap-12 border border-line bg-navy px-14 py-12 text-left transition-colors hover:border-white/50 focus-visible:border-white";

  const renderLink = (link: AssistantLink) => {
    const body = (
      <>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.9375rem] font-bold leading-[1.2] text-white">{link.title}</span>
          <span className="mt-2 block text-[0.8125rem] leading-[1.3] text-muted">{link.text}</span>
        </span>
        <span className="text-white transition-transform duration-200 group-hover:translate-x-2">
          <ArrowIcon external={link.external} />
        </span>
      </>
    );
    if (link.external) {
      const isPdf = link.href.endsWith(".pdf");
      return (
        <a
          key={link.href}
          href={link.href}
          target={isPdf ? "_blank" : undefined}
          rel={isPdf ? "noreferrer" : undefined}
          className={linkClass}
        >
          {body}
        </a>
      );
    }
    return (
      <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={linkClass}>
        {body}
      </Link>
    );
  };

  return (
    <>
      {/* Kept mounted while the panel is open so focus can return to it. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`anim-fade-in fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-16 z-[55] h-56 items-center gap-10 rounded-full bg-white pl-16 pr-20 text-navy shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-2 lg:bottom-24 lg:right-24 lg:h-52 ${
          open ? "hidden" : "flex"
        }`}
      >
        <ChatIcon className="h-24 w-24" />
        <span className="text-[0.9375rem] font-bold leading-none">Ask us</span>
      </button>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="anim-fade-in fixed inset-0 z-[56] bg-black/55 lg:hidden"
          />
          <div
            role="dialog"
            aria-label="Site assistant"
            className="anim-sheet-in fixed inset-x-0 bottom-0 z-[57] flex h-[88dvh] flex-col overflow-hidden rounded-t-[20px] border border-line bg-panel shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:inset-auto lg:bottom-24 lg:right-24 lg:h-600 lg:max-h-[calc(100dvh-3rem)] lg:w-400 lg:rounded-[16px]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-12 border-b border-line px-16 py-12">
              <span className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-white text-navy">
                <ChatIcon className="h-22 w-22" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[1rem] font-bold leading-[1.2] text-white">MyRobot Guide</p>
                <p className="mt-2 text-[0.8125rem] leading-[1.2] text-muted">I&apos;ll point you to the right page</p>
              </div>
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-full px-10 py-6 text-[0.8125rem] text-muted hover:text-white"
                >
                  Restart
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="-mr-6 flex h-40 w-40 items-center justify-center text-white"
              >
                <svg viewBox="0 0 24 24" className="h-20 w-20" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Conversation */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-14 overflow-y-auto overscroll-contain px-16 py-16"
            >
              {messages.map((message) =>
                message.from === "user" ? (
                  <p
                    key={message.id}
                    className="anim-fade-in ml-auto w-fit max-w-[85%] rounded-[14px] rounded-br-[4px] bg-white px-14 py-10 text-[0.9375rem] leading-[1.35] text-navy"
                  >
                    {message.text}
                  </p>
                ) : (
                  <div key={message.id} className="anim-fade-in max-w-[92%] space-y-8">
                    <p className="w-fit rounded-[14px] rounded-bl-[4px] border border-line bg-navy px-14 py-10 text-[0.9375rem] leading-[1.35] text-ink">
                      {message.reply.text}
                    </p>
                    {message.reply.links.length > 0 && (
                      <div className="flex flex-col gap-6">{message.reply.links.map(renderLink)}</div>
                    )}
                  </div>
                ),
              )}

              {thinking && (
                <p className="flex w-fit items-center gap-4 rounded-[14px] border border-line bg-navy px-14 py-12" aria-label="Finding the right page">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-6 w-6 animate-pulse rounded-full bg-muted"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </p>
              )}

              {!thinking && last.from === "bot" && last.reply.suggestions && (
                <div className="flex flex-wrap gap-8 pt-4">
                  {last.reply.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-white/25 px-12 py-8 text-[0.8125rem] leading-none text-ink transition-colors hover:border-white hover:bg-white hover:text-navy"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex shrink-0 items-center gap-8 border-t border-line px-12 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12"
            >
              <label htmlFor="assistant-input" className="sr-only">
                What are you looking for?
              </label>
              <input
                ref={inputRef}
                id="assistant-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="e.g. a robot for my warehouse"
                autoComplete="off"
                enterKeyHint="send"
                maxLength={200}
                className="h-44 min-w-0 flex-1 rounded-full border border-line bg-navy px-16 text-[16px] text-ink outline-none placeholder:text-muted/70 focus:border-white/60"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || thinking}
                className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-opacity disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="h-20 w-20" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
