"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "./hooks";

/** A muted background loop that only plays while on screen. */
export default function LoopVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: false, margin: "10% 0px 10% 0px", threshold: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduced) {
      video.play().catch(() => {
        /* autoplay blocked: the poster stays up */
      });
    } else {
      video.pause();
    }
  }, [inView, reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
