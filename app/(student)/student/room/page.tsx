"use client";
import { useEffect, useState } from "react";
import { BedDouble, Wifi, Wind, Bath, Star, Users, MapPin, DollarSign } from "lucide-react";
import { mockStudents, mockRooms } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

const amenityIcons: Record<string, React.ElementType> = {
  "WiFi": Wifi, "AC": Wind, "Fan": Wind, "Attached Bathroom": Bath,
  "Common Bathroom": Bath, "Balcony": Star, "City View": Star,
};

export default function StudentRoomPage() {
  const [studentId, setStudentId] = useState("S001");
  useEffect(() => {
    if (typeof window !== "undefined") setStudentId(localStorage.getItem("studentId") || "S001");
  }, []);

  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const room = mockRooms.find(r => r.id === student.roomId);
  const roommates = mockStudents.filter(s => s.roomId === student.roomId && s.id !== student.id);

  if (!room) return (
    <div className="p-8">
      <div className="border-2 border-black p-16 text-center">
        <BedDouble className="w-12 h-12 mx-auto mb-4 text-gray-200" />
        <div className="font-display text-xl font-bold mb-2">No Room Assigned</div>
        <div className="font-mono text-sm text-gray-400">Please contact hostel administration</div>
      </div>
    </div>
  );

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8 border-b-2 border-black pb-6">
        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Accommodation</div>
        <h1 className="font-display text-4xl font-bold">My Room</h1>
        <p className="font-mono text-sm text-gray-500 mt-1">Room {room.number} · Floor {room.floor}</p>
      </div>

      {/* Room hero */}
      <div className="bg-black text-white p-8 mb-6 relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 font-display font-bold" style={{ fontSize: "120px", lineHeight: 1 }}>{room.number}</div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Room Number", value: room.number, icon: BedDouble },
            { label: "Floor", value: `Floor ${room.floor}`, icon: MapPin },
            { label: "Type", value: room.type, icon: Users },
            { label: "Monthly Rent", value: formatCurrency(room.pricePerMonth), icon: DollarSign },
          ].map(item => (
            <div key={item.label}>
              <item.icon className="w-5 h-5 text-white/30 mb-2" />
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">{item.label}</div>
              <div className="font-display font-bold text-lg mt-1 capitalize">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Amenities */}
        <div className="border-2 border-black p-6">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Facilities</div>
          <h2 className="font-display text-xl font-bold mb-5">Room Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {room.amenities.map(a => {
              const Icon = amenityIcons[a] || BedDouble;
              return (
                <div key={a} className="flex items-center gap-3 border-2 border-black p-3">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display text-sm font-medium">{a}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Occupancy */}
        <div className="border-2 border-black p-6">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Sharing</div>
          <h2 className="font-display text-xl font-bold mb-5">Room Occupancy</h2>
          <div className="flex gap-3 mb-6">
            {Array.from({ length: room.capacity }).map((_, i) => (
              <div key={i} className={`w-12 h-12 border-2 border-black flex items-center justify-center ${i < room.occupied ? "bg-black text-white" : "bg-white"}`}>
                <Users className="w-5 h-5" />
              </div>
            ))}
          </div>
          <div className="font-mono text-sm text-gray-500">{room.occupied}/{room.capacity} beds occupied</div>

          {/* Roommates */}
          <div className="mt-5">
            <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Roommates</div>
            {roommates.length > 0 ? roommates.map(r => (
              <div key={r.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
                <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-mono font-bold text-sm">{r.name.charAt(0)}</div>
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="font-mono text-xs text-gray-400">{r.course} · Year {r.year}</div>
                </div>
              </div>
            )) : (
              <div className="font-mono text-sm text-gray-400">No roommates</div>
            )}
          </div>
        </div>
      </div>

      {/* Rules & info */}
      <div className="border-2 border-black p-6">
        <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Guidelines</div>
        <h2 className="font-display text-xl font-bold mb-5">Room Rules & Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { num: "01", title: "Check-in Time", desc: "Residents must check in by 10:30 PM. Late entry requires prior permission." },
            { num: "02", title: "Cleanliness", desc: "Keep your room clean. Common areas should be tidied after use." },
            { num: "03", title: "Guests", desc: "No overnight guests permitted without prior written approval from management." },
            { num: "04", title: "Noise Policy", desc: "Quiet hours from 10 PM to 7 AM. Respect your fellow residents." },
            { num: "05", title: "Maintenance", desc: "Report any maintenance issues via the complaints portal immediately." },
            { num: "06", title: "Belongings", desc: "Management is not responsible for loss or theft of personal items." },
          ].map(rule => (
            <div key={rule.num} className="flex gap-4 p-4 border border-gray-100 hover:border-black transition-colors">
              <span className="font-mono text-xl font-bold text-gray-200 flex-shrink-0">{rule.num}</span>
              <div>
                <div className="font-display font-bold text-sm mb-1">{rule.title}</div>
                <div className="font-mono text-xs text-gray-500 leading-relaxed">{rule.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
