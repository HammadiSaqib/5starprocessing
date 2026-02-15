"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  Zap
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const next = String((data as { next?: string }).next || "");
        if (next) {
          router.replace(next);
        } else {
          const role = String((data as { role?: string }).role || "").toLowerCase();
          if (role === "admin") {
            router.replace("/admin");
          } else if (role === "team") {
            router.replace("/team");
          } else {
            router.replace("/portal/prequal");
          }
        }
      } else {
        const data = await res.json().catch(() => ({ error: "Login failed" }));
        setError(data.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center relative overflow-hidden p-4">
      
      {/* 🌌 DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-300/40 rounded-full blur-[120px] mix-blend-multiply" 
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat bg-[length:50px_50px]" />
      </div>

      {/* 💠 FLOATING GLASS CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px]"
      >
        {/* Glow Effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        <div className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
          
          {/* Top Shine */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 mb-6 shadow-lg shadow-brand-500/20 transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">5S</span>
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 mt-2 text-sm"
            >
              Access your secure dashboard
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:bg-white transition-all duration-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-600 hover:text-brand-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors duration-300" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:bg-white transition-all duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 text-sm mb-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-brand-600 hover:text-brand-500 font-semibold hover:underline decoration-brand-500/30 underline-offset-4 transition-all">
                Create one now
              </Link>
            </p>
            
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Secure SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Zap className="w-4 h-4 text-brand-500" />
                <span>Fast Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
