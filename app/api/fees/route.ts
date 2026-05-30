import { NextRequest, NextResponse } from "next/server";
import { mockFees } from "@/data/mock";

let fees = [...mockFees];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const studentId = searchParams.get("studentId");
  let result = fees;
  if (status) result = result.filter(f => f.status === status);
  if (studentId) result = result.filter(f => f.studentId === studentId);
  const total = result.reduce((a,f) => a+f.amount, 0);
  const collected = result.filter(f=>f.status==="paid").reduce((a,f)=>a+f.amount,0);
  return NextResponse.json({ data: result, total, collected, pending: total - collected });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newFee = { ...body, id: `F${String(fees.length+1).padStart(3,"0")}`, status: "pending" };
  fees.push(newFee);
  return NextResponse.json({ data: newFee }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  fees = fees.map(f => f.id === body.id ? { ...f, ...body, paidDate: new Date().toISOString().split("T")[0] } : f);
  return NextResponse.json({ data: fees.find(f=>f.id===body.id) });
}
