import { NextRequest, NextResponse } from "next/server";
import { mockNotifications } from "@/data/mock";

let notifications = [...mockNotifications];

export async function GET() {
  return NextResponse.json({ data: notifications, total: notifications.length, unread: notifications.filter(n=>!n.read).length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newN = { ...body, id: `N${String(notifications.length+1).padStart(3,"0")}`, createdAt: new Date().toISOString(), read: false };
  notifications.unshift(newN);
  return NextResponse.json({ data: newN }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (body.markAllRead) {
    notifications = notifications.map(n => ({...n, read: true}));
  } else {
    notifications = notifications.map(n => n.id === body.id ? {...n, read: true} : n);
  }
  return NextResponse.json({ data: notifications });
}
