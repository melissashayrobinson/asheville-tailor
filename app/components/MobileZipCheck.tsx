"use client";

import { useState } from "react";
import Button from "./Button";
import { trackEvent } from "../../lib/gtag";


export default function MobileZipCheck() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function checkZip(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/check-mobile-range", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip }),
    });

    const data = await response.json();

    if (data.success) {
      trackEvent(
        data.inRange
          ? "mobile_service_available"
          : "mobile_service_unavailable",
        {
          distance: data.distance,
          city: data.city,
          state: data.state,
        }
      );
    }
    setResult(data);
    setLoading(false);
  }

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-moss">
            Mobile Fittings
          </p>

          <h2 className="mt-4 font-serif text-5xl">
            Skip the studio visit. <br />We’ll come to you.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            For select bridal, formalwear, and tailoring projects, mobile
            fittings are available within 50 miles of Asheville, North
            Carolina.
          </p>
        </div>

        <div className="rounded-[2rem] bg-linen p-8">
          <form onSubmit={checkZip}>
            <label className="grid gap-3">
              <span className="text-sm font-medium">Enter your ZIP code</span>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="28801"
                  maxLength={5}
                  className="flex-1 rounded-full border border-ink/15 bg-bone px-5 py-4"
                />

                <Button variant="primary">
                  {loading ? "Checking..." : "Check Area"}
                </Button>
                
              </div>
            </label>
          </form>

          {result?.success && result.inRange && (
            <div className="mt-8 rounded-3xl border border-moss/30 bg-moss/10 p-6">
              <p className="font-medium">
                Yes — mobile service may be available in {result.city},{" "}
                {result.state}.
              </p>

              <p className="mt-2 text-sm text-ink/70 mb-5">
                You’re approximately {result.distance} miles from our base.
              </p>

              <Button href="/#booking" variant="secondary">
                Start Booking
              </Button>

            </div>
          )}

          {result?.success && !result.inRange && (
            <div className="mt-8 rounded-3xl border border-ink/10 p-6">
              <p className="font-medium">
                It looks like you're outside our mobile fitting range.
              </p>

              <p className="mt-2 text-sm text-ink/70">
                {result.city}, {result.state} is approximately {result.distance}{" "}
                miles from our base. Submit a booking request for studio or special project consideration.
              </p>
            </div>
          )}

          {result && !result.success && (
            <p className="mt-6 text-sm text-ink/70">{result.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}