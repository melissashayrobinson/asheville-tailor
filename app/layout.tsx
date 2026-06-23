import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

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
    default: "Bridal Alterations & Tailoring in Asheville NC | Asheville Tailor",
    template: "%s | Asheville Tailor",
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
    title: "Bridal Alterations & Tailoring in Asheville NC | Asheville Tailor",
    description:
      "Modern bridal alterations, tailoring, and custom garment work throughout Asheville and Western North Carolina.",
    url: "https://ashevilletailor.com",
    siteName: "Asheville Tailor",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Asheville Tailor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bridal Alterations & Tailoring in Asheville NC | Asheville Tailor",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}