"use client";
import { useState } from "react";
import { CalendarCheck, Download, UserCheck, UserX, Clock, FileText } from "lucide-react";
import { mockAttendance, mockStudents } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import { Attendance } from "@/types";
import { cn } from "@/lib/utils";

const DATES = ["2025-01-15","2025-01-14","2025-01-13","2025-01-12","2025-01-11"];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(mockAttendance);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [view, setView] = useState<"daily"|"summary">("daily");

  const dayRecords = attendance.filter(a => a.date === selectedDate);
  const present = dayRecords.filter(a => a.status === "present").length;
  const absent = dayRecords.filter(a => a.status === "absent").length;
  const late = dayRecords.filter(a => a.status === "late").length;
  const onLeave = dayRecords.filter(a => a.status === "leave").length;

  const markAttendance = (studentId: string, status: Attendance["status"]) => {
    const exists = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    if (exists) {
      setAttendance(attendance.map(a => a.studentId === studentId && a.date === selectedDate ? {...a, status} : a));
    } else {
      const student = mockStudents.find(s => s.id === studentId);
      setAttendance([...attendance, {
        id: `A${Date.now()}`, studentId, studentName: student?.name || "", date: selectedDate,
        checkIn: status === "present" ? "22:00" : undefined, status
      }]);
    }
  };

  const getStudentAttendance = (studentId: string, date: string) =>
    attendance.find(a => a.studentId === studentId && a.date === date);

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Tracking</div>
          <h1 className="font-display text-4xl font-bold">Attendance</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">Daily check-in & check-out monitoring</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
            <Download className="w-4 h-4" />Export
          </button>
          <div className="flex border-2 border-black overflow-hidden">
            {(["daily","summary"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${view===v?"bg-black text-white":"hover:bg-gray-50"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Present", count: present, icon: UserCheck, inv: true },
          { label: "Absent", count: absent, icon: UserX, inv: false },
          { label: "Late", count: late, icon: Clock, inv: false },
          { label: "On Leave", count: onLeave, icon: FileText, inv: false },
        ].map(s => (
          <div key={s.label} className={cn("p-5 border-2 border-black flex items-center justify-between", s.inv ? "bg-black text-white" : "bg-white")}>
            <div>
              <div className={cn("font-mono text-xs uppercase tracking-widest", s.inv ? "text-white/50" : "text-gray-400")}>{s.label}</div>
              <div className="font-display text-3xl font-bold mt-1">{s.count}</div>
            </div>
            <s.icon className={cn("w-8 h-8", s.inv ? "text-white/30" : "text-gray-200")} />
          </div>
        ))}
      </div>

      {/* Date tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {DATES.map(date => (
          <button key={date} onClick={() => setSelectedDate(date)}
            className={cn("flex-shrink-0 px-4 py-2.5 border-2 border-black font-mono text-xs uppercase tracking-wider transition-colors", selectedDate===date ? "bg-black text-white" : "hover:bg-gray-50")}>
            {new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
          </button>
        ))}
      </div>

      {view === "daily" && (
        <div className="border-2 border-black overflow-hidden">
          <div className="px-6 py-4 bg-black text-white flex items-center justify-between">
            <span className="font-display font-bold">
              {new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </span>
            <div className="flex gap-4 font-mono text-xs text-white/60">
              <span>{present}/{mockStudents.length} present</span>
              <span>{Math.round((present/mockStudents.length)*100)}% rate</span>
            </div>
          </div>
          <table className="data-table w-full">
            <thead><tr className="bg-gray-50">
              <th>Student</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Mark Attendance</th>
            </tr></thead>
            <tbody>
              {mockStudents.map(student => {
                const record = getStudentAttendance(student.id, selectedDate);
                return (
                  <tr key={student.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-sm font-bold">{student.name.charAt(0)}</div>
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="font-mono text-xs text-gray-400">{student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="font-mono text-sm">Room {student.roomNumber || "—"}</span></td>
                    <td><span className="font-mono text-sm">{record?.checkIn || "—"}</span></td>
                    <td><span className="font-mono text-sm">{record?.checkOut || "—"}</span></td>
                    <td>{record ? <Badge status={record.status} /> : <span className="font-mono text-xs text-gray-400">Not marked</span>}</td>
                    <td>
                      <div className="flex gap-1.5">
                        {(["present","absent","late","leave"] as const).map(s => (
                          <button key={s} onClick={() => markAttendance(student.id, s)}
                            className={cn("px-2.5 py-1 border border-black font-mono text-xs uppercase transition-all", record?.status===s ? "bg-black text-white" : "hover:bg-black hover:text-white")}>
                            {s.charAt(0).toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {view === "summary" && (
        <div className="border-2 border-black overflow-hidden">
          <div className="px-6 py-4 bg-black text-white">
            <span className="font-display font-bold">Monthly Summary — January 2025</span>
          </div>
          <table className="data-table w-full">
            <thead><tr className="bg-gray-50">
              <th>Student</th>
              {DATES.map(d => (
                <th key={d}>{new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</th>
              ))}
              <th>Rate</th>
            </tr></thead>
            <tbody>
              {mockStudents.map(student => {
                const records = DATES.map(d => getStudentAttendance(student.id, d));
                const presentCount = records.filter(r => r?.status === "present").length;
                return (
                  <tr key={student.id}>
                    <td><div className="font-medium text-sm">{student.name}</div></td>
                    {records.map((record, i) => (
                      <td key={i}>
                        {record ? (
                          <span className={cn("w-6 h-6 flex items-center justify-center font-mono text-xs font-bold border border-black",
                            record.status==="present" ? "bg-black text-white" :
                            record.status==="absent" ? "bg-white text-black" :
                            record.status==="late" ? "bg-gray-500 text-white" : "bg-gray-200")}>
                            {record.status.charAt(0).toUpperCase()}
                          </span>
                        ) : <span className="font-mono text-xs text-gray-300">—</span>}
                      </td>
                    ))}
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 h-2">
                          <div className="bg-black h-2" style={{ width: `${(presentCount/DATES.length)*100}%` }} />
                        </div>
                        <span className="font-mono text-xs">{Math.round((presentCount/DATES.length)*100)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
