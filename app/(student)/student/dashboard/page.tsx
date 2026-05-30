"use client";
import { useEffect, useState } from "react";
import { BedDouble, CreditCard, MessageSquare, CalendarCheck, TrendingUp, Bell, AlertCircle, CheckCircle } from "lucide-react";
import { mockStudents, mockFees, mockComplaints, mockAttendance, mockNotifications } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState("S001");
  const [studentName, setStudentName] = useState("Arjun Sharma");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStudentId(localStorage.getItem("studentId") || "S001");
      setStudentName(localStorage.getItem("studentName") || "Arjun Sharma");
    }
  }, []);

  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const myFees = mockFees.filter(f => f.studentId === student.id);
  const myComplaints = mockComplaints.filter(c => c.studentId === student.id);
  const myAttendance = mockAttendance.filter(a => a.studentId === student.id);
  const pendingFees = myFees.filter(f => f.status !== "paid").reduce((a, f) => a + f.amount, 0);
  const paidFees = myFees.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);
  const presentDays = myAttendance.filter(a => a.status === "present").length;
  const openComplaints = myComplaints.filter(c => c.status === "open" || c.status === "in-progress").length;
  const unreadNotifs = mockNotifications.filter(n => !n.read).length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 animate-fadeIn">
      {/* Welcome banner */}
      <div className="bg-black text-white p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white/5 rounded-full translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-24 w-32 h-32 border-2 border-white/5 rounded-full translate-y-8" />
        <div className="relative">
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">{greeting}</div>
          <h1 className="font-display text-4xl font-bold mb-1">{student.name} 👋</h1>
          <div className="font-mono text-sm text-white/60">{student.course} · Year {student.year} · Room {student.roomNumber || "Not assigned"}</div>
          <div className="flex gap-6 mt-6">
            <div className="border border-white/20 px-4 py-2">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Student ID</div>
              <div className="font-mono font-bold text-lg mt-0.5">{student.id}</div>
            </div>
            <div className="border border-white/20 px-4 py-2">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Joined</div>
              <div className="font-mono font-bold text-lg mt-0.5">{formatDate(student.joinDate)}</div>
            </div>
            <div className="border border-white/20 px-4 py-2">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Status</div>
              <div className="font-mono font-bold text-lg mt-0.5 capitalize">{student.status}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Fees Pending", value: formatCurrency(pendingFees), icon: CreditCard, href: "/student/fees", alert: pendingFees > 0 },
          { label: "Open Complaints", value: openComplaints, icon: MessageSquare, href: "/student/complaints", alert: openComplaints > 0 },
          { label: "Days Present", value: `${presentDays}/${myAttendance.length || 5}`, icon: CalendarCheck, href: "/student/attendance", alert: false },
          { label: "Notifications", value: unreadNotifs, icon: Bell, href: "/student/notifications", alert: unreadNotifs > 0 },
        ].map(card => (
          <Link key={card.label} href={card.href}
            className={`border-2 border-black p-5 card-hover block ${card.alert ? "bg-black text-white" : "bg-white"}`}>
            <div className={`w-8 h-8 border-2 ${card.alert ? "border-white" : "border-black"} flex items-center justify-center mb-3`}>
              <card.icon className="w-4 h-4" />
            </div>
            <div className="font-display text-2xl font-bold">{card.value}</div>
            <div className={`font-mono text-xs uppercase tracking-widest mt-1 ${card.alert ? "text-white/60" : "text-gray-400"}`}>{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Fee progress + Room info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fee card */}
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Finance</div>
              <h2 className="font-display text-xl font-bold">Fee Summary</h2>
            </div>
            <Link href="/student/fees" className="font-mono text-xs border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all">View All</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="border-2 border-black p-4 bg-black text-white">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Paid</div>
              <div className="font-mono text-xl font-bold mt-1">{formatCurrency(paidFees)}</div>
            </div>
            <div className="border-2 border-black p-4">
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Pending</div>
              <div className="font-mono text-xl font-bold mt-1">{formatCurrency(pendingFees)}</div>
            </div>
          </div>
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Overall Progress</div>
          <div className="w-full bg-gray-100 h-4 border-2 border-black">
            <div className="bg-black h-full transition-all" style={{ width: `${(student.feesPaid / student.feesTotal) * 100}%` }} />
          </div>
          <div className="flex justify-between font-mono text-xs mt-2 text-gray-500">
            <span>{formatCurrency(student.feesPaid)} paid</span>
            <span>{Math.round((student.feesPaid / student.feesTotal) * 100)}%</span>
            <span>{formatCurrency(student.feesTotal)} total</span>
          </div>
        </div>

        {/* Room card */}
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Accommodation</div>
              <h2 className="font-display text-xl font-bold">My Room</h2>
            </div>
            <Link href="/student/room" className="font-mono text-xs border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all">View Details</Link>
          </div>
          {student.roomNumber ? (
            <div>
              <div className="text-6xl font-display font-bold mb-4 text-black/10 select-none">{student.roomNumber}</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Room No.", value: student.roomNumber },
                  { label: "Floor", value: "Floor 1" },
                  { label: "Type", value: "Double" },
                  { label: "Amenities", value: "WiFi, AC" },
                ].map(item => (
                  <div key={item.label} className="border-2 border-black p-3">
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">{item.label}</div>
                    <div className="font-medium text-sm mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200">
              <div className="text-center font-mono text-sm text-gray-400">
                <BedDouble className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                No room assigned yet
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My complaints */}
        <div className="border-2 border-black">
          <div className="px-6 py-4 bg-black text-white border-b-2 border-black flex items-center justify-between">
            <span className="font-display font-bold">My Complaints</span>
            <Link href="/student/complaints" className="font-mono text-xs text-white/50 hover:text-white transition-colors">View All →</Link>
          </div>
          {myComplaints.length > 0 ? myComplaints.slice(0, 3).map(c => (
            <div key={c.id} className="px-6 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-sm">{c.title}</div>
                <div className="font-mono text-xs text-gray-400 mt-0.5">{formatDate(c.createdAt)}</div>
              </div>
              <Badge status={c.status} />
            </div>
          )) : (
            <div className="p-8 text-center font-mono text-sm text-gray-400">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-gray-200" />No complaints raised
            </div>
          )}
        </div>

        {/* Recent fees */}
        <div className="border-2 border-black">
          <div className="px-6 py-4 bg-black text-white border-b-2 border-black flex items-center justify-between">
            <span className="font-display font-bold">Recent Fee Records</span>
            <Link href="/student/fees" className="font-mono text-xs text-white/50 hover:text-white transition-colors">View All →</Link>
          </div>
          {myFees.length > 0 ? myFees.slice(0, 4).map(f => (
            <div key={f.id} className="px-6 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-sm capitalize">{f.type} — {f.month}</div>
                <div className="font-mono text-xs text-gray-400 mt-0.5">Due: {formatDate(f.dueDate)}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-sm">{formatCurrency(f.amount)}</div>
                <Badge status={f.status} className="mt-1" />
              </div>
            </div>
          )) : (
            <div className="p-8 text-center font-mono text-sm text-gray-400">
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-200" />No fee records
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
