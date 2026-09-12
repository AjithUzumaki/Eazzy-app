"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { services } from "@/lib/data";

interface BookingResponse {
  id: string;
  serviceId: string;
  amount: number;
}

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const bookingId = params.get("id");
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((data) => setBooking(data.booking));
  }, [bookingId]);

  async function pay() {
    if (!bookingId) return;
    setPaying(true);
    // Simulated payment success. Real integration: open Razorpay Checkout here,
    // and only call this endpoint after the webhook confirms payment server-side.
    await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });
    setPaying(false);
    router.push(`/orders/${bookingId}`);
  }

  if (!booking) {
    return <div className="mx-auto max-w-sm px-6 py-16 text-center text-ink/70">Loading...</div>;
  }

  const service = services.find((s) => s.id === booking.serviceId);

  return (
    <div className="mx-auto max-w-sm px-6 py-16 text-center">
      <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">Payment</h1>
      <p className="mt-2 text-ink/70">{service?.name}</p>
      <p className="mt-4 font-heading text-4xl font-extrabold text-teal">₹{booking.amount}</p>

      <button
        onClick={pay}
        disabled={paying}
        className="mt-8 w-full rounded bg-amber py-3 font-heading font-bold text-ink hover:bg-amber-dark disabled:opacity-40"
      >
        {paying ? "Processing..." : "Pay Now (UPI / Card / Wallet)"}
      </button>
      <p className="mt-3 text-xs text-ink/50">Payments secured by Razorpay</p>
    </div>
  );
}
