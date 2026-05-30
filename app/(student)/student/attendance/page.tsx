"use client";
import { useEffect, useState } from "react";
import { CalendarCheck, UserCheck, UserX, Clock, FileText } from "lucide-react";
import { mockAttendance } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const MONTH_DATES = [
  "2025-01-15","2025-01-14","2025-01-13","2025-01-12","2025-01-11",
  "2025-01-10","2025-01-09","2025-01-08","2025-01-07","2025-01-06",
];

export default function StudentAttendancePage() {
  const [studentId, setStudentId] = useState("S001");
  useEffect(() => {
    if (typeof window !== "undefined") setStudentId(localStorage.getItem("studentId") || "S001");
  }, []);

  const myAttendance = mockAttendance.filter(a => a.studentId === studentId);
  const present = myAttendance.filter(a => a.status === "present").length;
  const absent = myAttendance.filter(a => a.status === "absent").length;
  const late = myAttendance.filter(a => a.status === "late").length;
  const onLeave = myAttendance.filter(a => a.status === "leave").length;
  const total = MONTH_DATES.length;
  const rate = Math.round((present / total) * 100);

  const getRecord = (date: string) => myAttendance.find(a => a.date === date);

  const statusConfig = {
    present: { color: "bg-black text-white", label: "P" },
    absent: { color: "bg-white text-black border-2 border-black", label: "A" },
    late: { color: "bg-gray-600 text-white", label: "L" },
    leave: { color: "bg-gray-200 text-gray-700", label: "LE" },
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8 border-b-2 border-black pb-6">
        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Tracking</div>
        <h1 className="font-display text-4xl font-bold">My Attendance</h1>
        <p className="font-mono text-sm text-gray-500 mt-1">January 2025</p>
      </div>

      {/* Circular rate display */}
      <div className="flex gap-6 mb-8">
        <div className="border-2 border-black p-8 flex flex-col items-center justify-center w-48">
          <div className="font-mono text-5xl font-bold">{rate}%</div>
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mt-2">Attendance Rate</div>
          <div className={cn("mt-3 font-mono text-xs px-3 py-1 border-2 border-black font-bold uppercase", rate >= 75 ? "bg-black text-white" : "bg-white text-black")}>
            {rate >= 85 ? "Excellent" : rate >= 75 ? "Good" : "Low"}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Present", count: present, icon: UserCheck, inv: true },
            { label: "Absent", count: absent, icon: UserX, inv: false },
            { label: "Late", count: late, icon: Clock, inv: false },
            { label: "On Leave", count: onLeave, icon: FileText, inv: false },
          ].map(s => (
            <div key={s.label} className={cn("border-2 border-black p-5 flex flex-col justify-between", s.inv ? "bg-black text-white" : "bg-white")}>
              <s.icon className={cn("w-5 h-5 mb-3", s.inv ? "text-white/40" : "text-gray-300")} />
              <div>
                <div className="font-display text-3xl font-bold">{s.count}</div>
                <div className={cn("font-mono text-xs uppercase tracking-widest mt-1", s.inv ? "text-white/50" : "text-gray-400")}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning if low */}
      {rate < 75 && (
        <div className="border-2 border-black bg-black text-white p-5 mb-6 font-mono text-sm">
          ⚠ Your attendance is below 75%. Please ensure regular check-ins to avoid demerits.
        </div>
      )}

      {/* Calendar grid */}
      <div className="border-2 border-black mb-6">
        <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
          <span className="font-display font-bold">January 2025 — Attendance Calendar</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {MONTH_DATES.map(date => {
              const record = getRecord(date);
              const day = new Date(date).getDate();
              const s = record?.status as keyof typeof statusConfig | undefined;
              const config = s ? statusConfig[s] : null;
              return (
                <div key={date} className="text-center">
                  <div className="font-mono text-xs text-gray-400 mb-1">{day}</div>
                  <div className={cn("w-10 h-10 mx-auto border-2 border-black flex items-center justify-center font-mono text-xs font-bold", config ? config.color : "bg-gray-100 text-gray-300")}>
                    {config ? config.label : "—"}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex gap-6 mt-5 font-mono text-xs text-gray-500">
            {Object.entries(statusConfig).map(([status, conf]) => (
              <span key={status} className="flex items-center gap-2">
                <span className={cn("w-5 h-5 flex items-center justify-center text-xs border border-black font-bold", conf.color)}>{conf.label}</span>
                <span className="capitalize">{status}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Detail list */}
      <div className="border-2 border-black overflow-hidden">
        <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
          <span className="font-display font-bold">Detailed Records</span>
        </div>
        <table className="data-table w-full">
          <thead><tr className="bg-gray-50">
            <th>Date</th><th>Day</th><th>Check In</th><th>Check Out</th><th>Status</th>
          </tr></thead>
          <tbody>
            {MONTH_DATES.map(date => {
              const record = getRecord(date);
              return (
                <tr key={date}>
                  <td><span className="font-mono text-sm">{new Date(date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span></td>
                  <td><span className="font-mono text-sm text-gray-400">{new Date(date).toLocaleDateString("en-IN",{weekday:"long"})}</span></td>
                  <td><span className="font-mono text-sm">{record?.checkIn || "—"}</span></td>
                  <td><span className="font-mono text-sm">{record?.checkOut || "—"}</span></td>
                  <td>{record ? <Badge status={record.status} /> : <span className="font-mono text-xs text-gray-300">Not recorded</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
