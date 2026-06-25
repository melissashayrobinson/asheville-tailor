export default function PricingSection() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
    <a className="font-serif text-xl" href="/">The Asheville Tailor</a>
    <nav className="hidden gap-8 text-sm md:flex">
        <a href="/#services">Bridal</a>
        <a href="/#services">Tailoring</a>
        <a href="/#estimate">Pricing</a>
    </nav>
    <a className="rounded-full border border-ink px-5 py-2 text-sm hover:bg-ink hover:text-linen" href="/#estimate">Book Now</a>
    </header>
  );
}