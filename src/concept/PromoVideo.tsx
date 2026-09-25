"use client";

import Image from "next/image";
import { useState } from "react";

/** Poster with a play button; the (large) promo file only loads on demand. */
export default function PromoVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-night">
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline className="h-full w-full object-cover" />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 block h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-night/25 transition-colors group-hover:bg-night/10" />
          <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-night shadow-[0_20px_60px_-10px_rgb(0_0_0/0.5)] backdrop-blur transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 sm:h-28 sm:w-28">
            <span className="ping absolute inset-0 rounded-full border border-white/70" />
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" aria-hidden="true">
              <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
            </svg>
          </span>
          <span className="t-mono absolute bottom-5 left-5 rounded-full bg-night/60 px-3 py-1.5 text-white backdrop-blur">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
