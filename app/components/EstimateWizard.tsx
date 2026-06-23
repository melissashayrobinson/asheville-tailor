"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/gtag";

const garmentPrices: Record<string, string> = {
  "Wedding dress": "$350-$1,000+",
  "Bridesmaid dress": "$95-$250",
  Suit: "$95-$300",
  Pants: "$25-$95",
  Jacket: "$75-$250",
  Dress: "$75-$300",
  Shirt: "$25-$125",
  Other: "Custom estimate",
};

export default function EstimateWizard() {
  const [step, setStep] = useState(1);
  const [garment, setGarment] = useState("");
  const [timeline, setTimeline] = useState("");
  const [details, setDetails] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoNote, setPhotoNote] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submitEstimate = async () => {
  setIsSubmitting(true);
  setSubmitError("");

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("garment", garment);
    formData.append("timeline", timeline);
    formData.append("eventDate", eventDate);
    formData.append("details", details);
    formData.append("photoNote", photoNote);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    const response = await fetch("/api/estimate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    trackEvent("estimate_submitted", {
      garment_type: garment,
      timeline: timeline,
      has_photos: photos.length > 0,
    });


    setSubmitted(true);
  } catch (error) {
    setSubmitError("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="estimate" className="bg-[#1c1b19] px-6 py-24 text-[#f5f2eb] lg:px-12">
      
      <div className="mx-auto max-w-6xl">
      
        <h2 className="mb-6 text-5xl font-light tracking-[-0.03em] md:text-7xl">
          Explore + Book Services
        </h2>

        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-stone-300">
          Tell us what you need altered, when you need it, and what kind of fit
          you want. You'll receive a price range before booking is confirmed.
        </p>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="mb-8 flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full ${
                  n <= step ? "bg-[#f5f2eb]" : "bg-white/15"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="mb-6 text-3xl font-light">What type of garment?</h3>
              <div className="grid gap-3 grid-cols-2">
                {Object.keys(garmentPrices).map((item) => (
                  <button
                    key={item}
                    onClick={() => setGarment(item)}
                    className={`rounded-full border px-5 py-4 text-left transition ${
                      garment === item
                        ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                        : "border-white/20 hover:border-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="mb-6 text-3xl font-light">What needs to change?</h3>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Example: The waist needs to come in, the hem is too long, and I need a bustle added."
                className="min-h-40 w-full rounded-2xl border border-white/20 bg-transparent p-5 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="mb-6 text-3xl font-light">When do you need it?</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {["2-3 weeks", "5 business days", "48 hours or less"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setTimeline(item)}
                    className={`rounded-full border px-5 py-4 text-left transition ${
                      timeline === item
                        ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                        : "border-white/20 hover:border-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )
          }

          {step === 4 && (
            <div>
              <h3 className="mb-6 text-3xl font-light">How can we reach you?</h3>

              <div className="grid gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Event date or deadline"
                  className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>
          )}

{step === 5 && (
  <div>
    <h3 className="mb-6 text-3xl font-light">Photos help us estimate.</h3>

    <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  }}
  className="w-full rounded-2xl border border-white/20 bg-transparent p-5 mb-5 text-[#f5f2eb] file:mr-4 file:rounded-full file:border-0 file:bg-[#f5f2eb] file:px-4 file:py-2 file:text-[#1c1b19]"
/>

{photos.length > 0 && (
  <p className="mt-4 text-stone-300">
    {photos.length} photo{photos.length > 1 ? "s" : ""} selected.
  </p>
)}

    <textarea
      value={photoNote}
      onChange={(e) => setPhotoNote(e.target.value)}
      placeholder="Anything we should look for in the photos?"
      className="min-h-32 w-full rounded-2xl border border-white/20 bg-transparent p-5 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white"
    />
  </div>
)}
          {step === 6 && (
            <div>
              <h3 className="mb-4 text-3xl font-light">Estimated range</h3>

              <div className="mb-8 rounded-3xl bg-[#f5f2eb] p-8 text-[#1c1b19]">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-stone-500">
                  {garment || "Garment"}
                </p>
                <p className="text-5xl font-light">
                  {garment ? garmentPrices[garment] : "$95-$250"}
                </p>
                {timeline === "5 business days" && (
                  <p className="mt-4 text-stone-600">Priority turnaround may add 50%.</p>
                )}
                {timeline === "48 hours or less" && (
                  <p className="mt-4 text-stone-600">Rush service may add 100% or a wedding emergency minimum.</p>
                )}
              </div>

              <p className="mb-6 text-stone-300">
                Final pricing is confirmed at fitting before work begins.
              </p>

              <button
                onClick={submitEstimate}
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-[#f5f2eb] px-8 py-4 text-[#1c1b19] transition hover:bg-white disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Request Estimate"}
              </button>
              {submitted && (
                <p className="mt-4 text-stone-300">
                  Thank you. Your estimate request has been received.
                </p>
              )}

              {submitError && (
                <p className="mt-4 text-red-300">
                  {submitError}
                </p>
              )}
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <button
              onClick={back}
              disabled={step === 1}
              className="text-stone-400 disabled:opacity-30"
            >
              Back
            </button>

            {step < 6 && (
              <button
                onClick={next}
                className="rounded-full bg-[#f5f2eb] px-7 py-3 text-[#1c1b19] transition hover:bg-white"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}