"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Truck, 
  CheckCircle, 
  ArrowRight, 
  MapPin, 
  Smartphone, 
  Shield, 
  Wifi, 
  CreditCard,
  Receipt,
  Zap,
  Star,
  Printer,
  Globe,
  DollarSign,
  Lock,
  Terminal,
  SmartphoneNfc,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function TowingPage() {
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
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white overflow-x-hidden perspective-1000">
      <Navbar />

      {/* 🔵 HERO / INTRO SECTION - Cinematic with Split Visual */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        {/* Cinematic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="lg:w-3/5"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-bold mb-8 backdrop-blur-sm">
                <Truck className="w-4 h-4" />
                <span>Mobile Payment Solutions for Towing Companies</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                Mobile Payment Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Towing Companies</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed space-y-6 max-w-2xl">
                <p>
                  Sometimes, running a towing company proves more strenuous than other occupations, from getting the right equipment to ensuring they’re always in working condition. Unlike other professions that don’t take to the streets, receiving payments may also be a hassle. So, are you looking for mobile payment solutions for towing companies to make the payment process more accessible to you and your customers?
                </p>
                <p className="border-l-4 border-brand-500 pl-6 italic text-slate-400">
                  At 5-Star Processing in Elk Grove, CA, payment versatility is any business owner’s best friend. Not only does it create more convenience for customers, but it also better guarantees you’ll receive payments in a timely manner. We offer a wide range of processing services, but before delving into them, let’s discuss why mobile payment solutions are crucial for your towing business.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1 group">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual - Glass Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 w-full hidden lg:block"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-brand-500/20 rounded-full flex items-center justify-center mb-8 border border-brand-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <Truck className="w-12 h-12 text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">On-The-Go Payments</h3>
                  <p className="text-slate-300">Accept payments anywhere your truck goes. Secure, fast, and reliable mobile solutions.</p>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-10 left-10 w-2 h-2 bg-brand-400 rounded-full animate-pulse delay-700" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHY THE RISE OF MOBILE PAYMENTS SECTION - Centered Focus */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506306460320-9114777b58c7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
               <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Industry Trends</span>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
                 Why the Rise of Mobile Payments in the Towing Industry?
               </h2>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg text-slate-600 leading-relaxed"
            >
              <p>
                If you work in towing, you understand the unpredictability of the position. From emergency calls in the morning hours when someone’s car breaks down to towing services needed miles from your garage, calls can come in at any time, from any place. While you may have a payment system set up in your store, it won’t do much good when you’re out on the road.
              </p>
              <p>
                Therefore, you need a flexible and reliable system that allows you to charge a customer and take an electronic payment for towing. Other reasons you should consider switching to cashless towing services when working remotely include the following.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 BENEFITS GRID SECTION - Modern Cards with Hover Effects */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Reducing Delayed Funds",
                desc: "Once you complete a job, the last thing you want is to wait for a payment to process, which could take hours or even days to complete. Anything can cause delayed funds, from global events and natural disasters to weekends and national holidays. The right point of sales system provides speedy access to your hard-earned money so you can care for company expenses and other factors without delay.",
                icon: DollarSign,
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                title: "Saving You From Fees",
                desc: "Credit card payments may leave you with transaction fees you could do without, especially if your customers input the information in the keyed card manner since banks consider these a higher fraudulent risk. Since each towing job cost varies, so do the costs, meaning these fees can severely cut into your profits in some cases. What’s more, POS systems:\n\nHave a minimal margin of error, which provides you with more accuracy on taxes, so you can reap more savings and lower your tax costs\n\nPrevent you from having to hire a professional bookkeeper or accountant, keeping more of your own money in your pocket while still receiving high-end assistance",
                icon: Receipt,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "Security Concerns",
                desc: "POS systems make any credit card payment for towing safer by introducing whitelisting-specific technology. For instance, it uses code-signing and chip readers (which makes card replications more difficult than card swiping). You could also further improve these mobile payment solutions for towing companies by installing end-to-end encryption, employee lockdown practices, and Antivirus software.\n\nWith top-notch security, not only do you protect your and your customers’ financial and other personal information from hackers and other thefts, but you also protect your company's name and reputation.",
                icon: Shield,
                color: "text-purple-600",
                bg: "bg-purple-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:border-brand-200 transition-all group relative overflow-hidden"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                  {item.desc}
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-slate-50 to-transparent rounded-tl-[3rem] -mr-4 -mb-4 z-0 pointer-events-none group-hover:from-brand-50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 HOW TO CHOOSE / PORTABLE VS CENTRALIZED SECTION - Timeline Style */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605218427306-6354d43153ea?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              How to Choose the Best POS System for You
            </motion.h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
             {[
               {
                 title: "Portable Versus Centralized",
                 text: "POS systems come in two forms: portable and centralized. While physical stores that have most or all of their business take place at one specific location may prefer the centralized payment center set up with a register, your towing company would benefit best from a portable mobile card reader. By accepting mobile payments, you have a reliable solution that provides seamless transactions in different locations."
               },
               {
                 title: "Payment Processors",
                 text: "Depending on the payment types you’re willing to receive, this can affect the POS system you choose since you want it to be compatible. Like all other businesses that accept credit cards, you should also consider the types of credit card payments according to fees.\n\nAlthough POS systems create competitive rates by safeguarding profit margins, some credit cards have a higher processing fee. For instance, American Express charges between 1.43% and 3.3% plus an additional $0.10 for each transaction, while MasterCard charges 1.15% to 2.5% plus $0.05 to $0.10 per transaction."
               },
               {
                 title: "Digital Versus Printed Receipts",
                 text: "Since we’re living in a digital age where most customers prefer for companies to email them a digital copy of their receipts to save paper, you may want to opt for a printerless POS system. However, some customers prefer the old-fashioned printed receipt, especially if they’re not tech-savvy, so spending the extra cash on a POS system would prove more versatile, contributing to higher customer satisfaction."
               },
               {
                 title: "Contact Versus Contact-Less Payments",
                 text: "While some POS systems provide chip, swipe, and keyed card contact payment methods for credit cards, contactless payments have increased in popularity by 30% within the last year. Therefore, to meet the needs of modern customers, enhance future and present transactions by installing a POS system that takes Apple Pay, Google Pay, or some other form of contactless payment."
               }
             ].map((step, index) => (
               <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row gap-8 bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                      {step.text}
                    </p>
                    <Link href="/signup" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors group/link">
                      Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 🔵 TOP POS SYSTEMS SECTION - Modern Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Some of Our Top POS Systems
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Clover is one of the top POS systems we offer that offers versatility, from touchscreens to contactless payments, from centralized registers and cash dispensers to mobile systems. However, we also offer the following terminals:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Dejaavoo", 
                desc: "Dejaavoo has provided over 20 years of reliability with a classic design and is one of the most economical systems on the market.",
                icon: CreditCard,
                bg: "bg-brand-50",
                text: "text-brand-600"
              },
              { 
                title: "Ingenico", 
                desc: "Ingenico is a more lightweight option, especially beneficial for small spaces due to its cloud-based payment options. However, you can also install card readers and pin pads for more versatility.",
                icon: Smartphone,
                bg: "bg-brand-50",
                text: "text-brand-600"
              },
              { 
                title: "PAX", 
                desc: "PAX is known for its minimalistic and straightforward technology and simple design that doesn’t take up much space.",
                icon: Terminal,
                bg: "bg-brand-50",
                text: "text-brand-600"
              },
              { 
                title: "IProcess Mobile App", 
                desc: "IProcess Mobile App allows customers to make payments on their phones from their bank accounts via the free app.",
                icon: Globe,
                bg: "bg-brand-50",
                text: "text-brand-600"
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group flex flex-col"
              >
                <div className={`w-14 h-14 ${system.bg} rounded-2xl flex items-center justify-center ${system.text} mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <system.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{system.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {system.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 BRAND VALUE / FINAL CTA SECTION - Gradient */}
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
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.2] mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-brand-800/90" />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm text-white mb-8 border border-white/20">
                 <Star className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Five-Star Processing Is in Our Name!
              </h2>
              <p className="text-xl text-brand-50 mb-10 leading-relaxed">
                Despite your business size, cashless towing services with POS systems are the key to the fast and regular payments your company depends on.
              </p>
              <p className="text-xl text-brand-50 mb-10 leading-relaxed">
                At 5-Star Processing, we carry the top processing service of different varieties, so you can customize yours to suit your needs. To learn more about towing management software, GPS and fleet management, and mobile payment solutions for towing companies, call 888-253-9692!
              </p>
              <div className="flex justify-center">
                <Link href="/signup" className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-600 hover:bg-slate-50 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 group">
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
