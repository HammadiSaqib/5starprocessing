"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Car, 
  Stethoscope, 
  Truck, 
  Utensils, 
  ShoppingCart, 
  Shield, 
  Server, 
  Calculator, 
  Landmark, 
  Download, 
  Plane, 
  GraduationCap, 
  FileText, 
  Search, 
  Box
} from "lucide-react";
import Link from "next/link";

export default function IndustriesPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const industries = [
    { name: "Auto Dealership", icon: Car, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80" },
    { name: "Veterinary Services", icon: Stethoscope, image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80" },
    { name: "Towing Companies", icon: Truck, image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80" },
    { name: "Hospitality Businesses", icon: Utensils, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" },
    { name: "E-commerce", icon: ShoppingCart, image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80" },
    { name: "Insurance", icon: Shield, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" },
    { name: "SaaS Companies", icon: Server, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
    { name: "Accounting & Tax Prep", icon: Calculator, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" },
    { name: "Cashback", icon: Landmark, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80" },
    { name: "Debt Consolidation", icon: FileText, image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80" },
    { name: "Digital Downloads", icon: Download, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
    { name: "Airlines", icon: Plane, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80" },
    { name: "Educational Seminars", icon: GraduationCap, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" },
    { name: "Document Preparation", icon: FileText, image: "https://images.unsplash.com/photo-1583521214660-68d265069545?auto=format&fit=crop&q=80" },
    { name: "SEO & SEM Services", icon: Search, image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80" },
    { name: "Drop Shipping", icon: Box, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 🔵 HERO / INDUSTRIES WE SUPPORT SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/50 z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50"
            style={{ backgroundPosition: '50% 50%' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-200 text-sm font-bold mb-8"
            >
              <Building2 className="w-4 h-4" />
              <span>Industries</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
            >
              Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Support</span>
            </motion.h1>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed space-y-6 max-w-3xl font-light"
            >
              <p>
                We offer a variety of traditional and forward-thinking payment solutions to help meet your business’s needs. Whether you’re looking to accept payments in person, online, or both, there are options for you!
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="grid sm:grid-cols-2 gap-4 max-w-2xl mb-10"
            >
              {[
                "Quick Approvals",
                "Easy Setup",
                "Cutting-Edge Hardware",
                "Accept All Major Cards",
                "24/7 Merchant Support",
                "Low Processing Fees"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-100 font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-brand-400" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all hover:-translate-y-1">
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 TYPES OF BUSINESSES WE SUPPORT SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight"
            >
              Types of Businesses We Support
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed font-light"
            >
              <p>
                In this day and age, customers are demanding a more convenient and contactless payment experience. From NFC payments to QR codes and everything in between, you can keep and earn loyal customers by expanding the options you offer. Here is a list of the many different types of businesses we can support with our superior merchant services:
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${industry.image}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {industry.name}
                  </h3>
                  <div className="h-1 w-12 bg-brand-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100 origin-left" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 READY TO GET STARTED SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light">
                Complete our 5 minute application and get approved for a merchant account to start accepting payments.
              </p>
              <div className="flex justify-center">
                <Link href="/signup" className="inline-flex items-center justify-center px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
