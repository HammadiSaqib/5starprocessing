"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  Briefcase, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Award,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8 shadow-lg"
            >
              <Users className="w-4 h-4 text-brand-400" />
              <span>ABOUT US</span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-xl"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">5 Star Processing</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 🔵 INTRO / BRAND STORY SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight">Who We Are</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  5 Star Processing is a modern payment solutions company dedicated to helping businesses accept payments securely, efficiently, and with confidence. We specialize in merchant services, high-risk payment processing, POS systems, mobile payments, and business credit-building solutions designed to support businesses at every stage of growth.
                </p>
                <p>
                  Our mission is simple: provide reliable payment technology, transparent solutions, and hands-on support that empowers business owners to operate and scale without unnecessary obstacles.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="relative h-[400px] w-full" /> 
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Trusted Partner</p>
                    <p className="text-sm text-slate-500">For Growing Businesses</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 OUR APPROACH SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-slate-900">Tailored for You</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We customize every aspect of our service to match your specific needs, ensuring you get the most efficient and cost-effective solution possible.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Our Approach to Payment Solutions</h2>
              <div className="w-24 h-2 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full mb-8" />
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  We understand that no two businesses are alike. That’s why we take a consultative approach to payment processing. Instead of offering one-size-fits-all solutions, we work closely with each client to understand their industry, transaction volume, risk profile, and long-term goals.
                </p>
                <p>
                  From small startups to established enterprises, our solutions are built to adapt as your business evolves.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT WE DO SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6 text-slate-900"
            >
              What We Do
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600"
            >
              5 Star Processing provides a full suite of payment and business support services.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Merchant Payment Processing",
                desc: "For in-store, online, and mobile businesses.",
                icon: CreditCard,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "High-Risk Merchant Accounts",
                desc: "Specialized solutions for high-risk industries.",
                icon: ShieldCheck,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "POS Systems & Terminals",
                desc: "Modern hardware for small businesses.",
                icon: Briefcase,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Mobile Processing",
                desc: "Accept payments anywhere with mobile solutions.",
                icon: TrendingUp,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Business Credit Building",
                desc: "Net 30 programs to build your business credit.",
                icon: TrendingUp,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Fraud Prevention",
                desc: "Secure transaction processing to protect your revenue.",
                icon: Lock,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Account Management",
                desc: "Ongoing support and dedicated account managers.",
                icon: Users,
                color: "text-brand-600",
                bg: "bg-brand-50"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-3xl opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-center mt-16 max-w-3xl mx-auto"
          >
            <p className="text-xl text-slate-600 font-medium">
              Our goal is to simplify payments so business owners can focus on running their operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🔵 WHY CHOOSE US SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Why Businesses Choose 5 Star Processing</h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Businesses choose 5 Star Processing because we combine advanced technology with personalized service. We don’t just set up accounts — we build long-term partnerships.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Transparent pricing with no hidden surprises",
                    "Support for both low-risk and high-risk industries",
                    "Secure, compliant payment infrastructure",
                    "Fast onboarding and responsive customer support",
                    "Scalable solutions that grow with your business"
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 text-brand-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-lg text-slate-900 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[600px]"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Accelerate Your Growth</h3>
                  <p className="text-slate-200">Join thousands of businesses that trust us with their payment processing.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 COMMITMENT SECTION */}
      <section className="py-24 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 text-brand-300">
              <Globe className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Our Commitment to Businesses</h2>
            <p className="text-xl md:text-2xl text-brand-100 leading-relaxed mb-10 font-light">
              We are committed to helping businesses succeed by removing friction from the payment process. Whether you’re opening your first merchant account or restructuring your payment systems, our team is here to guide you every step of the way.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-2xl">
              <p className="text-2xl font-bold text-white">
                &quot;Our success is measured by the success of the businesses we serve.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔵 COMPLIANCE & SECURITY SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
               <div className="relative">
                 <div className="absolute inset-0 bg-brand-500 blur-3xl opacity-20 rounded-full" />
                 <ShieldCheck className="w-40 h-40 text-brand-600 relative z-10 drop-shadow-2xl" />
               </div>
            </motion.div>
            <motion.div 
              className="md:w-2/3"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Security and Compliance</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Security is at the core of everything we do. Our payment solutions follow industry standards for encryption, data protection, and fraud prevention to ensure sensitive information is handled responsibly.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We continuously work with trusted partners and payment networks to maintain compliance and protect our clients and their customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 CALL TO ACTION SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}></div>
        <div className="absolute inset-0 bg-slate-900/90"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Work With a Trusted Payment Partner?</h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Whether you’re looking to accept payments, reduce processing costs, or build stronger financial foundations for your business, 5 Star Processing is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 hover:-translate-y-1 w-full sm:w-auto text-lg">
                Get Started
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full font-bold transition-all w-full sm:w-auto flex items-center justify-center gap-2 text-lg hover:-translate-y-1">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
