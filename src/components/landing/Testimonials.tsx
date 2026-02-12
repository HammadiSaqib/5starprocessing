"use client";

import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote: "User Friendly, great product, very helpful resources",
    author: "Google User",
    role: "Verified Review",
    rating: 5,
    initials: "GU",
    color: "bg-brand-500",
    gradient: "from-brand-500 to-brand-400"
  },
  {
    quote: "Great company to work with for business owners, so many resources, saves a lot of time. Resources are updated frequently",
    author: "Google User",
    role: "Verified Review",
    rating: 5,
    initials: "GU",
    color: "bg-brand-600",
    gradient: "from-brand-600 to-brand-500"
  },
  {
    quote: "I wish I could remember the gentleman name who I spoke with. He was telling me about 5 star processing, then we went into our families. The whole experience was wonderful. He was so personable. I enjoyed him. Thank you 5 star.",
    author: "Google User",
    role: "Verified Review",
    rating: 5,
    initials: "GU",
    color: "bg-brand-500",
    gradient: "from-brand-500 to-brand-400"
  },
  {
    quote: "Great service, easy to use and understand and they walk you through a variety of options to find whats best for your business",
    author: "Google User",
    role: "Verified Review",
    rating: 5,
    initials: "GU",
    color: "bg-brand-600",
    gradient: "from-brand-600 to-brand-500"
  },
  {
    quote: "Great company to work with, has so many resources to help you be successful in your business. Consistently updates and has same me so much time in doing my own research",
    author: "Google User",
    role: "Verified Review",
    rating: 5,
    initials: "GU",
    color: "bg-brand-500",
    gradient: "from-brand-500 to-brand-400"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[1000px] h-[1000px] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="flex bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm gap-2">
              {[1,2,3,4,5].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm font-bold text-slate-700 ml-2">4.7 powered by Google review us on</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900"
          >
            We Love Them
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            What Our Clients Have To Say
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between hover:border-brand-300">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                      <Quote className="w-5 h-5 text-brand-500" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed font-medium mb-6">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{t.author}</h4>
                    <span className="text-xs text-slate-500 font-medium">{t.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
