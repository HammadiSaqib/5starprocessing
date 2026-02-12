"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  TrendingUp, 
  CreditCard, 
  FileText,
  Clock,
  Shield,
  Headphones,
  Users,
  Building,
  CheckCircle2,
  Activity,
  Globe
} from "lucide-react";
import Link from "next/link";


export default function HighRiskPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-600 selection:text-white overflow-x-hidden perspective-1000">
      <Navbar />

      {/* 🔵 HERO SECTION - Dark & Secure Theme */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-bold mb-8 backdrop-blur-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>High Risk Merchant Accounts</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                Trustworthy High-Risk Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Solutions for Your Business</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
                <p>
                  5 Star Processing has distinguished itself as a leader in the high-risk merchant service space. Our team, which has decades of industry experience, leads the field in providing unmatched customer attention and the highest levels of customer satisfaction.
                </p>
                <p>
                  Our team can evaluate your current situation and offer professional advice based on your business needs. When you work with us, you will receive the following:
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <ul className="space-y-4">
                    {[
                      "Payment processing with major providers like Visa, Mastercard, American Express, and Apple Pay",
                      "The starting price of 2%",
                      "Easy integration with your current POS or CRM software",
                      "Data encryption through a high-risk merchant payment gateway"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base md:text-lg">
                        <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-slate-400 text-base">
                  Additionally, 5 Star Processing can assist high-volume merchants and ACH processing. We have a variety of payment platforms, including high-risk payment gateways and credit card point-of-sale solutions.
                </p>
                <p className="text-slate-400 text-base">
                  Our hardworking team is ready to help you right now. To discuss all of your domestic high-risk merchant processing needs, contact us right away.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1 group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm">
                  Become a Partner
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual - 3D Shield Composition */}
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.2, type: "spring" }}
               className="relative perspective-1000 hidden lg:flex justify-center items-center h-full"
            >
               <div className="relative w-96 h-96">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-brand-500/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border-2 border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                  
                  {/* Shield Core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-80 bg-gradient-to-b from-brand-600 to-slate-900 rounded-[4rem] border-4 border-brand-400/50 shadow-2xl shadow-brand-500/40 flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                        
                        <Shield className="w-32 h-32 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                        
                        {/* Floating Security Badges */}
                        <motion.div 
                           animate={{ y: [0, -10, 0] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                           className="absolute -right-8 top-20 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg flex items-center gap-2"
                        >
                           <Lock className="w-4 h-4 text-green-400" />
                           <span className="text-xs font-bold text-white">Encrypted</span>
                        </motion.div>

                        <motion.div 
                           animate={{ y: [0, 10, 0] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                           className="absolute -left-8 bottom-20 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg flex items-center gap-2"
                        >
                           <Activity className="w-4 h-4 text-brand-400" />
                           <span className="text-xs font-bold text-white">Monitoring</span>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 BENEFITS SECTION - Modern Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Advantages</span>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-8"
            >
              How Can You Benefit From Using Our High-Risk Merchant Account?
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group"
             >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Financial Control</h3>
                <p className="text-slate-600 leading-relaxed">
                  Choosing 5-Star Processing for your high-risk merchant account processing will lead to greater control over your business finances. We allow you to set criteria for accepting or rejecting transactions using customizable cascading rules and filters.
                </p>
             </motion.div>

             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               transition={{ delay: 0.1 }}
               className="bg-brand-600 p-8 rounded-[2rem] shadow-xl shadow-brand-500/20 text-white transform md:-translate-y-4"
             >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                   <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Enhanced Security</h3>
                <p className="text-brand-100 leading-relaxed">
                  We also offer increased security through a high-risk payment gateway, a specially designed software that protects your financial information and prevents fraud and data breaches.
                </p>
             </motion.div>

             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               transition={{ delay: 0.2 }}
               className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group"
             >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Global Reach</h3>
                <p className="text-slate-600 leading-relaxed">
                  You can also use our services to manage multiple high-risk merchant accounts with ease, expanding your business’s payment processing abilities thanks to compatibility with the world’s leading payment providers.
                </p>
             </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-16"
          >
            <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-lg transition-all hover:border-brand-300 hover:text-brand-600 hover:-translate-y-1">
              Become a Partner
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🔵 APPLICATION PROCESS SECTION - Timeline */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-16 text-center"
            >
              How Can You Apply for a High-Risk Merchant Account?
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Apply Online by Filling Out the Form",
                  desc: "Our easy application can be completed in as little as 5 minutes. Let’s get going.",
                  icon: FileText
                },
                {
                  title: "Request a Quote Right Away",
                  desc: "We’ll give you a free quote using industry minimum pricing.",
                  icon: FileText
                },
                {
                  title: "Start Taking Payments in Just 1-3 Business Days",
                  desc: "Our customer support team will help you set up. We’ll expedite the process for you.",
                  icon: Clock
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-center group hover:border-brand-200 transition-colors"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-2xl group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-inner">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 SERVICES PROVIDED SECTION - Bento/Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-8"
            >
              What Services Do We Provide?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              We are a merchant account provider that provides high-risk merchant accounts for businesses in need of protection. We specialize in providing merchant accounts for high-risk industries, such as financial services and healthcare. Our services include:
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Credit Card Processing",
                desc: "With our credit card processing service, we’ll take care of all the heavy lifting so you can focus on running your business. You’ll have all the benefits of a large processing company without any of the headaches or hassles.",
                icon: CreditCard,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Business Credit Building",
                desc: "Through our credit building solutions, we can help you build a reputable credit history aligned with standards set by major credit reporting bureaus, including Experian, Equifax, and TransUnion.",
                icon: Building,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Merchant Account Setup and Management",
                desc: "We help you with the setup and management of your high-risk merchant account.",
                icon: Users,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Fraud Prevention Services",
                desc: "Our advanced fraud monitoring helps protect your business from fraudulent transactions that damage your bottom line and harm your reputation.",
                icon: Shield,
                color: "text-brand-600",
                bg: "bg-brand-50"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:bg-white transition-all group"
              >
                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center ${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
            
            {/* Full Width Card for Support */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 rounded-[2.5rem] relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
               <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                     <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-bold mb-4">Customer Support</h3>
                     <p className="text-slate-300 leading-relaxed mb-6">
                       Our customer service is also available to you Monday through Friday, 9:00 am to 4:00 pm. Your business is important to you, and when you encounter an issue, you should not have to wait for help. When you choose 5 Star Processing, you are getting constant support. Get started with our team today, and you can start managing your accounts, taking payments, and monitoring for credit card fraud. And you can cancel at any time! We believe our low rates and wonderful customer service keep our customers coming back to us, so there are no contracts or cancellation fees.
                     </p>
                     <Link href="/contact" className="inline-flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors">
                        Contact Support <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 MISSION SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
            >
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600 mb-6">
                  <Activity className="w-6 h-6" />
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
                 Our Mission
               </h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              <p>
                Regardless of whether you have previously been rejected or shut down, our goal is to approve all merchants. We understand that mitigating factors like chargeback ratios and exponential monthly volume growth can ruin a bank relationship, leading to the closure of a merchant or the placing of significant holds on an account to guard the bank against losses.
              </p>
              <p>
                We are committed to trying our hardest to find solutions and approve your account. Our guiding principles are dedicated to excellence and going above and beyond to take advantage of every opportunity. We work hard to go above and beyond expectations and use our knowledge and skills to provide unmatched customer satisfaction.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
                Contact US
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHY CHOOSE US SECTION - CTA */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-brand-500/30"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15] mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-brand-800/90" />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-400/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Why Choose 5 Star Processing?
              </h2>
              <p className="text-xl text-brand-100 mb-10 leading-relaxed">
                We aim to offer high-risk merchant accounts and gateways for less money than our rivals. For many years, we have offered credit card processing services to businesses in various industries. By providing superior services to the retail, restaurant, MOTO, and high-risk industries, we have grown to become one of the best merchant account providers in the country. 5 Star Processing offers cutting-edge technology, round-the-clock customer service, technical support, and assistance with dispute resolution. Get started with us today by filling out our online application.
              </p>
              <div className="flex justify-center">
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 hover:bg-slate-50 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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


