"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { services } from "@/lib/data";
import { Booking } from "@/lib/store";

export default function OrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      window.location.href = "/login";
      return;
    }
    fetch(`/api/bookings?phone=${session.phone}`)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">My Bookings</h1>

      {loading && <p className="mt-6 text-ink/70">Loading...</p>}
      {!loading && bookings.length === 0 && (
        <p className="mt-6 text-ink/70">
          No bookings yet.{" "}
          <Link href="/" className="text-teal underline">
            Book a service
          </Link>
        </p>
      )}

      <div className="mt-6 space-y-3">
        {bookings.map((b) => {
          const service = services.find((s) => s.id === b.serviceId);
          return (
            <Link
              key={b.id}
              href={`/orders/${b.id}`}
              className="block rounded border border-line bg-white dark:border-white/10 dark:bg-[#1A1A1A] p-4 hover:border-teal"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-ink dark:text-white">{service?.name}</span>
                <span className="rounded bg-teal/10 px-2 py-1 text-xs font-medium text-teal">
                  {b.status.replace(/_/g, " ")}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/70">
                {b.slotDate} · {b.slotTime}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
