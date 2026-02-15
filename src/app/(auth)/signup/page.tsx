"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  CreditCard,
  TrendingUp,
  Shield
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Instant Approval",
      desc: "Get approved in minutes with our automated underwriting system.",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Lowest Rates",
      desc: "Save up to 40% on processing fees with our interchange-plus pricing.",
      icon: CreditCard,
      color: "text-brand-400",
      bg: "bg-brand-400/10"
    },
    {
      title: "Growth Analytics",
      desc: "Track sales, trends, and customer behavior in real-time.",
      icon: TrendingUp,
      color: "text-brand-300",
      bg: "bg-brand-300/10"
    }
  ];

  // Auto-rotate features
  useState(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      
      if (res.ok) {
        router.push("/portal/prequal");
      } else {
        const data = await res.json().catch(() => ({ error: "Signup failed" }));
        setError(data.error || "Signup failed");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex relative overflow-hidden">
      
      {/* 🔵 LEFT SIDE - INTERACTIVE SHOWCASE */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center p-16 bg-slate-50 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.05)_180deg,transparent_360deg)]"
          />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />
              <span>Enterprise Grade Security</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Start Processing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
                Like a Pro
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Join over 10,000+ businesses using 5 Star Processing to streamline payments and boost revenue.
            </p>
          </motion.div>

          {/* Interactive Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  activeFeature === idx 
                    ? "bg-white border-brand-500/50 shadow-lg shadow-brand-500/10 scale-105" 
                    : "bg-white/60 border-slate-200 opacity-80 hover:opacity-100"
                }`}
                onClick={() => setActiveFeature(idx)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg}`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeFeature === idx ? "text-slate-900" : "text-slate-600"}`}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔵 RIGHT SIDE - SIGNUP FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-white">
        <div className="w-full max-w-[500px]">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 mb-6 shadow-lg shadow-brand-500/20">
              <span className="text-xl font-bold text-white">5S</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500">Get started with your 14-day free trial</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2 col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  type="email"
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  type="password"
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Password Strength Indicator (Visual only) */}
              <div className="flex gap-1 h-1 mt-3">
                <div className={`flex-1 rounded-full ${password.length > 0 ? "bg-red-500" : "bg-slate-100"} transition-colors`} />
                <div className={`flex-1 rounded-full ${password.length > 6 ? "bg-yellow-500" : "bg-slate-100"} transition-colors`} />
                <div className={`flex-1 rounded-full ${password.length > 10 ? "bg-green-500" : "bg-slate-100"} transition-colors`} />
                <div className={`flex-1 rounded-full ${password.length > 12 ? "bg-emerald-500" : "bg-slate-100"} transition-colors`} />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-600 hover:text-brand-500 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
