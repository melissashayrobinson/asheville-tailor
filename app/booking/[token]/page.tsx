import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

type BookingPageProps = {
  params: Promise<{
    token: string;
  }>;
};

type Booking = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  garment: string | null;
  alteration_types: string[] | null;
  timeline: string | null;
  event_date: string | null;
  details: string | null;
  photo_urls: string[] | null;
  status: string | null;
  created_at: string;
};

type Appointment = {
  start_time: string;
  end_time: string;
  status: string | null;
};

function formatAppointmentDate(startTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(startTime));
}

function formatAppointmentTime(startTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(startTime));
}

function formatEventDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(year, month - 1, day));
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function BookingPage({
  params,
}: BookingPageProps) {
  const { token } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data: booking, error: bookingError } = await supabase
    .from("booking_requests")
    .select(
      `
        id,
        first_name,
        last_name,
        email,
        phone,
        garment,
        alteration_types,
        timeline,
        event_date,
        details,
        photo_urls,
        status,
        created_at
      `
    )
    .eq("confirmation_token", token)
    .single<Booking>();

  if (bookingError || !booking) {
    notFound();
  }

  const { data: appointment, error: appointmentError } = await supabase
    .from("appointments")
    .select("start_time, end_time, status")
    .eq("booking_id", booking.id)
    .maybeSingle<Appointment>();

  if (appointmentError) {
    console.error("Appointment lookup error:", appointmentError);
  }

  const firstName = booking.first_name?.trim();
  const alterations = Array.isArray(booking.alteration_types)
    ? booking.alteration_types
    : [];

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#1c1b19]">
      <section className="px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-[#56634f]">
              Booking received
            </p>

            <h1 className="font-serif text-5xl font-normal leading-[0.95] sm:text-6xl md:text-7xl">
              You’re booked{firstName ? `, ${firstName}` : ""}.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4b4944]">
              Your request made it through, and the details are safely on the
              books. Your fitting time is reserved while the appointment is
              reviewed and confirmed.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[2rem] bg-ink p-7 text-paper sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#c9c3b8]">
                Your fitting
              </p>

              {appointment ? (
                <>
                  <p className="mt-7 font-serif text-4xl leading-tight sm:text-5xl">
                    {formatAppointmentDate(appointment.start_time)}
                  </p>

                  <p className="mt-3 text-2xl text-paper">
                    {formatAppointmentTime(appointment.start_time)}
                  </p>

                  <div className="mt-10 border-t border-white/20 pt-6">
                    <p className="text-sm leading-6 text-paper">
                      This time is currently reserved pending final
                      confirmation.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-7 font-serif text-4xl leading-tight sm:text-5xl">
                    Fitting time to come
                  </p>

                  <p className="mt-5 max-w-md text-base leading-7 text-[#ddd8cf]">
                    No problem. The request has been received, and fitting
                    options will be sent after the details are reviewed.
                  </p>
                </>
              )}
            </section>

            <section className="rounded-[2rem] border border-[#d9d2c5] bg-white/55 p-7 sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#56634f]">
                Booking summary
              </p>

              <dl className="mt-7 space-y-6">
                <div>
                  <dt className="text-sm text-[#716d66]">Garment</dt>
                  <dd className="mt-1 font-serif text-3xl">
                    {booking.garment
                      ? formatLabel(booking.garment)
                      : "Not provided"}
                  </dd>
                </div>

                {alterations.length > 0 && (
                  <div className="border-t border-[#d9d2c5] pt-6">
                    <dt className="text-sm text-[#716d66]">
                      Requested alterations
                    </dt>

                    <dd className="mt-3">
                      <ul className="space-y-2">
                        {alterations.map((alteration) => (
                          <li
                            key={alteration}
                            className="flex items-start gap-3 text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#56634f]"
                            />
                            <span>{formatLabel(alteration)}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}

                {booking.timeline && (
                  <div className="border-t border-[#d9d2c5] pt-6">
                    <dt className="text-sm text-[#716d66]">Timeline</dt>
                    <dd className="mt-1 text-lg">
                      {formatLabel(booking.timeline)}
                    </dd>
                  </div>
                )}

                {booking.event_date && (
                  <div className="border-t border-[#d9d2c5] pt-6">
                    <dt className="text-sm text-[#716d66]">Event date</dt>
                    <dd className="mt-1 text-lg">
                      {formatEventDate(booking.event_date)}
                    </dd>
                  </div>
                )}

                {booking.photo_urls && booking.photo_urls.length > 0 && (
                  <div className="border-t border-[#d9d2c5] pt-6">
                    <dt className="text-sm text-[#716d66]">Photos received</dt>
                    <dd className="mt-1 text-lg">
                      {booking.photo_urls.length}{" "}
                      {booking.photo_urls.length === 1 ? "photo" : "photos"}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9d2c5] bg-[#ebe6dc] px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                One step closer to the perfect fit.
              </h2>
            </div>

            <ol className="space-y-0">
              <li className="grid gap-4 border-t border-[#cfc7ba] py-7 sm:grid-cols-[8rem_1fr]">
                <p className="text-sm font-medium text-[#56634f]">Up Next</p>

                <div>
                  <h3 className="font-serif text-2xl">
                    Your request is reviewed.
                  </h3>
                  <p className="mt-2 leading-7 text-[#55514a]">
                    The garment, alterations, timeline, and fitting request are checked by our team.
                  </p>
                </div>
              </li>

              <li className="grid gap-4 border-t border-[#cfc7ba] py-7 sm:grid-cols-[8rem_1fr]">
                <p className="text-sm font-medium text-[#56634f]">
                  Within One Business Day
                </p>

                <div>
                  <h3 className="font-serif text-2xl">
                    You’ll receive a personal reply.
                  </h3>
                  <p className="mt-2 leading-7 text-[#55514a]">
                    Your appointment will be confirmed, or any necessary questions will be sent before the fitting.
                  </p>
                </div>
              </li>

              <li className="grid gap-4 border-y border-[#cfc7ba] py-7 sm:grid-cols-[8rem_1fr]">
                <p className="text-sm font-medium text-[#56634f]">
                  At the Fitting
                </p>

                <div>
                  <h3 className="font-serif text-2xl">
                    We pin, fit, and make a plan.
                  </h3>
                  <p className="mt-2 leading-7 text-[#55514a]">
                    The alterations and expected investment are discussed before any work begins.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] border border-[#d9d2c5] p-7 sm:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-[#56634f]">
              Before your fitting
            </p>

            <h2 className="mt-5 font-serif text-3xl">
              Please have these items available during your fitting:
            </h2>

            <ul className="mt-7 space-y-4 text-[#4b4944]">
              <li className="flex gap-3">
                <span aria-hidden="true">—</span>
                <span>The shoes you plan to wear.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true">—</span>
                <span>Any undergarments that affect the fit.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true">—</span>
                <span>Accessories that change the length or silhouette.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true">—</span>
                <span>Any questions you have!</span>
              </li>
            </ul>
          </section>

          <section className="rounded-[2rem] bg-[#dce3ce] p-7 sm:p-10">
           

            <h2 className="mt-5 font-serif text-3xl">
              Need to change something?
            </h2>

            <p className="mt-5 leading-7 text-[#3f483b]">
              Reply to the confirmation email with updates, photos, questions, or a request to change the fitting time.
            </p>

            <a
              href="mailto:bookings@ashevilletailor.com"
              className="mt-8 inline-flex rounded-full border border-[#1c1b19] px-6 py-3 text-sm font-medium transition hover:bg-[#1c1b19] hover:text-[#f5f2eb]"
            >
              Email Us
            </a>
          </section>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-5xl border-t border-[#d9d2c5] pt-16">
          <p className="max-w-3xl font-serif text-3xl sm:text-4xl">
            Whether it’s your wedding dress, a favorite jacket, or the pants that are <em>nearly</em> perfect, your garments will be treated with thoughtful attention
            from the first fitting to the final stitch.
          </p>
        </div>
      </section>
    </main>
  );
}