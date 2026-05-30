"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CreditCard, MessageSquare, CalendarCheck, Bell, LogOut, GraduationCap, BedDouble, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/student/dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/student/room", label: "My Room", icon: BedDouble },
  { href: "/student/fees", label: "My Fees", icon: CreditCard },
  { href: "/student/complaints", label: "My Complaints", icon: MessageSquare },
  { href: "/student/attendance", label: "My Attendance", icon: CalendarCheck },
  { href: "/student/notifications", label: "Notifications", icon: Bell },
  { href: "/student/profile", label: "My Profile", icon: User },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStudentName(localStorage.getItem("studentName") || "Student");
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
    }
    router.push("/student-login");
  };

  return (
    <aside className="w-64 min-h-screen flex flex-col border-r-2 border-black" style={{ background: "#0a0a0a" }}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-display font-bold text-lg text-white tracking-tight">HOSTELIQ</div>
            <div className="font-mono text-xs text-white/30 tracking-widest mt-0.5">STUDENT PORTAL</div>
          </div>
        </div>
      </div>

      {/* Student badge */}
      <div className="mx-4 mt-4 mb-2 border border-white/10 p-3 bg-white/5">
        <div className="font-mono text-xs text-white/30 uppercase tracking-widest mb-1">Logged in as</div>
        <div className="text-white font-display font-bold text-sm truncate">{studentName}</div>
        <div className="w-full bg-white/10 h-0.5 mt-2">
          <div className="bg-white h-0.5 w-2/3" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all relative",
                active ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/5")}>
              {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />}
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-display tracking-wide">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors text-sm font-display">
          <LogOut className="w-4 h-4" />Sign out
        </button>
      </div>
    </aside>
  );
}
