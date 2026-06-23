export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import StatusButtons from "../components/StatusButtons";

export default async function AdminPage() {
    console.log(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20)
);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("estimate_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f5f2eb] p-10">
      <h1 className="mb-8 text-5xl font-light">
        Estimate Requests
      </h1>

      {error && (
        <p className="text-red-500">
          {error.message}
        </p>
      )}

      <div className="space-y-6">
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
            </div>

            
          </div>
        ))}
      </div>
    </main>
  );
}