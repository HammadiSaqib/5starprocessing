"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do you support high-risk industries?",
    answer: "Yes, we specialize in high-risk merchant accounts. Our vast network of banking partners allows us to approve businesses that traditional processors often reject, including CBD, travel, adult, credit repair, and more."
  },
  {
    question: "How fast can I get approved?",
    answer: "Most low-risk accounts are approved within 24 hours. High-risk accounts typically take 3-5 business days depending on the complexity of your business and the completeness of your application."
  },
  {
    question: "What are your processing rates?",
    answer: "We offer custom interchange-plus pricing to ensure transparency. Rates vary based on your industry, volume, and risk profile. Contact us for a free statement analysis and quote."
  },
  {
    question: "Is there a long-term contract?",
    answer: "We offer flexible month-to-month agreements for most merchants. We believe in earning your business every day with great service, not locking you in with restrictive contracts."
  },
  {
    question: "Can I integrate with my existing software?",
    answer: "Absolutely. Our gateway integrates with thousands of shopping carts, CRMs, and POS systems including Shopify, WooCommerce, Salesforce, and more."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-brand-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
              >
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-semibold text-slate-600">Common Questions</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
              >
                Everything you need <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">to know</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                We believe in complete transparency. Here are answers to the most frequent questions we get from partners and merchants.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-brand-50 rounded-3xl border border-brand-100"
              >
                <h4 className="font-bold text-slate-900 mb-2">Still have questions?</h4>
                <p className="text-slate-600 text-sm mb-4">Our support team is available 24/7 to help you.</p>
                <a href="/contact" className="text-brand-600 font-bold text-sm hover:underline">Contact Support &rarr;</a>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? "bg-white border-brand-200 shadow-xl shadow-brand-900/5 scale-[1.02]" : "bg-white/50 backdrop-blur-sm border-slate-200 hover:border-brand-200 hover:bg-white"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === i ? "text-brand-600" : "text-slate-900 group-hover:text-brand-600"}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 ml-6 p-2 rounded-full transition-all duration-300 ${openIndex === i ? "bg-brand-600 text-white rotate-180 shadow-lg shadow-brand-500/30" : "bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600"}`}>
                    {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-slate-600 leading-relaxed text-lg border-t border-slate-100 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
