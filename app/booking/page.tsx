"use client";

import { Suspense, useEffect, useState } from "react";
import { services } from "@/lib/data";
import { useSearchParams, useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

const SLOTS = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"];

export default function BookingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}

function BookingForm() {
  const params = useSearchParams();
  const router = useRouter();
  const serviceId = params.get("service");
  const service = services.find((s) => s.id === serviceId);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push(`/login?next=/booking?service=${serviceId}`);
    }
  }, [router, serviceId]);

  async function confirmBooking() {
    const session = getSession();
    if (!session || !service) return;

    setSubmitting(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: session.name,
        customerPhone: session.phone,
        serviceId: service.id,
        address,
        slotDate: date,
        slotTime: slot,
        notes,
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    router.push(`/booking/payment?id=${data.booking.id}`);
  }

  if (!service) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-ink/70">No service selected. Go back and pick one.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">Book: {service.name}</h1>
      <p className="mt-1 text-ink/70">₹{service.price} · approx {service.durationMin} min</p>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white">Time slot</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`rounded border px-3 py-2 text-sm ${
                  slot === s ? "border-teal bg-teal/10 text-teal" : "border-line text-ink/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white">Service address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House/flat no., street, area, pincode"
            rows={3}
            className="mt-2 w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white">Describe the issue (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. AC not cooling since yesterday"
            rows={2}
            className="mt-2 w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
        </div>

        <button
          onClick={confirmBooking}
          disabled={!date || !slot || !address || submitting}
          className="w-full rounded bg-amber py-3 font-heading font-bold text-ink hover:bg-amber-dark disabled:opacity-40"
        >
          {submitting ? "Booking..." : `Continue to Payment · ₹${service.price}`}
        </button>
      </div>
    </div>
  );
}