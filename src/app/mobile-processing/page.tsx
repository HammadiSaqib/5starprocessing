"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  CreditCard, 
  Wifi, 
  CheckCircle, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Users,
  Settings,
  Lock,
  Wallet
} from "lucide-react";
import Link from "next/link";

export default function MobileProcessingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-brand-600 selection:text-white">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
          <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[80%] bg-brand-500/10 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
          <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-brand-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2 relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-semibold mb-8"
              >
                <Smartphone className="w-4 h-4" />
                <span>MOBILE SOLUTIONS</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] text-slate-900 tracking-tight"
              >
                Mobile Credit Card <br />
                Processing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Small Businesses</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 mb-10"
              >
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium max-w-xl">
                  Make your business transactions effortless, and ensure a seamless customer experience with mobile credit card processing through 5 Star. Our services help businesses like yours elevate their sales procedures, guiding every customer to close with fast, secure, and convenient mobile payment options.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/signup" className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/partner" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-brand-200 flex items-center gap-2 justify-center shadow-sm hover:shadow-lg">
                  Become a Partner
                </Link>
              </motion.div>
            </div>

            {/* Right Visual - 3D Mockup */}
            <motion.div 
              initial={{ opacity: 0, rotateY: -12, rotateX: 5, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: -6, rotateX: 2, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 30 }}
              className="lg:w-1/2 perspective-1000 relative"
            >
              <div className="relative mx-auto w-[320px] h-[640px] bg-slate-900 border-[12px] border-slate-950 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-0 hover:rotate-[-6deg] transition-transform duration-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-xl z-30" />
                
                {/* Screen Content */}
                <div className="absolute inset-0 bg-white z-10 flex flex-col">
                   {/* App Header */}
                   <div className="bg-brand-600 p-8 pt-12 text-white">
                      <div className="flex justify-between items-center mb-6">
                         <div className="w-8 h-8 bg-white/20 rounded-full" />
                         <div className="text-sm font-bold">5 Star App</div>
                         <Settings className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="text-3xl font-bold mb-1">$1,240.50</div>
                      <div className="text-brand-100 text-sm">Today&apos;s Sales</div>
                   </div>

                   {/* Transaction List */}
                   <div className="flex-1 p-6 bg-slate-50 space-y-4">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Transactions</div>
                      {[
                         { name: "Payment Received", time: "Just now", amount: "+$450.00", status: "Approved" },
                         { name: "Coffee Shop", time: "2 hrs ago", amount: "+$24.50", status: "Approved" },
                         { name: "Consulting", time: "5 hrs ago", amount: "+$120.00", status: "Approved" },
                         { name: "Retail Sale", time: "Yesterday", amount: "+$89.99", status: "Approved" },
                      ].map((t, i) => (
                         <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                  <CheckCircle className="w-5 h-5" />
                               </div>
                               <div>
                                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                  <div className="text-xs text-slate-500">{t.time}</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-bold text-slate-900">{t.amount}</div>
                               <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">{t.status}</div>
                            </div>
                         </div>
                      ))}
                   </div>

                   {/* Floating Action Button */}
                   <div className="absolute bottom-6 right-6">
                      <div className="w-14 h-14 bg-brand-600 rounded-full shadow-lg shadow-brand-500/40 flex items-center justify-center text-white">
                         <CreditCard className="w-6 h-6" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-20 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block"
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                       <Wifi className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="font-bold text-slate-900">Connected</div>
                       <div className="text-xs text-slate-500">Signal Strong</div>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-40 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block"
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="font-bold text-slate-900">Secure</div>
                       <div className="text-xs text-slate-500">Encrypted</div>
                    </div>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 MANAGE BUSINESS FINANCES SECTION - Bento Grid Style */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.25]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
             <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-2 block">Seamless Management</span>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Manage Business Finances Through Your Phone</h2>
             <p className="text-xl text-slate-600 leading-relaxed">
               Smartphones are more than accessories today — they’re major business assets that allow us to manage our businesses with greater flexibility, accessibility, and convenience than ever before.
             </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
             {/* Main Content Block */}
             <div className="md:col-span-8 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 hover:border-brand-200 transition-colors duration-300">
                <div className="prose prose-lg text-slate-600 max-w-none">
                   <p className="mb-6">
                     Our mobile-first solutions allow you to manage your small business finances on the go, using your smartphone as your center of operations. At vendor events that take you away from your usual business location, then a mobile credit card processor allows you to verify and accept payments without cumbersome bookkeeping or heightened risks of fraud.
                   </p>
                   <p className="mb-6">
                     For those with a mobile-only business, then credit card processing optimized for mobile devices will keep your financial transactions secure and ensure you are only accepting valid, verified cards.
                   </p>
                   <p>
                     You may also consider adopting a hybrid approach that combines a post-of-sale system with mobile credit card processing to minimize non-qualified transactions that cost your business money.
                   </p>
                </div>
             </div>

             {/* Feature Cards Column */}
             <div className="md:col-span-4 space-y-6">
                <div className="bg-brand-600 rounded-[2.5rem] p-8 text-white h-full flex flex-col justify-between relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div>
                      <Smartphone className="w-10 h-10 mb-4 text-brand-200" />
                      <h3 className="text-2xl font-bold mb-2">No Expensive POS</h3>
                      <p className="text-brand-100 leading-relaxed">
                        We want to help every business owner succeed, and part of that is allowing them to leverage the technology they already have access to.
                      </p>
                   </div>
                </div>
             </div>
             
             {/* Bottom Full Width Card */}
             <div className="md:col-span-12 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">Leverage Existing Tech</h3>
                   <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                     Mobile payment processing eliminates the need for an expensive POS system, granting you the ability to serve all of your customers with the tap of a few buttons.
                   </p>
                   <div className="flex flex-wrap gap-4">
                     <Link href="/signup" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20">
                       Get Started
                     </Link>
                     <Link href="/partner" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                       Become a Partner
                     </Link>
                   </div>
                </div>
                
                {/* Feature Icons Grid */}
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                   {[
                     { title: "Secure Transactions", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
                     { title: "Flexible Operations", icon: Wifi, color: "text-brand-600", bg: "bg-brand-50" },
                     { title: "Fraud Protection", icon: Lock, color: "text-brand-600", bg: "bg-brand-50" },
                     { title: "Instant Access", icon: Wallet, color: "text-brand-600", bg: "bg-brand-50" }
                   ].map((item, i) => (
                     <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                           <item.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🔵 ACCEPTING PAYMENTS SECTION - Dark Mode Contrast */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.4]" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/70" />
        </div>

        <div className="absolute inset-0 bg-brand-900/20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                >
                   <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                     Mobile Credit Card Processing: <br/>
                     <span className="text-brand-400">How to Accept Credit Card Payments on Your Phone</span>
                   </h2>
                   
                   <div className="space-y-6">
                      {[
                        { step: "01", text: "Open a merchant account with 5-Star Processing" },
                        { step: "02", text: "Download your POS mobile application" },
                        { step: "03", text: "Pair your smartphone with a compatible mobile credit card reader" },
                        { step: "04", text: "Prompt customers to insert, swipe, or tap their credit card on the reader" },
                        { step: "05", text: "Receive instant payment processing data through your smartphone" }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-6 group"
                        >
                          <div className="text-3xl font-bold text-slate-700 group-hover:text-brand-400 transition-colors">
                             {item.step}
                          </div>
                          <div className="pt-1">
                             <p className="text-lg text-slate-300 font-medium group-hover:text-white transition-colors border-b border-slate-800 pb-4 w-full block">
                                {item.text}
                             </p>
                          </div>
                        </motion.div>
                      ))}
                   </div>
                </motion.div>
             </div>

             <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-600 to-purple-600 rounded-[3rem] blur-2xl opacity-30" />
                <div className="bg-slate-800 rounded-[2.5rem] p-10 border border-slate-700 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Smartphone className="w-64 h-64 text-white" />
                   </div>
                   
                   <div className="relative z-10 space-y-8">
                      <div>
                         <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-brand-400" />
                            Cash-Free & Secure
                         </h3>
                         <p className="text-slate-400 leading-relaxed">
                           With our mobile-driven software, you can enjoy cash-free transactions and easily process credit card payments as a small business owner.
                         </p>
                      </div>
                      
                      <div>
                         <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-brand-400" />
                            Safety First
                         </h3>
                         <p className="text-slate-400 leading-relaxed">
                           There’s also the added benefit of safety. Employees will not have to manage cash or take checks to the bank, which can reduce their risk of being robbed. Businesses that opt for a mobile payment system can also minimize the risk of employee theft, too. Because there is no physical cash to manage, you never have to worry about counting registers and accounting for every transaction.
                         </p>
                      </div>

                      <div>
                         <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-brand-400" />
                            Customer Experience
                         </h3>
                         <p className="text-slate-400 leading-relaxed">
                           Customers can sign and receive receipts instantly from your phone, meaning that you are able to provide on-demand payments and excellent customer service no matter where you operate.
                         </p>
                      </div>

                      <Link href="/contact" className="inline-flex items-center justify-center w-full px-6 py-4 text-black bg-white rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg hover:scale-[1.02] transform duration-300">
                        Contact Us
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🔵 COMPATIBILITY SECTION - Infinite Scroll Marquee style */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Bank With the World’s Leading Payment Providers</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            At 5 Star Processing, we understand the importance of delivering the best service to our clients. By accepting all major credit cards and forms of payment, your business reputation increases and customers see you as more trustworthy.
          </p>
          <p className="text-lg text-brand-600 font-semibold">
            Our mobile credit card processing is compatible with:
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-10 bg-white shadow-sm border-y border-slate-100">
           <div className="flex gap-8 items-center justify-center flex-wrap max-w-6xl mx-auto">
             {["American Express", "Mastercard", "Visa", "Discover", "Apple Pay", "eChecks", "JCB"].map((brand, i) => (
               <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="px-8 py-4 bg-slate-50 rounded-2xl text-slate-700 font-bold text-xl border border-slate-200 shadow-sm hover:border-brand-200 hover:text-brand-600 hover:shadow-md transition-all cursor-default flex items-center gap-3"
               >
                  <CreditCard className="w-6 h-6 opacity-50" />
                  {brand}
               </motion.div>
             ))}
           </div>
        </div>

        <div className="container mx-auto px-4 text-center mt-16">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Regardless of the card brand, we ensure that you will be able to provide your customers with a reliable, secure payment processing service. This creates a more positive sales experience, boosting customer satisfaction and lasting loyalty.
              </p>
              <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </section>

      {/* 🔵 MOBILE BENEFITS SECTION - Modern Split */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.3]" />
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 transform translate-x-20 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Mobile Benefits */}
            <div>
              <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-semibold mb-6"
              >
                <MapPin className="w-4 h-4" />
                <span>FREEDOM</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 tracking-tight">Make Money <br/> <span className="text-brand-600">Wherever You Go</span></h2>
              
              <div className="prose prose-lg text-slate-600 mb-10">
                 <p>
                   Thanks to the integration of a mobile credit card processor, you can use your smartphone as a portable cash register. All you need to do is pair it with a credit card reader for Android or Apple, so you can start processing payments for sales you make on the go.
                 </p>
                 <p>
                   Processing credit cards on your phone is a great way to operate efficiently outside of a traditional business space. If you set up shop at markets, fairs, or even take your business to conferences and trade shows, mobile credit card readers and payment processing ensure you can generate revenue and track your financial growth everywhere.
                 </p>
              </div>

              <Link href="/contact" className="text-brand-600 font-bold hover:text-brand-700 flex items-center gap-2 text-lg group">
                Contact Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Tailored Solutions Card */}
            <div className="relative">
               <div className="absolute -inset-2 bg-gradient-to-tr from-brand-200 to-slate-200 rounded-[2.5rem] blur-xl opacity-50" />
               <div className="bg-white p-10 md:p-14 rounded-[2rem] border border-slate-100 shadow-2xl relative">
                 <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                   <Settings className="w-8 h-8 text-white" />
                 </div>
                 
                 <h3 className="text-3xl font-bold text-slate-900 mb-6">Tailored Payment Processing for All Your Needs</h3>
                 
                 <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                    <p>
                      We aim to deliver personalized mobile credit card processing services to small businesses in a variety of high-risk industries. Through dedicated customer support and educational resources, we ensure you have all the information you need to deliver outstanding service through our systems.
                    </p>
                    <p>
                      And when it comes to cost, we aim to keep our services as accessible as possible.
                    </p>
                    <p>
                      Our competitive pricing solutions allow us to provide greater support to businesses that may be traditionally isolated from more expensive payment processing providers. If you have questions about our services or how we can help you, please contact us today.
                    </p>
                 </div>

                 <div className="mt-10 pt-10 border-t border-slate-100">
                    <Link href="/contact" className="w-full block text-center py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1">
                      Contact Us
                    </Link>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
