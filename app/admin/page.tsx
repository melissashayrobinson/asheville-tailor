import { createClient } from "@supabase/supabase-js";
import StatusButtons from "../components/StatusButtons";
import AddAvailabilityForm from "../components/AddAvailabilityForm";

export const dynamic = "force-dynamic";
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("booking_requests")
    .select(`
      *,
      appointments (
        id,
        start_time,
        end_time,
        status
      )
    `)
    .order("created_at", { ascending: false });

  const { data: availability } = await supabase
    .from("availability")
    .select("*")
    .gte("start_time", new Date().toISOString())
    .order("start_time", { ascending: true });

  return (
    <main className="min-h-screen bg-[#f5f2eb] p-10">

      <h1 className="mb-8 text-5xl font-light">
        Booking Requests
      </h1>

      {error && (
        <p className="text-red-500">
          {error.message}
        </p>
      )}

      <div className="space-y-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((request) => (
          
          <div
            key={request.id}
            className="rounded-2xl border border-stone-300 bg-white p-6"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl">
                {request.name}
              </h2>

              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm">
                {request.status}
              </span>
            </div>

            <div className="mt-4 space-y-1 text-stone-600">
                <p>Email: {request.email}</p>
                <p>Phone: {request.phone}</p>
                <p>Garment: {request.garment}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {request.alteration_types?.map((item: string) => (
                    <span
                      key={item}
                      className="rounded-full bg-stone-100 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p>Timeline: {request.timeline}</p>
                <p>Deadline: {request.event_date || "Not provided"}</p>
                <p>
                    Submitted:{" "}
                    {new Date(request.created_at).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    })}
                </p>
            </div>

            <div className="mt-4 space-y-1 text-stone-600">
              <p className="font-medium">Notes</p>
              <p>{request.details}</p>
            </div>

            {request.appointments?.length > 0 ? (
              <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-stone-700">
                <p className="font-medium">Fitting Appointment</p>

                <p>
                  {new Date(request.appointments[0].start_time).toLocaleString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-sm text-stone-500">
                  {Math.round(
                    (new Date(request.appointments[0].end_time).getTime() -
                      new Date(request.appointments[0].start_time).getTime()) /
                      1000 /
                      60
                  )}{" "}
                  minute fitting · {request.appointments[0].status}
                </p>
              </div>
            ) : request.needs_another_time ? (
              <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-yellow-900">
                <p className="font-medium">Fitting Appointment</p>
                <p>Needs another fitting time</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-stone-500">
                <p className="font-medium">Fitting Appointment</p>
                <p>No fitting time selected</p>
              </div>
            )}

            {request.photo_urls?.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 font-medium">Photos</p>

              <div className="flex flex-wrap gap-3">
                {request.photo_urls.map((url: string) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={url}
                      alt="Garment"
                      className="h-32 w-32 rounded-xl object-cover border"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

            <StatusButtons
              id={request.id}
              currentStatus={request.status}
            />

            <div className="mt-4 space-y-1 text-stone-600">
                <p className="font-medium">Submitted to You:</p>
                <p>{new Date(request.created_at).toLocaleString()}</p>

                <p className="font-medium">Deadline:</p>
                <p>{request.event_date}</p>

                {request.needs_another_time && (
                  <p className="rounded-full bg-yellow-100 px-3 py-2 text-sm text-yellow-900">
                    Needs another fitting time
                  </p>
                )}
            </div>

            
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <AddAvailabilityForm />

      <div className="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availability?.map((slot) => (
          <div
            key={slot.id}
            className="rounded-2xl border border-stone-300 bg-white p-5"
          >
            <p className="font-medium">
              {new Date(slot.start_time).toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <p className="text-sm text-stone-600">
              Ends:{" "}
              {new Date(slot.end_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <p className="mt-2 text-sm text-stone-500">
              Status: {slot.status}
            </p>

            {slot.notes && (
              <p className="mt-2 text-sm text-stone-500">
                Notes: {slot.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}