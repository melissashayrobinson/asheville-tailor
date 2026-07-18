import Link from "next/link";

export default function BookingNotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#f5f2eb] px-6 py-24 text-[#1c1b19]">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#56634f]">
          Booking not found
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
          This link has come up empty.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-[#4b4944]">
          The confirmation link may be incomplete or no longer available.
          Contact us for help locating the request.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:bookings@ashevilletailor.com"
            className="inline-flex rounded-full bg-[#1c1b19] px-6 py-3 text-[#f5f2eb]"
          >
            Email Us
          </a>

          <Link
            href="/"
            className="inline-flex rounded-full border border-[#1c1b19] px-6 py-3"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}