"use client";
import { useEffect, useState } from "react";
import { CreditCard, Download, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { mockFees } from "@/data/mock";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function StudentFeesPage() {
  const [studentId, setStudentId] = useState("S001");
  const [payModal, setPayModal] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [fees, setFees] = useState(mockFees);

  useEffect(() => {
    if (typeof window !== "undefined") setStudentId(localStorage.getItem("studentId") || "S001");
  }, []);

  const myFees = fees.filter(f => f.studentId === studentId);
  const paid = myFees.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);
  const pending = myFees.filter(f => f.status !== "paid").reduce((a, f) => a + f.amount, 0);
  const overdue = myFees.filter(f => f.status === "overdue");

  const handlePay = async (id: string) => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1500));
    setFees(fees.map(f => f.id === id ? { ...f, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0] } : f));
    setPaying(false);
    setPayModal(null);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Finance</div>
          <h1 className="font-display text-4xl font-bold">My Fees</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">Track your fee payments and dues</p>
        </div>
        <button className="flex items-center gap-2 border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
          <Download className="w-4 h-4" />Statement
        </button>
      </div>

      {/* Overdue alert */}
      {overdue.length > 0 && (
        <div className="border-2 border-black bg-black text-white p-5 mb-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-display font-bold mb-1">Overdue Payment Alert</div>
            <div className="font-mono text-sm text-white/70">
              You have {overdue.length} overdue payment{overdue.length > 1 ? "s" : ""} totalling {formatCurrency(overdue.reduce((a,f)=>a+f.amount,0))}. Please pay immediately to avoid penalties.
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-black text-white border-2 border-black p-6">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Paid</span>
          </div>
          <div className="font-mono text-3xl font-bold">{formatCurrency(paid)}</div>
          <div className="font-mono text-xs text-white/40 mt-1">{myFees.filter(f=>f.status==="paid").length} payments</div>
        </div>
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-6 h-6" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Pending</span>
          </div>
          <div className="font-mono text-3xl font-bold">{formatCurrency(pending)}</div>
          <div className="font-mono text-xs text-gray-400 mt-1">{myFees.filter(f=>f.status!=="paid").length} due</div>
        </div>
        <div className="border-2 border-black p-6">
          <div className="flex items-center justify-between mb-3">
            <CreditCard className="w-6 h-6" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Total</span>
          </div>
          <div className="font-mono text-3xl font-bold">{formatCurrency(paid + pending)}</div>
          <div className="font-mono text-xs text-gray-400 mt-1">{myFees.length} records</div>
        </div>
      </div>

      {/* Progress */}
      <div className="border-2 border-black p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-bold">Payment Progress</span>
          <span className="font-mono text-sm font-bold">{Math.round((paid/(paid+pending||1))*100)}%</span>
        </div>
        <div className="flex h-5 border-2 border-black overflow-hidden">
          <div className="bg-black transition-all" style={{ width: `${(paid/(paid+pending||1))*100}%` }} />
        </div>
        <div className="flex justify-between font-mono text-xs text-gray-400 mt-1.5">
          <span>{formatCurrency(paid)} paid</span>
          <span>{formatCurrency(pending)} remaining</span>
        </div>
      </div>

      {/* Fee records */}
      <div className="border-2 border-black overflow-hidden">
        <div className="px-6 py-4 bg-black text-white border-b-2 border-black">
          <span className="font-display font-bold">Fee Records</span>
        </div>
        <table className="data-table w-full">
          <thead><tr className="bg-gray-50">
            <th>Month</th><th>Type</th><th>Amount</th><th>Due Date</th><th>Paid Date</th><th>Status</th><th>Action</th>
          </tr></thead>
          <tbody>
            {myFees.map(f => (
              <tr key={f.id}>
                <td><span className="font-medium text-sm">{f.month}</span></td>
                <td><span className="font-mono text-xs border border-black px-2 py-0.5 capitalize">{f.type}</span></td>
                <td><span className="font-mono font-bold">{formatCurrency(f.amount)}</span></td>
                <td><span className="font-mono text-sm">{formatDate(f.dueDate)}</span></td>
                <td><span className="font-mono text-sm text-gray-400">{f.paidDate ? formatDate(f.paidDate) : "—"}</span></td>
                <td><Badge status={f.status} /></td>
                <td>
                  {f.status !== "paid" && (
                    <button onClick={() => setPayModal(f.id)} className="font-mono text-xs border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all font-bold">
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment modal */}
      {payModal && (() => {
        const fee = myFees.find(f => f.id === payModal);
        if (!fee) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => !paying && setPayModal(null)} />
            <div className="relative bg-white border-2 border-black w-full max-w-md animate-fadeIn">
              <div className="bg-black text-white p-5 border-b-2 border-black">
                <h2 className="font-display font-bold text-lg">Pay Fee</h2>
              </div>
              <div className="p-6">
                <div className="border-2 border-black p-4 mb-6">
                  <div className="grid grid-cols-2 gap-3 font-mono text-sm">
                    <div><div className="text-gray-400 text-xs uppercase tracking-widest">Month</div><div className="font-bold mt-0.5">{fee.month}</div></div>
                    <div><div className="text-gray-400 text-xs uppercase tracking-widest">Type</div><div className="font-bold mt-0.5 capitalize">{fee.type}</div></div>
                    <div><div className="text-gray-400 text-xs uppercase tracking-widest">Amount</div><div className="font-bold mt-0.5 text-xl">{formatCurrency(fee.amount)}</div></div>
                    <div><div className="text-gray-400 text-xs uppercase tracking-widest">Due Date</div><div className="font-bold mt-0.5">{formatDate(fee.dueDate)}</div></div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-3">Pay via</div>
                  {["UPI / QR Code", "Net Banking", "Debit/Credit Card", "Wallet"].map(method => (
                    <label key={method} className="flex items-center gap-3 border-2 border-black p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="radio" name="paymethod" defaultChecked={method === "UPI / QR Code"} className="accent-black" />
                      <span className="font-display font-medium text-sm">{method}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setPayModal(null)} disabled={paying} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50 disabled:opacity-40">Cancel</button>
                  <button onClick={() => handlePay(payModal)} disabled={paying} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900 disabled:opacity-60 flex items-center justify-center gap-2">
                    {paying ? <><span className="font-mono text-sm">PROCESSING...</span></> : <><CreditCard className="w-4 h-4" />Pay {formatCurrency(fee.amount)}</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
