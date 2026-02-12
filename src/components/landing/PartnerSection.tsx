"use client";

import { motion } from "framer-motion";
import { Handshake, Users, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PartnerSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-50 to-brand-100 rounded-full blur-[120px] opacity-60 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-100 to-brand-50 rounded-full blur-[120px] opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Visual Side (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 relative min-h-[600px] w-full flex items-center justify-center perspective-1000"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden -z-10 rotate-3 opacity-80 scale-90">
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/70 to-white/40 z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop" 
                 alt="Business partners"
                 className="w-full h-full object-cover opacity-70" 
               />
            </div>

            {/* Main Central Card - Light Mode */}
            <motion.div 
              className="relative z-20 bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 shadow-[0_30px_80px_-20px_rgba(50,50,93,0.15)] max-w-sm w-full"
              whileHover={{ rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl text-white shadow-lg shadow-brand-500/30">
                  <Handshake className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Partner Portal</h3>
                  <p className="text-slate-500 text-sm">Real-time earnings</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-sm text-slate-500 font-medium">Total Commission</div>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">$12,450.00</div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold flex items-center gap-1 border border-emerald-100">
                    <ArrowRight className="w-3 h-3 rotate-45" />
                    24%
                  </div>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full w-3/4 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Active Merchants</div>
                    <div className="font-bold text-slate-900 text-xl">128</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Pending</div>
                    <div className="font-bold text-slate-900 text-xl">12</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1 - Light Mode */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 md:-right-10 z-10 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-52"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">New Agents</div>
                  <div className="text-xl font-bold text-slate-900">+128</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 - Light Mode */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -left-10 z-30 bg-slate-900 p-6 rounded-3xl shadow-2xl w-64 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-xl">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm text-slate-200">Growth</span>
              </div>
              <div className="text-3xl font-bold mb-2">+145%</div>
              <div className="text-xs text-slate-400 font-medium">Year over Year growth</div>
            </motion.div>
          </motion.div>

          {/* Text Side (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]">
              Our Work Inspires <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">Smiles</span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Interested In Becoming An Agent Of 5 Star Processing Or Referral Partner?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/partner" 
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.5)] hover:-translate-y-1"
              >
                Lets Talk
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
