import { NextRequest, NextResponse } from "next/server";
import { updateStatus, BookingStatus } from "@/lib/store";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = (await req.json()) as { status: BookingStatus };
  const booking = updateStatus(params.id, status);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
