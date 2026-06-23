"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["new", "quoted", "scheduled", "in_progress", "completed"];

export default function StatusButtons({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState("");

  async function updateStatus(status: string) {
    setLoadingStatus(status);

    const response = await fetch("/api/request-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    setLoadingStatus("");

    if (!response.ok) {
      alert("Status update failed.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="relative z-10 mt-6 flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => updateStatus(status)}
          disabled={loadingStatus === status}
          className={`cursor-pointer rounded-full border px-3 py-2 text-sm transition ${
            currentStatus === status
              ? "border-black bg-black text-white"
              : "border-stone-300 bg-white text-stone-700 hover:border-black"
          }`}
        >
          {loadingStatus === status ? "Updating..." : status.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}