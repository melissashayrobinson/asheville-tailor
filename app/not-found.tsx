import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linen px-6 py-24 text-ink">
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">
          404
        </p>

        <h1 className="mt-6 font-serif text-5xl leading-tight md:text-7xl">
          Looks like this stitch came loose.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
          The page you're looking for may have moved, changed, or never quite
          made it to the fitting room.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-ink px-8 py-4 text-linen transition hover:opacity-90"
          >
            Return Home
          </Link>

          <Link
            href="/#booking"
            className="rounded-full border border-ink/15 px-8 py-4 transition hover:bg-ink/5"
          >
            Start Booking
          </Link>
        </div>
      </section>
    </main>
  );
}