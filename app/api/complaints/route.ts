import { NextRequest, NextResponse } from "next/server";
import { mockComplaints } from "@/data/mock";

let complaints = [...mockComplaints];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  let result = complaints;
  if (status) result = result.filter(c => c.status === status);
  if (priority) result = result.filter(c => c.priority === priority);
  return NextResponse.json({ data: result, total: result.length, open: result.filter(c=>c.status==="open").length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newC = { ...body, id: `C${String(complaints.length+1).padStart(3,"0")}`, status: "open", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  complaints.push(newC);
  return NextResponse.json({ data: newC }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  complaints = complaints.map(c => c.id === body.id ? { ...c, ...body, updatedAt: new Date().toISOString() } : c);
  return NextResponse.json({ data: complaints.find(c=>c.id===body.id) });
}
