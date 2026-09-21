import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400"],
});

// Headings and body copy use Neue Haas Grotesk Display Pro, which is licensed
// through Adobe Fonts. Create a web project at fonts.adobe.com containing
// "Neue Haas Grotesk Display" (400 + 700) and put its kit id in
// NEXT_PUBLIC_ADOBE_FONTS_KIT_ID to load it; otherwise Helvetica Neue is used.
const adobeKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myrobot.ie"),
  title: {
    default: "Nolar Tech Limited",
    template: "%s | MyRobot.ie",
  },
  description:
    "NOLAR deploys intelligent autonomous cleaning robots across Ireland. Purpose-built machines that work while your team focuses on what matters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${onest.variable} ${adobeKitId ? "" : "font-fallback"}`}>
      <head>
        {adobeKitId && <link rel="stylesheet" href={`https://use.typekit.net/${adobeKitId}.css`} />}
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
