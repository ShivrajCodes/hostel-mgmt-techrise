import { NextRequest, NextResponse } from "next/server";
import { mockAttendance } from "@/data/mock";

let attendance = [...mockAttendance];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const studentId = searchParams.get("studentId");
  let result = attendance;
  if (date) result = result.filter(a => a.date === date);
  if (studentId) result = result.filter(a => a.studentId === studentId);
  return NextResponse.json({ data: result, total: result.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const existing = attendance.findIndex(a => a.studentId === body.studentId && a.date === body.date);
  if (existing >= 0) {
    attendance[existing] = { ...attendance[existing], ...body };
    return NextResponse.json({ data: attendance[existing] });
  }
  const newRecord = { ...body, id: `A${Date.now()}` };
  attendance.push(newRecord);
  return NextResponse.json({ data: newRecord }, { status: 201 });
}
