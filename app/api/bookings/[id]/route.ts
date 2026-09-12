import { NextRequest, NextResponse } from "next/server";
import { getBooking } from "@/lib/store";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const booking = getBooking(params.id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
