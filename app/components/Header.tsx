export default function PricingSection() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
    <a className="font-serif text-2xl tracking-tight" href="/">Asheville Tailor</a>
    <nav className="hidden gap-8 text-sm md:flex">
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#estimate">Get Estimate</a>
    </nav>
    <a className="rounded-full border border-ink px-5 py-2 text-sm hover:bg-ink hover:text-linen" href="/#estimate">Book Now</a>
    </header>
  );
}