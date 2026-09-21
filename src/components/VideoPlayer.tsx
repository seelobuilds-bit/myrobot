"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  poster: string;
  title: string;
  className?: string;
};

// Matches the original player: a 16:9 poster with a centred play icon; the
// video file is only requested once the visitor presses play.
export default function VideoPlayer({ src, poster, title, className = "" }: VideoPlayerProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
      {started ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          onClick={() => setStarted(true)}
          className="group absolute inset-0 block h-full w-full"
        >
          <Image src={poster} alt={title} fill sizes="(min-width: 1001px) 80vw, 100vw" className="object-cover" />
          <span className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white transition-transform duration-200 group-hover:scale-110 lg:h-32 lg:w-32">
            <svg viewBox="0 0 36 36" className="h-full w-full" aria-hidden="true">
              <path d="M10 5v26l21-13z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
