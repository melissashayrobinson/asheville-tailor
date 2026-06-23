import { ArrowRight, Calendar, Camera, MapPin, Sparkles } from 'lucide-react';
import EstimateWizard from "./components/EstimateWizard";
import PricingSection from "./components/PricingSection";

const tailoringPrices = [
  ['Pants hem', '$35-55'],
  ['Jeans hem', '$40-65'],
  ['Skirt hem', '$45-95'],
  ['Dress hem', '$75-175'],
  ['Waist adjustment', '$45-95'],
  ['Sleeve shortening', '$50-125'],
  ['Jacket tailoring', '$75-250'],
  ['Suit alterations', '$95-300']
];

const bridalPrices = [
  ['Bridal consultation', '$50, credited toward work'],
  ['Simple wedding dress alterations', '$250-500'],
  ['Moderate wedding dress alterations', '$500-1,000'],
  ['Complex bridal alterations', '$1,000+'],
  ['Bustle', '$95-250'],
  ['Wedding emergency service', 'Starting at $250']
];


export default function Home() {
  return (
    <main className="min-h-screen bg-linen text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a className="font-serif text-2xl tracking-tight" href="#">Asheville Tailor</a>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#estimate">Get Estimate</a>
        </nav>
        <a className="rounded-full border border-ink px-5 py-2 text-sm hover:bg-ink hover:text-linen" href="#estimate">Book Now</a>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16  md:py-24">
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-moss">Asheville + Western North Carolina</p>
          <h1 className="font-serif text-5xl leading-[.98] tracking-tight md:text-7xl">Thoughtful clothing. Made to fit.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/75">Mobile tailoring, bridal alterations, and custom garment work for Asheville weddings and destination celebrations throughout Western North Carolina.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-4 text-linen" href="#estimate">Book services <ArrowRight className="ml-2 h-4 w-4" /></a>
            <a className="inline-flex items-center justify-center rounded-full border border-ink px-7 py-4" href="#pricing">View pricing</a>
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
        Modern fitting service for real life, wedding weeks,
        and favorite pieces worth keeping.
      </p>
    </div>
  </div>
</section>

      <section className="border-y border-ink/10 bg-bone" id="services">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3">
          {[['Modern Tailoring', 'Hems, waist adjustments, sleeves, suiting, denim, dresses, and formalwear.'], ['Bridal', 'Wedding dresses, bustles, bridesmaids, mothers, and destination wedding support.'], ['Studio Work', 'Custom projects, heirloom redesign, vintage reworking, and limited commissions.']].map(([title, text]) => (
            <div className="rounded-3xl bg-linen p-7" key={title}>
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-4 leading-7 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>


<EstimateWizard />

<PricingSection />




      <section className="mx-auto max-w-3xl px-6 py-20 text-center" id="estimate">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-moss">Start here</p>
        <h2 className="mt-4 mb-5 text-center font-serif text-5xl">Ready to get started?</h2>
        <a className="rounded-full border border-ink px-5 py-2 text-sm hover:bg-ink hover:text-linen" href="#estimate">Book Services</a>
      </section>
    </main>
  );
}