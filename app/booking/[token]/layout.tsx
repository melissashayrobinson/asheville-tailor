import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Received | Asheville Tailor",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}