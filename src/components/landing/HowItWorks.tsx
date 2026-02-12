"use client";

import { motion } from "framer-motion";
import { UserPlus, FileCheck, CreditCard, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in minutes with our streamlined digital onboarding process.",
    color: "from-brand-500 to-brand-400"
  },
  {
    icon: FileCheck,
    title: "Get Approved",
    description: "Our underwriting team reviews your application for rapid approval.",
    color: "from-brand-400 to-brand-500"
  },
  {
    icon: CreditCard,
    title: "Connect Terminal",
    description: "Receive your pre-configured terminal or integrate our API instantly.",
    color: "from-brand-500 to-brand-600"
  },
  {
    icon: Rocket,
    title: "Start Processing",
    description: "Accept payments immediately and track real-time data on your dashboard.",
    color: "from-emerald-500 to-teal-400"
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-100/50 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-100/50 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-600">Simple Process</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            From Application to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Transaction</span> in Days
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            We&apos;ve eliminated the friction from traditional merchant services. 
            Get set up faster with our automated underwriting and instant integration tools.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-500 -translate-y-1/2 z-0 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-slate-700" />
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-8 text-6xl font-bold text-slate-50 opacity-50 group-hover:opacity-100 group-hover:text-slate-100 transition-colors duration-500 select-none">
                    0{i + 1}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="flex items-center text-amber-600 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
