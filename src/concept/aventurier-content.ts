// Page copy for the concept's Aventurier machine pages. The wording and figures
// are the same as the current Artist 1 / Ranger One pages, which were written
// from the leaflets in public/brochures.

export type Point = { title: string; text: string };

export const MACHINE_CONTENT: Record<
  "artist-1" | "ranger-one",
  {
    heroNote: string;
    pitch: { eyebrow: string; title: string[]; text: string };
    points: Point[];
    more?: { eyebrow: string; title: string[]; items: Point[] };
    gallery?: { src: string; w: number; h: number; caption: string }[];
    places?: { src: string; title: string; text: string }[];
    specIntro: string;
  }
> = {
  "artist-1": {
    heroNote: "YOUTH · SE · PRO",
    pitch: {
      eyebrow: "Built for real commercial cleaning",
      title: ["Clean and dry", "in one pass."],
      text: "Twin brushes scrub while powerful suction recovers the dirty water behind them, so floors are ready to use straight away. No mop, no bucket.",
    },
    points: [
      { title: "One-pass results", text: "Scrub, recover water and leave floors ready to use." },
      { title: "Easy to handle", text: "360° control, compact access and operator support." },
      { title: "Less downtime", text: "Hot-swappable batteries and tool-free maintenance." },
    ],
    more: {
      eyebrow: "Control at your fingertips",
      title: ["Guided, connected,", "easy to steer."],
      items: [
        { title: "On-machine guidance", text: "Full-colour LCD and voice speaker on SE and PRO." },
        { title: "Connected", text: "Wi-Fi on every version, plus 4G/SIM on PRO." },
        { title: "Longer shifts", text: "Two hot-swappable batteries for up to 150 minutes in Eco." },
      ],
    },
    gallery: [
      { src: "/images/aventurier/artist-1-angle.webp", w: 767, h: 1837, caption: "Twin brush deck" },
      { src: "/images/aventurier/artist-1-tilted.webp", w: 1512, h: 2088, caption: "Working position" },
      { src: "/images/aventurier/artist-1-upright.webp", w: 982, h: 2400, caption: "Handle and display" },
      { src: "/images/aventurier/artist-1-rear.webp", w: 798, h: 1950, caption: "Rear view" },
    ],
    specIntro:
      "A compact scrubber dryer with twin brushes, 15 kg brush pressure and 20,000 Pa suction, on the shared V25 battery platform.",
  },
  "ranger-one": {
    heroNote: "Cordless · HEPA H13",
    pitch: {
      eyebrow: "Ready to cut the cord?",
      title: ["Built for the places", "cords slow you down."],
      text: "Move freely through stairs, fixed seating, narrow passages and vehicle interiors with a professional backpack vacuum engineered around the operator.",
    },
    points: [
      { title: "Power that travels", text: "Up to 75 minutes from one 25.2 V, 13 Ah battery." },
      { title: "Cleaner exhaust air", text: "Four-stage HEPA H13 filtration captures fine particles." },
      { title: "Shared battery", text: "V25 battery compatibility shared with Artist 1." },
    ],
    more: {
      eyebrow: "Engineered around the operator",
      title: ["Comfortable for", "the whole route."],
      items: [
        { title: "V25 power sharing", text: "Hot-swap 25.2 V, 13 Ah batteries on the same platform as Artist 1." },
        {
          title: "HEPA H13 filtration",
          text: "Four-stage filtration captures 99.97% of particles down to 0.3 microns.",
        },
        {
          title: "Ergonomic harness",
          text: "A professional backpack harness supports mobile work across longer routes.",
        },
        {
          title: "Ambidextrous hose",
          text: "Connect from either side for easier access in stairs, rows and tight corners.",
        },
      ],
    },
    places: [
      {
        src: "/images/aventurier/ranger-one-seating.jpg",
        title: "Fixed seating",
        text: "Work along rows of seating without a cable snagging on every armrest.",
      },
      {
        src: "/images/aventurier/ranger-one-stairs.jpg",
        title: "Stairs & corridors",
        text: "Climb, turn and keep going. There is no socket to find on the next landing.",
      },
      {
        src: "/images/aventurier/ranger-one-transport.jpg",
        title: "Transport interiors",
        text: "Reach under seats and along narrow aisles in vehicle cabins.",
      },
    ],
    specIntro:
      "A commercial-grade cordless dry vacuum with a 400 W brushless motor, four-stage HEPA H13 filtration and a battery shared with Artist 1.",
  },
};
