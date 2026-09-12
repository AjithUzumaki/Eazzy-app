"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/data";
import { Booking, BookingStatus } from "@/lib/store";

const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  ASSIGNED: "ON_THE_WAY",
  ON_THE_WAY: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
};

const ACTION_LABEL: Partial<Record<BookingStatus, string>> = {
  ASSIGNED: "Start Journey",
  ON_THE_WAY: "Mark Arrived / In Progress",
  IN_PROGRESS: "Mark Completed",
};

export default function TechnicianPage() {
  const [phone, setPhone] = useState("");
  const [loggedInPhone, setLoggedInPhone] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [techName, setTechName] = useState("");

  function load(p: string) {
    fetch(`/api/technician/bookings?phone=${p}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        setTechName(data.technician.name);
        setJobs(data.bookings);
      });
  }

  useEffect(() => {
    if (!loggedInPhone) return;
    load(loggedInPhone);
    const interval = setInterval(() => load(loggedInPhone), 5000);
    return () => clearInterval(interval);
  }, [loggedInPhone]);

  async function advanceStatus(bookingId: string, current: BookingStatus) {
    const next = NEXT_STATUS[current];
    if (!next) return;
    await fetch(`/api/technician/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (loggedInPhone) load(loggedInPhone);
  }

  if (!loggedInPhone) {
    return (
      <div className="mx-auto max-w-sm px-6 py-16">
        <h1 className="font-heading text-2xl font-extrabold text-ink">Technician Login</h1>
        <p className="mt-1 text-sm text-ink/70">
          Demo phones: 9000000001 (Mani), 9000000002 (Suresh), 9000000003 (Karthik)
        </p>
        <div className="mt-6 space-y-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full rounded border border-line px-4 py-3 outline-none focus:border-teal"
          />
          <button
            onClick={() => setLoggedInPhone(phone)}
            className="w-full rounded bg-teal py-3 font-heading font-bold text-paper hover:bg-teal-dark"
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">Hi {techName} 👋</h1>
      <p className="mt-1 text-ink/70">Your assigned jobs</p>

      <div className="mt-6 space-y-3">
        {jobs.length === 0 && <p className="text-ink/70">No jobs assigned yet.</p>}
        {jobs.map((job) => {
          const service = services.find((s) => s.id === job.serviceId);
          return (
            <div key={job.id} className="rounded border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-ink">{service?.name}</span>
                <span className="rounded bg-teal/10 px-2 py-1 text-xs font-medium text-teal">
                  {job.status.replace(/_/g, " ")}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/70">{job.customerName} · {job.customerPhone}</p>
              <p className="mt-1 text-sm text-ink/70">{job.address}</p>
              <p className="mt-1 text-sm text-ink/70">
                {job.slotDate} · {job.slotTime}
              </p>
              {job.notes && <p className="mt-2 text-sm italic text-ink/60">"{job.notes}"</p>}

              {ACTION_LABEL[job.status] && (
                <button
                  onClick={() => advanceStatus(job.id, job.status)}
                  className="mt-3 rounded bg-amber px-4 py-2 text-sm font-bold text-ink hover:bg-amber-dark"
                >
                  {ACTION_LABEL[job.status]}
                </button>
              )}
              {job.status === "COMPLETED" && job.rating && (
                <p className="mt-2 text-sm text-teal">Rated {job.rating}★ — "{job.review}"</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
