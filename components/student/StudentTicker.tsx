"use client";
export default function StudentTicker() {
  const items = [
    "🎓 HOSTELIQ STUDENT PORTAL",
    "📅 February rent due on 5th Feb",
    "🍽️ Special menu on Republic Day — 26th Jan",
    "🔧 Water supply off 20th Jan: 10AM–2PM",
    "✅ Your complaint C001 is In Progress",
    "💰 Outstanding dues: ₹12,000",
    "🏠 Room 101 — Floor 1",
    "📊 Your attendance this month: 82%",
  ];
  const content = [...items, ...items].join("   ◆   ");
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 border-b-2 border-black">
      <div className="inline-block font-mono text-xs tracking-widest" style={{ animation: "ticker 30s linear infinite" }}>
        {content}&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;{content}
      </div>
      <style>{`@keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
