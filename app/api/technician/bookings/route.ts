import { NextRequest, NextResponse } from "next/server";
import { getTechnicianByPhone, listTechnicianBookings } from "@/lib/store";

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "phone is required" }, { status: 400 });

  const technician = getTechnicianByPhone(phone);
  if (!technician) return NextResponse.json({ error: "Technician not found" }, { status: 404 });

  return NextResponse.json({ technician, bookings: listTechnicianBookings(technician.id) });
}
