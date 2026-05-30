"use client";
import { useState } from "react";
import { Plus, Download, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { mockFees } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Fee } from "@/types";

export default function FeesPage() {
  const [fees, setFees] = useState(mockFees);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ studentId: "", studentName: "", roomNumber: "", amount: "", dueDate: "", type: "rent", month: "" });

  const filtered = fees.filter(f => filter === "all" || f.status === filter);
  const collected = fees.filter(f=>f.status==="paid").reduce((a,f)=>a+f.amount,0);
  const pending = fees.filter(f=>f.status==="pending").reduce((a,f)=>a+f.amount,0);
  const overdue = fees.filter(f=>f.status==="overdue").reduce((a,f)=>a+f.amount,0);

  const handleAdd = () => {
    const newFee: Fee = {
      id: `F${String(fees.length+1).padStart(3,"0")}`,
      studentId: form.studentId,
      studentName: form.studentName,
      roomNumber: form.roomNumber,
      amount: Number(form.amount),
      dueDate: form.dueDate,
      status: "pending",
      type: form.type as Fee["type"],
      month: form.month,
    };
    setFees([...fees, newFee]);
    setShowModal(false);
  };

  const markPaid = (id: string) => {
    setFees(fees.map(f => f.id === id ? {...f, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0]} : f));
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Finance</div>
          <h1 className="font-display text-4xl font-bold">Fee Management</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">Track and manage hostel fee collection</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
            <Download className="w-4 h-4" />Export
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900">
            <Plus className="w-4 h-4" />Add Fee Record
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-black text-white p-6 border-2 border-black">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-6 h-6" /><span className="font-mono text-xs text-white/40 uppercase tracking-widest">Collected</span>
          </div>
          <div className="font-mono text-3xl font-bold">{formatCurrency(collected)}</div>
          <div className="font-mono text-xs text-white/50 mt-1">{fees.filter(f=>f.status==="paid").length} payments</div>
        </div>
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-3">
            <CreditCard className="w-6 h-6" /><span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Pending</span>
          </div>
          <div className="font-mono text-3xl font-bold">{formatCurrency(pending)}</div>
          <div className="font-mono text-xs text-gray-400 mt-1">{fees.filter(f=>f.status==="pending").length} payments due</div>
        </div>
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-6 h-6 text-gray-600" /><span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Overdue</span>
          </div>
          <div className="font-mono text-3xl font-bold text-gray-700">{formatCurrency(overdue)}</div>
          <div className="font-mono text-xs text-gray-400 mt-1">{fees.filter(f=>f.status==="overdue").length} overdue payments</div>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="border-2 border-black p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">Collection Rate</div>
            <div className="font-display text-xl font-bold mt-0.5">January 2025</div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-mono font-bold">{Math.round((collected/(collected+pending+overdue))*100)}%</span>
          </div>
        </div>
        <div className="flex h-4 border-2 border-black overflow-hidden">
          <div className="bg-black transition-all" style={{ width: `${(collected/(collected+pending+overdue))*100}%` }} />
          <div className="bg-gray-400 transition-all" style={{ width: `${(pending/(collected+pending+overdue))*100}%` }} />
          <div className="bg-gray-200 transition-all flex-1" />
        </div>
        <div className="flex gap-6 font-mono text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-black inline-block" />Collected</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-400 inline-block" />Pending</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-200 border border-black inline-block" />Overdue</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex border-2 border-black overflow-hidden w-fit mb-6">
        {["all","paid","pending","overdue"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${filter===s ? "bg-black text-white" : "hover:bg-gray-50"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border-2 border-black overflow-hidden">
        <table className="data-table w-full">
          <thead><tr className="bg-gray-50">
            <th>Fee ID</th><th>Student</th><th>Room</th><th>Type</th><th>Amount</th><th>Due Date</th><th>Paid Date</th><th>Month</th><th>Status</th><th>Action</th>
          </tr></thead>
          <tbody>
            {filtered.map(fee => (
              <tr key={fee.id}>
                <td><span className="font-mono text-xs font-bold">{fee.id}</span></td>
                <td>
                  <div className="font-medium text-sm">{fee.studentName}</div>
                  <div className="font-mono text-xs text-gray-400">{fee.studentId}</div>
                </td>
                <td><span className="font-mono text-sm">Room {fee.roomNumber}</span></td>
                <td><span className="font-mono text-xs border border-black px-2 py-0.5 capitalize">{fee.type}</span></td>
                <td><span className="font-mono font-bold">{formatCurrency(fee.amount)}</span></td>
                <td><span className="font-mono text-sm">{formatDate(fee.dueDate)}</span></td>
                <td><span className="font-mono text-sm text-gray-400">{fee.paidDate ? formatDate(fee.paidDate) : "—"}</span></td>
                <td><span className="font-mono text-xs">{fee.month}</span></td>
                <td><Badge status={fee.status} /></td>
                <td>
                  {fee.status !== "paid" && (
                    <button onClick={() => markPaid(fee.id)} className="font-mono text-xs border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-all">
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-16 text-center font-mono text-sm text-gray-400">No records found</div>}
      </div>

      {/* Add Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Fee Record" size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Student ID", key: "studentId" },
            { label: "Student Name", key: "studentName" },
            { label: "Room Number", key: "roomNumber" },
            { label: "Amount (₹)", key: "amount" },
            { label: "Due Date", key: "dueDate", type: "date" },
            { label: "Month", key: "month", placeholder: "e.g. February 2025" },
          ].map(f => (
            <div key={f.key}>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">{f.label}</label>
              <input type={f.type || "text"} placeholder={f.placeholder || ""} value={(form as Record<string,string>)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
            </div>
          ))}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Fee Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
              {["rent","mess","maintenance","deposit"].map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleAdd} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900">Add Record</button>
        </div>
      </Modal>
    </div>
  );
}
