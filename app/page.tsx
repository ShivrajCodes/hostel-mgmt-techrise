"use client";
import { Building2, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-5">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="font-display text-5xl font-bold tracking-tight mb-2">HOSTELIQ</div>
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Management System</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/login" className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group card-hover block">
            <div className="w-12 h-12 border-2 border-black group-hover:border-white flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="font-display text-2xl font-bold mb-2">Admin Portal</div>
            <div className="font-mono text-xs text-gray-400 group-hover:text-white/60 leading-relaxed mb-5">
              Full system access. Manage students, rooms, fees, complaints & more.
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <span>Enter Admin</span><ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link href="/student-login" className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group card-hover block">
            <div className="w-12 h-12 border-2 border-black group-hover:border-white flex items-center justify-center mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="font-display text-2xl font-bold mb-2">Student Portal</div>
            <div className="font-mono text-xs text-gray-400 group-hover:text-white/60 leading-relaxed mb-5">
              View your room, fees, attendance, complaints & notifications.
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <span>Student Login</span><ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="mt-8 border-2 border-black p-4">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3 text-center">Demo Credentials</div>
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <div className="font-bold text-black mb-1">Admin</div>
              <div className="text-gray-500">admin@hosteliq.in</div>
              <div className="text-gray-500">admin123</div>
            </div>
            <div>
              <div className="font-bold text-black mb-1">Student</div>
              <div className="text-gray-500">arjun@example.com</div>
              <div className="text-gray-500">arjun123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
