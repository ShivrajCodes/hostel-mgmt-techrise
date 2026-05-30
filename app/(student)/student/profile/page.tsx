"use client";
import { useEffect, useState } from "react";
import { mockStudents } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { User, Mail, Phone, BookOpen, MapPin, Users, Edit3, Save, X } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function StudentProfilePage() {
  const [studentId, setStudentId] = useState("S001");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setStudentId(localStorage.getItem("studentId") || "S001");
  }, []);

  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const [form, setForm] = useState({ phone: student.phone, address: student.address, guardianPhone: student.guardianPhone });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="mb-8 border-b-2 border-black pb-6">
        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Account</div>
        <h1 className="font-display text-4xl font-bold">My Profile</h1>
      </div>

      {saved && (
        <div className="border-2 border-black bg-black text-white p-4 mb-6 font-mono text-sm flex items-center gap-3">
          <Save className="w-4 h-4" />Profile updated successfully
        </div>
      )}

      {/* Profile hero */}
      <div className="border-2 border-black p-8 mb-6 flex items-start gap-8">
        <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-display text-4xl font-bold flex-shrink-0">
          {student.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">{student.name}</h2>
              <div className="font-mono text-sm text-gray-500 mt-1">{student.course} · Year {student.year}</div>
              <div className="flex items-center gap-3 mt-3">
                <Badge status={student.status} />
                <span className="font-mono text-xs text-gray-400">{student.id}</span>
              </div>
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 border-2 border-black px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                <Edit3 className="w-4 h-4" />Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="flex items-center gap-2 border-2 border-black px-3 py-2 font-mono text-xs uppercase hover:bg-gray-50">
                  <X className="w-4 h-4" />Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 bg-black text-white px-3 py-2 font-mono text-xs uppercase hover:bg-gray-900">
                  <Save className="w-4 h-4" />Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal info */}
        <div className="border-2 border-black">
          <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
            <span className="font-display font-bold">Personal Information</span>
          </div>
          <div className="p-6 space-y-5">
            {[
              { icon: User, label: "Full Name", value: student.name, editable: false },
              { icon: Mail, label: "Email Address", value: student.email, editable: false },
              { icon: Phone, label: "Phone Number", value: form.phone, key: "phone", editable: true },
              { icon: BookOpen, label: "Course", value: `${student.course} · Year ${student.year}`, editable: false },
              { icon: MapPin, label: "Address", value: form.address, key: "address", editable: true },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-9 h-9 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">{item.label}</div>
                  {editing && item.editable && item.key ? (
                    <input value={(form as Record<string,string>)[item.key]} onChange={e => setForm({...form, [item.key!]: e.target.value})}
                      className="w-full border-2 border-black px-3 py-2 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
                  ) : (
                    <div className="font-medium text-sm">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guardian + Academic */}
        <div className="space-y-6">
          <div className="border-2 border-black">
            <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
              <span className="font-display font-bold">Guardian Information</span>
            </div>
            <div className="p-6 space-y-4">
              {[
                { icon: Users, label: "Guardian Name", value: student.guardianName, editable: false },
                { icon: Phone, label: "Guardian Phone", value: form.guardianPhone, key: "guardianPhone", editable: true },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">{item.label}</div>
                    {editing && item.editable && item.key ? (
                      <input value={(form as Record<string,string>)[item.key]} onChange={e => setForm({...form, [item.key!]: e.target.value})}
                        className="w-full border-2 border-black px-3 py-2 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" />
                    ) : (
                      <div className="font-medium text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hostel summary card */}
          <div className="border-2 border-black">
            <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
              <span className="font-display font-bold">Hostel Summary</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Room", value: student.roomNumber || "N/A" },
                  { label: "Join Date", value: formatDate(student.joinDate) },
                  { label: "Fees Paid", value: formatCurrency(student.feesPaid) },
                  { label: "Total Dues", value: formatCurrency(student.feesTotal - student.feesPaid) },
                ].map(item => (
                  <div key={item.label} className="border-2 border-black p-3">
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">{item.label}</div>
                    <div className="font-display font-bold text-lg mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Fee Payment</div>
                <div className="w-full bg-gray-100 h-3 border-2 border-black">
                  <div className="bg-black h-full" style={{ width: `${(student.feesPaid / student.feesTotal) * 100}%` }} />
                </div>
                <div className="font-mono text-xs text-gray-400 mt-1">{Math.round((student.feesPaid / student.feesTotal) * 100)}% of total fees paid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
