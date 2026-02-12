"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeFinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
          alt="Skyscrapers"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
            >
              Drop Us A Line And <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">Keep In Touch</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 max-w-xl"
            >
              One of the most important decisions as a business owner is choosing who will help them put money in their bank account. Find out why everyone is choosing 5 Star Processing
            </motion.p>
          </div>
          <Link 
            href="/signup" 
            className="group flex items-center gap-4 text-2xl font-bold text-white hover:text-brand-300 transition-colors"
          >
            Get Started
            <motion.span 
              whileHover={{ scale: 1.1, rotate: -45 }}
              className="p-4 rounded-full bg-white text-brand-600 shadow-lg shadow-white/10 group-hover:shadow-white/30 transition-all"
            >
              <ArrowRight className="w-8 h-8" />
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
