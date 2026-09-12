import { NextResponse } from "next/server";
import { listAllBookings, listTechnicians } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ bookings: listAllBookings(), technicians: listTechnicians() });
}
