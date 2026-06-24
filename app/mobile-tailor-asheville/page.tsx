import type { Metadata } from "next";
import Link from "next/link";
import EstimateWizard from "../components/EstimateWizard";

export const metadata: Metadata = {
  title: "Mobile Tailor Asheville NC | In-Home & On-Site Fittings",
  description:
    "Mobile tailoring and in-home fittings throughout Asheville, NC. Bridal alterations, wedding dress fittings, formalwear, and tailoring designed around your schedule.",
  alternates: {
    canonical: "https://ashevilletailor.com/mobile-tailor-asheville",
  },
};

export default function MobileTailorAsheville() {
  return (
    <main className="bg-linen text-ink">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">
          Mobile Tailoring
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
          Tailoring that comes to you.
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/70">
          In-home fittings, hotel fittings, venue appointments, and bridal
          consultations throughout Asheville and Western North Carolina.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#estimate-wizard"
            className="rounded-full bg-ink px-8 py-4 text-linen transition hover:opacity-90"
          >
            Start Estimate
          </a>

          <Link
            href="/"
            className="rounded-full border border-ink/15 px-8 py-4 transition hover:bg-ink/5"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <section className="bg-bone px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">
              A modern approach to tailoring.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              Great tailoring shouldn't require multiple trips across town.
              Asheville Tailor offers mobile fitting options for select
              projects, allowing clients to meet at home, a hotel, wedding
              venue, office, or private location.
            </p>

            <p>
              This service is especially helpful for destination weddings,
              busy professionals, bridal parties, and clients managing tight
              event schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-4xl">
          Mobile fitting services may include
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "Wedding dress fittings",
            "Bridesmaid fittings",
            "Mother of the bride fittings",
            "Suit fittings",
            "Formalwear consultations",
            "Hotel fittings",
            "Venue appointments",
            "Home appointments",
            "Rush alteration consultations",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-ink/10 p-6"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-linen">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] opacity-60">
            Destination Wedding?
          </p>

          <h2 className="mt-4 font-serif text-5xl">
            We work with visitors, planners, and wedding professionals.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80">
            Asheville is a destination wedding city. Mobile fittings can help
            simplify planning and reduce travel for bridal clients and wedding
            parties.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-serif text-4xl">
          Mobile Tailor Asheville FAQs
        </h2>

        <div className="mt-10 space-y-8">
          <div>
            <h3 className="text-xl font-medium">
              Do you offer in-home tailoring appointments?
            </h3>

            <p className="mt-3 text-ink/70">
              Yes. Mobile fitting appointments may be available depending on
              location, project scope, and scheduling availability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Do you travel to wedding venues?
            </h3>

            <p className="mt-3 text-ink/70">
              Venue and hotel appointments may be available for bridal and
              wedding-related projects.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Is there an additional fee for mobile fittings?
            </h3>

            <p className="mt-3 text-ink/70">
              Travel and mobile fitting fees vary based on location and project
              requirements.
            </p>
          </div>
        </div>
      </section>

      <section id="estimate-wizard">
        <EstimateWizard />
      </section>

    </main>
  );
}