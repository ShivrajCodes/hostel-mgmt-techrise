import { NextRequest, NextResponse } from "next/server";
import { mockRooms } from "@/data/mock";

let rooms = [...mockRooms];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  let result = rooms;
  if (status) result = result.filter(r => r.status === status);
  if (type) result = result.filter(r => r.type === type);
  return NextResponse.json({ data: result, total: result.length, available: result.filter(r=>r.status==="available").length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newRoom = { ...body, id: `R${body.number}`, occupied: 0, students: [], status: "available" };
  rooms.push(newRoom);
  return NextResponse.json({ data: newRoom }, { status: 201 });
}
