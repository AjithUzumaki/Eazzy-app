"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { services } from "@/lib/data";
import { Booking, BookingStatus } from "@/lib/store";

const STEPS: BookingStatus[] = ["CONFIRMED", "ASSIGNED", "ON_THE_WAY", "IN_PROGRESS", "COMPLETED"];
const LABELS: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  ASSIGNED: "Technician Assigned",
  ON_THE_WAY: "On the Way",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = () =>
      fetch(`/api/bookings/${id}`)
        .then((r) => r.json())
        .then((data) => setBooking(data.booking));
    load();
    const interval = setInterval(load, 4000); // poll for status updates
    return () => clearInterval(interval);
  }, [id]);

  async function submitReview() {
    await fetch(`/api/bookings/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review }),
    });
    setSubmitted(true);
  }

  if (!booking) {
    return <div className="mx-auto max-w-lg px-6 py-16 text-center text-ink/70">Loading...</div>;
  }

  const service = services.find((s) => s.id === booking.serviceId);
  const currentIndex = STEPS.indexOf(booking.status);

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">{service?.name}</h1>
      <p className="mt-1 text-ink/70">
        {booking.slotDate} · {booking.slotTime}
      </p>

      <div className="mt-8 space-y-4">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${
                i <= currentIndex ? "bg-teal" : "bg-line"
              }`}
            />
            <span className={i <= currentIndex ? "font-medium text-ink dark:text-white" : "text-ink/40"}>
              {LABELS[step]}
            </span>
          </div>
        ))}
      </div>

      {booking.status === "COMPLETED" && !submitted && (
        <div className="mt-10 rounded border border-line bg-white dark:border-white/10 dark:bg-[#1A1A1A] p-5">
          <h3 className="font-heading font-bold text-ink dark:text-white">Rate your service</h3>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={`text-2xl ${n <= rating ? "text-amber" : "text-line"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="How was the technician's work?"
            rows={3}
            className="mt-3 w-full rounded border border-line px-3 py-2 text-sm outline-none focus:border-teal"
          />
          <button
            onClick={submitReview}
            disabled={!rating}
            className="mt-3 rounded bg-teal px-4 py-2 text-sm font-bold text-paper hover:bg-teal-dark disabled:opacity-40"
          >
            Submit review
          </button>
        </div>
      )}

      {submitted && (
        <p className="mt-10 rounded border border-teal/30 bg-teal/10 p-4 text-sm text-teal">
          Thanks for your feedback!
        </p>
      )}
    </div>
  );
}
