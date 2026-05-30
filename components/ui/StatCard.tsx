import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  inverted?: boolean;
  className?: string;
}

export default function StatCard({ label, value, icon: Icon, sub, inverted, className }: StatCardProps) {
  return (
    <div className={cn(
      "card-hover border-2 border-black p-6",
      inverted ? "bg-black text-white" : "bg-white text-black",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-10 h-10 border-2 flex items-center justify-center",
          inverted ? "border-white" : "border-black"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {sub && (
          <span className={cn("font-mono text-xs", inverted ? "text-white/50" : "text-gray-400")}>
            {sub}
          </span>
        )}
      </div>
      <div className="stat-number">{value}</div>
      <div className={cn("font-mono text-xs mt-2 uppercase tracking-widest", inverted ? "text-white/60" : "text-gray-500")}>
        {label}
      </div>
    </div>
  );
}
