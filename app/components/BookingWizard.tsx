"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../../lib/gtag";

const garments = [
  {
    label: "Wedding dress",
    basePrice: [150, 1500],
    alterationOptions: [
      { label: "Hem", price: [100, 350] },
      { label: "Bustle", price: [125, 350] },
      { label: "Bodice adjustment", price: [100, 430] },
      { label: "Straps", price: [65, 175] },
      { label: "Sleeves", price: [100, 350] },
      { label: "Take in / let out", price: [100, 500] },
      { label: "Add cups", price: [30, 75] },
      { label: "Other", price: [25, 300] },
    ],
  },
  {
    label: "Bridesmaid or other dress",
    basePrice: [40, 350],
    alterationOptions: [
      { label: "Hem", price: [65, 175] },
      { label: "Take in / let out", price: [100, 275] },
      { label: "Straps", price: [40, 95] },
      { label: "Sleeves", price: [75, 150] },
      { label: "Zipper repair", price: [60, 150] },
      { label: "Other", price: [50, 275] },
    ],
  },
  {
    label: "Denim/Jeans or Pants",
    basePrice: [15, 150],
    alterationOptions: [
      { label: "Hem", price: [15, 25] },
      { label: "Waist adjustment", price: [45, 75] },
      { label: "Change leg shape", price: [25, 65] },
      { label: "Replace zipper", price: [25, 75] },
      { label: "Repair", price: [25, 75] },
      { label: "Other", price: [15, 100] },
    ],
  },
  {
    label: "Suit/jacket/pants",
    basePrice: [25, 250],
    alterationOptions: [
      { label: "Sleeve length", price: [55, 125] },
      { label: "Take in jacket", price: [75, 175] },
      { label: "Pants hem", price: [25, 45] },
      { label: "Pants waist", price: [50, 125] },
      { label: "Change leg shape", price: [45, 95] },
      { label: "Other", price: [50, 175] },
    ],
  },
  {
    label: "Other",
    basePrice: [25, 250],
    alterationOptions: [
      { label: "Hem", price: [25, 75] },
      { label: "Take in / let out", price: [25, 200] },
      { label: "Repair", price: [40, 150] },
      { label: "Zipper", price: [25, 150] },
      { label: "Custom adjustment", price: [95, 300] },
      { label: "Other", price: [75, 250] },
    ],
  },
];

function getDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

function getSlotDateKey(slot: any) {
  return new Date(slot.start_time).toISOString().split("T")[0];
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];

  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return {
    monthLabel: monthDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    days,
    firstDayOffset: firstDay.getDay(),
  };
}

function getDurationLabel(startTime: string, endTime: string) {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const minutes = Math.round((end - start) / 60000);

  if (minutes === 60) return "1 hour";
  if (minutes < 60) return `${minutes} minutes`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) return `${hours} hours`;

  return `${hours} hr ${remainingMinutes} min`;
}



export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [garment, setGarment] = useState("");
  const [alterationTypes, setAlterationTypes] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [showDetails, setShowDetails] = useState(false);
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

  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [needsAnotherTime, setNeedsAnotherTime] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    async function loadAvailability() {
      const response = await fetch("/api/availability");
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots);
      }
    }

    loadAvailability();
  }, []);

  const submitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("garment", garment);
      formData.append("alterationTypes", JSON.stringify(alterationTypes));
      formData.append("timeline", timeline);
      formData.append("eventDate", eventDate);
      formData.append("details", details);
      formData.append("availabilityId", selectedSlotId);
      formData.append("needsAnotherTime", String(needsAnotherTime));

      const response = await fetch("/api/booking", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      trackEvent("booking_submitted", {
        garment_type: garment,
        timeline: timeline,
      });

      setSubmitted(true);
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDateKeys = new Set(
    availableSlots.map((slot) => getSlotDateKey(slot))
  );

  const selectedDateSlots = availableSlots.filter(
    (slot) => getSlotDateKey(slot) === selectedDate
  );

  const calendar = getMonthDays(calendarMonth);

  function toggleAlterationType(option: string) {
    setAlterationTypes((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  }

 const selectedGarment = garments.find((item) => item.label === garment);

  const alterationOptions =
    selectedGarment?.alterationOptions ??
    garments.find((item) => item.label === "Other")!.alterationOptions;

  const selectedAlterationOptions = alterationOptions.filter((option) =>
    alterationTypes.includes(option.label)
  );

  const estimatedLow =
    selectedAlterationOptions.length > 0
      ? selectedAlterationOptions.reduce((sum, option) => sum + option.price[0], 0)
      : selectedGarment?.basePrice[0] ?? 50;

  const estimatedHigh =
    selectedAlterationOptions.length > 0
      ? selectedAlterationOptions.reduce((sum, option) => sum + option.price[1], 0)
      : selectedGarment?.basePrice[1] ?? 150;

  const estimatedPrice = `$${estimatedLow.toLocaleString()}-$${estimatedHigh.toLocaleString()}`;

  return (
    <section id="booking" className="bg-ink px-6 py-24 text-parchment lg:px-12">
      
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
                {garments.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setGarment(item.label);
                      setAlterationTypes([]);
                    }}
                    className={`rounded-full border px-5 py-4 text-left transition ${
                      garment === item.label
                        ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                        : "border-white/20 hover:border-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="mb-4 text-3xl font-light">
                What does your {garment.toLowerCase()} need?
              </h3>

              <p className="mb-6 text-stone-300">
                Select all that apply. You can add more detail below.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {alterationOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => toggleAlterationType(option.label)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      alterationTypes.includes(option.label)
                        ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                        : "border-white/20 text-[#f5f2eb] hover:border-white"
                    }`}
                  >
                    <p>{option.label}</p>
               
                    <p className="mt-1 text-sm opacity-60 hidden">
                      ${option.price[0]}–${option.price[1]}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  className="text-sm text-stone-300 underline underline-offset-4 hover:text-white"
                >
                  {showDetails ? "Hide additional notes" : "+ Add additional notes"}
                </button>

                {showDetails && (
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm text-stone-300">
                      Tell us a little more
                    </span>

                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="For example: the dress feels tight through the hips, the pants drag when I wear flats, or you'd like to preserve the original jean hem."
                      className="min-h-32 w-full rounded-2xl border border-white/20 bg-transparent p-5 text-[#f5f2eb] placeholder:text-stone-500"
                    />
                  </label>
                )}
              </div>
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
                  className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-[#f5f2eb] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-white hidden"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="mb-6 text-3xl font-light">Reserve Your Fitting</h3>

              <p className="mb-8 text-stone-300">
                Select a convenient fitting time below. We’ll personally review your booking and confirm your appointment shortly.
              </p>

              <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() - 1,
                            1
                          )
                        )
                      }
                      className="text-stone-300 hover:text-white"
                    >
                      ←
                    </button>

                    <p className="text-sm uppercase tracking-[0.25em] text-stone-300">
                      {calendar.monthLabel}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className="text-stone-300 hover:text-white"
                    >
                      →
                    </button>
                  </div>

                  <div className="mb-3 grid grid-cols-7 gap-2 text-center text-xs tracking-[0.2em] text-stone-500">
                    {["Su", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: calendar.firstDayOffset }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}

                    {calendar.days.map((day) => {
                      const dateKey = getDateKey(day);
                      const hasAvailability = availableDateKeys.has(dateKey);
                      const isSelected = selectedDate === dateKey;
                      const isToday = dateKey === getDateKey(new Date());

                      return (
                        <button
                          key={dateKey}
                          type="button"
                          disabled={!hasAvailability}
                          onClick={() => {
                            setSelectedDate(dateKey);
                            setSelectedSlotId("");
                            setNeedsAnotherTime(false);
                          }}
                          className={`relative flex aspect-square flex-col items-center justify-center rounded-full text-sm transition duration-300 ${
                            isSelected
                              ? "bg-[#f5f2eb] text-[#1c1b19]"
                              : hasAvailability
                              ? "text-[#f5f2eb] hover:bg-white/10"
                              : "text-stone-600"
                          } ${isToday && !isSelected ? "ring-1 ring-[#B58A5A]/60" : ""}`}
                        >
                          <span>{day.getDate()}</span>

                          {hasAvailability && !isSelected && (
                            <span className="mt-1 h-1 w-1 rounded-full bg-pea" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  {!selectedDate && (
                    <div className="rounded-3xl border border-white/10 p-6 text-parchment-300">
                      Choose an available date to see fitting times.
                    </div>
                  )}

                  {selectedDate && (
                    <div>
                      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-400">
                        Available fitting times for{" "}
                        {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-1 transition-all duration-600">
                        {selectedDateSlots.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => {
                              setSelectedSlotId(slot.id);
                              setNeedsAnotherTime(false);
                            }}
                            className={`rounded-2xl border p-5 text-left transition ${
                              selectedSlotId === slot.id
                                ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                                : "border-white/20 text-[#f5f2eb] hover:border-white"
                            }`}
                          >
                            <p className="font-medium">
                              {new Date(slot.start_time).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                              <span className="ms-2 mt-1 text-sm opacity-60"> Approximately {getDurationLabel(slot.start_time, slot.end_time)}</span>
                            </p>

                            
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDate("");
                      setSelectedSlotId("");
                      setNeedsAnotherTime(true);
                    }}
                    className={`mt-5 w-full rounded-2xl border p-5 text-left transition ${
                      needsAnotherTime
                        ? "border-[#f5f2eb] bg-[#f5f2eb] text-[#1c1b19]"
                        : "border-white/20 text-[#f5f2eb] hover:border-white"
                    }`}
                  >
                    <p className="font-medium">I don’t see a time that works.</p>
                    <p className="mt-1 text-sm opacity-70">
                      Send your booking request and we’ll follow up with additional fitting options.
                    </p>
                  </button>
                </div>
              </div>
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
                  {estimatedPrice}
                </p>
                {timeline === "5 business days" && (
                  <p className="mt-4 text-stone-600 italic text-sm">Priority turnaround may add up to 50%.</p>
                )}
                {timeline === "48 hours or less" && (
                  <p className="mt-4 text-stone-600 italic text-sm">Rush service may add up to 50% or a wedding emergency minimum.</p>
                )}
              </div>

              <p className="mb-6 text-stone-300">
                Final pricing is confirmed at fitting before work begins.
              </p>

              <button
                onClick={submitBooking}
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-[#f5f2eb] px-8 py-4 text-[#1c1b19] transition hover:bg-white disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Request Booking"}
              </button>
              {submitted && (
                <p className="mt-4 text-stone-300">
                  Thank you. Your booking request has been received.
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