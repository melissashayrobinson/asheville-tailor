import type { Metadata } from "next";
import BookingWizard from "../components/BookingWizard";

export const metadata: Metadata = {
  title: "Book Your First Fitting | The Asheville Tailor",
  description:
    "Wedding dress alterations in Asheville, NC. Bridal hemming, bustles, bodice adjustments, mobile fittings, and last-minute wedding dress support.",
  alternates: {
    canonical: "https://ashevilletailor.com/book-services",
  },
};

export default function BookServices() {
  return (
    <main className="bg-linen text-ink">
        <BookingWizard />

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">
          Asheville Bridal Alterations
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
          Wedding Dress Alterations in Asheville, NC + WNC
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/70">
          Thoughtful bridal tailoring for wedding gowns, reception dresses,
          veils, bustles, and last-minute wedding-week needs throughout
          Asheville and Western North Carolina.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#booking"
            className="rounded-full border border-ink/15 px-8 py-4 transition hover:bg-ink/5"
          >
            Start Booking
          </a>

        </div>
      </section>

      <section className="bg-bone px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">
              Bridal alterations without the stress.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              Your wedding dress should feel beautiful, secure, and comfortable
              from the first photo to the final dance. We help brides navigate
              hems, bodice adjustments, bustles, straps, sleeves, layers, lace,
              and fit concerns with a calm, modern process.
            </p>

            <p>
              Start with an online booking request where you'll share your photos of your dress, your timeline, and what needs to change. We'll review the details and help you
              decide on the best next step before you book a fitting.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-4xl">Common wedding dress alterations</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3 text-center">
          {[
            "Wedding Dress Hemming",
            "Bodice Adjustments",
            "Strap Shortening",
            "Sleeve Alterations",
            "Train Adjustments",
            "Reception Dress Alterations",
            "Veil Shortening",
            "Last-minute Bridal Alterations",
          ].map((item) => (
            <div key={item} className="rounded-sm border border-ink/10 p-6">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-linen">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] opacity-60">
            Wedding this week?
          </p>

          <h2 className="mt-4 font-serif text-5xl">
            Last-minute bridal support may be available.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80">
            Dress arrived late, zipper trouble, unexpected fit issue, or bustle
            problem? Submit an booking request and include your wedding date.
          </p>

          <a
            href="#booking"
            className="mt-10 inline-flex rounded-full border border-ink/15 px-8 py-4 transition hover:bg-ink/5"
          >
            Start a Booking
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-serif text-4xl">Wedding Dress Alteration FAQs</h2>

        <div className="mt-10 space-y-8">
          <div>
            <h3 className="text-xl font-medium">
              When should I schedule wedding dress alterations?
            </h3>
            <p className="mt-3 text-ink/70">
              Most brides should begin alterations 8-12 weeks before the wedding. Rush or wedding-week appointments may be available depending on the dress and schedule.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              How much do wedding dress alterations cost?
            </h3>
            <p className="mt-3 text-ink/70">
              Simple wedding dress alterations often start around $350-$500. More complex work involving multiple layers, lace, beading, structure, or significant reshaping can range from $500-$1,000+.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Do you offer mobile bridal fittings?
            </h3>
            <p className="mt-3 text-ink/70">
              Mobile fittings are available in Asheville and surrounding areas depending on the project, timeline, and location.
            </p>
          </div>
        </div>
      </section>

      
      

    </main>
  );
}