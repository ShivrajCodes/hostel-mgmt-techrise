"use client";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const titles: Record<string, string> = {
  "/student/dashboard": "Dashboard",
  "/student/room": "My Room",
  "/student/fees": "My Fees",
  "/student/complaints": "My Complaints",
  "/student/attendance": "My Attendance",
  "/student/notifications": "Notifications",
  "/student/profile": "My Profile",
};

export default function StudentHeader() {
  const pathname = usePathname();
  const [studentName, setStudentName] = useState("");
  const segments = pathname.split("/").filter(Boolean);
  const title = titles[pathname] || "Student Portal";

  useEffect(() => {
    if (typeof window !== "undefined") setStudentName(localStorage.getItem("studentName") || "");
  }, []);

  return (
    <header className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
        <span>STUDENT</span>
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            <span className={i === segments.length - 1 ? "text-black font-bold uppercase tracking-widest" : "uppercase tracking-widest"}>{seg}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {studentName && (
          <div className="flex items-center gap-2 border-r-2 border-black pr-4">
            <div className="w-7 h-7 bg-black text-white flex items-center justify-center font-mono text-xs font-bold">
              {studentName.charAt(0)}
            </div>
            <span className="font-display text-sm font-medium">{studentName}</span>
          </div>
        )}
        <button className="relative p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full text-xs font-mono flex items-center justify-center">2</span>
        </button>
      </div>
    </header>
  );
}
