"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Smartphone, 
  Zap, 
  Monitor, 
  Globe, 
  CreditCard, 
  Printer, 
  TrendingUp, 
  Lock, 
  Package,
  ShieldCheck,
  Server
} from "lucide-react";

export default function PosSystemsPage() {
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

      {/* 🔵 HERO SECTION - Cinematic & 3D */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 grayscale mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
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
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-bold mb-8 backdrop-blur-sm">
                <Monitor className="w-4 h-4" />
                <span>POS System for Small Businesses</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                Reliable, Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Payment Processing</span> for Small Businesses
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
                <p>
                  POS systems connect your business and customers through secure financial transactions. They allow your retail store or in-person business to process credit card payments seamlessly with automatic approval or rejection.
                </p>
                <p className="border-l-4 border-brand-500 pl-6 italic text-slate-400">
                  Take the weight off your shoulders with a POS system that simplifies your sales process and enhances your customer experience.
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

            {/* Right Visual - 3D CSS Composition */}
            <motion.div
               initial={{ opacity: 0, x: 50, rotateY: 15 }}
               animate={{ opacity: 1, x: 0, rotateY: -5 }}
               transition={{ duration: 1.2, type: "spring" }}
               className="relative perspective-1000 hidden lg:block"
            >
               <div className="relative w-full aspect-square max-w-[600px] mx-auto transform-style-3d rotate-y-0 rotate-x-0 hover:rotate-y-12 hover:rotate-x-6 transition-transform duration-700 ease-out">
                  {/* Floating Elements representing POS components */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] border border-white/10 shadow-2xl shadow-black/50 p-6 flex flex-col justify-between transform translate-z-20">
                     {/* Screen Header */}
                     <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500" />
                           <div className="w-3 h-3 rounded-full bg-yellow-500" />
                           <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="h-2 w-20 bg-slate-700 rounded-full" />
                     </div>
                     {/* Screen Body */}
                     <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5 col-span-2 md:col-span-1">
                           <div className="h-32 bg-brand-500/20 rounded-xl mb-4 flex items-center justify-center">
                              <CreditCard className="w-12 h-12 text-brand-400" />
                           </div>
                           <div className="h-4 w-2/3 bg-slate-700 rounded mb-2" />
                           <div className="h-3 w-1/2 bg-slate-800 rounded" />
                        </div>
                        <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5 col-span-2 md:col-span-1 flex flex-col gap-3">
                           {[1,2,3].map(i => (
                              <div key={i} className="bg-slate-700/30 p-3 rounded-xl flex items-center justify-between">
                                 <div className="w-8 h-8 bg-slate-600 rounded-lg" />
                                 <div className="h-2 w-12 bg-slate-600 rounded" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  
                  {/* Floating Card Reader */}
                  <motion.div 
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -right-12 top-20 w-48 h-64 bg-slate-800 rounded-3xl border border-white/10 shadow-xl p-4 transform translate-z-40"
                  >
                     <div className="w-full h-2 bg-black/50 rounded-full mb-4" />
                     <div className="w-full h-32 bg-slate-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 to-transparent" />
                        <div className="text-2xl font-bold text-white">$45.00</div>
                     </div>
                     <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="h-2 bg-slate-700 rounded-full" />)}
                     </div>
                  </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT DOES POS SYSTEM MEAN - Bento Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.25]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto mb-16 text-center">
             <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Definitions</span>
             <motion.h2 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               className="text-4xl md:text-5xl font-bold text-slate-900"
             >
               What Does POS System Mean in Business?
             </motion.h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
             {/* Main Definition Box */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="md:col-span-8 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 hover:border-brand-200 transition-colors"
             >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-brand-600 mb-6">
                   <Terminal className="w-7 h-7" />
                </div>
                <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
                  POS stands for “Point of Sale,” and it’s a physical touchpoint that allows customers to make purchases using a credit card or cardless payment method like Apple Pay.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  You can find both physical POS systems for in-person businesses as well as online POS systems that handle ecommerce transactions. Both are capable of applying sales tax where applicable and ensuring every purchase is recorded for your business in real-time.
                </p>
             </motion.div>

             {/* Side Detail Box */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="md:col-span-4 bg-brand-600 text-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/20 transition-colors" />
                
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-4">Modern Integrations</h3>
                   <p className="text-brand-100 leading-relaxed">
                     POS software is becoming increasingly sophisticated, and newer versions support integrations with Customer Relationship Management (CRM) software, as well as accounting software like Quickbooks for easy business financial reporting and greater customer satisfaction.
                   </p>
                </div>
                <div className="mt-8 relative z-10">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-600 bg-brand-500 flex items-center justify-center text-xs font-bold">
                            <Zap className="w-4 h-4" />
                         </div>
                      ))}
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 BENEFITS SECTION - Hover Grid */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15]" />
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
             {/* Left Content */}
             <div className="lg:w-1/3">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Why Upgrade?</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    Benefits of a Point-of-Sales System for Small Businesses
                  </h2>
                  
                  <div className="prose prose-lg text-slate-600 mb-10">
                     <p>
                       There are a number of reasons why you should consider using a POS system. The first and most obvious is that recording financial transactions by hand is time-consuming and risky. The more customers you serve, the greater the risk of error. Even one missed transaction could throw off your reporting and forecasts.
                     </p>
                     <p>
                       You can also potentially save money on taxes each year by having more accurate financial records to file with. This helps you avoid oversights and miss out on potential savings that could help you lower your tax burden.
                     </p>
                     <p>
                       A POS can also help you save money on hiring a certified accountant or bookkeeper. All of your transactions are automatically logged and organized, so you can easily keep track of profits and revenue growth.
                     </p>
                  </div>

                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 group">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
             </div>

             {/* Right Grid */}
             <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Better Inventory Management",
                    desc: "POS systems can track how much inventory you sell, making it easier to stay ahead of customer demand, avoid refunds due to running out of products, and help you capitalize on your most popular offerings.",
                    icon: Package,
                    color: "bg-blue-50 text-blue-600"
                  },
                  {
                    title: "Invoicing in Seconds",
                    desc: "Thanks to the instantaneous transaction recording, a point-of-sale system allows you to print receipts and invoice clients without hassle.",
                    icon: Printer,
                    color: "bg-purple-50 text-purple-600"
                  },
                  {
                    title: "Improved Financial Reporting",
                    desc: "A POS can report information about your sales and inventory to suppliers and other stakeholders in your business without the need for manual calculations. Precise details about products such as the quantity sold, cost of each good, and revenue generated per sale all allow you to gain a better financial picture of your business.",
                    icon: TrendingUp,
                    color: "bg-green-50 text-green-600"
                  },
                  {
                    title: "Faster Workflows",
                    desc: "A POS system eliminates the need for you to manually take inventory and write down transactions each day. Instead of calculating profits and losses, you can focus on reading your POS feedback to gain insights that help you optimize your operations.",
                    icon: Zap,
                    color: "bg-orange-50 text-orange-600"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-100 transition-all group hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 🔵 WORTH INVESTING SECTION - Split Layout */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1] mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/70" />
             </div>

             {/* Decorative */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Why Are POS Systems Worth Investing In as a Small Business Owner?
                  </h2>
                  <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 text-lg text-slate-300 leading-relaxed">
                   <div className="space-y-6">
                      <p>
                        The right POS will suit your industry, budget, and needs. They can range from a simple card reader to a robust payment system complete with a cash dispenser and touchscreen interface.
                      </p>
                      <p>
                        When you have your own system in place, switching to a POS can feel overwhelming, and you may even feel like it’s not worth the time and effort it takes to transfer your current payment processing into a new system.
                      </p>
                      <p>
                        But the benefits of having a reliable, high-quality POS system ultimately outweigh the initial cost and time it takes to get set up.
                      </p>
                   </div>
                   <div className="space-y-6">
                      <p>
                        Whether you run a hotel, own a salon, or are fulfilling the dream of launching your own company, you can feel confident knowing that your business’s finances will be transparent and easy to understand with a POS.
                      </p>
                      <p>
                        We provide the leading POS providers, including Clover and Dejavoo, to give our customers the greatest solutions for their business needs. The best part is that these systems can easily scale as your business grows, so you get a great return on investment without the need to continuously replace or upgrade hardware and software.
                      </p>
                      <p>
                        The 5-Star Processing team is also here with you every step of the way. We save you time and money by ensuring your system is set up properly and ready to integrate into your daily operations.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🔵 TIPS SECTION - Visual Steps */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Tips for Choosing a POS System
            </motion.h2>
            <p className="text-xl text-slate-600">Key considerations for your business</p>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {[
              "Decide between whether you want a portable, mobile card reader or a complete cash register system that creates a centralized payment center in your business. Traveling vendors will enjoy a flexible, mobile option, while brick-and-mortar stores will benefit from a more comprehensive register system.",
              "Decide whether you want to focus solely on credit card payments or support contactless pay as well. Contactless payment options, like Apple Pay, increased 30% from 2021 to 2022, and they continue to rise. Not offering contactless payment options may cost your business revenue.",
              "Determine if you need a receipt printer or will offer digital receipts to customers and make sure a POS system you’re considering offers your preferred method.",
              "Determine which payment processors you prefer and whether they are compatible with a specific POS system. Some businesses only accept certain cards, like Visa or Mastercard, due to their processing fees and costs. For example, Mastercard charges businesses 1.15% + $0.05 to 2.5% + $0.10 of each transaction, while American Express charges 1.43% + $0.10 to 3.3% + $0.10 of each purchase."
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 md:items-start p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl shadow-sm z-10">
                  {index + 1}
                </div>
                <div className="relative z-10">
                   <h3 className="text-lg font-bold text-slate-900 mb-2">Step {index + 1}</h3>
                   <p className="text-slate-600 leading-relaxed text-lg">
                     {tip}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-lg text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We are always available to help you learn more about choosing the right point-of-sales system for your business. Don’t hesitate to contact us at 5 Star Processing for a personalized business assessment and POS recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🔵 POS PROVIDERS SECTION - Modern Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
               Discover the Best POS Terminals
             </h2>
             <p className="text-xl text-slate-500">World-class hardware solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Clover",
                desc: "Clover is the industry leader in modern point-of-sale systems. From full-service machines with touchscreen registers and cash dispensers to flexible mobile card readers and contactless payment options, both small and large businesses can benefit from the technology and versatility of Clover’s product line.",
                icon: Terminal,
                bg: "bg-green-50",
                text: "text-green-600"
              },
              {
                title: "Dejaavoo",
                desc: "Dejavoo has been in operation for nearly 20 years and provides some of the most reliable and versatile POS systems on the market. Easily integrated into any industry, the classic design of the Dejavoo terminals makes them an economical and powerful solution for small businesses.",
                icon: CreditCard,
                bg: "bg-blue-50",
                text: "text-blue-600"
              },
              {
                title: "Ingenico",
                desc: "Lightweight and sleek, the simplified design of Ingenico POS systems provides fast payment processing while maximizing small physical space. With cloud-based payments, card readers, and countertop pin pads, Ingenico offers a wide range of products suitable for both small, local businesses and large retailers with hundreds of customers passing through their doors each day.",
                icon: Smartphone,
                bg: "bg-rose-50",
                text: "text-rose-600"
              },
              {
                title: "PAX",
                desc: "The PAX POS terminal offers end-to-end payment processing technology at your fingertips. Minimalistic and easy to use, they are a great solution for businesses that want an all-in-one solution for processing payments that do not take up a lot of space.",
                icon: Terminal,
                bg: "bg-purple-50",
                text: "text-purple-600"
              },
              {
                title: "IProcess Mobile App",
                desc: "You can process credit card payments on your phone using the IProcess app. This free downloadable POS software lets you process payments through mobile devices anywhere in the world.",
                icon: Globe,
                bg: "bg-amber-50",
                text: "text-amber-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-100 transition-all group flex flex-col"
              >
                <div className={`w-14 h-14 ${item.bg} ${item.text} rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  {item.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-200 flex items-center text-brand-600 font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                   Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 GATEWAYS & CONTINUED BENEFITS SECTION - Dark Mode */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.2] mix-blend-screen" />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        </div>

        {/* Tech Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
             <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
             >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 mb-8 border border-brand-500/30">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  Protect Your Business With the Leading Payment Gateways
                </h2>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                   <p>
                     Payment gateways are encryption systems designed to protect your business’s financial transactions. Without using one, you and your customers’ data can be at risk of being stolen or tampered with.
                   </p>
                   <p>
                     Payment gateways automatically scan and verify whether a customer’s credit card is accurate and able to be used for payment. It also collects the information and passes it along to the payment processor to complete the transaction.
                   </p>
                </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-700 relative overflow-hidden"
             >
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
                <div className="space-y-6 relative z-10 text-slate-300 text-lg">
                   <p>
                     A payment processor communicates between your business and the credit card merchant. It acts as an intermediary between your business, the customer’s bank, and the merchant’s bank to process payments.
                   </p>
                   <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                      <p className="text-white font-medium">
                        Standard card readers can complete payments without a gateway, but if you want to implement a POS system, then you will need one that supports both a reputable payment gateway and a payment processor.
                      </p>
                   </div>
                </div>
             </motion.div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How Payment Gateways Benefit Your Business
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 text-left"
            >
               <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <div className="w-10 h-10 bg-brand-500/20 rounded-lg flex items-center justify-center text-brand-400 mb-4">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    In e-commerce sales, payment gateways are the only way to verify whether a credit card is valid. In a brick-and-mortar store, gateways allow you to take orders by phone, text, and the internet, screening and verifying payment details before pushing them to your payment processor.
                  </p>
               </div>
               
               <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                     <Lock className="w-5 h-5" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Payment gateways also add an additional layer of security to your business by using high-level encryption to protect you and your customers’ data from unauthorized access and fraudulent charges.
                  </p>
               </div>

               <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 hover:border-brand-500/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                     <Server className="w-5 h-5" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    The POS terminals we sync up with including CardPointe, authorize.net, and NMI. Every system is also ready out-of-the-box to accept and process payments from the world’s top payment providers, including Visa, Mastercard, Discover, American Express, Apple Pay, eCheck, and JCB.
                  </p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 FINAL CTA SECTION - Gradient */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-brand-600 to-blue-700 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-brand-500/30"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15] mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-blue-700/90" />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-400/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Learn How to Increase Revenue Through the Right POS
              </h2>
              <p className="text-xl text-brand-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                Our team would love to walk you through the process of finding the perfect point-of-sales system to maximize your productivity and generate higher profits. Book a free consultation with us today to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 hover:bg-slate-50 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-brand-800/50 border border-brand-400/30 text-white hover:bg-brand-800 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 backdrop-blur-sm">
                  Become a Partner
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
