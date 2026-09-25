"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { currentSiteHref } from "./data";

const KEY = "nolar-concept-badge-hidden";
let hiddenInMemory = false; // fallback when sessionStorage is unavailable

const subscribe = (onChange: () => void) => {
  window.addEventListener(KEY, onChange);
  return () => window.removeEventListener(KEY, onChange);
};

const isHidden = () => {
  if (hiddenInMemory) return true;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

const hide = () => {
  hiddenInMemory = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode: it stays hidden until the next page load */
  }
  window.dispatchEvent(new Event(KEY));
};

// A small corner tag for presenting the concept: it links to the same page
// on the current design so the two can be compared side by side.
export default function ConceptBadge() {
  const pathname = usePathname();
  // Hidden during server render; shown after hydration unless dismissed.
  const hidden = useSyncExternalStore(subscribe, isHidden, () => true);

  if (hidden) return null;

  return (
    <div className="pop-in fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-night/85 py-1 pl-3 pr-1 text-white shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl">
      <span aria-hidden="true" className="blink mr-1 h-1.5 w-1.5 rounded-full bg-lidar" />
      <span className="t-mono hidden !text-[0.66rem] text-white/70 sm:inline">Design concept</span>
      <a
        href={currentSiteHref(pathname)}
        className="rounded-full bg-white/10 px-3 py-1.5 text-[0.78rem] font-[520] transition-colors hover:bg-white hover:text-night sm:ml-2"
      >
        <span className="sm:hidden">Current design</span>
        <span className="hidden sm:inline">View current design</span>
      </a>
      <button
        type="button"
        onClick={hide}
        aria-label="Hide concept tag"
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white"
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
