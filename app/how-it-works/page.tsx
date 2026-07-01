import type { Metadata } from "next";
import { GarmentIcon, GuidanceIcon, CalendarIcon } from "../components/Icons";
import MobileZipCheck from "../components/MobileZipCheck";
import GetStarted from "../components/GetStarted";

export const metadata: Metadata = {
  title: "How It Works | Asheville Tailor",
  description:
    "Learn how Asheville Tailor works, from online booking requests to mobile fittings, bridal alterations, tailoring, and custom garment work.",
};

export default function HowItWorksPage() {
  return (
    <main className="bg-linen text-ink">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">
          How It Works
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
          A simpler way to get clothing altered.
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/70">
          The Asheville Tailor makes bridal alterations, everyday tailoring, and custom garment work clear, modern, and <em>easy</em>.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 mb-20 md:grid-cols-3 bg-white rounded-xl">
        {[
          {
            icon: <GarmentIcon className="text-tuscan-sun" />,
            title: "Tell us about your garment.",
            text: "Share what you need altered, your timeline, and photos if available.",
          },
          {
            icon: <GuidanceIcon />,
            title: "Receive personalized guidance.",
            text: "Our tailors will review your request and determine the best next step.",
          },
          {
            icon: <CalendarIcon />,
            title: "Book your fitting.",
            text: "Choose an appointment option that fits your schedule, including mobile service when available.",
          },
        ].map((step) => (
          <div key={step.title} className="rounded-[2rem] bg-bone p-8">
            <div className="mb-8 text-moss">{step.icon}</div>
            <h2 className="font-serif text-3xl">{step.title}</h2>
            <p className="mt-4 leading-relaxed text-ink/70">{step.text}</p>
          </div>
        ))}
      </section>

      <MobileZipCheck />

      <GetStarted />

    </main>
  );
}