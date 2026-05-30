"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const DEMO_STUDENTS = [
  { id: "S001", email: "arjun@example.com", password: "arjun123", name: "Arjun Sharma" },
  { id: "S002", email: "priya@example.com", password: "priya123", name: "Priya Patel" },
  { id: "S003", email: "rahul@example.com", password: "rahul123", name: "Rahul Verma" },
  { id: "S004", email: "sneha@example.com", password: "sneha123", name: "Sneha Roy" },
];

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("arjun@example.com");
  const [password, setPassword] = useState("arjun123");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 700));
    const student = DEMO_STUDENTS.find(s => s.email === email && s.password === password);
    if (student) {
      if (typeof window !== "undefined") {
        localStorage.setItem("studentId", student.id);
        localStorage.setItem("studentName", student.name);
      }
      router.push("/student/dashboard");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (typeof window !== "undefined") {
      localStorage.setItem("studentId", "S001");
      localStorage.setItem("studentName", "Arjun Sharma");
    }
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-white tracking-tight">HOSTELIQ</div>
            <div className="font-mono text-xs text-white/40 tracking-widest">STUDENT PORTAL</div>
          </div>
        </div>

        <div>
          <div className="w-16 h-16 border-2 border-white flex items-center justify-center mb-8">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-4">Your hostel,<br />your space.</h2>
          <p className="text-white/50 font-mono text-sm leading-relaxed mb-10">Access your room details, pay fees, raise complaints, and stay updated — all from one place.</p>
          <div className="space-y-3">
            {[
              "View room & roommate info",
              "Track fee payments & dues",
              "Raise & track complaints",
              "Check attendance records",
              "Receive hostel notifications",
              "Update your profile",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 border border-white/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white" />
                </div>
                <span className="text-white/70 font-display text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-xs text-white/20">© 2025 HOSTELIQ STUDENT PORTAL</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-black flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-lg">HOSTELIQ</div>
              <div className="font-mono text-xs text-gray-400 tracking-widest">STUDENT PORTAL</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Student Access</div>
            <h1 className="font-display text-4xl font-bold">Sign in to<br />student portal</h1>
          </div>

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-black py-3.5 font-display font-medium text-sm hover:bg-black hover:text-white transition-all mb-6 disabled:opacity-50">
            {googleLoading ? <span className="font-mono text-xs">AUTHENTICATING...</span> : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="font-mono text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="border-2 border-black bg-black text-white p-3 font-mono text-xs">
                ⚠ {error}
              </div>
            )}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border-2 border-black px-4 py-3 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] transition-shadow" required />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full border-2 border-black px-4 py-3 font-mono text-sm pr-12 outline-none focus:shadow-[2px_2px_0_#000] transition-shadow" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                  {showPw ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-black text-white py-3.5 font-display font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50">
              {loading ? <span className="font-mono text-sm">SIGNING IN...</span> : (
                <><span>Access Portal</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 border-2 border-black p-4">
            <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Demo Accounts</div>
            <div className="space-y-1.5">
              {DEMO_STUDENTS.slice(0,3).map(s => (
                <button key={s.id} onClick={() => { setEmail(s.email); setPassword(s.password); }}
                  className="w-full text-left flex items-center justify-between font-mono text-xs p-2 hover:bg-gray-50 border border-transparent hover:border-black transition-all">
                  <span className="font-bold">{s.name}</span>
                  <span className="text-gray-400">{s.email}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="font-mono text-xs text-gray-400 hover:text-black transition-colors underline">
              Admin? Sign in here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
