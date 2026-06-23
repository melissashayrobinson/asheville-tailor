import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modern Tailoring & Bridal Alterations in Asheville',
  description: 'Mobile tailoring, bridal alterations, custom garment work, and last-minute fittings in Asheville and Western North Carolina.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
        <body className={`${cormorant.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}

import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});