export type Robot = {
  slug: string;
  name: string;
  /** Heading class used for the hero tagline; the original varies per page. */
  taglineClass: "t-h2" | "t-h3" | "t-h4";
  tagline: string;
  intro: string;
  /** Hero intro is set in the larger lead size on most pages. */
  introClass: "t-lead" | "t-body";
  brochure: string;
  hero: { src: string; alt: string; aspect: string; fit: "cover" | "contain" };
  /** Desktop hero geometry in design px: left inset, text column width, image left edge, image width, top inset. */
  heroBox: {
    left: number;
    textW: number;
    taglineW: number;
    introW: number;
    imgLeft: number;
    imgW: number;
    /** Image top relative to the h1 top (negative = starts higher). */
    imgTop: number;
    top: number;
    /** Bottom padding of the hero section. */
    bottom: number;
  };
  /** Spec row height in design px; the original differs per page. */
  specRowH: number;
  /** Phantas has an empty band after its first spec row on the live site. */
  specGapAfterFirst?: number;
  showQuoteButton: boolean;
  /** Which block follows the hero first. */
  order: "specs-first" | "features-first";
  featuresTitleAlign: "left" | "center";
  features: { title: string; text: string }[];
  featuresNote?: string;
  specsIntro?: string;
  specsImage?: { src: string; alt: string };
  /** "split": label left / value right in a side column. "rows": full-width h6 label + value. */
  specsStyle: "split" | "rows";
  specsValueAlign: "left" | "right";
  specs: [string, string][];
  configurations?: { name: string; text: string; image: string }[];
  chipsStyle: "h3" | "h4" | "h6-caps" | "h6-center";
  idealFor: string[];
  floorTypes: string[];
  video: { label: string; src: string; poster: string; title: string };
  cta: { title: string; text: string; primaryLabel: string };
};

const DEFAULT_CTA_TEXT = "Book a free site assessment and demo anywhere in Ireland.";
const NAV_FULL = "LiDAR, 3D depth camera, RGB camera, anti-drop and anti-collision";

export const ROBOTS: Robot[] = [
  {
    slug: "phantas",
    heroBox: { left: 128, textW: 640, taglineW: 526, introW: 512, imgLeft: 713, imgW: 512, imgTop: 41, top: 168, bottom: 47 },
    specRowH: 76,
    specGapAfterFirst: 111,
    name: "Phantas",
    taglineClass: "t-h2",
    tagline: "Commercial Robot Floor Cleaner for Small to Midsize Spaces",
    intro:
      "Phantas is an award-winning commercial floor cleaning robot delivering 4-in-1 cleaning in one compact machine. Vacuuming, sweeping, scrubbing and dust mopping — Phantas handles every floor type, navigates the tightest spaces and cleans right to the edge. Designed for environments that never stop.",
    introClass: "t-lead",
    brochure: "/brochures/phantas.pdf",
    hero: { src: "/images/phantas-hero.jpg", alt: "Phantas floor cleaning robot", aspect: "1 / 1", fit: "cover" },
    showQuoteButton: true,
    order: "specs-first",
    featuresTitleAlign: "left",
    features: [
      { title: "4-in-1 Cleaning System", text: "Vacuum, Sweep, Scrub and Dust Mop all in one machine" },
      { title: "Zero-Distance Edge Cleaning", text: "Cleans 0mm from walls and edges, no missed corners" },
      {
        title: "AI Navigation and Obstacle Avoidance",
        text: "Deep learning trained on millions of real-world images",
      },
      { title: "Smart Integrated Handle", text: "Auto and Manual mode switching, withstands 1000N force" },
      {
        title: "Auto Spot Cleaning",
        text: "Detects and cleans dirty areas autonomously, up to 400% more efficient",
      },
      {
        title: "Docking Station",
        text: "Autonomous charging, water refill, sewage drainage and component rinsing",
      },
    ],
    specsStyle: "split",
    specsValueAlign: "right",
    specs: [
      ["Dimensions", "540 x 440 x 617 mm"],
      ["Cleaning Modes", "Vacuum, Scrub, Sweep, Dust Mop"],
      ["Cleaning Width", "Scrubbing 330mm / Sweeping 410mm"],
      ["Cleaning Capacity", "350–700 m²/h"],
      ["Runtime", "Scrubbing 4.5h / Vacuuming 4h / Sweeping 14h / Dust Mopping 10h"],
      ["Charging Time", "Approx 2 hours"],
      ["Max Speed", "0.8 m/s"],
      ["Min Pass Width", "600mm"],
      ["Edge Cleaning", "0mm"],
      ["Gradeability", "8°"],
      ["Sound Level", "62–70 dB"],
      ["Navigation", NAV_FULL],
    ],
    chipsStyle: "h3",
    idealFor: ["Retail", "Hospitality", "Healthcare", "Offices", "Supermarkets", "Education", "Pharmacies"],
    floorTypes: [
      "Ceramic tiles",
      "Natural stone",
      "Low-pile carpet",
      "PVC and Vinyl",
      "Hardwood",
      "Epoxy",
      "Concrete",
    ],
    video: {
      label: "See Phantas in action",
      src: "/videos/phantas.mp4",
      poster: "/images/phantas-video-poster.jpg",
      title: "Phantas promo video",
    },
    cta: {
      title: "Interested in Phantas?",
      text: "Book a free site assessment and demo of the Phantas Single anywhere in Ireland.",
      primaryLabel: "Book Free Demo",
    },
  },
  {
    slug: "phantas-single",
    heroBox: { left: 40, textW: 624, taglineW: 624, introW: 600, imgLeft: 744, imgW: 496, imgTop: 0, top: 101, bottom: 100 },
    specRowH: 60,
    name: "Phantas Single",
    taglineClass: "t-h2",
    tagline: "Engineered for Continuous Autonomous Floor Scrubbing",
    intro:
      "When scrubbing is all you need, Phantas Single delivers it perfectly. Purpose-built for continuous floor scrubbing in retail and commercial environments, this compact robot runs throughout the day without disrupting customers or staff — keeping floors spotless with zero fuss.",
    introClass: "t-body",
    brochure: "/brochures/phantas-single.pdf",
    hero: { src: "/images/phantas-single-hero.jpg", alt: "Phantas Single", aspect: "558 / 700", fit: "contain" },
    showQuoteButton: true,
    order: "features-first",
    featuresTitleAlign: "left",
    features: [
      {
        title: "Pure Scrubbing Focus",
        text: "No unnecessary modes, just powerful consistent floor scrubbing all day",
      },
      { title: "All-Day Runtime", text: "Up to 4.5 hours continuous scrubbing on one charge" },
      {
        title: "Compact and Agile",
        text: "600mm minimum pass width navigates the tightest aisles effortlessly",
      },
      { title: "Zero-Distance Edge Cleaning", text: "Scrubs right to the wall every time, 0mm from edges" },
      {
        title: "Safe Alongside People",
        text: "Works quietly during trading hours without disrupting customers or staff",
      },
      { title: "Simple to Maintain", text: "Same easy-clean platform as the full Phantas range" },
    ],
    specsIntro:
      "The Phantas Single combines high-performance cleaning hardware with advanced Gausium autonomous navigation technology.",
    specsImage: { src: "/images/phantas-single-specs.png", alt: "" },
    specsStyle: "split",
    specsValueAlign: "right",
    specs: [
      ["Dimensions", "540 x 440 x 617 mm"],
      ["Cleaning Mode", "Scrubbing only"],
      ["Cleaning Width", "330mm"],
      ["Cleaning Capacity", "350–700 m²/h"],
      ["Runtime", "Up to 4.5 hours"],
      ["Charging Time", "Approx 2 hours"],
      ["Max Speed", "0.8 m/s"],
      ["Min Pass Width", "600mm"],
      ["Edge Cleaning", "0mm"],
      ["Gradeability", "8°"],
      ["Navigation", NAV_FULL],
    ],
    chipsStyle: "h3",
    idealFor: ["Retail", "Hospitality", "Healthcare", "Offices", "Supermarkets", "Education", "Pharmacies"],
    floorTypes: [
      "Ceramic tiles",
      "Natural stone",
      "Low-pile carpet",
      "PVC and Vinyl",
      "Hardwood",
      "Epoxy",
      "Concrete",
    ],
    video: {
      label: "See Phantas Single in action",
      src: "/videos/phantas.mp4",
      poster: "/images/phantas-video-poster.jpg",
      title: "Phantas promo video",
    },
    cta: { title: "Interested in Phantas Single?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
  {
    slug: "phan-shop",
    heroBox: { left: 80, textW: 544, taglineW: 544, introW: 544, imgLeft: 651, imgW: 576, imgTop: -70, top: 124, bottom: 56 },
    specRowH: 110,
    name: "PhanShop",
    taglineClass: "t-h4",
    tagline: "All-in-One Retail Robot for Cleaning and Merchandising",
    intro:
      "PhanShop turns your cleaning robot into a retail ambassador. Built on the proven Phantas platform, PhanShop cleans your floors while simultaneously showcasing products, running promotions and engaging customers. One machine. Two jobs. Maximum floor space efficiency.",
    introClass: "t-lead",
    brochure: "/brochures/phanshop.pdf",
    hero: { src: "/images/phanshop-hero.jpg", alt: "PhanShop retail robot", aspect: "648 / 789", fit: "cover" },
    showQuoteButton: true,
    order: "features-first",
    featuresTitleAlign: "center",
    features: [
      {
        title: "Cleans While It Sells",
        text: "Full Phantas cleaning capability plus sliding merchandise tray and optional display screen",
      },
      {
        title: "Promotional Display",
        text: "Customisable multimedia content, centrally managed for chain-wide campaigns",
      },
      {
        title: "Three Configurations",
        text: "Standard merchandise tray only, Pro with 15.6 inch touchscreen, Max with 18.5 inch display",
      },
      {
        title: "Retail Safe Design",
        text: "Elevated height for visibility, integrated voice alerts and strobe light for safety",
      },
      {
        title: "Quick Restocking",
        text: "Smooth sliding merchandise tray, easy access for staff and customers",
      },
      {
        title: "Content Management",
        text: "Batch update promotions across multiple locations simultaneously",
      },
    ],
    configurations: [
      {
        name: "Standard",
        text: "Sliding merchandise tray only. Perfect entry level retail robot.",
        image: "/images/phanshop-standard.png",
      },
      {
        name: "Pro",
        text: "Merchandise tray plus 15.6 inch promotional touchscreen. Ideal for promotions and campaigns.",
        image: "/images/phanshop-pro.png",
      },
      {
        name: "Max",
        text: "Merchandise tray plus 18.5 inch ultra large display. Maximum customer attention and engagement.",
        image: "/images/phanshop-max.png",
      },
    ],
    specsIntro:
      "PhanShop integrates seamless retail merchandising with the high-performance autonomous cleaning capabilities of the Phantas platform.",
    specsStyle: "rows",
    specsValueAlign: "left",
    specs: [
      ["Base Platform", "Phantas V1.3"],
      ["Dimensions", "540 x 440 x 1290 to 1420mm depending on configuration"],
      ["Cleaning Modes", "Scrubbing, Sweeping, Vacuuming, Dust Mopping"],
      ["Min Pass Width", "600mm"],
      ["Display Options", "None, 15.6 inch touchscreen, 18.5 inch display"],
      ["Navigation", "LiDAR, RGB and 3D depth cameras, anti-drop and anti-collision"],
    ],
    chipsStyle: "h3",
    idealFor: [],
    floorTypes: [],
    video: {
      label: "See Phantas Shop  in action",
      src: "/videos/phanshop.mp4",
      poster: "/images/phanshop-video-poster.jpg",
      title: "PhanShop promo video",
    },
    cta: { title: "Interested in Phantas Shop?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
  {
    slug: "mira",
    heroBox: { left: 40, textW: 530, taglineW: 530, introW: 462, imgLeft: 607, imgW: 677, imgTop: -48, top: 121, bottom: 168 },
    specRowH: 51,
    name: "Mira",
    taglineClass: "t-h2",
    tagline: "Commercial Robot Floor Cleaner for Mid-Sized Spaces",
    intro:
      "Mira does the work of two machines in a single pass. Its front roller brush sweeps up debris while the rear disc brushes scrub the floor simultaneously — cutting cleaning time in half and covering more ground with less effort. Drop it in any space, press start, and Mira handles the rest. No setup, no mapping, no fuss.",
    introClass: "t-lead",
    brochure: "/brochures/mira.pdf",
    hero: { src: "/images/mira-hero.jpg", alt: "Mira floor cleaning robot", aspect: "762 / 873", fit: "cover" },
    showQuoteButton: true,
    order: "features-first",
    featuresTitleAlign: "center",
    features: [
      {
        title: "Sweep and Scrub Simultaneously",
        text: "One pass does what used to take two machines and twice the time",
      },
      {
        title: "Drop and Go Deployment",
        text: "No professional mapping, no complex setup, power on and press start",
      },
      {
        title: "Real-Time Adaptation",
        text: "Automatically adjusts to layout changes, moved shelves and furniture",
      },
      {
        title: "660mm Pass Clearance",
        text: "Navigates narrow aisles, tight corridors and under-shelf areas with ease",
      },
      {
        title: "Self-Cleaning System",
        text: "Auto tank flushing and suction rinsing, minimal manual maintenance needed",
      },
      {
        title: "Award-Winning Design",
        text: "ISSA 2025 Innovative Leaders Award winner for Automation Equipment",
      },
    ],
    specsIntro:
      "Mira sets the standard for technical precision and operational efficiency in mid-sized commercial cleaning.",
    specsStyle: "split",
    specsValueAlign: "right",
    specs: [
      ["Dimensions", "680 x 550 x 900 mm"],
      ["Max Cleaning Efficiency", "2016 m²/h"],
      ["Cleaning Width", "Scrubbing 400mm / Sweeping 750mm"],
      ["Water Tanks", "22L clean / 20L waste"],
      ["Runtime", "Scrubbing 3 to 4 hours"],
      ["Battery", "60 Ah"],
      ["Charging Time", "Approx 2 hours"],
      ["Max Speed", "1.4 m/s"],
      ["Min Pass Width", "950mm"],
      ["Gradeability", "6°"],
      ["Navigation", NAV_FULL],
    ],
    chipsStyle: "h4",
    idealFor: [
      "Retail",
      "Hospitality",
      "Office Buildings",
      "Transport Hubs",
      "Education",
      "Hospitals",
      "Shopping Centres",
      "Warehouses",
    ],
    floorTypes: ["Natural stone", "Marble and granite", "Ceramic tiles", "PVC and Vinyl", "Epoxy", "Concrete"],
    video: {
      label: "See mira  in action",
      src: "/videos/omnie.mp4",
      poster: "/images/omnie-video-poster.jpg",
      title: "Omnie promo video",
    },
    cta: { title: "Interested in Mira?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
  {
    slug: "omnie",
    heroBox: { left: 75, textW: 480, taglineW: 480, introW: 480, imgLeft: 571, imgW: 621, imgTop: -22, top: 118, bottom: 70 },
    specRowH: 61,
    name: "Omnie",
    taglineClass: "t-h2",
    tagline: "AI-Powered Robot Floor Cleaner for High-Dynamic Environments",
    intro:
      "Omnie is Gausium's most advanced robot — built for the environments that never slow down. Airports, metro stations, large retail centres, warehouses — Omnie's 360° camera coverage, 3D LiDAR and multimodal SLAM navigation give it complete situational awareness in the most demanding conditions. It doesn't just clean — it adapts, detects and responds in real time.",
    introClass: "t-lead",
    brochure: "/brochures/omnie.pdf",
    hero: { src: "/images/omnie-hero.jpg", alt: "Omnie", aspect: "699 / 859", fit: "cover" },
    showQuoteButton: true,
    order: "features-first",
    featuresTitleAlign: "left",
    features: [
      {
        title: "OmniVision 360°",
        text: "Full 360 degree camera coverage for complete situational awareness and precise obstacle avoidance from all directions",
      },
      {
        title: "3D LiDAR Navigation",
        text: "360 degree coverage, robust in low-light, open spaces and high-dynamic environments",
      },
      {
        title: "OmniSpotCleaning",
        text: "AI detects and cleans both dry and wet waste autonomously without any intervention",
      },
      {
        title: "OmniClean System",
        text: "780mm cleaning width with dual roller brushes and dual side brushes for maximum coverage",
      },
      {
        title: "Remote Service Ready",
        text: "360 degree bird's eye view enables full remote monitoring and operation",
      },
      {
        title: "Continuous Trash Collection",
        text: "Built-in debris tray handles particles, litter and fine dust at 10L per hour",
      },
    ],
    featuresNote: "With roller brush edition.",
    specsIntro:
      "Industrial-grade performance engineered for high-dynamic cleaning demands and situational awareness.",
    specsStyle: "rows",
    specsValueAlign: "left",
    specs: [
      ["Dimensions", "810 x 700 x 1070 mm"],
      ["Max Cleaning Capacity", "Scrubbing 2621 m²/h / Dust Mopping 3604 m²/h"],
      ["Cleaning Width", "520mm"],
      ["Water Tanks", "33L clean / 24L waste"],
      ["Runtime", "Scrubbing up to 3 hours / Sweeping up to 8 hours"],
      ["Charging Time", "Approx 2 hours"],
      ["Max Speed", "1.4 m/s"],
      ["Min Pass Width", "800mm"],
      ["Gradeability", "4.6°"],
    ],
    chipsStyle: "h6-center",
    idealFor: [
      "Airports",
      "Metro Stations",
      "Large Retail",
      "Warehouses",
      "Manufacturing",
      "Car Parking",
      "Contract Cleaning",
      "Shopping Centres",
    ],
    floorTypes: ["Natural stone", "Marble and granite", "Ceramic tiles", "PVC and Vinyl", "Epoxy", "Concrete"],
    video: {
      label: "See omnie  in action",
      src: "/videos/omnie.mp4",
      poster: "/images/omnie-video-poster.jpg",
      title: "Omnie promo video",
    },
    cta: { title: "Interested in Omnie?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
  {
    slug: "marvel",
    heroBox: { left: 80, textW: 576, taglineW: 576, introW: 458, imgLeft: 604, imgW: 628, imgTop: -13, top: 195, bottom: 44 },
    specRowH: 51,
    name: "Marvel",
    taglineClass: "t-h3",
    tagline: "Commercial Robot Floor Cleaner for Large and Complex Spaces",
    intro:
      "Marvel is built for the spaces other robots can't handle. Warehouses, manufacturing plants, underground car parks, large retail floors — Marvel sweeps and scrubs simultaneously, covers more ground per session and keeps going for up to 10 hours on a single charge. When the space is big, Marvel is the answer.",
    introClass: "t-lead",
    brochure: "/brochures/marvel.pdf",
    hero: { src: "/images/marvel-hero.jpg", alt: "Marvel", aspect: "706 / 915", fit: "cover" },
    showQuoteButton: true,
    order: "features-first",
    featuresTitleAlign: "left",
    features: [
      {
        title: "Sweep and Scrub in One Pass",
        text: "Dual side brushes sweep while rear disc brushes scrub, double the efficiency in half the time",
      },
      {
        title: "Up to 10 Hour Runtime",
        text: "120 Ah LFP battery keeps Marvel working through the longest shifts without stopping",
      },
      {
        title: "Ultra Large Water Tanks",
        text: "80L clean and 70L waste water tanks mean fewer refills across massive floor areas",
      },
      {
        title: "55kg Cleaning Pressure",
        text: "Deep consistent scrubbing that removes stubborn embedded dirt and heavy grime",
      },
      {
        title: "Drop and Go Deployment",
        text: "No mapping, no configuration, just start and go from day one",
      },
      {
        title: "Self-Cleaning System",
        text: "Auto tank flushing and suction rinsing automatically after every session",
      },
    ],
    specsIntro:
      "Marvel represents the pinnacle of industrial autonomous floor care, engineered for consistent performance in the most demanding large-scale environments.",
    specsStyle: "split",
    specsValueAlign: "left",
    specs: [
      ["Dimensions", "1090 x 700 x 1150 mm"],
      ["Max Cleaning Efficiency", "2016 m²/h"],
      ["Cleaning Width", "600mm scrubbing"],
      ["Water Tanks", "72L clean / 65L waste"],
      ["Runtime", "Scrubbing 3 to 5 hours, up to 10 hours total"],
      ["Battery", "60 Ah standard, optional 90 Ah"],
      ["Max Speed", "1.4 m/s"],
      ["Min Pass Width", "1300mm"],
      ["Gradeability", "10°"],
      ["Navigation", "3D LiDAR, anti-collision, anti-drop"],
    ],
    chipsStyle: "h6-caps",
    idealFor: [
      "Warehouses",
      "Manufacturing",
      "Car Parking",
      "Shopping Centres",
      "Airports",
      "Hospitals",
      "Large Retail",
      "Distribution Centres",
    ],
    floorTypes: ["Natural stone", "Marble and granite", "Ceramic tiles", "PVC and Vinyl", "Epoxy", "Concrete"],
    video: {
      label: "See marvel  in action",
      src: "/videos/marvel.mp4",
      poster: "/images/marvel-video-poster.jpg",
      title: "Marvel promo video",
    },
    cta: { title: "Interested in Marvel?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
  {
    slug: "beetle",
    heroBox: { left: 40, textW: 560, taglineW: 560, introW: 560, imgLeft: 640, imgW: 524, imgTop: -64, top: 144, bottom: 51 },
    specRowH: 51,
    name: "Beetle",
    taglineClass: "t-h3",
    tagline: "Heavy-Duty Autonomous Industrial Sweeper",
    intro:
      "Beetle is built for the tough stuff. Industrial factories, warehouses, distribution centres, stockrooms — environments where dust, debris and large waste particles are a daily challenge. With 3D LiDAR navigation, a 45L trash bin, HEPA filtration and AutoPass door integration, Beetle keeps your operational areas spotless while your team gets on with real work.",
    introClass: "t-lead",
    brochure: "/brochures/beetle.pdf",
    hero: { src: "/images/beetle-hero.jpg", alt: "Beetle", aspect: "590 / 758", fit: "cover" },
    showQuoteButton: false,
    order: "features-first",
    featuresTitleAlign: "center",
    features: [
      {
        title: "Heavy-Duty Suction",
        text: "Handles everything from fine dust to wood chips, bottles, paper scraps and large debris",
      },
      {
        title: "HEPA Filtration",
        text: "Auto-cleaning HEPA filter after every task, captures fine airborne particles effectively",
      },
      {
        title: "AutoPass Door Integration",
        text: "Seamlessly passes through warehouse sliding doors completely autonomously",
      },
      {
        title: "3D LiDAR Navigation",
        text: "Precise and reliable mapping in low-light, open and complex industrial environments",
      },
      {
        title: "AI Spot Cleaning Mode",
        text: "400% efficiency improvement, covers over 40000 m² in a single overnight session",
      },
      {
        title: "Zero-Distance Edge Cleaning",
        text: "Cleans right to shelving and walls with 750mm aisle clearance",
      },
    ],
    specsIntro:
      "Precision engineering meets industrial endurance. Beetle is designed to provide maximum uptime and superior cleaning results in the most demanding environments.",
    specsStyle: "split",
    specsValueAlign: "right",
    specs: [
      ["Dimensions", "960 x 650 x 680 mm"],
      ["Max Cleaning Efficiency", "3240 m²/h"],
      ["Cleaning Width", "750mm with side brushes"],
      ["Trash Capacity", "45L"],
      ["Max Airflow", "1320 m³/h"],
      ["Runtime", "Up to 5 hours"],
      ["Charging Time", "Under 2.5 hours"],
      ["Max Speed", "1.2 m/s"],
      ["Edge Cleaning", "0mm"],
      ["Battery", "60 Ah LFP"],
      ["Navigation", "3D LiDAR, RGB camera, RGB-D camera"],
    ],
    chipsStyle: "h6-caps",
    idealFor: ["Warehouses", "Manufacturing", "Car Parking", "Large Retail", "Distribution Centres"],
    floorTypes: ["Natural stone", "Marble and granite", "Ceramic tiles", "PVC and Vinyl", "Epoxy", "Concrete"],
    video: {
      label: "See beetle  in action",
      src: "/videos/beetle.mp4",
      poster: "/images/beetle-video-poster.jpg",
      title: "Beetle promo video",
    },
    cta: { title: "Ready to See It in Action?", text: DEFAULT_CTA_TEXT, primaryLabel: "Book a Demo" },
  },
];

export function getRobot(slug: string) {
  return ROBOTS.find((robot) => robot.slug === slug);
}
