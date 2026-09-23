const PATHS = {
  drop: "M12 3.5c3.2 4.1 6 7.4 6 10.6a6 6 0 0 1-12 0c0-3.2 2.8-6.5 6-10.6zM9.2 14.2l1.9 1.9 3.7-3.8",
  rotate: "M20 12a8 8 0 1 1-2.35-5.66M20 4.5V8.4h-3.9",
  battery: "M3 8h14.5v8H3zM17.5 10.5H20v3h-2.5M10.8 9.3 8.6 12.2h3l-2.2 2.9",
  wrench: "M14.6 6.1a4 4 0 0 0-5.3 5.2L4 16.6 7.4 20l5.3-5.3a4 4 0 0 0 5.2-5.3l-2.5 2.5-2.5-.6-.6-2.5z",
  bolt: "M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z",
  air: "M3 9h10.5a2.75 2.75 0 1 0-2.75-2.75M3 15h14a2.75 2.75 0 1 1-2.75 2.75M3 12h7",
  filter: "M4 5h16l-6.2 7.2v5.3L10.2 19.5v-7.3z",
  harness: "M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7M6 7h12v13H6zM9.5 12h5M9.5 15.5h5",
  hose: "M5 20v-4a4 4 0 0 1 4-4h6a4 4 0 0 0 4-4V4M3 20h4M17 4h4",
  screen: "M4 5h16v11H4zM9 20h6M12 16v4",
  signal: "M5 19v-3M9.5 19v-6M14 19v-9M18.5 19V6",
  check: "M5 12.5l4.2 4.2L19 7",
  arrow: "M4 12h15M13 6l6 6-6 6",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
