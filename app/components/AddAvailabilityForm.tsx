"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function AddAvailabilityForm() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("30");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function addSlot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, startTime, duration, notes }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Could not add availability.");
      return;
    }

    setDate("");
    setStartTime("");
    setNotes("");
    router.refresh();
  }

  return (
    <form onSubmit={addSlot} className="rounded-[2rem] bg-white p-6">
      <h2 className="font-serif text-3xl">Add Availability</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="rounded-xl border border-ink/15 px-4 py-3"
        />

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="rounded-xl border border-ink/15 px-4 py-3"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-xl border border-ink/15 px-4 py-3"
        >
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
          <option value="120">120 minutes</option>
        </select>

        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="rounded-xl border border-ink/15 px-4 py-3"
        />
      </div>

      <div className="mt-6">
        <Button className="w-full" type="submit">
          {loading ? "Adding..." : "Add Slot"}
        </Button>
      </div>
    </form>
  );
}