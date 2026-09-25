// Extra data for the design concept. Product copy and figures still come from
// src/data/robots.ts and src/data/aventurier.ts; this file only adds the
// summaries, highlights and comparable numbers the concept's layouts need.
// Every figure below is taken from those spec tables.

import { MACHINES, type Machine } from "@/data/aventurier";
import { ROBOTS, type Robot } from "@/data/robots";

export const BASE = "/concept";
export const to = (path = "") => `${BASE}${path === "/" ? "" : path}`;

export type Mode = "Scrub" | "Sweep" | "Vacuum" | "Dust mop";

export type RobotMeta = {
  no: string;
  code: string;
  short: string;
  bestFor: string;
  environment: "Commercial" | "Industrial" | "Retail";
  modes: Mode[];
  highlights: { value: string; unit?: string; label: string }[];
  /** Comparable figures; null where the spec sheet doesn't give one. */
  metrics: {
    capacity: number | null;
    capacityNote?: string;
    runtime: number | null;
    runtimeNote?: string;
    passWidth: number | null;
    heightMm: number;
  };
  /** Floor area (m²) this robot is most at home on, used by the finder. */
  sweetSpot: [number, number];
  /** Where the robot's photo should be anchored when cropped. */
  focus: string;
};

export const ROBOT_META: Record<string, RobotMeta> = {
  phantas: {
    no: "01",
    code: "PH-4",
    short: "Four-in-one for small to midsize spaces",
    bestFor: "Small to mid-sized indoor spaces",
    environment: "Commercial",
    modes: ["Scrub", "Sweep", "Vacuum", "Dust mop"],
    highlights: [
      { value: "4", unit: "in 1", label: "Vacuum, sweep, scrub and dust mop" },
      { value: "0", unit: "mm", label: "Edge cleaning distance" },
      { value: "700", unit: "m²/h", label: "Cleaning capacity, up to" },
      { value: "14", unit: "h", label: "Sweeping runtime" },
    ],
    metrics: {
      capacity: 700,
      capacityNote: "350–700",
      runtime: 14,
      runtimeNote: "sweeping",
      passWidth: 600,
      heightMm: 617,
    },
    sweetSpot: [0, 5000],
    focus: "35% 60%",
  },
  "phantas-single": {
    no: "02",
    code: "PH-S",
    short: "Pure, continuous autonomous scrubbing",
    bestFor: "Small to mid-sized commercial floors",
    environment: "Commercial",
    modes: ["Scrub"],
    highlights: [
      { value: "4.5", unit: "h", label: "Continuous scrubbing per charge" },
      { value: "600", unit: "mm", label: "Minimum pass width" },
      { value: "0", unit: "mm", label: "Edge cleaning distance" },
      { value: "700", unit: "m²/h", label: "Cleaning capacity, up to" },
    ],
    metrics: {
      capacity: 700,
      capacityNote: "350–700",
      runtime: 4.5,
      runtimeNote: "scrubbing",
      passWidth: 600,
      heightMm: 617,
    },
    sweetSpot: [0, 3500],
    focus: "55% 45%",
  },
  "phan-shop": {
    no: "03",
    code: "PH-R",
    short: "Cleans your store while selling your stock",
    bestFor: "Active retail floors with customer footfall",
    environment: "Retail",
    modes: ["Scrub", "Sweep", "Vacuum", "Dust mop"],
    highlights: [
      { value: "2", unit: "jobs", label: "Cleaning and merchandising in one" },
      { value: "3", label: "Configurations: Standard, Pro, Max" },
      { value: "18.5", unit: "in", label: "Largest promotional display" },
      { value: "600", unit: "mm", label: "Minimum pass width" },
    ],
    metrics: { capacity: null, runtime: null, passWidth: 600, heightMm: 1420 },
    sweetSpot: [0, 5000],
    focus: "50% 40%",
  },
  mira: {
    no: "04",
    code: "MR-1",
    short: "Award-winning sweep and scrub in one pass",
    bestFor: "Mid-sized busy commercial spaces",
    environment: "Commercial",
    modes: ["Scrub", "Sweep"],
    highlights: [
      { value: "2,016", unit: "m²/h", label: "Max cleaning efficiency" },
      { value: "1", unit: "pass", label: "Sweeps and scrubs simultaneously" },
      { value: "22", unit: "L", label: "Clean water tank" },
      { value: "2025", label: "ISSA Innovative Leaders Award" },
    ],
    metrics: { capacity: 2016, runtime: 4, runtimeNote: "scrubbing", passWidth: 950, heightMm: 900 },
    sweetSpot: [2000, 12000],
    focus: "35% 55%",
  },
  omnie: {
    no: "05",
    code: "OM-1",
    short: "AI-powered cleaning for high-dynamic environments",
    bestFor: "Large, high-traffic and high-dynamic environments",
    environment: "Industrial",
    modes: ["Scrub", "Sweep", "Dust mop"],
    highlights: [
      { value: "3,604", unit: "m²/h", label: "Max capacity, dust mopping" },
      { value: "360", unit: "°", label: "OmniVision camera coverage" },
      { value: "33", unit: "L", label: "Clean water tank" },
      { value: "8", unit: "h", label: "Sweeping runtime" },
    ],
    metrics: {
      capacity: 3604,
      capacityNote: "dust mopping",
      runtime: 8,
      runtimeNote: "sweeping",
      passWidth: 800,
      heightMm: 1070,
    },
    sweetSpot: [5000, 50000],
    focus: "45% 65%",
  },
  marvel: {
    no: "06",
    code: "MV-1",
    short: "High capacity for large and complex spaces",
    bestFor: "Large and complex indoor spaces",
    environment: "Industrial",
    modes: ["Scrub", "Sweep"],
    highlights: [
      { value: "10", unit: "h", label: "Total runtime, up to" },
      { value: "72", unit: "L", label: "Clean water tank" },
      { value: "2,016", unit: "m²/h", label: "Max cleaning efficiency" },
      { value: "10", unit: "°", label: "Gradeability" },
    ],
    metrics: { capacity: 2016, runtime: 10, runtimeNote: "total", passWidth: 1300, heightMm: 1150 },
    sweetSpot: [5000, 50000],
    focus: "60% 55%",
  },
  beetle: {
    no: "07",
    code: "BT-1",
    short: "Heavy-duty autonomous industrial sweeper",
    bestFor: "Industrial and back-of-house",
    environment: "Industrial",
    modes: ["Sweep"],
    highlights: [
      { value: "3,240", unit: "m²/h", label: "Max cleaning efficiency" },
      { value: "45", unit: "L", label: "Trash capacity" },
      { value: "1,320", unit: "m³/h", label: "Max airflow" },
      { value: "0", unit: "mm", label: "Edge cleaning distance" },
    ],
    metrics: { capacity: 3240, runtime: 5, passWidth: null, heightMm: 680 },
    sweetSpot: [4000, 50000],
    focus: "45% 55%",
  },
};

export const FLEET = ROBOTS.map((robot) => ({ ...robot, meta: ROBOT_META[robot.slug] })).sort((a, b) =>
  a.meta.no.localeCompare(b.meta.no),
);

export type FleetRobot = Robot & { meta: RobotMeta };

// The full promo videos are too large for git (public/videos is ignored), so the
// concept streams 720p web copies from the project's Vercel Blob store instead.
export const PROMO_VIDEO_HOST = "https://nj9t1m7ujq7asbyw.public.blob.vercel-storage.com/promo";
export const promoVideoSrc = (src: string) => `${PROMO_VIDEO_HOST}/${src.split("/").pop()}`;

export const robotHref = (slug: string) => to(`/robots/${slug}`);
export const machineHref = (slug: string) => to(`/aventurier/${slug}`);

export const AVENTURIER: Machine[] = MACHINES;

// ---------- Finder ----------

export const SPACES = [
  { key: "retail", label: "Retail & supermarkets", picks: ["phantas", "phan-shop", "phantas-single"] },
  { key: "shopping", label: "Shopping centres", picks: ["mira", "omnie", "marvel"] },
  { key: "warehouse", label: "Warehouses & logistics", picks: ["marvel", "beetle", "omnie"] },
  { key: "factory", label: "Factories & industrial", picks: ["beetle", "marvel", "omnie"] },
  { key: "carpark", label: "Car parks", picks: ["marvel", "beetle", "omnie"] },
  { key: "transport", label: "Airports & transport", picks: ["omnie", "mira", "marvel"] },
  { key: "healthcare", label: "Healthcare", picks: ["phantas", "mira", "phantas-single"] },
  { key: "office", label: "Offices", picks: ["phantas", "phantas-single", "mira"] },
  { key: "hospitality", label: "Hotels & hospitality", picks: ["phantas", "mira", "phantas-single"] },
  { key: "education", label: "Schools & colleges", picks: ["phantas", "mira", "phantas-single"] },
] as const;

export type SpaceKey = (typeof SPACES)[number]["key"];

export const INDUSTRIES = [
  "Retail",
  "Supermarkets",
  "Healthcare",
  "Hospitality",
  "Warehousing",
  "Manufacturing",
  "Transport",
  "Education",
  "Offices",
  "Car Parks",
  "Contract Cleaning",
  "Shopping Centres",
];

export const HEADLINE_STATS = [
  { value: 400, suffix: "%", label: "Efficiency improvement", note: "AI spot cleaning" },
  { value: 40000, suffix: "m²", label: "Covered overnight", note: "In a single session" },
  { value: 24, suffix: "/7", label: "Autonomous operation", note: "Self-docking and charging" },
  { value: 0, suffix: "mm", label: "Edge cleaning distance", note: "Right to the wall" },
];

// ---------- Navigation ----------

export const NAV = [
  { label: "Robots", href: to("/robots") },
  { label: "Aventurier", href: to("/aventurier") },
  { label: "Services", href: to("/services") },
  { label: "About", href: to("/about") },
  { label: "Contact", href: to("/contact") },
];

/** Concept path → the same page on the current site, for the comparison badge. */
export function currentSiteHref(pathname: string) {
  const rest = pathname.replace(/^\/concept/, "") || "/";
  const map: Record<string, string> = {
    "/": "/",
    "/robots": "/robotics",
    "/aventurier": "/aventurier",
    "/services": "/services",
    "/about": "/abouts",
    "/contact": "/contact",
  };
  if (map[rest]) return map[rest];
  const robot = rest.match(/^\/robots\/([^/]+)$/);
  if (robot) return `/${robot[1]}`;
  const machine = rest.match(/^\/aventurier\/([^/]+)$/);
  if (machine) return `/${machine[1]}`;
  return "/";
}

/** Current-site path (as used by the site assistant) → the concept equivalent. */
export function conceptHref(href: string) {
  if (/^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf")) return href;
  const [path, hash] = href.split("#");
  const map: Record<string, string> = {
    "/": to("/"),
    "/robotics": to("/robots"),
    "/services": to("/services"),
    "/abouts": to("/about"),
    "/contact": to("/contact"),
    "/aventurier": to("/aventurier"),
    "/artist-1": machineHref("artist-1"),
    "/ranger-one": machineHref("ranger-one"),
  };
  let out = map[path];
  if (!out && ROBOTS.some((r) => `/${r.slug}` === path)) out = robotHref(path.slice(1));
  if (!out) return href; // privacy policy, customer portal: keep the current pages
  if (hash === "find-your-robot") return `${to("/robots")}#finder`;
  return hash ? `${out}#${hash}` : out;
}
