import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SiteAssistant from "@/components/SiteAssistant";
import "./(site)/globals.css";

// The site and the /concept preview have separate root layouts, so unmatched
// URLs need their own 404 document. This keeps the current site's header and
// footer around Next's standard "404 | This page could not be found." message,
// as it was before the concept was added.

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400"],
});

const adobeKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID;

export const metadata: Metadata = {
  title: "404: This page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${onest.variable} ${adobeKitId ? "" : "font-fallback"}`}>
      <head>{adobeKitId && <link rel="stylesheet" href={`https://use.typekit.net/${adobeKitId}.css`} />}</head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-white py-120 text-center font-[system-ui] text-black">
          <div>
            <h1 className="mr-20 inline-block border-r border-black/30 pr-23 align-top text-[24px] font-medium leading-[49px] tracking-normal">
              404
            </h1>
            <div className="inline-block">
              <h2 className="text-[14px] font-normal leading-[49px] tracking-normal">This page could not be found.</h2>
            </div>
          </div>
        </main>
        <Footer />
        <SiteAssistant />
      </body>
    </html>
  );
}
