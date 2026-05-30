import { NextRequest, NextResponse } from "next/server";
import { mockStudents } from "@/data/mock";

let students = [...mockStudents];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  let result = students;
  if (status) result = result.filter(s => s.status === status);
  if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));
  return NextResponse.json({ data: result, total: result.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newStudent = { ...body, id: `S${String(students.length+1).padStart(3,"0")}`, joinDate: new Date().toISOString().split("T")[0], feesPaid: 0, feesTotal: 36000 };
  students.push(newStudent);
  return NextResponse.json({ data: newStudent }, { status: 201 });
}
