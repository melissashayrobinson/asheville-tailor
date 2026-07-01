import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashevilletailor.com"),

  title: {
    default: "Bridal Alterations & Tailoring in Asheville NC | The Asheville Tailor",
    template: "%s | The Asheville Tailor",
  },

  description:
    "Bridal alterations, wedding dress tailoring, mobile fittings, suit alterations, denim hemming, and custom garment work in Asheville, North Carolina.",

  keywords: [
    "bridal alterations Asheville",
    "wedding dress alterations Asheville",
    "tailor Asheville NC",
    "dress alterations Asheville",
    "mobile tailor Asheville",
    "suit alterations Asheville",
    "jeans hemming Asheville",
    "bridesmaid dress alterations Asheville",
    "formalwear alterations Asheville",
    "custom tailoring Asheville",
  ],

  openGraph: {
    title: "Bridal Alterations & Tailoring in Asheville NC | The Asheville Tailor",
    description:
      "Modern bridal alterations, tailoring, and custom garment work throughout Asheville and Western North Carolina.",
    url: "https://ashevilletailor.com",
    siteName: "The Asheville Tailor",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "The Asheville Tailor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bridal Alterations & Tailoring in Asheville NC | The Asheville Tailor",
    description:
      "Modern bridal alterations, tailoring, and custom garment work throughout Asheville and Western North Carolina.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://ashevilletailor.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Asheville Tailor",
  image: "https://ashevilletailor.com/og-image.jpg",
  url: "https://ashevilletailor.com",
  telephone: "",
  email: "promotifs@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asheville",
    addressRegion: "NC",
    addressCountry: "US",
  },
  areaServed: [
    "Asheville",
    "Biltmore Forest",
    "Black Mountain",
    "Weaverville",
    "Hendersonville",
    "Arden",
    "Fletcher",
    "Western North Carolina",
  ],
  priceRange: "$$",
  description:
    "Modern bridal alterations, tailoring, mobile fittings, and custom garment work throughout Asheville and Western North Carolina.",
  serviceType: [
    "Bridal Alterations",
    "Wedding Dress Alterations",
    "Tailoring",
    "Suit Alterations",
    "Dress Alterations",
    "Mobile Fittings",
    "Custom Garments",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wedding Dress Alterations",
  provider: {
    "@type": "LocalBusiness",
    name: "The Asheville Tailor",
  },
  areaServed: "Asheville, NC",
  description:
    "Wedding dress alterations, bridal tailoring, bustle creation, hemming, and wedding-week emergency alterations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>

        <script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <Header />
    
        {children}
        <Footer />
      </body>

      <GoogleAnalytics gaId="G-GSH3R1Q7KT" />
    </html>
  );
}