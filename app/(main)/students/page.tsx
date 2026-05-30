"use client";
import { useState } from "react";
import { Plus, Search, Filter, Download, User, Phone, Mail, BookOpen } from "lucide-react";
import { mockStudents } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Student } from "@/types";

const emptyStudent: Partial<Student> = {
  name: "", email: "", phone: "", course: "", year: 1,
  guardianName: "", guardianPhone: "", address: "", status: "pending"
};

export default function StudentsPage() {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>(emptyStudent);

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    const newStudent: Student = {
      ...emptyStudent,
      ...form,
      id: `S${String(students.length + 1).padStart(3,"0")}`,
      joinDate: new Date().toISOString().split("T")[0],
      feesPaid: 0, feesTotal: 36000, avatar: "",
    } as Student;
    setStudents([...students, newStudent]);
    setShowModal(false);
    setForm(emptyStudent);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Management</div>
          <h1 className="font-display text-4xl font-bold">Students</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">{students.length} total students registered</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />Export
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900 transition-colors">
            <Plus className="w-4 h-4" />Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 border-2 border-black px-3 py-2 flex-1 min-w-48">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, ID..." className="flex-1 font-mono text-sm bg-transparent outline-none" />
        </div>
        <div className="flex border-2 border-black overflow-hidden">
          {["all","active","pending","inactive"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${filter===s ? "bg-black text-white" : "hover:bg-gray-50"}`}>
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 border-2 border-black px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
          <Filter className="w-4 h-4" />Filter
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Active", value: students.filter(s=>s.status==="active").length, color: "bg-black text-white" },
          { label: "Pending", value: students.filter(s=>s.status==="pending").length, color: "bg-white text-black border-2 border-black" },
          { label: "Inactive", value: students.filter(s=>s.status==="inactive").length, color: "bg-gray-100 text-black border-2 border-black" },
        ].map(s => (
          <div key={s.label} className={`p-4 flex items-center justify-between ${s.color}`}>
            <span className="font-mono text-xs uppercase tracking-widest">{s.label}</span>
            <span className="font-display text-2xl font-bold">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border-2 border-black overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr className="bg-gray-50">
              <th>Student ID</th><th>Name</th><th>Course</th><th>Room</th><th>Fees</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><span className="font-mono text-xs font-bold">{s.id}</span></td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-sm font-bold flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{s.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td><div className="text-sm">{s.course}</div><div className="font-mono text-xs text-gray-400">Year {s.year}</div></td>
                <td><span className="font-mono text-sm">{s.roomNumber || "—"}</span></td>
                <td>
                  <div className="text-sm font-medium">{formatCurrency(s.feesPaid)}</div>
                  <div className="w-24 bg-gray-200 h-1.5 mt-1">
                    <div className="bg-black h-1.5" style={{ width: `${(s.feesPaid/s.feesTotal)*100}%` }} />
                  </div>
                </td>
                <td><Badge status={s.status} /></td>
                <td>
                  <button onClick={() => setViewModal(s)} className="font-mono text-xs underline hover:no-underline px-2 py-1 border-2 border-transparent hover:border-black transition-all">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-16 text-center font-mono text-sm text-gray-400">No students found</div>
        )}
      </div>

      {/* Add Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Register New Student" size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "name", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
            { label: "Phone Number", key: "phone", type: "tel" },
            { label: "Course", key: "course", type: "text" },
            { label: "Guardian Name", key: "guardianName", type: "text" },
            { label: "Guardian Phone", key: "guardianPhone", type: "tel" },
          ].map(field => (
            <div key={field.key}>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">{field.label}</label>
              <input type={field.type} value={(form as Record<string, string | number>)[field.key] as string || ""} onChange={e => setForm({...form, [field.key]: e.target.value})}
                className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] transition-shadow" />
            </div>
          ))}
          <div className="col-span-2">
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Address</label>
            <textarea value={form.address || ""} onChange={e => setForm({...form, address: e.target.value})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] transition-shadow h-20 resize-none" />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Year</label>
            <select value={form.year} onChange={e => setForm({...form, year: Number(e.target.value)})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
              {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Student["status"]})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
              {["pending","active","inactive"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900 transition-colors">Register Student</button>
        </div>
      </Modal>

      {/* View Modal */}
      {viewModal && (
        <Modal open={!!viewModal} onClose={() => setViewModal(null)} title={`Student — ${viewModal.id}`} size="lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 flex items-center gap-4 pb-4 border-b-2 border-black">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-mono text-2xl font-bold">{viewModal.name.charAt(0)}</div>
              <div>
                <h3 className="font-display text-2xl font-bold">{viewModal.name}</h3>
                <div className="font-mono text-sm text-gray-500">{viewModal.course} · Year {viewModal.year}</div>
                <Badge status={viewModal.status} className="mt-1" />
              </div>
            </div>
            {[
              { icon: Mail, label: "Email", value: viewModal.email },
              { icon: Phone, label: "Phone", value: viewModal.phone },
              { icon: User, label: "Guardian", value: `${viewModal.guardianName} (${viewModal.guardianPhone})` },
              { icon: BookOpen, label: "Joined", value: formatDate(viewModal.joinDate) },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">{item.label}</div>
                  <div className="font-medium text-sm mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="col-span-2">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Fee Progress</div>
              <div className="flex items-center justify-between font-mono text-sm mb-2">
                <span>Paid: {formatCurrency(viewModal.feesPaid)}</span>
                <span>Total: {formatCurrency(viewModal.feesTotal)}</span>
              </div>
              <div className="w-full bg-gray-200 h-3 border border-black">
                <div className="bg-black h-full transition-all" style={{ width: `${(viewModal.feesPaid/viewModal.feesTotal)*100}%` }} />
              </div>
              <div className="font-mono text-xs text-gray-400 mt-1">{Math.round((viewModal.feesPaid/viewModal.feesTotal)*100)}% paid</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
