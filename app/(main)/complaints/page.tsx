"use client";
import { useState } from "react";
import { Plus, MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { mockComplaints } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";
import { Complaint } from "@/types";

const categoryColors: Record<string, string> = {
  maintenance: "border-l-4 border-l-gray-800",
  food: "border-l-4 border-l-gray-500",
  security: "border-l-4 border-l-black",
  noise: "border-l-4 border-l-gray-400",
  cleanliness: "border-l-4 border-l-gray-300",
  other: "border-l-4 border-l-gray-200",
};

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState<Complaint | null>(null);
  const [form, setForm] = useState({ studentName: "", roomNumber: "", category: "maintenance", title: "", description: "", priority: "medium" });

  const filtered = complaints.filter(c => filter === "all" || c.status === filter);

  const handleAdd = () => {
    const newC: Complaint = {
      id: `C${String(complaints.length+1).padStart(3,"0")}`,
      studentId: "S000",
      ...form,
      category: form.category as Complaint["category"],
      priority: form.priority as Complaint["priority"],
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComplaints([...complaints, newC]);
    setShowModal(false);
  };

  const updateStatus = (id: string, status: Complaint["status"]) => {
    setComplaints(complaints.map(c => c.id === id ? {...c, status, updatedAt: new Date().toISOString(), resolvedAt: status === "resolved" ? new Date().toISOString() : c.resolvedAt} : c));
    setViewModal(null);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Support</div>
          <h1 className="font-display text-4xl font-bold">Complaints</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">{complaints.filter(c=>c.status==="open").length} open · {complaints.filter(c=>c.status==="in-progress").length} in progress</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900">
          <Plus className="w-4 h-4" />New Complaint
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Open", count: complaints.filter(c=>c.status==="open").length, icon: AlertTriangle, inv: true },
          { label: "In Progress", count: complaints.filter(c=>c.status==="in-progress").length, icon: Clock, inv: false },
          { label: "Resolved", count: complaints.filter(c=>c.status==="resolved").length, icon: CheckCircle, inv: false },
          { label: "Urgent", count: complaints.filter(c=>c.priority==="urgent").length, icon: MessageSquare, inv: false },
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

      {/* Status filter */}
      <div className="flex border-2 border-black overflow-hidden w-fit mb-6">
        {["all","open","in-progress","resolved","closed"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${filter===s ? "bg-black text-white" : "hover:bg-gray-50"}`}>
            {s.replace("-"," ")}
          </button>
        ))}
      </div>

      {/* Complaints list */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className={cn("border-2 border-black bg-white card-hover cursor-pointer", categoryColors[c.category])} onClick={() => setViewModal(c)}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-gray-400">{c.id}</span>
                    <Badge status={c.priority} />
                    <span className="font-mono text-xs border border-gray-300 px-2 py-0.5 capitalize">{c.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg">{c.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <Badge status={c.status} />
                  <div className="font-mono text-xs text-gray-400 mt-2">{c.studentName}</div>
                  <div className="font-mono text-xs text-gray-400">Room {c.roomNumber}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100 font-mono text-xs text-gray-400">
                <span>Filed: {formatDate(c.createdAt)}</span>
                {c.assignedTo && <span>Assigned: {c.assignedTo}</span>}
                {c.resolvedAt && <span>Resolved: {formatDate(c.resolvedAt)}</span>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-16 border-2 border-black text-center font-mono text-sm text-gray-400">No complaints found</div>
        )}
      </div>

      {/* Add Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="File New Complaint" size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Student Name", key: "studentName" },
            { label: "Room Number", key: "roomNumber" },
            { label: "Complaint Title", key: "title" },
          ].map(f => (
            <div key={f.key} className={f.key === "title" ? "col-span-2" : ""}>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">{f.label}</label>
              <input type="text" value={(form as Record<string,string>)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
            </div>
          ))}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
              {["maintenance","food","security","noise","cleanliness","other"].map(c=><option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Priority</label>
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
              {["low","medium","high","urgent"].map(p=><option key={p} value={p} className="capitalize">{p}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] h-28 resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleAdd} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900">Submit Complaint</button>
        </div>
      </Modal>

      {/* View/Manage Modal */}
      {viewModal && (
        <Modal open={!!viewModal} onClose={() => setViewModal(null)} title={`Complaint ${viewModal.id}`} size="lg">
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">{viewModal.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <Badge status={viewModal.priority} />
                  <Badge status={viewModal.status} />
                  <span className="font-mono text-xs border border-gray-300 px-2 py-0.5 capitalize">{viewModal.category}</span>
                </div>
              </div>
            </div>
            <div className="border-2 border-black p-4 bg-gray-50">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Description</div>
              <p className="text-sm leading-relaxed">{viewModal.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="border-2 border-black p-3">
                <div className="text-gray-400 uppercase tracking-widest">Filed By</div>
                <div className="font-bold mt-1">{viewModal.studentName}</div>
              </div>
              <div className="border-2 border-black p-3">
                <div className="text-gray-400 uppercase tracking-widest">Room</div>
                <div className="font-bold mt-1">Room {viewModal.roomNumber}</div>
              </div>
              <div className="border-2 border-black p-3">
                <div className="text-gray-400 uppercase tracking-widest">Filed On</div>
                <div className="font-bold mt-1">{formatDate(viewModal.createdAt)}</div>
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Update Status</div>
              <div className="flex gap-2 flex-wrap">
                {(["open","in-progress","resolved","closed"] as const).map(s => (
                  <button key={s} onClick={() => updateStatus(viewModal.id, s)}
                    className={cn("px-4 py-2 border-2 border-black font-mono text-xs uppercase tracking-wider transition-all", viewModal.status===s ? "bg-black text-white" : "hover:bg-black hover:text-white")}>
                    {s.replace("-"," ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
