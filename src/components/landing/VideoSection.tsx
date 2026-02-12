"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(15,23,42,1)_100%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
        >
           <span className="text-brand-400 font-bold tracking-widest text-xs uppercase mb-3 block">Discover 5 Star Processing</span>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">See How We Help You Grow</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative group"
        >
          {/* Glowing Halo */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-[2.5rem] blur opacity-20 transition-opacity duration-500 ${isPlaying ? 'opacity-10' : 'group-hover:opacity-40'}`} />
          
          <div className="relative bg-slate-900 rounded-[2rem] aspect-video flex items-center justify-center overflow-hidden shadow-2xl shadow-black/80 border border-white/10 ring-1 ring-white/5">
             {isPlaying ? (
               <iframe 
                 width="100%" 
                 height="100%" 
                 src="https://www.youtube.com/embed/Dpm7QClzJos?autoplay=1&rel=0" 
                 title="5 Star Processing Video" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowFullScreen
                 className="w-full h-full rounded-[2rem] z-20"
               />
             ) : (
               <div 
                 className="absolute inset-0 flex items-center justify-center cursor-pointer w-full h-full z-20" 
                 onClick={() => setIsPlaying(true)}
               >
                 {/* Abstract Thumbnail Background */}
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px]" />
                 </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pl-2 shadow-2xl border border-white/20 text-white z-10 relative group-hover:bg-brand-600 group-hover:border-brand-500 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
                  <Play className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                </motion.div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-left pointer-events-none">
                   <p className="text-white font-bold text-xl">Introduction to Merchant Services</p>
                   <p className="text-slate-300 text-sm mt-1">Learn about our secure payment processing solutions in 2 minutes.</p>
                </div>
               </div>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
