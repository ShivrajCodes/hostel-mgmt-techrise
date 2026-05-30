"use client";
import { useState } from "react";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { mockNotifications } from "@/data/mock";
import { formatDate, cn } from "@/lib/utils";

const typeConfig = {
  info: { icon: Info, color: "border-l-4 border-l-gray-400" },
  warning: { icon: AlertTriangle, color: "border-l-4 border-l-gray-700" },
  success: { icon: CheckCircle, color: "border-l-4 border-l-black" },
  error: { icon: XCircle, color: "border-l-4 border-l-gray-900" },
};

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const markRead = (id: string) => setNotifications(notifications.map(n => n.id===id ? {...n, read: true} : n));
  const markAll = () => setNotifications(notifications.map(n => ({...n, read: true})));
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex items-start justify-between mb-8 border-b-2 border-black pb-6">
        <div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Updates</div>
          <h1 className="font-display text-4xl font-bold">Notifications</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">{unread} unread · {notifications.length} total</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="border-2 border-black px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-50">
            Mark All Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          return (
            <div key={n.id} className={cn("border-2 border-black p-5 flex gap-4 transition-all", config.color, !n.read && "bg-gray-50 shadow-[2px_2px_0_#000]")}>
              <div className={cn("w-10 h-10 border-2 border-black flex items-center justify-center flex-shrink-0", !n.read ? "bg-black text-white" : "bg-white")}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold">{n.title}</h3>
                    {!n.read && <span className="w-2 h-2 bg-black rounded-full" />}
                  </div>
                  <span className="font-mono text-xs text-gray-400 flex-shrink-0">{formatDate(n.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600">{n.message}</p>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="mt-3 font-mono text-xs border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-all">
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {notifications.length === 0 && (
          <div className="p-20 border-2 border-black text-center">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <div className="font-mono text-sm text-gray-400">No notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
