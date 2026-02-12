"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Payment Processing Services",
    desc: "Providing comprehensive payment solutions, including credit card processing, e-commerce payment gateways, mobile credit card processing, and point-of-sale (POS) systems.",
    icon: CreditCard
  },
  {
    title: "High-risk Merchant Accounts",
    desc: "Specializing in serving businesses operating in high-risk industries by offering tailored payment processing solutions and support.",
    icon: ShieldAlert
  },
  {
    title: "Business Credit Building Solutions",
    desc: "Helping clients establish and improve their business credit profiles, enabling them to grow their businesses, access financing, and enhance their overall financial health.",
    icon: TrendingUp
  },
  {
    title: "Chargeback Management",
    desc: "Assisting businesses in reducing chargebacks and mitigating fraud by implementing best practices and effective risk management strategies.",
    icon: RotateCcw
  },
  {
    title: "Secure Payment Processing",
    desc: "Ensuring the highest level of security for transactions by utilizing advanced encryption and fraud protection measures.",
    icon: Lock
  }
];

import { TrendingUp, RotateCcw, Lock } from "lucide-react";

export default function Services() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="services">
      {/* Background Image & Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15]" />
        <div className="absolute top-1/3 left-0 w-[1000px] h-[1000px] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 max-w-3xl mx-auto text-center">
           <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-bold uppercase tracking-wider mb-4"
            >
              Our Expertise
            </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Our Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white rounded-[2.5rem] p-8 border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col justify-between ${
                index === 0 || index === 3 ? "md:col-span-2" : ""
              }`}
            >
               <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 border border-brand-100 shadow-sm">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{service.desc}</p>
               </div>
              
              <div className="relative z-10 mt-8 pt-8 border-t border-slate-100">
                 <Link href="#" className="flex items-center gap-2 text-slate-900 font-bold group-hover:gap-4 transition-all group-hover:text-brand-600">
                   Learn More
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                   </div>
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
