"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={ref} className="relative min-h-[100vh] overflow-hidden bg-slate-50 flex flex-col justify-center pt-32 pb-20 perspective-1000">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1]" />
        <div className="absolute top-[-30%] left-[-10%] w-[80%] h-[80%] bg-brand-500/10 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Trusted by 5,000+ Businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
            >
              Your Ultimate Merchant <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-blue-600">Payment Solutions!</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8 mb-10"
            >
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                We lead the way in helping small businesses grow. We offer a variety of products and services that fit our business owners’ needs every day either your goal is to accept credit card payments, or you are looking for a sense of direction on how to get started.
              </p>
              
              <div className="bg-white/60 backdrop-blur-md border border-brand-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:border-brand-200 transition-colors">
                 <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
                 <p className="text-base md:text-lg text-slate-600 leading-relaxed relative z-10">
                   One of the key features of 5 Star Processing is their advanced fraud prevention and chargeback management tools. We use the latest technology and industry best practices to identify and prevent fraudulent transactions, while also providing businesses with the tools they need to manage chargeback’s effectively in which we can help!
                 </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link 
                href="/signup" 
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                href="/partner" 
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-brand-200 flex items-center gap-2 justify-center shadow-sm hover:shadow-lg"
              >
                Become a Partner
              </Link>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="mt-10 flex items-center gap-6 justify-center lg:justify-start grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
               {/* Trust Badges / Logos Placeholder */}
               <div className="h-8 w-24 bg-slate-200/50 rounded animate-pulse" />
               <div className="h-8 w-24 bg-slate-200/50 rounded animate-pulse" />
               <div className="h-8 w-24 bg-slate-200/50 rounded animate-pulse" />
            </motion.div>
          </div>

          {/* Right Visual: Immersive 3D Interface */}
          <div className="flex-1 w-full perspective-2000 relative z-20">
            <motion.div
              style={{ y, rotateX }}
              className="relative"
            >
              {/* Main Glass Interface */}
              <motion.div
                initial={{ opacity: 0, rotateY: -12, rotateX: 5, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: -6, rotateX: 2, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 30 }}
                className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-2 shadow-[0_0_100px_-20px_rgba(59,130,246,0.2)] border border-white/50 relative overflow-hidden group"
              >
                 <div className="bg-slate-50/50 rounded-[2rem] p-6 sm:p-8 h-full min-h-[500px] border border-white/40">
                    {/* Header Mockup */}
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-600">
                             <ShieldCheck className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="h-2 w-24 bg-slate-200 rounded mb-2" />
                             <div className="h-4 w-32 bg-slate-300 rounded" />
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-white shadow-sm" />
                          <div className="w-8 h-8 rounded-full bg-brand-600 shadow-sm" />
                       </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-slate-100">
                       <div className="flex justify-between items-end h-48 gap-2 md:gap-4">
                          {[35, 55, 45, 70, 60, 85, 95].map((h, i) => (
                             <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                                className="w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-xl opacity-90 relative group-hover:opacity-100 transition-opacity"
                             >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
                             </motion.div>
                          ))}
                       </div>
                    </div>

                    {/* Transactions Mockup */}
                    <div className="space-y-3">
                       {[1, 2, 3].map((_, i) => (
                          <motion.div 
                             key={i}
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: 1 + (i * 0.1) }}
                             className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100"
                          >
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                   <div className="w-5 h-5 bg-slate-200 rounded-full" />
                                </div>
                                <div>
                                   <div className="h-2 w-20 bg-slate-200 rounded mb-1.5" />
                                   <div className="h-2 w-12 bg-slate-100 rounded" />
                                </div>
                             </div>
                             <div className="h-4 w-16 bg-brand-100 rounded" />
                          </motion.div>
                       ))}
                    </div>
                 </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-24 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 z-30 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                     <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <TrendingUp className="w-6 h-6" />
                     </div>
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                     </div>
                  </div>
                  <div>
                     <div className="text-sm font-bold text-slate-800">Growth</div>
                     <div className="text-xs font-semibold text-green-600">+128%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-32 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-slate-700 z-30 hidden md:block"
              >
                 <div className="flex items-center gap-4 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                    <span className="text-xs font-bold text-brand-100 uppercase tracking-wider">Live Processing</span>
                 </div>
                 <div className="text-2xl font-bold text-white">$42,892.50</div>
                 <div className="h-1 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                       animate={{ x: ["-100%", "100%"] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       className="h-full w-1/2 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
                    />
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
