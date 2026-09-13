import { NextRequest, NextResponse } from "next/server";
import { createBooking, listBookingsByPhone } from "@/lib/store";
import { sendNewBookingAlert } from "@/lib/email";

// POST /api/bookings — create a new booking
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerName, customerPhone, serviceId, address, slotDate, slotTime, notes } = body;

  if (!customerName || !customerPhone || !serviceId || !address || !slotDate || !slotTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const booking = createBooking({
    customerName,
    customerPhone,
    serviceId,
    address,
    slotDate,
    slotTime,
    notes: notes ?? "",
  });

  sendNewBookingAlert(booking);

  return NextResponse.json({ booking });
}

// GET /api/bookings?phone=9000000000 — list a customer's bookings
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "phone is required" }, { status: 400 });
  return NextResponse.json({ bookings: listBookingsByPhone(phone) });
}