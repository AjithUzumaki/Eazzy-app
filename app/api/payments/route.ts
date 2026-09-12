import { NextRequest, NextResponse } from "next/server";
import { markPaid } from "@/lib/store";

// This simulates a successful payment so the full flow works without real
// Razorpay keys yet. To go live:
//  1. Create a Razorpay order here: razorpayInstance.orders.create({ amount, currency: "INR" })
//  2. Return the order ID to the client, open Razorpay Checkout with it
//  3. On success, Razorpay calls your webhook — verify the signature there
//     before calling markPaid(bookingId). Never trust a client-side "success"
//     callback alone for real payments.
export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();
  const booking = markPaid(bookingId);
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
