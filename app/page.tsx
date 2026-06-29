import { ArrowRight, Calendar, Camera, MapPin, Sparkles } from 'lucide-react';
import EstimateWizard from "./components/EstimateWizard";
import PricingSection from "./components/PricingSection";
import AlterationsList from "./components/AlterationsList";
import GetStarted from "./components/GetStarted";

export default function Home() {
  return (
    <main className="min-h-screen bg-linen text-ink">

      <section className="px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-5xl leading-[1] tracking-tight md:text-6xl">Cherished clothing. Made&nbsp;to&nbsp;fit.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/75">Mobile tailoring, bridal alterations, and custom garment work for Asheville weddings and destination celebrations throughout Western North Carolina. </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <a className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-4" href="#estimate">Book Services</a>
            <a className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-4 text-linen" href="#pricing">View Pricing <ArrowRight className="ml-2 h-4 w-4" /></a>
          </div>
        </div>
      </section>
    
      <section className="border-y border-ink/10 bg-bone mb-10" id="services">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-1">
            <div className="rounded-3xl bg-linen p-7 text-center">
              <h2 className="font-serif text-3xl">The Asheville Tailor brings a modern, thoughtful tailoring experience to Western North Carolina. We combine exceptional craftsmanship with easy pricing, online booking and progress tracking, and mobile fittings.</h2>
            </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24">
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src="/images/hero.jpg"
            alt="Tailoring and garment work"
            className="h-[75vh] w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-0 left-0 p-10 lg:p-16">
            <p className="max-w-lg text-white text-lg leading-relaxed">
              Modern fitting service for real life, wedding weeks, and favorite pieces worth keeping.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone" id="services">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3">
          {[['Modern Tailoring', 'Hems, waist adjustments, sleeves, suiting, heritage denim, dresses, and formalwear.'], ['Bridal', 'Wedding dresses, bridesmaids, mothers, and destination wedding support.'], ['Studio Work', 'Custom projects, heirloom redesign, vintage reworking, and limited commissions.']].map(([title, text]) => (
            <div className="rounded-3xl bg-linen p-7" key={title}>
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-4 leading-7 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <EstimateWizard />

      <PricingSection />

      <AlterationsList />

      <GetStarted />

    </main>
  );
}