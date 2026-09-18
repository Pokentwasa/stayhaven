import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { SITE } from "@/data/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stayhavencollection.com"),
  title: {
    default: `${SITE.brand.name} — ${SITE.hero.headline}`,
    template: `%s — ${SITE.brand.name}`,
  },
  description: SITE.hero.supporting,
  openGraph: {
    type: "website",
    siteName: SITE.brand.name,
    title: SITE.brand.name,
    description: SITE.hero.supporting,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.brand.name,
    description: SITE.hero.supporting,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-charcoal"
        >
          Skip to content
        </a>
        <BookingProvider>
          <SmoothScrollProvider>
            <Cursor />
            <GrainOverlay />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
          <BookingPanel />
        </BookingProvider>
      </body>
    </html>
  );
}
