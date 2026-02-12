"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Award, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  TrendingUp, 
  CreditCard, 
  Lock, 
  Layout, 
  Star, 
  BookOpen, 
  Gift, 
  HelpCircle,
  Briefcase,
  BarChart
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CredibilityProgramPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a Net 30 account?",
      a: "A Net 30 account is a trade credit agreement where you have 30 days to pay the full invoice amount after purchasing goods or services. It helps build business credit as payments are reported to credit bureaus."
    },
    {
      q: "Does this require a personal guarantee?",
      a: "No. Our Net 30 Business Credibility Program is designed to build business credit without putting your personal assets at risk. No personal guarantee is required."
    },
    {
      q: "How fast will my credit score improve?",
      a: "While every business is different, consistent on-time payments reported monthly can start positively impacting your business credit profile within 30-90 days."
    },
    {
      q: "What is the 5 Star University?",
      a: "5 Star University is our educational platform included with membership, offering courses on financial literacy, business growth, and credit building strategies."
    }
  ];

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
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8 shadow-lg"
            >
              <Award className="w-4 h-4 text-brand-400" />
              <span>Business Credibility Program</span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-xl"
            >
              Build Business Credit Fast <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">With a Net 30 Account</span>
            </motion.h1>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed space-y-6 max-w-3xl mx-auto"
            >
              <p className="drop-shadow-md">
                The Net 30 Program by 5 Star Processing is designed to propel your business forward through predictable, strategic credit building solutions.
              </p>
              <p className="drop-shadow-md">
                There are no hidden fees, zero interest, and no complicated terms and conditions to worry about. We’ve created this solution to include business credit in a way that’s easy and accessible, because we think everyone deserves the opportunity to grow.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-1 ring-4 ring-brand-600/20">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT DOES NET 30 MEAN SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-100 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-600 text-sm font-bold mb-6 border border-brand-100">
                  <Clock className="w-4 h-4" />
                  <span>What Does Net 30 Mean?</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">What Does Net 30 Mean?</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  In financing terms, net 30 days. It’s an easy way to secure payments and make your cash flow more predictable.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We’ve adopted this approach to create a 30-day, monthly subscription program that helps you build credit without worrying about managing cards, interest, and bank accounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 text-lg group">
                    Get Started 
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/partner" className="inline-flex items-center text-slate-600 font-bold hover:text-slate-900 text-lg group">
                    Become a Partner 
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* No Personal Guarantee Highlight */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-slate-900 rounded-[2.5rem] transform rotate-3 opacity-10" />
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden h-full transform hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-500/20 text-white transform rotate-3">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">How to Build Business Credit Fast Without Personal Guarantee</h3>
                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p>
                      A personal guarantee is a legal promise that you will repay a company for lending your business money if your business isn’t able to fulfill its financial obligations to the lender. You become solely responsible for making the required payments.
                    </p>
                    <p>
                      No one wants to put themselves in that position, and small businesses are at a disadvantage when it comes to jeopardize their financial well-being to build credit.
                    </p>
                    <p>
                      Our Net 30 business credit building program offers you a way to increase your credit without the need personal guarantees.
                    </p>
                    <p>
                      We use a simple monthly subscription program to report good payment habits and send them to credit bureaus. You enjoy stronger credit reports and a better reputation that can help you secure funding and grow your business.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 DISCOVER BENEFITS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Discover the Benefits of a Net 30 Account
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              We’ve simplified the business credit reporting process so you can increase your score without being overwhelmed by managing accounts, cards, and hidden fees. Through the Net 30 credit building program, we can help you with the following:
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Automate Your Credit Building",
                desc: "We report your business credit to the major credit bureaus every month, so you can feel confident knowing that your score is increasing while you focus on strategic growth.",
                icon: TrendingUp,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "Reduce Your Risk of Failure by Up to 80%",
                desc: "Through the Net 30 Program, we’ve helped new businesses in high-risk industries lower their risk of failure and increase their financial security.",
                icon: ShieldCheck,
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                title: "Save Money on Unhelpful Resources",
                desc: "Never waste money again on courses, books, or lending programs that don’t deliver a real return on investment (ROI).",
                icon: CreditCard,
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                title: "Stop Searching for the Best Credit Building Credit Cards",
                desc: "You can prioritize your business’s financial health by focusing on strategic growth through consistent reporting, not expensive credit card payments.",
                icon: Lock,
                color: "text-orange-600",
                bg: "bg-orange-50"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-2xl opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🔵 MEMBERSHIP BENEFITS SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 sticky top-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-bold mb-6">
                  <Star className="w-4 h-4" />
                  <span>Exclusive Perks</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Join the Net 30 Program Now and Unlock Exclusive Membership Benefits
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We aren’t just a reporting company. We’re your business finance heroes. Our goal is to make building credit a learning experience, so we’ve compiled several resources for our members that help them continue to grow their businesses with confidence.
                </p>
                <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 grid gap-6">
              {[
                { 
                  title: "THE NET 30 PORTAL", 
                  desc: "Once you join, you’ll gain instant and unlimited access to the Net 30 Portal, a one-stop solution for business funding, business credit, and business growth advice from experts.", 
                  icon: Layout 
                },
                { 
                  title: "ROCKET REVIEW TOOL", 
                  desc: "Did you know 85% of customers read reviews before making a purchase? Net 30 members receive access to Rocket Review for free, allowing you to build a 5-star business online through automated review generation and reputation management.", 
                  icon: Star 
                },
                { 
                  title: "5 STAR UNIVERSITY", 
                  desc: "Learn everything you need to grow your business and achieve remarkable results with a comprehensive business plan. Our courses cover everything you need to know about building business credit fast through methods bureaus favor.", 
                  icon: BookOpen 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-600 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 FLEXIBLE PAYMENT & PROMOTION SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Flexible Payment Options for Every Business’s Budget
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Explore our payment options below. You can easily scale or modify your subscription to suit your needs as your business transforms.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-slate-900/95" />
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
            />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold mb-8 animate-pulse">
                <Gift className="w-5 h-5" />
                <span>LIMITED TIME OFFER</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Get 50% Off for a <br className="hidden md:block" />
                <span className="text-brand-300">Limited Time Only!</span>
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-8 mb-12 text-lg md:text-xl text-slate-200 leading-relaxed">
                <p>
                  All of our offers are currently 50% off to make accessing the best business credit building solutions even easier. You can’t get any better than our Black Diamond package, which includes all of our membership benefits plus an 85% reporting timeline that helps skyrocket your business credit growth.
                </p>
                <p className="font-bold text-white bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  For a limited time, members will also save $300 on Black Diamond subscriptions.
                </p>
              </div>

              <Link 
                href="/contact" 
                className="group relative inline-flex items-center px-12 py-6 bg-white text-brand-700 hover:text-brand-800 rounded-full font-bold text-xl transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Contact Us
                  <ArrowRight className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔵 FAQ SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 text-brand-600">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">FAQ’s</h2>
            <p className="text-slate-600">Common questions about our program</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {faq.q}
                  <span className={`transform transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""} text-brand-600 bg-brand-50 p-1 rounded-full`}>
                    ▼
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    {faq.a}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
