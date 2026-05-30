"use client";
import { Users, BedDouble, CreditCard, MessageSquare, TrendingUp, TrendingDown, CalendarCheck, AlertCircle } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import { mockStudents, mockRooms, mockFees, mockComplaints, mockAttendance } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const feeChartData = [
  { month: "Aug", collected: 45000, pending: 12000 },
  { month: "Sep", collected: 52000, pending: 8000 },
  { month: "Oct", collected: 48000, pending: 15000 },
  { month: "Nov", collected: 61000, pending: 5000 },
  { month: "Dec", collected: 55000, pending: 9000 },
  { month: "Jan", collected: 38000, pending: 22000 },
];

const occupancyData = [
  { month: "Aug", rate: 60 },{ month: "Sep", rate: 72 },{ month: "Oct", rate: 75 },
  { month: "Nov", rate: 80 },{ month: "Dec", rate: 78 },{ month: "Jan", rate: 75 },
];

export default function DashboardPage() {
  const activeStudents = mockStudents.filter(s => s.status === "active").length;
  const availableRooms = mockRooms.filter(r => r.status === "available").length;
  const collectedFees = mockFees.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);
  const pendingFees = mockFees.filter(f => f.status !== "paid").reduce((a, f) => a + f.amount, 0);
  const openComplaints = mockComplaints.filter(c => c.status === "open" || c.status === "in-progress").length;
  const todayPresent = mockAttendance.filter(a => a.status === "present").length;

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8 border-b-2 border-black pb-6">
        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Overview</div>
        <h1 className="font-display text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2 font-mono text-sm">Friday, January 15, 2025 — All systems operational</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Students" value={mockStudents.length} icon={Users} sub={`${activeStudents} active`} inverted />
        <StatCard label="Available Rooms" value={availableRooms} icon={BedDouble} sub={`of ${mockRooms.length} total`} />
        <StatCard label="Fees Collected" value={formatCurrency(collectedFees)} icon={CreditCard} sub="this month" inverted />
        <StatCard label="Open Complaints" value={openComplaints} icon={MessageSquare} sub={`${mockComplaints.filter(c=>c.priority==="urgent").length} urgent`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 border-2 border-black p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Revenue</div>
              <h2 className="font-display text-xl font-bold">Fee Collection Trend</h2>
            </div>
            <div className="flex gap-4 font-mono text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-black inline-block" /> Collected</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-300 inline-block" /> Pending</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={feeChartData} barGap={4}>
              <XAxis dataKey="month" tick={{ fontFamily: "Space Mono", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "Space Mono", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${v/1000}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ fontFamily: "Space Mono", fontSize: 11, border: "2px solid #000", borderRadius: 0 }} />
              <Bar dataKey="collected" fill="#000" radius={0} />
              <Bar dataKey="pending" fill="#d1d5db" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border-2 border-black p-6">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Occupancy</div>
          <h2 className="font-display text-xl font-bold mb-6">Room Occupancy %</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={occupancyData}>
              <XAxis dataKey="month" tick={{ fontFamily: "Space Mono", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontFamily: "Space Mono", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontFamily: "Space Mono", fontSize: 11, border: "2px solid #000", borderRadius: 0 }} />
              <Line type="monotone" dataKey="rate" stroke="#000" strokeWidth={2} dot={{ fill: "#000", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-2 border-black">
          <div className="px-6 py-4 border-b-2 border-black bg-black text-white flex items-center justify-between">
            <h2 className="font-display font-bold">Recent Complaints</h2>
            <AlertCircle className="w-4 h-4" />
          </div>
          {mockComplaints.slice(0, 4).map(c => (
            <div key={c.id} className="px-6 py-4 border-b border-gray-100 flex items-start justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-sm">{c.title}</div>
                <div className="font-mono text-xs text-gray-400 mt-0.5">{c.studentName} · Room {c.roomNumber}</div>
              </div>
              <Badge status={c.status} />
            </div>
          ))}
        </div>

        <div className="border-2 border-black">
          <div className="px-6 py-4 border-b-2 border-black bg-black text-white flex items-center justify-between">
            <h2 className="font-display font-bold">Today&apos;s Overview</h2>
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { label: "Present Today", value: todayPresent, icon: TrendingUp, inv: true },
              { label: "Fee Overdue", value: mockFees.filter(f=>f.status==="overdue").length, icon: TrendingDown, inv: false },
              { label: "Pending Fees", value: formatCurrency(pendingFees), icon: CreditCard, inv: true },
              { label: "Maintenance Rooms", value: mockRooms.filter(r=>r.status==="maintenance").length, icon: BedDouble, inv: false },
            ].map(item => (
              <div key={item.label} className={`p-4 border-2 border-black ${item.inv ? "bg-black text-white" : "bg-white text-black"}`}>
                <div className="font-display text-2xl font-bold">{item.value}</div>
                <div className="font-mono text-xs uppercase tracking-widest mt-1 opacity-60">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <div className="border-2 border-black p-4">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Room Occupancy Rate</div>
              <div className="w-full bg-gray-200 h-4"><div className="bg-black h-4" style={{ width: "75%" }} /></div>
              <div className="flex justify-between font-mono text-xs mt-2">
                <span>0%</span><span className="font-bold">75% Occupied</span><span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
