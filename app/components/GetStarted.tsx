import Link from "next/link";

export default function GetStarted() {
  return (
    
<section className="px-6 py-24 text-center">
        <h2 className="font-serif text-5xl">Ready to get started?</h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
          Submit an estimate request and we'll see what's possible.
        </p>

        <div className="mt-10">
          <Link
            href="/#estimate-wizard"
            className="rounded-full border border-ink bg-ink px-8 py-4 text-linen"
          >
            Start a Booking
          </Link>
        </div>
      </section>
      
  );
}