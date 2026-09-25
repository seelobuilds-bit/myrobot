import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import ConceptBadge from "@/concept/ConceptBadge";
import Footer from "@/concept/Footer";
import Nav from "@/concept/Nav";
import RevealObserver from "@/concept/RevealObserver";
import { THEME_SCRIPT } from "@/concept/theme";
import "./concept.css";

// This route group is a design concept that sits alongside the current site.
// It has its own root layout so none of the current site's styles, header or
// footer apply here, and vice versa.

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myrobot.ie"),
  title: {
    default: "NOLAR — Autonomous cleaning robots for Ireland",
    template: "%s — NOLAR",
  },
  description:
    "NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that work while your team focuses on what matters.",
  // A concept preview must never compete with the live pages in search.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0f3" },
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
  ],
};

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by THEME_SCRIPT before hydration, hence suppressHydrationWarning.
    <html lang="en-IE" className={`${archivo.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <Script id="nolar-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.line-mask>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-on-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ConceptBadge />
        <RevealObserver />
      </body>
    </html>
  );
}
