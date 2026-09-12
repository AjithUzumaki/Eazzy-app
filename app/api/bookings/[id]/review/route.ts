import { NextRequest, NextResponse } from "next/server";
import { addReview } from "@/lib/store";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { rating, review } = await req.json();
  const booking = addReview(params.id, rating, review ?? "");
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
