"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/data";
import { Booking, Technician } from "@/lib/store";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(data.bookings);
        setTechnicians(data.technicians);
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  async function assign(bookingId: string, technicianId: string) {
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ technicianId }),
    });
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">Bookings</h1>

      {loading && <p className="mt-6 text-ink/70">Loading...</p>}
      {!loading && bookings.length === 0 && <p className="mt-6 text-ink/70">No bookings yet.</p>}

      {bookings.length > 0 && (
        <div className="mt-6 overflow-hidden rounded border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper text-ink/60">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Slot</th>
                <th className="px-4 py-3 font-medium">Paid</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Technician</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const service = services.find((s) => s.id === b.serviceId);
                const tech = technicians.find((t) => t.id === b.technicianId);
                return (
                  <tr key={b.id} className="border-t border-line">
                    <td className="px-4 py-3">{b.customerName}</td>
                    <td className="px-4 py-3">{service?.name}</td>
                    <td className="px-4 py-3">
                      {b.slotDate} {b.slotTime}
                    </td>
                    <td className="px-4 py-3">{b.paid ? "✓" : "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          b.status === "ASSIGNED" || b.status === "COMPLETED"
                            ? "bg-teal/10 text-teal"
                            : "bg-amber/20 text-amber-dark"
                        }`}
                      >
                        {b.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {tech ? (
                        tech.name
                      ) : (
                        <select
                          onChange={(e) => assign(b.id, e.target.value)}
                          defaultValue=""
                          className="rounded border border-line px-2 py-1 text-xs"
                        >
                          <option value="" disabled>
                            Assign...
                          </option>
                          {technicians
                            .filter((t) => t.skills.includes(service?.category ?? ""))
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
