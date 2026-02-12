"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Car, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  Percent, 
  Banknote, 
  Smartphone, 
  Headphones, 
  ShieldCheck,
  Zap,
  CreditCard,
  Users
} from "lucide-react";
import Link from "next/link";

export default function AutoDealershipsPage() {
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

      {/* 🔵 HERO / INTRO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60 z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50"
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
              <Car className="w-4 h-4" />
              <span>Payment Processing Solutions for Auto Dealerships</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
            >
              Payment Processing <br />
              Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Auto Dealerships</span>
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
                Auto dealerships have unique needs that require special solutions — software as fast, efficient, and reliable as the cars you sell.
              </p>
              <p>
                You deal with transactions in the thousands daily, which means you need a comprehensive system that can handle large payments with ease and keep all your transactions organized.
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
              <Link href="/partner" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all hover:-translate-y-1">
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT TO LOOK FOR SECTION */}
      <section className="py-24 bg-slate-50 relative text-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                What to Look for in Auto Dealer Payment Processing
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Imagine how much stress ensues when your POS doesn’t respond, or a customer’s payment doesn’t go through, or a faulty system incurs multiple multi-thousand-dollar charges. These are unfortunate realities for busy auto dealers that don’t have a payment system they know they can count on.
                </p>
                <p>
                  At 5-Star Processing, we offer the leading payment processing services for automobile dealerships throughout the country, ensuring they always have dependable service and support from our team.
                </p>
                <p>
                  Auto dealerships need software capable of supporting the high-volume, large-scale payments of the automotive industry. Good payment processors make life easier for your business.
                </p>
                <p className="font-semibold text-brand-600">
                  When exploring any payment processor for your dealership, here are key factors to consider.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Reliability Matters</h3>
                <p className="text-slate-200">Don&apos;t let system failures cost you sales.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 FEATURES LIST SECTION */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506469717969-0858ac52a739?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Features
            </h2>
            <p className="text-xl text-slate-400">
              Everything your dealership needs to handle payments efficiently.
            </p>
          </div>

          <div className="grid gap-8">
            
            {/* 1. Integrations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400 mb-6">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Integrations With Auto Dealer Software</h3>
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-8">
                    <p>
                      A payment processor must have integrations that seamlessly connect to your existing software, ensuring customer accounts are automatically updated to reflect new transactions and records are kept up-to-date.
                    </p>
                    <p>
                      The right payment processing solution will be compatible with the top Dealership Management System (DMS) and Customer Relationship Management (CRM) software, ensuring you have streamlined support and fluid financial recordkeeping. You should also check that a payment processor is compatible with any finance and insurance (F&I) software you use to continue to offer more flexible financing solutions to your customers.
                    </p>
                  </div>
                  <Link href="/contact" className="inline-flex items-center text-brand-400 font-bold hover:text-brand-300 transition-colors">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
                <div className="h-full min-h-[300px] rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80" />
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 2. Low Processing Fees */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all flex flex-col"
              >
                <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400 mb-8">
                  <Percent className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Low Processing Fees</h3>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed flex-grow">
                  <p>
                    When comparing payment processors for auto dealers, be mindful of both swiped card rate and keyed card rates. Swiped card rates are straightforward — the customer swipes their physical card through a terminal and is charged. A keyed card rate is a transaction made when the dealer or customer manually inputs the card information into a payment system.
                  </p>
                  <p>
                    Keyed card rates are higher because banks see them as a higher risk of being fraudulent. Even though it may not be, the potential of a false charge or the use of a stolen card ultimately leads to higher rates for dealerships.
                  </p>
                  <p>
                    Keyed rates are considered “card not present” transactions,” so you will always pay more for them. However, there may be situations where you or a customer need to manually enter a number to complete a transaction.
                  </p>
                </div>
              </motion.div>

              {/* 3. Supports ACH Payments */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all flex flex-col"
              >
                <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400 mb-8">
                  <Banknote className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Supports ACH Payments</h3>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed flex-grow">
                  <p>
                    A payment processor should support Automatic Clearing House (ACH) transactions. This powerful payment system was developed by the National Automated Clearinghouse Association (now known as Nacha) in 1974 to facilitate payments throughout banks in the United States.
                  </p>
                  <p>
                    Businesses also use ACH to receive payments from customers, which makes it particularly vital for auto dealers that offer car leasing services, rentals, and financing plans.
                  </p>
                  <p>
                    ACH payment processing is also ideal for managing auto financing solutions. This can save you time having to collect recurring payments, like monthly leasing fees, from your customers, saving you time and money on lengthy administrative work.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 4. Mobile POS Solutions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative bg-brand-600 p-8 md:p-12 rounded-[2.5rem] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Mobile POS Solutions</h3>
                  <div className="space-y-6 text-lg text-brand-100 leading-relaxed mb-8">
                    <p>
                      A mobile point-of-sales solution allows your representatives to sell or lease vehicles directly on the showroom floor. Mobile solutions also reduce customer wait times and allow for faster payment processing. This not only increases customer satisfaction but allows your dealership to close more deals faster.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black hover:bg-brand-50 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">
                      Get Started
                    </Link>
                    <Link href="/partner" className="inline-flex items-center justify-center px-6 py-3 bg-brand-500 border border-brand-400 hover:bg-brand-400 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">
                      Become a Partner
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80" 
                    alt="Mobile POS" 
                    className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
                  />
                </div>
              </div>
            </motion.div>

            {/* 5. Customer Support */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                    <Headphones className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">Customer Support</h3>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-8">
                    <p>
                      Some payment processors have dedicated customer support portals while others offer phone and email support. In any case, you deserve to have on-demand assistance whenever you have questions or issues arise with your POS.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">
                      Get Started
                    </Link>
                    <Link href="/partner" className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-200 hover:border-brand-600 text-slate-900 hover:text-brand-600 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">
                      Become a Partner
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2 h-full min-h-[300px] rounded-3xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🔵 WHY CHOOSE US SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                5-Star Processing: <br/> <span className="text-brand-600">The Best Payment Service for Auto Dealers</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                <p>
                  5-Star Processing is the leading payment processing provider for all businesses. We deliver personalized support, the top POS systems, and easy integration with your car dealership’s current software.
                </p>
                <p>
                  We have carefully selected our payment processing partners to ensure that we can offer our customers competitive rates. This translates to greater savings for you across all transactions, leading to thousands of dollars in annual savings.
                </p>
                <p className="font-bold text-slate-900">
                  When you choose to work with us, you receive:
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-4">
              {[
                "Powerful payment processing software perfect for auto dealers",
                "ACH-compatible payments for financing and electronic payments",
                "Easy integration with the leading DMS and CRM systems",
                "A variety of POS systems tailored for automotive sales and financing",
                "Payment gateway software that allows you to process payments by phone or over the internet",
                "Payment processing for all major credit cards and contactless payments",
                "Mobile card reader compatibility",
                "Support from the 5-Star Processing team of finance professionals"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-slate-700 font-medium text-lg">{item}</span>
                </motion.div>
              ))}
              </div>
              <div className="relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                 <div className="absolute bottom-0 left-0 p-10 text-white">
                   <p className="text-3xl font-bold leading-tight">Expert service for your service experts.</p>
                 </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-12 text-lg text-slate-600 leading-relaxed bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-slate-100"
            >
              <div className="space-y-6">
                <p>
                  We make it easy for you to reduce errors, save time, and sell and lease more automobiles through reliable, fast processing. Robust back-end solutions ensure that even when processing well over six figures per day, your POS system doesn’t skip a beat.
                </p>
                <p>
                  Our customer service makes us stand out from our competitors. Instead of pushing everyone the same product, we personalize each solution to suit your industry and individual business needs.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  Whether you’re a franchised dealership or independent auto dealer, we can find the right solution for your business. Our dedication to individualized care ensures that each dealership finds the perfect payment processing solution for their needs, all the way down to the types of vehicles they sell, their customers’ preferred payment methods, and their unique financing services.
                </p>
                <p>
                  With our payment processor, you can rapidly process payments from all of the leading credit cards and contactless payment providers. The team at 5-Star Processing is here to answer your questions and help you find the perfect solution for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 SCHEDULE CONSULTATION SECTION */}
      <section className="py-24 bg-white relative">
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
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Schedule a Free Consultation
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light">
                If you have questions, we’re ready to answer them. The team at 5-Star Processing is here to help you find the perfect payment processing solution for your auto dealership. Contact us today to schedule a consultation with us.
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
