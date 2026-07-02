import type { Metadata } from "next";
import BookingWizard from "../components/BookingWizard";
import Button from "../components/Button";

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
          <Button href="#booking">
            Start a Booking
          </Button>
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
              Great tailoring shouldn't require multiple trips across town. <strong>The&nbsp;Asheville&nbsp;Tailor</strong> offers mobile fitting to allow clients to meet at home, their hotel, wedding venue, or office.
            </p>

            <p>
              This service is especially helpful for destination weddings, busy professionals, bridal parties, and clients managing tight event schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-4xl">
          Mobile service includes:
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "Wedding dress fittings",
            "Wedding dress alterations",
            "Bridesmaid fittings",
            "Mother of the bride fittings",
            "Suit fittings",
            "Hotel fittings",
            "Venue appointments",
            "Home appointments",
            "Rush alteration consultations",
          ].map((item) => (
            <div
              key={item}
              className="rounded-sm border border-ink/10 p-6"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-parchment">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] opacity-60">
            Destination Wedding?
          </p>

          <h2 className="mt-4 font-serif text-5xl">
            We work with visitors, planners, and local wedding professionals.
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
              Yes. Mobile fitting appointments are available depending on location, project scope, and scheduling availability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Do you travel to wedding venues?
            </h3>

            <p className="mt-3 text-ink/70">
              Venue and hotel appointments may be available for bridal and wedding-related projects.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Is there an additional fee for mobile fittings?
            </h3>

            <p className="mt-3 text-ink/70">
              Travel and mobile fitting fees vary based on location and project requirements.
            </p>
          </div>
        </div>
      </section>

      <BookingWizard />

    </main>
  );
}