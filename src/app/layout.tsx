import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { SITE } from "@/data/site";
import { getPrimaryProperty } from "@/data/property";

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

const property = getPrimaryProperty();
const pageTitle = `${property.name} | Hood Canal A-Frame Retreat in ${property.location.city}, ${property.location.state}`;
const pageDescription = `A ${property.bedrooms}-bedroom, ${property.bathrooms}-bath waterview A-frame on Hood Canal in ${property.location.city}, WA. Sleeps ${property.guests}, with a private hot tub and panoramic water views.`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.stayhavencollection.com/#salt-haven",
  name: property.name,
  description: pageDescription,
  url: "https://www.stayhavencollection.com/",
  address: {
    "@type": "PostalAddress",
    addressLocality: property.location.city,
    addressRegion: property.location.state,
    addressCountry: property.location.country,
  },
  numberOfRooms: property.bedrooms,
  petsAllowed: true,
  amenityFeature: property.fullAmenities.map((item) => ({
    "@type": "LocationFeatureSpecification",
    name: item,
  })),
  ...(property.booking.priceFrom
    ? {
        priceRange: `From ${property.booking.currency} ${property.booking.priceFrom}/night`,
      }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stayhavencollection.com"),
  title: {
    default: pageTitle,
    template: `%s — ${SITE.brand.name}`,
  },
  description: pageDescription,
  keywords: [
    "Salt+Haven",
    "Union WA",
    "Union Washington",
    "Hood Canal",
    "Hood Canal cabin",
    "Hood Canal vacation rental",
    "Washington A-frame",
    "waterfront A-frame Washington",
    "Hood Canal accommodation",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.brand.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-charcoal"
        >
          Skip to content
        </a>
        <BookingProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <Cursor />
            <GrainOverlay />
            <ScrollProgress />
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
