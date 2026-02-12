"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, BadgeDollarSign, Building2, Briefcase, Gem } from "lucide-react";

const companies = [
  { name: "TechFlow", icon: CreditCard },
  { name: "Vertex", icon: Wallet },
  { name: "Acme Corp", icon: BadgeDollarSign },
  { name: "GlobalPay", icon: Building2 },
  { name: "Nebula", icon: Briefcase },
  { name: "Starlight", icon: Gem },
];

export default function TrustStrip() {
  return (
    <div className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-slate-400 uppercase tracking-widest"
        >
          Powering payments for 500+ Industry Leaders
        </motion.p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-50 to-transparent z-10" />
        
        <motion.div 
          className="flex whitespace-nowrap gap-16 py-4"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear" 
          }}
        >
          {[...companies, ...companies, ...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-default group/logo transform hover:scale-110">
               <div className="w-10 h-10 rounded-xl bg-slate-200 group-hover/logo:bg-brand-600 transition-colors flex items-center justify-center">
                 <company.icon className="w-6 h-6 text-slate-400 group-hover/logo:text-white transition-colors" />
               </div>
               <span className="text-2xl font-bold text-slate-400 group-hover/logo:text-slate-900 transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
