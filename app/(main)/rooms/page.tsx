"use client";
import { useState } from "react";
import { Plus, BedDouble, Users, Wrench, Wifi, Wind, Bath, Star } from "lucide-react";
import { mockRooms } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatCurrency, cn } from "@/lib/utils";
import { Room } from "@/types";

const amenityIcons: Record<string, React.ElementType> = {
  "WiFi": Wifi, "AC": Wind, "Fan": Wind, "Attached Bathroom": Bath, "Common Bathroom": Bath,
  "Balcony": Star, "City View": Star,
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState(mockRooms);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [form, setForm] = useState({ number: "", floor: 1, type: "single", capacity: 1, pricePerMonth: 2500 });

  const filtered = rooms.filter(r => filter === "all" || r.status === filter);

  const handleAdd = () => {
    const newRoom: Room = {
      id: `R${form.number}`,
      number: form.number,
      floor: form.floor,
      type: form.type as Room["type"],
      capacity: form.capacity,
      occupied: 0,
      amenities: ["WiFi", "Fan"],
      status: "available",
      pricePerMonth: form.pricePerMonth,
      students: [],
    };
    setRooms([...rooms, newRoom]);
    setShowModal(false);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Management</div>
          <h1 className="font-display text-4xl font-bold">Rooms</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">{rooms.length} rooms total · {rooms.filter(r=>r.status==="available").length} available</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900 transition-colors">
          <Plus className="w-4 h-4" />Add Room
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Available", count: rooms.filter(r=>r.status==="available").length, color: "bg-white border-2 border-black" },
          { label: "Full", count: rooms.filter(r=>r.status==="full").length, color: "bg-black text-white" },
          { label: "Maintenance", count: rooms.filter(r=>r.status==="maintenance").length, color: "bg-gray-200" },
          { label: "Total Capacity", count: rooms.reduce((a,r) => a+r.capacity, 0), color: "bg-white border-2 border-black" },
        ].map(s => (
          <div key={s.label} className={`p-5 flex items-center justify-between ${s.color}`}>
            <span className="font-mono text-xs uppercase tracking-widest">{s.label}</span>
            <span className="font-display text-3xl font-bold">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Filter & View toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex border-2 border-black overflow-hidden">
          {["all","available","full","maintenance"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${filter===s ? "bg-black text-white" : "hover:bg-gray-50"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex border-2 border-black overflow-hidden">
          {(["grid","list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${view===v ? "bg-black text-white" : "hover:bg-gray-50"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(room => (
            <div key={room.id} className="border-2 border-black card-hover cursor-pointer" onClick={() => setSelectedRoom(room)}>
              <div className={cn("px-4 py-3 flex items-center justify-between border-b-2 border-black", room.status === "full" ? "bg-black text-white" : room.status === "maintenance" ? "bg-gray-500 text-white" : "bg-white")}>
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4" />
                  <span className="font-display font-bold text-lg">Room {room.number}</span>
                </div>
                <Badge status={room.status} />
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Type</div>
                    <div className="font-medium text-sm capitalize mt-0.5">{room.type}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Floor</div>
                    <div className="font-medium text-sm mt-0.5">Floor {room.floor}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Occupancy</div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({length: room.capacity}).map((_, i) => (
                        <div key={i} className={cn("w-6 h-6 border-2 border-black flex items-center justify-center", i < room.occupied ? "bg-black" : "bg-white")}>
                          {i < room.occupied && <Users className="w-3 h-3 text-white" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Rent/Month</div>
                    <div className="font-bold font-mono text-sm mt-0.5">{formatCurrency(room.pricePerMonth)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.map(a => (
                    <span key={a} className="font-mono text-xs border border-black px-2 py-0.5">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="border-2 border-black overflow-hidden">
          <table className="data-table w-full">
            <thead><tr className="bg-gray-50">
              <th>Room No.</th><th>Type</th><th>Floor</th><th>Occupancy</th><th>Rent/Month</th><th>Amenities</th><th>Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(room => (
                <tr key={room.id} className="cursor-pointer" onClick={() => setSelectedRoom(room)}>
                  <td><span className="font-mono font-bold">{room.number}</span></td>
                  <td className="capitalize">{room.type}</td>
                  <td>Floor {room.floor}</td>
                  <td><span className="font-mono text-sm">{room.occupied}/{room.capacity}</span></td>
                  <td><span className="font-mono font-bold">{formatCurrency(room.pricePerMonth)}</span></td>
                  <td><div className="flex gap-1">{room.amenities.slice(0,2).map(a=><span key={a} className="font-mono text-xs border border-black px-1.5 py-0.5">{a}</span>)}{room.amenities.length>2&&<span className="font-mono text-xs text-gray-400">+{room.amenities.length-2}</span>}</div></td>
                  <td><Badge status={room.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Room Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Room">
        <div className="space-y-4">
          {[
            { label: "Room Number", key: "number", type: "text" },
            { label: "Price per Month (₹)", key: "pricePerMonth", type: "number" },
          ].map(f => (
            <div key={f.key}>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">{f.label}</label>
              <input type={f.type} value={(form as Record<string, string|number>)[f.key] as string} onChange={e => setForm({...form, [f.key]: f.type==="number" ? Number(e.target.value) : e.target.value})}
                className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Floor</label>
              <select value={form.floor} onChange={e => setForm({...form, floor: Number(e.target.value)})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
                {[1,2,3,4,5].map(f=><option key={f} value={f}>Floor {f}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
                {["single","double","triple","dormitory"].map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Capacity</label>
            <input type="number" min={1} max={10} value={form.capacity} onChange={e => setForm({...form, capacity: Number(e.target.value)})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleAdd} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900">Add Room</button>
        </div>
      </Modal>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <Modal open={!!selectedRoom} onClose={() => setSelectedRoom(null)} title={`Room ${selectedRoom.number} — Details`} size="lg">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Room Type", value: selectedRoom.type },
                { label: "Floor", value: `Floor ${selectedRoom.floor}` },
                { label: "Capacity", value: `${selectedRoom.occupied}/${selectedRoom.capacity} occupied` },
                { label: "Monthly Rent", value: formatCurrency(selectedRoom.pricePerMonth) },
                { label: "Status", value: <Badge status={selectedRoom.status} /> },
                { label: "Room ID", value: selectedRoom.id },
              ].map(item => (
                <div key={item.label} className="border-2 border-black p-3">
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">{item.label}</div>
                  <div className="font-bold mt-1 capitalize">{item.value}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Amenities</div>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.amenities.map(a => {
                  const Icon = amenityIcons[a] || Wrench;
                  return (
                    <div key={a} className="flex items-center gap-2 border-2 border-black px-3 py-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-mono text-xs">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Occupancy Visual</div>
              <div className="flex gap-2">
                {Array.from({length: selectedRoom.capacity}).map((_, i) => (
                  <div key={i} className={cn("w-12 h-12 border-2 border-black flex items-center justify-center", i < selectedRoom.occupied ? "bg-black text-white" : "bg-white")}>
                    <Users className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
