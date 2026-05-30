"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@hosteliq.in");
  const [password, setPassword] = useState("admin123");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-white tracking-tight">HOSTELIQ</div>
            <div className="font-mono text-xs text-white/40 tracking-widest">MANAGEMENT SYSTEM</div>
          </div>
        </div>
        <div>
          <div className="font-mono text-xs text-white/40 tracking-widest mb-4">PLATFORM FEATURES</div>
          {["Student Registration & Profiles","Room Allocation & Management","Fee Tracking & Payment Interface","Complaint Handling System","Attendance Monitoring","Notification Broadcasting"].map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-white/10">
              <span className="font-mono text-xs text-white/30">{String(i+1).padStart(2,"0")}</span>
              <span className="text-white/80 font-display text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-xs text-white/20">© 2025 HOSTELIQ · v2.0.0</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-black flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">HOSTELIQ</span>
          </div>
          <div className="mb-10">
            <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Welcome back</div>
            <h1 className="font-display text-4xl font-bold">Sign in to<br />your account</h1>
          </div>
          <button onClick={handleGoogle} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 border-2 border-black py-3.5 font-display font-medium text-sm hover:bg-black hover:text-white transition-all mb-6 disabled:opacity-50">
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
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-2 border-black px-4 py-3 font-mono text-sm outline-none focus:shadow-[2px_2px_0_#000] transition-shadow" required />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border-2 border-black px-4 py-3 font-mono text-sm pr-12 outline-none focus:shadow-[2px_2px_0_#000] transition-shadow" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                  {showPw ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3.5 font-display font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 mt-2">
              {loading ? <span className="font-mono text-sm">SIGNING IN...</span> : (<><span>Sign In</span><ArrowRight className="w-4 h-4" /></>)}
            </button>
          </form>
          <p className="font-mono text-xs text-gray-400 mt-6 text-center">Demo credentials pre-filled above</p>
        </div>
      </div>
    </div>
  );
}
