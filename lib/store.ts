// In-memory store so the whole app works end-to-end without a real database yet.
// Data resets when the dev server restarts. Swap each function's body for a
// Prisma call (see prisma/schema.prisma) when you're ready to go live —
// the function signatures are designed to map 1:1 onto Prisma queries.

import { services } from "./data";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ASSIGNED"
  | "ON_THE_WAY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Technician {
  id: string;
  name: string;
  phone: string;
  skills: string[]; // ServiceCategory keys, e.g. "AC", "RO"
  zone: string;
  available: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  address: string;
  slotDate: string;
  slotTime: string;
  notes: string;
  amount: number;
  status: BookingStatus;
  paid: boolean;
  technicianId: string | null;
  rating: number | null;
  review: string | null;
  createdAt: string;
}

// Use globalThis so the store survives Next.js dev-server hot reloads.
const g = globalThis as unknown as { __eazzyStore?: { bookings: Booking[]; technicians: Technician[] } };

if (!g.__eazzyStore) {
  g.__eazzyStore = {
    technicians: [
      { id: "t1", name: "Mani", phone: "9000000001", skills: ["AC", "GEYSER"], zone: "Chennai", available: true },
      { id: "t2", name: "Suresh", phone: "9000000002", skills: ["WASHING_MACHINE"], zone: "Chennai", available: true },
      { id: "t3", name: "Karthik", phone: "9000000003", skills: ["RO", "GEYSER"], zone: "Chennai", available: true },
    ],
    bookings: [],
  };
}

const store = g.__eazzyStore;

export function createBooking(input: {
  customerName: string;
  customerPhone: string;
  serviceId: string;
  address: string;
  slotDate: string;
  slotTime: string;
  notes: string;
}): Booking {
  const service = services.find((s) => s.id === input.serviceId);
  const booking: Booking = {
    id: `bk_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    ...input,
    amount: service?.price ?? 0,
    status: "PENDING",
    paid: false,
    technicianId: null,
    rating: null,
    review: null,
    createdAt: new Date().toISOString(),
  };
  store.bookings.unshift(booking);
  return booking;
}

export function getBooking(id: string): Booking | undefined {
  return store.bookings.find((b) => b.id === id);
}

export function listBookingsByPhone(phone: string): Booking[] {
  return store.bookings.filter((b) => b.customerPhone === phone);
}

export function listAllBookings(): Booking[] {
  return store.bookings;
}

export function listTechnicians(): Technician[] {
  return store.technicians;
}

export function listTechnicianBookings(technicianId: string): Booking[] {
  return store.bookings.filter((b) => b.technicianId === technicianId);
}

export function getTechnicianByPhone(phone: string): Technician | undefined {
  return store.technicians.find((t) => t.phone === phone);
}

export function markPaid(id: string): Booking | undefined {
  const b = getBooking(id);
  if (!b) return undefined;
  b.paid = true;
  b.status = "CONFIRMED";
  return b;
}

export function assignTechnician(bookingId: string, technicianId: string): Booking | undefined {
  const b = getBooking(bookingId);
  if (!b) return undefined;
  b.technicianId = technicianId;
  b.status = "ASSIGNED";
  return b;
}

export function updateStatus(bookingId: string, status: BookingStatus): Booking | undefined {
  const b = getBooking(bookingId);
  if (!b) return undefined;
  b.status = status;
  return b;
}

export function addReview(bookingId: string, rating: number, review: string): Booking | undefined {
  const b = getBooking(bookingId);
  if (!b) return undefined;
  b.rating = rating;
  b.review = review;
  return b;
}
