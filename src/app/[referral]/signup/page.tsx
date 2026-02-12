"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  CheckCircle,
  CreditCard,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

export default function ReferralSignupPage() {
  const router = useRouter();
  const { referral: referralParam } = useParams() as { referral: string };
  
  // Extract clean slug
  const referralSlug = referralParam.endsWith("-ref") 
    ? referralParam.slice(0, -4) 
    : referralParam;

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
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referral_slug: referralSlug }),
      });
      
      if (res.ok) {
        // Redirect to login or portal
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
    <div className="min-h-screen flex bg-slate-50">
       {/* Left Side - Hero/Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center font-bold text-white">
              5★
            </div>
            <span className="font-bold text-xl tracking-tight">5StarProcessing</span>
          </div>
          
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold leading-tight">
              Start accepting payments <br />
              <span className="text-brand-400">in minutes, not days.</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Join thousands of businesses that trust 5StarProcessing for secure, fast, and reliable merchant services.
            </p>
          </div>
        </div>

        {/* Features Carousel */}
        <div className="relative z-10 mt-12">
           <div className="space-y-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  opacity: activeFeature === idx ? 1 : 0.5,
                  x: activeFeature === idx ? 0 : -20,
                  scale: activeFeature === idx ? 1 : 0.95
                }}
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${activeFeature === idx ? "bg-white/10 border border-white/10" : "transparent"}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${feature.bg}`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${activeFeature === idx ? "text-white" : "text-slate-400"}`}>{feature.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -ml-20 -mb-20" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center p-4 sm:p-12 lg:p-24 bg-white relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
            <p className="mt-2 text-slate-500">
               Referred by partner? <span className="font-semibold text-brand-600">Yes, Applied!</span>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
             <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-400"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-400"
                  placeholder="Create a password"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">Must be at least 8 characters long</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
