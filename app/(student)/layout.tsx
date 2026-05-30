"use client";
import StudentSidebar from "@/components/student/StudentSidebar";
import StudentHeader from "@/components/student/StudentHeader";
import StudentTicker from "@/components/student/StudentTicker";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudentTicker />
        <StudentHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
