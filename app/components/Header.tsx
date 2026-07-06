export default function PricingSection() {
  return (
    <header className="">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 ">
        <a className="font-serif text-xl" href="/">The Asheville Tailor</a>
            <nav className="hidden gap-8 text-sm md:flex">
                <a href="/how-it-works" className="underline-offset-4 underline decoration-transparent transition-colors duration-200 hover:underline hover:decoration-current">How it Works</a>
                <a href="/#alterations" className="underline-offset-4 underline decoration-transparent transition-colors duration-200 hover:underline hover:decoration-current">Services</a>
                <a href="/mobile-tailor-asheville" className="underline-offset-4 underline decoration-transparent transition-colors duration-200 hover:underline hover:decoration-current">Mobile Tailoring</a>
            </nav>
            <a className="rounded-full border border-transparent bg-lime px-5 py-2 text-sm hover:border-ink hover:text-linen" href="/#booking">Book Now</a>
      </div>
    
    </header>
  );
}