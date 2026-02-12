"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  ArrowRight, 
  CreditCard,
  Clock,
  Laptop,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Phone,
  Heart,
  Activity,
  UserCheck
} from "lucide-react";
import Link from "next/link";

export default function VeterinaryPage() {
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

      {/* 🔵 HERO / INTRO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"
            style={{ backgroundPosition: '50% 30%' }}
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
              <Stethoscope className="w-4 h-4" />
              <span>Payment Processing Services for Veterinary Practices</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-sm"
            >
              Payment Processing Services for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Veterinary Practices</span>
            </motion.h1>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed space-y-6 max-w-3xl font-light"
            >
              <p>
                One thing most veterinary practices don’t consider when starting their business is the cost of collecting payments. You’re likely spending thousands of dollars every month processing payments from your customers. 
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 INTRO CARDS */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Optimize Operations</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Owners of veterinary clinics or managers need to continually find ways to optimize their operations, which means lowering costs wherever possible without compromising the quality of your service.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Maximize Revenue</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our 5-star veterinary payment processing solutions make it easy for you to manage your cash flows and maximize revenue from every appointment.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-brand-400 fill-brand-400" />
                  <span className="font-semibold text-brand-100">Care First</span>
                </div>
                <p className="text-2xl font-bold">Focus on your patients, not your payments.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 CREDIT CARD COSTS SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100 -skew-x-12 translate-x-32" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Credit Card Processing Costs the Average Vet Practice <span className="text-brand-600">$43,000</span> a Year
            </h2>
            <div className="h-1 w-24 bg-brand-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">The &quot;Card Not Present&quot; Impact</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    What constitutes a &quot;Card Not Present&quot; transaction? Online orders, like pet pharmacy prescriptions, and curbside pick-up orders fall under this category. Since these types of services have become more common among veterinary practices in recent years, clinics are also facing much higher processing fees.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-600 leading-relaxed">
                  The average processing fee for a veterinary clinic is 3.5%, and the rates can be higher depending on the type of card someone pays with. The merchant fee is also affected by whether or not a card was present during the transaction. &quot;Card Not Present&quot; transactions come with higher processing rates.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-brand-600 p-8 md:p-12 rounded-3xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">Industry Reality</h3>
              <p className="text-brand-100 leading-relaxed mb-6 relative z-10">
                TeleVet, one of the leading veterinary software providers, researched how much vets spend on payment processing and found that the average expense of a 2-DVM practice is $43,000 annually. That’s an entire salary wasted on processing card payments.
              </p>
              <div className="relative z-10 pt-6 border-t border-brand-500">
                 <p className="font-semibold">Don&apos;t let fees eat your profits.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Competitive Edge</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  For a practice that sees more business through these services, they may lose a large portion of additional revenue these conveniences generate. This is why finding the right payment processor is crucial. You can maintain a competitive edge by offering services your customers love while still saving money on payment processing.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  By working with 5 Star Processing, veterinary practices can reduce unnecessary fees and ensure they are receiving competitive pricing and transparent billing. This helps keep more money in your practice.
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1">
                  <span>Start Saving Today</span>
                  <div className="ml-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔵 BLUE FEATURE SECTION */}
      <section className="py-32 bg-slate-900 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-brand-900/60 to-slate-900" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.span 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="inline-block py-1 px-3 rounded-full bg-brand-500/20 text-brand-300 text-sm font-bold mb-6 border border-brand-500/30"
            >
              Seamless Integration
            </motion.span>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
            >
              5-Star Processing Makes <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Patient Payments Painless</span>
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
            >
              <p>
                Veterinary practices rely on specialized software to make managing their clinics easy. Practice Management Software (PMS) and Customer Relationship Management (CRM) platforms to manage accounts, send invoices, and log payment records. Some may come with a payment processor while others require separate software to have complete functionality.
              </p>
              <p>
                Our goal is to simplify payment processing for veterinary practices by offering a streamlined, straightforward service. We cover the most essential aspects of payment processing, such as credit card verification and data protection, while lowering your overall cost of ownership.
              </p>
              <p className="font-bold text-white pt-4">
                Take a look at some of the core features we offer:
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Competitive Transaction Fees",
                desc: "With high processing fees, your veterinary practice loses thousands of dollars a year. Minimize losses and maximize income with our competitive processing rates. With lower transaction fees across all payment providers, you can retain a higher profit margin and invest more funds back into your practice.",
                icon: TrendingUp,
                color: "from-brand-400 to-brand-500"
              },
              {
                title: "Quick Payouts",
                desc: "With some veterinary payment processing software, slow payouts can result in lost revenue and slow cash flows that negatively impact your business operations. Avoid wasting time and money waiting for payouts by trusting our rapid processing services.",
                icon: Clock,
                color: "from-brand-500 to-brand-600"
              },
              {
                title: "Easy-to-Use Software",
                desc: "We’ve made the 5-Star Payment Processing software extremely user-friendly. The design allows for veterinary practices to easily integrate the software into their workflows without leading to disruptions and lower customer satisfaction.",
                icon: Laptop,
                color: "from-brand-600 to-brand-700"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-brand-900/50 rounded-3xl p-8 border border-brand-500/30 max-w-3xl mx-auto text-center backdrop-blur-sm"
          >
            <p className="text-lg text-brand-100">
              You can easily onboard your veterinary receptionists and office staff, ensuring everyone remains up-to-date with client financial records. This can also reduce the risk of billing errors that cost your business more money.
            </p>
          </motion.div>

          <div className="flex justify-center mt-12">
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black hover:bg-brand-50 rounded-full font-bold text-lg transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-1">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🔵 PAYMENT PROVIDERS + SECURITY SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Providers */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
                Compatibility With the World’s Top Payment Providers
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                You can improve your customer experience by offering a wide range of payment processing options to all of your clients. Contactless pay has risen in popularity, and more customers are eager to work with modern veterinary practices that accept Apple Pay and Google Wallet.
              </p>
              
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-8">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "American Express",
                    "Visa",
                    "Mastercard",
                    "Discover",
                    "Apple Pay",
                    "Google Pay",
                    "eChecks"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-800 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Our services ensure that your practice can accept payments from a wider range of customers, giving you the opportunity to expand your practice and care for more animals.
                </p>
                <p>
                  We provide point-of-sale systems and payment processing software that accepts payments from all major providers, including:
                </p>
              </div>
            </motion.div>

            {/* Right: Security */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-100 to-blue-100 rounded-[2.5rem] transform rotate-3 opacity-50 blur-lg" />
              <div className="relative bg-white p-10 md:p-14 rounded-[2rem] shadow-xl border border-slate-100">
                <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-lg shadow-brand-500/30">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Comprehensive Security
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Security is crucial for any business, and even more critical when handling sensitive customer data. Our payment processing services utilize encryption to keep your transactions secure.
                </p>
                <Link href="/signup" className="w-full inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🔵 WHY CHOOSE SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-20 text-center max-w-5xl mx-auto leading-tight"
          >
            Why Your Veterinary Practice Should Choose <span className="text-brand-600">5-Star Payment Processing</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Tailored Service</h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed flex-grow">
                <p>
                  At 5 Star Processing, we make payment processing for veterinary practices easy and straightforward. Our services are optimized for your business and tailored to your needs.
                </p>
                <p>
                  Your current payment processor may not be providing the level of service or savings your practice deserves. By switching to 5 Star Processing, you gain access to better pricing, advanced tools, and dedicated support.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Dedicated Support</h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed flex-grow">
                <p>
                  But what happens when you run into a problem with your current payment processor? You likely find yourself sending emails that get stock answers and waiting for hours on the phone to talk to someone who doesn’t even know how to solve your issue.
                </p>
                <p>
                  5-Star Processing is always there for you. We’re available Monday through Friday, 9:00 am to 4:00 pm, and offer dedicated support to every client who needs our help. We don’t see you as “just another customer.” You deserve our time, attention, and assistance whenever you need it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 FINANCIAL EXPERTS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-soft-light" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Financial Experts on Your Side
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                You can contact 5-Star Processing anytime you have questions about our payment processing solutions. If you pair your payment processing with additional services, such as our business credit building or reporting services, then you’ll get regular reports about your business to ensure you always have accurate financial information.
              </p>
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white rounded-full font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔵 CTA SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Get Started Today
            </h2>
            <div className="space-y-8 text-xl text-slate-600 mb-12 leading-relaxed">
              <p>
                Learn more about our payment processing solutions today! If you have any questions, we would be happy to answer them. Schedule a free consultation call with a 5-Star Processing advisor to discuss your options. 
              </p>
              <p className="flex flex-col md:flex-row items-center justify-center gap-3 font-bold text-slate-900 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 inline-block">
                <Phone className="w-6 h-6 text-brand-600" />
                <span>You can send us a message or give us a call at (888) 253-9692.</span>
              </p>
              <p className="text-base">
                For more information about payment processing and business finance topics, check out our <Link href="/blog" className="text-brand-600 font-bold hover:underline">blog</Link>.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center px-10 py-5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
