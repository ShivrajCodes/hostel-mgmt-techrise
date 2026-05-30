"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BedDouble, CreditCard, MessageSquare, CalendarCheck, Bell, LogOut, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/rooms", label: "Rooms", icon: BedDouble },
  { href: "/fees", label: "Fees", icon: CreditCard },
  { href: "/complaints", label: "Complaints", icon: MessageSquare },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-black text-white flex flex-col border-r-2 border-black">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-display font-800 text-lg leading-none tracking-tight text-white">HOSTELIQ</div>
            <div className="font-mono text-xs text-white/40 tracking-widest mt-0.5">MANAGEMENT SYSTEM</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all group relative",
                active
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-display tracking-wide">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm font-mono">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">Admin</div>
            <div className="text-white/40 text-xs font-mono">admin@hosteliq.in</div>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 px-2 py-2 text-white/50 hover:text-white text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-display">Sign out</span>
        </Link>
      </div>
    </aside>
  );
}
