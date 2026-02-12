"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ArrowRight, 
  CreditCard,
  ShieldAlert,
  Search,
  Building2,
  FileText,
  CheckCircle2,
  BarChart,
  Briefcase,
  AlertTriangle,
  FileSearch,
  Landmark,
  Scale
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreditRepairPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80 z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"
            style={{ backgroundPosition: '50% 50%' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 text-sm font-bold mb-8"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Business Credit Repair</span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
            >
              Repair Your Business Credit Score Fast With These <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">5 Tips</span>
            </motion.h1>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed space-y-6 max-w-3xl font-light"
            >
              <p>
                If your business has experienced financial difficulties in the past due to the economy, poor business, or other issues, it’s important to take the time to repair your business credit score. Your business credit score is important for providing you with more financing options, paying less for financing, and getting better terms from suppliers. It can also be incredibly helpful for obtaining certain employment. Repairing business credit is like repairing personal credit; it requires a unique set of steps to repair damaged business credit score. Let us walk you through the best way to get your credit score back on track.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT FACTORS AFFECT MY BUSINESS’S CREDIT SCORE? SECTION */}
      <section className="py-24 bg-slate-50 text-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
              >
                What Factors Affect My Business’s Credit Score?
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto"
              >
                Each business credit bureau has different credit scoring models; however, four main factors play a role in determining your business credit score. These include:
              </motion.p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {[
                {
                  title: "Business payment habits",
                  desc: "This includes the number and types of trade lines, the size of your outstanding balances, payment history, and credit utilization. Trade lines may include business credit cards, business loans, and accounts with suppliers of goods and services.",
                  icon: CreditCard,
                  color: "text-brand-600",
                  bg: "bg-brand-50"
                },
                {
                  title: "Derogatory marks",
                  desc: "This includes the presence of derogatory marks, the amount, and how recent they took place. Reports such as tax liens, court judgments, and bankruptcies affect your score.",
                  icon: ShieldAlert,
                  color: "text-brand-600",
                  bg: "bg-brand-50"
                },
                {
                  title: "Amount of business credit inquiries",
                  desc: "These are triggered when your business applies for credit and can also affect your score. It’s important to know that these go hand-in-hand with your personal credit, especially when you’re relying on your personal credit score to get funding for your business. When it comes to business inquiries, FICO® Small Business Scoring Service℠ and Experian look most closely at them when determining your score.",
                  icon: Search,
                  color: "text-brand-600",
                  bg: "bg-brand-50"
                },
                {
                  title: "Inherent business factors",
                  desc: "Examples of these include the number of years you’ve been in business, the company size, and your industry.",
                  icon: Building2,
                  color: "text-brand-600",
                  bg: "bg-brand-50"
                },
                {
                  title: "Misinformation",
                  desc: "When credit bureaus don’t have the right information about your business, your score can suffer as a result. Without being properly registered, established businesses with 20+ years in their industry can lose all of their business credit because it was registered to someone else. Make sure that your proper business name, address, and phone number are registered to avoid this happening to you.",
                  icon: FileText,
                  color: "text-brand-600",
                  bg: "bg-brand-50"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex flex-col"
                >
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
              
              {/* CTA Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-brand-600 p-8 rounded-[2rem] shadow-xl text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 z-0" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Take Action Now</h3>
                  <p className="text-brand-100 mb-8 leading-relaxed">
                    You can limit or repair your business credit report and your credit score directly from one or more of the business credit bureaus: Dun & Bradstreet, Equifax, and Experian.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-600 hover:bg-brand-50 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1 w-full">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 HOW TO IMPROVE YOUR BUSINESS CREDIT SCORE SECTION */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How to Improve Your Business Credit Score
            </h2>
            <div className="h-1 w-24 bg-brand-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-12">
            {[
              {
                title: "Correct Errors on Your Business Credit Report",
                content: "According to a survey by the Wall Street Journal, nearly 25 percent of business owners who check their business credit reports found errors. If your business credit report contains errors, these mistakes can have a negative impact on your business credit score. For example, let’s say you make software for trucking companies, but the business credit bureau accidentally categorizes you as a trucking firm. This mistake could lead to a higher risk classification, and you could end up paying hundreds or even thousands of dollars more for financing to correct errors on your business credit report. Correcting any mistakes on your business credit report is critical to improving your score. Typically, you’ll need to highlight the incorrect information on your report, provide proof to show why the error is incorrect, and either mail, email, or fax this documentation to the agency. Most investigations are completed within 30 days, although sometimes agencies like Experian have a portal where a business representative can make certain updates immediately.",
                icon: FileSearch,
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
              },
              {
                title: "Choose Suppliers and Lenders That Report Payments",
                content: "Small businesses that have been behind on payments in the past can repair their business credit by showing timely payment behavior. However, your positive payment history can only be rewarded if you work with suppliers or lenders that report payments to the business credit bureaus. For example, if you are a retailer of household goods who buys inventory from a wholesaler, ensure that the wholesaler reports to at least one of the business credit bureaus. That way, every time you pay an invoice from your wholesaler on time, you’ll be building up your credit score a little bit at a time. Some processing and utility vendors report payments to business credit bureaus. You can also apply for a corporate credit card to add an additional tradeline to your business credit report.",
                icon: Briefcase,
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
              },
              {
                title: "Apply for a Business Credit Card",
                content: "You may have a poor business credit score because you simply don’t have enough tradelines on your account. A business credit card is one of the easiest tradelines you can have. Even making small purchases on a business credit card and paying them off in time each month can help you improve your business credit score. If you’re unable to qualify for a regular business credit card, try a secured credit card. With a secured credit card, you’ll deposit a monthly deposit to qualify for the credit line. Alternatively, you can apply for a corporate credit card from a big box retailer like Home Depot or Lowe’s.",
                icon: CreditCard,
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80"
              },
              {
                title: "Manage Your Personal Credit Well",
                content: "If you’re on the market for a business loan or business credit card, you could end up in a catch-22. Although you need financing for your business, your personal credit score impacts how likely you are to get approval. Managing your personal credit is crucial to building a strong business credit, especially in the early stages of financing. Research lenders closely, and only apply for credit when and if you need it. Never borrow more than you need, either, as this will lower your score and drain more cash from your operations. The team at 5 Star Processing can help you figure out how much financing you can afford and the best lenders for your company.",
                icon: BarChart,
                image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80"
              },
              {
                title: "Take Proactive Measures to Pay Off Debt",
                content: "Managing debt as a business owner is extremely important for both maximizing revenue and avoiding low credit. When you are a business, outstanding payments can quickly accumulate, leaving you at a cashflow deficit that is hard to overcome. You want to prioritize debt repayment as part of your financial strategy. This includes paying business credit cards on time, paying off loans as quickly as possible, and making sure your taxes are always current. We suggest keeping a calendar of tax deadlines so you never miss one. While you’re experiencing cashflow difficulties, try to cut back on unnecessary expenses to maximize revenue so you don’t fall into a deeper hole and start missing payments. If you experience legal trouble, contact a business lawyer right away. Sometimes these issues are out of your business’s control, but you can take steps to minimize the damage to your credit. If you took on too much debt, look into consolidating your business loans. With interest rates in mind, you can more confidently secure the best, most affordable financial products for your business. For more information on credit loans and other small business topics, check out 5starprocessing.com/blog and subscribe to our YouTube channel for more details.",
                icon: Scale,
                image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative min-h-[250px]">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-slate-900/90 md:bg-gradient-to-r md:from-transparent md:to-slate-900/90" />
                    <div className="absolute top-6 left-6 w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg z-10">
                      <item.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-white mb-6">{item.title}</h3>
                    <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center mt-20"
          >
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🔵 FAQ SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-8"
            >
              FAQ’s
            </motion.h2>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
