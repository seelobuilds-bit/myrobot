// Aventurier operator-led machines. All copy and figures come from the
// Artist 1 and Ranger One leaflets (public/brochures/artist-1.pdf, ranger-one.pdf).

export type Stat = { value: string; label: string };
export type Feature = { title: string; text: string };

export type Machine = {
  slug: "artist-1" | "ranger-one";
  name: string;
  category: string;
  tagline: string;
  summary: string;
  heroStats: [Stat, Stat];
  stats: Stat[];
  brochure: string;
  image: { src: string; width: number; height: number; alt: string };
  specs: [string, string][];
};

export const ARTIST_1: Machine = {
  slug: "artist-1",
  name: "Artist 1",
  category: "Intelligent Floor Care",
  tagline: "Commercial Scrubbing Without the Mop and Bucket",
  summary:
    "A compact scrubber dryer built for faster, easier cleaning in busy spaces. Twin brushes scrub while powerful suction recovers dirty water — leaving the floor clean and dry in one pass.",
  heroStats: [
    { value: "8x", label: "Faster than mopping" },
    { value: "1,200", label: "m²/h max. efficiency" },
  ],
  stats: [
    { value: "1,200", label: "m²/h max. efficiency" },
    { value: "40 cm", label: "Working width" },
    { value: "15 kg", label: "Brush pressure" },
    { value: "20,000 Pa", label: "Max. suction" },
    { value: "4 L + 4 L", label: "Solution + usable recovery" },
  ],
  brochure: "/brochures/artist-1.pdf",
  image: { src: "/images/aventurier/artist-1-front.webp", width: 1022, height: 2400, alt: "Aventurier Artist 1 scrubber dryer" },
  specs: [
    ["Machine Type", "Compact scrubber dryer"],
    ["Max. Efficiency", "1,200 m²/h"],
    ["Working Width", "40 cm"],
    ["Brush Pressure", "15 kg"],
    ["Max. Suction", "20,000 Pa"],
    ["Tanks", "4 L solution + 4 L usable recovery"],
    ["Runtime (2 batteries)", "Up to 150 min Eco / 120 min Turbo"],
    ["Batteries", "Hot-swappable V25, shared with Ranger One"],
    ["Handling", "360° control, compact access"],
    ["Maintenance", "Tool-free"],
    ["Versions", "YOUTH, SE, PRO"],
  ],
};

export const RANGER_ONE: Machine = {
  slug: "ranger-one",
  name: "Ranger One",
  category: "Cordless Backpack Vacuum",
  tagline: "Freedom Without Sacrifice",
  summary:
    "A commercial-grade cordless backpack dry vacuum built for stairs, seating, transport and other spaces where cables slow the job down.",
  heroStats: [
    { value: "75 min", label: "Max. runtime" },
    { value: "22 kPa", label: "Max. vacuum" },
  ],
  stats: [
    { value: "400 W", label: "Brushless motor" },
    { value: "22 kPa", label: "Max. vacuum" },
    { value: "38.5 L/s", label: "Max. airflow" },
    { value: "<67 dB", label: "Noise level" },
    { value: "6 L", label: "Dust capacity" },
  ],
  brochure: "/brochures/ranger-one.pdf",
  image: { src: "/images/aventurier/ranger-one-hero.webp", width: 748, height: 1350, alt: "Aventurier Ranger One cordless backpack vacuum" },
  specs: [
    ["Machine Type", "Cordless backpack dry vacuum"],
    ["Motor", "400 W brushless"],
    ["Max. Vacuum", "22 kPa"],
    ["Max. Airflow", "38.5 L/s"],
    ["Noise Level", "<67 dB"],
    ["Dust Capacity", "6 L"],
    ["Battery", "25.2 V, 13 Ah hot-swap V25, shared with Artist 1"],
    ["Runtime", "Up to 75 minutes per battery"],
    ["Filtration", "Four-stage HEPA H13, 99.97% of particles down to 0.3 microns"],
    ["Hose", "Ambidextrous, connects from either side"],
    ["Harness", "Professional ergonomic backpack harness"],
  ],
};

export const MACHINES = [ARTIST_1, RANGER_ONE];

export const ARTIST_VERSIONS = [
  {
    name: "YOUTH",
    tone: "teal" as const,
    summary: "Keeps operation simple.",
    points: ["Turbo and Brush-only modes", "Wi-Fi connectivity", "120 min Turbo on 2 batteries"],
  },
  {
    name: "SE",
    tone: "slate" as const,
    summary: "Adds on-machine guidance and Eco mode.",
    points: ["Eco, Turbo and Brush-only modes", "Full-colour LCD and voice speaker", "Up to 150 min Eco on 2 batteries"],
  },
  {
    name: "PRO",
    tone: "red" as const,
    summary: "Adds automatic dirt response, Sterilization mode and 4G/SIM connectivity.",
    points: ["Eco, Turbo, Auto, Sterilization and Brush-only", "Dirt detection", "Wi-Fi + 4G/SIM, optional water electrolysis*"],
  },
];

/** "Choose the right Artist 1" comparison, one row per feature: [feature, YOUTH, SE, PRO]. */
export const ARTIST_COMPARISON: [string, string, string, string][] = [
  ["Cleaning Modes", "Turbo\nBrush-only", "Eco\nTurbo\nBrush-only", "Eco / Turbo / Auto\nSterilization\nBrush-only"],
  ["Full-Colour LCD", "No", "Yes", "Yes"],
  ["Voice Speaker", "No", "Yes", "Yes"],
  ["Connectivity", "Wi-Fi\nNo 4G", "Wi-Fi\nNo 4G", "Wi-Fi + 4G/SIM"],
  ["Dirt Detection", "No", "No", "Yes"],
  ["Runtime / 2 Batteries", "120 min Turbo", "150 min Eco\n120 min Turbo", "150 min Eco\n120 min Turbo"],
  ["Water Electrolysis", "No", "No", "Optional*"],
];

export const ELECTROLYSIS_NOTE = "*Water electrolysis availability depends on national regulations.";
