import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-black text-white",
    inactive: "bg-gray-200 text-gray-600",
    pending: "bg-gray-800 text-gray-100",
    paid: "bg-black text-white",
    overdue: "bg-gray-900 text-white border border-white",
    open: "bg-white text-black border border-black",
    "in-progress": "bg-gray-700 text-white",
    resolved: "bg-black text-white",
    closed: "bg-gray-300 text-gray-700",
    available: "bg-white text-black border border-black",
    full: "bg-black text-white",
    maintenance: "bg-gray-500 text-white",
    present: "bg-black text-white",
    absent: "bg-white text-black border border-black",
    late: "bg-gray-700 text-white",
    leave: "bg-gray-300 text-gray-800",
    urgent: "bg-black text-white",
    high: "bg-gray-800 text-white",
    medium: "bg-gray-500 text-white",
    low: "bg-gray-200 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}
