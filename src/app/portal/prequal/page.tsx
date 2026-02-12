"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  CreditCard, 
  DollarSign, 
  Flag, 
  Landmark, 
  Wallet, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  XCircle,
  Check,
  X,
  ShieldCheck,
  Zap,
  Lock,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrequalPage() {
  const router = useRouter();
  const [industry, setIndustry] = useState("");
  const [processingCurrent, setProcessingCurrent] = useState<boolean | null>(null);
  const [monthlyVolume, setMonthlyVolume] = useState<number | "">("");
  const [usCitizen, setUsCitizen] = useState<boolean | null>(null);
  const [activeBank, setActiveBank] = useState<boolean | null>(null);
  const [feesPayer, setFeesPayer] = useState("merchant");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Focus states for animations
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (processingCurrent === null) {
      setError("Please indicate if you are currently processing credit cards.");
      return;
    }
    if (usCitizen === null) {
      setError("Please indicate if you are a U.S. Citizen.");
      return;
    }
    if (activeBank === null) {
      setError("Please indicate if you have an active U.S. Business Bank Account.");
      return;
    }
    if (monthlyVolume === "" || Number(monthlyVolume) < 0) {
      setError("Please enter a valid monthly volume.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portal/prequal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          processing_current: processingCurrent,
          monthly_volume: Number(monthlyVolume),
          us_citizen: usCitizen,
          active_us_bank: activeBank,
          fees_payer: feesPayer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
      } else {
        router.push(data.next);
      }
    } finally {
      setLoading(false);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 40, damping: 15 }
    }
  };

  // Calculate progress
  const totalSteps = 6;
  const completedSteps = [
    industry.length > 0,
    monthlyVolume !== "" && Number(monthlyVolume) >= 0,
    feesPayer.length > 0,
    processingCurrent !== null,
    usCitizen !== null,
    activeBank !== null
  ].filter(Boolean).length;

  const progress = (completedSteps / totalSteps) * 100;

  return (
    <main className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      
      {/* Left Side - Branding & Value Prop (Desktop Only) */}
      <div className="hidden lg:flex w-5/12 relative bg-brand-950 overflow-hidden flex-col justify-between p-16 text-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[32rem] h-[32rem] bg-brand-600 rounded-full opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[32rem] h-[32rem] bg-brand-800 rounded-full opacity-30 blur-[120px]"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <span className="text-white font-bold text-xl">5</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white/90">5 Star Processing</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold leading-tight mb-8">
              Empowering Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400">Business Growth</span>
            </h1>
            <p className="text-brand-100/80 text-lg max-w-md leading-relaxed">
              Check your eligibility instantly with our streamlined pre-qualification process. Secure, fast, and transparent.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Zap, title: "Instant Decision", desc: "Get pre-qualified in under 2 minutes." },
              { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Your data is encrypted and protected." },
              { icon: Lock, title: "No Hard Credit Pull", desc: "Checking eligibility won't affect your score." }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-900/50 flex items-center justify-center border border-brand-800 group-hover:bg-brand-800/50 group-hover:border-brand-700 transition-all duration-300 shadow-lg shadow-brand-900/20">
                  <feature.icon className="w-6 h-6 text-brand-400 group-hover:text-brand-300 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-sm text-brand-200/70 group-hover:text-brand-200 transition-colors">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pt-8 border-t border-brand-800/30">
            <p className="text-xs text-brand-500/60 font-medium">© 2026 5 Star Processing. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-7/12 h-screen overflow-y-auto bg-[#F8FAFC] relative">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 md:px-12">
          
          {/* Mobile Header */}
          <div className="lg:hidden mb-10">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">5 Star Processing</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Pre‑Qualification</h1>
            <p className="text-slate-500 text-lg">Check your eligibility in seconds.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500"></div>

            <form onSubmit={onSubmit} className="space-y-12">
              
              {/* Progress Indicator */}
              <div>
                <div className="flex items-center justify-between mb-3">
                   <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Eligibility Check</span>
                   <span className="text-xs font-semibold text-slate-400">{Math.round(progress)}% Completed</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-brand-500 rounded-full"
                  />
                </div>
              </div>

              {/* Section 1: Business Details */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-brand-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">Business Details</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  <motion.div variants={itemVariants} className="group relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Industry Type</label>
                    <div 
                      className={`relative transition-all duration-300 ease-out rounded-2xl ${
                        focusedField === 'industry' 
                          ? 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' 
                          : 'shadow-sm'
                      }`}
                    >
                      <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'industry' ? 'text-brand-500' : 'text-slate-400'}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <input 
                        className={`w-full pl-14 pr-5 py-5 rounded-2xl border bg-white outline-none text-slate-900 placeholder:text-slate-300 font-medium transition-all duration-300 ${
                          focusedField === 'industry'
                            ? 'border-brand-500 ring-0'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        placeholder="e.g. Retail, E-commerce, Restaurant"
                        value={industry} 
                        onChange={(e)=>setIndustry(e.target.value)} 
                        onFocus={() => setFocusedField('industry')}
                        onBlur={() => setFocusedField(null)}
                        required 
                      />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants} className="group relative">
                      <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Monthly Volume</label>
                      <div 
                        className={`relative transition-all duration-300 ease-out rounded-2xl ${
                          focusedField === 'volume' 
                            ? 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' 
                            : 'shadow-sm'
                        }`}
                      >
                        <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'volume' ? 'text-brand-500' : 'text-slate-400'}`}>
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <input 
                          type="number" 
                          className={`w-full pl-14 pr-5 py-5 rounded-2xl border bg-white outline-none text-slate-900 placeholder:text-slate-300 font-medium transition-all duration-300 ${
                            focusedField === 'volume'
                              ? 'border-brand-500 ring-0'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          placeholder="0.00"
                          value={monthlyVolume} 
                          onChange={(e) => setMonthlyVolume(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={() => setFocusedField('volume')}
                          onBlur={() => setFocusedField(null)}
                          min={0} 
                          required 
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="group relative">
                      <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Who Pays Fees?</label>
                      <div 
                        className={`relative transition-all duration-300 ease-out rounded-2xl ${
                          focusedField === 'fees' 
                            ? 'shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' 
                            : 'shadow-sm'
                        }`}
                      >
                        <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'fees' ? 'text-brand-500' : 'text-slate-400'}`}>
                          <Wallet className="w-5 h-5" />
                        </div>
                        <select 
                          className={`w-full pl-14 pr-12 py-5 rounded-2xl border bg-white outline-none appearance-none text-slate-900 font-medium cursor-pointer transition-all duration-300 ${
                            focusedField === 'fees'
                              ? 'border-brand-500 ring-0'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          value={feesPayer} 
                          onChange={(e)=>setFeesPayer(e.target.value)} 
                          onFocus={() => setFocusedField('fees')}
                          onBlur={() => setFocusedField(null)}
                          required
                        >
                          <option value="merchant">Merchant</option>
                          <option value="customer">Customer</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform duration-300 group-hover:translate-y-0.5">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.hr variants={itemVariants} className="border-slate-100/80" />

              {/* Section 2: Requirements */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-brand-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">Requirements</h2>
                </div>

                <div className="space-y-6">
                  
                  {/* Question 1 */}
                  <motion.div variants={itemVariants} className="group bg-slate-50/50 hover:bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 hover:border-brand-200/60 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-start sm:items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-500 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                          <CreditCard className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-900 mb-1">Current Processing</p>
                          <p className="text-sm text-slate-500 font-medium">Do you currently accept credit cards?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto min-w-[200px]">
                        <button
                          type="button"
                          onClick={() => setProcessingCurrent(true)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            processingCurrent === true 
                              ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200 scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:bg-brand-50/30"
                          }`}
                        >
                          {processingCurrent === true && <Check className="w-4 h-4" />}
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setProcessingCurrent(false)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            processingCurrent === false 
                              ? "bg-slate-800 text-white border-slate-800 shadow-lg scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {processingCurrent === false && <X className="w-4 h-4" />}
                          No
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Question 2 */}
                  <motion.div variants={itemVariants} className="group bg-slate-50/50 hover:bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 hover:border-brand-200/60 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-start sm:items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-500 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                          <Flag className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-900 mb-1">Citizenship</p>
                          <p className="text-sm text-slate-500 font-medium">Are you a U.S. Citizen?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto min-w-[200px]">
                        <button
                          type="button"
                          onClick={() => setUsCitizen(true)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            usCitizen === true 
                              ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200 scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:bg-brand-50/30"
                          }`}
                        >
                           {usCitizen === true && <Check className="w-4 h-4" />}
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setUsCitizen(false)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            usCitizen === false 
                              ? "bg-slate-800 text-white border-slate-800 shadow-lg scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {usCitizen === false && <X className="w-4 h-4" />}
                          No
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Question 3 */}
                  <motion.div variants={itemVariants} className="group bg-slate-50/50 hover:bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 hover:border-brand-200/60 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-start sm:items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-500 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                          <Landmark className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-900 mb-1">Banking</p>
                          <p className="text-sm text-slate-500 font-medium">Active U.S. Business Bank Account?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto min-w-[200px]">
                        <button
                          type="button"
                          onClick={() => setActiveBank(true)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            activeBank === true 
                              ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200 scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:bg-brand-50/30"
                          }`}
                        >
                          {activeBank === true && <Check className="w-4 h-4" />}
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveBank(false)}
                          className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                            activeBank === false 
                              ? "bg-slate-800 text-white border-slate-800 shadow-lg scale-105" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {activeBank === false && <X className="w-4 h-4" />}
                          No
                        </button>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

              <AnimatePresence>
                {error && (
                   <motion.div 
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="p-5 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-4 shadow-sm"
                   >
                     <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                       <XCircle className="w-5 h-5" />
                     </div>
                     {error}
                   </motion.div>
                 )}
              </AnimatePresence>

              <motion.button 
                 variants={itemVariants}
                 whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(239, 68, 68, 0.3)" }}
                 whileTap={{ scale: 0.98 }}
                 disabled={loading} 
                 className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-2xl py-5 font-bold text-xl shadow-xl shadow-brand-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-6 group"
               >
                 {loading ? (
                   <>
                     <Loader2 className="w-6 h-6 animate-spin" /> Checking Eligibility...
                   </>
                 ) : (
                   <>
                     Check Eligibility 
                     <div className="bg-white/20 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                     </div>
                   </>
                 )}
               </motion.button>
            </form>
          </motion.div>
          
          <div className="mt-10 text-center text-slate-400 text-sm font-medium">
            <p className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Lock className="w-4 h-4" /> Secure 256-bit Encrypted Connection
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
