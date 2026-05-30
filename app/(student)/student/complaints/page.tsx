"use client";
import { useEffect, useState } from "react";
import { Plus, MessageSquare, CheckCircle } from "lucide-react";
import { mockComplaints } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";
import { Complaint } from "@/types";

const STATUS_STEPS = ["open", "in-progress", "resolved", "closed"];

export default function StudentComplaintsPage() {
  const [studentId, setStudentId] = useState("S001");
  const [complaints, setComplaints] = useState(mockComplaints);
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState<Complaint | null>(null);
  const [form, setForm] = useState({ category: "maintenance", title: "", description: "", priority: "medium" });
  const [studentName, setStudentName] = useState("Arjun Sharma");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStudentId(localStorage.getItem("studentId") || "S001");
      setStudentName(localStorage.getItem("studentName") || "Arjun Sharma");
    }
  }, []);

  const myComplaints = complaints.filter(c => c.studentId === studentId);

  const handleAdd = () => {
    if (!form.title || !form.description) return;
    const newC: Complaint = {
      id: `C${String(complaints.length+1).padStart(3,"0")}`,
      studentId,
      studentName,
      roomNumber: "101",
      category: form.category as Complaint["category"],
      title: form.title,
      description: form.description,
      priority: form.priority as Complaint["priority"],
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComplaints([newC, ...complaints]);
    setShowModal(false);
    setForm({ category: "maintenance", title: "", description: "", priority: "medium" });
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Support</div>
          <h1 className="font-display text-4xl font-bold">My Complaints</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">{myComplaints.filter(c=>c.status==="open").length} open · {myComplaints.filter(c=>c.status==="resolved").length} resolved</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900">
          <Plus className="w-4 h-4" />New Complaint
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATUS_STEPS.map((s, i) => (
          <div key={s} className={cn("p-5 border-2 border-black", i === 0 ? "bg-black text-white" : "bg-white")}>
            <div className={cn("font-mono text-xs uppercase tracking-widest", i === 0 ? "text-white/50" : "text-gray-400")}>{s.replace("-"," ")}</div>
            <div className="font-display text-3xl font-bold mt-2">{myComplaints.filter(c=>c.status===s).length}</div>
          </div>
        ))}
      </div>

      {/* Complaints */}
      {myComplaints.length > 0 ? (
        <div className="space-y-4">
          {myComplaints.map(c => (
            <div key={c.id} className="border-2 border-black bg-white cursor-pointer card-hover" onClick={() => setViewModal(c)}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-gray-400">{c.id}</span>
                      <Badge status={c.priority} />
                      <span className="font-mono text-xs border border-gray-200 px-2 py-0.5 capitalize">{c.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1">{c.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
                  </div>
                  <div className="flex-shrink-0"><Badge status={c.status} /></div>
                </div>

                {/* Progress tracker */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-0">
                    {STATUS_STEPS.map((step, i) => {
                      const stepIdx = STATUS_STEPS.indexOf(c.status);
                      const done = i <= stepIdx;
                      return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <div className={cn("w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold transition-colors", done ? "bg-black text-white" : "bg-white text-gray-300")}>
                            {done ? "✓" : i+1}
                          </div>
                          <div className="font-mono text-xs text-gray-400 ml-1.5 hidden sm:block capitalize">{step.replace("-"," ")}</div>
                          {i < STATUS_STEPS.length - 1 && <div className={cn("flex-1 h-0.5 mx-2", done && i < stepIdx ? "bg-black" : "bg-gray-200")} />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 font-mono text-xs text-gray-400">
                  <span>Filed: {formatDate(c.createdAt)}</span>
                  {c.assignedTo && <span>Assigned to: {c.assignedTo}</span>}
                  {c.resolvedAt && <span className="text-black font-bold">Resolved: {formatDate(c.resolvedAt)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-black p-20 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-200" />
          <div className="font-display text-xl font-bold mb-2">No complaints raised</div>
          <div className="font-mono text-sm text-gray-400 mb-6">Everything seems fine! Raise a complaint if you face any issues.</div>
          <button onClick={() => setShowModal(true)} className="bg-black text-white px-6 py-3 font-display font-bold hover:bg-gray-900">
            + Raise Complaint
          </button>
        </div>
      )}

      {/* Add complaint modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Raise New Complaint" size="lg">
        <div className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Complaint Title</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Brief title of your issue"
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the issue in detail..."
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] h-28 resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleAdd} disabled={!form.title || !form.description} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900 disabled:opacity-40">
            Submit Complaint
          </button>
        </div>
      </Modal>

      {/* View detail modal */}
      {viewModal && (
        <Modal open={!!viewModal} onClose={() => setViewModal(null)} title={`Complaint ${viewModal.id}`} size="lg">
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-2xl font-bold">{viewModal.title}</h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge status={viewModal.priority} /><Badge status={viewModal.status} />
                <span className="font-mono text-xs border border-gray-300 px-2 py-0.5 capitalize">{viewModal.category}</span>
              </div>
            </div>
            <div className="border-2 border-black p-4 bg-gray-50">
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Your complaint</div>
              <p className="text-sm leading-relaxed">{viewModal.description}</p>
            </div>
            {viewModal.assignedTo && (
              <div className="border-2 border-black p-4 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Assigned to</div>
                  <div className="font-display font-bold text-sm mt-0.5">{viewModal.assignedTo}</div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="border-2 border-black p-3 font-mono text-xs">
                <div className="text-gray-400 uppercase tracking-widest">Filed On</div>
                <div className="font-bold mt-1">{formatDate(viewModal.createdAt)}</div>
              </div>
              <div className="border-2 border-black p-3 font-mono text-xs">
                <div className="text-gray-400 uppercase tracking-widest">Last Updated</div>
                <div className="font-bold mt-1">{formatDate(viewModal.updatedAt)}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
