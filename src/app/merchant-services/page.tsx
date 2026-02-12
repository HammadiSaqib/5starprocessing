"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Smartphone, 
  Globe, 
  Server, 
  ShieldCheck, 
  ShoppingBag, 
  Coffee, 
  ShoppingCart, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Terminal,
  ChevronRight,
  Activity,
  Layers
} from "lucide-react";
import Link from "next/link";

export default function MerchantServicesPage() {
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

      {/* 🔵 HERO / PAYMENT PROCESSING SECTION - Modern Cinematic */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        {/* Cinematic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
              className="lg:w-3/5"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-bold mb-8 backdrop-blur-sm">
                <CreditCard className="w-4 h-4" />
                <span>Top Rated Merchant Services</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Processing</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed space-y-6 max-w-2xl">
                <p>
                  Our merchant services include payment processing solutions for businesses of all kinds. Whether you’re a retail shop, restaurant, online business, or operate in a high-risk industry, we provide reliable and secure processing solutions tailored to your needs.
                </p>
                <p className="border-l-4 border-brand-500 pl-6 italic text-slate-400">
                  We make it our business to ensure that you are able to accept payments from customers using any card brand, such as:
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {[
                    "American Express", 
                    "Visa", 
                    "Mastercard", 
                    "Discover", 
                    "Apple Pay", 
                    "Google Pay", 
                    "Checks", 
                    "EBT"
                  ].map((brand, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 text-sm font-medium bg-white/5 p-2 rounded-lg border border-white/10">
                      <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0" />
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Highlight Box - Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 w-full"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <Activity className="w-12 h-12 text-brand-400 mb-8" />
                  
                  <p className="text-xl text-slate-200 mb-10 leading-relaxed relative z-10 font-medium">
                    5 Star Processing offers a wide range of merchant services to suit your business needs. We help you accept payments quickly, securely, and efficiently through modern payment gateways.
                  </p>
                  
                  <Link 
                    href="/signup" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1 relative z-10 w-full group/btn"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 PAYMENT GATEWAYS SECTION - Modern Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
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
               <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Secure Transactions</span>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
                 Payment Gateways
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
                Payment gateways are established entities that securely capture and transmit data to your payment processor. At 5 Star Processing, our merchant services give you access to secure and reliable gateways that support your business requirements.
              </p>
              <p>
                Our payment gateways allow you to accept payments, including credit cards, ACH, and more.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            >
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-lg transition-all hover:border-brand-300 hover:text-brand-600 hover:-translate-y-1">
                Become a Partner
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "CardPointe",
                desc: "CardPointe is a cloud-based platform that is both comprehensive and safe. For businesses, it simplifies the process of receiving payments as well as managing those payments. With CardPointe, you may authorize, capture, void, and refund transactions, regardless of whether you use a desktop computer or a mobile device.",
                icon: CreditCard,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "NMI",
                desc: "Network Merchants Inc., often known as NMI, is a company that offers a payment gateway to high-risk businesses that want assistance with collecting payments through credit cards. NMI offers a method that is both adaptive and scalable for the management of payment data. It also functions as a virtual terminal, enabling companies to receive payments from customers through the Internet.",
                icon: Globe,
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                title: "Authorize.net",
                desc: "The peace of mind that comes from using Authorize.net to process credit card payments is something that our merchant services strive to offer. Authorize.net is a payment gateway service provider that enables businesses to accept payments made through credit cards and electronic checks through their websites. Protecting credit card information from fraud is a top priority, and this system guarantees safety not only for your business but also ours.",
                icon: ShieldCheck,
                color: "text-green-600",
                bg: "bg-green-50"
              }
            ].map((gateway, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -mr-8 -mt-8 z-0 group-hover:bg-brand-50 transition-colors" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 ${gateway.bg} rounded-2xl shadow-sm flex items-center justify-center ${gateway.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <gateway.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{gateway.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {gateway.desc}
                  </p>
                  <div className="inline-flex items-center text-brand-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all">
                     Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 POS TERMINALS & DEVICES SECTION - Split Visual */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Visual Side */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-1/2 order-2 lg:order-1"
            >
               <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 to-blue-500 rounded-[3rem] opacity-20 blur-2xl" />
                  <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-brand-50 rounded-full blur-3xl" />
                     <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-slate-50 p-6 rounded-2xl col-span-2 flex items-center gap-4 border border-slate-100">
                           <Terminal className="w-10 h-10 text-brand-600" />
                           <div>
                              <div className="font-bold text-slate-900">Smart Terminal</div>
                              <div className="text-sm text-slate-500">Contactless Ready</div>
                           </div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl flex flex-col gap-2 border border-slate-100">
                           <Smartphone className="w-8 h-8 text-blue-600" />
                           <div className="font-bold text-slate-900">Mobile POS</div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl flex flex-col gap-2 border border-slate-100">
                           <Server className="w-8 h-8 text-purple-600" />
                           <div className="font-bold text-slate-900">Cloud Sync</div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Content Side */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mb-8"
              >
                <Terminal className="w-8 h-8" />
              </motion.div>
              
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-slate-900 mb-8"
              >
                POS Terminals & Devices
              </motion.h2>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10"
              >
                <p>
                  A point-of-sale (POS) system handles your business transactions, including taking payments and issuing receipts. The place where you and your customer meet to complete a transaction is also known as a point of sale.
                </p>
                <p>
                  This is the stage when you determine the final cost of your product or service, record the transaction, and present several methods of payment to the buyer, which may include in-person, over-the-phone, online, or mobile payment options. With 5 Star Processing’s merchant services, you can find the best POS terminal or device of your choosing.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-lg transition-all hover:border-brand-300 hover:text-brand-600 hover:-translate-y-1">
                  Become a Partner
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 INDUSTRIES WE WORK WITH SECTION - Bento Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1]" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
             <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Versatility</span>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
               Industries We Work With
             </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Small Businesses & Entrepreneurs",
                desc: "Whether you provide specialized services as an individual or own a brick-and-mortar location, 5 Star Processing makes it easy for you to get access to the merchant services you need without all the red tape.",
                icon: ShoppingBag,
                bg: "bg-orange-50",
                text: "text-orange-600"
              },
              {
                title: "Hospitality Businesses",
                desc: "Conveniently choose from any of our physical POS systems or even our mobile POS options, whether you’re a hotel or restaurant owner or a food truck that is constantly on the move.",
                icon: Coffee,
                bg: "bg-amber-50",
                text: "text-amber-600"
              },
              {
                title: "E-Commerce Businesses",
                desc: "Our online and mobile payment solutions make it more convenient than ever for e-commerce business owners to accept fast and secure payments from customers, regardless of their location.",
                icon: ShoppingCart,
                bg: "bg-blue-50",
                text: "text-blue-600"
              },
              {
                title: "High-Risk Businesses",
                desc: "Many businesses operating in industries that banks and lenders consider high risk. These include health and beauty, credit companies, dating services, MLM businesses, and event booking agencies.",
                icon: AlertTriangle,
                bg: "bg-red-50",
                text: "text-red-600"
              }
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-100 transition-all group flex gap-6 items-start"
              >
                <div className={`flex-shrink-0 w-16 h-16 ${industry.bg} rounded-2xl flex items-center justify-center ${industry.text} group-hover:scale-110 transition-transform`}>
                  <industry.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{industry.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {industry.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔵 HIGH-RISK CTA SECTION - Modern Gradient */}
      <section className="py-24 bg-slate-50 relative">
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
                 <ShieldCheck className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                If You Are in a High-Risk Industry
              </h2>
              <p className="text-xl text-brand-50 mb-10 leading-relaxed">
                5 Star Processing can work with you to ensure you can accept payments securely while receiving as much support as possible as a traditional business. Contact us today to learn more about our merchant services and how they can help you.
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
