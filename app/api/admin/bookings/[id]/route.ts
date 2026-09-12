import { NextRequest, NextResponse } from "next/server";
import { assignTechnician } from "@/lib/store";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { technicianId } = await req.json();
  const booking = assignTechnician(params.id, technicianId);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
