"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/students": "Students",
  "/rooms": "Rooms",
  "/fees": "Fees",
  "/complaints": "Complaints",
  "/attendance": "Attendance",
  "/notifications": "Notifications",
};

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const title = titles[pathname] || segments[segments.length - 1] || "Dashboard";

  return (
    <header className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-white sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
        <span>HOSTELIQ</span>
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            <span className={i === segments.length - 1 ? "text-black font-bold uppercase tracking-widest" : "uppercase tracking-widest"}>
              {seg}
            </span>
          </span>
        ))}
      </div>

      {/* Search + Notifications */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border-2 border-black px-3 py-1.5 bg-white">
          <Search className="w-3.5 h-3.5" />
          <input
            placeholder="Search..."
            className="text-sm font-mono bg-transparent outline-none w-40 placeholder:text-gray-400"
          />
        </div>
        <button className="relative p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full text-xs font-mono flex items-center justify-center">2</span>
        </button>
      </div>
    </header>
  );
}
