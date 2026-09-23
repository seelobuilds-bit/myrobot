// Rule-based site assistant. It doesn't generate answers: it recognises what a
// visitor is asking about (a product, a type of building, a cleaning task or a
// general topic such as pricing) and points them at the page that covers it.
// Everything runs in the browser, so there is no API key or per-message cost.

import { MACHINES } from "./aventurier";
import { ROBOTS } from "./robots";
import { CONTACT } from "./site";

export type AssistantLink = { href: string; title: string; text: string; external?: boolean };
export type AssistantReply = { text: string; links: AssistantLink[]; suggestions?: string[] };

// ---------- Destinations ----------

const PAGES = {
  services: {
    href: "/services",
    title: "Services",
    text: "Assessment, deployment, training, maintenance and remote support",
  },
  robotics: { href: "/robotics", title: "Robotics range", text: "Every NOLAR cleaning robot in one place" },
  guide: {
    href: "/robotics#find-your-robot",
    title: "Find your robot",
    text: "Side-by-side guide to the whole robot range",
  },
  aventurier: {
    href: "/aventurier",
    title: "Aventurier machines",
    text: "Artist 1 scrubber dryer and Ranger One backpack vacuum",
  },
  about: { href: "/abouts", title: "About NOLAR", text: "Who we are, Arlaco and our Gausium partnership" },
  contact: {
    href: "/contact",
    title: "Book a free demo",
    text: "Free site assessment and demo anywhere in Ireland",
  },
  privacy: { href: "/blank-1", title: "Privacy policy", text: "How we handle your personal data" },
  account: { href: "/account-settings", title: "MyRobot portal", text: "Customer sign-in" },
  home: { href: "/", title: "Home", text: "Back to the start" },
} satisfies Record<string, AssistantLink>;

type Product = { key: string; name: string; aliases: string[]; link: AssistantLink; brochure: string };

const ROBOT_ALIASES: Record<string, string[]> = {
  phantas: ["phantas", "phantas 3in1", "phantas 3 in 1"],
  "phantas-single": ["phantas single"],
  "phan-shop": ["phanshop", "phan shop", "phantas shop"],
  mira: ["mira"],
  omnie: ["omnie", "omni"],
  marvel: ["marvel"],
  beetle: ["beetle"],
};

const PRODUCTS: Product[] = [
  ...ROBOTS.map((robot) => ({
    key: robot.slug,
    name: robot.name,
    aliases: ROBOT_ALIASES[robot.slug] ?? [robot.name.toLowerCase()],
    link: { href: `/${robot.slug}`, title: robot.name, text: robot.tagline },
    brochure: robot.brochure,
  })),
  ...MACHINES.map((machine) => ({
    key: machine.slug,
    name: machine.name,
    aliases: machine.slug === "artist-1" ? ["artist 1", "artist one", "artist"] : ["ranger one", "ranger 1", "ranger"],
    link: { href: `/${machine.slug}`, title: machine.name, text: `Aventurier ${machine.category.toLowerCase()}` },
    brochure: machine.brochure,
  })),
];

const product = (key: string) => PRODUCTS.find((p) => p.key === key)!;

// ---------- Places and tasks → recommended products ----------

type Topic = { label: string; terms: string[]; picks: string[] };

const PLACES: Topic[] = [
  {
    label: "retail and supermarkets",
    terms: ["retail", "supermarket", "shop", "store", "grocery", "pharmacy", "chemist", "convenience", "forecourt"],
    picks: ["phantas", "phan-shop", "phantas-single", "artist-1"],
  },
  {
    label: "warehouses and distribution",
    terms: ["warehouse", "warehousing", "distribution", "logistics", "depot", "stockroom", "storage", "fulfilment"],
    picks: ["marvel", "beetle", "omnie"],
  },
  {
    label: "factories and industrial sites",
    terms: ["factory", "manufacturing", "industrial", "plant", "production", "workshop", "mill"],
    picks: ["beetle", "marvel", "omnie"],
  },
  {
    label: "car parks",
    terms: ["car park", "carpark", "parking", "multi storey", "underground"],
    picks: ["marvel", "beetle", "omnie"],
  },
  {
    label: "airports and transport hubs",
    terms: ["airport", "terminal", "station", "metro", "transport hub", "port"],
    picks: ["omnie", "mira", "marvel"],
  },
  {
    label: "shopping centres",
    terms: ["shopping centre", "shopping center", "mall", "retail park"],
    picks: ["mira", "omnie", "marvel"],
  },
  {
    label: "healthcare",
    terms: ["hospital", "healthcare", "clinic", "nursing home", "care home", "medical", "gp", "surgery"],
    picks: ["phantas", "mira", "artist-1"],
  },
  {
    label: "offices",
    terms: ["office", "corporate", "workplace", "business park", "reception", "lobby"],
    picks: ["phantas", "phantas-single", "artist-1"],
  },
  {
    label: "hotels and hospitality",
    terms: ["hotel", "hospitality", "restaurant", "cafe", "bar", "pub", "canteen", "leisure", "gym"],
    picks: ["phantas", "mira", "artist-1"],
  },
  {
    label: "schools and colleges",
    terms: ["school", "college", "university", "campus", "education", "creche"],
    picks: ["phantas", "mira", "artist-1"],
  },
  {
    label: "stairs and corridors",
    terms: ["stairs", "stair", "staircase", "stairwell", "steps", "corridor", "hallway", "landing"],
    picks: ["ranger-one"],
  },
  {
    label: "fixed seating",
    terms: ["cinema", "theatre", "theater", "auditorium", "stadium", "arena", "seating", "seats", "church", "lecture hall"],
    picks: ["ranger-one"],
  },
  {
    label: "vehicle interiors",
    terms: ["plane", "aircraft", "airline", "bus", "coach", "carriage", "railway", "vehicle", "cabin", "ferry", "van"],
    picks: ["ranger-one"],
  },
  {
    label: "large open floors",
    terms: ["large", "big", "huge", "massive", "open plan", "large area", "big area"],
    picks: ["marvel", "omnie", "mira"],
  },
  {
    label: "small and tight spaces",
    terms: ["small", "tight", "narrow", "compact", "aisles", "aisle"],
    picks: ["phantas", "artist-1", "phantas-single"],
  },
];

const TASKS: Topic[] = [
  {
    label: "scrubbing",
    terms: ["scrub", "scrubbing", "scrubber", "wet clean", "wash", "washing", "mop", "mopping"],
    picks: ["phantas-single", "mira", "marvel", "artist-1"],
  },
  {
    label: "sweeping",
    terms: ["sweep", "sweeping", "sweeper", "debris", "litter", "dust", "dusty", "wood chips"],
    picks: ["beetle", "marvel", "mira"],
  },
  { label: "vacuuming", terms: ["vacuum", "vacuuming", "hoover", "hoovering", "carpet"], picks: ["phantas", "ranger-one"] },
  {
    label: "a backpack vacuum",
    terms: ["backpack", "back pack", "cordless vacuum", "cordless hoover", "portable vacuum"],
    picks: ["ranger-one"],
  },
  {
    label: "a scrubber dryer",
    terms: ["scrubber dryer", "scrubber drier", "walk behind", "manual scrubber", "push scrubber", "mop and bucket"],
    picks: ["artist-1"],
  },
  {
    label: "in-store promotion",
    terms: ["advertising", "advertise", "advert", "screen", "display", "promotion", "promotions", "merchandise", "merchandising"],
    picks: ["phan-shop"],
  },
  { label: "HEPA filtration", terms: ["hepa", "allergy", "fine dust", "air quality"], picks: ["ranger-one", "beetle"] },
  {
    label: "sterilisation",
    terms: ["sterilise", "sterilize", "sterilisation", "sterilization", "disinfect", "sanitise", "sanitize", "hygiene"],
    picks: ["artist-1"],
  },
];

// ---------- Intents ----------

type Intent =
  | "greeting"
  | "thanks"
  | "account"
  | "privacy"
  | "brochure"
  | "quote"
  | "demo"
  | "contact"
  | "services"
  | "compare"
  | "robots"
  | "aventurier"
  | "about"
  | "video"
  | "home";

const INTENTS: Record<Intent, string[]> = {
  greeting: ["hi", "hello", "hey", "hiya", "howya", "good morning", "good afternoon", "good evening"],
  thanks: ["thanks", "thank you", "cheers", "thx", "great", "perfect", "brilliant"],
  account: ["login", "log in", "sign in", "signin", "sign up", "account", "member", "portal", "myrobot"],
  privacy: ["privacy", "gdpr", "data protection", "cookie", "personal data"],
  brochure: ["brochure", "leaflet", "pdf", "datasheet", "data sheet", "spec sheet", "download", "catalogue", "catalog"],
  quote: ["price", "pricing", "cost", "how much", "quote", "quotation", "buy", "purchase", "lease", "leasing", "rent", "rental", "hire", "finance", "budget", "afford"],
  demo: ["demo", "demonstration", "trial", "see it", "see one", "visit", "site assessment", "assessment", "survey", "book"],
  contact: ["contact", "phone", "call", "ring", "number", "email", "e mail", "whatsapp", "talk", "speak", "address", "where are you", "where is", "your office", "find you", "based", "located", "location", "directions", "get in touch", "reach you"],
  services: ["service", "maintenance", "maintain", "repair", "servicing", "support", "training", "install", "installation", "deployment", "deploy", "setup", "set up", "warranty", "after sales", "software", "update", "app", "cloud", "remote", "monitor", "monitoring", "schedule", "scheduling", "report"],
  compare: ["compare", "comparison", "difference", "which robot", "which one", "which machine", "best robot", "recommend", "right robot", "right machine", "choose", "not sure", "suit", "suits", "suitable", "my building"],
  robots: ["robot", "robotic", "robotics", "autonomous", "fleet", "range", "product", "gausium"],
  aventurier: ["aventurier", "adventurer", "manual", "operator", "cordless", "battery powered"],
  about: ["about", "who are you", "company", "nolar", "history", "story", "team", "arlaco", "partner", "mission", "irish"],
  video: ["video", "in action", "watch", "footage"],
  home: ["home", "homepage", "home page", "start"],
};

// ---------- Text matching ----------

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const singular = (word: string) =>
  word.length > 4 && word.endsWith("ies")
    ? `${word.slice(0, -3)}y`
    : word.length > 3 && word.endsWith("s") && !word.endsWith("ss")
      ? word.slice(0, -1)
      : word;

type Query = { raw: string; stem: string; tokens: string[] };

function parse(text: string): Query {
  const tokens = normalize(text).split(" ").filter(Boolean);
  return { raw: ` ${tokens.join(" ")} `, stem: ` ${tokens.map(singular).join(" ")} `, tokens };
}

/** Position of a term in the query (whole words only), or -1. */
function find(query: Query, term: string) {
  const t = normalize(term);
  const hit = query.raw.indexOf(` ${t} `);
  if (hit !== -1) return hit;
  return query.stem.indexOf(` ${t.split(" ").map(singular).join(" ")} `);
}

const has = (query: Query, terms: string[]) => terms.some((term) => find(query, term) !== -1);

/** Edit distance where swapping two neighbouring letters ("marvle") counts as one edit. */
function editDistance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

// Everyday words that sit one typo away from a product name.
const NOT_A_TYPO = new Set(["range", "ranges", "ranged", "danger", "anger", "manger", "hanger", "phantom"]);

/** Products mentioned by name, tolerating small typos ("phantus", "marvle"), in the order they appear. */
function findProducts(query: Query) {
  const hits: { product: Product; at: number }[] = [];
  for (const p of PRODUCTS) {
    let at = -1;
    for (const alias of p.aliases) {
      const i = find(query, alias);
      if (i !== -1 && (at === -1 || i < at)) at = i;
    }
    if (at === -1) {
      const single = p.aliases.filter((alias) => !alias.includes(" ") && alias.length >= 5);
      const idx = query.tokens.findIndex(
        (token) =>
          token.length >= 5 &&
          !NOT_A_TYPO.has(token) &&
          single.some((alias) => editDistance(token, alias) <= (alias.length >= 7 ? 2 : 1)),
      );
      if (idx !== -1) at = query.raw.indexOf(` ${query.tokens[idx]} `);
    }
    if (at !== -1) hits.push({ product: p, at });
  }
  // "Phantas Single" and "PhanShop" also contain "phantas": keep only the most specific match.
  const keys = new Set(hits.map((h) => h.product.key));
  return hits
    .filter((h) => !(h.product.key === "phantas" && (keys.has("phantas-single") || keys.has("phan-shop"))))
    .sort((a, b) => a.at - b.at)
    .map((h) => h.product);
}

function pickTopics(query: Query, topics: Topic[]) {
  return topics.filter((topic) => has(query, topic.terms));
}

// ---------- Replies ----------

const listNames = (names: string[]) =>
  names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

const brochureLink = (p: Product): AssistantLink => ({
  href: p.brochure,
  title: `${p.name} brochure`,
  text: "PDF, opens in a new tab",
  external: true,
});

const dedupe = (links: AssistantLink[]) => links.filter((l, i) => links.findIndex((m) => m.href === l.href) === i);

export const STARTER_SUGGESTIONS = [
  "Which robot suits my building?",
  "Book a free demo",
  "Aventurier machines",
  "Prices and quotes",
  "Contact details",
];

const PLACE_SUGGESTIONS = ["Warehouse", "Supermarket", "Office", "Car park", "Hospital", "Stairs and seating"];

export const GREETING: AssistantReply = {
  text: "Hi! Tell me what you're looking for, such as a robot name, your type of building or what you need cleaned, and I'll take you to the right page.",
  links: [],
  suggestions: STARTER_SUGGESTIONS,
};

const INTENT_REPLIES: Partial<Record<Intent, () => AssistantReply>> = {
  account: () => ({ text: "Existing customers can sign in to the MyRobot portal here.", links: [PAGES.account] }),
  privacy: () => ({ text: "Our privacy policy explains how we handle your data.", links: [PAGES.privacy] }),
  brochure: () => ({
    text: "Every product page has a Download Brochure button. Which machine are you interested in?",
    links: [PAGES.robotics, PAGES.aventurier],
    suggestions: PRODUCTS.map((p) => `${p.name} brochure`),
  }),
  quote: () => ({
    text: `Pricing depends on your site, floor area and the machine that suits it, so we quote individually. Send us a few details and we'll come back to you, or call ${CONTACT.phone}.`,
    links: [{ ...PAGES.contact, title: "Request a quote" }, PAGES.guide],
  }),
  demo: () => ({
    text: "We offer a free site assessment and demo anywhere in Ireland. Pop your details into the form and we'll arrange a time.",
    links: [PAGES.contact],
  }),
  contact: () => ({
    text: `You can reach NOLAR on ${CONTACT.phone} or ${CONTACT.email}. We're based at ${CONTACT.address} and cover all of Ireland.`,
    links: [
      { href: "/contact", title: "Contact page", text: "Form, map and details" },
      { href: CONTACT.phoneHref, title: `Call ${CONTACT.phone}`, text: "Speak to the team", external: true },
    ],
  }),
  services: () => ({
    text: "NOLAR handles everything end to end: site assessment, deployment, staff training, maintenance and remote monitoring.",
    links: [PAGES.services, PAGES.contact],
  }),
  compare: () => ({
    text: "What kind of space do you need cleaned? Pick one below or type it in, or use the comparison guide.",
    links: [PAGES.guide],
    suggestions: PLACE_SUGGESTIONS,
  }),
  robots: () => ({
    text: "Here's our full robot range, plus a quick guide to help you choose.",
    links: [PAGES.robotics, PAGES.guide],
  }),
  aventurier: () => ({
    text: "Aventurier machines are operator-led and cordless: the Artist 1 scrubber dryer and the Ranger One backpack vacuum.",
    links: [PAGES.aventurier, product("artist-1").link, product("ranger-one").link],
  }),
  about: () => ({
    text: "NOLAR Tech is an Irish autonomous cleaning specialist based in Limerick and a partner of Gausium.",
    links: [PAGES.about],
  }),
  video: () => ({
    text: "Each robot page has a video of the machine in action. Which one would you like to see?",
    links: [PAGES.robotics],
    suggestions: ROBOTS.map((r) => r.name),
  }),
  home: () => ({ text: "Here's the home page.", links: [PAGES.home] }),
};

// Most specific first: a question that mentions both "price" and "robot" is about price.
const INTENT_PRIORITY: Intent[] = [
  "account",
  "privacy",
  "brochure",
  "quote",
  "demo",
  "contact",
  "services",
  "compare",
  "aventurier",
  "about",
  "video",
  "robots",
  "home",
];

export function getReply(input: string): AssistantReply {
  const query = parse(input);
  if (query.tokens.length === 0) return GREETING;

  const intents = new Set((Object.keys(INTENTS) as Intent[]).filter((intent) => has(query, INTENTS[intent])));
  const products = findProducts(query);
  const places = pickTopics(query, PLACES);
  const tasks = pickTopics(query, TASKS);

  // 1. A product by name.
  if (products.length > 0) {
    const names = listNames(products.map((p) => p.name));
    const pages = products.map((p) => p.link);
    if (intents.has("brochure")) {
      return { text: `Here's the ${names} brochure.`, links: dedupe([...products.map(brochureLink), ...pages]) };
    }
    if (intents.has("quote")) {
      return {
        text: `Pricing for ${names} depends on your site and requirements, so we quote individually. Request a quote and we'll get back to you.`,
        links: dedupe([...pages, { ...PAGES.contact, title: "Request a quote" }]),
      };
    }
    if (intents.has("demo")) {
      return {
        text: `We can demo ${names} at your site, anywhere in Ireland.`,
        links: dedupe([PAGES.contact, ...pages]),
      };
    }
    if (products.length > 1 || intents.has("compare")) {
      const anyRobot = products.some((p) => ROBOTS.some((r) => r.slug === p.key));
      return {
        text: `Here are the pages for ${names}.${anyRobot ? " The robot guide compares the whole range side by side." : ""}`,
        links: dedupe([...pages, ...(anyRobot ? [PAGES.guide] : [])]).slice(0, 4),
      };
    }
    const [p] = products;
    const hasVideo = intents.has("video") && ROBOTS.some((r) => r.slug === p.key);
    return {
      text: hasVideo
        ? `Here's ${p.name}. The video is towards the bottom of the page.`
        : `${p.name}: ${p.link.text}. Here's the page.`,
      links: [p.link, brochureLink(p)],
    };
  }

  // 2. Contact details, privacy and sign-in trump everything else ("where is your office?").
  const direct = (["contact", "privacy", "account"] as const).find((i) => intents.has(i));
  if (direct) return INTENT_REPLIES[direct]!();

  // 3. A type of building or a cleaning job. Narrow topics ("backpack", one pick)
  // outweigh broad ones ("vacuuming", several picks).
  const topics = [...places, ...tasks].sort((a, b) => a.picks.length - b.picks.length);
  if (topics.length > 0) {
    const score = new Map<string, number>();
    topics.forEach((topic) =>
      topic.picks.forEach((key, rank) => score.set(key, (score.get(key) ?? 0) + 10 / topic.picks.length - rank)),
    );
    const picks = [...score.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => product(key).link);
    const extra = intents.has("quote")
      ? [{ ...PAGES.contact, title: "Request a quote" }]
      : intents.has("demo")
        ? [PAGES.contact]
        : [];
    return {
      text:
        picks.length === 1
          ? `For ${topics[0].label}, this is the one to look at:`
          : `For ${topics[0].label}, these are a good place to start:`,
      links: [...picks, ...extra],
    };
  }

  // 4. A general topic.
  const intent = INTENT_PRIORITY.find((i) => intents.has(i));
  if (intent) return INTENT_REPLIES[intent]!();

  if (intents.has("thanks")) {
    return { text: "You're welcome! Anything else I can help you find?", links: [], suggestions: STARTER_SUGGESTIONS };
  }
  if (intents.has("greeting")) return GREETING;

  // 5. No idea.
  return {
    text: `I'm not sure about that one. Try a robot name, your type of building or what you need cleaned. You can also reach the team directly on ${CONTACT.phone}.`,
    links: [PAGES.guide, PAGES.contact],
    suggestions: STARTER_SUGGESTIONS,
  };
}
