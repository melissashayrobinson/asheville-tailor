export default function PricingSection() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
    <a className="font-serif text-xl" href="/">The Asheville Tailor</a>
    <nav className="hidden gap-8 text-sm md:flex">
        <a href="/how-it-works">How it Works</a>
        <a href="/#alterations">Services</a>
        <a href="/#booking">Pricing</a>
    </nav>
    <a className="rounded-full border border-transparent bg-lime px-5 py-2 text-sm hover:border-ink hover:text-linen" href="/#booking">Book Now</a>
    </header>
  );
}