"use client";

export default function Ticker() {
  const items = [
    "🏠 HOSTELIQ MANAGEMENT SYSTEM",
    "📊 Total Occupancy: 75%",
    "💰 Fee Collection: ₹1,24,000 this month",
    "🔧 3 Active Maintenance Requests",
    "📅 Next Fee Due: February 5, 2025",
    "🎓 8 Students Currently Enrolled",
    "🛏️ 10 Rooms — 4 Available",
    "⚠️ 2 Urgent Complaints Pending",
    "✅ Attendance Today: 85%",
  ];

  const content = [...items, ...items].join("   ◆   ");

  return (
    <div className="ticker-container">
      <div className="ticker-content font-mono text-xs tracking-widest">
        {content}&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;{content}
      </div>
    </div>
  );
}
