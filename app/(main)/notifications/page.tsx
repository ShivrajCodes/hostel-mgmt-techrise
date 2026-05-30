"use client";
import { useState } from "react";
import { Bell, Plus, Info, AlertTriangle, CheckCircle, XCircle, Send } from "lucide-react";
import { mockNotifications } from "@/data/mock";
import Modal from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";
import { Notification } from "@/types";

const typeConfig = {
  info: { icon: Info, color: "border-l-4 border-l-gray-400", badge: "bg-gray-100 text-gray-700" },
  warning: { icon: AlertTriangle, color: "border-l-4 border-l-gray-700", badge: "bg-gray-800 text-white" },
  success: { icon: CheckCircle, color: "border-l-4 border-l-black", badge: "bg-black text-white" },
  error: { icon: XCircle, color: "border-l-4 border-l-gray-900", badge: "bg-gray-900 text-white" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ title: "", message: "", type: "info", target: "all" });

  const filtered = notifications.filter(n => filter === "all" || n.type === filter);

  const markRead = (id: string) => setNotifications(notifications.map(n => n.id===id ? {...n, read: true} : n));
  const markAllRead = () => setNotifications(notifications.map(n => ({...n, read: true})));

  const handleSend = () => {
    const newN: Notification = {
      id: `N${String(notifications.length+1).padStart(3,"0")}`,
      title: form.title,
      message: form.message,
      type: form.type as Notification["type"],
      target: form.target as Notification["target"],
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications([newN, ...notifications]);
    setShowModal(false);
    setForm({ title: "", message: "", type: "info", target: "all" });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Communication</div>
          <h1 className="font-display text-4xl font-bold">Notifications</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            {unreadCount} unread · {notifications.length} total
          </p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
              Mark All Read
            </button>
          )}
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 font-display font-bold text-sm hover:bg-gray-900">
            <Plus className="w-4 h-4" />New Notification
          </button>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex border-2 border-black overflow-hidden w-fit mb-6">
        {["all","info","warning","success","error"].map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${filter===t ? "bg-black text-white" : "hover:bg-gray-50"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.map(n => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          return (
            <div key={n.id} className={cn("border-2 border-black bg-white p-5 flex items-start gap-4 transition-all", config.color, !n.read && "bg-gray-50 shadow-[2px_2px_0_#000]")}>
              <div className={cn("w-10 h-10 border-2 border-black flex items-center justify-center flex-shrink-0", n.read ? "bg-white" : "bg-black text-white")}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={cn("font-display font-bold", !n.read && "text-black")}>{n.title}</h3>
                      <span className={cn("font-mono text-xs px-2 py-0.5 uppercase tracking-wider", config.badge)}>{n.type}</span>
                      {!n.read && <span className="w-2 h-2 bg-black rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-600">{n.message}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="font-mono text-xs text-gray-400">{formatDate(n.createdAt)}</div>
                    <div className="font-mono text-xs text-gray-400 mt-0.5 capitalize">{n.target}</div>
                  </div>
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="font-mono text-xs border-2 border-black px-3 py-1 mt-3 hover:bg-black hover:text-white transition-all">
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-16 border-2 border-black text-center">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <div className="font-mono text-sm text-gray-400">No notifications</div>
          </div>
        )}
      </div>

      {/* Send Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Broadcast Notification" size="lg">
        <div className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000]" placeholder="Notification title..." />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Message</label>
            <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] h-28 resize-none" placeholder="Write your message..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
                {["info","warning","success","error"].map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Target</label>
              <select value={form.target} onChange={e => setForm({...form, target: e.target.value})} className="w-full border-2 border-black px-3 py-2.5 font-mono text-sm outline-none bg-white">
                <option value="all">All Students</option>
                <option value="specific">Specific Students</option>
              </select>
            </div>
          </div>
          {/* Preview */}
          {form.title && (
            <div className={cn("border-2 border-black p-4", typeConfig[form.type as keyof typeof typeConfig]?.color || "")}>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Preview</div>
              <div className="font-display font-bold">{form.title}</div>
              <div className="text-sm text-gray-600 mt-1">{form.message}</div>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t-2 border-black">
          <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-black py-3 font-display font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSend} disabled={!form.title || !form.message} className="flex-1 bg-black text-white py-3 font-display font-bold hover:bg-gray-900 disabled:opacity-40 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />Broadcast
          </button>
        </div>
      </Modal>
    </div>
  );
}
