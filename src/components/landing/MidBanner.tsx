"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MidBanner() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl shadow-brand-500/20 group">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/80 to-slate-900/80 z-10" />
             <img 
               src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2560&auto=format&fit=crop" 
               alt="Team meeting" 
               className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
             />
          </div>

          {/* Animated Background Mesh Gradient */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
             <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-400/30 rounded-full blur-[120px] mix-blend-overlay animate-blob" />
             <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] mix-blend-overlay animate-blob animation-delay-2000" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-sm"
            >
              We Solve Real Problems
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-brand-50 mb-12 max-w-2xl mx-auto font-medium"
            >
              What Can We Do For You?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center px-10 py-5 bg-white text-brand-600 rounded-2xl font-bold text-lg hover:bg-brand-50 transition-all hover:scale-105 hover:shadow-2xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
