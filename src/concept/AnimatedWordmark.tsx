"use client";

import { useCallback, useEffect, useRef } from "react";
import Logo from "@/components/Logo";
import { useReducedMotion } from "./hooks";

/*
 * The "Mira sweep" logo animation, rebuilt from the brand GIF
 * (mira-sweep-wake-600.gif, 110 frames, 8.78 s). A Mira drives across,
 * NOLAR appears in its wake (glowing just behind the robot, then cooling to
 * charcoal) and the blue glow wakes back up once it has passed.
 *
 * Every figure below comes from measuring the GIF. Positions are percentages
 * of the logo's width; times are milliseconds into the GIF's loop.
 */
const LOOP_END = 8780;
const FADE = [3000, 3180]; // logo fades out before the robot arrives
const DRIVE = [3341, 6813]; // robot's left edge travels ROBOT_X[0] → ROBOT_X[1] at a constant speed
const ROBOT_X = [-49.8, 119];
const SPEED = (ROBOT_X[1] - ROBOT_X[0]) / (DRIVE[1] - DRIVE[0]); // % of logo width per ms
const ROBOT_W = 31.2; // robot width, % of logo width
const REVEAL_AT = 0.75; // letters are revealed up to 75% along the robot's body
const TRAIL = 55; // length of the glowing wake behind the reveal edge, % of logo width
const WAKE = [7940, 8240]; // the glow ramps back up

// The canvas the robot is clipped to (the GIF's frame), relative to the logo box.
const CLIP = { left: -18.6, right: -19, top: -20, bottom: -25 };
const CLIP_W = 100 - CLIP.left - CLIP.right;
const CLIP_H = 100 - CLIP.top - CLIP.bottom;

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const phase = (t: number, [a, b]: number[]) => clamp((t - a) / (b - a));

// Glow strength while the logo is resting: a gentle breath (1.9–2.9 s) and a
// small overshoot as it wakes (8.24–8.78 s), as in the GIF.
function glowStrength(t: number) {
  if (t < 1900) return 1;
  if (t < 2900) return 1 - 0.2 * Math.sin(Math.PI * clamp((t - 2100) / 900));
  if (t < WAKE[0]) return 0.87;
  if (t < WAKE[1]) return lerp(0, 1.1, 1 - Math.pow(1 - phase(t, WAKE), 3));
  return lerp(1.1, 1, phase(t, [WAKE[1], LOOP_END]));
}

const halo = (g: number) =>
  `drop-shadow(0 0 1px rgb(150 196 250 / ${0.85 * g})) drop-shadow(0 0 4px rgb(150 196 250 / ${0.8 * g})) drop-shadow(0 0 11px rgb(150 196 250 / ${0.55 * g}))`;

/**
 * The header wordmark. Plays once shortly after the page loads and again when
 * the logo is hovered or focused; otherwise it rests on the glowing logo.
 */
export default function AnimatedWordmark({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const plainRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const robotRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const render = useCallback((t: number) => {
    const plain = plainRef.current;
    const glow = glowRef.current;
    const robot = robotRef.current;
    if (!plain || !glow || !robot) return;

    const x = lerp(ROBOT_X[0], ROBOT_X[1], phase(t, DRIVE));
    // The wake keeps travelling at the robot's speed after it drives off, so the
    // last glowing letters slide away with it rather than stopping at the edge.
    const reveal = ROBOT_X[0] + SPEED * Math.max(0, t - DRIVE[0]) + ROBOT_W * REVEAL_AT;
    const driving = t >= FADE[1] && t < WAKE[0];
    const before = t < FADE[1];

    // Whole logo fades out just before the robot arrives.
    const logoOpacity = t < FADE[0] ? 1 : before ? 1 - phase(t, FADE) : 1;

    // Charcoal letters: everything before the drive, then only what the robot has uncovered.
    plain.style.opacity = String(logoOpacity);
    plain.style.clipPath = driving ? `inset(-50% ${clamp(100 - reveal, 0, 100)}% -50% -50%)` : "none";

    // Glowing letters: a trail just behind the reveal edge while driving,
    // the full logo while resting.
    if (driving) {
      const mask = `linear-gradient(90deg, transparent ${reveal - TRAIL}%, #000 ${reveal - 6}%, #000 ${reveal}%, transparent ${reveal}%)`;
      glow.style.maskImage = mask;
      glow.style.webkitMaskImage = mask;
      glow.style.opacity = "1";
      glow.style.filter = halo(1);
    } else {
      glow.style.maskImage = "none";
      glow.style.webkitMaskImage = "none";
      const g = glowStrength(t);
      glow.style.opacity = String(t >= WAKE[0] ? clamp(g) : logoOpacity);
      glow.style.filter = halo(g);
    }

    // Robot: its left edge in clip-box units.
    const left = ((x - CLIP.left) / CLIP_W) * 100;
    robot.style.transform = `translateX(${(left / ((ROBOT_W / CLIP_W) * 100)) * 100}%)`;
    robot.style.visibility = t > DRIVE[0] && t < DRIVE[1] ? "visible" : "hidden";
  }, []);

  const play = useCallback(
    (from: number) => {
      if (reduced || frame.current) return;
      const start = performance.now() - from;
      const tick = (now: number) => {
        const t = now - start;
        if (t >= LOOP_END) {
          render(LOOP_END);
          frame.current = 0;
          return;
        }
        render(t);
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    },
    [reduced, render],
  );

  // Once on load (from just before the fade, so the logo the server rendered
  // flows straight into the animation), and again on hover or focus.
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => play(2600), 500);
    const root = rootRef.current?.closest("a") ?? rootRef.current;
    const replay = () => play(2900);
    root?.addEventListener("mouseenter", replay);
    root?.addEventListener("focus", replay);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      root?.removeEventListener("mouseenter", replay);
      root?.removeEventListener("focus", replay);
      render(LOOP_END);
    };
  }, [play, reduced, render]);

  return (
    <span ref={rootRef} className={`relative block ${className}`}>
      {/* Charcoal: the letters as the robot leaves them */}
      <span ref={plainRef} aria-hidden="true" className="absolute inset-0 grayscale [&_path]:fill-current">
        <Logo className="h-full w-full" />
      </span>
      {/* Glowing: navy (white on dark) with the blue halo */}
      <span ref={glowRef} className="logo-glow absolute inset-0 [&_path]:fill-current">
        <Logo className="h-full w-full" />
      </span>
      {/* The Mira, clipped to the original animation's frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: `${CLIP.left}%`,
          right: `${CLIP.right}%`,
          top: `${CLIP.top}%`,
          bottom: `${CLIP.bottom}%`,
        }}
      >
        <span
          ref={robotRef}
          className="absolute left-0 bg-[url('/concept/mira-sweep.webp')] bg-contain bg-center bg-no-repeat"
          style={{
            width: `${(ROBOT_W / CLIP_W) * 100}%`,
            top: `${((-10 - CLIP.top) / CLIP_H) * 100}%`,
            height: `${(131.2 / CLIP_H) * 100}%`,
            visibility: "hidden",
          }}
        />
      </span>
    </span>
  );
}
